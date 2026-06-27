import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Users, UserCheck, UserPlus, TrendingUp, Copy, Activity, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { motion } from 'motion/react';
import { Skeleton } from '../../components/ui/Skeleton';

export default function NetworkOverviewPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for Skeleton showcase
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { title: 'Total Members', value: '1,248', icon: <Users className="w-6 h-6 text-[#232F46]" />, trend: '+12% this month' },
    { title: 'My Invites', value: '45', icon: <TrendingUp className="w-6 h-6 text-[#ED8C32]" />, trend: '+3 this week' },
    { title: 'Verified Members', value: '956', icon: <UserCheck className="w-6 h-6 text-green-600" />, trend: '+8% this month' },
    { title: 'Pending Members', value: '292', icon: <UserPlus className="w-6 h-6 text-blue-600" />, trend: '+24% this month' },
  ];

  return (
    <div className="max-w-6xl mx-auto pb-10">
      <PageHeader
        title="Community Overview"
        description="Monitor your NGO community and track new member onboarding."
        breadcrumbs={[{ label: 'Community' }, { label: 'Overview' }]}
        action={
          <Button leftIcon={<Copy className="w-4 h-4" />}>
            Copy Invite Link
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <Card key={i} className="flex flex-col hover:border-[#ED8C32] transition-colors">
            {loading ? (
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <Skeleton className="w-12 h-12 rounded-xl" />
                </div>
                <div>
                  <Skeleton className="w-16 h-8 mb-2" />
                  <Skeleton className="w-24 h-4" />
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl">
                    {stat.icon}
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#232F46] mb-1">{stat.value}</p>
                  <h3 className="text-sm font-semibold text-gray-500">{stat.title}</h3>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="text-xs font-medium text-gray-500">{stat.trend}</span>
                </div>
              </>
            )}
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="h-[300px] flex flex-col items-center justify-center relative overflow-hidden">
            {loading ? (
              <div className="w-full h-full p-6 flex flex-col items-center justify-center space-y-4">
                <Skeleton className="w-16 h-16 rounded-full" />
                <Skeleton className="w-1/3 h-6" />
                <Skeleton className="w-1/2 h-4" />
              </div>
            ) : (
              <div className="text-center p-6 relative z-10">
                <TrendingUp className="w-12 h-12 text-[#ED8C32] opacity-50 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-[#232F46] mb-2">Community Growth</h3>
                <p className="text-sm text-gray-500">The monthly network growth visualization will be placed here.</p>
              </div>
            )}
          </Card>

          <Card className="p-0 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-bold text-[#232F46] flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-gray-400" />
                Recent Registrations
              </h3>
            </div>
            {loading ? (
              <div className="p-5 space-y-4">
                {[1, 2].map(i => (
                  <div key={i} className="flex gap-4">
                    <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="w-1/2 h-4" />
                      <Skeleton className="w-1/4 h-3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {[
                  { name: 'Amit Sharma', date: 'Today, 10:30 AM', id: 'SKS-99201' },
                  { name: 'Priya Patel', date: 'Yesterday, 04:15 PM', id: 'SKS-99200' },
                ].map((member, i) => (
                  <div key={i} className="p-4 hover:bg-gray-50 transition-colors flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-blue-600">{member.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-[#232F46]">{member.name}</h4>
                      <p className="text-xs text-gray-500">{member.id}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-medium text-gray-400">{member.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="p-0 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-bold text-[#232F46] flex items-center gap-2">
                <Activity className="w-5 h-5 text-gray-400" />
                Recent Member Activity
              </h3>
            </div>
            {loading ? (
              <div className="p-5 space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex gap-4">
                    <Skeleton className="w-8 h-8 rounded-full shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="w-full h-4" />
                      <Skeleton className="w-1/3 h-3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {[
                  { text: 'Rajesh Kumar updated profile', time: '1 hour ago', icon: <UserCheck className="w-4 h-4 text-green-500" /> },
                  { text: 'Sneha Gupta completed KYC', time: '3 hours ago', icon: <ShieldCheck className="w-4 h-4 text-blue-500" /> },
                  { text: 'Vikram Singh joined', time: '5 hours ago', icon: <UserPlus className="w-4 h-4 text-[#ED8C32]" /> },
                ].map((activity, i) => (
                  <div key={i} className="p-4 hover:bg-gray-50 transition-colors flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      {activity.icon}
                    </div>
                    <div>
                      <p className="text-sm text-[#232F46]">{activity.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
