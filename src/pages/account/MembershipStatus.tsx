import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { ShieldCheck, Calendar, CreditCard, Activity } from 'lucide-react';
import { useTranslation } from '../../context/LanguageContext';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';

export default function MembershipStatus() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto">
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
          <Card className="h-full bg-gradient-to-br from-[#232F46] to-[#1A2333] text-white border-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <p className="text-sm font-mono text-white/60 uppercase tracking-widest mb-1">{t('membership.currentStatus')}</p>
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl font-bold">Active Member</h2>
                  <StatusBadge status="Active" className="bg-green-500/20 text-green-400 border-green-500/30" />
                </div>
              </div>
              <div className="p-3 bg-white/10 rounded-xl">
                <ShieldCheck className="w-8 h-8 text-[#ED8C32]" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
              <div>
                <p className="text-xs text-white/60 mb-1">{t('membership.memberId')}</p>
                <p className="font-mono font-bold">SK000123</p>
              </div>
              <div>
                <p className="text-xs text-white/60 mb-1">{t('membership.joinDate')}</p>
                <p className="font-medium">October 15, 2023</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions / Info */}
        <div className="space-y-6">
          <Card className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#232F46]">{t('membership.lifetime')}</p>
              <p className="text-xs text-gray-500">{t('membership.noRenewal')}</p>
            </div>
          </Card>

          <Card className="flex items-center gap-4">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-lg shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#232F46]">{t('membership.idReady')}</p>
              <a href="/account/membership-card" className="text-xs text-[#ED8C32] font-semibold hover:underline">{t('membership.download')}</a>
            </div>
          </Card>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-[#232F46]">{t('membership.history')}</h3>
        </div>
        <Table className="border-0 rounded-none shadow-none">
          <TableHeader>
            <TableRow>
              <TableHead>{t('membership.date')}</TableHead>
              <TableHead>{t('membership.event')}</TableHead>
              <TableHead>{t('membership.status')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-gray-600">Oct 16, 2023</TableCell>
              <TableCell className="font-medium text-[#232F46]">{t('membership.verified')}</TableCell>
              <TableCell><StatusBadge status="Active" /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-gray-600">Oct 15, 2023</TableCell>
              <TableCell className="font-medium text-[#232F46]">{t('membership.submitted')}</TableCell>
              <TableCell><StatusBadge status="Pending Verification" /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-gray-600">Oct 15, 2023</TableCell>
              <TableCell className="font-medium text-[#232F46]">{t('membership.registered')}</TableCell>
              <TableCell><StatusBadge status="Pending Approval" /></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
