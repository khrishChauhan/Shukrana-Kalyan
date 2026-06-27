import React from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import { mockKycData } from '../../data/mockBusinessData';
import { 
  FileText, CheckCircle, Upload, Camera, CreditCard, 
  MapPin, Landmark, AlertCircle
} from 'lucide-react';

export default function KycCenterPage() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'Under Review': return <AlertCircle className="w-5 h-5 text-[#ED8C32]" />;
      default: return <Upload className="w-5 h-5 text-gray-400" />;
    }
  };

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

      <Card className="bg-[#232F46] text-white p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex-1 w-full">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-bold text-white/80">Overall Progress</span>
              <span className="font-bold">{mockKycData.overallProgress}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div 
                className="bg-[#ED8C32] h-3 rounded-full transition-all duration-1000" 
                style={{ width: `${mockKycData.overallProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-white/60 mt-3">
              {mockKycData.remainingSteps} steps remaining to achieve Full Verification.
            </p>
          </div>
          <div className="shrink-0 text-center sm:text-right border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6 w-full sm:w-auto">
            <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider mb-1">Current Status</p>
            <StatusBadge status={mockKycData.status} />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { key: 'pan', label: 'PAN Card', icon: CreditCard, doc: mockKycData.documents.pan },
          { key: 'aadhaar', label: 'Aadhaar Card', icon: FileText, doc: mockKycData.documents.aadhaar },
          { key: 'bank', label: 'Bank Proof', icon: Landmark, doc: mockKycData.documents.bank },
          { key: 'photo', label: 'Recent Photograph', icon: Camera, doc: mockKycData.documents.photo },
          { key: 'address', label: 'Address Proof', icon: MapPin, doc: mockKycData.documents.address },
        ].map((item, i) => (
          <Card key={i} className="flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  item.doc.status === 'Approved' ? 'bg-green-50' : 
                  item.doc.status === 'Under Review' ? 'bg-orange-50' : 'bg-gray-50'
                }`}>
                  <item.icon className={`w-5 h-5 ${
                    item.doc.status === 'Approved' ? 'text-green-600' : 
                    item.doc.status === 'Under Review' ? 'text-[#ED8C32]' : 'text-gray-400'
                  }`} />
                </div>
                <div>
                  <h4 className="font-bold text-[#232F46]">{item.label}</h4>
                  <p className="text-xs text-gray-500">Uploaded: {item.doc.uploaded}</p>
                </div>
              </div>
              <StatusBadge status={item.doc.status} />
            </div>
            
            <div className="mt-auto pt-4 border-t border-gray-100 flex gap-2">
              {item.doc.status === 'Pending' || item.doc.status === 'Rejected' ? (
                <Button className="w-full bg-[#ED8C32] text-white hover:bg-[#D97A24] gap-2">
                  <Upload className="w-4 h-4" /> Upload Document
                </Button>
              ) : (
                <Button variant="outline" className="w-full gap-2 text-gray-600">
                  <FileText className="w-4 h-4" /> View Document
                </Button>
              )}
            </div>
          </Card>
        ))}
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
