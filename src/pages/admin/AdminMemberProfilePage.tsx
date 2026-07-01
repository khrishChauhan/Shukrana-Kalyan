import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, User, Briefcase, Shield, Wallet, Clock, StickyNote,
  CheckCircle, XCircle, Ban, Lock, LockOpen, RefreshCw, Edit3,
  ChevronRight, Copy, AlertTriangle, Plus, Save
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import type { StatusType } from '../../components/ui/StatusBadge';
import { Avatar } from '../../components/ui/Avatar';
import { Skeleton } from '../../components/ui/Skeleton';
import { supabase } from '../../lib/supabase';

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────
interface Member360 {
  member: {
    id: string; member_id: string; status: string;
    rank_name: string | null; created_at: string;
  };
  profile: {
    full_name: string; phone_number: string; email: string | null;
    city: string | null; state: string | null; address: string | null;
    country_code: string;
  };
  business: {
    sponsor_member_uuid: string | null; placement_parent_uuid: string | null;
    placement_side: string | null; total_left_bv: number; total_right_bv: number;
    carry_forward_left: number; carry_forward_right: number; matched_bv: number;
    has_completed_first_match: boolean; sponsor_member_id: string | null;
    sponsor_name: string | null; direct_left_count: number; direct_right_count: number;
    total_team_size: number;
  };
  kyc: {
    verification_status: string; bank_name: string | null; account_number: string | null;
    ifsc_code: string | null; pan_number: string | null; aadhaar_number: string | null;
    nominee_name: string | null; nominee_relation: string | null;
    remarks: string | null; verified_at: string | null;
  };
  wallet: {
    available_balance: number; lifetime_earnings: number;
    lifetime_withdrawals: number; locked_balance: number;
  } | null;
  matching_summary: { total_matches: number; total_income: number };
}

interface ActivityLog {
  id: string; action: string; details: any; created_at: string;
}
interface AdminNote {
  id: string; admin_uuid: string; note: string; created_at: string;
}

type TabId = 'overview' | 'business' | 'kyc' | 'wallet' | 'timeline' | 'notes';

const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'overview',  label: 'Personal',  icon: User },
  { id: 'business',  label: 'Business',  icon: Briefcase },
  { id: 'kyc',       label: 'KYC',       icon: Shield },
  { id: 'wallet',    label: 'Wallet',    icon: Wallet },
  { id: 'timeline',  label: 'Timeline',  icon: Clock },
  { id: 'notes',     label: 'Notes',     icon: StickyNote },
];

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────
function statusToDisplayType(s: string): StatusType {
  if (s === 'ACTIVE')     return 'Active';
  if (s === 'SUSPENDED')  return 'Suspended';
  if (s === 'PENDING')    return 'Pending Approval';
  if (s === 'REJECTED')   return 'Rejected' as StatusType;
  if (s === 'LOCKED')     return 'Locked' as StatusType;
  return s as StatusType;
}

function kycToDisplay(s: string) {
  if (s === 'VERIFIED')              return { label: 'Verified',          color: 'bg-green-100 text-green-700' };
  if (s === 'REJECTED')              return { label: 'Rejected',          color: 'bg-red-100 text-red-700' };
  if (s === 'RESUBMISSION_REQUIRED') return { label: 'Resubmission Req.', color: 'bg-yellow-100 text-yellow-700' };
  return { label: 'Pending',         color: 'bg-gray-100 text-gray-600' };
}

function InfoRow({ label, value, mono = false }: { label: string; value?: string | null; mono?: boolean }) {
  return (
    <div className="flex flex-col gap-0.5 py-3 border-b border-gray-100 last:border-0">
      <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</span>
      <span className={`text-sm text-[#232F46] font-semibold ${mono ? 'font-mono' : ''}`}>
        {value || <span className="text-gray-300 italic font-normal">Not set</span>}
      </span>
    </div>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-1">
      <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</span>
      <span className="text-2xl font-bold text-[#232F46]">{value}</span>
      {sub && <span className="text-xs text-gray-400">{sub}</span>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Confirmation Modal
// ─────────────────────────────────────────────────────────────
interface ConfirmModalProps {
  open: boolean;
  title: string;
  description: string;
  actionLabel: string;
  actionColor?: string;
  requireReason?: boolean;
  onConfirm: (reason: string) => void;
  onClose: () => void;
}
function ConfirmModal({ open, title, description, actionLabel, actionColor = 'bg-red-600', requireReason = true, onConfirm, onClose }: ConfirmModalProps) {
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
          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="font-bold text-[#232F46]">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
        {requireReason && (
          <textarea
            className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#ED8C32]/30 mb-4"
            rows={3}
            placeholder="Enter reason (optional but recommended)..."
            value={reason}
            onChange={e => setReason(e.target.value)}
          />
        )}
        <div className="flex gap-3 justify-end">
          <button onClick={onClose} className="px-4 py-2 text-sm rounded-xl border border-gray-200 hover:bg-gray-50 font-medium">
            Cancel
          </button>
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
// Edit Profile Modal
// ─────────────────────────────────────────────────────────────
interface EditProfileModalProps {
  open: boolean;
  profile: Member360['profile'] | null;
  onSave: (data: Partial<Member360['profile']>) => void;
  onClose: () => void;
}
function EditProfileModal({ open, profile, onSave, onClose }: EditProfileModalProps) {
  const [form, setForm] = useState({ full_name: '', phone_number: '', email: '', city: '', state: '', address: '' });
  useEffect(() => {
    if (profile) setForm({
      full_name: profile.full_name || '', phone_number: profile.phone_number || '',
      email: profile.email || '', city: profile.city || '',
      state: profile.state || '', address: profile.address || ''
    });
  }, [profile]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full mx-4"
      >
        <h3 className="font-bold text-[#232F46] mb-4 text-lg">Edit Member Profile</h3>
        <div className="space-y-3">
          {(['full_name', 'phone_number', 'email', 'city', 'state', 'address'] as const).map(field => (
            <div key={field}>
              <label className="text-xs text-gray-400 uppercase tracking-wide font-medium block mb-1">
                {field.replace('_', ' ')}
              </label>
              <input
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ED8C32]/30"
                value={form[field]}
                onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
              />
            </div>
          ))}
        </div>
        <div className="flex gap-3 justify-end mt-5">
          <button onClick={onClose} className="px-4 py-2 text-sm rounded-xl border border-gray-200 hover:bg-gray-50 font-medium">Cancel</button>
          <button onClick={() => onSave(form)} className="px-4 py-2 text-sm rounded-xl bg-[#232F46] text-white font-bold flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// KYC Modal
// ─────────────────────────────────────────────────────────────
interface KycModalProps {
  open: boolean;
  onProcess: (status: string, remarks: string) => void;
  onClose: () => void;
}
function KycModal({ open, onProcess, onClose }: KycModalProps) {
  const [status, setStatus] = useState('VERIFIED');
  const [remarks, setRemarks] = useState('');
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4"
      >
        <h3 className="font-bold text-[#232F46] mb-4 text-lg">Process KYC</h3>
        <div className="mb-3">
          <label className="text-xs text-gray-400 uppercase tracking-wide font-medium block mb-2">New Status</label>
          <div className="flex gap-2">
            {['VERIFIED', 'REJECTED', 'RESUBMISSION_REQUIRED'].map(s => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`flex-1 py-2 text-xs rounded-xl font-bold border transition-colors ${status === s ? 'bg-[#232F46] text-white border-[#232F46]' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
              >
                {s === 'RESUBMISSION_REQUIRED' ? 'Resubmit' : s.charAt(0) + s.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>
        <textarea
          className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#ED8C32]/30 mb-4"
          rows={3}
          placeholder="Admin remarks (optional for verification, recommended for rejection)..."
          value={remarks}
          onChange={e => setRemarks(e.target.value)}
        />
        <div className="flex gap-3 justify-end">
          <button onClick={onClose} className="px-4 py-2 text-sm rounded-xl border border-gray-200 hover:bg-gray-50 font-medium">Cancel</button>
          <button onClick={() => onProcess(status, remarks)} className="px-4 py-2 text-sm rounded-xl bg-[#ED8C32] text-white font-bold">
            Process KYC
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────────────────────
export default function AdminMemberProfilePage() {
  const { uuid } = useParams<{ uuid: string }>();
  const navigate = useNavigate();

  const [data, setData] = useState<Member360 | null>(null);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [notes, setNotes] = useState<AdminNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [actionLoading, setActionLoading] = useState(false);
  const [newNote, setNewNote] = useState('');

  // Modal states
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean; title: string; description: string; actionLabel: string;
    actionColor?: string; rpcName: string; requireReason?: boolean;
  }>({ open: false, title: '', description: '', actionLabel: '', rpcName: '' });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [kycModalOpen, setKycModalOpen] = useState(false);

  const fetch360 = useCallback(async () => {
    if (!uuid) return;
    setLoading(true);
    try {
      const { data: result, error } = await supabase.rpc('get_admin_member_360_view', { p_member_uuid: uuid });
      if (error) throw error;
      setData(result as Member360);
    } catch (e: any) {
      console.error('Failed to load member:', e.message);
    } finally {
      setLoading(false);
    }
  }, [uuid]);

  const fetchLogs = useCallback(async () => {
    if (!uuid) return;
    const { data } = await supabase
      .from('activity_logs')
      .select('id, action, details, created_at')
      .eq('member_uuid', uuid)
      .order('created_at', { ascending: false })
      .limit(50);
    setLogs(data || []);
  }, [uuid]);

  const fetchNotes = useCallback(async () => {
    if (!uuid) return;
    const { data } = await supabase
      .from('admin_member_notes')
      .select('id, admin_uuid, note, created_at')
      .eq('member_uuid', uuid)
      .order('created_at', { ascending: false });
    setNotes(data || []);
  }, [uuid]);

  useEffect(() => {
    fetch360();
    fetchLogs();
    fetchNotes();
  }, [fetch360, fetchLogs, fetchNotes]);

  // ── RPC Actions ──────────────────────────────────────────
  const runLifecycleRpc = async (rpcName: string, reason: string) => {
    if (!uuid) return;
    setActionLoading(true);
    try {
      const { error } = await supabase.rpc(rpcName, { p_member_uuid: uuid, p_reason: reason || 'Administrative action' });
      if (error) throw error;
      setConfirmModal(m => ({ ...m, open: false }));
      await fetch360();
      await fetchLogs();
    } catch (e: any) {
      alert(`Error: ${e.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditProfile = async (form: Partial<Member360['profile']>) => {
    if (!uuid) return;
    setActionLoading(true);
    try {
      const { error } = await supabase.rpc('admin_update_member_profile', {
        p_member_uuid:  uuid,
        p_full_name:    form.full_name    || null,
        p_phone_number: form.phone_number || null,
        p_email:        form.email        || null,
        p_city:         form.city         || null,
        p_state:        form.state        || null,
        p_address:      form.address      || null,
      });
      if (error) throw error;
      setEditModalOpen(false);
      await fetch360();
    } catch (e: any) {
      alert(`Error: ${e.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleProcessKyc = async (status: string, remarks: string) => {
    if (!uuid) return;
    setActionLoading(true);
    try {
      const { error } = await supabase.rpc('admin_process_kyc', {
        p_member_uuid: uuid,
        p_new_status:  status,
        p_remarks:     remarks || null,
      });
      if (error) throw error;
      setKycModalOpen(false);
      await fetch360();
      await fetchLogs();
    } catch (e: any) {
      alert(`Error: ${e.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddNote = async () => {
    if (!uuid || !newNote.trim()) return;
    setActionLoading(true);
    try {
      const { error } = await supabase.rpc('add_admin_member_note', {
        p_member_uuid: uuid,
        p_note:        newNote.trim(),
      });
      if (error) throw error;
      setNewNote('');
      await fetchNotes();
    } catch (e: any) {
      alert(`Error: ${e.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const openConfirm = (rpcName: string, title: string, description: string, actionLabel: string, actionColor = 'bg-red-600', requireReason = true) => {
    setConfirmModal({ open: true, rpcName, title, description, actionLabel, actionColor, requireReason });
  };

  // ── Render ───────────────────────────────────────────────
  if (loading) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto pb-10">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-64 rounded-2xl" />
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-12 rounded-xl" />
            <Skeleton className="h-48 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <AlertTriangle className="w-12 h-12 text-red-400" />
        <p className="text-gray-500">Member not found or access denied.</p>
        <Button onClick={() => navigate('/admin/members')} leftIcon={<ArrowLeft className="w-4 h-4" />}>
          Back to Members
        </Button>
      </div>
    );
  }

  const { member, profile, business, kyc, wallet, matching_summary } = data;
  const memberStatus = statusToDisplayType(member.status);
  const kycDisplay = kycToDisplay(kyc.verification_status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6 max-w-5xl mx-auto pb-10"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/admin/members')}
          className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-[#232F46] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-[#232F46]">Member Profile</h1>
          <p className="text-xs text-gray-400">
            <span className="font-mono">{member.member_id}</span>
            <ChevronRight className="w-3 h-3 inline mx-1" />
            360° Admin View
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Identity Card */}
        <div className="space-y-4">
          <Card className="p-5 flex flex-col items-center text-center gap-3">
            <Avatar initials={profile.full_name} size="xl" />
            <div>
              <h2 className="text-lg font-bold text-[#232F46]">{profile.full_name}</h2>
              <p className="text-xs text-gray-400 font-mono">{member.member_id}</p>
            </div>
            <StatusBadge status={memberStatus} />
            {member.rank_name && (
              <span className="text-xs bg-[#ED8C32]/10 text-[#ED8C32] font-bold px-3 py-1 rounded-full">
                {member.rank_name}
              </span>
            )}
            <div className="text-xs text-gray-400 mt-1">
              Joined {new Date(member.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
            </div>
            {/* Copy UUID */}
            <button
              onClick={() => navigator.clipboard.writeText(member.id)}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#232F46] transition-colors mt-1"
            >
              <Copy className="w-3 h-3" /> Copy UUID
            </button>
          </Card>

          {/* Action Panel */}
          <Card className="p-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Lifecycle Controls</p>
            <div className="space-y-2">
              {member.status === 'PENDING' && (
                <button
                  onClick={() => openConfirm('admin_reject_member', 'Reject Application', 'This will permanently reject this member\'s application.', 'Reject', 'bg-red-600')}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-sm rounded-xl text-red-600 border border-red-200 hover:bg-red-50 font-medium transition-colors"
                >
                  <XCircle className="w-4 h-4" /> Reject Application
                </button>
              )}
              {member.status === 'ACTIVE' && (
                <button
                  onClick={() => openConfirm('admin_suspend_member', 'Suspend Member', 'This will halt all commission processing for this member.', 'Suspend', 'bg-orange-600')}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-sm rounded-xl text-orange-600 border border-orange-200 hover:bg-orange-50 font-medium transition-colors"
                >
                  <Ban className="w-4 h-4" /> Suspend Member
                </button>
              )}
              {member.status === 'ACTIVE' && (
                <button
                  onClick={() => openConfirm('admin_lock_account', 'Lock Account', 'This will prevent this member from logging in. Their position is preserved.', 'Lock Account', 'bg-gray-800')}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-sm rounded-xl text-gray-700 border border-gray-200 hover:bg-gray-50 font-medium transition-colors"
                >
                  <Lock className="w-4 h-4" /> Lock Account
                </button>
              )}
              {(member.status === 'SUSPENDED' || member.status === 'LOCKED') && (
                <button
                  onClick={() => openConfirm('admin_reactivate_member', 'Reactivate Member', 'This will restore this member\'s ACTIVE status.', 'Reactivate', 'bg-green-600')}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-sm rounded-xl text-green-600 border border-green-200 hover:bg-green-50 font-medium transition-colors"
                >
                  <RefreshCw className="w-4 h-4" /> Reactivate
                </button>
              )}
              {member.status === 'LOCKED' && (
                <button
                  onClick={() => openConfirm('admin_unlock_account', 'Unlock Account', 'This will restore login access for this member.', 'Unlock', 'bg-blue-600')}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-sm rounded-xl text-blue-600 border border-blue-200 hover:bg-blue-50 font-medium transition-colors"
                >
                  <LockOpen className="w-4 h-4" /> Unlock Account
                </button>
              )}
              <button
                onClick={() => setEditModalOpen(true)}
                className="w-full flex items-center gap-2 px-3 py-2.5 text-sm rounded-xl text-[#232F46] border border-gray-200 hover:bg-gray-50 font-medium transition-colors"
              >
                <Edit3 className="w-4 h-4" /> Edit Profile
              </button>
            </div>
          </Card>
        </div>

        {/* Right: Tabs */}
        <div className="lg:col-span-2 space-y-4">
          {/* Tab Bar */}
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1 overflow-x-auto">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                  activeTab === id
                    ? 'bg-white text-[#232F46] shadow-sm'
                    : 'text-gray-500 hover:text-[#232F46]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
            >
              {/* ── OVERVIEW TAB ──────────────────────────────── */}
              {activeTab === 'overview' && (
                <Card className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-[#232F46]">Personal Information</h3>
                    <button onClick={() => setEditModalOpen(true)} className="text-xs text-[#ED8C32] hover:underline flex items-center gap-1">
                      <Edit3 className="w-3 h-3" /> Edit
                    </button>
                  </div>
                  <InfoRow label="Full Name"     value={profile.full_name} />
                  <InfoRow label="Mobile"        value={`${profile.country_code} ${profile.phone_number}`} mono />
                  <InfoRow label="Email"         value={profile.email} />
                  <InfoRow label="City"          value={profile.city} />
                  <InfoRow label="State"         value={profile.state} />
                  <InfoRow label="Address"       value={profile.address} />
                  <InfoRow label="UUID"          value={member.id} mono />
                  <InfoRow label="Registered On" value={new Date(member.created_at).toLocaleString()} />
                </Card>
              )}

              {/* ── BUSINESS TAB ──────────────────────────────── */}
              {activeTab === 'business' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <StatCard label="Total Left BV"       value={business.total_left_bv}       sub="Accumulated" />
                    <StatCard label="Total Right BV"      value={business.total_right_bv}      sub="Accumulated" />
                    <StatCard label="Carry Forward Left"  value={business.carry_forward_left}  sub="Unmatched" />
                    <StatCard label="Carry Forward Right" value={business.carry_forward_right} sub="Unmatched" />
                    <StatCard label="Matched BV"          value={business.matched_bv}          sub="Used in matches" />
                    <StatCard label="Total Team"          value={business.total_team_size}     sub="Members in tree" />
                    <StatCard label="Matching Income"     value={`₹${matching_summary.total_income}`} sub={`${matching_summary.total_matches} matches`} />
                    <StatCard label="First Match Done"    value={business.has_completed_first_match ? 'Yes' : 'No'} />
                  </div>
                  <Card className="p-5">
                    <h3 className="font-bold text-[#232F46] mb-3">Network Position</h3>
                    <InfoRow label="Sponsor ID"       value={business.sponsor_member_id} mono />
                    <InfoRow label="Sponsor Name"     value={business.sponsor_name} />
                    <InfoRow label="Placement Side"   value={business.placement_side?.toUpperCase()} />
                    <InfoRow label="Direct Left"      value={String(business.direct_left_count)} />
                    <InfoRow label="Direct Right"     value={String(business.direct_right_count)} />
                    <InfoRow label="Rank"             value={member.rank_name || 'No Rank'} />
                  </Card>
                </div>
              )}

              {/* ── KYC TAB ───────────────────────────────────── */}
              {activeTab === 'kyc' && (
                <Card className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-[#232F46]">KYC Information</h3>
                    <button
                      onClick={() => setKycModalOpen(true)}
                      className="text-xs bg-[#ED8C32] text-white font-bold px-3 py-1.5 rounded-lg hover:bg-[#d97d25] transition-colors flex items-center gap-1"
                    >
                      <Shield className="w-3 h-3" /> Process KYC
                    </button>
                  </div>
                  <div className="mb-4 flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${kycDisplay.color}`}>
                      {kycDisplay.label}
                    </span>
                    {kyc.verified_at && (
                      <span className="text-xs text-gray-400">
                        Verified {new Date(kyc.verified_at).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  {kyc.remarks && (
                    <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-yellow-800">
                      <strong>Admin Remarks:</strong> {kyc.remarks}
                    </div>
                  )}
                  <InfoRow label="Bank Name"       value={kyc.bank_name} />
                  <InfoRow label="Account Number"  value={kyc.account_number} mono />
                  <InfoRow label="IFSC Code"       value={kyc.ifsc_code} mono />
                  <InfoRow label="PAN Number"      value={kyc.pan_number} mono />
                  <InfoRow label="Aadhaar Number"  value={kyc.aadhaar_number ? `XXXX-XXXX-${kyc.aadhaar_number.slice(-4)}` : null} mono />
                  <InfoRow label="Nominee Name"    value={kyc.nominee_name} />
                  <InfoRow label="Nominee Relation"value={kyc.nominee_relation} />
                </Card>
              )}

              {/* ── WALLET TAB ────────────────────────────────── */}
              {activeTab === 'wallet' && (
                <div className="space-y-4">
                  {wallet ? (
                    <div className="grid grid-cols-2 gap-3">
                      <StatCard label="Available Balance"    value={`₹${wallet.available_balance.toFixed(2)}`} />
                      <StatCard label="Locked Balance"       value={`₹${wallet.locked_balance.toFixed(2)}`} />
                      <StatCard label="Lifetime Earnings"    value={`₹${wallet.lifetime_earnings.toFixed(2)}`} />
                      <StatCard label="Lifetime Withdrawals" value={`₹${wallet.lifetime_withdrawals.toFixed(2)}`} />
                    </div>
                  ) : (
                    <Card className="p-8 text-center">
                      <Wallet className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-400 text-sm">Wallet not yet created for this member.</p>
                    </Card>
                  )}
                </div>
              )}

              {/* ── TIMELINE TAB ──────────────────────────────── */}
              {activeTab === 'timeline' && (
                <Card className="p-5">
                  <h3 className="font-bold text-[#232F46] mb-4">Activity Timeline</h3>
                  {logs.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-8">No activity logs found.</p>
                  ) : (
                    <div className="space-y-0">
                      {logs.map((log, i) => (
                        <div key={log.id} className="flex gap-3 pb-4">
                          <div className="flex flex-col items-center">
                            <div className="w-2 h-2 rounded-full bg-[#ED8C32] mt-1.5 shrink-0" />
                            {i < logs.length - 1 && <div className="w-px flex-1 bg-gray-100 mt-1" />}
                          </div>
                          <div className="flex-1 pb-1">
                            <p className="text-sm font-semibold text-[#232F46]">
                              {log.action.replace(/_/g, ' ')}
                            </p>
                            {log.details && (
                              <p className="text-xs text-gray-400 mt-0.5 font-mono">
                                {JSON.stringify(log.details).slice(0, 120)}
                              </p>
                            )}
                            <p className="text-xs text-gray-300 mt-1">
                              {new Date(log.created_at).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              )}

              {/* ── NOTES TAB ─────────────────────────────────── */}
              {activeTab === 'notes' && (
                <div className="space-y-4">
                  <Card className="p-5">
                    <h3 className="font-bold text-[#232F46] mb-3">Add Internal Note</h3>
                    <p className="text-xs text-gray-400 mb-3">These notes are private and only visible to administrators.</p>
                    <textarea
                      className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#ED8C32]/30"
                      rows={3}
                      placeholder="Type your internal note here..."
                      value={newNote}
                      onChange={e => setNewNote(e.target.value)}
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={handleAddNote}
                        disabled={!newNote.trim() || actionLoading}
                        className="flex items-center gap-2 px-4 py-2 text-sm bg-[#232F46] text-white rounded-xl font-bold disabled:opacity-40 hover:bg-[#1a2336] transition-colors"
                      >
                        <Plus className="w-4 h-4" /> Add Note
                      </button>
                    </div>
                  </Card>
                  {notes.length === 0 ? (
                    <Card className="p-8 text-center">
                      <StickyNote className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-400">No admin notes yet.</p>
                    </Card>
                  ) : (
                    notes.map(note => (
                      <Card key={note.id} className="p-4">
                        <p className="text-sm text-[#232F46]">{note.note}</p>
                        <p className="text-xs text-gray-300 mt-2">
                          {new Date(note.created_at).toLocaleString()}
                        </p>
                      </Card>
                    ))
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Modals */}
      <ConfirmModal
        open={confirmModal.open}
        title={confirmModal.title}
        description={confirmModal.description}
        actionLabel={confirmModal.actionLabel}
        actionColor={confirmModal.actionColor}
        requireReason={confirmModal.requireReason}
        onClose={() => setConfirmModal(m => ({ ...m, open: false }))}
        onConfirm={(reason) => runLifecycleRpc(confirmModal.rpcName, reason)}
      />
      <EditProfileModal
        open={editModalOpen}
        profile={profile}
        onSave={handleEditProfile}
        onClose={() => setEditModalOpen(false)}
      />
      <KycModal
        open={kycModalOpen}
        onProcess={handleProcessKyc}
        onClose={() => setKycModalOpen(false)}
      />
    </motion.div>
  );
}
