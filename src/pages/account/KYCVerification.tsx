import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, FileText, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { PageHeader } from '../../components/ui/PageHeader';

type KYCStatus = 'Not Started' | 'Pending Review' | 'Verified';

// Hardcoded mock state — will be driven by API in future phases
const CURRENT_STATUS: KYCStatus = 'Not Started';

const STATUS_CONFIG: Record<KYCStatus, {
  icon: React.ElementType;
  iconColor: string;
  bgColor: string;
  badge: string;
  badgeColor: string;
  title: string;
  message: string;
}> = {
  'Not Started': {
    icon: FileText,
    iconColor: 'text-gray-400',
    bgColor: 'bg-gray-50',
    badge: 'Not Started',
    badgeColor: 'bg-gray-100 text-gray-500',
    title: 'KYC Not Started',
    message: 'Your identity has not been verified yet. Please contact the admin or visit the nearest branch to begin the KYC process.',
  },
  'Pending Review': {
    icon: Clock,
    iconColor: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    badge: 'Pending Review',
    badgeColor: 'bg-yellow-100 text-yellow-700',
    title: 'Verification in Progress',
    message: 'Your KYC documents have been received and are currently under review by our compliance team. This usually takes 1–2 business days.',
  },
  'Verified': {
    icon: CheckCircle2,
    iconColor: 'text-green-500',
    bgColor: 'bg-green-50',
    badge: 'Verified',
    badgeColor: 'bg-green-100 text-green-700',
    title: 'KYC Verified',
    message: 'Your identity has been successfully verified. You have full access to all foundation welfare programs and assistance initiatives.',
  },
};

const config = STATUS_CONFIG[CURRENT_STATUS];
const StatusIcon = config.icon;

export default function KYCVerification() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="max-w-2xl mx-auto"
    >
      <PageHeader
        title="KYC Verification"
        description="Your identity verification status with Shukrana Kalyan Sangh Foundation."
        breadcrumbs={[{ label: 'My Account' }, { label: 'KYC Verification' }]}
      />

      {/* Status Card */}
      <Card className="text-center py-10 px-8">
        <div className={`w-20 h-20 ${config.bgColor} rounded-full flex items-center justify-center mx-auto mb-5`}>
          <StatusIcon className={`w-9 h-9 ${config.iconColor}`} />
        </div>

        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${config.badgeColor}`}>
          {config.badge}
        </span>

        <h2 className="text-xl font-bold text-[#232F46] mb-3">{config.title}</h2>
        <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">{config.message}</p>
      </Card>

      {/* Info Block */}
      <div className="mt-4 flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl">
        <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <div className="text-sm text-blue-700 leading-relaxed">
          <strong>Why is KYC required?</strong> To comply with NGO regulations and ensure that welfare programs and financial assistance reach authenticated members, a one-time identity verification is required.
          <p className="mt-2 font-medium">To update your KYC status, please contact your area coordinator or the foundation office directly.</p>
        </div>
      </div>
    </motion.div>
  );
}
