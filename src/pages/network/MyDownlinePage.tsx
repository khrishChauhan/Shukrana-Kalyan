import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { supabase } from '../../lib/supabase';
import { Search } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { motion } from 'motion/react';

interface DownlineMember {
  id: string;
  member_id: string;
  full_name: string;
  status: string;
  created_at: string;
  level: number;
}

export default function MyDownlinePage() {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<DownlineMember[]>([]);
  const [filter, setFilter] = useState<'ALL' | 'DIRECT'>('ALL');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchDownline() {
      setLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        
        const { data, error } = await supabase.rpc('get_my_downline', {
          p_root_uuid: user.id,
          p_filter: filter
        });

        if (error) throw error;
        setMembers((data || []) as DownlineMember[]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDownline();
  }, [filter]);

  const filteredMembers = members.filter(m => 
    m.full_name?.toLowerCase().includes(search.toLowerCase()) || 
    m.member_id?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto pb-10"
    >
      <PageHeader
        title="My Downline"
        description="View your direct referrals and complete network downline."
        breadcrumbs={[{ label: 'Community' }, { label: 'My Downline' }]}
      />

      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <Input 
          placeholder="Search by name or ID..." 
          leftIcon={<Search className="w-5 h-5 text-gray-400" />} 
          className="max-w-sm w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value as 'ALL' | 'DIRECT')}
          className="p-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#ED8C32]"
        >
          <option value="ALL">All Levels</option>
          <option value="DIRECT">Direct Referrals Only</option>
        </select>
      </div>

      <Card noPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                <th className="px-6 py-4">Member ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Level</th>
                <th className="px-6 py-4">Join Date</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Loading downline data...</td>
                </tr>
              ) : filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No members found.</td>
                </tr>
              ) : (
                filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-[#ED8C32] font-bold">{member.member_id}</td>
                    <td className="px-6 py-4 text-sm text-[#232F46] font-semibold">{member.full_name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Level {member.level}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(member.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-bold rounded-full border 
                        ${member.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                          member.status === 'PENDING' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                          'bg-gray-50 text-gray-600 border-gray-200'}`}
                      >
                        {member.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
