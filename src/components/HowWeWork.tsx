import { motion } from 'motion/react';
import { Search, Rocket, BarChart3, ArrowRight } from 'lucide-react';

export default function HowWeWork() {
  const steps = [
    {
      num: "01",
      title: "Identify Needs",
      desc: "Our field volunteers conduct exhaustive primary surveys in remote locations to document structural, sanitation, and clinical challenges firsthand.",
      icon: Search,
      metric: "500+ Community Surveys"
    },
    {
      num: "02",
      title: "Execute Programs",
      desc: "We coordinate with vetted clinical experts, educational tutors, and regional contractors to roll out micro-targeted, high-integrity logistics.",
      icon: Rocket,
      metric: "120+ Active Initiatives"
    },
    {
      num: "03",
      title: "Measure Impact",
      desc: "Every dollar raised is mapped directly to beneficiaries. We employ independent audits to benchmark program transparency and efficacy.",
      icon: BarChart3,
      metric: "95% Program Transparency"
    }
  ];

  return (
    <section id="about" className="py-24 lg:py-32 bg-[#FFFFFF] relative overflow-hidden">
      {/* Background patterns: subtle grain */}
      <div className="absolute inset-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none z-0" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header content */}
        <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-[#FFF8F2] border border-[#ED8C32]/40 text-[11px] font-mono font-bold tracking-[0.2em] text-[#ED8C32] uppercase mb-6 shadow-sm">
              Our Operating Blueprint
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[40px] sm:text-[48px] lg:text-[56px] font-extrabold text-[#232F46] tracking-[-0.03em] mb-6 font-display leading-[1.1]"
          >
            How We Work
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#232F46]/70 text-lg sm:text-[20px] leading-[1.6] max-w-2xl mx-auto font-medium"
          >
            We follow strict, data-driven developmental stages to turn donor goodwill into real-life human breakthroughs.
          </motion.p>
        </div>

        {/* 3-Step Premium Journey */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 relative">
          
          {/* Subtle Flow Line underneath for visual connection on Desktop */}
          <div className="hidden lg:block absolute top-[120px] left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-[#ED8C32]/40 to-transparent pointer-events-none" />

          {steps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col h-full"
              >
                <div className="relative flex flex-col h-full bg-white hover:bg-white backdrop-blur-xl border border-[#232F46]/10 hover:border-[#ED8C32]/50 rounded-[32px] p-8 sm:p-10 shadow-[0_4px_12px_rgba(27,39,63,0.04)] hover:shadow-[0_12px_32px_rgba(27,39,63,0.08)] transform hover:-translate-y-2 transition-all duration-500 overflow-hidden text-left z-10">
                  
                  {/* Premium Background Step Number */}
                  <div className="absolute -top-6 -right-4 font-display font-bold text-[120px] leading-none text-[#232F46]/[0.02] group-hover:text-[#ED8C32]/[0.1] transition-colors duration-500 pointer-events-none select-none z-0">
                    {step.num}
                  </div>

                  {/* Icon Container */}
                  <div className="relative z-10 w-16 h-16 rounded-[20px] bg-white border border-[#232F46]/10 flex items-center justify-center mb-8 shadow-sm group-hover:border-[#ED8C32]/50 group-hover:bg-[#FFF8F2] transition-all duration-500">
                    <IconComp className="h-7 w-7 text-[#232F46] group-hover:text-[#ED8C32] transition-colors duration-500 stroke-[2]" />
                  </div>

                  {/* Step Label & Title */}
                  <div className="relative z-10 mb-4">
                    <span className="block text-[11px] font-mono font-bold text-[#ED8C32] tracking-[0.2em] uppercase mb-2">
                      STEP {step.num}
                    </span>
                    <h3 className="text-2xl font-bold text-[#232F46] font-display">
                      {step.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="relative z-10 text-[#232F46]/70 text-base leading-[1.65] mb-10 flex-grow font-medium">
                    {step.desc}
                  </p>

                  {/* Metric / Impact Badge */}
                  <div className="relative z-10 mt-auto pt-6 border-t border-[#232F46]/10 group-hover:border-[#ED8C32]/30 transition-colors duration-500">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#232F46]/5 flex items-center justify-center group-hover:bg-[#FFF8F2] transition-colors duration-500">
                        <ArrowRight className="h-4 w-4 text-[#232F46]/60 group-hover:text-[#ED8C32] transform group-hover:rotate-[-45deg] transition-all duration-500" />
                      </div>
                      <span className="font-semibold text-[14px] text-[#232F46]">
                        {step.metric}
                      </span>
                    </div>
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
