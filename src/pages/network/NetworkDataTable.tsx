import React from 'react';
import { Avatar } from '../../components/ui/Avatar';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Card } from '../../components/ui/Card';

export interface NetworkMember {
  id: string;
  name: string;
  joinDate: string;
  status: 'Verified' | 'Pending Approval' | 'Inactive';
  mobile: string;
}

export function NetworkDataTable({ members }: { members: NetworkMember[] }) {
  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:block w-full overflow-x-auto border border-gray-200 rounded-xl bg-white shadow-sm">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-bold tracking-wider border-b border-gray-200">
            <tr>
              <th className="px-6 py-4">Member</th>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Join Date</th>
              <th className="px-6 py-4">Mobile</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar initials={member.name} size="sm" />
                    <span className="font-bold text-[#232F46]">{member.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono">{member.id}</td>
                <td className="px-6 py-4">{member.joinDate}</td>
                <td className="px-6 py-4">{member.mobile}</td>
                <td className="px-6 py-4">
                  <StatusBadge 
                    status={member.status === 'Verified' ? 'Active' : member.status} 
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {members.map((member) => (
          <Card key={member.id} className="p-4" noPadding>
            <div className="p-4 flex items-start justify-between border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Avatar initials={member.name} size="md" />
                <div>
                  <h4 className="font-bold text-[#232F46]">{member.name}</h4>
                  <p className="text-xs font-mono text-gray-500">{member.id}</p>
                </div>
              </div>
              <StatusBadge status={member.status === 'Verified' ? 'Active' : member.status} />
            </div>
            <div className="p-4 grid grid-cols-2 gap-4 bg-gray-50/50 rounded-b-xl">
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Join Date</p>
                <p className="text-sm font-medium text-gray-700">{member.joinDate}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Mobile</p>
                <p className="text-sm font-medium text-gray-700">{member.mobile}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
