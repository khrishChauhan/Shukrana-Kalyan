import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Users, UserCheck, Clock, ShieldCheck, UserPlus,
  Network, FileSearch, Bell, ChevronRight, Activity,
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
      // 1. Fetch Members counts
      const [{ count: total }, { count: active }, { count: pending }] = await Promise.all([
        supabase.from('members').select('*', { count: 'exact', head: true }),
        supabase.from('members').select('*', { count: 'exact', head: true }).eq('status', 'ACTIVE'),
        supabase.from('members').select('*', { count: 'exact', head: true }).eq('status', 'PENDING'),
      ]);

      // 2. Fetch BV
      const { data: business } = await supabase.from('member_business').select('total_left_bv, total_right_bv');
      const bv_generated = business?.reduce((sum, b) => sum + Number(b.total_left_bv || 0) + Number(b.total_right_bv || 0), 0) || 0;

      // 3. Fetch Financials
      const { data: ledger } = await supabase.from('unified_ledger').select('amount, direction, entry_type');
      let total_revenue = 0;
      let total_payouts = 0;
      let total_liability = 0;

      if (ledger) {
        ledger.forEach(tx => {
          if (tx.direction === 'CREDIT' && tx.entry_type !== 'ADMIN_CORRECTION_CREDIT') total_revenue += Number(tx.amount);
          if (tx.direction === 'DEBIT' && tx.entry_type === 'WITHDRAWAL_DEBIT') total_payouts += Number(tx.amount);
        });
        total_liability = total_revenue - total_payouts; // Simplified liability calculation
      }

      setKpis({
        members: { total: total || 0, active: active || 0, pending: pending || 0, suspended: 0, locked: 0 },
        today_business: { activations: 0, bv_generated, matching_income: 0, sponsor_income: 0, level_income: 0 },
        financials: { total_revenue, total_payouts, total_liability }
      });

      // 4. Fetch recent activity
      const { data: activityData } = await supabase.from('activity_logs').select('*').order('created_at', { ascending: false }).limit(10);
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
    { label: 'Total Members', value: kpis.members.total.toLocaleString(), icon: Users, color: 'bg-blue-50 text-blue-600', path: '/admin/members' },
    { label: 'Active Members', value: kpis.members.active.toLocaleString(), icon: UserCheck, color: 'bg-green-50 text-green-600', path: '/admin/members' },
    { label: 'Pending Registrations', value: kpis.members.pending.toLocaleString(), icon: Clock, color: 'bg-yellow-50 text-yellow-600', path: '/admin/payments' },
    { label: 'Today\'s Activations', value: kpis.today_business.activations.toLocaleString(), icon: UserPlus, color: 'bg-teal-50 text-teal-600', path: '/admin/members' },
    { label: 'Today\'s BV Generated', value: kpis.today_business.bv_generated.toLocaleString(), icon: Network, color: 'bg-indigo-50 text-indigo-600', path: '/admin/business/ledger' },
    { label: 'Total Platform Revenue', value: `₹${kpis.financials.total_revenue.toLocaleString()}`, icon: Wallet, color: 'bg-emerald-50 text-emerald-600', path: '/admin/business/ledger' },
    { label: 'Total Payouts', value: `₹${kpis.financials.total_payouts.toLocaleString()}`, icon: Activity, color: 'bg-orange-50 text-[#ED8C32]', path: '/admin/business/payouts' },
    { label: 'System Liability (Wallets)', value: `₹${kpis.financials.total_liability.toLocaleString()}`, icon: Bell, color: 'bg-red-50 text-red-600', path: '/admin/business/ledger' },
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
          kpiCards.map(({ label, value, icon: Icon, color, path }) => (
            <Card
              key={label}
              className={`flex items-start gap-4 p-4 transition-all ${path ? 'hover:shadow-md hover:scale-[1.02] cursor-pointer' : ''}`}
              onClick={path ? () => navigate(path) : undefined}
            >
              <div className={`p-3 rounded-xl shrink-0 ${color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 mb-0.5 leading-tight">{label}</p>
                <p className="text-2xl font-black text-[#232F46]">{value}</p>
                <p className="text-[10px] text-[#ED8C32] font-bold mt-1">View Details →</p>
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
