import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { Network } from 'lucide-react';

export default function NetworkTreePage() {
  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="Network Tree"
        description="Visual representation of your network hierarchy."
        breadcrumbs={[{ label: 'Member Network' }, { label: 'Network Tree' }]}
      />

      <Card className="min-h-[500px] flex flex-col items-center justify-center p-8 bg-gray-50/50 border-dashed">
        <Network className="w-16 h-16 text-gray-300 mb-6" />
        <h3 className="text-xl font-bold text-[#232F46] mb-2">Hierarchical Tree View</h3>
        <p className="text-sm text-gray-500 max-w-md text-center mb-8">
          The interactive organization chart will be rendered here. This will replace the old MLM genealogy circles with a modern, responsive horizontal tree (desktop) and vertical accordion (mobile).
        </p>

        {/* Static demo of what a node looks like */}
        <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm w-64 text-center">
          <Avatar initials="DU" size="lg" className="mx-auto mb-3 ring-4 ring-green-50" />
          <h4 className="font-bold text-[#232F46]">Demo User</h4>
          <p className="text-xs font-mono text-gray-500 mb-2">SK0001</p>
          <span className="inline-block px-2 py-1 bg-green-50 text-green-600 text-[10px] font-bold uppercase rounded-md">Active</span>
        </div>
      </Card>
    </div>
  );
}
