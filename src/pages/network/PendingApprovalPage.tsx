import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { NetworkDataTable, NetworkMember } from './NetworkDataTable';
import { Input } from '../../components/ui/Input';
import { Search, AlertCircle } from 'lucide-react';
import { Alert } from '../../components/ui/Alert';
import { motion } from 'motion/react';

export default function PendingApprovalPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for Skeleton showcase
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const members: NetworkMember[] = [
    { id: 'SK0003', name: 'Amit Singh', joinDate: 'Oct 12, 2023', status: 'Pending Approval', mobile: '+91 9876543212' },
    { id: 'SK0005', name: 'Pooja Verma', joinDate: 'Oct 14, 2023', status: 'Pending Approval', mobile: '+91 9876543214' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto pb-10"
    >
      <PageHeader
        title="Pending Approval"
        description="Members who have registered but have not completed verification."
        breadcrumbs={[{ label: 'Community' }, { label: 'Pending Approval' }]}
      />

      <Alert variant="warning" className="mb-6" title="Follow Up Required">
        These members have not yet verified their profile. You can contact them via their registered mobile number to assist them.
      </Alert>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <Input 
          placeholder="Search pending members..." 
          leftIcon={<Search className="w-5 h-5 text-gray-400" />} 
          className="max-w-sm"
        />
      </div>

      <NetworkDataTable members={members} loading={loading} />
    </motion.div>
  );
}
