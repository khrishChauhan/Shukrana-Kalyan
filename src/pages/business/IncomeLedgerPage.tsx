import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { supabase } from '../../lib/supabase';
import { Wallet, IndianRupee } from 'lucide-react';

export default function IncomeLedgerPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLedger = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Fetch from all income engines
        const [
          { data: sponsorData },
          { data: matchingData },
          { data: levelData }
        ] = await Promise.all([
          supabase.from('sponsor_income_transactions').select('id, income_generated, created_at').eq('sponsor_uuid', user.id).order('created_at', { ascending: false }),
          supabase.from('matching_transactions').select('id, income_generated, created_at, ratio_used').eq('member_uuid', user.id).order('created_at', { ascending: false }),
          supabase.from('level_income_transactions').select('id, income_generated, created_at, level_distance').eq('sponsor_uuid', user.id).order('created_at', { ascending: false })
        ]);

        const combined = [
          ...(sponsorData || []).map(tx => ({ ...tx, category: 'Sponsor Income', type: 'Credit', amount: tx.income_generated })),
          ...(matchingData || []).map(tx => ({ ...tx, category: `Binary Match (${tx.ratio_used})`, type: 'Credit', amount: tx.income_generated })),
          ...(levelData || []).map(tx => ({ ...tx, category: `Level ${tx.level_distance} Income`, type: 'Credit', amount: tx.income_generated })),
        ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

        setTransactions(combined);
      } catch (err) {
        console.error('Error fetching income ledger', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLedger();
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
        title="Income Ledger"
        description="Unified ledger of all your income transactions."
        breadcrumbs={[{ label: 'Business' }, { label: 'Income Dashboard', path: '/business/income-dashboard' }, { label: 'Income Ledger' }]}
      />

      <Card className="bg-[#232F46] text-white p-6">
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 bg-white/10 rounded-lg">
            <Wallet className="w-6 h-6 text-[#ED8C32]" />
          </div>
          <div>
            <p className="text-sm text-white/70 font-bold uppercase tracking-wider">Total Accumulated Income</p>
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
                <th className="py-4 px-4 text-xs font-bold text-gray-500 uppercase">Category</th>
                <th className="py-4 px-4 text-xs font-bold text-gray-500 uppercase">Type</th>
                <th className="py-4 px-4 text-xs font-bold text-gray-500 uppercase text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="text-center py-8 text-gray-400">Loading...</td></tr>
              ) : transactions.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-8 text-gray-400">No income transactions found.</td></tr>
              ) : (
                transactions.map((txn, idx) => (
                  <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 text-sm font-medium text-gray-600">{new Date(txn.created_at).toLocaleDateString()}</td>
                    <td className="py-4 px-4 text-sm font-bold text-[#232F46]">{txn.category}</td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-lg uppercase tracking-wider">{txn.type}</span>
                    </td>
                    <td className="py-4 px-4 text-sm font-bold text-emerald-600 text-right flex items-center justify-end gap-1">
                      + <IndianRupee className="w-3 h-3" /> {Number(txn.amount).toLocaleString()}
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
