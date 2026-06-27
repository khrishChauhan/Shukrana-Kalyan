import React from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { mockSponsorTree } from '../../data/mockBusinessData';
import { Users, UserPlus, ChevronRight } from 'lucide-react';

export default function SponsorTreePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto pb-10 space-y-6"
    >
      <PageHeader
        title="Sponsor Tree"
        description="View your direct referrals and sponsor network hierarchy."
        breadcrumbs={[{ label: 'Business' }, { label: 'Sponsor Tree' }]}
      />

      <Card>
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#232F46]/10 text-[#232F46] rounded-lg">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#232F46] text-lg">{mockSponsorTree.name}</h3>
              <p className="text-xs text-gray-500 font-mono">{mockSponsorTree.id}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-[#232F46]">My Level: {mockSponsorTree.level}</p>
          </div>
        </div>

        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Direct Referrals ({mockSponsorTree.children.length})</h4>

        <div className="space-y-3">
          {mockSponsorTree.children.map((child) => (
            <div key={child.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white rounded-full shadow-sm">
                  <UserPlus className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <h5 className="font-bold text-[#232F46]">{child.name}</h5>
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-500 mt-0.5">
                    <span>{child.id}</span>
                    <span>•</span>
                    <span className="text-[#ED8C32] font-semibold">{child.rank}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4 sm:gap-6">
                <div className="hidden sm:block text-right">
                  <p className="text-xs text-gray-500 font-bold uppercase">Team Size</p>
                  <p className="font-bold text-[#232F46]">{child.teamSize}</p>
                </div>
                <div className="hidden sm:block text-right">
                  <p className="text-xs text-gray-500 font-bold uppercase">Joined</p>
                  <p className="font-bold text-[#232F46]">{child.joinDate}</p>
                </div>
                <StatusBadge status={child.active ? 'Active' : 'Inactive'} />
                <button className="text-gray-400 hover:text-[#ED8C32] transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
