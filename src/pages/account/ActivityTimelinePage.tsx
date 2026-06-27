import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { 
  Activity, Search, ShieldCheck, UserCheck, Key, LogIn, LogOut, 
  User, Award, Heart, Users, Clock, AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../context/LanguageContext';

interface TimelineEvent {
  id: string;
  category: 'Account' | 'Membership' | 'KYC' | 'Donations' | 'Network';
  title: string;
  description: string;
  timestamp: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

const mockActivities: TimelineEvent[] = [
  {
    id: '1',
    category: 'Account',
    title: 'Profile Updated',
    description: 'Updated mobile number and email address.',
    timestamp: 'Today • 11:45 AM',
    status: 'Completed',
  },
  {
    id: '2',
    category: 'Membership',
    title: 'Membership Approved',
    description: 'Your membership application has been approved by admin.',
    timestamp: '14 Jun 2026 • 09:32 AM',
    status: 'Completed',
  },
  {
    id: '3',
    category: 'Donations',
    title: 'Donation Submitted',
    description: '₹500 donated to Welfare Fund via Razorpay.',
    timestamp: '13 Jun 2026 • 06:12 PM',
    status: 'Completed',
  },
  {
    id: '4',
    category: 'Network',
    title: 'Referral Joined',
    description: 'Amit Sharma joined your network using your referral link.',
    timestamp: '12 Jun 2026 • 02:15 PM',
    status: 'Completed',
  },
  {
    id: '5',
    category: 'KYC',
    title: 'Aadhar Uploaded',
    description: 'Aadhar card submitted for KYC verification.',
    timestamp: '10 Jun 2026 • 10:05 AM',
    status: 'Pending',
  },
];

const categoryIcons = {
  Account: <User className="w-5 h-5" />,
  Membership: <Award className="w-5 h-5" />,
  KYC: <ShieldCheck className="w-5 h-5" />,
  Donations: <Heart className="w-5 h-5" />,
  Network: <Users className="w-5 h-5" />
};

const categoryColors = {
  Account: 'bg-blue-50 text-blue-600',
  Membership: 'bg-purple-50 text-purple-600',
  KYC: 'bg-green-50 text-green-600',
  Donations: 'bg-red-50 text-red-600',
  Network: 'bg-orange-50 text-[#ED8C32]'
};

export default function ActivityTimelinePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [filter, setFilter] = useState<string>('All Activities');
  const [search, setSearch] = useState('');

  const filteredActivities = mockActivities.filter(a => {
    const matchCategory = filter === 'All Activities' || a.category === filter;
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || 
                        a.description.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="max-w-5xl mx-auto space-y-6 md:space-y-8 pb-10"
    >
      <PageHeader
        title={t('activity.title')}
        description={t('activity.desc')}
        breadcrumbs={[{ label: 'My Account' }, { label: t('activity.title') }]}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <div className="p-2.5 bg-gray-100 rounded-lg text-gray-600">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{t('activity.total')}</p>
          <h3 className="text-2xl font-black text-[#232F46]">128</h3>
        </Card>

        <Card className="flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <div className="p-2.5 bg-gray-100 rounded-lg text-gray-600">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{t('activity.lastLogin')}</p>
          <h3 className="text-sm font-bold text-[#232F46]">Today, 08:30 AM</h3>
        </Card>

        <Card className="flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <div className="p-2.5 bg-green-50 rounded-lg text-green-600">
              <Award className="w-5 h-5" />
            </div>
            <StatusBadge status="Active" />
          </div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{t('activity.memStatus')}</p>
          <h3 className="text-sm font-bold text-[#232F46]">{t('dashboard.kpiVerified')}</h3>
        </Card>

        <Card className="flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <div className="p-2.5 bg-yellow-50 rounded-lg text-yellow-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <StatusBadge status="Pending Review" />
          </div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{t('activity.kycStatus')}</p>
          <h3 className="text-sm font-bold text-[#232F46]">{t('status.inProgress')}</h3>
        </Card>
      </div>

      {/* Filter Section */}
      <Card className="p-4 sm:p-6 flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 custom-scrollbar hide-scrollbar-mobile">
          {['All Activities', 'Account', 'Membership', 'KYC', 'Donations', 'Network'].map(cat => {
            const labelKey = cat === 'All Activities' ? 'all' : cat.toLowerCase();
            return (
              <Button
                key={cat}
                onClick={() => setFilter(cat)}
                variant={filter === cat ? 'secondary' : 'outline'}
                size="sm"
              >
                {t(`activity.${labelKey}`)}
              </Button>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
          <div className="w-full sm:w-40">
            <Select 
              options={[
                { value: '7', label: t('activity.last7') },
                { value: '30', label: t('activity.last30') },
                { value: '90', label: t('activity.last90') },
                { value: 'custom', label: t('activity.custom') },
              ]}
              className="text-sm bg-white"
            />
          </div>
          <div className="w-full sm:w-64">
            <Input 
              placeholder={t('activity.search')} 
              leftIcon={<Search className="w-4 h-4" />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white"
            />
          </div>
        </div>
      </Card>

      {/* Timeline Section */}
      <Card className="p-0 overflow-hidden">
        {filteredActivities.length > 0 ? (
          <div className="p-6">
            <div className="relative border-l-2 border-gray-100 ml-4 md:ml-8 space-y-8 py-4">
              {filteredActivities.map((event) => (
                <div key={event.id} className="relative pl-8 md:pl-12 group">
                  {/* Timeline Dot / Icon */}
                  <div className={`absolute -left-[21px] top-0 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm transition-transform group-hover:scale-110 ${categoryColors[event.category]}`}>
                    {categoryIcons[event.category]}
                  </div>

                  <div className="bg-white border border-gray-100 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4 mb-2">
                      <div>
                        <h4 className="text-base font-bold text-[#232F46]">{event.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                      </div>
                      <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-start w-full sm:w-auto gap-2">
                        <StatusBadge 
                          status={event.status === 'Completed' ? 'Active' : event.status} 
                        />
                        <span className="text-[11px] font-mono text-gray-400 font-medium whitespace-nowrap">
                          {event.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-12">
            <EmptyState 
              icon={<Activity className="w-12 h-12 text-gray-300" />}
              title={t('activity.emptyTitle')}
              description={t('activity.emptyDesc')}
              action={
                <Button onClick={() => navigate('/dashboard')} variant="outline">
                  {t('activity.goDashboard')}
                </Button>
              }
            />
          </div>
        )}
      </Card>
    </motion.div>
  );
}
