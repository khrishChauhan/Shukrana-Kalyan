import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { NetworkDataTable, NetworkMember } from './NetworkDataTable';
import { Input } from '../../components/ui/Input';
import { Search, AlertCircle } from 'lucide-react';
import { Alert } from '../../components/ui/Alert';

export default function PendingApprovalPage() {
  const members: NetworkMember[] = [
    { id: 'SK0003', name: 'Amit Singh', joinDate: 'Oct 12, 2023', status: 'Pending Approval', mobile: '+91 9876543212' },
    { id: 'SK0005', name: 'Pooja Verma', joinDate: 'Oct 14, 2023', status: 'Pending Approval', mobile: '+91 9876543214' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="Pending Approval"
        description="Members who have registered but have not completed payment verification."
        breadcrumbs={[{ label: 'Member Network' }, { label: 'Pending Approval' }]}
      />

      <Alert variant="warning" className="mb-6" title="Follow Up Required">
        These members have not yet paid the activation fee or are awaiting admin verification. You can contact them via their registered mobile number to assist them.
      </Alert>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <Input 
          placeholder="Search pending members..." 
          leftIcon={<Search className="w-5 h-5" />} 
          className="max-w-sm"
        />
      </div>

      <NetworkDataTable members={members} />
    </div>
  );
}
