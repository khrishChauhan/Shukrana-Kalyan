import React from 'react';
import { motion } from 'motion/react';
import { Download, Printer, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';

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
      className="max-w-3xl mx-auto px-4 py-2"
    >
      {/* Page Title */}
      <div className="mb-8">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">My Account</p>
        <h1 className="text-2xl font-bold text-[#232F46]">Welcome Letter</h1>
        <p className="text-sm text-gray-500 mt-1">Official welcome letter from Shukrana Kalyan Sangh Foundation.</p>
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
        <div className="px-8 py-8 md:px-12 md:py-10 space-y-6 text-sm text-[#232F46] leading-relaxed">
          
          {/* Date */}
          <p className="text-right text-xs text-gray-400 font-medium">Date: {MEMBER.joined}</p>

          {/* Addressee */}
          <div className="space-y-0.5 text-gray-600">
            <p className="font-bold text-[#232F46]">To,</p>
            <p className="font-bold text-[#232F46]">{MEMBER.name}</p>
            <p>{MEMBER.address}</p>
          </div>

          {/* Subject */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg px-4 py-3">
            <p className="font-bold text-[#232F46]">
              Subject: <span className="text-[#ED8C32]">Welcome to Shukrana Kalyan Sangh Foundation</span>
            </p>
          </div>

          {/* Salutation */}
          <p className="font-bold text-base">Dear {MEMBER.name},</p>

          {/* Paragraphs */}
          <p className="text-gray-600">
            We are delighted to welcome you as an official member of <strong className="text-[#232F46]">Shukrana Kalyan Sangh Foundation</strong>. Your membership is now active, and we are excited to embark on this journey of community empowerment and welfare together.
          </p>
          <p className="text-gray-600">
            The foundation is committed to driving positive change through welfare programs, social support, and development initiatives. Your association strengthens our mission to make a lasting impact in the lives of those we serve.
          </p>

          {/* Benefits */}
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-5 py-5 space-y-3">
            <p className="text-xs font-bold text-[#232F46] uppercase tracking-wider">As a member, you are entitled to:</p>
            <ul className="space-y-2.5">
              {BENEFITS.map(b => (
                <li key={b} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#ED8C32] shrink-0 mt-0.5" />
                  <span className="text-gray-600">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Signature Block */}
          <div className="pt-4 border-t border-gray-100">
            <p className="text-gray-500">Warm regards,</p>
            <div className="mt-8">
              <p className="font-bold text-[#232F46]">The Secretary</p>
              <p className="text-xs text-gray-400 mt-0.5">Shukrana Kalyan Sangh Foundation</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-100 px-8 py-3 flex items-center justify-between text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
          <span>Shukrana Kalyan Sangh | Member Portal</span>
          <span className="hidden sm:inline">Ref: {MEMBER.id}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6 print:hidden">
        <Button
          type="button"
          variant="secondary"
          className="flex-1"
          leftIcon={<Download className="w-4 h-4" />}
        >
          Download PDF
        </Button>
        <Button
          type="button"
          onClick={() => window.print()}
          variant="outline"
          className="flex-1"
          leftIcon={<Printer className="w-4 h-4" />}
        >
          Print Letter
        </Button>
      </div>
    </motion.div>
  );
}
