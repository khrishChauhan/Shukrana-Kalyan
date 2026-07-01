import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { supabase } from '../../lib/supabase';
import { Award, IndianRupee } from 'lucide-react';

export default function RoyaltyIncomePage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from('unified_ledger')
          .select('id, amount, source_ref_id, remarks, created_at')
          .eq('member_uuid', user.id)
          .eq('entry_type', 'ROYALTY_INCOME')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        if (data) {
          setTransactions(data.map(t => ({
            id: t.id,
            amount: Number(t.amount),
            month: new Date(t.created_at).toLocaleString('default', { month: 'long' }),
            year: new Date(t.created_at).getFullYear(),
            status: 'PAID',
            created_at: t.created_at
          })));
        }
      } catch (e) {
        console.error('Error fetching royalty income (table may not exist yet):', e);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const total = transactions.reduce((sum, tx) => sum + Number(tx.amount || 0), 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto pb-10 space-y-6"
    >
      <PageHeader
        title="Royalty Income"
        description="Your company turnover sharing based on leadership rank."
        breadcrumbs={[{ label: 'Business' }, { label: 'Income Dashboard', path: '/business/income-dashboard' }, { label: 'Royalty Income' }]}
      />

      <Card className="bg-[#232F46] text-white p-6">
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 bg-white/10 rounded-lg">
            <Award className="w-6 h-6 text-[#ED8C32]" />
          </div>
          <div>
            <p className="text-sm text-white/70 font-bold uppercase tracking-wider">Total Royalty Income</p>
            <p className="text-3xl font-black text-[#ED8C32]">₹{total.toLocaleString()}</p>
          </div>
        </div>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-4 px-4 text-xs font-bold text-gray-500 uppercase">Period</th>
                <th className="py-4 px-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                <th className="py-4 px-4 text-xs font-bold text-gray-500 uppercase text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={3} className="text-center py-8 text-gray-400">Loading...</td></tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-12 text-gray-400">
                    <Award className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                    <p className="font-semibold text-gray-500">No Royalty Income Yet</p>
                    <p className="text-sm">Achieve leadership ranks to start earning company turnover royalties.</p>
                  </td>
                </tr>
              ) : (
                transactions.map((txn) => (
                  <tr key={txn.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 text-sm font-medium text-gray-600">{txn.month} {txn.year}</td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-lg uppercase tracking-wider">{txn.status}</span>
                    </td>
                    <td className="py-4 px-4 text-sm font-bold text-[#ED8C32] text-right flex items-center justify-end gap-1">
                      <IndianRupee className="w-3 h-3" /> {Number(txn.amount).toLocaleString()}
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
