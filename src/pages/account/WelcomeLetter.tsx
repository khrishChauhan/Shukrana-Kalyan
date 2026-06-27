import React from 'react';
import { motion } from 'motion/react';
import { Download, Printer, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { PageHeader } from '../../components/ui/PageHeader';

const MEMBER = {
  name: 'John Doe',
  id: 'SK00001',
  joined: '01 June 2026',
  address: '123, Green Colony, Mumbai, Maharashtra - 400001',
};

const BENEFITS = [
  'Access to all foundation welfare programs and assistance initiatives.',
  'Monthly newsletter, updates, and community announcements.',
  'Emergency welfare assistance for eligible members.',
];

export default function WelcomeLetter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="max-w-4xl mx-auto pb-10"
    >
      <div className="print:hidden">
        <PageHeader
          title="Welcome Letter"
          description="Official welcome letter from Shukrana Kalyan Sangh Foundation."
          breadcrumbs={[{ label: 'My Account' }, { label: 'Welcome Letter' }]}
        />
      </div>

      {/* Document */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden print:shadow-none print:border-gray-300">

        {/* Header */}
        <div className="bg-[#232F46] px-8 py-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#ED8C32] flex items-center justify-center font-bold text-white text-lg shrink-0">
              S
            </div>
            <div>
              <p className="text-sm font-bold text-white tracking-widest uppercase">Shukrana Kalyan Sangh</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">Foundation</p>
            </div>
          </div>
          <span className="font-mono text-xs text-gray-300">Ref: {MEMBER.id}</span>
        </div>

        {/* Orange Rule */}
        <div className="h-1 bg-[#ED8C32]" />

        {/* Body */}
        <div className="px-8 py-10 md:px-12 md:py-14 space-y-8 text-[#232F46] leading-relaxed max-w-3xl mx-auto">
          
          {/* Date */}
          <p className="text-right text-sm text-gray-500 font-medium">Date: {MEMBER.joined}</p>

          {/* Addressee */}
          <div className="space-y-1 text-gray-700">
            <p className="font-bold text-[#232F46]">To,</p>
            <p className="font-bold text-[#232F46]">{MEMBER.name}</p>
            <p className="max-w-xs leading-snug">{MEMBER.address}</p>
          </div>

          {/* Subject */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg px-5 py-4">
            <p className="font-bold text-[#232F46]">
              Subject: <span className="text-[#ED8C32]">Welcome to Shukrana Kalyan Sangh Foundation</span>
            </p>
          </div>

          {/* Salutation */}
          <p className="font-bold text-lg">Dear {MEMBER.name},</p>

          {/* Paragraphs */}
          <div className="space-y-4 text-gray-700">
            <p>
              We are delighted to welcome you as an official member of <strong className="text-[#232F46]">Shukrana Kalyan Sangh Foundation</strong>. Your membership is now active, and we are excited to embark on this journey of community empowerment and welfare together.
            </p>
            <p>
              The foundation is committed to driving positive change through welfare programs, social support, and development initiatives. Your association strengthens our mission to make a lasting impact in the lives of those we serve.
            </p>
          </div>

          {/* Benefits */}
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-6 space-y-4">
            <p className="text-xs font-bold text-[#232F46] uppercase tracking-wider">As a member, you are entitled to:</p>
            <ul className="space-y-3">
              {BENEFITS.map(b => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#ED8C32] shrink-0 mt-0.5" />
                  <span className="text-gray-700">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Signature Block */}
          <div className="pt-8 border-t border-gray-100">
            <p className="text-gray-600">Warm regards,</p>
            <div className="mt-12">
              <p className="font-bold text-[#232F46] text-lg">The Secretary</p>
              <p className="text-sm text-gray-500 mt-0.5">Shukrana Kalyan Sangh Foundation</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-100 px-8 py-4 flex items-center justify-between text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
          <span>Shukrana Kalyan Sangh | Member Portal</span>
          <span className="hidden sm:inline">Ref: {MEMBER.id}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 print:hidden">
        <Button
          type="button"
          onClick={() => window.print()}
          variant="outline"
          leftIcon={<Printer className="w-4 h-4" />}
        >
          Print Letter
        </Button>
        <Button
          type="button"
          leftIcon={<Download className="w-4 h-4" />}
        >
          Download PDF
        </Button>
      </div>
    </motion.div>
  );
}
