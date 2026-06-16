import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { CheckCircle2, AlertCircle, Info, Gift } from 'lucide-react';

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Payment Approved',
      message: 'Your activation fee of ₹500 has been verified. Welcome to Shukrana Kalyan Sangh!',
      time: '2 hours ago',
      icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
      bg: 'bg-green-50',
    },
    {
      id: 2,
      type: 'info',
      title: 'Welcome Letter Generated',
      message: 'Your official Welcome Letter is now available in My Documents.',
      time: '2 hours ago',
      icon: <Info className="w-5 h-5 text-blue-500" />,
      bg: 'bg-blue-50',
    },
    {
      id: 3,
      type: 'warning',
      title: 'Action Required: KYC Pending',
      message: 'Please upload your Aadhar Card to complete your KYC Verification and access all welfare benefits.',
      time: '1 day ago',
      icon: <AlertCircle className="w-5 h-5 text-yellow-500" />,
      bg: 'bg-yellow-50',
    },
    {
      id: 4,
      type: 'reward',
      title: 'Referral Reward Earned',
      message: '₹150 has been credited to your wallet for referring Amit Singh.',
      time: '3 days ago',
      icon: <Gift className="w-5 h-5 text-[#ED8C32]" />,
      bg: 'bg-orange-50',
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Notifications"
        description="Stay updated on your account activity and foundation announcements."
      />

      <Card className="p-0 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {notifications.map(n => (
            <div key={n.id} className="p-4 sm:p-6 hover:bg-gray-50/50 transition-colors flex gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${n.bg}`}>
                {n.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-[#232F46] text-sm">{n.title}</h4>
                  <span className="text-xs text-gray-400 whitespace-nowrap ml-4">{n.time}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{n.message}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
