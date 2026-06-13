import { motion } from 'motion/react';
import { Users, Heart, ArrowRight, BookOpen, Activity, Leaf } from 'lucide-react';
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
    <section id="programs" className="py-24 lg:py-32 bg-[#FFF8F2] relative overflow-hidden">
      {/* Faint structural grid treatment */}
      <div className="absolute inset-0 bg-grid-faint [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_20%,transparent_75%)] pointer-events-none z-0" />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 relative z-10">

        {/* Header content */}
        <div className="text-center max-w-2xl mx-auto mb-20 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center mb-6"
          >
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white border border-[#ED8C32]/25 eyebrow text-[#ED8C32] shadow-[0_2px_8px_rgba(35,47,70,0.04)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ED8C32]" />
              Core Initiatives
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[38px] sm:text-[46px] lg:text-[54px] font-bold text-[#232F46] tracking-[-0.035em] mb-5 font-display leading-[1.05]"
          >
            Our Impact Programs
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#232F46]/60 text-[17px] sm:text-[19px] leading-[1.7] max-w-xl mx-auto font-normal"
          >
            Focused initiatives delivering measurable changes and driving sustainable impact in communities that need it most.
          </motion.p>
        </div>

        {/* Dynamic Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {IMPACT_PROGRAMS.map((program, index) => {
            const percentRaised = Math.min(Math.round((program.raised / program.goal) * 100), 100);

            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col bg-white rounded-[26px] overflow-hidden border border-[#232F46]/[0.07] shadow-[0_1px_2px_rgba(35,47,70,0.04),0_4px_16px_rgba(35,47,70,0.04)] hover:shadow-[0_2px_4px_rgba(35,47,70,0.04),0_18px_44px_rgba(35,47,70,0.10)] hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] relative"
              >
                {/* Hero / Cover Image Area */}
                <div className="relative overflow-hidden bg-[#232F46]/5 aspect-[16/11]">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#232F46]/75 via-[#232F46]/10 to-transparent z-10 opacity-85 group-hover:opacity-100 transition-opacity duration-500" />

                  <img
                    src={program.image}
                    alt={program.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform scale-[1.02] group-hover:scale-[1.08] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-white/15 backdrop-blur-md border border-white/25 text-white rounded-full transition-colors duration-300">
                    <CategoryIcon category={program.category} />
                    <span className="text-[10px] font-bold tracking-[0.14em] uppercase mt-px">
                      {program.category}
                    </span>
                  </div>
                </div>

                {/* Card Main Body */}
                <div className="flex-1 p-7 flex flex-col text-left relative z-10">
                  <h3 className="text-[21px] font-semibold text-[#232F46] mb-3 font-display leading-snug tracking-[-0.01em]">
                    {program.title}
                  </h3>

                  <p className="text-[#232F46]/60 text-[14.5px] leading-[1.7] mb-7 flex-1 line-clamp-3 font-normal">
                    {program.description}
                  </p>

                  {/* Funding Progress (Animated) */}
                  <div className="mb-7 relative">
                    <div className="flex justify-between items-end mb-2.5">
                      <span className="text-[11px] font-semibold text-[#232F46]/45 tracking-[0.16em] uppercase">
                        Progress
                      </span>
                      <motion.span
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="text-[18px] font-bold text-[#232F46] leading-none tracking-[-0.02em]"
                      >
                        {percentRaised}%
                      </motion.span>
                    </div>
                    {/* Bar container */}
                    <div className="w-full h-2 bg-[#232F46]/[0.07] rounded-full overflow-hidden relative">
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
                  <div className="grid grid-cols-2 gap-2.5 mb-7">
                    <div className="flex flex-col bg-[#FFF8F2] border border-[#232F46]/[0.06] p-3.5 rounded-2xl group-hover:border-[#ED8C32]/30 transition-colors duration-300">
                      <span className="text-[10px] font-semibold text-[#232F46]/45 uppercase tracking-[0.1em] mb-1">Raised</span>
                      <span className="text-[16px] font-bold text-[#232F46] tracking-[-0.02em]">${program.raised.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col bg-[#FFF8F2] border border-[#232F46]/[0.06] p-3.5 rounded-2xl group-hover:border-[#ED8C32]/30 transition-colors duration-300">
                      <span className="text-[10px] font-semibold text-[#232F46]/45 uppercase tracking-[0.1em] mb-1">Goal</span>
                      <span className="text-[16px] font-bold text-[#232F46] tracking-[-0.02em]">${program.goal.toLocaleString()}</span>
                    </div>

                    <div className="col-span-2 flex items-center gap-3 bg-[#FFF8F2] border border-[#232F46]/[0.06] p-3.5 rounded-2xl group-hover:border-[#ED8C32]/30 transition-colors duration-300">
                      <div className="w-8 h-8 rounded-full bg-white border border-[#232F46]/[0.06] flex items-center justify-center">
                        <Users className="h-4 w-4 text-[#ED8C32]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-semibold text-[#232F46]/45 uppercase tracking-[0.1em] mb-0.5">Beneficiaries</span>
                        <span className="text-[14px] text-[#232F46]/75 font-medium">
                          <strong className="text-[#232F46] font-bold">{program.beneficiaries.toLocaleString()}+</strong> individuals
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-2.5 mt-auto pt-1">
                    <button
                      onClick={() => onOpenDetailsModal(program)}
                      className="group/btn flex items-center justify-center gap-1.5 px-4 py-3.5 text-[13px] font-semibold bg-white border border-[#232F46]/12 hover:border-[#232F46]/30 text-[#232F46] rounded-2xl transition-all duration-300 cursor-pointer"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="h-3.5 w-3.5 text-[#232F46] transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </button>

                    <button
                      onClick={() => onOpenDonateModal(program.title)}
                      className="group/donate relative flex items-center justify-center gap-2 px-4 py-3.5 bg-[#ED8C32] text-[#232F46] rounded-2xl font-semibold text-[13px] shadow-[0_4px_14px_rgba(237,140,50,0.28)] hover:shadow-[0_8px_20px_rgba(237,140,50,0.4)] transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                    >
                      <Heart className="h-3.5 w-3.5 fill-current text-[#232F46] group-hover/donate:scale-110 group-hover/donate:-rotate-6 transition-transform duration-400" />
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
