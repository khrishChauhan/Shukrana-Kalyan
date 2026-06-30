import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { supabase } from '../../lib/supabase';
import { Download, FileText, Search, Filter } from 'lucide-react';

const ENTRY_LABELS: Record<string, string> = {
  MATCHING_INCOME: 'Binary Income', SPONSOR_INCOME: 'Sponsor Income',
  LEVEL_INCOME: 'Level Income', ROYALTY_INCOME: 'Royalty Income',
  WITHDRAWAL_DEBIT: 'Withdrawal', WITHDRAWAL_REVERSAL: 'Withdrawal Reversal',
  ADMIN_CORRECTION_CREDIT: 'Admin Credit', ADMIN_CORRECTION_DEBIT: 'Admin Debit',
};

export default function WalletLedgerPage() {
  const [ledger, setLedger] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    const fetchLedger = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const { data } = await supabase
          .from('unified_ledger')
          .select('id, entry_type, direction, amount, balance_after, source_ref_id, remarks, created_at')
          .eq('member_uuid', user.id)
          .order('created_at', { ascending: false });
        if (data) setLedger(data);
      } catch (err) {
        console.error('Error fetching wallet ledger', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLedger();
  }, []);

  const filtered = ledger.filter(txn => {
    const label = ENTRY_LABELS[txn.entry_type] || txn.entry_type;
    const matchesSearch = label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (txn.remarks || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || txn.entry_type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="max-w-6xl mx-auto pb-10 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader title="Wallet Ledger" description="Detailed financial statement and transaction history." breadcrumbs={[{ label: 'Business' }, { label: 'Wallet Center' }, { label: 'Ledger' }]} />
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><Download className="w-4 h-4" /> Export CSV</Button>
          <Button variant="outline" className="gap-2"><FileText className="w-4 h-4" /> Export PDF</Button>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search transactions..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#ED8C32]" />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-gray-500" />
            <select value={filterType} onChange={e => setFilterType(e.target.value)} className="w-full sm:w-auto py-2 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#ED8C32]">
              <option value="All">All Types</option>
              {Object.entries(ENTRY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">TXN ID</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Income Type</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Remarks</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Credit</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Debit</th>
                <th className="p-4 text-xs font-bold text-[#232F46] uppercase tracking-wider text-right">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading && <tr><td colSpan={7} className="p-8 text-center text-gray-400">Loading ledger...</td></tr>}
              {!loading && filtered.length === 0 && <tr><td colSpan={7} className="p-8 text-center text-gray-500">No transactions found.</td></tr>}
              {filtered.map(txn => (
                <tr key={txn.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-sm font-medium text-[#232F46] whitespace-nowrap">{new Date(txn.created_at).toLocaleDateString()}</td>
                  <td className="p-4 text-xs font-mono text-gray-500">{txn.id.substring(0, 12)}…</td>
                  <td className="p-4 text-sm font-medium text-gray-700">{ENTRY_LABELS[txn.entry_type] || txn.entry_type}</td>
                  <td className="p-4 text-sm text-gray-500">{txn.remarks || '—'}</td>
                  <td className="p-4 text-sm text-right font-bold text-green-600">{txn.direction === 'CREDIT' ? `+₹${Number(txn.amount).toLocaleString()}` : '-'}</td>
                  <td className="p-4 text-sm text-right font-bold text-red-600">{txn.direction === 'DEBIT' ? `-₹${Number(txn.amount).toLocaleString()}` : '-'}</td>
                  <td className="p-4 text-sm text-right font-black text-[#232F46] bg-gray-50/50">₹{Number(txn.balance_after).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500 bg-gray-50">
          <span>Showing {filtered.length} of {ledger.length} transactions</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
