import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { supabase } from '../../lib/supabase';
import { Award } from 'lucide-react';

const RANK_COLORS: Record<string, string> = {
  SILVER: 'bg-gray-100 text-gray-700',
  GOLD: 'bg-yellow-100 text-yellow-700',
  DIAMOND: 'bg-blue-100 text-blue-700',
};

export default function RoyaltyIncomePage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [currentRank, setCurrentRank] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoyaltyData = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const [{ data: txns }, { data: member }] = await Promise.all([
          supabase.from('royalty_transactions').select('id, rank_name, royalty_period, income_generated, status, created_at').eq('member_uuid', user.id).order('created_at', { ascending: false }),
          supabase.from('members').select('rank_name').eq('id', user.id).single(),
        ]);

        if (txns) {
          setTransactions(txns);
          setTotalIncome(txns.reduce((sum, tx) => sum + Number(tx.income_generated), 0));
        }
        if (member) setCurrentRank(member.rank_name);
      } catch (err) {
        console.error('Error fetching royalty income', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoyaltyData();
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="max-w-4xl mx-auto pb-10 space-y-6">
      <PageHeader title="Royalty Income" description="Earnings generated from achieving leadership ranks." breadcrumbs={[{ label: 'Business' }, { label: 'Income Dashboard' }, { label: 'Royalty Income' }]} />

      <Card className="text-center p-10">
        <div className="w-16 h-16 bg-[#232F46]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Award className="w-8 h-8 text-[#232F46]" />
        </div>
        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Total Royalty Income</p>
        {loading ? <p className="text-4xl font-black text-gray-300 animate-pulse">Loading...</p>
          : <p className="text-4xl font-black text-[#ED8C32]">₹{totalIncome.toLocaleString()}</p>}

        {currentRank && (
          <div className="mt-4 flex justify-center">
            <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-black ${RANK_COLORS[currentRank] || 'bg-gray-100 text-gray-600'}`}>
              <Award className="w-4 h-4 mr-2" /> {currentRank} Rank
            </span>
          </div>
        )}
        {!loading && !currentRank && (
          <p className="mt-4 text-sm text-gray-500">You haven't achieved a qualifying rank yet. Reach 10 matched pairs to qualify for Silver royalty.</p>
        )}

        <div className="mt-8 pt-8 border-t border-gray-100 text-left">
          <h3 className="font-bold text-[#232F46] mb-2">How it works</h3>
          <p className="text-sm text-gray-600">
            Royalty Income is a monthly dividend paid to members who achieve specific leadership Ranks. Ranks are assigned automatically based on your cumulative matched binary pairs. Payouts are processed on the 1st of each month.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[{ rank: 'SILVER', pairs: '10+ pairs', amount: '₹1,000/mo' }, { rank: 'GOLD', pairs: '25+ pairs', amount: '₹2,500/mo' }, { rank: 'DIAMOND', pairs: '50+ pairs', amount: '₹5,000/mo' }].map(r => (
              <div key={r.rank} className={`p-3 rounded-xl border text-center ${RANK_COLORS[r.rank] || ''}`}>
                <p className="text-xs font-black uppercase">{r.rank}</p>
                <p className="text-xs text-gray-500 mt-1">{r.pairs}</p>
                <p className="text-sm font-bold mt-1">{r.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Transaction History */}
      <Card>
        <h3 className="font-bold text-[#232F46] mb-4">Royalty Payment History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Period</th>
                <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Rank</th>
                <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="p-3 text-[10px] font-bold text-[#ED8C32] uppercase tracking-wider text-right">Income</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading && <tr><td colSpan={4} className="p-6 text-center text-sm text-gray-400">Loading...</td></tr>}
              {!loading && transactions.length === 0 && (
                <tr><td colSpan={4} className="p-6 text-center text-sm text-gray-400">No royalty payments yet. Achieve a rank to start earning!</td></tr>
              )}
              {transactions.map(tx => (
                <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-3 text-xs font-medium text-[#232F46]">{tx.royalty_period}</td>
                  <td className="p-3">
                    <span className={`inline-flex px-2 py-1 text-[10px] font-black rounded-full ${RANK_COLORS[tx.rank_name] || 'bg-gray-100 text-gray-600'}`}>{tx.rank_name}</span>
                  </td>
                  <td className="p-3"><StatusBadge status={tx.status} /></td>
                  <td className="p-3 text-right font-bold text-[#ED8C32]">+₹{Number(tx.income_generated).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
