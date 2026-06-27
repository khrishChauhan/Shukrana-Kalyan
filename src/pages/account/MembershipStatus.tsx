import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { ShieldCheck, Calendar, CreditCard } from 'lucide-react';
import { useTranslation } from '../../context/LanguageContext';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { Skeleton } from '../../components/ui/Skeleton';

export default function MembershipStatus() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="max-w-5xl mx-auto pb-10"
    >
      <PageHeader
        title={t('membership.title')}
        description={t('membership.desc')}
        breadcrumbs={[
          { label: 'My Account' },
          { label: t('membership.title') }
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Main Status Card */}
        <div className="md:col-span-2">
          {loading ? (
            <Skeleton className="w-full h-full min-h-[200px] rounded-xl" />
          ) : (
            <Card className="h-full text-white border-0 shadow-sm" style={{ backgroundColor: '#232F46' }}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                  <p className="text-sm font-bold text-white/60 uppercase tracking-widest mb-2">{t('membership.currentStatus')}</p>
                  <div className="flex items-center gap-3">
                    <h2 className="text-3xl font-black">Active Member</h2>
                    <StatusBadge status="Active" className="bg-green-500/20 text-green-400 border-green-500/30" />
                  </div>
                </div>
                <div className="p-3 bg-white/10 rounded-xl">
                  <ShieldCheck className="w-8 h-8 text-[#ED8C32]" />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/10">
                <div>
                  <p className="text-xs text-white/60 font-bold uppercase tracking-wider mb-1">{t('membership.memberId')}</p>
                  <p className="font-mono font-bold text-lg">SK000123</p>
                </div>
                <div>
                  <p className="text-xs text-white/60 font-bold uppercase tracking-wider mb-1">{t('membership.joinDate')}</p>
                  <p className="font-bold text-lg">October 15, 2023</p>
                </div>
                <div>
                  <p className="text-xs text-white/60 font-bold uppercase tracking-wider mb-1">KYC Status</p>
                  <p className="font-bold text-lg text-green-400">Verified</p>
                </div>
                <div>
                  <p className="text-xs text-white/60 font-bold uppercase tracking-wider mb-1">Benefits Unlocked</p>
                  <p className="font-bold text-lg text-[#ED8C32]">4 / 10</p>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Quick Actions / Info */}
        <div className="space-y-6">
          {loading ? (
            <>
              <Skeleton className="w-full h-20 rounded-xl" />
              <Skeleton className="w-full h-20 rounded-xl" />
            </>
          ) : (
            <>
              <Card className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#232F46]">{t('membership.lifetime')}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{t('membership.noRenewal')}</p>
                </div>
              </Card>

              <Card className="flex items-center gap-4">
                <div className="p-3 bg-orange-50 text-orange-600 rounded-lg shrink-0">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#232F46]">{t('membership.idReady')}</p>
                  <a href="/account/membership-card" className="text-xs text-[#ED8C32] font-semibold hover:underline mt-0.5 inline-block">{t('membership.download')}</a>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>

      <Card noPadding className="overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
          <h3 className="font-bold text-[#232F46]">{t('membership.history')}</h3>
        </div>
        
        {loading ? (
          <div className="p-5 space-y-4">
             {[1, 2, 3].map(i => (
                <div key={i} className="flex justify-between items-center">
                  <Skeleton className="w-24 h-4" />
                  <Skeleton className="w-48 h-4" />
                  <Skeleton className="w-20 h-6 rounded-full" />
                </div>
             ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table className="border-0 rounded-none shadow-none">
              <TableHeader className="bg-white">
                <TableRow>
                  <TableHead>{t('membership.date')}</TableHead>
                  <TableHead>{t('membership.event')}</TableHead>
                  <TableHead>{t('membership.status')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-gray-500 text-xs font-mono">Oct 16, 2023</TableCell>
                  <TableCell className="font-medium text-[#232F46]">{t('membership.verified')}</TableCell>
                  <TableCell><StatusBadge status="Active" /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-gray-500 text-xs font-mono">Oct 15, 2023</TableCell>
                  <TableCell className="font-medium text-[#232F46]">{t('membership.submitted')}</TableCell>
                  <TableCell><StatusBadge status="Pending Verification" /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-gray-500 text-xs font-mono">Oct 15, 2023</TableCell>
                  <TableCell className="font-medium text-[#232F46]">{t('membership.registered')}</TableCell>
                  <TableCell><StatusBadge status="Pending Approval" /></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
