/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Linkedin, Sparkles, Award } from 'lucide-react';
import { LEADERSHIP_TEAM } from '../data';

export default function LeadershipTeam() {
  return (
    <section className="py-24 bg-white relative">
      <div className="absolute inset-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.035] mix-blend-overlay pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title / Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#232F46]/5 shadow-sm rounded-full text-[#ED8C32] text-xs font-semibold uppercase tracking-wider mb-4 cursor-pointer">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Integrity In Actions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#232F46] tracking-tight mb-4 font-display">
            Meet Our Leadership Team
          </h2>
          <p className="text-[#232F46]/70 text-base sm:text-lg">
            Dedicated social entrepreneurs, clinical administrators, and corporate leaders guiding our development mission.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {LEADERSHIP_TEAM.map((member, index) => {
            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group relative bg-white border border-[#232F46]/5 hover:border-[#ED8C32]/40 p-6 rounded-[24px] text-center shadow-[0_4px_12px_rgba(27,39,63,0.04)] hover:shadow-[0_12px_32px_rgba(27,39,63,0.08)] transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Board member avatar frame */}
                <div className="relative mx-auto w-32 h-32 mb-5 rounded-full overflow-hidden p-1 bg-[#ED8C32]/40 group-hover:scale-105 transition-transform duration-300 shadow-sm group-hover:bg-[#ED8C32]">
                  <div className="w-full h-full rounded-full bg-white p-0.5">
                    <img
                      src={member.image}
                      alt={member.name}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full rounded-full object-cover ${
                        member.id === 'lead-4' 
                          ? 'contrast-[1.08] saturate-[1.05] brightness-[1.02] filter hover:brightness-100 transition-all duration-300' 
                          : ''
                      }`}
                    />
                  </div>
                </div>

                {/* Meta text */}
                <h3 className="text-lg font-bold text-[#232F46] mb-1 group-hover:text-[#232F46] transition-colors font-display">
                  {member.name}
                </h3>
                <p className="text-[#ED8C32] text-xs font-semibold tracking-wide uppercase font-mono mb-4">
                  {member.role}
                </p>

                {/* Premium linkedin icon link */}
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex p-2 bg-gray-50 hover:bg-[#ED8C32] border border-[#232F46]/5 text-[#232F46]/50 hover:text-[#232F46] rounded-[12px] shadow-sm transition-all"
                  aria-label={`${member.name} LinkedIn Profile`}
                >
                  <Linkedin className="h-4.5 w-4.5" />
                </a>

                {/* Accent underline animation */}
                <div className="absolute bottom-0 left-12 right-12 h-1 bg-[#ED8C32] scale-x-0 group-hover:scale-x-100 transition-transform duration-350 rounded-t-full" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
