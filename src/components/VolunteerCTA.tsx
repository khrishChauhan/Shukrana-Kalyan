/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { HeartHandshake, ArrowRight, Mail, CheckCircle2 } from 'lucide-react';

interface VolunteerCTAProps {
  onOpenVolunteerModal: () => void;
  onOpenContactModal: () => void;
}

export default function VolunteerCTA({ onOpenVolunteerModal, onOpenContactModal }: VolunteerCTAProps) {
  return (
    <section className="relative py-28 lg:py-40 bg-[#232F46] overflow-hidden flex items-center justify-center">

      {/* Subtle structured grid, masked */}
      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_55%,transparent_100%)] pointer-events-none z-0" />

      {/* Soft single-color gold glow, restrained */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[radial-gradient(ellipse_at_top,rgba(237,140,50,0.14),transparent_70%)] pointer-events-none z-0" />

      {/* Huge subtle text in background */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0 overflow-hidden">
        <span className="text-[20vw] lg:text-[24vw] font-display font-bold text-white/[0.035] tracking-[-0.05em] leading-none whitespace-nowrap">
          VOLUNTEER
        </span>
      </div>

      <div className="max-w-[900px] w-full mx-auto px-5 sm:px-8 lg:px-10 relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, y: 36 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="flex flex-col items-center"
        >
          {/* Flat Premium Badge Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-9"
          >
            <div className="relative inline-flex p-4 sm:p-5 bg-white/[0.07] rounded-3xl border border-white/15">
              <HeartHandshake className="h-8 w-8 sm:h-9 sm:w-9 text-[#ED8C32]" />
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="text-[42px] sm:text-[58px] lg:text-[72px] font-bold text-white tracking-[-0.04em] mb-6 font-display leading-[1.02]"
          >
            Become A Volunteer
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/65 text-[17px] sm:text-[20px] max-w-xl mx-auto leading-[1.75] mb-12 font-normal"
          >
            Join a powerful, civic-minded collective of field experts, advisors, and relief workers. No matter your skillset, there is an active village program that needs your heart and focus.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-sm sm:max-w-none mb-14"
          >
            <button
              onClick={onOpenVolunteerModal}
              className="group relative w-full sm:w-auto flex items-center justify-center gap-2.5 px-9 py-4 bg-[#ED8C32] text-[#232F46] rounded-2xl font-semibold text-[16px] shadow-[0_8px_24px_rgba(237,140,50,0.32)] hover:shadow-[0_14px_34px_rgba(237,140,50,0.42)] transform hover:-translate-y-1 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
            >
              <span className="tracking-[-0.01em]">Join Us Now</span>
              <ArrowRight className="h-5 w-5 text-[#232F46] transform group-hover:translate-x-1 transition-transform duration-400" />
            </button>

            <button
              onClick={onOpenContactModal}
              className="group w-full sm:w-auto flex items-center justify-center gap-2.5 px-9 py-4 bg-white/[0.06] hover:bg-white/[0.12] text-white rounded-2xl font-semibold text-[16px] border border-white/15 hover:border-white/25 transform hover:-translate-y-1 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
            >
              <Mail className="h-5 w-5 transition-colors duration-400" />
              <span className="tracking-[-0.01em]">Contact Team</span>
            </button>
          </motion.div>

          {/* Trust Chips */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {[
              "Verified NGO",
              "Volunteer Network",
              "Community Driven"
            ].map((text, i) => (
              <div
                key={i}
                className="group flex items-center gap-2.5 px-4 py-2.5 bg-white/[0.06] hover:bg-white/[0.1] backdrop-blur-md rounded-full border border-white/10 hover:border-white/20 transition-colors duration-300"
              >
                <CheckCircle2 className="h-4 w-4 text-[#ED8C32]" />
                <span className="text-[13px] font-medium text-white/85 tracking-[-0.01em]">
                  {text}
                </span>
              </div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
