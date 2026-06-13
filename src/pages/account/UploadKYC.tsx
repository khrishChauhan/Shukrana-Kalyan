/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ShieldCheck, UploadCloud, X, ChevronRight } from 'lucide-react';

type KYCStatus = 'Approved' | 'Pending' | 'Not Uploaded';

interface UploadZoneProps {
  label?: string;
  file: File | null;
  setFile: (file: File | null) => void;
}

const StatusBadge = ({ status }: { status: KYCStatus }) => {
  const styles: Record<KYCStatus, string> = {
    Approved: 'bg-emerald-50 border border-emerald-200 text-emerald-700',
    Pending: 'bg-brand-primary/10 border border-brand-primary/30 text-amber-700',
    'Not Uploaded': 'bg-brand-gray border border-brand-gray/80 text-brand-gray0'
  };
  return <span className={`${styles[status]} text-[10px] font-mono font-black px-2.5 py-1 rounded-lg uppercase tracking-wider`}>{status}</span>;
};

const UploadZone = ({ label, file, setFile }: UploadZoneProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  return (
    <div className="mb-3">
      {label && <p className="text-xs font-bold text-brand-charcoal/70 uppercase tracking-wider mb-1.5">{label}</p>}
      {file ? (
        <div className="border border-brand-gray/80 rounded-xl p-3 flex items-center justify-between bg-brand-gray/50">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-7 h-7 bg-brand-primary/10 text-brand-primary rounded-lg flex items-center justify-center shrink-0">
              <UploadCloud size={14} />
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-brand-charcoal truncate">{file.name}</p>
              <p className="text-[10px] text-brand-gray0">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
          <button type="button" onClick={() => setFile(null)} className="p-1.5 text-brand-gray0 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0">
            <X size={14} />
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-brand-gray/80 rounded-xl p-5 text-center cursor-pointer hover:border-brand-primary hover:bg-brand-primary/5 transition-colors"
        >
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/png, image/jpeg, application/pdf" />
          <div className="w-8 h-8 bg-brand-gray rounded-full flex items-center justify-center mx-auto mb-2">
            <UploadCloud size={16} className="text-brand-gray0" />
          </div>
          <p className="text-xs font-bold text-brand-charcoal mb-0.5">Click to upload or drag & drop</p>
          <p className="text-[10px] text-brand-gray0">PNG, JPG, PDF up to 5MB</p>
        </div>
      )}
    </div>
  );
};

export default function UploadKYC() {
  const [aadhaarFront, setAadhaarFront] = useState<File | null>(null);
  const [aadhaarBack, setAadhaarBack] = useState<File | null>(null);
  const [panCard, setPanCard] = useState<File | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [addressProof, setAddressProof] = useState<File | null>(null);

  const documents: { title: string; status: KYCStatus; content: React.ReactNode }[] = [
    {
      title: 'Aadhaar Card', status: 'Approved',
      content: (
        <>
          <UploadZone label="Front Side" file={aadhaarFront} setFile={setAadhaarFront} />
          <UploadZone label="Back Side" file={aadhaarBack} setFile={setAadhaarBack} />
        </>
      )
    },
    {
      title: 'PAN Card', status: 'Pending',
      content: <UploadZone file={panCard} setFile={setPanCard} />
    },
    {
      title: 'Profile Photograph', status: 'Pending',
      content: <UploadZone file={profilePhoto} setFile={setProfilePhoto} />
    },
    {
      title: 'Address Proof', status: 'Not Uploaded',
      content: <UploadZone file={addressProof} setFile={setAddressProof} />
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-mono font-bold text-brand-charcoal/60 select-none">
        <Link to="/dashboard" className="hover:text-brand-light0 transition-colors uppercase tracking-wider">Dashboard</Link>
        <ChevronRight className="h-3 w-3 text-slate-300" />
        <span className="text-brand-charcoal/60 uppercase tracking-wider">Account</span>
        <ChevronRight className="h-3 w-3 text-slate-300" />
        <span className="text-brand-light0 uppercase tracking-wider">Upload KYC</span>
      </nav>

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-charcoal tracking-tight font-display">KYC Verification Center</h1>
        <p className="text-xs text-brand-gray0 mt-1">Upload and verify your documents securely.</p>
      </div>

      {/* Progress Card */}
      <div className="bg-white rounded-2xl border border-slate-150 shadow-brand p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-brand-charcoal font-display">KYC Completion</h3>
              <p className="text-[10px] text-brand-gray0 font-mono">3 of 4 documents verified</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-brand-charcoal font-display">75%</span>
            <span className="text-xs text-brand-gray0 ml-1">Completed</span>
          </div>
        </div>
        <div className="w-full h-2 bg-brand-gray rounded-full overflow-hidden">
          <div className="h-full bg-brand-primary rounded-full transition-all duration-1000" style={{ width: '75%' }}></div>
        </div>
      </div>

      {/* Document Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {documents.map((doc) => (
          <div key={doc.title} className="bg-white rounded-2xl border border-slate-150 shadow-brand p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-extrabold text-brand-charcoal">{doc.title}</h4>
              <StatusBadge status={doc.status} />
            </div>
            {doc.content}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3">
        <button type="button" className="px-5 py-2.5 border border-brand-gray/80 text-brand-charcoal rounded-xl text-sm font-bold hover:bg-brand-gray transition-colors">
          Save Draft
        </button>
        <button type="button" className="px-5 py-2.5 bg-brand-primary text-brand-charcoal rounded-xl text-sm font-black hover:bg-brand-light0 transition-colors shadow-brand">
          Submit For Verification
        </button>
      </div>
    </motion.div>
  );
}
