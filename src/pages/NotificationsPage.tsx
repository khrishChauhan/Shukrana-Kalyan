import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { CheckCircle2, AlertCircle, Info, Gift } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

export default function NotificationsPage() {
  const { t } = useTranslation();

  const notifications = [
    {
      id: 1,
      type: 'success',
      title: t('notifications.paymentApproved'),
      message: t('notifications.paymentMsg'),
      time: `2 ${t('timeline.hoursAgo')}`,
      icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
      bg: 'bg-green-50',
    },
    {
      id: 2,
      type: 'info',
      title: t('notifications.welcomeLetter'),
      message: t('notifications.welcomeMsg'),
      time: `2 ${t('timeline.hoursAgo')}`,
      icon: <Info className="w-5 h-5 text-blue-500" />,
      bg: 'bg-blue-50',
    },
    {
      id: 3,
      type: 'warning',
      title: t('notifications.kycPending'),
      message: t('notifications.kycMsg'),
      time: `1 ${t('timeline.dayAgo')}`,
      icon: <AlertCircle className="w-5 h-5 text-yellow-500" />,
      bg: 'bg-yellow-50',
    },
    {
      id: 4,
      type: 'reward',
      title: t('notifications.referralReward'),
      message: t('notifications.referralMsg'),
      time: `3 ${t('timeline.daysAgo')}`,
      icon: <Gift className="w-5 h-5 text-[#ED8C32]" />,
      bg: 'bg-orange-50',
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title={t('notifications.title')}
        description={t('notifications.desc')}
      />

      <Card className="p-0 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {notifications.map(n => (
            <div key={n.id} className="p-4 sm:p-6 hover:bg-gray-50/50 transition-colors flex gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${n.bg}`}>
                {n.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-[#232F46] text-sm">{n.title}</h4>
                  <span className="text-xs text-gray-400 whitespace-nowrap ml-4">{n.time}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{n.message}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
