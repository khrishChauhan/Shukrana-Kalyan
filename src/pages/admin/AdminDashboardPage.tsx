import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Users, UserCheck, Clock, ShieldCheck, UserPlus,
  GitBranch, FileSearch, Bell, ChevronRight, Activity, Download
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Skeleton } from '../../components/ui/Skeleton';
import { PageHeader } from '../../components/ui/PageHeader';

const ACTIVITY_FEED = [
  { id: 1, type: 'New Registration', text: 'Neelam Kumari registered as a new member.', time: 'Today, 10:32 AM', icon: <UserPlus className="w-4 h-4 text-blue-500" /> },
  { id: 2, type: 'Member Approved', text: 'Member ID SK00124 activated successfully.', time: 'Today, 09:15 AM', icon: <ShieldCheck className="w-4 h-4 text-green-500" /> },
  { id: 3, type: 'KYC Verified', text: 'KYC approved for Member ID SK00152.', time: 'Yesterday, 04:47 PM', icon: <FileSearch className="w-4 h-4 text-purple-500" /> },
  { id: 4, type: 'Profile Updated', text: 'Member profile updated — SK00091.', time: 'Yesterday, 02:10 PM', icon: <Users className="w-4 h-4 text-orange-500" /> },
  { id: 5, type: 'Admin Login', text: 'System Administrator logged in.', time: '14 Jun 2026, 09:00 AM', icon: <Activity className="w-4 h-4 text-gray-500" /> },
];

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const KPIs = [
    { label: 'Total Members', value: '1,248', icon: Users, color: 'bg-blue-50 text-blue-600' },
    { label: 'Active Members', value: '984', icon: UserCheck, color: 'bg-green-50 text-green-600' },
    { label: 'Pending Verification', value: '193', icon: Clock, color: 'bg-yellow-50 text-yellow-600' },
    { label: 'Verified Members', value: '856', icon: ShieldCheck, color: 'bg-purple-50 text-purple-600' },
    { label: 'New Registrations (This Month)', value: '88', icon: UserPlus, color: 'bg-teal-50 text-teal-600' },
    { label: 'Total Referrals', value: '2,140', icon: GitBranch, color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Pending Reviews', value: '47', icon: FileSearch, color: 'bg-orange-50 text-[#ED8C32]' },
    { label: 'Notifications', value: '12', icon: Bell, color: 'bg-red-50 text-red-600' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6 max-w-7xl mx-auto pb-10"
    >
      <PageHeader
        title="Admin Portal"
        description="Internal management system for Shukrana Kalyan Sangh Foundation."
        action={
          <Button leftIcon={<Download className="w-4 h-4" />} variant="outline">
            Export Report
          </Button>
        }
      />

      {/* ── KPI Grid ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {KPIs.map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="flex items-start gap-4">
            {loading ? (
              <div className="flex w-full items-center gap-4">
                <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
                <div className="flex-1">
                  <Skeleton className="w-full h-4 mb-2" />
                  <Skeleton className="w-12 h-6" />
                </div>
              </div>
            ) : (
              <>
                <div className={`p-3 rounded-xl shrink-0 ${color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 mb-0.5 leading-tight">{label}</p>
                  <p className="text-2xl font-black text-[#232F46]">{value}</p>
                </div>
              </>
            )}
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Left Column: Activity & Quick Actions ───────────────────── */}
        <div className="lg:col-span-2 space-y-6">
          <Card noPadding className="overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
              <h3 className="font-bold text-[#232F46] flex items-center gap-2">
                <Activity className="w-5 h-5 text-gray-400" />
                Recent Activity Timeline
              </h3>
            </div>
            {loading ? (
              <div className="p-5 space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex gap-4">
                    <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="w-1/3 h-4" />
                      <Skeleton className="w-2/3 h-3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-5">
                <div className="relative border-l-2 border-gray-100 ml-4 space-y-8">
                  {ACTIVITY_FEED.map((item) => (
                    <div key={item.id} className="relative pl-6">
                      <div className="absolute -left-[17px] bg-white border border-gray-100 rounded-full p-1.5 shadow-sm">
                        {item.icon}
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">{item.type}</span>
                        <p className="text-sm font-medium text-[#232F46] mt-0.5">{item.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* ── Right Column: Summary & Actions ───────────────────────────── */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <h3 className="font-bold text-[#232F46] mb-4">Quick Actions</h3>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="w-full h-12 rounded-lg" />)}
              </div>
            ) : (
              <div className="space-y-2">
                {[
                  { label: 'View Members', path: '/admin/members' },
                  { label: 'Approve Members', path: '/admin/members' },
                  { label: 'Review KYC', path: '/admin/members' },
                  { label: 'Send Notification', path: '/admin/notifications' },
                  { label: 'Export Members', path: null },
                ].map(({ label, path }) => (
                  <button
                    key={label}
                    onClick={() => path ? navigate(path) : undefined}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors border border-gray-100 ${
                      path
                        ? 'text-[#232F46] hover:bg-[#232F46] hover:text-white hover:border-[#232F46]'
                        : 'text-gray-400 hover:bg-gray-50 cursor-pointer'
                    }`}
                  >
                    {label}
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </button>
                ))}
              </div>
            )}
          </Card>

          <Card className="bg-[#232F46] text-white border-0 shadow-sm p-5">
            <h3 className="font-bold mb-4">System Summary</h3>
            {loading ? (
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
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Recent Registrations</p>
                    <p className="text-2xl font-black">12</p>
                  </div>
                  <span className="text-xs text-green-400 font-medium">+3 today</span>
                </div>
                <div className="pt-4 flex justify-between items-end">
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Recent Approvals</p>
                    <p className="text-2xl font-black">8</p>
                  </div>
                </div>
                <div className="pt-4 flex justify-between items-end">
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Latest Notifications</p>
                    <p className="text-2xl font-black">5</p>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
