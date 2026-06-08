/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { HeartHandshake, ArrowRight, ShieldCheck, Mail } from 'lucide-react';

interface VolunteerCTAProps {
  onOpenVolunteerModal: () => void;
  onOpenContactModal: () => void;
}

export default function VolunteerCTA({ onOpenVolunteerModal, onOpenContactModal }: VolunteerCTAProps) {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with Dark Slate and amber accents */}
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950" />
      {/* Dynamic blurred amber orb */}
      <div className="absolute top-1/2 -left-1/4 w-96 h-96 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-1/3 -right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      {/* Background grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          {/* Heart Handshake Badge */}
          <div className="inline-flex p-3 bg-amber-500/10 text-brand-gold rounded-2xl border border-amber-500/25 mb-6 group-hover:scale-105 transition-transform">
            <HeartHandshake className="h-8 w-8 stroke-[1.8]" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 font-display leading-[1.12]">
            Become A Volunteer
          </h2>
          
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Join a powerful, civic-minded collective of field experts, advisors, and relief workers. No matter your skillset, there is an active village program that needs your heart and focus.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-sm sm:max-w-none">
            <button
              onClick={onOpenVolunteerModal}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 bg-brand-gold hover:bg-brand-gold-hover text-slate-950 rounded-xl font-extrabold shadow-xl shadow-amber-400/5 hover:shadow-amber-400/15 text-sm transform hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
            >
              <span>Join Us Now</span>
              <ArrowRight className="h-4.5 w-4.5 text-slate-950" />
            </button>
            
            <button
              onClick={onOpenContactModal}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-white hover:text-white rounded-xl font-semibold text-sm transition-all cursor-pointer"
            >
              <Mail className="h-4 w-4 text-slate-400" />
              <span>Contact Team</span>
            </button>
          </div>

          {/* Verification terms */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-slate-400 text-xs font-mono tracking-wider">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-brand-gold" />
              <span>SECURED SYSTEM</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-brand-gold" />
              <span>NO FEE ENROLLMENT</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-brand-gold" />
              <span>TAX EXEMPT (80G) COGNIZANT</span>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
