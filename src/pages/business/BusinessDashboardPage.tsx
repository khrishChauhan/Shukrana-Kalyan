import React from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { mockBusinessHealth } from '../../data/mockBusinessData';
import { Activity, TrendingUp, Award, DollarSign } from 'lucide-react';

export default function BusinessDashboardPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto pb-10 space-y-6"
    >
      <PageHeader
        title="Business Dashboard"
        description="Monitor your business health, growth, and upcoming milestones."
        breadcrumbs={[{ label: 'Business' }, { label: 'Dashboard' }]}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-gray-50 text-gray-600 rounded-lg shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#232F46]">Current BV</p>
            <p className="text-xl font-black text-[#ED8C32]">{mockBusinessHealth.currentBv.toLocaleString()}</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 bg-gray-50 text-[#ED8C32] rounded-lg shrink-0">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#232F46]">Today's Business</p>
            <p className="text-xl font-black text-[#ED8C32]">+{mockBusinessHealth.todayBusiness.toLocaleString()} BV</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 bg-gray-50 text-[#232F46] rounded-lg shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#232F46]">Current Rank</p>
            <p className="text-lg font-black text-[#232F46]">{mockBusinessHealth.currentRank}</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 bg-gray-50 text-[#232F46] rounded-lg shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#232F46]">Total Earnings</p>
            <p className="text-xl font-black text-[#232F46]">₹{mockBusinessHealth.snapshot.totalEarnings.toLocaleString()}</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <h3 className="font-bold text-[#232F46] mb-4">Business Snapshot</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">Today's Earnings</p>
              <p className="text-2xl font-bold text-[#232F46]">₹{mockBusinessHealth.snapshot.todayEarnings.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">Pending Payout</p>
              <p className="text-2xl font-bold text-[#ED8C32]">₹{mockBusinessHealth.snapshot.pendingPayout.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">Total Withdrawn</p>
              <p className="text-2xl font-bold text-[#232F46]">₹{mockBusinessHealth.snapshot.totalWithdrawn.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">Royalty Status</p>
              <p className="text-lg font-bold text-[#232F46]">{mockBusinessHealth.royaltyEligibility}</p>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="font-bold text-[#232F46] mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {mockBusinessHealth.recentActivity.map((activity) => (
              <div key={activity.id} className="flex gap-3">
                <div className="mt-1">
                  <div className="w-2 h-2 rounded-full bg-[#ED8C32]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#232F46]">{activity.event}</p>
                  <p className="text-xs text-gray-500">{activity.details}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
