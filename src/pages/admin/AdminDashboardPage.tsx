import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Users, UserCheck, Clock, ShieldCheck, UserPlus,
  Network, FileSearch, Bell, ChevronRight, Activity, Download,
  Wallet, RefreshCw, AlertTriangle
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Skeleton } from '../../components/ui/Skeleton';
import { PageHeader } from '../../components/ui/PageHeader';
import { supabase } from '../../lib/supabase';

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────
interface DashboardKPIs {
  members: {
    total: number; active: number; pending: number;
    suspended: number; locked: number;
  };
  today_business: {
    activations: number; bv_generated: number;
    matching_income: number; sponsor_income: number; level_income: number;
  };
  financials: {
    total_revenue: number; total_payouts: number; total_liability: number;
  };
}

interface ActivityLog {
  id: string;
  member_id: string;
  member_name: string;
  action: string;
  details: any;
  created_at: string;
}

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  
  const [kpis, setKpis] = useState<DashboardKPIs | null>(null);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      // 1. Fetch KPIs
      const { data: kpiData, error: kpiError } = await supabase.rpc('get_admin_dashboard_kpis');
      if (kpiError) throw kpiError;
      setKpis(kpiData as DashboardKPIs);

      // 2. Fetch recent activity (limit 10)
      const { data: activityData, error: activityError } = await supabase.rpc('get_system_activity_feed', { 
        p_limit: 10, p_offset: 0 
      });
      if (activityError) throw activityError;
      setActivities(activityData || []);

    } catch (err: any) {
      console.error('Failed to load dashboard:', err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // ── Prepare KPI Cards ─────────────────────────────────────
  const kpiCards = kpis ? [
    { label: 'Total Members', value: kpis.members.total.toLocaleString(), icon: Users, color: 'bg-blue-50 text-blue-600' },
    { label: 'Active Members', value: kpis.members.active.toLocaleString(), icon: UserCheck, color: 'bg-green-50 text-green-600' },
    { label: 'Pending Registrations', value: kpis.members.pending.toLocaleString(), icon: Clock, color: 'bg-yellow-50 text-yellow-600' },
    { label: 'Today\'s Activations', value: kpis.today_business.activations.toLocaleString(), icon: UserPlus, color: 'bg-teal-50 text-teal-600' },
    { label: 'Today\'s BV Generated', value: kpis.today_business.bv_generated.toLocaleString(), icon: Network, color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Total Platform Revenue', value: `₹${kpis.financials.total_revenue.toLocaleString()}`, icon: Wallet, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Total Payouts', value: `₹${kpis.financials.total_payouts.toLocaleString()}`, icon: Activity, color: 'bg-orange-50 text-[#ED8C32]' },
    { label: 'System Liability (Wallets)', value: `₹${kpis.financials.total_liability.toLocaleString()}`, icon: Bell, color: 'bg-red-50 text-red-600' },
  ] : [];

  const getActivityIcon = (action: string) => {
    if (action.includes('ACTIVATED') || action.includes('CREDIT')) return <ShieldCheck className="w-4 h-4 text-green-500" />;
    if (action.includes('PAYMENT_REJECTED') || action.includes('DEBIT')) return <AlertTriangle className="w-4 h-4 text-red-500" />;
    if (action.includes('MEMBER_SUSPENDED')) return <AlertTriangle className="w-4 h-4 text-orange-500" />;
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
        title="Operations & Finance Dashboard"
        description="Real-time KPIs, financial totals, and system activity feed."
        action={
          <div className="flex gap-2">
            <Button leftIcon={<RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />} variant="outline" onClick={fetchDashboardData}>
              Refresh
            </Button>
            <Button leftIcon={<Download className="w-4 h-4" />}>
              Export Report
            </Button>
          </div>
        }
      />

      {/* ── KPI Grid ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {loading || !kpis ? (
          Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="flex items-start gap-4 p-4">
              <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="w-full h-3 mb-2" />
                <Skeleton className="w-16 h-6" />
              </div>
            </Card>
          ))
        ) : (
          kpiCards.map(({ label, value, icon: Icon, color }) => (
            <Card key={label} className="flex items-start gap-4 p-4 hover:shadow-md transition-shadow">
              <div className={`p-3 rounded-xl shrink-0 ${color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 mb-0.5 leading-tight">{label}</p>
                <p className="text-2xl font-black text-[#232F46]">{value}</p>
              </div>
            </Card>
          ))
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Left Column: Activity Feed ───────────────────────────── */}
        <div className="lg:col-span-2 space-y-6">
          <Card noPadding className="overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
              <h3 className="font-bold text-[#232F46] flex items-center gap-2">
                <Activity className="w-5 h-5 text-gray-400" />
                Live System Heartbeat
              </h3>
              <button 
                onClick={() => navigate('/admin/business/ledger')} 
                className="text-xs text-[#ED8C32] font-bold hover:underline"
              >
                View Full Ledger &rarr;
              </button>
            </div>
            
            {loading ? (
              <div className="p-5 space-y-6">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="flex gap-4">
                    <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="w-1/3 h-4" />
                      <Skeleton className="w-2/3 h-3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : activities.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-sm">No recent activity.</div>
            ) : (
              <div className="p-5">
                <div className="relative border-l-2 border-gray-100 ml-4 space-y-8">
                  {activities.map((item) => (
                    <div key={item.id} className="relative pl-6">
                      <div className="absolute -left-[17px] bg-white border border-gray-100 rounded-full p-1.5 shadow-sm">
                        {getActivityIcon(item.action)}
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">{item.action.replace(/_/g, ' ')}</span>
                        <p className="text-sm font-medium text-[#232F46] mt-0.5">
                          {item.member_name ? (
                            <span><span className="font-bold">{item.member_name}</span> ({item.member_id}) </span>
                          ) : (
                            <span>System Action </span>
                          )}
                          — {JSON.stringify(item.details)}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(item.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* ── Right Column: Summary & Actions ──────────────────────── */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-[#232F46] text-white border-0 shadow-sm p-5">
            <h3 className="font-bold mb-4">Today's Performance</h3>
            {loading || !kpis ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i}>
                    <Skeleton className="w-24 h-3 bg-white/20 mb-2" />
                    <Skeleton className="w-16 h-6 bg-white/30" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4 divide-y divide-white/10">
                <div className="pt-2 flex justify-between items-end">
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Matching Income</p>
                    <p className="text-xl font-black">₹{kpis.today_business.matching_income}</p>
                  </div>
                </div>
                <div className="pt-4 flex justify-between items-end">
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Sponsor Income</p>
                    <p className="text-xl font-black">₹{kpis.today_business.sponsor_income}</p>
                  </div>
                </div>
                <div className="pt-4 flex justify-between items-end">
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Level Income</p>
                    <p className="text-xl font-black">₹{kpis.today_business.level_income}</p>
                  </div>
                </div>
              </div>
            )}
          </Card>
          
          <Card>
            <h3 className="font-bold text-[#232F46] mb-4">Operations Center</h3>
            <div className="space-y-2">
              {[
                { label: 'Pending Payments', path: '/admin/payments', count: kpis?.members?.pending || 0 },
                { label: 'Member Directory', path: '/admin/members' },
                { label: 'Payout Management', path: '/admin/business/payouts' },
                { label: 'Unified Ledger', path: '/admin/business/ledger' },
                { label: 'System Settings', path: '/admin/business/settings' },
              ].map(({ label, path, count }) => (
                <button
                  key={label}
                  onClick={() => navigate(path)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors border border-gray-100 text-[#232F46] hover:bg-[#232F46] hover:text-white hover:border-[#232F46]"
                >
                  <div className="flex items-center gap-2">
                    {label}
                    {count ? <span className="bg-[#ED8C32] text-white text-[10px] px-2 py-0.5 rounded-full">{count}</span> : null}
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
