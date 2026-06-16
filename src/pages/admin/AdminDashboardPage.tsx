import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Users, UserCheck, Clock, UserX, FileSearch,
  ClipboardList, UserPlus, GitBranch, ChevronRight
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

// ── Mock KPI Data ──────────────────────────────────────────────────────────────
const KPI_ROW_1 = [
  { label: 'Total Members',     value: '1,248', icon: Users,      color: 'bg-blue-50 text-blue-600' },
  { label: 'Active Members',    value: '984',   icon: UserCheck,  color: 'bg-green-50 text-green-600' },
  { label: 'Pending Members',   value: '193',   icon: Clock,      color: 'bg-yellow-50 text-yellow-600' },
  { label: 'Suspended Members', value: '71',    icon: UserX,      color: 'bg-red-50 text-red-500' },
];

const KPI_ROW_2 = [
  { label: 'Pending KYC Reviews',    value: '47',  icon: FileSearch,   color: 'bg-purple-50 text-purple-600' },
  { label: 'Pending Applications',   value: '26',  icon: ClipboardList, color: 'bg-orange-50 text-[#ED8C32]' },
  { label: 'New Registrations / Mo', value: '88',  icon: UserPlus,     color: 'bg-teal-50 text-teal-600' },
  { label: 'Total Referrals',        value: '2,140', icon: GitBranch,  color: 'bg-indigo-50 text-indigo-600' },
];

// ── Mock Activity Feed ─────────────────────────────────────────────────────────
const ACTIVITY_FEED = [
  { id: 1, text: 'Neelam Kumari registered as a new member.',         time: 'Today, 10:32 AM' },
  { id: 2, text: 'Member ID SK00124 activated successfully.',          time: 'Today, 09:15 AM' },
  { id: 3, text: 'KYC approved for Member ID SK00152.',                time: 'Yesterday, 04:47 PM' },
  { id: 4, text: 'Welcome Letter generated for SK00168.',              time: 'Yesterday, 02:10 PM' },
  { id: 5, text: 'Member profile updated — SK00091.',                  time: '14 Jun 2026, 11:55 AM' },
  { id: 6, text: 'Rahul Verma referred 3 new members this week.',      time: '14 Jun 2026, 09:30 AM' },
  { id: 7, text: 'KYC documents submitted for SK00177.',               time: '13 Jun 2026, 03:20 PM' },
  { id: 8, text: 'Password reset completed for SK00042.',              time: '13 Jun 2026, 01:05 PM' },
];

export default function AdminDashboardPage() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6 max-w-7xl mx-auto"
    >
      {/* ── Row 1: KPI Cards ─────────────────────────────────────────────── */}
      <section>
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
          Member Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {KPI_ROW_1.map(({ label, value, icon: Icon, color }) => (
            <Card key={label} className="flex items-center gap-4">
              <div className={`p-3 rounded-xl shrink-0 ${color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 mb-0.5">{label}</p>
                <p className="text-2xl font-black text-[#232F46]">{value}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ── Row 2: KPI Cards ─────────────────────────────────────────────── */}
      <section>
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
          Operations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {KPI_ROW_2.map(({ label, value, icon: Icon, color }) => (
            <Card key={label} className="flex items-center gap-4">
              <div className={`p-3 rounded-xl shrink-0 ${color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 mb-0.5">{label}</p>
                <p className="text-2xl font-black text-[#232F46]">{value}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ── Bottom Split: Activity Feed + Quick Actions ───────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Activity Feed (2/3 width) */}
        <Card noPadding className="lg:col-span-2 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-[#232F46]">Recent Activity</h3>
            <span className="text-xs text-gray-400">{ACTIVITY_FEED.length} events</span>
          </div>
          <div className="divide-y divide-gray-50">
            {ACTIVITY_FEED.map((item, i) => (
              <div key={item.id} className="flex items-start gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors">
                {/* Timeline dot */}
                <div className="mt-1.5 shrink-0">
                  <span className={`block w-2 h-2 rounded-full ${i === 0 ? 'bg-[#ED8C32]' : 'bg-gray-300'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#232F46] font-medium leading-snug">{item.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions (1/3 width) */}
        <Card>
          <h3 className="font-bold text-[#232F46] mb-4">Quick Actions</h3>
          <div className="space-y-2">
            {[
              { label: 'View Members',       path: '/admin/members' },
              { label: 'Review KYC',         path: '/admin/members' },
              { label: 'View Applications',  path: '/admin/members' },
              { label: 'View Notifications', path: '/admin/notifications' },
              { label: 'Generate Reports',   path: null },
            ].map(({ label, path }) => (
              <button
                key={label}
                onClick={() => path ? navigate(path) : undefined}
                disabled={!path}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors border border-gray-100 ${
                  path
                    ? 'text-[#232F46] hover:bg-[#232F46] hover:text-white hover:border-[#232F46]'
                    : 'text-gray-300 cursor-not-allowed bg-gray-50'
                }`}
              >
                {label}
                {path && <ChevronRight className="w-4 h-4 opacity-50" />}
                {!path && (
                  <span className="text-[10px] font-bold uppercase tracking-wide bg-gray-100 px-1.5 py-0.5 rounded text-gray-400">
                    Soon
                  </span>
                )}
              </button>
            ))}
          </div>
        </Card>

      </div>
    </motion.div>
  );
}
