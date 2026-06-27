import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { NetworkDataTable, NetworkMember } from './NetworkDataTable';
import { Input } from '../../components/ui/Input';
import { Search } from 'lucide-react';
import { motion } from 'motion/react';

export default function DirectReferralsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for Skeleton showcase
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const members: NetworkMember[] = [
    { id: 'SK0001', name: 'Rajesh Kumar', joinDate: 'Oct 10, 2023', status: 'Verified', mobile: '+91 9876543210' },
    { id: 'SK0002', name: 'Sneha Patel', joinDate: 'Oct 11, 2023', status: 'Verified', mobile: '+91 9876543211' },
    { id: 'SK0003', name: 'Amit Singh', joinDate: 'Oct 12, 2023', status: 'Pending Approval', mobile: '+91 9876543212' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto pb-10"
    >
      <PageHeader
        title="My Invites"
        description="Members directly sponsored by you."
        breadcrumbs={[{ label: 'Community' }, { label: 'My Invites' }]}
      />

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <Input 
          placeholder="Search by name or ID..." 
          leftIcon={<Search className="w-5 h-5 text-gray-400" />} 
          className="max-w-sm"
        />
      </div>

      <NetworkDataTable members={members} loading={loading} />
    </motion.div>
  );
}
