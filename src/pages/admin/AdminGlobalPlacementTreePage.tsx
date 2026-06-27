import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { mockPlacementTree } from '../../data/mockBusinessData';
import { Network, Search, User, ZoomIn, ZoomOut } from 'lucide-react';

const BinaryNode = ({ node }: { node: any }) => {
  if (!node) {
    return (
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 bg-gray-100 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center mb-2">
          <span className="text-gray-400 text-xs">Empty</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center relative">
      <div className="w-48 bg-white border border-[#232F46]/20 rounded-xl shadow-sm p-3 flex flex-col items-center z-10 relative cursor-pointer hover:border-[#ED8C32] transition-colors">
        <div className="w-10 h-10 bg-[#232F46]/5 rounded-full flex items-center justify-center mb-2">
          <User className="w-5 h-5 text-[#232F46]" />
        </div>
        <p className="text-sm font-bold text-[#232F46] truncate w-full text-center">{node.name}</p>
        <p className="text-xs font-mono text-gray-500">{node.id}</p>
        <div className="w-full grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-gray-100">
          <div className="text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase">Left BV</p>
            <p className="text-xs font-bold text-[#ED8C32]">{node.leftBv}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase">Right BV</p>
            <p className="text-xs font-bold text-[#ED8C32]">{node.rightBv}</p>
          </div>
        </div>
      </div>

      {(node.left || node.right || node.id === mockPlacementTree.id) && (
        <div className="flex mt-8 relative w-full justify-center gap-8">
          <div className="absolute top-[-32px] left-1/2 w-px h-8 bg-gray-300 -translate-x-1/2 -z-10" />
          <div className="absolute top-[-8px] left-[25%] right-[25%] h-px bg-gray-300 -z-10" />
          
          <div className="flex flex-col items-center relative w-1/2">
            <div className="absolute top-[-8px] w-px h-8 bg-gray-300 -z-10" />
            <BinaryNode node={node.left} />
          </div>
          <div className="flex flex-col items-center relative w-1/2">
            <div className="absolute top-[-8px] w-px h-8 bg-gray-300 -z-10" />
            <BinaryNode node={node.right} />
          </div>
        </div>
      )}
    </div>
  );
};

export default function AdminGlobalPlacementTreePage() {
  const [search, setSearch] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto pb-10 space-y-6"
    >
      <PageHeader
        title="Global Placement Tree"
        description="Inspect the global binary tree structure and BV flow."
        breadcrumbs={[{ label: 'Admin' }, { label: 'Business Ops' }, { label: 'Placement Tree' }]}
      />

      <Card className="overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Jump to Member ID..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#ED8C32] text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button className="p-2 border border-gray-200 rounded hover:bg-gray-50 text-gray-600 transition-colors">
              <ZoomIn className="w-4 h-4" />
            </button>
            <button className="p-2 border border-gray-200 rounded hover:bg-gray-50 text-gray-600 transition-colors">
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto min-h-[600px] flex justify-center p-10 bg-gray-50/50 rounded-xl border border-gray-100">
          <div className="min-w-[800px] transform scale-90 origin-top">
            <BinaryNode node={mockPlacementTree} />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
