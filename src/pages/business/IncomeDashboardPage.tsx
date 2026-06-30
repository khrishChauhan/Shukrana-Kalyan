import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { supabase } from '../../lib/supabase';
import { IndianRupee, ArrowRight, Wallet, Award, Users, TrendingUp } from 'lucide-react';

export default function IncomeDashboardPage() {
  const navigate = useNavigate();
  const [sponsorTotal, setSponsorTotal] = useState(0);
  const [matchingTotal, setMatchingTotal] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Fetch sponsor income total
        const { data: sponsorData } = await supabase
          .from('sponsor_income_transactions')
          .select('income_generated')
          .eq('sponsor_uuid', user.id);
        if (sponsorData) {
          setSponsorTotal(sponsorData.reduce((sum, tx) => sum + Number(tx.income_generated), 0));
        }

        // Fetch matching income total
        const { data: matchingData } = await supabase
          .from('matching_transactions')
          .select('income_generated')
          .eq('member_uuid', user.id);
        if (matchingData) {
          setMatchingTotal(matchingData.reduce((sum, tx) => sum + Number(tx.income_generated), 0));
        }

        // Build unified recent transaction feed (sponsor + matching, last 10)
        const [{ data: sRecent }, { data: mRecent }] = await Promise.all([
          supabase.from('sponsor_income_transactions').select('id, income_generated, created_at').eq('sponsor_uuid', user.id).order('created_at', { ascending: false }).limit(5),
          supabase.from('matching_transactions').select('id, income_generated, created_at, ratio_used').eq('member_uuid', user.id).order('created_at', { ascending: false }).limit(5),
        ]);

        const combined = [
          ...(sRecent || []).map(tx => ({ ...tx, category: 'Sponsor Income', type: 'Credit' })),
          ...(mRecent || []).map(tx => ({ ...tx, category: `Binary Match (${tx.ratio_used})`, type: 'Credit' })),
        ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 8);
        setRecentTransactions(combined);
      } catch (err) {
        console.error('Error fetching income dashboard', err);
      } finally {
        setLoading(false);
      }
    };
    fetchIncomeData();
  }, []);

  const totalIncome = sponsorTotal + matchingTotal;

  const incomeStreams = [
    { title: 'Binary Income', amount: matchingTotal, icon: TrendingUp, path: '/business/matching-income' },
    { title: 'Sponsor Income', amount: sponsorTotal, icon: Users, path: '/business/sponsor-income' },
    { title: 'Level Income', amount: 0, icon: ArrowRight, path: '/business/level-income' },
    { title: 'Royalty Income', amount: 0, icon: Award, path: '/business/royalty-income' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto pb-10 space-y-6"
    >
      <PageHeader
        title="Income Dashboard"
        description="Track all your earnings, deductions, and wallet balances."
        breadcrumbs={[{ label: 'Business' }, { label: 'Income Dashboard' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#232F46] text-white p-6 md:col-span-3 lg:col-span-1 flex flex-col justify-center">
          <p className="text-sm text-white/70 font-bold uppercase tracking-wider mb-2">Total Accumulated Income</p>
          {loading ? (
            <p className="text-4xl font-black text-[#ED8C32]/50 mb-4 animate-pulse">₹---</p>
          ) : (
            <p className="text-4xl font-black text-[#ED8C32] mb-4">₹{totalIncome.toLocaleString()}</p>
          )}
          <div className="flex gap-4 mt-auto">
            <button
              onClick={() => navigate('/business/income-ledger')}
              className="flex-1 bg-white text-[#232F46] py-2 px-4 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              <Wallet className="w-4 h-4" /> View Ledger
            </button>
            <button
              onClick={() => navigate('/business/income-breakdown')}
              className="flex-1 border border-white/20 text-white py-2 px-4 rounded-lg font-bold text-sm hover:bg-white/10 transition-colors"
            >
              Breakdown
            </button>
          </div>
        </Card>

        <div className="md:col-span-3 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {incomeStreams.map((stream, idx) => (
            <Card
              key={idx}
              className="p-4 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group border border-gray-100 flex items-center justify-between"
              onClick={() => navigate(stream.path)}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white border border-gray-100 rounded-lg group-hover:border-[#ED8C32] transition-colors">
                  <stream.icon className="w-6 h-6 text-[#232F46]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-500">{stream.title}</p>
                  {loading ? (
                    <p className="text-xl font-bold text-gray-300 animate-pulse">₹---</p>
                  ) : (
                    <p className="text-xl font-bold text-[#232F46]">₹{stream.amount.toLocaleString()}</p>
                  )}
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-[#ED8C32] transition-colors" />
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <h3 className="text-lg font-bold text-[#232F46] mb-4">Recent Transactions</h3>
        <div className="space-y-2">
          {loading && (
            <div className="py-6 text-center text-sm text-gray-400">Loading transactions...</div>
          )}
          {!loading && recentTransactions.length === 0 && (
            <div className="py-6 text-center text-sm text-gray-400">No income transactions yet.</div>
          )}
          {recentTransactions.map((txn) => (
            <div key={txn.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-[#ED8C32]/10 text-[#ED8C32]">
                  <IndianRupee className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#232F46]">{txn.category}</p>
                  <p className="text-xs text-gray-500 font-mono">{new Date(txn.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-[#ED8C32]">+₹{Number(txn.income_generated).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
