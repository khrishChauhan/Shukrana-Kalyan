import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Search, Eye, CheckCircle, XCircle, Ban,
  RefreshCw, Lock, LockOpen, ChevronLeft, ChevronRight, AlertTriangle
} from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import type { StatusType } from '../../components/ui/StatusBadge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { Skeleton } from '../../components/ui/Skeleton';
import { EmptyState } from '../../components/ui/EmptyState';
import { Avatar } from '../../components/ui/Avatar';
import { PageHeader } from '../../components/ui/PageHeader';
import { supabase } from '../../lib/supabase';

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────
interface MemberRow {
  uuid: string;
  member_id: string;
  full_name: string;
  phone_number: string;
  city: string | null;
  join_date: string;
  status: string;
  kyc_status: string;
  rank_name: string | null;
}

type FilterStatus = 'All' | 'ACTIVE' | 'PENDING' | 'SUSPENDED' | 'REJECTED' | 'LOCKED';
const FILTER_TABS: { key: FilterStatus; label: string }[] = [
  { key: 'All',       label: 'All' },
  { key: 'ACTIVE',    label: 'Active' },
  { key: 'PENDING',   label: 'Pending' },
  { key: 'SUSPENDED', label: 'Suspended' },
  { key: 'REJECTED',  label: 'Rejected' },
  { key: 'LOCKED',    label: 'Locked' },
];

const PAGE_SIZE = 25;

function statusToDisplayType(s: string): StatusType {
  if (s === 'ACTIVE')    return 'Active';
  if (s === 'SUSPENDED') return 'Suspended';
  if (s === 'PENDING')   return 'Pending Approval';
  if (s === 'REJECTED')  return 'Rejected' as StatusType;
  if (s === 'LOCKED')    return 'Locked'   as StatusType;
  return s as StatusType;
}

// ─────────────────────────────────────────────────────────────
// Inline Confirm Modal (lightweight - no separate file needed)
// ─────────────────────────────────────────────────────────────
interface QuickConfirmProps {
  open: boolean;
  title: string;
  description: string;
  actionLabel: string;
  actionColor: string;
  onConfirm: (reason: string) => void;
  onClose: () => void;
}
function QuickConfirm({ open, title, description, actionLabel, actionColor, onConfirm, onClose }: QuickConfirmProps) {
  const [reason, setReason] = useState('');
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h3 className="font-bold text-[#232F46]">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
        <textarea
          className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#ED8C32]/30 mb-4"
          rows={2}
          placeholder="Reason (optional)..."
          value={reason}
          onChange={e => setReason(e.target.value)}
        />
        <div className="flex gap-3 justify-end">
          <button onClick={onClose} className="px-4 py-2 text-sm rounded-xl border border-gray-200 hover:bg-gray-50 font-medium">Cancel</button>
          <button
            onClick={() => { onConfirm(reason); setReason(''); }}
            className={`px-4 py-2 text-sm rounded-xl text-white font-bold ${actionColor}`}
          >
            {actionLabel}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────────────────────
export default function AdminMembersPage() {
  const navigate = useNavigate();

  const [members, setMembers] = useState<MemberRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterStatus>('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const [confirmModal, setConfirmModal] = useState<{
    open: boolean; uuid: string; rpcName: string;
    title: string; description: string; actionLabel: string; actionColor: string;
  }>({ open: false, uuid: '', rpcName: '', title: '', description: '', actionLabel: '', actionColor: 'bg-red-600' });

  // ── Fetch members with server-side filter + pagination ──
  const fetchMembers = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('members')
        .select(`
          id,
          member_id,
          status,
          rank_name,
          created_at,
          member_profile ( full_name, phone_number, city ),
          member_kyc ( verification_status )
        `, { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);

      if (activeFilter !== 'All') {
        query = query.eq('status', activeFilter);
      }

      if (search.trim()) {
        // Search by member_id prefix OR join the profile text search
        query = query.ilike('member_id', `%${search.trim()}%`);
      }

      const { data, error, count } = await query;
      if (error) throw error;

      const mapped: MemberRow[] = (data || []).map((m: any) => {
        const profile = Array.isArray(m.member_profile) ? m.member_profile[0] : m.member_profile;
        const kyc     = Array.isArray(m.member_kyc)     ? m.member_kyc[0]     : m.member_kyc;
        return {
          uuid:         m.id,
          member_id:    m.member_id || 'N/A',
          full_name:    profile?.full_name    || 'Unknown',
          phone_number: profile?.phone_number || 'N/A',
          city:         profile?.city         || null,
          join_date:    new Date(m.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          status:       m.status,
          kyc_status:   kyc?.verification_status || 'PENDING',
          rank_name:    m.rank_name || null,
        };
      });

      setMembers(mapped);
      setTotalCount(count || 0);
    } catch (err: any) {
      console.error('Failed to fetch members:', err.message);
    } finally {
      setLoading(false);
    }
  }, [activeFilter, search, page]);

  useEffect(() => {
    // Reset to page 0 when filter/search changes
    setPage(0);
  }, [activeFilter, search]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  // ── Lifecycle action handler ──────────────────────────────
  const runAction = async (rpcName: string, memberUuid: string, reason: string) => {
    setActionLoading(true);
    try {
      const { error } = await supabase.rpc(rpcName, {
        p_member_uuid: memberUuid,
        p_reason: reason || 'Administrative action',
      });
      if (error) throw error;
      setConfirmModal(m => ({ ...m, open: false }));
      await fetchMembers();
    } catch (e: any) {
      alert(`Error: ${e.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleActivate = async (uuid: string) => {
    if (!window.confirm('Activate this member via the placement engine?')) return;
    setActionLoading(true);
    try {
      const { error } = await supabase.rpc('activate_member', { p_member_uuid: uuid });
      if (error) throw error;
      await fetchMembers();
    } catch (e: any) {
      alert(`Error activating member: ${e.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const openConfirm = (
    uuid: string, rpcName: string,
    title: string, description: string,
    actionLabel: string, actionColor: string,
  ) => {
    setConfirmModal({ open: true, uuid, rpcName, title, description, actionLabel, actionColor });
  };


  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  // ── KYC badge colour ─────────────────────────────────────
  const kycBadge = (s: string) => {
    if (s === 'VERIFIED')              return 'bg-green-100  text-green-700';
    if (s === 'REJECTED')              return 'bg-red-100    text-red-700';
    if (s === 'RESUBMISSION_REQUIRED') return 'bg-yellow-100 text-yellow-700';
    return 'bg-gray-100 text-gray-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6 max-w-7xl mx-auto pb-10"
    >
      <PageHeader
        title="Member Directory"
        description="Search, filter, and manage all NGO members with full lifecycle controls."
        breadcrumbs={[{ label: 'Admin Portal' }, { label: 'Members' }]}
      />

      <Card noPadding className="overflow-hidden">
        {/* Filter + Search Bar */}
        <div className="px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center gap-3 justify-between bg-gray-50/50">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {FILTER_TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors border ${
                  activeFilter === key
                    ? 'bg-[#232F46] text-white border-[#232F46]'
                    : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="w-full sm:w-64">
              <Input
                placeholder="Search by Member ID..."
                leftIcon={<Search className="w-4 h-4 text-gray-400" />}
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <button
              onClick={fetchMembers}
              className="p-2 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-500 transition-colors"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white">
          {loading ? (
            <div className="p-5 space-y-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="flex items-center justify-between p-2">
                  <div className="flex items-center gap-4">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="w-32 h-4" />
                      <Skeleton className="w-20 h-3" />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Skeleton className="w-20 h-6 rounded-full" />
                    <Skeleton className="w-16 h-6 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : members.length === 0 ? (
            <EmptyState
              title="No members found"
              description="There are no members matching your selected filters."
            />
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block">
                <Table className="border-none shadow-none rounded-none">
                  <TableHeader className="bg-white">
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Member ID</TableHead>
                      <TableHead>Mobile</TableHead>
                      <TableHead>City</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>KYC</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {members.map(m => (
                      <TableRow key={m.uuid} className="hover:bg-gray-50/50 transition-colors">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar initials={m.full_name} size="sm" />
                            <div>
                              <span className="font-bold text-[#232F46] text-sm">{m.full_name}</span>
                              {m.rank_name && (
                                <p className="text-[10px] text-[#ED8C32] font-semibold">{m.rank_name}</p>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-xs font-bold text-[#ED8C32]">
                          {m.member_id}
                        </TableCell>
                        <TableCell className="text-gray-500 font-mono text-xs">
                          {m.phone_number}
                        </TableCell>
                        <TableCell className="text-gray-500 text-sm">
                          {m.city || '—'}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={statusToDisplayType(m.status)} />
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${kycBadge(m.kyc_status)}`}>
                            {m.kyc_status === 'RESUBMISSION_REQUIRED' ? 'Resubmit' : m.kyc_status.charAt(0) + m.kyc_status.slice(1).toLowerCase()}
                          </span>
                        </TableCell>
                        <TableCell className="text-gray-400 text-xs">{m.join_date}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            {/* View Profile */}
                            <button
                              onClick={() => navigate(`/admin/members/${m.uuid}`)}
                              className="p-1.5 text-gray-400 hover:text-[#232F46] hover:bg-gray-100 rounded-md transition-colors"
                              title="View 360° Profile"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            {/* Activate (only for PENDING) */}
                            {m.status === 'PENDING' && (
                              <button
                                onClick={() => handleActivate(m.uuid)}
                                disabled={actionLoading}
                                className="p-1.5 text-green-500 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors disabled:opacity-40"
                                title="Activate"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                            )}

                            {/* Reject (only for PENDING) */}
                            {m.status === 'PENDING' && (
                              <button
                                onClick={() => openConfirm(m.uuid, 'admin_reject_member', 'Reject Application', `Reject application for ${m.full_name}?`, 'Reject', 'bg-red-600')}
                                className="p-1.5 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                                title="Reject"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            )}

                            {/* Suspend (only for ACTIVE) */}
                            {m.status === 'ACTIVE' && (
                              <button
                                onClick={() => openConfirm(m.uuid, 'admin_suspend_member', 'Suspend Member', `Suspend ${m.full_name}? All commissions will halt.`, 'Suspend', 'bg-orange-600')}
                                className="p-1.5 text-orange-400 hover:text-orange-500 hover:bg-orange-50 rounded-md transition-colors"
                                title="Suspend"
                              >
                                <Ban className="w-4 h-4" />
                              </button>
                            )}

                            {/* Lock (only for ACTIVE) */}
                            {m.status === 'ACTIVE' && (
                              <button
                                onClick={() => openConfirm(m.uuid, 'admin_lock_account', 'Lock Account', `Lock login access for ${m.full_name}?`, 'Lock', 'bg-gray-800')}
                                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                                title="Lock Account"
                              >
                                <Lock className="w-4 h-4" />
                              </button>
                            )}

                            {/* Reactivate / Unlock */}
                            {(m.status === 'SUSPENDED' || m.status === 'LOCKED') && (
                              <button
                                onClick={() => openConfirm(m.uuid, 'admin_reactivate_member', 'Reactivate Member', `Restore ACTIVE status for ${m.full_name}?`, 'Reactivate', 'bg-green-600')}
                                className="p-1.5 text-green-500 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
                                title="Reactivate"
                              >
                                <LockOpen className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile List */}
              <div className="md:hidden divide-y divide-gray-100">
                {members.map(m => (
                  <div key={m.uuid} className="p-4 flex flex-col gap-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar initials={m.full_name} size="md" />
                        <div>
                          <p className="font-bold text-[#232F46] text-sm">{m.full_name}</p>
                          <p className="font-mono text-xs text-[#ED8C32] mt-0.5">{m.member_id}</p>
                        </div>
                      </div>
                      <StatusBadge status={statusToDisplayType(m.status)} />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">{m.phone_number} · {m.join_date}</p>
                      <div className="flex gap-1 border border-gray-100 rounded-lg p-0.5 bg-gray-50">
                        <button onClick={() => navigate(`/admin/members/${m.uuid}`)} className="p-1.5 text-gray-400 hover:text-[#232F46]" title="View"><Eye className="w-4 h-4" /></button>
                        {m.status === 'PENDING'   && <button onClick={() => handleActivate(m.uuid)} className="p-1.5 text-green-500"><CheckCircle className="w-4 h-4" /></button>}
                        {m.status === 'ACTIVE'    && <button onClick={() => openConfirm(m.uuid, 'admin_suspend_member', 'Suspend', `Suspend ${m.full_name}?`, 'Suspend', 'bg-orange-600')} className="p-1.5 text-orange-400"><Ban className="w-4 h-4" /></button>}
                        {(m.status === 'SUSPENDED' || m.status === 'LOCKED') && <button onClick={() => openConfirm(m.uuid, 'admin_reactivate_member', 'Reactivate', `Restore ACTIVE status?`, 'Reactivate', 'bg-green-600')} className="p-1.5 text-green-500"><LockOpen className="w-4 h-4" /></button>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Pagination Footer */}
        <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400 bg-gray-50/50">
          <span>
            Showing {members.length} of {totalCount} members
            {activeFilter !== 'All' && ` · Filter: ${activeFilter}`}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-40 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="px-3 py-1.5 rounded-lg border border-[#232F46] bg-[#232F46] text-white font-bold">
              {page + 1}
            </span>
            <span className="px-1 text-gray-300">/ {Math.max(1, totalPages)}</span>
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={page >= totalPages - 1}
              className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-40 disabled:pointer-events-none"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </Card>

      {/* Lifecycle Confirmation Modal */}
      <QuickConfirm
        open={confirmModal.open}
        title={confirmModal.title}
        description={confirmModal.description}
        actionLabel={confirmModal.actionLabel}
        actionColor={confirmModal.actionColor}
        onClose={() => setConfirmModal(m => ({ ...m, open: false }))}
        onConfirm={(reason) => runAction(confirmModal.rpcName, confirmModal.uuid, reason)}
      />
    </motion.div>
  );
}
