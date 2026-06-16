import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import type { StatusType } from '../../components/ui/StatusBadge';

// ── Mock Members Data ──────────────────────────────────────────────────────────
interface Member {
  id: string;
  name: string;
  mobile: string;
  joinDate: string;
  status: StatusType;
}

const MOCK_MEMBERS: Member[] = [
  { id: 'SK00001', name: 'Rajesh Kumar',      mobile: '9876543210', joinDate: '02 Jan 2026', status: 'Active' },
  { id: 'SK00002', name: 'Neelam Sharma',     mobile: '9812345678', joinDate: '05 Jan 2026', status: 'Active' },
  { id: 'SK00003', name: 'Amit Verma',        mobile: '9823456789', joinDate: '10 Jan 2026', status: 'Pending Approval' },
  { id: 'SK00004', name: 'Sunita Devi',       mobile: '9834567890', joinDate: '14 Jan 2026', status: 'Active' },
  { id: 'SK00005', name: 'Pramod Singh',      mobile: '9845678901', joinDate: '20 Jan 2026', status: 'Suspended' },
  { id: 'SK00006', name: 'Kavita Gupta',      mobile: '9856789012', joinDate: '25 Jan 2026', status: 'Active' },
  { id: 'SK00007', name: 'Ravi Shankar',      mobile: '9867890123', joinDate: '01 Feb 2026', status: 'Pending Approval' },
  { id: 'SK00008', name: 'Anita Kumari',      mobile: '9878901234', joinDate: '07 Feb 2026', status: 'Active' },
  { id: 'SK00009', name: 'Deepak Mishra',     mobile: '9889012345', joinDate: '12 Feb 2026', status: 'Active' },
  { id: 'SK00010', name: 'Priya Pandey',      mobile: '9890123456', joinDate: '18 Feb 2026', status: 'Suspended' },
  { id: 'SK00011', name: 'Manoj Tiwari',      mobile: '9901234567', joinDate: '24 Feb 2026', status: 'Active' },
  { id: 'SK00012', name: 'Rekha Yadav',       mobile: '9912345678', joinDate: '01 Mar 2026', status: 'Pending Approval' },
  { id: 'SK00013', name: 'Vikas Chauhan',     mobile: '9923456789', joinDate: '08 Mar 2026', status: 'Active' },
  { id: 'SK00014', name: 'Geeta Srivastava',  mobile: '9934567890', joinDate: '14 Mar 2026', status: 'Active' },
  { id: 'SK00015', name: 'Sandeep Joshi',     mobile: '9945678901', joinDate: '20 Mar 2026', status: 'Suspended' },
  { id: 'SK00016', name: 'Pooja Rawat',       mobile: '9956789012', joinDate: '01 Apr 2026', status: 'Active' },
  { id: 'SK00017', name: 'Arun Gautam',       mobile: '9967890123', joinDate: '10 Apr 2026', status: 'Pending Approval' },
  { id: 'SK00018', name: 'Meena Bajpai',      mobile: '9978901234', joinDate: '18 Apr 2026', status: 'Active' },
  { id: 'SK00019', name: 'Suresh Prasad',     mobile: '9989012345', joinDate: '25 Apr 2026', status: 'Active' },
  { id: 'SK00020', name: 'Lalita Shukla',     mobile: '9990123456', joinDate: '05 May 2026', status: 'Active' },
  { id: 'SK00021', name: 'Hemant Tripathi',   mobile: '9871234560', joinDate: '12 May 2026', status: 'Pending Approval' },
  { id: 'SK00022', name: 'Archana Singh',     mobile: '9882345671', joinDate: '20 May 2026', status: 'Active' },
  { id: 'SK00023', name: 'Devendra Pal',      mobile: '9893456782', joinDate: '28 May 2026', status: 'Suspended' },
  { id: 'SK00024', name: 'Usha Pathak',       mobile: '9904567893', joinDate: '04 Jun 2026', status: 'Active' },
];

type FilterStatus = 'All' | 'Active' | 'Pending' | 'Suspended';

const FILTER_TABS: FilterStatus[] = ['All', 'Active', 'Pending', 'Suspended'];

export default function AdminMembersPage() {
  const [activeFilter, setActiveFilter] = useState<FilterStatus>('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return MOCK_MEMBERS.filter(m => {
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
  }, [activeFilter, search]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6 max-w-7xl mx-auto"
    >
      {/* Page Title */}
      <div>
        <h1 className="text-xl font-bold text-[#232F46]">Member Management</h1>
        <p className="text-sm text-gray-400 mt-1">
          {MOCK_MEMBERS.length} total members registered
        </p>
      </div>

      <Card noPadding className="overflow-hidden">
        {/* Filter Bar */}
        <div className="px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          {/* Status Tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            {FILTER_TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-colors border ${
                  activeFilter === tab
                    ? 'bg-[#232F46] text-white border-[#232F46]'
                    : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {tab}
                <span className={`ml-1.5 text-[10px] ${activeFilter === tab ? 'text-white/70' : 'text-gray-400'}`}>
                  {tab === 'All'
                    ? MOCK_MEMBERS.length
                    : tab === 'Pending'
                    ? MOCK_MEMBERS.filter(m => m.status === 'Pending Approval').length
                    : MOCK_MEMBERS.filter(m => m.status === tab).length}
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="w-full sm:w-64">
            <Input
              placeholder="Search name or Member ID..."
              leftIcon={<Search className="w-4 h-4" />}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table — desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wide">Member ID</th>
                <th className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wide">Name</th>
                <th className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wide">Mobile</th>
                <th className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wide">Join Date</th>
                <th className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length > 0 ? (
                filtered.map(m => (
                  <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <span className="font-mono text-xs font-bold text-[#ED8C32]">{m.id}</span>
                    </td>
                    <td className="px-5 py-3.5 font-medium text-[#232F46]">{m.name}</td>
                    <td className="px-5 py-3.5 text-gray-500 font-mono text-xs">{m.mobile}</td>
                    <td className="px-5 py-3.5 text-gray-500">{m.joinDate}</td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={m.status} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-16 text-gray-400 text-sm">
                    No members match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Card list — mobile */}
        <div className="md:hidden divide-y divide-gray-100">
          {filtered.length > 0 ? (
            filtered.map(m => (
              <div key={m.id} className="px-5 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-[#232F46] text-sm">{m.name}</p>
                  <p className="font-mono text-xs text-[#ED8C32] mt-0.5">{m.id}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{m.mobile} · {m.joinDate}</p>
                </div>
                <StatusBadge status={m.status} />
              </div>
            ))
          ) : (
            <p className="text-center py-12 text-gray-400 text-sm">No members found.</p>
          )}
        </div>

        {/* Pagination UI — visual only */}
        <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
          <span>Showing {filtered.length} of {MOCK_MEMBERS.length} members</span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none" disabled>
              Previous
            </button>
            <button className="px-3 py-1.5 rounded-lg border border-gray-200 bg-[#232F46] text-white font-bold">
              1
            </button>
            <button className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
