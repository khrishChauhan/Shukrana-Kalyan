import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Users, UserCheck, UserPlus, TrendingUp, Copy } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export default function NetworkOverviewPage() {
  const stats = [
    { title: 'Total Network', value: '1,248', icon: <Users className="w-6 h-6 text-blue-500" />, trend: '+12% this month' },
    { title: 'Verified Members', value: '956', icon: <UserCheck className="w-6 h-6 text-green-500" />, trend: '+8% this month' },
    { title: 'Pending Approval', value: '292', icon: <UserPlus className="w-6 h-6 text-orange-500" />, trend: '+24% this month' },
    { title: 'Direct Referrals', value: '45', icon: <TrendingUp className="w-6 h-6 text-[#ED8C32]" />, trend: '+3 this week' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="Network Overview"
        description="Monitor your referral network and track new member onboarding."
        breadcrumbs={[{ label: 'Member Network' }, { label: 'Overview' }]}
        action={
          <Button leftIcon={<Copy className="w-4 h-4" />}>
            Copy Invite Link
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <Card key={i} className="flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-gray-50 rounded-xl">
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
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-full min-h-[400px] flex flex-col items-center justify-center">
            <div className="text-center p-6">
              <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[#232F46] mb-2">Growth Chart Preview</h3>
              <p className="text-sm text-gray-500">The monthly network growth visualization will be placed here.</p>
            </div>
          </Card>
        </div>
        <div>
          <Card className="h-full">
            <h3 className="text-lg font-bold text-[#232F46] mb-4">Recent Activity</h3>
            <div className="space-y-6">
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <UserPlus className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-[#232F46]"><strong>Amit Sharma</strong> joined your network.</p>
                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
