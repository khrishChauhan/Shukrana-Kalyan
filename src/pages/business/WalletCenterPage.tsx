import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { mockWalletData } from '../../data/mockBusinessData';
import { 
  Wallet, ArrowUpRight, ArrowDownRight, Activity, 
  Download, FileText, Landmark, Banknote
} from 'lucide-react';

export default function WalletCenterPage() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto pb-10 space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader
          title="Wallet Center"
          description="Manage your funds, track earnings, and request withdrawals."
          breadcrumbs={[{ label: 'Business' }, { label: 'Wallet Center' }]}
        />
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/wallet/ledger')} className="gap-2">
            <FileText className="w-4 h-4" /> View Ledger
          </Button>
          <Button onClick={() => navigate('/wallet/withdrawals')} className="gap-2 bg-[#ED8C32] text-white hover:bg-[#D97A24]">
            <Banknote className="w-4 h-4" /> Withdraw Funds
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 bg-[#232F46] text-white border-0 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-bold text-white/70 uppercase tracking-wider">Available Balance</p>
              <div className="p-2 bg-white/10 rounded-lg">
                <Wallet className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-3xl font-black text-white">₹{mockWalletData.availableBalance.toLocaleString()}</p>
            <p className="text-xs text-white/50 mt-2">Ready for withdrawal</p>
          </div>
        </Card>

        <Card className="p-5 bg-gray-50 border border-gray-100 flex flex-col justify-center">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Lifetime Earnings</p>
          <p className="text-2xl font-black text-[#232F46]">₹{mockWalletData.lifetimeEarnings.toLocaleString()}</p>
          <div className="flex items-center gap-1 mt-2 text-xs font-bold text-green-600">
            <ArrowUpRight className="w-3 h-3" /> +₹{mockWalletData.todayEarnings.toLocaleString()} Today
          </div>
        </Card>

        <Card className="p-5 bg-gray-50 border border-gray-100 flex flex-col justify-center">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Lifetime Withdrawals</p>
          <p className="text-2xl font-black text-[#232F46]">₹{mockWalletData.lifetimeWithdrawals.toLocaleString()}</p>
          <div className="flex items-center gap-1 mt-2 text-xs font-bold text-[#ED8C32]">
            <Activity className="w-3 h-3" /> ₹{mockWalletData.pendingWithdrawal.toLocaleString()} Pending
          </div>
        </Card>

        <Card className="p-5 bg-gray-50 border border-gray-100 flex flex-col justify-center">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Donation Contribution</p>
          <p className="text-2xl font-black text-[#232F46]">₹{mockWalletData.donationContribution.toLocaleString()}</p>
          <div className="flex items-center gap-1 mt-2 text-xs font-bold text-gray-400">
            Social welfare fund
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gray-50 border border-gray-100 text-center flex flex-col justify-center items-center hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => navigate('/business/matching-income')}>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Binary Income</p>
          <p className="text-xl font-bold text-[#232F46]">₹{mockWalletData.binaryIncome.toLocaleString()}</p>
        </Card>
        <Card className="p-4 bg-gray-50 border border-gray-100 text-center flex flex-col justify-center items-center hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => navigate('/business/sponsor-income')}>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Sponsor Income</p>
          <p className="text-xl font-bold text-[#232F46]">₹{mockWalletData.sponsorIncome.toLocaleString()}</p>
        </Card>
        <Card className="p-4 bg-gray-50 border border-gray-100 text-center flex flex-col justify-center items-center hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => navigate('/business/level-income')}>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Level Income</p>
          <p className="text-xl font-bold text-[#232F46]">₹{mockWalletData.levelIncome.toLocaleString()}</p>
        </Card>
        <Card className="p-4 bg-gray-50 border border-gray-100 text-center flex flex-col justify-center items-center hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => navigate('/business/royalty-income')}>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Royalty Income</p>
          <p className="text-xl font-bold text-[#232F46]">₹{mockWalletData.royaltyIncome.toLocaleString()}</p>
        </Card>
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
                  <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockWalletData.ledger.slice(0, 5).map((txn, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-3 text-xs font-medium text-[#232F46]">{txn.date}</td>
                    <td className="p-3 text-xs text-gray-600">{txn.type}</td>
                    <td className="p-3 text-xs text-right font-bold text-green-600">{txn.credit > 0 ? `+₹${txn.credit}` : '-'}</td>
                    <td className="p-3 text-xs text-right font-bold text-red-600">{txn.debit > 0 ? `-₹${txn.debit}` : '-'}</td>
                    <td className="p-3 text-xs text-right font-bold text-[#232F46]">₹{txn.balance}</td>
                    <td className="p-3 text-center">
                      <StatusBadge status={txn.status} />
                    </td>
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
              <Button variant="outline" className="w-full justify-start gap-3 h-12" onClick={() => navigate('/wallet/withdrawals')}>
                <Banknote className="w-5 h-5 text-[#ED8C32]" /> Request Withdrawal
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 h-12" onClick={() => navigate('/account/bank-details')}>
                <Landmark className="w-5 h-5 text-blue-500" /> Manage Bank Details
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 h-12" onClick={() => navigate('/wallet/ledger')}>
                <FileText className="w-5 h-5 text-gray-500" /> View Detailed Ledger
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 h-12" onClick={() => navigate('/downloads')}>
                <Download className="w-5 h-5 text-gray-500" /> Download Statement
              </Button>
            </div>
          </Card>

          <Card className="bg-[#232F46] text-white">
            <h3 className="font-bold text-white mb-4">Income Distribution</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/70">Binary Income</span>
                  <span className="font-bold text-white">68%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-[#ED8C32] h-2 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/70">Sponsor Income</span>
                  <span className="font-bold text-white">12%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-[#ED8C32] h-2 rounded-full opacity-80" style={{ width: '12%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/70">Level Income</span>
                  <span className="font-bold text-white">10%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-[#ED8C32] h-2 rounded-full opacity-60" style={{ width: '10%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/70">Royalty Income</span>
                  <span className="font-bold text-white">10%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-[#ED8C32] h-2 rounded-full opacity-40" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
