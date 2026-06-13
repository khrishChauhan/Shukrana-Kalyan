import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Users, Award, Heart, ArrowRight, BookOpen, Activity, Leaf } from 'lucide-react';
import { Program } from '../types';
import { IMPACT_PROGRAMS } from '../data';

interface ImpactProgramsProps {
  onOpenDonateModal: (preselectedProgram?: string) => void;
  onOpenDetailsModal: (program: Program) => void;
}

const CategoryIcon = ({ category }: { category: string }) => {
  if (category.toLowerCase().includes('education')) return <BookOpen className="h-3 w-3" />;
  if (category.toLowerCase().includes('health')) return <Activity className="h-3 w-3" />;
  return <Leaf className="h-3 w-3" />;
};

export default function ImpactPrograms({ onOpenDonateModal, onOpenDetailsModal }: ImpactProgramsProps) {
  return (
    <section id="programs" className="py-24 lg:py-36 bg-[#FFFFFF] relative overflow-hidden">
      {/* Background patterns: premium noise */}
      <div className="absolute inset-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.035] mix-blend-overlay pointer-events-none z-0" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header content */}
        <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center mb-6"
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-white border border-[#ED8C32]/40 text-[11px] font-mono font-bold tracking-[0.2em] text-[#ED8C32] uppercase shadow-sm">
              Core Initiatives
            </span>
            <div className="w-px h-8 bg-gradient-to-b from-[#ED8C32]/40 to-transparent mt-4" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[40px] sm:text-[48px] lg:text-[56px] font-extrabold text-[#232F46] tracking-[-0.03em] mb-6 font-display leading-[1.1]"
          >
            Our Impact Programs
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#232F46]/70 text-[18px] sm:text-[20px] leading-[1.6] max-w-2xl mx-auto font-medium"
          >
            Focused initiatives delivering measurable changes and driving sustainable impact in communities that need it most.
          </motion.p>
        </div>

        {/* Dynamic Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          {IMPACT_PROGRAMS.map((program, index) => {
            const percentRaised = Math.min(Math.round((program.raised / program.goal) * 100), 100);
            
            // Layout Variations based on index
            const isImageFocused = index === 0;
            const isMetricsFocused = index === 1;
            const isStoryFocused = index === 2;

            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col bg-white rounded-[32px] overflow-hidden border border-[#232F46]/5 shadow-[0_4px_12px_rgba(27,39,63,0.04)] hover:shadow-[0_12px_32px_rgba(27,39,63,0.08)] hover:-translate-y-2 transition-all duration-500 relative"
              >
                {/* Hero / Cover Image Area */}
                <div className={`relative overflow-hidden bg-[#232F46]/5 ${isImageFocused ? 'aspect-[4/3]' : 'aspect-[16/10]'}`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#232F46]/80 via-[#232F46]/10 to-transparent z-10 mix-blend-multiply opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <img
                    src={program.image}
                    alt={program.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform scale-[1.02] group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-5 left-5 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white rounded-[12px] shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-colors duration-300">
                    <CategoryIcon category={program.category} />
                    <span className="text-[10px] font-bold font-mono tracking-widest uppercase mt-px">
                      {program.category}
                    </span>
                  </div>
                </div>

                {/* Card Main Body */}
                <div className="flex-1 p-8 flex flex-col text-left relative z-10">
                  <h3 className="text-[22px] font-bold text-[#232F46] mb-3 group-hover:text-[#232F46] transition-colors duration-300 font-display leading-tight">
                    {program.title}
                  </h3>
                  
                  <p className={`text-[#232F46]/70 text-[15px] leading-[1.65] mb-8 flex-1 ${isStoryFocused ? 'line-clamp-4' : 'line-clamp-3'} font-medium`}>
                    {program.description}
                  </p>

                  {/* Funding Progress (Animated) */}
                  <div className="mb-8 relative">
                    <div className="flex justify-between items-end mb-3">
                      <span className="text-[11px] font-mono font-bold text-[#232F46]/50 tracking-[0.15em] uppercase">
                        Progress
                      </span>
                      <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="text-[18px] font-extrabold text-[#232F46] leading-none"
                      >
                        {percentRaised}%
                      </motion.span>
                    </div>
                    {/* Bar container */}
                    <div className="w-full h-2.5 bg-[#FFFFFF] border border-[#232F46]/5 rounded-full overflow-hidden relative shadow-inner">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentRaised}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-0 left-0 h-full bg-[#ED8C32] rounded-full"
                      />
                    </div>
                  </div>

                  {/* Key Stats panels */}
                  <div className={`grid ${isMetricsFocused ? 'grid-cols-2 gap-3 mb-8' : 'grid-cols-2 gap-3 mb-8'}`}>
                    <div className="flex flex-col bg-[#FFFFFF] border border-[#232F46]/5 p-3.5 rounded-[16px] group-hover:border-[#ED8C32]/40 transition-colors duration-300">
                      <span className="text-[10px] font-mono font-bold text-[#232F46]/50 uppercase tracking-wider mb-1">Raised</span>
                      <span className="text-[16px] font-extrabold text-[#232F46] -tracking-tight">${program.raised.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col bg-[#FFFFFF] border border-[#232F46]/5 p-3.5 rounded-[16px] group-hover:border-[#ED8C32]/40 transition-colors duration-300">
                      <span className="text-[10px] font-mono font-bold text-[#232F46]/50 uppercase tracking-wider mb-1">Goal</span>
                      <span className="text-[16px] font-extrabold text-[#232F46] -tracking-tight">${program.goal.toLocaleString()}</span>
                    </div>
                    
                    <div className="col-span-2 flex items-center gap-3 bg-[#FFFFFF] border border-[#232F46]/5 p-3.5 rounded-[16px] group-hover:border-[#ED8C32]/40 transition-colors duration-300">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <Users className="h-4 w-4 text-[#232F46]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono font-bold text-[#232F46]/50 uppercase tracking-wider mb-0.5">Beneficiaries</span>
                        <span className="text-[14px] text-[#232F46]/80 font-semibold">
                          <strong className="text-[#232F46] font-extrabold">{program.beneficiaries.toLocaleString()}+</strong> individuals
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-3 mt-auto pt-2">
                    <button
                      onClick={() => onOpenDetailsModal(program)}
                      className="group/btn flex items-center justify-center gap-1.5 px-4 py-3.5 text-[13px] font-semibold bg-white border border-[#232F46]/10 hover:border-[#ED8C32]/60 text-[#232F46] rounded-[16px] shadow-[0_2px_8px_rgba(27,39,63,0.02)] hover:shadow-[0_4px_12px_rgba(27,39,63,0.06)] transition-all duration-300 cursor-pointer"
                    >
                      <span className="relative">Learn More</span>
                      <ArrowRight className="h-3.5 w-3.5 text-[#232F46] transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </button>
                    
                    <button
                      onClick={() => onOpenDonateModal(program.title)}
                      className="group/donate relative flex items-center justify-center gap-2 px-4 py-3.5 bg-[#ED8C32] hover:bg-[#ED8C32] text-[#232F46] rounded-[16px] font-bold text-[13px] shadow-[0_4px_12px_rgba(35,47,70,0.1)] hover:shadow-[0_8px_20px_rgba(35,47,70,0.2)] transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer overflow-hidden border border-transparent"
                    >
                      <Heart className="h-3.5 w-3.5 fill-current text-[#232F46] relative z-10 group-hover/donate:scale-110 group-hover/donate:-rotate-6 transition-transform duration-400" />
                      <span className="relative z-10 tracking-wide">Donate</span>
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
