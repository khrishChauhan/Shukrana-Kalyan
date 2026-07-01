import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Search, RefreshCw, Shield, AlertTriangle, UserX, Activity } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { Skeleton } from '../../components/ui/Skeleton';
import { EmptyState } from '../../components/ui/EmptyState';
import { PageHeader } from '../../components/ui/PageHeader';
import { supabase } from '../../lib/supabase';

interface AuditLog {
  id: string;
  admin_uuid: string;
  admin_name: string;
  action_type: string;
  payload: any;
  ip_address: string;
  created_at: string;
}

const PAGE_SIZE = 50;

export default function AdminSecurityDashboardPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [actionFilter, setActionFilter] = useState('');
  
  // Pagination
  const [page, setPage] = useState(0);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('get_security_audit_feed', {
        p_limit: PAGE_SIZE,
        p_offset: page * PAGE_SIZE,
        p_filter: actionFilter || null
      });
      if (error) throw error;
      setLogs(data || []);
    } catch (e: any) {
      console.error('Failed to fetch security logs:', e.message);
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

  const getActionIcon = (action: string) => {
    if (action.includes('TERMINATE')) return <UserX className="w-4 h-4 text-red-500" />;
    if (action.includes('SETTING')) return <Activity className="w-4 h-4 text-orange-500" />;
    if (action.includes('BROADCAST') || action.includes('NOTIFICATION')) return <Shield className="w-4 h-4 text-blue-500" />;
    return <Shield className="w-4 h-4 text-gray-500" />;
  };

  const terminateSession = async () => {
    const uuid = window.prompt("Enter the exact Member UUID to terminate their active sessions:");
    if (!uuid) return;

    try {
      const { error } = await supabase.rpc('admin_terminate_member_session', { p_member_uuid: uuid });
      if (error) throw error;
      alert("Session termination logged successfully.");
      fetchLogs();
    } catch (e: any) {
      alert(`Error: ${e.message}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6 max-w-7xl mx-auto pb-10"
    >
      <PageHeader
        title="Audit & Security Dashboard"
        description="Immutable logs of high-privilege operations and system configuration changes."
        breadcrumbs={[{ label: 'Administration' }, { label: 'Security' }]}
        action={
          <div className="flex gap-3">
            <Button leftIcon={<UserX className="w-4 h-4" />} variant="outline" className="text-red-600 hover:bg-red-50 hover:border-red-200" onClick={terminateSession}>
              Force Terminate Session
            </Button>
            <Button leftIcon={<RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />} variant="primary" onClick={fetchLogs}>
              Refresh Logs
            </Button>
          </div>
        }
      />

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="flex items-center gap-4 bg-red-50 border-red-100">
          <div className="bg-red-100 p-3 rounded-xl shrink-0">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <p className="text-xs font-bold text-red-600 mb-0.5">Failed Logins (24h)</p>
            <p className="text-2xl font-black text-red-900">0</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="bg-orange-100 p-3 rounded-xl shrink-0">
            <Activity className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 mb-0.5">Config Changes (24h)</p>
            <p className="text-2xl font-black text-[#232F46]">{logs.filter(l => l.action_type === 'SETTING_CHANGED').length}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-xl shrink-0">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 mb-0.5">Active Admin Sessions</p>
            <p className="text-2xl font-black text-[#232F46]">1</p>
          </div>
        </Card>
      </div>

      <Card noPadding className="overflow-hidden">
        {/* Filters */}
        <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50 flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-[200px]">
            <select
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#ED8C32]/30"
              value={actionFilter}
              onChange={e => setActionFilter(e.target.value)}
            >
              <option value="">All Admin Actions</option>
              <option value="SETTING_CHANGED">Setting Changed</option>
              <option value="BROADCAST_ANNOUNCEMENT">Broadcast Announcement</option>
              <option value="TARGETED_NOTIFICATION">Targeted Notification</option>
              <option value="TERMINATE_SESSION">Terminated Session</option>
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
            <EmptyState title="No audit logs found" description="Adjust your filters to see more results." />
          ) : (
            <div className="overflow-x-auto">
              <Table className="border-none shadow-none rounded-none w-full whitespace-nowrap">
                <TableHeader className="bg-white">
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Admin</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Payload (Before / After)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map(log => (
                    <TableRow key={log.id} className="hover:bg-gray-50/50 transition-colors">
                      <TableCell className="text-gray-500 text-xs">
                        {new Date(log.created_at).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="font-bold text-[#232F46] text-sm">{log.admin_name || 'System'}</div>
                        <div className="font-mono text-[10px] text-gray-400">{log.admin_uuid}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="bg-white border border-gray-100 rounded-full p-1 shadow-sm shrink-0">
                            {getActionIcon(log.action_type)}
                          </div>
                          <span className="text-xs font-bold text-gray-600">
                            {log.action_type.replace(/_/g, ' ')}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-xs text-gray-500">
                        {log.ip_address || '—'}
                      </TableCell>
                      <TableCell>
                        <pre className="text-[10px] font-mono text-gray-600 bg-gray-50 p-2 rounded max-w-lg overflow-x-auto border border-gray-100">
                          {JSON.stringify(log.payload, null, 2)}
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
