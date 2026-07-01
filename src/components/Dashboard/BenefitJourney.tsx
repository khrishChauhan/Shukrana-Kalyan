import React, { useState, useEffect } from 'react';
import { Zap, Clock } from 'lucide-react';
import { Card } from '../ui/Card';
import { Benefit, getNextUnlock } from '../../data/benefitsData';
import { useTranslation } from '../../context/LanguageContext';

interface BenefitJourneyProps {
  createdAt: string;
}

export function BenefitJourney({ createdAt }: BenefitJourneyProps) {
  const { t } = useTranslation();
  
  const [currentDays, setCurrentDays] = useState(0);
  const [timeLeftString, setTimeLeftString] = useState('');
  
  const totalDays = 100;

  useEffect(() => {
    if (!createdAt) return;
    
    const calculateTime = () => {
      const start = new Date(createdAt).getTime();
      const now = new Date().getTime();
      const elapsed = Math.max(0, now - start);
      
      setCurrentDays(Math.floor(elapsed / (1000 * 60 * 60 * 24)));

      const target = start + (totalDays * 24 * 60 * 60 * 1000);
      const diff = Math.max(0, target - now);

      if (diff === 0) {
        setTimeLeftString('Journey Completed!');
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeftString(`${d} Day${d !== 1 ? 's' : ''}, ${h} Hour${h !== 1 ? 's' : ''}, ${m} Minute${m !== 1 ? 's' : ''}, ${s} Second${s !== 1 ? 's' : ''} left`);
    };

    calculateTime(); // initial run
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [createdAt]);

  const nextUnlock: Benefit | null = getNextUnlock(currentDays);
  const journeyPct = Math.min(100, Math.round((currentDays / totalDays) * 100));

  // Days remaining to next unlock
  const daysToNext = nextUnlock ? nextUnlock.unlockDays - currentDays : 0;
  const NextIcon = nextUnlock?.icon ?? null;

  return (
    <Card className="border border-gray-200 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div>
          <h3 className="text-base font-bold text-[#232F46]">{t('journey.title')}</h3>
          <p className="text-sm text-gray-500 mt-0.5">
            {t('journey.subtitlePart1')} <span className="font-semibold text-[#ED8C32]">{currentDays} {t('journey.days')}</span> {t('journey.subtitlePart2')}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center gap-2 bg-[#232F46] text-white px-3 py-2 rounded-lg shrink-0 shadow-inner">
            <Clock className="w-4 h-4 text-[#ED8C32]" />
            <span className="text-xs font-mono font-bold tracking-wide">{timeLeftString}</span>
          </div>
          <div className="flex items-center gap-2 bg-orange-50 border border-orange-100 px-3 py-2 rounded-lg shrink-0">
            <Zap className="w-4 h-4 text-[#ED8C32]" />
            <span className="text-xs font-semibold text-[#ED8C32]">{currentDays} / {totalDays} {t('journey.days')}</span>
          </div>
        </div>
      </div>

      {/* Main journey progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-400 mb-1.5">
          <span>{t('journey.start')}</span>
          <span>{journeyPct}{t('journey.complete')}</span>
          <span>100 Days</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-[#ED8C32] rounded-full transition-all duration-700"
            style={{ width: `${journeyPct}%` }}
          />
        </div>
      </div>

      {/* Next unlock preview */}
      {nextUnlock && NextIcon && (
        <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-xl mt-2">
          <div className={`p-2 rounded-lg ${nextUnlock.iconBg} shrink-0`}>
            <NextIcon className={`w-4 h-4 ${nextUnlock.iconColor}`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-0.5">{t('journey.nextUnlock')}</p>
            <p className="text-sm font-bold text-[#232F46] truncate">{t(nextUnlock.titleKey)}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-lg font-bold text-[#ED8C32]">{daysToNext}</p>
            <p className="text-[10px] text-gray-400 leading-none">{t('journey.daysLeft')}</p>
          </div>
        </div>
      )}

      {!nextUnlock && (
        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl mt-2">
          <span className="text-lg">🎉</span>
          <p className="text-sm font-semibold text-green-700">
            {t('journey.congrats')}
          </p>
        </div>
      )}
    </Card>
  );
}
