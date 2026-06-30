import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, Eye, CheckCircle, XCircle, Ban, Download } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import type { StatusType } from '../../components/ui/StatusBadge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { Skeleton } from '../../components/ui/Skeleton';
import { EmptyState } from '../../components/ui/EmptyState';
import { Avatar } from '../../components/ui/Avatar';
import { PageHeader } from '../../components/ui/PageHeader';
import { supabase } from '../../lib/supabase';

// ── Mock Members Data ──────────────────────────────────────────────────────────
interface Member {
  id: string;
  name: string;
  mobile: string;
  joinDate: string;
  status: StatusType;
}

type FilterStatus = 'All' | 'Active' | 'Pending' | 'Suspended';

const FILTER_TABS: FilterStatus[] = ['All', 'Active', 'Pending', 'Suspended'];

export default function AdminMembersPage() {
  const [activeFilter, setActiveFilter] = useState<FilterStatus>('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('members')
          .select(`
            member_id,
            status,
            created_at,
            member_profile (
              full_name,
              phone_number
            )
          `)
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        if (data) {
          const mappedMembers = data.map((m: any) => {
             const profile = Array.isArray(m.member_profile) ? m.member_profile[0] : m.member_profile;
             let statusText = 'Pending Approval';
             if (m.status === 'ACTIVE') statusText = 'Active';
             if (m.status === 'SUSPENDED') statusText = 'Suspended';
             if (m.status === 'PENDING') statusText = 'Pending Approval';

             return {
               id: m.member_id || 'N/A',
               name: profile?.full_name || 'Unknown',
               mobile: profile?.phone_number || 'N/A',
               joinDate: new Date(m.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
               status: statusText as StatusType
             };
          });
          setMembers(mappedMembers);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const filtered = useMemo(() => {
    return members.filter(m => {
      const matchStatus =
        activeFilter === 'All' ||
        (activeFilter === 'Pending' && m.status === 'Pending Approval') ||
        m.status === activeFilter;

      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.id.toLowerCase().includes(q) ||
        m.mobile.includes(q);

      return matchStatus && matchSearch;
    });
  }, [activeFilter, search, members]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6 max-w-7xl mx-auto pb-10"
    >
      <PageHeader
        title="Member Management"
        description="View and manage all NGO members, approve registrations, and review profiles."
        breadcrumbs={[{ label: 'Admin Portal' }, { label: 'Members' }]}
        action={
          <Button leftIcon={<Download className="w-4 h-4" />}>
            Export CSV
          </Button>
        }
      />

      <Card noPadding className="overflow-hidden">
        {/* Filter Bar */}
        <div className="px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center gap-3 justify-between bg-gray-50/50">
          {/* Status Tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            {FILTER_TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-colors border ${
                  activeFilter === tab
                    ? 'bg-[#232F46] text-white border-[#232F46]'
                    : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {tab}
                <span className={`ml-1.5 text-[10px] ${activeFilter === tab ? 'text-white/70' : 'text-gray-400'}`}>
                  {tab === 'All'
                    ? members.length
                    : tab === 'Pending'
                    ? members.filter(m => m.status === 'Pending Approval').length
                    : members.filter(m => m.status === tab).length}
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="w-full sm:w-64">
            <Input
              placeholder="Search name or ID..."
              leftIcon={<Search className="w-4 h-4 text-gray-400" />}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white">
          {loading ? (
            <div className="p-5 space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex items-center justify-between p-2">
                  <div className="flex items-center gap-4">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="w-32 h-4" />
                      <Skeleton className="w-20 h-3" />
                    </div>
                  </div>
                  <Skeleton className="w-24 h-6 rounded-full" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState
              title="No members found"
              description="There are currently no members matching your selected filters."
            />
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block">
                <Table className="border-none shadow-none rounded-none">
                  <TableHeader className="bg-white">
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Member ID</TableHead>
                      <TableHead>Mobile</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map(m => (
                      <TableRow key={m.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar initials={m.name} size="sm" />
                            <span className="font-bold text-[#232F46]">{m.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-xs font-bold text-[#ED8C32]">{m.id}</TableCell>
                        <TableCell className="text-gray-500 font-mono text-xs">{m.mobile}</TableCell>
                        <TableCell>{m.joinDate}</TableCell>
                        <TableCell>
                          <StatusBadge status={m.status} />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <button className="p-1.5 text-gray-400 hover:text-[#232F46] hover:bg-gray-100 rounded-md transition-colors" title="View Profile">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-green-500 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors" title="Approve">
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-orange-400 hover:text-orange-500 hover:bg-orange-50 rounded-md transition-colors" title="Suspend">
                              <Ban className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors" title="Reject">
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile List */}
              <div className="md:hidden divide-y divide-gray-100">
                {filtered.map(m => (
                  <div key={m.id} className="p-4 flex flex-col gap-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar initials={m.name} size="md" />
                        <div>
                          <p className="font-bold text-[#232F46] text-sm">{m.name}</p>
                          <p className="font-mono text-xs text-[#ED8C32] mt-0.5">{m.id}</p>
                        </div>
                      </div>
                      <StatusBadge status={m.status} />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">{m.mobile} · {m.joinDate}</p>
                      <div className="flex gap-1 border border-gray-100 rounded-lg p-0.5 bg-gray-50">
                         <button className="p-1.5 text-gray-400 hover:text-[#232F46]" title="View"><Eye className="w-4 h-4" /></button>
                         <button className="p-1.5 text-green-500 hover:text-green-600" title="Approve"><CheckCircle className="w-4 h-4" /></button>
                         <button className="p-1.5 text-orange-400 hover:text-orange-500" title="Suspend"><Ban className="w-4 h-4" /></button>
                         <button className="p-1.5 text-red-400 hover:text-red-500" title="Reject"><XCircle className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Pagination UI */}
        <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400 bg-gray-50/50">
          <span>Showing {filtered.length} of {MOCK_MEMBERS.length} members</span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-40 disabled:pointer-events-none" disabled>
              Previous
            </button>
            <button className="px-3 py-1.5 rounded-lg border border-[#232F46] bg-[#232F46] text-white font-bold">
              1
            </button>
            <button className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-40 disabled:pointer-events-none" disabled={filtered.length < 8}>
              Next
            </button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
