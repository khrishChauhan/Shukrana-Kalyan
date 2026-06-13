/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { User, Download, Printer, Share2, Phone, Calendar, Hash, BadgeCheck, ChevronRight } from 'lucide-react';

export default function IDCard() {
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
        <span className="text-brand-light0 uppercase tracking-wider">ID Card</span>
      </nav>

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-charcoal tracking-tight font-display">Digital ID Card</h1>
        <p className="text-xs text-brand-gray0 mt-1">Your official Shukrana Kalyan Sangh membership identity.</p>
      </div>

      {/* Card Container */}
      <div className="flex flex-col items-center justify-center py-4">
        <div className="w-full max-w-[420px] bg-white rounded-2xl border border-slate-150 shadow-brand overflow-hidden">

          {/* Card Header Band */}
          <div className="bg-brand-primary px-5 py-4 text-center">
            <h2 className="font-display font-black text-brand-charcoal text-base tracking-wide uppercase">
              Shukrana Kalyan Sangh
            </h2>
            <p className="text-brand-charcoal/70 text-[11px] font-bold tracking-widest uppercase mt-0.5">
              Member Identity Card
            </p>
          </div>

          {/* Card Body */}
          <div className="p-5 flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-xl overflow-hidden border border-brand-gray shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
                  alt="Member"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex-1 space-y-2.5 pt-1">
              {[
                { icon: User, label: 'Name', value: 'Demo User' },
                { icon: Hash, label: 'Member ID', value: 'SKS-447036' },
                { icon: Calendar, label: 'Joined', value: '01 Jun 2026' },
                { icon: Phone, label: 'Mobile', value: '+91 9876543210' }
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-2">
                  <Icon size={13} className="text-brand-gray0 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[9px] text-brand-charcoal/50 font-mono font-black uppercase tracking-widest leading-none mb-0.5">{label}</p>
                    <p className="text-sm font-bold text-brand-charcoal leading-none">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card Footer */}
          <div className="bg-brand-gray border-t border-brand-gray/80 px-5 py-3 flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 px-2.5 py-1 rounded-lg text-xs font-bold">
              <BadgeCheck size={13} className="text-emerald-500" /> Verified Member
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-[8px] font-black text-brand-charcoal/50 uppercase tracking-widest font-mono">Scan to</p>
                <p className="text-[8px] font-black text-brand-charcoal/50 uppercase tracking-widest font-mono">Verify</p>
              </div>
              <div className="w-12 h-12 bg-white border border-brand-gray rounded-lg flex items-center justify-center p-1">
                <svg viewBox="0 0 100 100" className="w-full h-full text-brand-charcoal">
                  <path fill="currentColor" d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z M40,0 h20 v10 h-20 z M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z M0,40 h10 v20 h-10 z M20,40 h20 v10 h-20 z M50,40 h10 v20 h-10 z M70,40 h30 v10 h-30 z M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z M40,70 h20 v10 h-20 z M70,60 h10 v20 h-10 z M90,60 h10 v20 h-10 z M70,90 h30 v10 h-30 z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mt-6 print:hidden">
          <button className="px-5 py-2.5 bg-brand-primary text-brand-charcoal rounded-xl text-sm font-black hover:bg-brand-light0 transition-colors shadow-brand flex items-center gap-2">
            <Download size={15} /> Download PDF
          </button>
          <button onClick={() => window.print()} className="px-5 py-2.5 bg-white border border-brand-gray/80 text-brand-charcoal rounded-xl text-sm font-bold hover:bg-brand-gray transition-colors shadow-brand flex items-center gap-2">
            <Printer size={15} /> Print Card
          </button>
          <button className="px-5 py-2.5 bg-white border border-brand-gray/80 text-brand-charcoal rounded-xl text-sm font-bold hover:bg-brand-gray transition-colors shadow-brand flex items-center gap-2">
            <Share2 size={15} /> Share Card
          </button>
        </div>
      </div>
    </motion.div>
  );
}
