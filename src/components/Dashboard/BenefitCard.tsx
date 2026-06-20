import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Benefit, BenefitStatus, getBenefitStatus } from '../../data/benefitsData';
import { useTranslation } from '../../context/LanguageContext';

interface BenefitCardProps {
  benefit: Benefit;
  currentDays: number;
  onClick: (benefit: Benefit) => void;
}

export function BenefitCard({ benefit, currentDays, onClick }: BenefitCardProps) {
  const { t } = useTranslation();
  const status = getBenefitStatus(benefit.unlockDays, currentDays);
  const progressPct = Math.min(100, Math.round((currentDays / benefit.unlockDays) * 100));
  const Icon = benefit.icon;

  const statusVariant = (s: BenefitStatus): 'success' | 'warning' | 'gray' => {
    if (s === 'eligible') return 'success';
    if (s === 'in-progress') return 'warning';
    return 'gray';
  };

  const getStatusLabel = (s: BenefitStatus) => {
    if (s === 'eligible') return t('status.eligible');
    if (s === 'in-progress') return t('status.inProgress');
    return t('status.locked');
  };

  return (
    <button
      type="button"
      onClick={() => onClick(benefit)}
      className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ED8C32] rounded-xl"
    >
      {/* Equal-height via flex flex-col h-full */}
      <Card className="flex flex-col h-full hover:border-[#ED8C32] hover:shadow-sm transition-all duration-200 cursor-pointer p-4">
        {/* Icon + Badge row */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className={`p-2.5 rounded-lg ${benefit.iconBg} shrink-0`}>
            <Icon className={`w-5 h-5 ${benefit.iconColor}`} />
          </div>
          <Badge variant={statusVariant(status)} className="shrink-0 text-[10px]">
            {getStatusLabel(status)}
          </Badge>
        </div>

        {/* Title + Description — flex-1 to push footer down */}
        <div className="flex-1">
          <h4 className="text-sm font-bold text-[#232F46] leading-snug mb-1">{t(benefit.titleKey)}</h4>
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{t(benefit.descKey)}</p>
        </div>

        {/* Progress bar footer — always at bottom */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-medium text-gray-500">
              {currentDays} / {benefit.unlockDays} {t('journey.days')}
            </span>
            <span className="text-[10px] font-semibold text-[#ED8C32]">{progressPct}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                status === 'eligible' ? 'bg-green-500' : 'bg-[#ED8C32]'
              }`}
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </Card>
    </button>
  );
}
