import React from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { mockBusinessProfile } from '../../data/mockBusinessData';

export default function BusinessProfilePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto pb-10 space-y-6"
    >
      <PageHeader
        title="My Business Profile"
        description="Your core business identity, placement details, and network metrics."
        breadcrumbs={[{ label: 'Business' }, { label: 'Profile' }]}
      />

      <Card className="border-t-4" style={{ borderTopColor: '#232F46' }}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#232F46]">Business Identity</h2>
            <p className="text-sm text-gray-500">Core registration details</p>
          </div>
          <StatusBadge status={mockBusinessProfile.membershipStatus} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Member ID</p>
            <p className="text-lg font-mono font-bold text-[#232F46]">{mockBusinessProfile.memberId}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Rank</p>
            <p className="text-lg font-bold text-[#ED8C32]">{mockBusinessProfile.rank}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Join Date</p>
            <p className="text-base font-medium text-[#232F46]">{mockBusinessProfile.joinDate}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Activation Date</p>
            <p className="text-base font-medium text-[#232F46]">{mockBusinessProfile.activationDate}</p>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-bold text-[#232F46] mb-6">Placement & Sponsorship</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-100 rounded-lg p-4">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Sponsor ID</p>
            <p className="text-base font-mono font-bold text-[#232F46]">{mockBusinessProfile.sponsorId}</p>
          </div>
          <div className="border border-gray-100 rounded-lg p-4">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Placement ID</p>
            <p className="text-base font-mono font-bold text-[#232F46]">{mockBusinessProfile.placementId}</p>
          </div>
          <div className="border border-gray-100 rounded-lg p-4 md:col-span-2">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Placement Parent</p>
            <p className="text-base font-medium text-[#232F46]">{mockBusinessProfile.placementParentName}</p>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-bold text-[#232F46] mb-6">Network Metrics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <p className="text-2xl font-black text-[#232F46] mb-1">{mockBusinessProfile.totalDirectMembers}</p>
            <p className="text-xs font-bold text-gray-500 uppercase">Directs</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <p className="text-2xl font-black text-[#232F46] mb-1">{mockBusinessProfile.totalTeamMembers}</p>
            <p className="text-xs font-bold text-gray-500 uppercase">Team Size</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <p className="text-2xl font-black text-[#ED8C32] mb-1">{mockBusinessProfile.leftBv.toLocaleString()}</p>
            <p className="text-xs font-bold text-gray-500 uppercase">Left BV</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <p className="text-2xl font-black text-[#ED8C32] mb-1">{mockBusinessProfile.rightBv.toLocaleString()}</p>
            <p className="text-xs font-bold text-gray-500 uppercase">Right BV</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
