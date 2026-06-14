/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, Download, Printer } from 'lucide-react';

const MEMBER = {
  name: 'JOHN DOE',
  id: 'SKS-447036',
  joined: '01 June 2026',
  status: 'Active',
  type: 'General',
};

export default function MembershipCard() {
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
        <span className="text-brand-primary">Membership Card</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-brand-accent tracking-tight m-0">MEMBERSHIP CARD</h1>
        <p className="text-sm text-gray-500 mt-1.5">Your official Shukrana Kalyan Sangh digital card.</p>
      </div>

      {/* Centered Wrapper (Max-width: 800px) */}
      <div className="max-w-[800px] mx-auto flex flex-col items-center gap-8">
        
        {/* DigitalCardContainer */}
        <div className="w-full max-w-[480px] border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm print:shadow-none print:border-gray-300">
          
          {/* CardTopBand (Dark Blue Bg, White Text, NGO Logo) */}
          <div className="bg-[#232F46] p-6 text-white flex flex-col gap-4">
            <div className="flex justify-between items-center">
              {/* NGO Logo */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-[#ED8C32] flex items-center justify-center font-bold text-white text-base">
                  S
                </div>
                <span className="font-extrabold tracking-wider text-sm">SHUKRANA KALYAN SANGH</span>
              </div>
              <span className="bg-[#ED8C32] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wider">
                MEMBER
              </span>
            </div>

            <div>
              <p className="text-xl font-bold tracking-wide m-0 uppercase">{MEMBER.name}</p>
              <p className="text-xs text-gray-300 font-mono tracking-wider m-0 mt-0.5">ID: {MEMBER.id}</p>
            </div>
          </div>

          {/* OrangeDivider (4px Orange Line) */}
          <div className="h-1 bg-[#ED8C32]"></div>

          {/* CardBottomBody (White Bg, Dark Text) */}
          <div className="p-6 bg-white flex flex-col gap-6">
            
            {/* LayoutRow (Photo Left, Details Right) */}
            <div className="flex gap-5 items-start">
              {/* Photo */}
              <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-150 flex-shrink-0 bg-gray-50">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
                  alt="Member"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 flex-1 text-sm text-[#232F46]">
                <div>
                  <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider m-0">Joining Date</p>
                  <p className="font-bold m-0 mt-0.5">{MEMBER.joined}</p>
                </div>
                <div>
                  <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider m-0">Membership</p>
                  <p className="font-bold m-0 mt-0.5">{MEMBER.type}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider m-0">Status</p>
                  <div className="inline-flex items-center gap-1 mt-1 text-emerald-600 font-bold">
                    <span>✓</span>
                    <span>{MEMBER.status}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* LayoutRow (QR Code Placeholder Left, Barcode Right) */}
            <div className="flex justify-between items-end pt-5 border-t border-dashed border-gray-200">
              {/* QR Code Placeholder */}
              <div className="w-14 h-14 bg-white border border-gray-200 rounded p-1 flex-shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#232F46]">
                  <path fill="currentColor" d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z M40,0 h20 v10 h-20 z M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z M0,40 h10 v20 h-10 z M20,40 h20 v10 h-20 z M50,40 h10 v20 h-10 z M70,40 h30 v10 h-30 z M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z M40,70 h20 v10 h-20 z M70,60 h10 v20 h-10 z M90,60 h10 v20 h-10 z M70,90 h30 v10 h-30 z" />
                </svg>
              </div>

              {/* Barcode */}
              <div className="flex flex-col items-center gap-1 flex-1 pl-6">
                {/* Visual Barcode Lines */}
                <div className="flex gap-0.5 w-full justify-end h-8 overflow-hidden select-none opacity-85">
                  <span className="w-0.5 h-full bg-[#232F46]" />
                  <span className="w-0.5 h-full bg-[#232F46]" />
                  <span className="w-1 h-full bg-[#232F46]" />
                  <span className="w-0.5 h-full bg-[#232F46]" />
                  <span className="w-1.5 h-full bg-[#232F46]" />
                  <span className="w-0.5 h-full bg-[#232F46]" />
                  <span className="w-0.5 h-full bg-[#232F46]" />
                  <span className="w-1 h-full bg-[#232F46]" />
                  <span className="w-1 h-full bg-[#232F46]" />
                  <span className="w-0.5 h-full bg-[#232F46]" />
                  <span className="w-1.5 h-full bg-[#232F46]" />
                  <span className="w-0.5 h-full bg-[#232F46]" />
                  <span className="w-1 h-full bg-[#232F46]" />
                  <span className="w-1 h-full bg-[#232F46]" />
                  <span className="w-0.5 h-full bg-[#232F46]" />
                  <span className="w-1 h-full bg-[#232F46]" />
                  <span className="w-1.5 h-full bg-[#232F46]" />
                  <span className="w-0.5 h-full bg-[#232F46]" />
                  <span className="w-0.5 h-full bg-[#232F46]" />
                  <span className="w-1 h-full bg-[#232F46]" />
                </div>
                <span className="text-[9px] font-bold tracking-widest text-gray-400 uppercase font-mono">
                  SHUKRANA KALYAN SANGH - {MEMBER.id}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* ActionRow (Download, Print) */}
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center max-w-[480px] print:hidden">
          <button
            type="button"
            className="flex-1 px-5 py-2.5 rounded-lg bg-[#232F46] text-white hover:bg-[#1a2334] text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors border-none shadow-sm"
          >
            <Download size={16} />
            <span>Download Card</span>
          </button>
          
          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 px-5 py-2.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-755 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Printer size={16} />
            <span>Print Card</span>
          </button>
        </div>

      </div>
    </motion.div>
  );
}
