import React from 'react';
import { Phone } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Benefit, BenefitStatus, getBenefitStatus } from '../../data/benefitsData';
import { useTranslation } from '../../context/LanguageContext';

interface BenefitDetailModalProps {
  benefit: Benefit | null;
  currentDays: number;
  onClose: () => void;
}

function statusVariant(status: BenefitStatus): 'success' | 'warning' | 'gray' {
  if (status === 'eligible') return 'success';
  if (status === 'in-progress') return 'warning';
  return 'gray';
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{title}</h4>
      {children}
    </div>
  );
}

export function BenefitDetailModal({ benefit, currentDays, onClose }: BenefitDetailModalProps) {
  const { t } = useTranslation();
  if (!benefit) return null;

  const status = getBenefitStatus(benefit.unlockDays, currentDays);
  const progressPct = Math.min(100, Math.round((currentDays / benefit.unlockDays) * 100));
  const Icon = benefit.icon;

  const statusLabel = (s: BenefitStatus): string => {
    if (s === 'eligible') return t('status.eligible');
    if (s === 'in-progress') return t('status.inProgress');
    return t('status.locked');
  };

  return (
    <Modal
      isOpen={!!benefit}
      onClose={onClose}
      maxWidth="lg"
      footer={
        <Button variant="outline" onClick={onClose}>
          {t('modal.close')}
        </Button>
      }
    >
      {/* Modal Header — icon, title, badge */}
      <div className="flex items-start gap-4 mb-6 pb-5 border-b border-gray-100">
        <div className={`p-3 rounded-xl ${benefit.iconBg} shrink-0`}>
          <Icon className={`w-6 h-6 ${benefit.iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="text-base font-bold text-[#232F46]">{t(benefit.titleKey)}</h3>
            <Badge variant={statusVariant(status)}>{statusLabel(status)}</Badge>
          </div>
          {/* Inline progress bar */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  status === 'eligible' ? 'bg-green-500' : 'bg-[#ED8C32]'
                }`}
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="text-[11px] text-gray-500 whitespace-nowrap">
              {currentDays} / {benefit.unlockDays} {t('journey.days')}
            </span>
          </div>
        </div>
      </div>

      {/* 1. योजना का परिचय */}
      <Section title={t('modal.intro')}>
        <p className="text-sm text-gray-600 leading-relaxed">{t(benefit.introKey)}</p>
      </Section>

      {/* 2. पात्रता */}
      <Section title={t('modal.eligibility')}>
        <ul className="space-y-1.5">
          {benefit.eligKeys.map((key, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-[#ED8C32] shrink-0" />
              {t(key)}
            </li>
          ))}
        </ul>
      </Section>

      {/* 3. लाभ */}
      <Section title={t('modal.benefits')}>
        <ul className="space-y-1.5">
          {benefit.benKeys.map((key, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="text-green-500 shrink-0">✓</span>
              {t(key)}
            </li>
          ))}
        </ul>
      </Section>

      {/* 4. आवश्यक दस्तावेज */}
      <Section title={t('modal.documents')}>
        <ul className="space-y-1.5">
          {benefit.docKeys.map((key, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-gray-600 bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg"
            >
              <span className="text-[#232F46] shrink-0">📄</span>
              {t(key)}
            </li>
          ))}
        </ul>
      </Section>

      {/* 5. संपर्क करें */}
      <Section title={t('modal.contact')}>
        <div className="flex items-center gap-2 p-3 bg-orange-50 border border-orange-100 rounded-lg text-sm text-[#232F46]">
          <Phone className="w-4 h-4 text-[#ED8C32] shrink-0" />
          <span>{benefit.contact}</span>
        </div>
      </Section>
    </Modal>
  );
}
