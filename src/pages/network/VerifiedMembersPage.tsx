import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { NetworkDataTable, NetworkMember } from './NetworkDataTable';
import { Input } from '../../components/ui/Input';
import { Search } from 'lucide-react';

export default function VerifiedMembersPage() {
  const members: NetworkMember[] = [
    { id: 'SK0001', name: 'Rajesh Kumar', joinDate: 'Oct 10, 2023', status: 'Verified', mobile: '+91 9876543210' },
    { id: 'SK0002', name: 'Sneha Patel', joinDate: 'Oct 11, 2023', status: 'Verified', mobile: '+91 9876543211' },
    { id: 'SK0004', name: 'Vikram Singh', joinDate: 'Oct 13, 2023', status: 'Verified', mobile: '+91 9876543213' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="Verified Members"
        description="All fully verified and active members in your downline."
        breadcrumbs={[{ label: 'Member Network' }, { label: 'Verified Members' }]}
      />

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <Input 
          placeholder="Search verified members..." 
          leftIcon={<Search className="w-5 h-5" />} 
          className="max-w-sm"
        />
      </div>

      <NetworkDataTable members={members} />
    </div>
  );
}
