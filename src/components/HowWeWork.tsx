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
    <section id="about" className="py-24 lg:py-32 bg-white relative overflow-hidden">
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
          >
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#FFF8F2] border border-[#ED8C32]/25 eyebrow text-[#ED8C32] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ED8C32]" />
              Our Operating Blueprint
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[38px] sm:text-[46px] lg:text-[54px] font-bold text-[#232F46] tracking-[-0.035em] mb-5 font-display leading-[1.05]"
          >
            How We Work
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#232F46]/60 text-[17px] sm:text-[19px] leading-[1.7] max-w-xl mx-auto font-normal"
          >
            We follow strict, data-driven developmental stages to turn donor goodwill into real-life human breakthroughs.
          </motion.p>
        </div>

        {/* 3-Step Premium Journey */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative">

          {/* Subtle Flow Line underneath for visual connection on Desktop */}
          <div className="hidden lg:block absolute top-[116px] left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-[#ED8C32]/35 to-transparent pointer-events-none" />

          {steps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col h-full"
              >
                <div className="relative flex flex-col h-full bg-white border border-[#232F46]/[0.08] hover:border-[#ED8C32]/40 rounded-[26px] p-8 sm:p-9 shadow-[0_1px_2px_rgba(35,47,70,0.04),0_4px_16px_rgba(35,47,70,0.04)] hover:shadow-[0_2px_4px_rgba(35,47,70,0.04),0_16px_40px_rgba(35,47,70,0.09)] transform hover:-translate-y-1.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden text-left z-10">

                  {/* Premium Background Step Number */}
                  <div className="absolute -top-7 -right-3 font-display font-bold text-[128px] leading-none text-[#232F46]/[0.03] group-hover:text-[#ED8C32]/[0.10] transition-colors duration-500 pointer-events-none select-none z-0">
                    {step.num}
                  </div>

                  {/* Icon Container */}
                  <div className="relative z-10 w-14 h-14 rounded-2xl bg-[#FFF8F2] border border-[#ED8C32]/20 flex items-center justify-center mb-7 group-hover:bg-[#ED8C32] transition-colors duration-500">
                    <IconComp className="h-6 w-6 text-[#ED8C32] group-hover:text-[#232F46] transition-colors duration-500 stroke-[2]" />
                  </div>

                  {/* Step Label & Title */}
                  <div className="relative z-10 mb-3.5">
                    <span className="block text-[11px] font-bold text-[#ED8C32] tracking-[0.2em] uppercase mb-2">
                      STEP {step.num}
                    </span>
                    <h3 className="text-[22px] font-semibold text-[#232F46] font-display tracking-[-0.01em]">
                      {step.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="relative z-10 text-[#232F46]/60 text-[15px] leading-[1.7] mb-9 flex-grow font-normal">
                    {step.desc}
                  </p>

                  {/* Metric / Impact Badge */}
                  <div className="relative z-10 mt-auto pt-6 border-t border-[#232F46]/[0.08] group-hover:border-[#ED8C32]/25 transition-colors duration-500">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#232F46]/[0.05] flex items-center justify-center group-hover:bg-[#FFF8F2] transition-colors duration-500">
                        <ArrowRight className="h-4 w-4 text-[#232F46]/55 group-hover:text-[#ED8C32] transform group-hover:rotate-[-45deg] transition-all duration-500" />
                      </div>
                      <span className="font-semibold text-[14px] text-[#232F46] tracking-[-0.01em]">
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
