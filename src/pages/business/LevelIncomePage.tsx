import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { supabase } from '../../lib/supabase';
import { ArrowRight, IndianRupee } from 'lucide-react';

export default function LevelIncomePage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data } = await supabase
          .from('unified_ledger')
          .select('id, amount, source_ref_id, remarks, created_at')
          .eq('member_uuid', user.id)
          .eq('entry_type', 'LEVEL_INCOME')
          .order('created_at', { ascending: false });
        
        if (data) {
          setTransactions(data.map(t => ({
            id: t.id,
            income_generated: Number(t.amount),
            level_distance: t.remarks?.match(/Level (\d+)/)?.[1] || '?',
            source_name: t.remarks?.replace(/Level \d+ from /, '') || 'Network Member',
            created_at: t.created_at
          })));
        }
      } catch (e) {
        console.error('Error fetching level income', e);
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
        title="Level Income"
        description="Detailed ledger of your Level Income earnings."
        breadcrumbs={[{ label: 'Business' }, { label: 'Income Dashboard', path: '/business/income-dashboard' }, { label: 'Level Income' }]}
      />

      <Card className="bg-[#232F46] text-white p-6">
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 bg-white/10 rounded-lg">
            <ArrowRight className="w-6 h-6 text-[#ED8C32]" />
          </div>
          <div>
            <p className="text-sm text-white/70 font-bold uppercase tracking-wider">Total Level Income</p>
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
                <th className="py-4 px-4 text-xs font-bold text-gray-500 uppercase">Level</th>
                <th className="py-4 px-4 text-xs font-bold text-gray-500 uppercase">Remarks</th>
                <th className="py-4 px-4 text-xs font-bold text-gray-500 uppercase text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="text-center py-8 text-gray-400">Loading...</td></tr>
              ) : transactions.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-8 text-gray-400">No level income transactions found.</td></tr>
              ) : (
                transactions.map((txn) => (
                  <tr key={txn.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 text-sm font-medium text-gray-600">{new Date(txn.created_at).toLocaleDateString()}</td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-lg">Level {txn.level_distance}</span>
                    </td>
                    <td className="py-4 px-4 text-sm font-bold text-[#232F46]">{txn.source_name}</td>
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
