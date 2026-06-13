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
    <section className="relative py-32 lg:py-48 bg-[#232F46] overflow-hidden flex items-center justify-center">
      
      {/* Background */}
      <div className="absolute inset-0 w-full h-full bg-[#232F46] z-0" />
      
      {/* Premium Grain Texture */}
      <div className="absolute inset-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay pointer-events-none z-0" />

      {/* Subtle Abstract NGO-themed Pattern (Grid) */}
      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none z-0" />

      {/* Huge subtle text in background */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0 overflow-hidden">
        <span className="text-[20vw] lg:text-[24vw] font-display font-black text-white/5 tracking-tighter leading-none whitespace-nowrap">
          VOLUNTEER
        </span>
      </div>

      <div className="max-w-[1000px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="flex flex-col items-center"
        >
          {/* Flat Premium Badge Icon */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 relative group"
          >
            <div className="relative inline-flex p-4 sm:p-5 bg-white/10 rounded-[24px] border border-white/20 shadow-[0_4px_12px_rgba(27,39,63,0.1)]">
              <HeartHandshake className="h-8 w-8 sm:h-10 sm:w-10 text-white relative z-10" />
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[44px] sm:text-[60px] lg:text-[76px] font-extrabold text-white tracking-[-0.03em] mb-6 font-display leading-[1.05] relative"
          >
            Become A Volunteer
          </motion.h2>
          
          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/80 text-[18px] sm:text-[21px] max-w-2xl mx-auto leading-[1.7] mb-14 font-medium"
          >
            Join a powerful, civic-minded collective of field experts, advisors, and relief workers. No matter your skillset, there is an active village program that needs your heart and focus.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full max-w-sm sm:max-w-none mb-16"
          >
            <button
              onClick={onOpenVolunteerModal}
              className="group relative w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 sm:px-10 py-4.5 bg-[#ED8C32] hover:bg-[#ED8C32] text-[#232F46] rounded-[20px] font-bold text-[16px] shadow-[0_4px_12px_rgba(27,39,63,0.1)] transform hover:-translate-y-1 transition-all duration-400 cursor-pointer overflow-hidden border border-transparent"
            >
              <span className="relative z-10 tracking-wide">Join Us Now</span>
              <ArrowRight className="h-5 w-5 text-[#232F46] relative z-10 transform group-hover:translate-x-1 transition-transform duration-400" />
            </button>
            
            <button
              onClick={onOpenContactModal}
              className="group w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 sm:px-10 py-4.5 bg-white hover:bg-gray-50 text-[#232F46] rounded-[20px] font-bold text-[16px] shadow-[0_4px_12px_rgba(27,39,63,0.1)] transform hover:-translate-y-1 transition-all duration-400 cursor-pointer border border-transparent"
            >
              <Mail className="h-5 w-5 text-[#232F46] transition-colors duration-400" />
              <span className="tracking-wide">Contact Team</span>
            </button>
          </motion.div>

          {/* Trust Chips */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            {[
              "Verified NGO",
              "Volunteer Network",
              "Community Driven"
            ].map((text, i) => (
              <div 
                key={i} 
                className="group flex items-center gap-2.5 px-4.5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/10 hover:border-white/20 transition-colors duration-300 shadow-sm"
              >
                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center transition-colors duration-300">
                  <CheckCircle2 className="h-3 w-3 text-[#232F46]" />
                </div>
                <span className="text-[13px] font-semibold text-white/90 transition-colors tracking-wide">
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
