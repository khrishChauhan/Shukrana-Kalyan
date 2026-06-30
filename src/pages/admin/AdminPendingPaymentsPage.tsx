import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export default function AdminPendingPaymentsPage() {
  const [pendingMembers, setPendingMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingMembers();
  }, []);

  const fetchPendingMembers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('members')
        .select(`
          id,
          member_id,
          created_at,
          member_profile (
            full_name,
            phone_number
          )
        `)
        .eq('status', 'PENDING');

      if (error) throw error;
      setPendingMembers(data || []);
    } catch (error) {
      console.error('Error fetching pending members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (memberId: string) => {
    if (!window.confirm("Are you sure you want to approve this member?")) return;
    try {
      const { error: rpcError } = await supabase.rpc('activate_member', {
        p_member_uuid: memberId
      });
      
      if (rpcError) throw rpcError;

      alert('Member successfully approved and activated via placement engine!');
      fetchPendingMembers();
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#232F46]">Pending Approvals</h1>
          <p className="text-sm text-slate-500">Review and activate pending member registrations.</p>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Member Details</th>
                <th className="px-6 py-4">Registered Date</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {loading ? (
                <tr><td colSpan={3} className="px-6 py-4 text-center">Loading...</td></tr>
              ) : pendingMembers.length === 0 ? (
                <tr><td colSpan={3} className="px-6 py-4 text-center">No pending approvals found.</td></tr>
              ) : (
                pendingMembers.map(member => {
                  const profile = Array.isArray(member.member_profile) ? member.member_profile[0] : member.member_profile;
                  return (
                    <tr key={member.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-[#232F46]">{profile?.full_name || 'Unknown'}</div>
                        <div className="text-xs text-slate-500">{member.member_id} • {profile?.phone_number}</div>
                      </td>
                      <td className="px-6 py-4">
                        {new Date(member.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4">
                        <Button variant="primary" size="sm" onClick={() => handleApprove(member.id)}>Approve</Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
