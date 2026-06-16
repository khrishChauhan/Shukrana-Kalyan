import React from 'react';
import { motion } from 'motion/react';
import { Bell, UserPlus, ShieldCheck, User, Settings } from 'lucide-react';
import { Card } from '../../components/ui/Card';

interface AdminNotification {
  id: number;
  type: 'Registration' | 'KYC Update' | 'Profile Update' | 'System';
  title: string;
  detail: string;
  time: string;
  read: boolean;
}

const NOTIFICATIONS: AdminNotification[] = [
  { id: 1,  type: 'Registration',  title: 'New Member Registered',          detail: 'Neelam Kumari (SK00241) has completed registration.',                 time: 'Today, 10:32 AM',         read: false },
  { id: 2,  type: 'KYC Update',    title: 'KYC Documents Submitted',        detail: 'Member SK00238 has submitted Aadhar and PAN documents for review.',   time: 'Today, 09:15 AM',         read: false },
  { id: 3,  type: 'Profile Update','title': 'Profile Updated',              detail: 'Member SK00091 updated mobile number and email address.',             time: 'Yesterday, 04:47 PM',     read: true },
  { id: 4,  type: 'System',        title: 'Welcome Letter Generated',       detail: 'System auto-generated welcome letter for SK00168.',                   time: 'Yesterday, 02:10 PM',     read: true },
  { id: 5,  type: 'KYC Update',    title: 'KYC Approved',                   detail: 'Admin approved KYC documents for Member SK00152.',                    time: '14 Jun 2026, 11:55 AM',   read: true },
  { id: 6,  type: 'Registration',  title: 'New Member Registered',          detail: 'Rahul Verma (SK00240) has completed registration and payment.',       time: '14 Jun 2026, 09:30 AM',   read: true },
  { id: 7,  type: 'Profile Update','title': 'Password Reset Completed',     detail: 'Member SK00042 successfully reset their account password.',           time: '13 Jun 2026, 03:20 PM',   read: true },
  { id: 8,  type: 'System',        title: 'Membership Card Downloaded',     detail: 'Member SK00124 downloaded their digital membership card.',            time: '13 Jun 2026, 01:05 PM',   read: true },
  { id: 9,  type: 'KYC Update',    title: 'KYC Pending Review',             detail: 'Member SK00235 documents are awaiting admin verification.',           time: '12 Jun 2026, 03:40 PM',   read: true },
  { id: 10, type: 'Registration',  title: 'New Member Registered',          detail: 'Priya Sharma (SK00239) joined under referral of SK00124.',            time: '11 Jun 2026, 11:00 AM',   read: true },
];

const typeConfig = {
  Registration:  { icon: UserPlus,    color: 'bg-blue-50 text-blue-600' },
  'KYC Update':  { icon: ShieldCheck, color: 'bg-green-50 text-green-600' },
  'Profile Update': { icon: User,     color: 'bg-purple-50 text-purple-600' },
  System:        { icon: Settings,    color: 'bg-orange-50 text-[#ED8C32]' },
};

export default function AdminNotificationsPage() {
  const unread = NOTIFICATIONS.filter(n => !n.read).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6 max-w-4xl mx-auto"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#232F46]">Notifications</h1>
          <p className="text-sm text-gray-400 mt-1">
            {unread > 0 ? `${unread} unread notification${unread > 1 ? 's' : ''}` : 'All caught up'}
          </p>
        </div>
        <div className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-xl shadow-sm">
          <Bell className="w-5 h-5 text-[#ED8C32]" />
          {unread > 0 && (
            <span className="text-xs font-black text-white bg-[#ED8C32] rounded-full w-5 h-5 flex items-center justify-center">
              {unread}
            </span>
          )}
        </div>
      </div>

      <Card noPadding className="overflow-hidden">
        <div className="divide-y divide-gray-50">
          {NOTIFICATIONS.map(n => {
            const { icon: Icon, color } = typeConfig[n.type];
            return (
              <div
                key={n.id}
                className={`flex items-start gap-4 px-5 py-4 transition-colors hover:bg-gray-50 ${
                  !n.read ? 'bg-orange-50/40' : ''
                }`}
              >
                <div className={`p-2.5 rounded-xl shrink-0 ${color}`}>
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-bold ${!n.read ? 'text-[#232F46]' : 'text-gray-600'}`}>
                      {n.title}
                    </p>
                    {!n.read && (
                      <span className="shrink-0 w-2 h-2 rounded-full bg-[#ED8C32] mt-1.5" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5 leading-snug">{n.detail}</p>
                  <p className="text-xs text-gray-400 mt-1.5 font-medium">{n.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
