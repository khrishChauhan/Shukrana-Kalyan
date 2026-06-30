import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { supabase } from '../../lib/supabase';
import {
  Wallet, ArrowUpRight, Activity,
  FileText, Landmark, Banknote, Download
} from 'lucide-react';

export default function WalletCenterPage() {
  const navigate = useNavigate();
  const [walletData, setWalletData] = useState<any>(null);
  const [incomeBreakdown, setIncomeBreakdown] = useState<Record<string, number>>({});
  const [recentLedger, setRecentLedger] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const [{ data: wallet }, { data: ledger }] = await Promise.all([
          supabase.from('wallets').select('available_balance, lifetime_earnings, lifetime_withdrawals').eq('id', user.id).single(),
          supabase.from('unified_ledger').select('id, entry_type, direction, amount, balance_after, created_at').eq('member_uuid', user.id).order('created_at', { ascending: false }).limit(5),
        ]);

        if (wallet) setWalletData(wallet);
        if (ledger) {
          setRecentLedger(ledger);
          // Compute income breakdown by type
          const { data: allLedger } = await supabase
            .from('unified_ledger')
            .select('entry_type, amount, direction')
            .eq('member_uuid', user.id)
            .eq('direction', 'CREDIT');
          if (allLedger) {
            const breakdown: Record<string, number> = {};
            allLedger.forEach(tx => {
              breakdown[tx.entry_type] = (breakdown[tx.entry_type] || 0) + Number(tx.amount);
            });
            setIncomeBreakdown(breakdown);
          }
        }
      } catch (err) {
        console.error('Error fetching wallet', err);
      } finally {
        setLoading(false);
      }
    };
    fetchWallet();
  }, []);

  const totalIncome = walletData?.lifetime_earnings || 0;
  const binaryIncome = incomeBreakdown['MATCHING_INCOME'] || 0;
  const sponsorIncome = incomeBreakdown['SPONSOR_INCOME'] || 0;
  const levelIncome = incomeBreakdown['LEVEL_INCOME'] || 0;
  const royaltyIncome = incomeBreakdown['ROYALTY_INCOME'] || 0;
  const incomeTotal = binaryIncome + sponsorIncome + levelIncome + royaltyIncome || 1;

  const formatEntry = (type: string) => {
    const map: Record<string, string> = {
      MATCHING_INCOME: 'Binary Income', SPONSOR_INCOME: 'Sponsor Income',
      LEVEL_INCOME: 'Level Income', ROYALTY_INCOME: 'Royalty Income',
      WITHDRAWAL_DEBIT: 'Withdrawal', WITHDRAWAL_REVERSAL: 'Withdrawal Reversal',
      ADMIN_CORRECTION_CREDIT: 'Admin Credit', ADMIN_CORRECTION_DEBIT: 'Admin Debit',
    };
    return map[type] || type;
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="max-w-6xl mx-auto pb-10 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader title="Wallet Center" description="Manage your funds, track earnings, and request withdrawals." breadcrumbs={[{ label: 'Business' }, { label: 'Wallet Center' }]} />
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/wallet/ledger')} className="gap-2"><FileText className="w-4 h-4" /> View Ledger</Button>
          <Button onClick={() => navigate('/wallet/withdrawals')} className="gap-2 bg-[#ED8C32] text-white hover:bg-[#D97A24]"><Banknote className="w-4 h-4" /> Withdraw Funds</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 bg-[#232F46] text-white border-0 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-bold text-white/70 uppercase tracking-wider">Available Balance</p>
              <div className="p-2 bg-white/10 rounded-lg"><Wallet className="w-5 h-5 text-white" /></div>
            </div>
            {loading ? <p className="text-3xl font-black text-[#ED8C32]/50 animate-pulse">₹---</p>
              : <p className="text-3xl font-black text-white">₹{Number(walletData?.available_balance || 0).toLocaleString()}</p>}
            <p className="text-xs text-white/50 mt-2">Ready for withdrawal</p>
          </div>
        </Card>

        <Card className="p-5 bg-gray-50 border border-gray-100 flex flex-col justify-center">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Lifetime Earnings</p>
          {loading ? <p className="text-2xl font-black text-gray-300 animate-pulse">₹---</p>
            : <p className="text-2xl font-black text-[#232F46]">₹{Number(walletData?.lifetime_earnings || 0).toLocaleString()}</p>}
          <div className="flex items-center gap-1 mt-2 text-xs font-bold text-green-600">
            <ArrowUpRight className="w-3 h-3" /> All income streams
          </div>
        </Card>

        <Card className="p-5 bg-gray-50 border border-gray-100 flex flex-col justify-center">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Lifetime Withdrawals</p>
          {loading ? <p className="text-2xl font-black text-gray-300 animate-pulse">₹---</p>
            : <p className="text-2xl font-black text-[#232F46]">₹{Number(walletData?.lifetime_withdrawals || 0).toLocaleString()}</p>}
          <div className="flex items-center gap-1 mt-2 text-xs font-bold text-[#ED8C32]">
            <Activity className="w-3 h-3" /> Total disbursed
          </div>
        </Card>

        <Card className="p-5 bg-gray-50 border border-gray-100 flex flex-col justify-center">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Net Balance</p>
          {loading ? <p className="text-2xl font-black text-gray-300 animate-pulse">₹---</p>
            : <p className="text-2xl font-black text-[#232F46]">₹{Number((walletData?.lifetime_earnings || 0) - (walletData?.lifetime_withdrawals || 0)).toLocaleString()}</p>}
          <div className="flex items-center gap-1 mt-2 text-xs font-bold text-gray-400">Earnings − Withdrawals</div>
        </Card>
      </div>

      {/* Income stream breakdown */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Binary Income', key: 'MATCHING_INCOME', path: '/business/matching-income', val: binaryIncome },
          { label: 'Sponsor Income', key: 'SPONSOR_INCOME', path: '/business/sponsor-income', val: sponsorIncome },
          { label: 'Level Income', key: 'LEVEL_INCOME', path: '/business/level-income', val: levelIncome },
          { label: 'Royalty Income', key: 'ROYALTY_INCOME', path: '/business/royalty-income', val: royaltyIncome },
        ].map(({ label, path, val }) => (
          <Card key={label} className="p-4 bg-gray-50 border border-gray-100 text-center flex flex-col justify-center items-center hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => navigate(path)}>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">{label}</p>
            {loading ? <p className="text-xl font-bold text-gray-300 animate-pulse">₹---</p>
              : <p className="text-xl font-bold text-[#232F46]">₹{val.toLocaleString()}</p>}
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-[#232F46]">Recent Transactions</h3>
            <Button variant="outline" size="sm" onClick={() => navigate('/wallet/ledger')}>View All</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Credit</th>
                  <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Debit</th>
                  <th className="p-3 text-[10px] font-bold text-[#232F46] uppercase tracking-wider text-right">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading && <tr><td colSpan={5} className="p-6 text-center text-sm text-gray-400">Loading...</td></tr>}
                {!loading && recentLedger.length === 0 && <tr><td colSpan={5} className="p-6 text-center text-sm text-gray-400">No transactions yet.</td></tr>}
                {recentLedger.map((txn) => (
                  <tr key={txn.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-3 text-xs font-medium text-[#232F46]">{new Date(txn.created_at).toLocaleDateString()}</td>
                    <td className="p-3 text-xs text-gray-600">{formatEntry(txn.entry_type)}</td>
                    <td className="p-3 text-xs text-right font-bold text-green-600">{txn.direction === 'CREDIT' ? `+₹${Number(txn.amount).toLocaleString()}` : '-'}</td>
                    <td className="p-3 text-xs text-right font-bold text-red-600">{txn.direction === 'DEBIT' ? `-₹${Number(txn.amount).toLocaleString()}` : '-'}</td>
                    <td className="p-3 text-xs text-right font-bold text-[#232F46]">₹{Number(txn.balance_after).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <h3 className="font-bold text-[#232F46] mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start gap-3 h-12" onClick={() => navigate('/wallet/withdrawals')}><Banknote className="w-5 h-5 text-[#ED8C32]" /> Request Withdrawal</Button>
              <Button variant="outline" className="w-full justify-start gap-3 h-12" onClick={() => navigate('/account/bank-details')}><Landmark className="w-5 h-5 text-blue-500" /> Manage Bank Details</Button>
              <Button variant="outline" className="w-full justify-start gap-3 h-12" onClick={() => navigate('/wallet/ledger')}><FileText className="w-5 h-5 text-gray-500" /> View Detailed Ledger</Button>
              <Button variant="outline" className="w-full justify-start gap-3 h-12" onClick={() => navigate('/downloads')}><Download className="w-5 h-5 text-gray-500" /> Download Statement</Button>
            </div>
          </Card>

          <Card className="bg-[#232F46] text-white">
            <h3 className="font-bold text-white mb-4">Income Distribution</h3>
            <div className="space-y-4">
              {[
                { label: 'Binary Income', val: binaryIncome },
                { label: 'Sponsor Income', val: sponsorIncome },
                { label: 'Level Income', val: levelIncome },
                { label: 'Royalty Income', val: royaltyIncome },
              ].map(({ label, val }) => {
                const pct = totalIncome > 0 ? Math.round((val / incomeTotal) * 100) : 0;
                return (
                  <div key={label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/70">{label}</span>
                      <span className="font-bold text-white">{pct}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-[#ED8C32] h-2 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
