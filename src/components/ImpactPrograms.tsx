/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Sparkles, Users, Award, ShieldCheck, Heart } from 'lucide-react';
import { Program } from '../types';
import { IMPACT_PROGRAMS } from '../data';

interface ImpactProgramsProps {
  onOpenDonateModal: (preselectedProgram?: string) => void;
  onOpenDetailsModal: (program: Program) => void;
}

export default function ImpactPrograms({ onOpenDonateModal, onOpenDetailsModal }: ImpactProgramsProps) {
  return (
    <section id="programs" className="py-24 bg-white relative">
      <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header content */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full text-brand-gold text-xs font-semibold uppercase tracking-wider mb-4 cursor-pointer">
            <Award className="h-3.5 w-3.5" />
            <span>Targeted Interventions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4 font-display">
            Our Impact Programs
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Focused initiatives delivering measurable changes to communities in need.
          </p>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {IMPACT_PROGRAMS.map((program, index) => {
            const percentRaised = Math.min(Math.round((program.raised / program.goal) * 100), 100);
            
            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group flex flex-col bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 hover:border-amber-200/50 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Product Cover image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent z-10" />
                  <img
                    src={program.image}
                    alt={program.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/90 backdrop-blur-md text-xs font-bold font-mono tracking-widest text-slate-800 uppercase rounded-full border border-slate-100 shadow-sm">
                    {program.category}
                  </span>
                </div>

                {/* Card Main Body */}
                <div className="flex-1 p-6 sm:p-7 flex flex-col text-left">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-gold transition-colors font-display">
                    {program.title}
                  </h3>
                  
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                    {program.description}
                  </p>

                  {/* Impact Tracker Progress Gauge */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center text-xs font-semibold mb-2">
                      <span className="text-slate-500 font-mono tracking-wide">FUNDING PROGRESS</span>
                      <span className="text-brand-gold font-bold">{percentRaised}%</span>
                    </div>
                    {/* Bar container */}
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentRaised}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-brand-gold to-amber-500 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Key Stats rows */}
                  <div className="grid grid-cols-2 gap-4 py-4 px-3 bg-white rounded-xl mb-6 border border-slate-100/80">
                    <div className="text-left">
                      <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-0.5">RAISED</span>
                      <span className="text-sm font-extrabold text-slate-800">${program.raised.toLocaleString()}</span>
                    </div>
                    <div className="text-left border-l border-slate-100 pl-4">
                      <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-0.5">GOAL TARGET</span>
                      <span className="text-sm font-extrabold text-slate-800">${program.goal.toLocaleString()}</span>
                    </div>
                    <div className="col-span-2 text-left pt-2 border-t border-slate-50 flex items-center gap-2">
                      <Users className="h-4 w-4 text-slate-400" />
                      <span className="text-xs text-slate-500 font-medium">
                        Direct support to <strong className="text-slate-800 font-bold">{program.beneficiaries.toLocaleString()}+</strong> individuals
                      </span>
                    </div>
                  </div>

                  {/* Buttons Grid */}
                  <div className="grid grid-cols-2 gap-3 mt-auto">
                    <button
                      onClick={() => onOpenDetailsModal(program)}
                      className="px-4 py-2.5 text-xs font-semibold border border-slate-250 hover:bg-slate-50 text-slate-700 rounded-xl transition-all cursor-pointer"
                    >
                      Learn More
                    </button>
                    
                    <button
                      onClick={() => onOpenDonateModal(program.title)}
                      className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold bg-brand-gold hover:bg-brand-gold-hover text-white rounded-xl shadow-md shadow-amber-400/10 hover:shadow-lg transition-all cursor-pointer"
                    >
                      <Heart className="h-3 w-3 fill-white stroke-none" />
                      <span>Donate</span>
                    </button>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
