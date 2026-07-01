import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Network, Search, UserPlus, ChevronRight } from 'lucide-react';
import { StatusBadge } from '../../components/ui/StatusBadge';

export default function AdminGlobalSponsorTreePage() {
  const [search, setSearch] = useState('');

  const sponsorTreeState = {
    id: 'ROOT-001',
    name: 'System Root',
    level: 0,
    rank: 'Admin',
    children: [
      { id: 'SK000124', name: 'Sneha Patel', rank: 'Distributor', active: true, joinDate: 'Oct 18, 2023', level: 1, teamSize: 5 },
      { id: 'SK000125', name: 'Vikram Singh', rank: 'Silver Director', active: true, joinDate: 'Oct 19, 2023', level: 1, teamSize: 120 },
      { id: 'SK000126', name: 'Amit Kumar', rank: 'Distributor', active: false, joinDate: 'Oct 20, 2023', level: 1, teamSize: 0 },
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto pb-10 space-y-6"
    >
      <PageHeader
        title="Global Sponsor Tree"
        description="View the complete sponsor hierarchy for any member in the network."
        breadcrumbs={[{ label: 'Admin' }, { label: 'Business Ops' }, { label: 'Sponsor Tree' }]}
      />

      <Card>
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#232F46]/10 rounded-lg">
              <Network className="w-5 h-5 text-[#232F46]" />
            </div>
            <h3 className="font-bold text-[#232F46] text-lg">Network Explorer</h3>
          </div>
          
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search Member ID or Name..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#ED8C32] text-sm"
            />
          </div>
        </div>

        {/* Tree Root */}
        <div className="mb-4">
          <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Root Member Node</h4>
          <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl">
            <div>
              <h3 className="font-bold text-[#232F46] text-lg">{sponsorTreeState.name}</h3>
              <p className="text-xs text-gray-500 font-mono mt-1">{sponsorTreeState.id} • Level {sponsorTreeState.level}</p>
            </div>
            <span className="px-3 py-1 bg-[#ED8C32] text-white rounded-lg text-xs font-bold uppercase tracking-wider">
              {sponsorTreeState.rank || 'ROOT'}
            </span>
          </div>
        </div>

        {/* Children */}
        <div className="space-y-3 pl-0 sm:pl-6 border-l-2 border-gray-100 ml-2">
          {sponsorTreeState.children.map((child) => (
            <div key={child.id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-[#ED8C32] transition-colors relative">
              <div className="absolute top-1/2 -left-6 w-6 h-0.5 bg-gray-200 -z-10" />
              
              <div className="flex items-center gap-4">
                <div className="p-2 bg-gray-50 rounded-full">
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
              
              <div className="flex items-center gap-6">
                <div className="hidden sm:block text-right">
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Team Size</p>
                  <p className="font-bold text-[#232F46]">{child.teamSize}</p>
                </div>
                <StatusBadge status={child.active ? 'Active' : 'Inactive' as any} />
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
