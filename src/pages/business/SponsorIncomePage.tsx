import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Users } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function SponsorIncomePage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSponsorIncome = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data } = await supabase
          .from('sponsor_income_transactions')
          .select('id, new_member_uuid, income_generated, status, created_at, members!sponsor_income_transactions_new_member_uuid_fkey(member_profile(full_name))')
          .eq('sponsor_uuid', user.id)
          .order('created_at', { ascending: false });

        if (data) {
          setTransactions(data);
          setTotalIncome(data.reduce((sum, tx) => sum + Number(tx.income_generated), 0));
        }
      } catch (err) {
        console.error('Error fetching sponsor income', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSponsorIncome();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto pb-10 space-y-6"
    >
      <PageHeader
        title="Sponsor Income"
        description="Earnings generated from your direct referrals."
        breadcrumbs={[{ label: 'Business' }, { label: 'Income Dashboard' }, { label: 'Sponsor Income' }]}
      />

      <Card className="text-center p-10">
        <div className="w-16 h-16 bg-[#232F46]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-[#232F46]" />
        </div>
        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Total Sponsor Income</p>
        {loading ? (
          <p className="text-4xl font-black text-gray-300 animate-pulse">Loading...</p>
        ) : (
          <p className="text-4xl font-black text-[#ED8C32]">₹{totalIncome.toLocaleString()}</p>
        )}

        <div className="mt-8 pt-8 border-t border-gray-100 text-left">
          <h3 className="font-bold text-[#232F46] mb-2">How it works</h3>
          <p className="text-sm text-gray-600 mb-6">
            Sponsor Income is earned whenever a member you directly refer activates their account. There is no limit to the number of direct members you can refer.
          </p>
        </div>
      </Card>

      {/* Transaction History */}
      <Card>
        <h3 className="font-bold text-[#232F46] mb-4">Referral Activation History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">New Member</th>
                <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="p-3 text-[10px] font-bold text-[#ED8C32] uppercase tracking-wider text-right">Income</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading && (
                <tr><td colSpan={4} className="p-6 text-center text-sm text-gray-400">Loading...</td></tr>
              )}
              {!loading && transactions.length === 0 && (
                <tr><td colSpan={4} className="p-6 text-center text-sm text-gray-400">No sponsor income transactions yet. Refer a member to get started!</td></tr>
              )}
              {transactions.map((tx) => {
                const profile = Array.isArray(tx.members?.member_profile) ? tx.members?.member_profile[0] : tx.members?.member_profile;
                return (
                  <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-3 text-xs font-medium text-[#232F46]">{new Date(tx.created_at).toLocaleDateString()}</td>
                    <td className="p-3 text-xs text-gray-600">{profile?.full_name || 'Unknown Member'}</td>
                    <td className="p-3">
                      <span className="inline-flex px-2 py-1 text-[10px] font-bold uppercase rounded-full bg-green-100 text-green-700">
                        {tx.status}
                      </span>
                    </td>
                    <td className="p-3 text-right font-bold text-[#ED8C32]">+₹{Number(tx.income_generated).toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
