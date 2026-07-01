import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Search, RefreshCw, Activity, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { Skeleton } from '../../components/ui/Skeleton';
import { EmptyState } from '../../components/ui/EmptyState';
import { PageHeader } from '../../components/ui/PageHeader';
import { supabase } from '../../lib/supabase';

interface ActivityLog {
  id: string;
  member_uuid: string;
  member_id: string;
  member_name: string;
  action: string;
  details: any;
  created_at: string;
}

const PAGE_SIZE = 50;

export default function AdminActivityMonitoringPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [actionFilter, setActionFilter] = useState('');
  
  // Pagination
  const [page, setPage] = useState(0);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('get_system_activity_feed', {
        p_limit: PAGE_SIZE,
        p_offset: page * PAGE_SIZE,
        p_action_filter: actionFilter || null
      });
      if (error) throw error;
      setLogs(data || []);
    } catch (e: any) {
      console.error('Failed to fetch activity logs:', e.message);
    } finally {
      setLoading(false);
    }
  }, [actionFilter, page]);

  useEffect(() => {
    setPage(0);
  }, [actionFilter]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const getActivityIcon = (action: string) => {
    if (action.includes('ACTIVATED') || action.includes('CREDIT')) return <ShieldCheck className="w-4 h-4 text-green-500" />;
    if (action.includes('REJECTED') || action.includes('DEBIT') || action.includes('FAILED')) return <AlertTriangle className="w-4 h-4 text-red-500" />;
    if (action.includes('SUSPENDED')) return <AlertTriangle className="w-4 h-4 text-orange-500" />;
    return <Activity className="w-4 h-4 text-blue-500" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6 max-w-7xl mx-auto pb-10"
    >
      <PageHeader
        title="System Activity Monitoring"
        description="Real-time heartbeat of all backend business engines and administrative actions."
        breadcrumbs={[{ label: 'Operations' }, { label: 'Activity' }]}
        action={
          <Button leftIcon={<RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />} variant="outline" onClick={fetchLogs}>
            Refresh
          </Button>
        }
      />

      <Card noPadding className="overflow-hidden">
        {/* Filters */}
        <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50 flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-[200px]">
            <select
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#ED8C32]/30"
              value={actionFilter}
              onChange={e => setActionFilter(e.target.value)}
            >
              <option value="">All Activities</option>
              <optgroup label="System Events">
                <option value="MEMBER_ACTIVATED">Member Activated</option>
                <option value="BV_DISTRIBUTED">BV Distributed</option>
                <option value="MATCHING_PROCESSED">Matching Processed</option>
                <option value="PLACEMENT_FAILED">Placement Failed</option>
              </optgroup>
              <optgroup label="Admin Actions">
                <option value="ADMIN_MANUAL_CREDIT">Manual Credit</option>
                <option value="ADMIN_MANUAL_DEBIT">Manual Debit</option>
                <option value="MEMBER_SUSPENDED">Member Suspended</option>
                <option value="MEMBER_REACTIVATED">Member Reactivated</option>
                <option value="PAYMENT_REJECTED">Payment Rejected</option>
              </optgroup>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white">
          {loading ? (
            <div className="p-5 space-y-4">
              {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="w-full h-12 rounded-lg" />)}
            </div>
          ) : logs.length === 0 ? (
            <EmptyState title="No activity found" description="Adjust your filters to see more results." />
          ) : (
            <div className="overflow-x-auto">
              <Table className="border-none shadow-none rounded-none w-full whitespace-nowrap">
                <TableHeader className="bg-white">
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Member Target</TableHead>
                    <TableHead>Payload / Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map(log => (
                    <TableRow key={log.id} className="hover:bg-gray-50/50 transition-colors">
                      <TableCell className="text-gray-500 text-xs">
                        {new Date(log.created_at).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="bg-white border border-gray-100 rounded-full p-1 shadow-sm shrink-0">
                            {getActivityIcon(log.action)}
                          </div>
                          <span className="text-xs font-bold text-gray-600">
                            {log.action.replace(/_/g, ' ')}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {log.member_id ? (
                          <>
                            <div className="font-bold text-[#232F46] text-sm">{log.member_name}</div>
                            <div className="font-mono text-xs text-[#ED8C32]">{log.member_id}</div>
                          </>
                        ) : (
                          <span className="text-gray-400 italic text-xs">System Wide</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <pre className="text-[10px] font-mono text-gray-500 bg-gray-50 p-2 rounded max-w-sm overflow-x-auto">
                          {JSON.stringify(log.details, null, 2)}
                        </pre>
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
            <Button variant="outline" size="sm" disabled={logs.length < PAGE_SIZE} onClick={() => setPage(p => p + 1)}>Next</Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
