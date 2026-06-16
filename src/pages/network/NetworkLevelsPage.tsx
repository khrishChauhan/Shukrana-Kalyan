import React, { useState } from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { NetworkDataTable, NetworkMember } from './NetworkDataTable';
import { Layers } from 'lucide-react';

export default function NetworkLevelsPage() {
  const [activeLevel, setActiveLevel] = useState<number | null>(null);

  const levels = [
    { level: 1, members: 45, commission: '10%' },
    { level: 2, members: 120, commission: '5%' },
    { level: 3, members: 350, commission: '3%' },
    { level: 4, members: 731, commission: '2%' },
  ];

  const demoMembers: NetworkMember[] = [
    { id: 'SK0001', name: 'Rajesh Kumar', joinDate: 'Oct 10, 2023', status: 'Verified', mobile: '+91 9876543210' },
    { id: 'SK0002', name: 'Sneha Patel', joinDate: 'Oct 11, 2023', status: 'Verified', mobile: '+91 9876543211' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="Network Levels"
        description="View your network organized by depth level."
        breadcrumbs={[{ label: 'Member Network' }, { label: 'Network Levels' }]}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {levels.map((lvl) => (
          <Card 
            key={lvl.level} 
            className={`cursor-pointer transition-all hover:border-[#ED8C32] ${activeLevel === lvl.level ? 'border-[#ED8C32] ring-1 ring-[#ED8C32] bg-orange-50/30' : ''}`}
            onClick={() => setActiveLevel(lvl.level)}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-50 text-blue-500 rounded-lg">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#232F46]">Level {lvl.level}</h3>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-2xl font-bold text-[#232F46]">{lvl.members}</p>
                <p className="text-xs text-gray-500 font-medium">Members</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {activeLevel !== null ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <h3 className="text-lg font-bold text-[#232F46] mb-4">Level {activeLevel} Members</h3>
          <NetworkDataTable members={demoMembers} />
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200 border-dashed">
          <Layers className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">Select a level card above to view its members.</p>
        </div>
      )}
    </div>
  );
}
