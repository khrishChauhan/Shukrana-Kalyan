import React from 'react';
import { Avatar } from '../../components/ui/Avatar';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Card } from '../../components/ui/Card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { Skeleton } from '../../components/ui/Skeleton';
import { EmptyState } from '../../components/ui/EmptyState';

export interface NetworkMember {
  id: string;
  name: string;
  joinDate: string;
  status: 'Verified' | 'Pending Approval' | 'Inactive';
  mobile: string;
}

export function NetworkDataTable({ members, loading = false }: { members: NetworkMember[], loading?: boolean }) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <Card key={i} className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="w-32 h-4" />
                <Skeleton className="w-20 h-3" />
              </div>
            </div>
            <Skeleton className="w-24 h-6 rounded-full" />
          </Card>
        ))}
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <EmptyState
        title="No members found"
        description="There are currently no members matching your criteria."
      />
    );
  }

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar initials={member.name} size="sm" />
                    <span className="font-bold text-[#232F46]">{member.name}</span>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-gray-500">{member.id}</TableCell>
                <TableCell>{member.joinDate}</TableCell>
                <TableCell>{member.mobile}</TableCell>
                <TableCell>
                  <StatusBadge 
                    status={member.status === 'Verified' ? 'Active' : member.status} 
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {members.map((member) => (
          <Card key={member.id} className="p-4 hover:border-[#ED8C32] transition-colors" noPadding>
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
