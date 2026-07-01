import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Search, Download, RefreshCw, Filter, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { Skeleton } from '../../components/ui/Skeleton';
import { EmptyState } from '../../components/ui/EmptyState';
import { PageHeader } from '../../components/ui/PageHeader';
import { supabase } from '../../lib/supabase';

interface LedgerEntry {
  id: string;
  member_uuid: string;
  member_id: string;
  member_name: string;
  entry_type: string;
  direction: 'CREDIT' | 'DEBIT';
  amount: number;
  balance_after: number;
  remarks: string | null;
  created_at: string;
}

const PAGE_SIZE = 25;

export default function AdminBusinessLedgerPage() {
  const [entries, setEntries] = useState<LedgerEntry[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [searchMemberId, setSearchMemberId] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [directionFilter, setDirectionFilter] = useState('');
  
  // Pagination
  const [page, setPage] = useState(0);

  const fetchLedger = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('get_unified_ledger_explorer', {
        p_member_id: searchMemberId.trim() || null,
        p_type: typeFilter || null,
        p_direction: directionFilter || null,
        p_limit: PAGE_SIZE,
        p_offset: page * PAGE_SIZE
      });
      if (error) throw error;
      setEntries(data || []);
    } catch (e: any) {
      console.error('Failed to fetch ledger:', e.message);
    } finally {
      setLoading(false);
    }
  }, [searchMemberId, typeFilter, directionFilter, page]);

  useEffect(() => {
    setPage(0);
  }, [searchMemberId, typeFilter, directionFilter]);

  useEffect(() => {
    fetchLedger();
  }, [fetchLedger]);

  const exportCsv = () => {
    const rows = [
      ['Date', 'Member ID', 'Member Name', 'Type', 'Direction', 'Amount', 'Balance After', 'Remarks'],
      ...entries.map(e => [
        new Date(e.created_at).toLocaleString(),
        e.member_id,
        e.member_name,
        e.entry_type,
        e.direction,
        e.amount,
        e.balance_after,
        e.remarks || ''
      ]),
    ];
    const csv = rows.map(r => r.map(v => `"${v}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ledger_export_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6 max-w-7xl mx-auto pb-10"
    >
      <PageHeader
        title="Unified Ledger Explorer"
        description="Search and audit all financial movements across the platform."
        breadcrumbs={[{ label: 'Operations' }, { label: 'Ledger' }]}
        action={
          <Button leftIcon={<Download className="w-4 h-4" />} onClick={exportCsv}>
            Export CSV
          </Button>
        }
      />

      <Card noPadding className="overflow-hidden">
        {/* Filters */}
        <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50 flex flex-wrap gap-3 items-center">
          <div className="w-full sm:w-64">
            <Input
              placeholder="Search by Member ID..."
              leftIcon={<Search className="w-4 h-4 text-gray-400" />}
              value={searchMemberId}
              onChange={e => setSearchMemberId(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <Filter className="w-4 h-4 text-gray-400 shrink-0" />
            <select
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#ED8C32]/30 flex-1"
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="MATCHING_BONUS">Matching Bonus</option>
              <option value="SPONSOR_BONUS">Sponsor Bonus</option>
              <option value="LEVEL_BONUS">Level Bonus</option>
              <option value="ROYALTY_BONUS">Royalty Bonus</option>
              <option value="WITHDRAWAL_REQUEST">Withdrawal Request</option>
              <option value="WITHDRAWAL_REFUND">Withdrawal Refund</option>
              <option value="MANUAL_ADJUSTMENT_CREDIT">Manual Credit</option>
              <option value="MANUAL_ADJUSTMENT_DEBIT">Manual Debit</option>
            </select>

            <select
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#ED8C32]/30 flex-1"
              value={directionFilter}
              onChange={e => setDirectionFilter(e.target.value)}
            >
              <option value="">All Directions</option>
              <option value="CREDIT">Credits Only</option>
              <option value="DEBIT">Debits Only</option>
            </select>
          </div>
          
          <button
            onClick={fetchLedger}
            className="p-2 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-500 transition-colors"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Table */}
        <div className="bg-white">
          {loading ? (
            <div className="p-5 space-y-4">
              {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="w-full h-12 rounded-lg" />)}
            </div>
          ) : entries.length === 0 ? (
            <EmptyState title="No ledger entries found" description="Adjust your filters to see more results." />
          ) : (
            <div className="overflow-x-auto">
              <Table className="border-none shadow-none rounded-none w-full whitespace-nowrap">
                <TableHeader className="bg-white">
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Member</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Balance After</TableHead>
                    <TableHead>Remarks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entries.map(e => (
                    <TableRow key={e.id} className="hover:bg-gray-50/50 transition-colors">
                      <TableCell className="text-gray-500 text-xs">
                        {new Date(e.created_at).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="font-bold text-[#232F46] text-sm">{e.member_name}</div>
                        <div className="font-mono text-xs text-[#ED8C32]">{e.member_id}</div>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded-full border border-gray-200">
                          {e.entry_type.replace(/_/g, ' ')}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className={`flex items-center gap-1 font-bold ${e.direction === 'CREDIT' ? 'text-green-600' : 'text-red-600'}`}>
                          {e.direction === 'CREDIT' ? <ArrowDownLeft className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                          ₹{e.amount.toFixed(2)}
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-gray-600">
                        ₹{e.balance_after.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-xs text-gray-400 truncate max-w-[200px]" title={e.remarks || ''}>
                        {e.remarks || '—'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400 bg-gray-50/50">
          <span>Page {page + 1} (Up to {PAGE_SIZE} items)</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage(p => p - 1)}>Previous</Button>
            <Button variant="outline" size="sm" disabled={entries.length < PAGE_SIZE} onClick={() => setPage(p => p + 1)}>Next</Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
