import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import { Skeleton } from '../../components/ui/Skeleton';
import { supabase } from '../../lib/supabase';
import {
  FileText, CheckCircle, Upload, Camera, CreditCard,
  MapPin, Landmark, AlertCircle
} from 'lucide-react';

const STATUS_COLORS: Record<string, string> = {
  'Approved':     'bg-green-50 text-green-600',
  'Under Review': 'bg-orange-50 text-[#ED8C32]',
  'Pending':      'bg-gray-50 text-gray-400',
  'Rejected':     'bg-red-50 text-red-500',
};

const STATUS_ICONS: Record<string, React.ReactNode> = {
  'Approved':     <CheckCircle className="w-5 h-5 text-green-500" />,
  'Under Review': <AlertCircle className="w-5 h-5 text-[#ED8C32]" />,
  'Pending':      <Upload className="w-5 h-5 text-gray-400" />,
  'Rejected':     <AlertCircle className="w-5 h-5 text-red-500" />,
};

const DOC_CONFIGS = [
  { key: 'pan',     label: 'PAN Card',          icon: CreditCard },
  { key: 'aadhaar', label: 'Aadhaar Card',       icon: FileText },
  { key: 'bank',    label: 'Bank Proof',          icon: Landmark },
  { key: 'photo',   label: 'Recent Photograph',   icon: Camera },
  { key: 'address', label: 'Address Proof',       icon: MapPin },
];

export default function KycCenterPage() {
  const [loading, setLoading] = useState(true);
  const [kycData, setKycData] = useState<any>(null);

  useEffect(() => {
    async function fetchKyc() {
      setLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data } = await supabase
          .from('member_profile')
          .select('kyc_details, kyc_status')
          .eq('id', user.id)
          .single();

        // Build a normalized structure whether or not data exists
        const docDefaults = DOC_CONFIGS.reduce((acc, d) => {
          acc[d.key] = { status: 'Pending', uploaded: 'Not uploaded' };
          return acc;
        }, {} as Record<string, any>);

        const docs = { ...docDefaults, ...(data?.kyc_details?.documents || {}) };
        const uploadedCount = Object.values(docs).filter((d: any) => d.status !== 'Pending').length;
        const progress = Math.round((uploadedCount / DOC_CONFIGS.length) * 100);

        setKycData({
          status: data?.kyc_status || 'Pending',
          overallProgress: progress,
          remainingSteps: DOC_CONFIGS.length - uploadedCount,
          documents: docs,
        });
      } catch (e) {
        console.error('Error fetching KYC:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchKyc();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto pb-10 space-y-6"
    >
      <PageHeader
        title="KYC Center"
        description="Complete your Know Your Customer (KYC) verification to enable withdrawals and full portal access."
        breadcrumbs={[{ label: 'Account' }, { label: 'KYC Center' }]}
      />

      {/* Progress Banner */}
      {loading ? (
        <Skeleton className="w-full h-28 rounded-2xl" />
      ) : (
        <Card className="bg-[#232F46] text-white p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex-1 w-full">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-bold text-white/80">Overall Progress</span>
                <span className="font-bold">{kycData.overallProgress}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div
                  className="bg-[#ED8C32] h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${kycData.overallProgress}%` }}
                />
              </div>
              <p className="text-xs text-white/60 mt-3">
                {kycData.remainingSteps} step{kycData.remainingSteps !== 1 ? 's' : ''} remaining to achieve Full Verification.
              </p>
            </div>
            <div className="shrink-0 text-center sm:text-right border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6 w-full sm:w-auto">
              <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider mb-1">Current Status</p>
              <StatusBadge status={kycData.status as any} />
            </div>
          </div>
        </Card>
      )}

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-40 rounded-xl" />)
          : DOC_CONFIGS.map((item) => {
              const doc = kycData?.documents?.[item.key] || { status: 'Pending', uploaded: 'N/A' };
              const colorClass = STATUS_COLORS[doc.status] || STATUS_COLORS['Pending'];
              const StatusIcon = STATUS_ICONS[doc.status] || STATUS_ICONS['Pending'];
              return (
                <Card key={item.key} className="flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${colorClass}`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#232F46]">{item.label}</h4>
                        <p className="text-xs text-gray-500">Uploaded: {doc.uploaded}</p>
                      </div>
                    </div>
                    <StatusBadge status={doc.status as any} />
                  </div>

                  <div className="mt-auto pt-4 border-t border-gray-100 flex gap-2">
                    {doc.status === 'Pending' || doc.status === 'Rejected' ? (
                      <Button className="w-full gap-2" onClick={() => alert('KYC upload — contact admin or use the upload form.')}>
                        <Upload className="w-4 h-4" /> Upload Document
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full gap-2 text-gray-600">
                        <FileText className="w-4 h-4" /> View Document
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
      </div>

      <Card>
        <h3 className="font-bold text-[#232F46] mb-4">Upload Guidelines</h3>
        <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
          <li>Supported formats: JPEG, PNG, PDF. Maximum file size: 5MB per document.</li>
          <li>Ensure all text and photographs in the document are clearly visible and not blurred.</li>
          <li>Bank proof must be a cancelled cheque or a clear photo of the passbook front page displaying the Account Number and IFSC.</li>
          <li>For Aadhaar, please upload a merged PDF or image containing both the Front and Back sides.</li>
        </ul>
      </Card>
    </motion.div>
  );
}
