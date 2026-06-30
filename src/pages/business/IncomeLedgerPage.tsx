import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Wallet, Search, Filter } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function IncomeLedgerPage() {
  const [ledger, setLedger] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchLedger = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const [{ data: sponsorTxns }, { data: matchingTxns }, { data: levelTxns }] = await Promise.all([
          supabase.from('sponsor_income_transactions').select('id, income_generated, created_at, status').eq('sponsor_uuid', user.id).order('created_at', { ascending: false }),
          supabase.from('matching_transactions').select('id, income_generated, created_at, ratio_used, match_number').eq('member_uuid', user.id).order('created_at', { ascending: false }),
          supabase.from('level_income_transactions').select('id, income_generated, created_at, level_distance, status').eq('sponsor_uuid', user.id).order('created_at', { ascending: false }),
        ]);

        const combined = [
          ...(sponsorTxns || []).map(tx => ({ ...tx, category: 'Sponsor Income', type: 'Credit', amount: Number(tx.income_generated) })),
          ...(matchingTxns || []).map(tx => ({ ...tx, category: `Binary Match #${tx.match_number} (${tx.ratio_used})`, type: 'Credit', amount: Number(tx.income_generated) })),
          ...(levelTxns || []).map(tx => ({ ...tx, category: `Level ${tx.level_distance} Income`, type: 'Credit', amount: Number(tx.income_generated) })),
        ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

        setLedger(combined);
      } catch (err) {
        console.error('Error fetching ledger', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLedger();
  }, []);

  const filtered = ledger.filter(tx => tx.category.toLowerCase().includes(search.toLowerCase()));
  let runningBalance = ledger.reduce((sum, tx) => sum + tx.amount, 0);
  const ledgerWithBalance = filtered.map(tx => {
    const row = { ...tx, balance: runningBalance };
    runningBalance -= tx.amount;
    return row;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto pb-10 space-y-6"
    >
      <PageHeader
        title="Income Ledger"
        description="Detailed transaction history of all credits and debits."
        breadcrumbs={[{ label: 'Business' }, { label: 'Income Dashboard' }, { label: 'Ledger' }]}
      />

      <Card>
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#ED8C32] text-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-bold text-[#232F46] transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Amount</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Running Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading && (
                <tr><td colSpan={5} className="p-6 text-center text-sm text-gray-400">Loading ledger...</td></tr>
              )}
              {!loading && ledgerWithBalance.length === 0 && (
                <tr><td colSpan={5} className="p-6 text-center text-sm text-gray-400">No income transactions found.</td></tr>
              )}
              {ledgerWithBalance.map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-[#232F46]">{new Date(txn.created_at).toLocaleDateString()}</p>
                    <p className="text-xs font-mono text-gray-500">{txn.id.substring(0, 12)}...</p>
                  </td>
                  <td className="p-4 font-medium text-[#232F46]">{txn.category}</td>
                  <td className="p-4">
                    <span className="inline-flex px-2 py-1 text-[10px] font-bold uppercase rounded-full bg-[#ED8C32]/10 text-[#ED8C32]">
                      {txn.type}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <span className="font-bold text-[#ED8C32]">+₹{txn.amount.toLocaleString()}</span>
                  </td>
                  <td className="p-4 text-right font-bold text-[#232F46]">
                    ₹{txn.balance.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
