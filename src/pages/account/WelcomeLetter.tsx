/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, Download, Printer } from 'lucide-react';

const MEMBER = {
  name: 'John Doe',
  id: 'SKS-447036',
  joined: '01 June 2026',
  address: '123, Green Colony, Mumbai, Maharashtra - 400001',
};

const BENEFITS = [
  'Access to foundation programs',
  'Monthly newsletter and updates',
  'Emergency welfare assistance',
];

export default function WelcomeLetter() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="max-w-[1200px] mx-auto px-4 py-2"
    >
      {/* Page Header / Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 mb-5 uppercase tracking-wider">
        <Link to="/dashboard" className="hover:text-brand-primary transition-colors">Dashboard</Link>
        <ChevronRight size={12} />
        <span>My Account</span>
        <ChevronRight size={12} />
        <span className="text-brand-primary">Welcome Letter</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-brand-accent tracking-tight m-0">WELCOME LETTER</h1>
        <p className="text-sm text-gray-500 mt-1.5">Official welcome letter from Shukrana Kalyan Sangh Foundation.</p>
      </div>

      {/* CenteredA4Wrapper (Max-width: 800px) */}
      <div className="max-w-[800px] mx-auto flex flex-col gap-6 items-center">
        
        {/* LetterDocumentContainer (Flat white, 1px border) */}
        <div className="w-full bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex flex-col print:border-none print:shadow-none">
          
          {/* LetterHeader (Dark Blue) */}
          <div className="bg-[#232F46] px-8 py-6 text-white flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded bg-[#ED8C32] flex items-center justify-center font-extrabold text-white text-lg">
                S
              </div>
              <div>
                <p className="font-extrabold tracking-wider text-sm m-0">SHUKRANA KALYAN SANGH</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest m-0 mt-0.5">Foundation</p>
              </div>
            </div>
            
            <span className="font-mono text-xs text-gray-300">
              Ref: {MEMBER.id}
            </span>
          </div>

          {/* LetterDivider (Orange) */}
          <div className="h-1 bg-[#ED8C32]"></div>

          {/* LetterBody (White) */}
          <div className="p-8 md:p-10 flex flex-col gap-6 text-[#232F46] text-sm leading-relaxed">
            
            {/* Date */}
            <p className="text-right text-xs font-semibold text-gray-500 m-0">
              Date: {MEMBER.joined}
            </p>

            {/* MemberAddressBlock */}
            <div className="flex flex-col gap-0.5 font-medium text-gray-600">
              <p className="font-bold text-[#232F46]">To,</p>
              <p className="font-bold text-[#232F46]">{MEMBER.name}</p>
              <p>{MEMBER.address.split(',')[0]}, {MEMBER.address.split(',')[1]}, {MEMBER.address.split(',')[2]}</p>
            </div>

            {/* SubjectBox (Light Orange Bg, Dark Orange Border) */}
            <div className="bg-[#FFF8F2] border border-[#ED8C32]/45 rounded-lg px-4 py-3">
              <p className="font-bold text-[#232F46] m-0">
                Subject: <span className="text-brand-primary">Welcome to Shukrana Kalyan Sangh Foundation</span>
              </p>
            </div>

            {/* Salutation */}
            <p className="font-bold text-base m-0">
              Dear {MEMBER.name},
            </p>

            {/* WelcomeParagraphs */}
            <div className="flex flex-col gap-4 text-gray-650 font-normal">
              <p className="m-0">
                We are delighted to welcome you as an official member of <strong className="font-bold text-[#232F46]">Shukrana Kalyan Sangh Foundation</strong>. Your membership is now active, and we are excited to embark on this journey of community empowerment and welfare together.
              </p>
              <p className="m-0">
                The foundation is committed to driving positive change through welfare programs, social support, and development initiatives. Your association strengthens our mission to make a lasting impact in the lives of those we serve.
              </p>
            </div>

            {/* BenefitsList (Custom Check Icons) */}
            <div className="flex flex-col gap-3 my-2 bg-gray-50 border border-gray-100 rounded-lg p-5">
              <p className="font-bold text-[#232F46] text-xs uppercase tracking-wider m-0 mb-1">
                As a member, you are entitled to:
              </p>
              <ul className="flex flex-col gap-2.5 m-0 p-0 list-none">
                {BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2.5 font-semibold text-sm">
                    <span className="text-brand-primary select-none text-base leading-none">[✓]</span>
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Closing & Signature Block */}
            <div className="flex justify-between items-end mt-4 pt-4 border-t border-gray-100">
              <div className="flex flex-col gap-1 text-gray-600 font-medium">
                <p className="m-0">Warm regards,</p>
                <div className="mt-4">
                  <p className="font-bold text-[#232F46] m-0">The Secretary</p>
                  <p className="text-xs text-gray-400 m-0">Shukrana Kalyan Sangh Foundation</p>
                </div>
              </div>

              {/* Signature NGO Seal */}
              <div className="flex items-center justify-center w-20 h-20 rounded-full border border-dashed border-[#232F46] text-[#232F46] flex-shrink-0 text-center p-2 opacity-80 select-none">
                <div className="flex flex-col items-center justify-center gap-0.5">
                  <span className="text-[7px] font-extrabold uppercase tracking-wider">FOUNDATION</span>
                  <span className="text-[10px] font-extrabold tracking-widest border-y border-[#232F46] py-0.5 px-1">SEAL</span>
                  <span className="text-[6px] font-bold">SKS NGO</span>
                </div>
              </div>
            </div>

          </div>

          {/* LetterFooter (Light Gray Band) */}
          <div className="bg-gray-50 border-t border-gray-100 px-8 py-4 flex justify-between items-center text-[11px] font-bold text-gray-400 font-mono tracking-wider uppercase">
            <span>Shukrana Kalyan Sangh | Member Portal</span>
            <span className="hidden sm:inline">Ref: {MEMBER.id}</span>
          </div>

        </div>

        {/* ActionRow (Download, Print) */}
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center max-w-[800px] print:hidden">
          <button
            type="button"
            className="flex-1 px-5 py-2.5 rounded-lg bg-[#232F46] text-white hover:bg-[#1a2334] text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors border-none shadow-sm"
          >
            <Download size={16} />
            <span>Download PDF</span>
          </button>
          
          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 px-5 py-2.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-755 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Printer size={16} />
            <span>Print Letter</span>
          </button>
        </div>

      </div>
    </motion.div>
  );
}
