import React from 'react';
import { motion } from 'motion/react';
import { Download, Printer, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/ui/Button';

/**
 * ConsentLetterPage
 * Displays the legacy consent letter with exact original wording.
 * Only the layout, typography, and spacing have been modernised.
 * The legal text must not be changed.
 */
export default function ConsentLetterPage() {
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
        <h1 className="text-2xl font-bold text-[#232F46]">Consent Letter</h1>
        <p className="text-sm text-gray-500 mt-1">Official consent document for Shukrana Kalyan Sangh Foundation membership.</p>
      </div>

      {/* A4 Document Preview */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden print:shadow-none print:border-gray-300">

        {/* Document Header */}
        <div className="bg-[#232F46] px-8 py-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#ED8C32] flex items-center justify-center font-bold text-white text-lg shrink-0">
              S
            </div>
            <div>
              <p className="text-sm font-bold text-white tracking-widest uppercase">Shukrana Kalyan Sangh</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">Foundation — Consent Letter</p>
            </div>
          </div>
        </div>

        {/* Orange Accent Rule */}
        <div className="h-1 bg-[#ED8C32]" />

        {/* Document Body — Original Text Preserved Verbatim */}
        <div className="px-8 py-8 md:px-12 md:py-10 space-y-5 text-sm text-[#232F46] leading-7">

          <h2 className="text-base font-bold text-center text-[#232F46] uppercase tracking-wider">
            Consent and Declaration Form
          </h2>
          <h3 className="text-sm font-bold text-center text-gray-500">
            Shukrana Kalyan Sangh Foundation — Membership Consent
          </h3>

          <p className="text-gray-600">
            I, the undersigned, hereby declare and confirm that I am voluntarily applying for membership with Shukrana Kalyan Sangh Foundation. I understand and agree to the terms, conditions, and rules of the foundation as communicated to me at the time of registration.
          </p>

          <p className="text-gray-600">
            I confirm that all information provided by me during the registration process is true, accurate, and complete to the best of my knowledge. I understand that any misrepresentation or falsification of information may result in immediate cancellation of my membership without any refund or claim.
          </p>

          <p className="text-gray-600">
            I voluntarily consent to the collection, storage, and use of my personal information, including but not limited to my name, contact details, photograph, and identity documents, for the purpose of membership administration, communication, and welfare activities conducted by Shukrana Kalyan Sangh Foundation.
          </p>

          <p className="text-gray-600">
            I understand that the foundation operates on a welfare and community support model. I acknowledge that any benefits, assistance, or programs I may receive as a member are subject to eligibility criteria, availability, and the discretion of the foundation's management committee.
          </p>

          <p className="text-gray-600">
            I agree to abide by the code of conduct set by Shukrana Kalyan Sangh Foundation. I will not engage in any activity that may bring disrepute to the foundation, its members, or its mission. I will report any concerns or grievances through proper channels as defined by the foundation.
          </p>

          <p className="text-gray-600">
            I understand and accept that the foundation reserves the right to suspend or terminate my membership at any time if I am found to be in violation of the foundation's rules, code of conduct, or applicable laws.
          </p>

          <p className="text-gray-600">
            I have read, understood, and agree to all the terms stated above. I provide this consent freely, without any coercion or undue influence, and acknowledge that this consent is binding upon me as long as I remain a member of Shukrana Kalyan Sangh Foundation.
          </p>

          {/* Signature Block */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-8 border-t border-gray-100 mt-6">
            <div className="space-y-1">
              <div className="h-10 border-b border-dashed border-gray-300" />
              <p className="text-xs text-gray-400 font-medium">Member Signature</p>
              <p className="text-xs text-gray-400">Date: _______________</p>
            </div>
            <div className="space-y-1">
              <div className="h-10 border-b border-dashed border-gray-300" />
              <p className="text-xs text-gray-400 font-medium">Witness Signature</p>
              <p className="text-xs text-gray-400">Date: _______________</p>
            </div>
          </div>

          {/* Place of Execution */}
          <p className="text-xs text-gray-400 pt-2">
            Place of Execution: ___________________________________
          </p>
        </div>

        {/* Document Footer */}
        <div className="bg-gray-50 border-t border-gray-100 px-8 py-3 flex items-center justify-between text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
          <span>Shukrana Kalyan Sangh | Consent Document</span>
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
