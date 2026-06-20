import {
  Languages,
  Laptop,
  Shield,
  HeartPulse,
  BookOpen,
  Heart,
  Briefcase,
  Users,
  Banknote,
  GraduationCap,
  LucideIcon,
} from 'lucide-react';

export type BenefitStatus = 'eligible' | 'in-progress' | 'locked';

export interface Benefit {
  id: string;
  titleKey: string;
  descKey: string;
  categoryKey: string;
  unlockDays: number;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  introKey: string;
  eligKeys: string[];
  benKeys: string[];
  docKeys: string[];
  contact: string;
}

export const CATEGORIES = [
  'categories.education',
  'categories.health',
  'categories.family',
  'categories.economic',
] as const;

export const benefitsData: Benefit[] = [
  {
    id: 'digital-bhasha-course',
    titleKey: 'benefits.bhasha.title',
    descKey: 'benefits.bhasha.desc',
    categoryKey: 'categories.education',
    unlockDays: 30,
    icon: Languages,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
    introKey: 'benefits.bhasha.intro',
    eligKeys: ['benefits.bhasha.elig1', 'benefits.bhasha.elig2', 'benefits.bhasha.elig3'],
    benKeys: ['benefits.bhasha.ben1', 'benefits.bhasha.ben2', 'benefits.bhasha.ben3'],
    docKeys: ['benefits.bhasha.doc1', 'benefits.bhasha.doc2', 'benefits.bhasha.doc3'],
    contact: 'helpdesk@shukranakalyan.org | +91-XXXX-XXXXXX',
  },
  {
    id: 'digital-skill-development',
    titleKey: 'benefits.skill.title',
    descKey: 'benefits.skill.desc',
    categoryKey: 'categories.education',
    unlockDays: 60,
    icon: Laptop,
    iconColor: 'text-indigo-600',
    iconBg: 'bg-indigo-50',
    introKey: 'benefits.skill.intro',
    eligKeys: ['benefits.skill.elig1', 'benefits.skill.elig2'],
    benKeys: ['benefits.skill.ben1', 'benefits.skill.ben2', 'benefits.skill.ben3'],
    docKeys: ['benefits.skill.doc1', 'benefits.skill.doc2', 'benefits.skill.doc3'],
    contact: 'training@shukranakalyan.org | +91-XXXX-XXXXXX',
  },
  {
    id: 'durghatna-bima',
    titleKey: 'benefits.bima.title',
    descKey: 'benefits.bima.desc',
    categoryKey: 'categories.health',
    unlockDays: 90,
    icon: Shield,
    iconColor: 'text-red-600',
    iconBg: 'bg-red-50',
    introKey: 'benefits.bima.intro',
    eligKeys: ['benefits.bima.elig1', 'benefits.bima.elig2', 'benefits.bima.elig3'],
    benKeys: ['benefits.bima.ben1', 'benefits.bima.ben2', 'benefits.bima.ben3'],
    docKeys: ['benefits.bima.doc1', 'benefits.bima.doc2', 'benefits.bima.doc3', 'benefits.bima.doc4'],
    contact: 'insurance@shukranakalyan.org | +91-XXXX-XXXXXX',
  },
  {
    id: 'emergency-health',
    titleKey: 'benefits.health.title',
    descKey: 'benefits.health.desc',
    categoryKey: 'categories.health',
    unlockDays: 180,
    icon: HeartPulse,
    iconColor: 'text-pink-600',
    iconBg: 'bg-pink-50',
    introKey: 'benefits.health.intro',
    eligKeys: ['benefits.health.elig1', 'benefits.health.elig2', 'benefits.health.elig3'],
    benKeys: ['benefits.health.ben1', 'benefits.health.ben2', 'benefits.health.ben3'],
    docKeys: ['benefits.health.doc1', 'benefits.health.doc2', 'benefits.health.doc3', 'benefits.health.doc4'],
    contact: 'health@shukranakalyan.org | +91-XXXX-XXXXXX',
  },
  {
    id: 'kanya-shiksha-kit',
    titleKey: 'benefits.kanyaKit.title',
    descKey: 'benefits.kanyaKit.desc',
    categoryKey: 'categories.family',
    unlockDays: 90,
    icon: BookOpen,
    iconColor: 'text-teal-600',
    iconBg: 'bg-teal-50',
    introKey: 'benefits.kanyaKit.intro',
    eligKeys: ['benefits.kanyaKit.elig1', 'benefits.kanyaKit.elig2', 'benefits.kanyaKit.elig3'],
    benKeys: ['benefits.kanyaKit.ben1', 'benefits.kanyaKit.ben2', 'benefits.kanyaKit.ben3'],
    docKeys: ['benefits.kanyaKit.doc1', 'benefits.kanyaKit.doc2', 'benefits.kanyaKit.doc3', 'benefits.kanyaKit.doc4'],
    contact: 'welfare@shukranakalyan.org | +91-XXXX-XXXXXX',
  },
  {
    id: 'kanya-vivah-shagun',
    titleKey: 'benefits.kanyaVivah.title',
    descKey: 'benefits.kanyaVivah.desc',
    categoryKey: 'categories.family',
    unlockDays: 365,
    icon: Heart,
    iconColor: 'text-rose-600',
    iconBg: 'bg-rose-50',
    introKey: 'benefits.kanyaVivah.intro',
    eligKeys: ['benefits.kanyaVivah.elig1', 'benefits.kanyaVivah.elig2', 'benefits.kanyaVivah.elig3'],
    benKeys: ['benefits.kanyaVivah.ben1', 'benefits.kanyaVivah.ben2', 'benefits.kanyaVivah.ben3'],
    docKeys: ['benefits.kanyaVivah.doc1', 'benefits.kanyaVivah.doc2', 'benefits.kanyaVivah.doc3', 'benefits.kanyaVivah.doc4'],
    contact: 'welfare@shukranakalyan.org | +91-XXXX-XXXXXX',
  },
  {
    id: 'rojgar-yojana',
    titleKey: 'benefits.rojgar.title',
    descKey: 'benefits.rojgar.desc',
    categoryKey: 'categories.economic',
    unlockDays: 120,
    icon: Briefcase,
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-50',
    introKey: 'benefits.rojgar.intro',
    eligKeys: ['benefits.rojgar.elig1', 'benefits.rojgar.elig2', 'benefits.rojgar.elig3'],
    benKeys: ['benefits.rojgar.ben1', 'benefits.rojgar.ben2', 'benefits.rojgar.ben3'],
    docKeys: ['benefits.rojgar.doc1', 'benefits.rojgar.doc2', 'benefits.rojgar.doc3', 'benefits.rojgar.doc4'],
    contact: 'employment@shukranakalyan.org | +91-XXXX-XXXXXX',
  },
  {
    id: 'mahila-sashaktikaran',
    titleKey: 'benefits.mahila.title',
    descKey: 'benefits.mahila.desc',
    categoryKey: 'categories.economic',
    unlockDays: 90,
    icon: Users,
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-50',
    introKey: 'benefits.mahila.intro',
    eligKeys: ['benefits.mahila.elig1', 'benefits.mahila.elig2'],
    benKeys: ['benefits.mahila.ben1', 'benefits.mahila.ben2', 'benefits.mahila.ben3'],
    docKeys: ['benefits.mahila.doc1', 'benefits.mahila.doc2', 'benefits.mahila.doc3'],
    contact: 'women@shukranakalyan.org | +91-XXXX-XXXXXX',
  },
  {
    id: 'zero-interest-loan',
    titleKey: 'benefits.loan.title',
    descKey: 'benefits.loan.desc',
    categoryKey: 'categories.economic',
    unlockDays: 365,
    icon: Banknote,
    iconColor: 'text-green-600',
    iconBg: 'bg-green-50',
    introKey: 'benefits.loan.intro',
    eligKeys: ['benefits.loan.elig1', 'benefits.loan.elig2', 'benefits.loan.elig3'],
    benKeys: ['benefits.loan.ben1', 'benefits.loan.ben2', 'benefits.loan.ben3'],
    docKeys: ['benefits.loan.doc1', 'benefits.loan.doc2', 'benefits.loan.doc3', 'benefits.loan.doc4'],
    contact: 'loans@shukranakalyan.org | +91-XXXX-XXXXXX',
  },
  {
    id: 'shikshit-bharat',
    titleKey: 'benefits.shikshit.title',
    descKey: 'benefits.shikshit.desc',
    categoryKey: 'categories.education',
    unlockDays: 180,
    icon: GraduationCap,
    iconColor: 'text-sky-600',
    iconBg: 'bg-sky-50',
    introKey: 'benefits.shikshit.intro',
    eligKeys: ['benefits.shikshit.elig1', 'benefits.shikshit.elig2', 'benefits.shikshit.elig3'],
    benKeys: ['benefits.shikshit.ben1', 'benefits.shikshit.ben2', 'benefits.shikshit.ben3'],
    docKeys: ['benefits.shikshit.doc1', 'benefits.shikshit.doc2', 'benefits.shikshit.doc3', 'benefits.shikshit.doc4'],
    contact: 'education@shukranakalyan.org | +91-XXXX-XXXXXX',
  },
];

// Mock member join date — 148 days ago
export const MEMBER_JOIN_DATE = new Date(Date.now() - 148 * 24 * 60 * 60 * 1000);

export function getMemberDays(): number {
  const diffMs = Date.now() - MEMBER_JOIN_DATE.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

export function getBenefitStatus(unlockDays: number, currentDays: number): BenefitStatus {
  if (currentDays >= unlockDays) return 'eligible';
  if (currentDays > 0) return 'in-progress';
  return 'locked';
}

export function getNextUnlock(currentDays: number): Benefit | null {
  const locked = benefitsData
    .filter((b) => currentDays < b.unlockDays)
    .sort((a, b) => a.unlockDays - b.unlockDays);
  return locked[0] ?? null;
}
