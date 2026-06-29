import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '../../lib/supabase';

// ─── Types ────────────────────────────────────────────────────────────────────
interface FlatNode {
  node_uuid: string;
  member_id: string;
  full_name: string;
  status: 'ACTIVE' | 'PENDING' | 'SUSPENDED';
  placement_side: 'left' | 'right' | null;
  parent_uuid: string | null;
  depth: number;
}

interface TreeNode extends FlatNode {
  left: TreeNode | null;
  right: TreeNode | null;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function buildTree(flat: FlatNode[]): TreeNode | null {
  if (!flat.length) return null;
  const map = new Map<string, TreeNode>();

  // First pass: create all nodes
  flat.forEach(n => map.set(n.node_uuid, { ...n, left: null, right: null }));

  let root: TreeNode | null = null;

  // Second pass: wire up parent-child relationships
  flat.forEach(n => {
    const node = map.get(n.node_uuid)!;
    if (!n.parent_uuid) {
      root = node;
    } else {
      const parent = map.get(n.parent_uuid);
      if (parent) {
        if (n.placement_side === 'left') parent.left = node;
        else parent.right = node;
      }
    }
  });

  return root;
}

function countStats(flat: FlatNode[]) {
  const downline = flat.filter(n => n.depth > 0);
  return {
    total: downline.length,
    left: downline.filter(n => n.placement_side === 'left').length,
    right: downline.filter(n => n.placement_side === 'right').length,
    active: downline.filter(n => n.status === 'ACTIVE').length,
  };
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    ACTIVE:    'bg-emerald-50 text-emerald-700 border border-emerald-200',
    PENDING:   'bg-amber-50 text-amber-700 border border-amber-200',
    SUSPENDED: 'bg-red-50 text-red-600 border border-red-200',
  };
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${styles[status] || ''}`}>
      {status}
    </span>
  );
};

// ─── Side Chip ────────────────────────────────────────────────────────────────
const SideChip = ({ side }: { side: 'left' | 'right' | null }) => {
  if (!side) return null;
  return (
    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
      side === 'left'
        ? 'bg-blue-100 text-blue-700'
        : 'bg-orange-100 text-orange-700'
    }`}>
      {side.toUpperCase()}
    </span>
  );
};

// ─── Empty Slot ───────────────────────────────────────────────────────────────
const EmptySlot = ({ side }: { side: 'left' | 'right' }) => (
  <div className="flex flex-col items-center gap-1">
    <SideChip side={side} />
    <div className="w-[120px] h-[96px] border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-1 bg-slate-50/50 hover:border-slate-300 transition-colors">
      <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center">
        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </div>
      <span className="text-[10px] text-slate-400 font-medium">Open Slot</span>
    </div>
  </div>
);

// ─── Tree Node Card ───────────────────────────────────────────────────────────
const NodeCard = ({ node, isRoot }: { node: TreeNode; isRoot: boolean }) => (
  <div className="flex flex-col items-center gap-1">
    {node.placement_side && <SideChip side={node.placement_side} />}
    <div className={`w-[120px] rounded-xl bg-white p-3 flex flex-col gap-1.5 shadow-sm transition-shadow hover:shadow-md
      ${isRoot ? 'ring-2 ring-amber-400 ring-offset-2' : 'border border-slate-200'}`}>
      {/* Member ID */}
      <span className="text-[10px] font-bold text-[#232F46] tracking-wide">{node.member_id}</span>
      {/* Full Name */}
      <span className="text-xs text-slate-700 font-medium leading-tight line-clamp-2">{node.full_name}</span>
      {/* Status */}
      <StatusBadge status={node.status} />
    </div>
  </div>
);

// ─── Recursive Tree Renderer ─────────────────────────────────────────────────
const TreeLevel = ({ node, isRoot = false, maxDepth, currentDepth = 0 }: {
  node: TreeNode;
  isRoot?: boolean;
  maxDepth: number;
  currentDepth?: number;
}) => {
  const hasChildren = node.left || node.right;
  const showChildren = currentDepth < maxDepth;

  return (
    <div className="flex flex-col items-center">
      {/* Current Node */}
      <NodeCard node={node} isRoot={isRoot} />

      {/* Connector Lines + Children */}
      {showChildren && (
        <div className="flex flex-col items-center">
          {/* Vertical stem down */}
          <div className="w-px h-6 bg-slate-300" />

          {hasChildren ? (
            <div className="flex items-start gap-0">
              {/* Left branch */}
              <div className="flex flex-col items-center" style={{ marginRight: '8px' }}>
                <div className="flex items-start">
                  <div className="w-[60px] h-px bg-slate-300" style={{ alignSelf: 'flex-start', height: '1px', width: '60px' }} />
                </div>
              </div>

              {/* Children row */}
              <div className="flex gap-3 relative">
                {/* Horizontal connector line */}
                <div className="absolute top-0 left-[60px] right-[60px] h-px bg-slate-300"
                     style={{ top: 0 }} />

                {/* Left child (or empty slot) */}
                <div className="flex flex-col items-center">
                  <div className="w-px h-6 bg-slate-300" />
                  {node.left
                    ? <TreeLevel node={node.left} maxDepth={maxDepth} currentDepth={currentDepth + 1} />
                    : <EmptySlot side="left" />}
                </div>

                {/* Right child (or empty slot) */}
                <div className="flex flex-col items-center">
                  <div className="w-px h-6 bg-slate-300" />
                  {node.right
                    ? <TreeLevel node={node.right} maxDepth={maxDepth} currentDepth={currentDepth + 1} />
                    : <EmptySlot side="right" />}
                </div>
              </div>
            </div>
          ) : (
            // Leaf node at this level — show empty slots below
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-px h-6 bg-slate-300" />
                <EmptySlot side="left" />
              </div>
              <div className="flex flex-col items-center">
                <div className="w-px h-6 bg-slate-300" />
                <EmptySlot side="right" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ─── Cleaner Tree Renderer (replaces above with proper connectors) ─────────────
const BinaryTreeView = ({ node, maxDepth }: { node: TreeNode; maxDepth: number }) => {
  const renderNode = (n: TreeNode | null, depth: number, side: 'left' | 'right' | null, isRoot: boolean): React.ReactNode => {
    if (depth > maxDepth) return null;

    if (!n) {
      return (
        <div className="flex flex-col items-center">
          <div className="w-px h-6 bg-slate-200" />
          <EmptySlot side={side as 'left' | 'right'} />
          {depth < maxDepth && (
            <div className="flex flex-col items-center mt-0">
              <div className="w-px h-6 bg-slate-200" />
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-px h-6 bg-slate-200" />
                  <EmptySlot side="left" />
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-px h-6 bg-slate-200" />
                  <EmptySlot side="right" />
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center">
        {!isRoot && <div className="w-px h-6 bg-slate-300" />}
        <NodeCard node={n} isRoot={isRoot} />
        {depth < maxDepth && (
          <>
            <div className="w-px h-6 bg-slate-300" />
            <div className="relative flex items-start gap-4">
              {/* Horizontal bridge line */}
              <div className="absolute left-[50%] right-auto top-0 h-px bg-slate-300"
                   style={{ width: '50%', left: 0, right: 0, top: '0px' }} />
              <div className="flex flex-col items-end" style={{ minWidth: 0 }}>
                {renderNode(n.left, depth + 1, 'left', false)}
              </div>
              <div className="flex flex-col items-start" style={{ minWidth: 0 }}>
                {renderNode(n.right, depth + 1, 'right', false)}
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center">
      <NodeCard node={node} isRoot={true} />
      {maxDepth > 0 && (
        <>
          <div className="w-px h-6 bg-slate-300" />
          <div className="flex gap-8 items-start">
            <div className="flex flex-col items-center">
              <div className="w-px h-6 bg-slate-300" />
              {node.left
                ? <BinaryTreeView node={node.left} maxDepth={maxDepth - 1} />
                : <EmptySlot side="left" />}
            </div>
            <div className="flex flex-col items-center">
              <div className="w-px h-6 bg-slate-300" />
              {node.right
                ? <BinaryTreeView node={node.right} maxDepth={maxDepth - 1} />
                : <EmptySlot side="right" />}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, color }: { label: string; value: number; color: string }) => (
  <div className="flex-1 bg-white border border-slate-200 rounded-xl px-5 py-4 shadow-sm">
    <p className="text-xs text-slate-500 font-medium mb-1">{label}</p>
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function NetworkTreePage() {
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [flatData, setFlatData] = useState<FlatNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [maxDepth, setMaxDepth] = useState(3);

  const fetchTree = useCallback(async (depth: number) => {
    setLoading(true);
    setError(null);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error: rpcError } = await supabase.rpc('get_binary_tree', {
        p_root_uuid: user.id,
        p_max_depth: depth,
      });

      if (rpcError) throw rpcError;

      const flat = (data || []) as FlatNode[];
      setFlatData(flat);
      setTree(buildTree(flat));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTree(maxDepth);
  }, [maxDepth, fetchTree]);

  const stats = countStats(flatData);

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#232F46]">My Network Tree</h1>
          <p className="text-sm text-slate-500 mt-0.5">Your binary placement structure at a glance</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-slate-600">Depth:</label>
          <div className="flex rounded-lg border border-slate-200 overflow-hidden bg-white shadow-sm">
            {[2, 3, 4].map(d => (
              <button
                key={d}
                onClick={() => setMaxDepth(d)}
                className={`px-4 py-2 text-sm font-semibold transition-colors ${
                  maxDepth === d
                    ? 'bg-[#232F46] text-white'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
          <button
            onClick={() => fetchTree(maxDepth)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <div className="flex gap-3 flex-wrap">
        <StatCard label="Total Downline" value={stats.total} color="text-[#232F46]" />
        <StatCard label="Left Leg" value={stats.left} color="text-blue-600" />
        <StatCard label="Right Leg" value={stats.right} color="text-orange-500" />
        <StatCard label="Active Members" value={stats.active} color="text-emerald-600" />
      </div>

      {/* ── Legend ── */}
      <div className="flex flex-wrap gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" /> Active
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" /> Pending
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-4 h-px border-t-2 border-dashed border-slate-300" /> Open Slot
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm border-2 border-amber-400" /> You (Root)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-100 text-blue-700">L</span> Left Leg
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-bold bg-orange-100 text-orange-700">R</span> Right Leg
        </span>
      </div>

      {/* ── Tree Canvas ── */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 overflow-x-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-8 h-8 border-4 border-[#232F46] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-slate-500">Loading your network tree…</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
              <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856C18.448 20 20 18.448 20 16.938v-1.386C20 13.912 18.448 12 16.938 12H7.062C5.552 12 4 13.552 4 15.552v1.386C4 18.448 5.552 20 7.062 20z" />
              </svg>
            </div>
            <p className="text-sm text-red-600 font-medium">{error}</p>
            <button
              onClick={() => fetchTree(maxDepth)}
              className="text-sm text-[#232F46] font-semibold underline underline-offset-2"
            >
              Try again
            </button>
          </div>
        ) : !tree ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <p className="text-slate-400 text-sm">No network data found for your account.</p>
          </div>
        ) : (
          <div className="min-w-max mx-auto">
            <BinaryTreeView node={tree} maxDepth={maxDepth} />
          </div>
        )}
      </div>
    </div>
  );
}
