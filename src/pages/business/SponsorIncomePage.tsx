import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { supabase } from '../../lib/supabase';
import { Users, IndianRupee } from 'lucide-react';

export default function SponsorIncomePage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data } = await supabase
          .from('sponsor_income_transactions')
          .select('id, income_generated, direct_member_uuid, created_at')
          .eq('sponsor_uuid', user.id)
          .order('created_at', { ascending: false });
        
        if (data) {
          // fetch names
          const directUuids = [...new Set(data.map(t => t.direct_member_uuid))];
          if (directUuids.length > 0) {
            const { data: profiles } = await supabase
              .from('member_profile')
              .select('id, full_name')
              .in('id', directUuids);
            
            const profileMap = new Map(profiles?.map(p => [p.id, p.full_name]) || []);
            setTransactions(data.map(t => ({
              ...t,
              direct_name: profileMap.get(t.direct_member_uuid) || 'Unknown Member'
            })));
          } else {
            setTransactions(data);
          }
        }
      } catch (e) {
        console.error('Error fetching sponsor income', e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const total = transactions.reduce((sum, tx) => sum + Number(tx.income_generated), 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto pb-10 space-y-6"
    >
      <PageHeader
        title="Sponsor Income"
        description="Earnings generated from your direct referrals' matching income."
        breadcrumbs={[{ label: 'Business' }, { label: 'Income Dashboard', path: '/business/income-dashboard' }, { label: 'Sponsor Income' }]}
      />

      <Card className="bg-[#232F46] text-white p-6">
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 bg-white/10 rounded-lg">
            <Users className="w-6 h-6 text-[#ED8C32]" />
          </div>
          <div>
            <p className="text-sm text-white/70 font-bold uppercase tracking-wider">Total Sponsor Income</p>
            <p className="text-3xl font-black text-[#ED8C32]">₹{total.toLocaleString()}</p>
          </div>
        </div>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-4 px-4 text-xs font-bold text-gray-500 uppercase">Date</th>
                <th className="py-4 px-4 text-xs font-bold text-gray-500 uppercase">Direct Member</th>
                <th className="py-4 px-4 text-xs font-bold text-gray-500 uppercase text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={3} className="text-center py-8 text-gray-400">Loading...</td></tr>
              ) : transactions.length === 0 ? (
                <tr><td colSpan={3} className="text-center py-8 text-gray-400">No sponsor income transactions found.</td></tr>
              ) : (
                transactions.map((txn) => (
                  <tr key={txn.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 text-sm font-medium text-gray-600">{new Date(txn.created_at).toLocaleDateString()}</td>
                    <td className="py-4 px-4 text-sm font-bold text-[#232F46]">{txn.direct_name}</td>
                    <td className="py-4 px-4 text-sm font-bold text-[#ED8C32] text-right flex items-center justify-end gap-1">
                      <IndianRupee className="w-3 h-3" /> {Number(txn.income_generated).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
