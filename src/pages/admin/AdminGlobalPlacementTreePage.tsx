import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Network, Search, User, ZoomIn, ZoomOut, RefreshCw, GitBranch } from 'lucide-react';
import { supabase } from '../../lib/supabase';

// ─── Types ────────────────────────────────────────────────────────────────────
interface FlatNode {
  id: string;
  member_id: string;
  full_name: string;
  status: string;
  parent_id: string | null;
  placement_side: 'left' | 'right' | null;
  level: number;
  leftBv?: number;
  rightBv?: number;
}

interface TreeNode extends FlatNode {
  left: TreeNode | null;
  right: TreeNode | null;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function buildTree(flat: FlatNode[]): TreeNode | null {
  if (!flat.length) return null;
  const map = new Map<string, TreeNode>();
  flat.forEach(n => map.set(n.id, { ...n, left: null, right: null }));

  let root: TreeNode | null = null;
  flat.forEach(n => {
    const node = map.get(n.id)!;
    if (!n.parent_id || n.level === 0) {
      root = node;
    } else {
      const parent = map.get(n.parent_id);
      if (parent) {
        if (n.placement_side === 'left') parent.left = node;
        else if (n.placement_side === 'right') parent.right = node;
      }
    }
  });
  return root;
}

function getInitials(name: string): string {
  if (!name) return '??';
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

// ─── Empty Slot ───────────────────────────────────────────────────────────────
const EmptySlot = ({ side }: { side: 'left' | 'right' }) => (
  <div className="flex flex-col items-center">
    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full mb-1 ${
      side === 'left' ? 'bg-[#232F46] text-white' : 'bg-[#ED8C32] text-white'
    }`}>
      {side.toUpperCase()}
    </span>
    <div className="w-[180px] h-[130px] border-2 border-dashed border-gray-300 rounded-xl bg-gray-50/70 flex flex-col items-center justify-center gap-2">
      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
        <User className="w-4 h-4 text-gray-400" />
      </div>
      <span className="text-[11px] text-gray-400 font-semibold">Empty Slot</span>
    </div>
  </div>
);

// ─── Binary Node ──────────────────────────────────────────────────────────────
const BinaryNodeCard = ({ node, isRoot }: { node: TreeNode; isRoot: boolean }) => {
  return (
    <div className="flex flex-col items-center relative">
      {node.placement_side && !isRoot && (
        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full mb-1 ${
          node.placement_side === 'left' ? 'bg-[#232F46] text-white' : 'bg-[#ED8C32] text-white'
        }`}>
          {node.placement_side.toUpperCase()}
        </span>
      )}
      <div className={`w-48 bg-white rounded-xl shadow-sm p-3 flex flex-col items-center z-10 relative transition-colors ${
        isRoot ? 'border-2 border-[#ED8C32]' : 'border border-[#232F46]/20'
      }`}>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 font-bold text-white text-sm ${
          isRoot ? 'bg-[#ED8C32]' : 'bg-[#232F46]'
        }`}>
          {getInitials(node.full_name)}
        </div>
        <p className="text-sm font-bold text-[#232F46] truncate w-full text-center">{node.full_name || 'Unknown'}</p>
        <p className="text-xs font-mono text-gray-500">{node.member_id}</p>
        <div className="w-full grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-gray-100">
          <div className="text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase">Left BV</p>
            <p className="text-xs font-bold text-[#ED8C32]">{node.leftBv || 0}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase">Right BV</p>
            <p className="text-xs font-bold text-[#ED8C32]">{node.rightBv || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Connector Lines ──────────────────────────────────────────────────────────
const VLine = () => <div className="w-px h-8 bg-gray-300 mx-auto" />;

// ─── Recursive Tree ───────────────────────────────────────────────────────────
const BinarySubTree = ({ node, remainingDepth, side }: { node: TreeNode | null; remainingDepth: number; side: 'left' | 'right' }) => {
  if (remainingDepth < 0) return null;
  if (!node) {
    return (
      <div className="flex flex-col items-center relative w-1/2">
        <VLine />
        <EmptySlot side={side} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center relative w-1/2">
      <VLine />
      <BinaryNodeCard node={node} isRoot={false} />
      {(node.left || node.right || remainingDepth > 0) && (
        <div className="flex mt-0 relative w-full justify-center">
          <div className="absolute top-[32px] left-[25%] right-[25%] h-px bg-gray-300 -z-10" />
          <BinarySubTree node={node.left} remainingDepth={remainingDepth - 1} side="left" />
          <BinarySubTree node={node.right} remainingDepth={remainingDepth - 1} side="right" />
        </div>
      )}
    </div>
  );
};

const BinaryTreeView = ({ root, maxDepth }: { root: TreeNode; maxDepth: number }) => (
  <div className="flex flex-col items-center select-none w-full">
    <BinaryNodeCard node={root} isRoot={true} />
    {(root.left || root.right || maxDepth > 0) && (
      <div className="flex mt-0 relative w-[800px] justify-center">
        <div className="absolute top-[32px] left-[25%] right-[25%] h-px bg-gray-300 -z-10" />
        <BinarySubTree node={root.left} remainingDepth={maxDepth - 1} side="left" />
        <BinarySubTree node={root.right} remainingDepth={maxDepth - 1} side="right" />
      </div>
    )}
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AdminGlobalPlacementTreePage() {
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState(0.9);

  const fetchTree = useCallback(async (searchId?: string) => {
    setLoading(true);
    setError(null);
    try {
      let rootUuid = null;

      if (searchId) {
        // Find member by member_id
        const { data: memberData, error: memberError } = await supabase
          .from('members')
          .select('id')
          .eq('member_id', searchId.trim().toUpperCase())
          .single();
        
        if (memberError || !memberData) {
          throw new Error(`Member with ID ${searchId} not found.`);
        }
        rootUuid = memberData.id;
      } else {
        // Find system root (oldest member, usually no parent)
        const { data: rootData, error: rootError } = await supabase
          .from('member_business')
          .select('id')
          .is('placement_parent_uuid', null)
          .limit(1)
          .single();
        
        if (rootError || !rootData) {
          throw new Error('Could not find system root.');
        }
        rootUuid = rootData.id;
      }

      // Fetch network tree RPC
      const { data: rpcData, error: rpcError } = await supabase.rpc('get_network_tree', {
        p_root_uuid: rootUuid,
        p_type: 'placement',
      });

      if (rpcError) throw rpcError;
      const flatNodes = (rpcData || []) as FlatNode[];

      if (flatNodes.length > 0) {
        // Fetch BV data for these nodes
        const nodeIds = flatNodes.map(n => n.id);
        const { data: bvData } = await supabase
          .from('member_business')
          .select('member_uuid, total_left_bv, total_right_bv')
          .in('member_uuid', nodeIds);
        
        if (bvData) {
          const bvMap = new Map();
          bvData.forEach(b => bvMap.set(b.member_uuid, b));
          
          flatNodes.forEach(node => {
            const biz = bvMap.get(node.id);
            node.leftBv = biz ? Number(biz.total_left_bv || 0) : 0;
            node.rightBv = biz ? Number(biz.total_right_bv || 0) : 0;
          });
        }
      }

      setTree(buildTree(flatNodes));
    } catch (e: any) {
      console.error(e);
      setError(e.message);
      setTree(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTree();
  }, [fetchTree]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchTree(searchQuery);
    } else {
      fetchTree();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto pb-10 space-y-6"
    >
      <PageHeader
        title="Global Placement Tree"
        description="Inspect the live global binary tree structure and BV flow."
        breadcrumbs={[{ label: 'Admin' }, { label: 'Business Ops' }, { label: 'Placement Tree' }]}
      />

      <Card className="overflow-hidden">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
          <div className="relative w-full sm:w-80 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Jump to Member ID..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#ED8C32] text-sm"
              />
            </div>
            <button type="submit" className="px-4 py-2 bg-[#232F46] text-white rounded-lg text-sm font-bold hover:bg-[#1a2333] transition-colors">
              Search
            </button>
          </div>
          <div className="flex gap-2 items-center">
            <button type="button" onClick={() => fetchTree(searchQuery)} className="p-2 border border-gray-200 rounded hover:bg-gray-50 text-gray-600 transition-colors" title="Refresh">
              <RefreshCw className="w-4 h-4" />
            </button>
            <div className="w-px h-6 bg-gray-200 mx-1" />
            <button type="button" onClick={() => setZoom(z => Math.min(z + 0.1, 1.5))} className="p-2 border border-gray-200 rounded hover:bg-gray-50 text-gray-600 transition-colors">
              <ZoomIn className="w-4 h-4" />
            </button>
            <button type="button" onClick={() => setZoom(z => Math.max(z - 0.1, 0.4))} className="p-2 border border-gray-200 rounded hover:bg-gray-50 text-gray-600 transition-colors">
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="overflow-x-auto min-h-[600px] flex justify-center pt-8 pb-32 bg-gray-50/50 rounded-xl border border-gray-100 relative">
          {loading ? (
            <div className="flex flex-col items-center justify-center gap-4 mt-20">
              <div className="w-10 h-10 border-4 border-[#232F46] border-t-[#ED8C32] rounded-full animate-spin" />
              <p className="text-sm text-gray-500 font-medium">Loading network tree...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center gap-3 mt-20 text-center">
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
                <Search className="w-7 h-7 text-red-400" />
              </div>
              <p className="text-sm text-red-600 font-semibold">{error}</p>
              <button
                type="button"
                onClick={() => { setSearchQuery(''); fetchTree(); }}
                className="text-sm text-[#232F46] font-bold underline hover:text-[#ED8C32]"
              >
                Reset to Root
              </button>
            </div>
          ) : !tree ? (
            <div className="flex flex-col items-center justify-center gap-3 mt-20 text-center">
              <GitBranch className="w-12 h-12 text-gray-300" />
              <p className="text-gray-400 text-sm font-medium">No network data found.</p>
            </div>
          ) : (
            <div 
              className="min-w-[1000px] transform origin-top transition-transform duration-200 flex justify-center"
              style={{ transform: `scale(${zoom})` }}
            >
              <BinaryTreeView root={tree} maxDepth={3} />
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
