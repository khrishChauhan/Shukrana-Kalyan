import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { Bell, UserPlus, ShieldCheck, User, Settings, Check } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { Skeleton } from '../../components/ui/Skeleton';
import { EmptyState } from '../../components/ui/EmptyState';

type NotificationType = 'System' | 'Members' | 'Approvals' | 'Announcements';

interface AdminNotification {
  id: number;
  type: NotificationType;
  title: string;
  detail: string;
  time: string;
  read: boolean;
}

const NOTIFICATIONS: AdminNotification[] = [
  { id: 1,  type: 'Members',     title: 'New Member Registered',          detail: 'Neelam Kumari (SK00241) has completed registration.',                 time: 'Today, 10:32 AM',         read: false },
  { id: 2,  type: 'Approvals',   title: 'KYC Documents Submitted',        detail: 'Member SK00238 has submitted Aadhar and PAN documents for review.',   time: 'Today, 09:15 AM',         read: false },
  { id: 3,  type: 'Members',     title: 'Profile Updated',              detail: 'Member SK00091 updated mobile number and email address.',             time: 'Yesterday, 04:47 PM',     read: true },
  { id: 4,  type: 'System',      title: 'Welcome Letter Generated',       detail: 'System auto-generated welcome letter for SK00168.',                   time: 'Yesterday, 02:10 PM',     read: true },
  { id: 5,  type: 'Approvals',   title: 'KYC Approved',                   detail: 'Admin approved KYC documents for Member SK00152.',                    time: '14 Jun 2026, 11:55 AM',   read: true },
  { id: 6,  type: 'Members',     title: 'New Member Registered',          detail: 'Rahul Verma (SK00240) has completed registration and payment.',       time: '14 Jun 2026, 09:30 AM',   read: true },
  { id: 7,  type: 'System',      title: 'Password Reset Completed',     detail: 'Member SK00042 successfully reset their account password.',           time: '13 Jun 2026, 03:20 PM',   read: true },
  { id: 8,  type: 'System',      title: 'Membership Card Downloaded',     detail: 'Member SK00124 downloaded their digital membership card.',            time: '13 Jun 2026, 01:05 PM',   read: true },
  { id: 9,  type: 'Approvals',   title: 'KYC Pending Review',             detail: 'Member SK00235 documents are awaiting admin verification.',           time: '12 Jun 2026, 03:40 PM',   read: true },
  { id: 10, type: 'Members',     title: 'New Member Registered',          detail: 'Priya Sharma (SK00239) joined under referral of SK00124.',            time: '11 Jun 2026, 11:00 AM',   read: true },
  { id: 11, type: 'Announcements',title: 'Scheduled Maintenance',          detail: 'The system will be down for maintenance this Sunday from 2 AM to 4 AM.',time: '10 Jun 2026, 09:00 AM',   read: true },
];

const typeConfig: Record<NotificationType, { icon: React.ElementType, color: string }> = {
  Members:       { icon: UserPlus,    color: 'bg-blue-50 text-blue-600' },
  Approvals:     { icon: ShieldCheck, color: 'bg-green-50 text-green-600' },
  System:        { icon: Settings,    color: 'bg-orange-50 text-[#ED8C32]' },
  Announcements: { icon: Bell,        color: 'bg-purple-50 text-purple-600' },
};

const FILTER_TABS = ['All', 'System', 'Members', 'Approvals', 'Announcements'] as const;
type FilterTab = typeof FILTER_TABS[number];

export default function AdminNotificationsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for Skeleton showcase
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const unread = NOTIFICATIONS.filter(n => !n.read).length;

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return NOTIFICATIONS;
    return NOTIFICATIONS.filter(n => n.type === activeFilter);
  }, [activeFilter]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6 max-w-5xl mx-auto pb-10"
    >
      <PageHeader
        title="Admin Notifications"
        description={unread > 0 ? `You have ${unread} unread notifications.` : 'You are all caught up.'}
        breadcrumbs={[{ label: 'Admin Portal' }, { label: 'Notifications' }]}
        action={
          <Button leftIcon={<Check className="w-4 h-4" />} variant="outline" disabled={unread === 0}>
            Mark All as Read
          </Button>
        }
      />

      <Card noPadding className="overflow-hidden">
        {/* Filter Bar */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2 flex-wrap bg-gray-50/50">
          {FILTER_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-colors border ${
                activeFilter === tab
                  ? 'bg-[#232F46] text-white border-[#232F46]'
                  : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white min-h-[400px]">
          {loading ? (
            <div className="p-5 space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex items-start gap-4 p-2">
                  <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="w-1/3 h-4" />
                    <Skeleton className="w-2/3 h-3" />
                    <Skeleton className="w-24 h-2 mt-2" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20">
              <EmptyState
                title="No notifications"
                description={`There are no notifications in the "${activeFilter}" category.`}
              />
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {filtered.map(n => {
                const { icon: Icon, color } = typeConfig[n.type];
                return (
                  <div
                    key={n.id}
                    className={`flex items-start gap-4 px-5 py-4 transition-colors hover:bg-gray-50 ${
                      !n.read ? 'bg-orange-50/40' : ''
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl shrink-0 ${color}`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className={`text-sm font-bold ${!n.read ? 'text-[#232F46]' : 'text-gray-600'}`}>
                          {n.title}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${color} bg-opacity-10 text-opacity-80`}>
                            {n.type}
                          </span>
                          {!n.read && (
                            <span className="shrink-0 w-2 h-2 rounded-full bg-[#ED8C32] mt-0.5" />
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 leading-snug">{n.detail}</p>
                      <p className="text-xs text-gray-400 mt-2 font-medium">{n.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
