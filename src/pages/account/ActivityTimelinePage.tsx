import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { 
  Activity, Search, ShieldCheck, Clock, User, Award, Heart, Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../context/LanguageContext';
import { supabase } from '../../lib/supabase';

// Map actions to generic categories
const getCategory = (action: string) => {
  if (action.includes('KYC')) return 'KYC';
  if (action.includes('DONATION') || action.includes('WELFARE')) return 'Donations';
  if (action.includes('MEMBER') || action.includes('NETWORK') || action.includes('SPONSOR')) return 'Network';
  if (action.includes('WITHDRAWAL') || action.includes('PAYMENT')) return 'Membership';
  return 'Account';
};

const categoryIcons: any = {
  Account: <User className="w-5 h-5" />,
  Membership: <Award className="w-5 h-5" />,
  KYC: <ShieldCheck className="w-5 h-5" />,
  Donations: <Heart className="w-5 h-5" />,
  Network: <Users className="w-5 h-5" />
};

const categoryColors: any = {
  Account: 'bg-blue-50 text-blue-600',
  Membership: 'bg-purple-50 text-purple-600',
  KYC: 'bg-green-50 text-green-600',
  Donations: 'bg-red-50 text-red-600',
  Network: 'bg-orange-50 text-[#ED8C32]'
};

export default function ActivityTimelinePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [activities, setActivities] = useState<any[]>([]);
  const [profileData, setProfileData] = useState({ status: 'PENDING', kyc: 'PENDING', lastLogin: '—' });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('All Activities');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Fetch logs
        const { data: logs } = await supabase
          .from('activity_logs')
          .select('*')
          .eq('member_uuid', user.id)
          .order('created_at', { ascending: false });

        if (logs) {
          setActivities(logs);
          // Try to find last login if there is one logged, else use the most recent activity
          const loginLog = logs.find(l => l.action.includes('LOGIN'));
          const lastLog = loginLog || logs[0];
          
          let lastLoginDisplay = '—';
          if (lastLog) {
            lastLoginDisplay = new Date(lastLog.created_at).toLocaleString();
          }

          // Fetch member statuses
          const [{ data: mem }, { data: kyc }] = await Promise.all([
            supabase.from('members').select('status').eq('id', user.id).single(),
            supabase.from('member_kyc').select('verification_status').eq('id', user.id).single()
          ]);

          setProfileData({
            status: mem?.status || 'PENDING',
            kyc: kyc?.verification_status || 'PENDING',
            lastLogin: lastLoginDisplay
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredActivities = activities.filter(a => {
    const cat = getCategory(a.action);
    const matchCategory = filter === 'All Activities' || cat === filter;
    
    // search in action or details
    const searchString = `${a.action} ${JSON.stringify(a.details)}`.toLowerCase();
    const matchSearch = searchString.includes(search.toLowerCase());
    
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
          {loading ? <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" /> : <h3 className="text-2xl font-black text-[#232F46]">{activities.length}</h3>}
        </Card>

        <Card className="flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <div className="p-2.5 bg-gray-100 rounded-lg text-gray-600">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{t('activity.lastLogin')}</p>
          {loading ? <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" /> : <h3 className="text-sm font-bold text-[#232F46]">{profileData.lastLogin}</h3>}
        </Card>

        <Card className="flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <div className="p-2.5 bg-green-50 rounded-lg text-green-600">
              <Award className="w-5 h-5" />
            </div>
            {!loading && <StatusBadge status={profileData.status === 'ACTIVE' ? 'Active' : profileData.status} />}
          </div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{t('activity.memStatus')}</p>
          {loading ? <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" /> : <h3 className="text-sm font-bold text-[#232F46]">{profileData.status}</h3>}
        </Card>

        <Card className="flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <div className="p-2.5 bg-yellow-50 rounded-lg text-yellow-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            {!loading && <StatusBadge status={profileData.kyc === 'VERIFIED' ? 'Active' : 'Pending'} />}
          </div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{t('activity.kycStatus')}</p>
          {loading ? <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" /> : <h3 className="text-sm font-bold text-[#232F46]">{profileData.kyc}</h3>}
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
        {loading ? (
          <div className="p-12 text-center text-gray-400">Loading timeline...</div>
        ) : filteredActivities.length > 0 ? (
          <div className="p-6">
            <div className="relative border-l-2 border-gray-100 ml-4 md:ml-8 space-y-8 py-4">
              {filteredActivities.map((event) => {
                const cat = getCategory(event.action);
                return (
                  <div key={event.id} className="relative pl-8 md:pl-12 group">
                    <div className={`absolute -left-[21px] top-0 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm transition-transform group-hover:scale-110 ${categoryColors[cat]}`}>
                      {categoryIcons[cat]}
                    </div>

                    <div className="bg-white border border-gray-100 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4 mb-2">
                        <div>
                          <h4 className="text-base font-bold text-[#232F46] uppercase">{event.action.replace(/_/g, ' ')}</h4>
                          <p className="text-sm text-gray-600 mt-1 font-mono break-all">{JSON.stringify(event.details)}</p>
                        </div>
                        <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-start w-full sm:w-auto gap-2">
                          <span className="text-[11px] font-mono text-gray-400 font-medium whitespace-nowrap">
                            {new Date(event.created_at).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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
