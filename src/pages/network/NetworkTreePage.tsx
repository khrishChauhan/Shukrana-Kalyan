/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NetworkTreePage — Live binary placement tree, powered by get_binary_tree() RPC.
 * Design: Premium SKS brand (#232F46 navy / #ED8C32 orange), Stitch-inspired.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { RefreshCw, GitBranch, Users, TrendingUp, Activity } from 'lucide-react';
import { supabase } from '../../lib/supabase';

// ─── Types ────────────────────────────────────────────────────────────────────
interface FlatNode {
  node_uuid: string;
  member_id: string;
  full_name: string;
  status: string;
  side: 'left' | 'right' | null;
  parent_uuid: string | null;
  depth: number;
  left_bv: number;
  right_bv: number;
}

interface TreeNode extends FlatNode {
  left: TreeNode | null;
  right: TreeNode | null;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function buildTree(flat: FlatNode[]): TreeNode | null {
  if (!flat.length) return null;
  const map = new Map<string, TreeNode>();
  flat.forEach(n => map.set(n.node_uuid, { ...n, left: null, right: null }));

  let root: TreeNode | null = null;
  flat.forEach(n => {
    const node = map.get(n.node_uuid)!;
    if (!n.parent_uuid) {
      root = node;
    } else {
      const parent = map.get(n.parent_uuid);
      if (parent) {
        if (n.side === 'left') parent.left = node;
        else parent.right = node;
      }
    }
  });

  return root;
}

function getInitials(name: string): string {
  if (!name) return '??';
  return name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function countStats(flat: FlatNode[]) {
  const downline = flat.filter(n => n.depth > 0);
  return {
    total: downline.length,
    left: downline.filter(n => n.side === 'left').length,
    right: downline.filter(n => n.side === 'right').length,
    active: flat.filter(n => n.status === 'ACTIVE').length,
  };
}

// ─── Empty Slot Card ──────────────────────────────────────────────────────────
const EmptySlot = ({ side }: { side: 'left' | 'right' }) => (
  <div className="flex flex-col items-center">
    {/* Side chip */}
    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full mb-1 ${
      side === 'left'
        ? 'bg-[#232F46] text-white'
        : 'bg-[#ED8C32] text-white'
    }`}>
      {side.toUpperCase()}
    </span>
    {/* Dashed card */}
    <div className="w-[148px] h-[112px] border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50/70 flex flex-col items-center justify-center gap-2 hover:border-gray-400 transition-colors">
      <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </div>
      <span className="text-[11px] text-gray-400 font-semibold">Empty Slot</span>
    </div>
  </div>
);

// ─── Member Node Card ─────────────────────────────────────────────────────────
const NodeCard = ({ node, isRoot }: { node: TreeNode; isRoot: boolean }) => {
  const statusStyle: Record<string, string> = {
    ACTIVE:    'bg-emerald-50 text-emerald-700 border border-emerald-200',
    PENDING:   'bg-amber-50 text-amber-700 border border-amber-200',
    SUSPENDED: 'bg-red-50 text-red-600 border border-red-200',
  };

  return (
    <div className="flex flex-col items-center">
      {/* Side chip (for non-root) */}
      {node.side && (
        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full mb-1 ${
          node.side === 'left'
            ? 'bg-[#232F46] text-white'
            : 'bg-[#ED8C32] text-white'
        }`}>
          {node.side.toUpperCase()}
        </span>
      )}

      {/* Card */}
      <div className={`w-[148px] bg-white rounded-2xl p-3 flex flex-col items-center gap-2 shadow-md transition-shadow hover:shadow-lg
        ${isRoot
          ? 'ring-2 ring-[#ED8C32] ring-offset-2'
          : 'border border-gray-100'
        }`}
      >
        {/* Avatar */}
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm
          ${isRoot ? 'bg-[#ED8C32]' : 'bg-[#232F46]'}`}
        >
          {getInitials(node.full_name)}
        </div>

        {/* Name */}
        <div className="text-center">
          <p className="text-[12px] font-bold text-[#232F46] leading-tight line-clamp-2">
            {node.full_name || 'Unknown'}
          </p>
          <p className="text-[10px] font-bold text-[#ED8C32] font-mono mt-0.5">
            {node.member_id}
          </p>
        </div>

        {/* Status badge */}
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusStyle[node.status] || 'bg-gray-100 text-gray-500'}`}>
          {node.status}
        </span>

        {/* BV stats */}
        {isRoot && (
          <div className="w-full flex justify-between text-[9px] text-gray-400 font-mono border-t border-gray-100 pt-1 mt-0.5">
            <span>L: {(node.left_bv ?? 0).toFixed(0)} BV</span>
            <span>R: {(node.right_bv ?? 0).toFixed(0)} BV</span>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Connector Line ───────────────────────────────────────────────────────────
const VLine = () => <div className="w-px h-6 bg-slate-300 mx-auto" />;

// ─── Recursive Tree Renderer ─────────────────────────────────────────────────
const BinarySubTree = ({
  node,
  remainingDepth,
}: {
  node: TreeNode | null;
  remainingDepth: number;
  side?: 'left' | 'right';
}) => {
  if (remainingDepth < 0) return null;

  if (!node) {
    return (
      <div className="flex flex-col items-center">
        <VLine />
        <EmptySlot side="left" />
        {remainingDepth > 0 && (
          <>
            <VLine />
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <VLine />
                <EmptySlot side="left" />
              </div>
              <div className="flex flex-col items-center">
                <VLine />
                <EmptySlot side="right" />
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <VLine />
      <NodeCard node={node} isRoot={false} />
      {remainingDepth > 0 && (
        <>
          <VLine />
          {/* Horizontal bridge */}
          <div className="relative flex items-start">
            {/* horizontal line spanning between children */}
            <div className="absolute top-0 left-[74px] right-[74px] h-px bg-slate-300"
                 style={{ left: '74px', right: '74px' }}
            />
            <div className="flex items-start gap-4">
              <BinarySubTree node={node.left} remainingDepth={remainingDepth - 1} side="left" />
              <BinarySubTree node={node.right} remainingDepth={remainingDepth - 1} side="right" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const BinaryTreeView = ({ root, maxDepth }: { root: TreeNode; maxDepth: number }) => (
  <div className="flex flex-col items-center select-none">
    <NodeCard node={root} isRoot={true} />

    {maxDepth > 0 && (
      <>
        <VLine />
        {/* Horizontal bridge at root level */}
        <div className="relative">
          <div className="flex items-start gap-8">
            <BinarySubTree node={root.left} remainingDepth={maxDepth - 1} side="left" />
            <BinarySubTree node={root.right} remainingDepth={maxDepth - 1} side="right" />
          </div>
        </div>
      </>
    )}
  </div>
);

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({
  label, value, icon, color,
}: {
  label: string; value: number; icon: React.ReactNode; color: string;
}) => (
  <div className="flex-1 min-w-[120px] bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm flex items-center gap-3">
    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">{label}</p>
      <p className="text-xl font-bold text-[#232F46]">{value}</p>
    </div>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function NetworkTreePage() {
  const [tree, setTree]         = useState<TreeNode | null>(null);
  const [flatData, setFlatData] = useState<FlatNode[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);
  const [maxDepth, setMaxDepth] = useState(3);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTree = useCallback(async (depth: number, silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
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
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { fetchTree(maxDepth); }, [maxDepth, fetchTree]);

  const stats = countStats(flatData);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6 pb-10"
    >
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <GitBranch className="w-5 h-5 text-[#ED8C32]" />
            <h1 className="text-2xl font-bold text-[#232F46]">Network Tree View</h1>
          </div>
          <p className="text-sm text-gray-500">Visualize your binary downline network in real-time</p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Depth selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-600">Depth:</span>
            <div className="flex rounded-lg border border-gray-200 overflow-hidden bg-white shadow-sm">
              {[2, 3, 4].map(d => (
                <button
                  key={d}
                  onClick={() => setMaxDepth(d)}
                  className={`px-4 py-2 text-sm font-bold transition-colors ${
                    maxDepth === d
                      ? 'bg-[#232F46] text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Refresh button */}
          <button
            onClick={() => fetchTree(maxDepth, true)}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-[#ED8C32] hover:bg-[#d97b2a] rounded-lg shadow-sm transition-colors disabled:opacity-60"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <div className="flex gap-3 flex-wrap">
        <StatCard
          label="Total Downline"
          value={stats.total}
          icon={<Users className="w-4 h-4 text-[#232F46]" />}
          color="bg-[#232F46]/10"
        />
        <StatCard
          label="Left Leg"
          value={stats.left}
          icon={<Activity className="w-4 h-4 text-blue-600" />}
          color="bg-blue-50"
        />
        <StatCard
          label="Right Leg"
          value={stats.right}
          icon={<Activity className="w-4 h-4 text-[#ED8C32]" />}
          color="bg-orange-50"
        />
        <StatCard
          label="Active Members"
          value={stats.active}
          icon={<TrendingUp className="w-4 h-4 text-emerald-600" />}
          color="bg-emerald-50"
        />
      </div>

      {/* ── Legend ── */}
      <div className="flex flex-wrap gap-4 text-xs text-gray-500 bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm">
        <span className="font-semibold text-gray-700">Legend:</span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" /> Active
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" /> Pending
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-4 h-px border-t-2 border-dashed border-gray-300" /> Empty Slot
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm ring-2 ring-[#ED8C32]" /> You (Root)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-[#232F46] text-white">L</span> Left Leg
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-[#ED8C32] text-white">R</span> Right Leg
        </span>
      </div>

      {/* ── Tree Canvas ── */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-md p-8 overflow-x-auto min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-10 h-10 border-4 border-[#232F46] border-t-[#ED8C32] rounded-full animate-spin" />
            <p className="text-sm text-gray-500 font-medium">Loading your network tree…</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
              <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
            </div>
            <p className="text-sm text-red-600 font-semibold">{error}</p>
            <button
              onClick={() => fetchTree(maxDepth)}
              className="text-sm text-[#232F46] font-bold underline underline-offset-2 hover:text-[#ED8C32] transition-colors"
            >
              Try again
            </button>
          </div>
        ) : !tree ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <GitBranch className="w-12 h-12 text-gray-300" />
            <p className="text-gray-400 text-sm font-medium">No network data found for your account.</p>
            <p className="text-gray-300 text-xs">Register new members under your network to see the tree.</p>
          </div>
        ) : (
          <div className="min-w-max mx-auto py-4">
            <BinaryTreeView root={tree} maxDepth={maxDepth} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
