import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Skeleton } from '../../components/ui/Skeleton';
import { supabase } from '../../lib/supabase';
import {
  MapPin, Shield, Star, Globe, Check, X,
  RefreshCw, AlertTriangle, Users, Clock, CheckCircle2
} from 'lucide-react';

// ── Types ────────────────────────────────────────────────────────────────────
interface Application {
  id: string;
  member_uuid: string;
  member_id: string;
  member_name: string;
  position_type: string;
  pin_code: string;
  status: string;
  created_at: string;
  current_holder_name: string | null;
  current_holder_id: string | null;
}

const POSITION_ICONS: Record<string, React.ElementType> = {
  NAGAR: MapPin,
  ZILLA: Shield,
  RAJYA: Star,
  NATIONAL: Globe,
};

const POSITION_COLORS: Record<string, string> = {
  NAGAR: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  ZILLA: 'bg-blue-50 text-blue-600 border-blue-200',
  RAJYA: 'bg-purple-50 text-purple-600 border-purple-200',
  NATIONAL: 'bg-orange-50 text-orange-600 border-orange-200',
};

const ROYALTY_RATES: Record<string, string> = {
  NAGAR: '2%', ZILLA: '4%', RAJYA: '3%', NATIONAL: '1%',
};

// ── Main Page ────────────────────────────────────────────────────────────────
export default function AdminRoyaltyManagementPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'PENDING' | 'APPROVED' | 'REJECTED'>('PENDING');

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('get_admin_royalty_applications', {
        p_status: filter,
      });

      if (error) throw error;

      setApplications(data || []);
    } catch (e: any) {
      console.error('Error fetching royalty applications:', e.message);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => { fetchApplications(); }, [fetchApplications]);

  const getAdminUuid = () => {
    const session = localStorage.getItem('shukrana_admin_session');
    if (!session) return null;
    try { return JSON.parse(session).uuid; } catch { return null; }
  };

  const handleApprove = async (app: Application) => {
    const willOverride = !!app.current_holder_name;
    const confirmMsg = willOverride
      ? `This will OVERRIDE the current holder "${app.current_holder_name}" (${app.current_holder_id}).\n\nAre you sure you want to approve ${app.member_name} as ${app.position_type} Sevak for PIN ${app.pin_code}?`
      : `Approve ${app.member_name} as ${app.position_type} Sevak for PIN ${app.pin_code}?`;

    if (!window.confirm(confirmMsg)) return;

    setProcessingId(app.id);
    try {
      const adminUuid = getAdminUuid();
      const { data, error } = await supabase.rpc('approve_royalty_application', {
        p_application_id: app.id,
        p_admin_uuid: adminUuid || null,
      });
      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || 'Approval failed.');
      alert(`✅ Approved! ${app.member_name} is now the ${app.position_type} Sevak for PIN ${app.pin_code}.`);
      fetchApplications();
    } catch (e: any) {
      alert(`Error: ${e.message}`);
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (app: Application) => {
    const reason = window.prompt(`Reason for rejecting ${app.member_name}'s application (optional):`);
    if (reason === null) return; // cancelled

    setProcessingId(app.id);
    try {
      const adminUuid = getAdminUuid();
      const { data, error } = await supabase.rpc('reject_royalty_application', {
        p_application_id: app.id,
        p_admin_uuid: adminUuid || null,
        p_reason: reason || 'Application rejected by administrator.',
      });
      if (error) throw error;
      alert('Application rejected. Member has been notified.');
      fetchApplications();
    } catch (e: any) {
      alert(`Error: ${e.message}`);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto pb-10 space-y-6"
    >
      <PageHeader
        title="Royalty Management"
        description="Review and approve Sevak position applications. Approving overrides current territory holders."
        breadcrumbs={[{ label: 'Admin' }, { label: 'Royalty Management' }]}
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries({ NAGAR: 'Nagar', ZILLA: 'Zilla', RAJYA: 'Rajya', NATIONAL: 'National' }).map(([key, label]) => {
          const Icon = POSITION_ICONS[key];
          const colors = POSITION_COLORS[key];
          return (
            <Card key={key} className="flex items-center gap-3 py-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${colors}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold">{label} Sevak</p>
                <p className="text-xs text-[#ED8C32] font-black">{ROYALTY_RATES[key]} Royalty</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Filter Tabs + Refresh */}
      <div className="flex items-center justify-between">
        <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
          {(['PENDING', 'APPROVED', 'REJECTED'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === s ? 'bg-white shadow text-[#232F46]' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {s === 'PENDING' && <Clock className="w-3 h-3 inline mr-1" />}
              {s === 'APPROVED' && <CheckCircle2 className="w-3 h-3 inline mr-1" />}
              {s === 'REJECTED' && <X className="w-3 h-3 inline mr-1" />}
              {s}
            </button>
          ))}
        </div>
        <button
          onClick={fetchApplications}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
          title="Refresh"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Applications List */}
      <Card noPadding>
        {loading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-20 rounded-xl" />)}
          </div>
        ) : applications.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center px-4">
            <Users className="w-12 h-12 text-gray-200 mb-3" />
            <p className="font-bold text-gray-500">No {filter.toLowerCase()} applications</p>
            <p className="text-xs text-gray-400 mt-1">
              {filter === 'PENDING' ? 'All clear — no pending Sevak applications to review.' : `No ${filter.toLowerCase()} applications found.`}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {applications.map((app) => {
              const Icon = POSITION_ICONS[app.position_type] || MapPin;
              const colors = POSITION_COLORS[app.position_type] || '';
              const isProcessing = processingId === app.id;

              return (
                <div key={app.id} className="p-5 hover:bg-gray-50/50 transition-colors">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">

                    {/* Position Badge */}
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center border shrink-0 ${colors}`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <p className="font-black text-[#232F46] text-sm">{app.member_name}</p>
                        <span className="text-xs text-gray-400 font-mono">({app.member_id})</span>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border uppercase ${colors}`}>
                          {app.position_type} — {ROYALTY_RATES[app.position_type]}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Claiming PIN Code: <span className="font-mono font-bold text-[#232F46]">{app.pin_code}</span>
                        <span className="mx-2 text-gray-300">·</span>
                        Applied: {new Date(app.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </p>

                      {/* Override Warning */}
                      {app.current_holder_name && filter === 'PENDING' && (
                        <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1.5 w-fit">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                          <span>Currently held by <span className="font-bold">{app.current_holder_name}</span> ({app.current_holder_id}) — approving will override them.</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    {filter === 'PENDING' && (
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => handleReject(app)}
                          disabled={isProcessing}
                          className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-red-600 border border-red-200 bg-red-50 rounded-xl hover:bg-red-100 transition-colors disabled:opacity-50"
                        >
                          <X className="w-3.5 h-3.5" /> Reject
                        </button>
                        <button
                          onClick={() => handleApprove(app)}
                          disabled={isProcessing}
                          className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-[#232F46] rounded-xl hover:bg-[#1a2333] transition-colors disabled:opacity-50"
                        >
                          {isProcessing ? (
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Check className="w-3.5 h-3.5" />
                          )}
                          Approve
                        </button>
                      </div>
                    )}

                    {filter !== 'PENDING' && (
                      <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${
                        filter === 'APPROVED'
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                          : 'bg-red-50 text-red-600 border-red-200'
                      }`}>
                        {filter}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </motion.div>
  );
}
