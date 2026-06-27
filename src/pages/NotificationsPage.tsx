import React from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Bell, CheckCircle, TrendingUp, Wallet, ArrowRight, ShieldCheck, Award
} from 'lucide-react';

export default function NotificationsPage() {
  const notifications = [
    { group: 'Today', items: [
      { id: '1', title: 'Binary Income Credited', desc: '₹400 has been credited to your wallet for 2 binary matches.', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50', time: '10:30 AM' },
      { id: '2', title: 'Payment Verified', desc: 'Your membership payment of ₹1500 has been successfully verified.', icon: ShieldCheck, color: 'text-blue-500', bg: 'bg-blue-50', time: '09:15 AM' },
    ]},
    { group: 'Yesterday', items: [
      { id: '3', title: 'Withdrawal Approved', desc: 'Your withdrawal request for ₹5000 has been processed (UTR: HDFC12345).', icon: Wallet, color: 'text-[#232F46]', bg: 'bg-gray-100', time: '04:45 PM' },
      { id: '4', title: 'Sponsor Income Credited', desc: '₹500 has been credited for directly sponsoring SKS1005.', icon: ArrowRight, color: 'text-[#ED8C32]', bg: 'bg-orange-50', time: '11:20 AM' },
    ]},
    { group: 'Earlier', items: [
      { id: '5', title: 'KYC Approved', desc: 'Your PAN and Aadhaar verification is complete.', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50', time: 'Oct 23' },
      { id: '6', title: 'Royalty Added', desc: 'Congratulations! You received ₹2500 as Royalty Income for this month.', icon: Award, color: 'text-purple-500', bg: 'bg-purple-50', time: 'Oct 01' },
    ]}
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto pb-10 space-y-6"
    >
      <PageHeader
        title="Notifications"
        description="Stay updated with your financial activity and account alerts."
        breadcrumbs={[{ label: 'Account' }, { label: 'Notifications' }]}
      />

      <div className="flex justify-between items-center bg-gray-50 p-4 border border-gray-100 rounded-xl mb-6">
        <p className="text-sm font-bold text-[#232F46]">You have 2 unread notifications</p>
        <Button variant="outline" size="sm" className="gap-2 text-gray-600">
          <CheckCircle className="w-4 h-4" /> Mark all as read
        </Button>
      </div>

      <div className="space-y-8">
        {notifications.map((group, index) => (
          <div key={index}>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 pl-2 border-l-2 border-[#ED8C32]">
              {group.group}
            </h3>
            
            <div className="space-y-3">
              {group.items.map(notif => (
                <Card key={notif.id} className="p-4 flex items-start gap-4 hover:border-[#ED8C32] transition-colors cursor-pointer group">
                  <div className={`p-3 rounded-full shrink-0 ${notif.bg} group-hover:scale-110 transition-transform`}>
                    <notif.icon className={`w-5 h-5 ${notif.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-sm font-bold text-[#232F46]">{notif.title}</h4>
                      <span className="text-xs font-medium text-gray-400">{notif.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-snug">{notif.desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
