/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Search, Rocket, BarChart3, ChevronRight } from 'lucide-react';

export default function HowWeWork() {
  const steps = [
    {
      num: "01",
      title: "Identify Needs",
      desc: "Our field volunteers conduct exhaustive primary surveys in remote locations to document structural, sanitation, and clinical challenges firsthand.",
      icon: Search,
      color: "bg-amber-50 text-brand-gold border-amber-100",
      accent: "from-brand-gold to-amber-500"
    },
    {
      num: "02",
      title: "Execute Programs",
      desc: "We coordinate with vetted clinical experts, educational tutors, and regional contractors to roll out micro-targeted, high-integrity logistics.",
      icon: Rocket,
      color: "bg-sky-50 text-sky-600 border-sky-100",
      accent: "from-sky-500 to-indigo-500"
    },
    {
      num: "03",
      title: "Measure Impact",
      desc: "Every dollar raised is mapped directly to beneficiaries. We employ independent audits to benchmark program transparency and efficacy.",
      icon: BarChart3,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
      accent: "from-emerald-500 to-teal-500"
    }
  ];

  return (
    <section id="about" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Visual embellishments */}
      <div className="absolute right-0 top-0 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-10 bottom-0 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header content */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">OUR OPERATING BLUEPRINT</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3 mb-4 font-display">
            How We Work
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            We follow strict, data-driven developmental stages to turn donor goodwill into real-life human breakthroughs.
          </p>
        </div>

        {/* 3-Step Process Steps Grid */}
        <div className="relative">
          {/* Connecting Line (Only visible on desktop) */}
          <div className="hidden lg:block absolute top-[28%] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-amber-200/50 via-sky-200/50 to-emerald-250/50 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 relative z-10">
            {steps.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                  className="relative group flex flex-col items-center select-none text-center"
                >
                  {/* Step ID badge */}
                  <span className="absolute -top-4 font-display font-black text-6xl text-slate-200/70 group-hover:text-amber-200/50 transition-colors z-0 pointer-events-none">
                    {step.num}
                  </span>

                  {/* Icon Node Container */}
                  <div className={`relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center border ${step.color} shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 mb-6 bg-white overflow-hidden`}>
                    <div className={`absolute inset-0 bg-gradient-to-tr ${step.accent} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    <IconComp className="h-8 w-8 stroke-[1.8]" />
                  </div>

                  {/* Connecting Arrow for LG layouts */}
                  {idx < 2 && (
                    <div className="hidden lg:block absolute top-[18%] -right-4 text-slate-350">
                      <ChevronRight className="h-6 w-6 text-slate-300" />
                    </div>
                  )}

                  {/* Titles */}
                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-slate-800 transition-colors font-display">
                    {step.title}
                  </h3>

                  {/* Descriptions */}
                  <p className="text-slate-500 text-sm leading-relaxed max-w-sm px-2">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
