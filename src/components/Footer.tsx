/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import { Award, Mail, Phone, MapPin, Heart, ArrowUpRight, Github, Twitter, Facebook, Linkedin, ShieldCheck, CheckCircle2, Globe2 } from 'lucide-react';
import { motion } from 'motion/react';

interface FooterProps {
  onOpenDonateModal: () => void;
}

export default function Footer({ onOpenDonateModal }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <footer className="relative bg-[#232F46] text-white pt-24 lg:pt-28 pb-12 overflow-hidden border-t border-white/[0.06]">
      {/* Subtle structured grid, masked */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_30%,transparent_85%)] pointer-events-none z-0" />

      {/* Pre-Footer Impact Banner */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 mb-20 lg:mb-24 text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-white/[0.04] border border-white/10 rounded-[28px] p-8 lg:p-12 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-md"
        >
          <div className="absolute top-0 left-0 w-[420px] h-full bg-[radial-gradient(ellipse_at_left,rgba(237,140,50,0.10),transparent_70%)] pointer-events-none" />

          <div className="relative z-10 max-w-2xl text-left">
             <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#ED8C32]/10 border border-[#ED8C32]/25 rounded-full mb-6">
                <Globe2 className="h-3.5 w-3.5 text-[#ED8C32]" />
                <span className="text-[10px] font-semibold text-[#ED8C32] uppercase tracking-[0.18em]">Global Impact Mission</span>
             </div>
             <h3 className="text-[26px] sm:text-[32px] lg:text-[38px] font-semibold text-white font-display leading-[1.12] tracking-[-0.02em] text-left">
               Empowering Communities Through <span className="text-[#ED8C32]">Education, Healthcare &amp; Sustainable Development</span>
             </h3>
          </div>

          <div className="relative z-10 shrink-0 flex items-center gap-6 sm:gap-10 text-left">
             <div className="text-left">
               <span className="block text-[34px] sm:text-[42px] font-display font-bold text-white leading-none mb-1.5 tracking-[-0.02em]">1.2M+</span>
               <span className="text-[11px] text-white/45 uppercase tracking-[0.16em] font-semibold">Lives Impacted</span>
             </div>
             <div className="w-px h-14 bg-white/10" />
             <div className="text-left">
               <span className="block text-[34px] sm:text-[42px] font-display font-bold text-white leading-none mb-1.5 tracking-[-0.02em]">240+</span>
               <span className="text-[11px] text-white/45 uppercase tracking-[0.16em] font-semibold">Active Villages</span>
             </div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 relative z-10 text-left">
        {/* Main 4 Column Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-20"
        >
          {/* Col 1: Foundation Info */}
          <motion.div variants={itemVariants} className="lg:col-span-4 text-left">
            <Link to="/" className="inline-flex items-center gap-3 mb-7 group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="relative p-2.5 bg-[#ED8C32] rounded-xl text-[#232F46] shadow-[0_8px_24px_rgba(237,140,50,0.25)]">
                <Award className="h-6 w-6 stroke-[2]" />
              </div>
              <div className="text-left">
                <span className="block font-semibold tracking-[-0.01em] text-white text-[17px] leading-tight font-display">
                  Shukrana Kalyan Sangh
                </span>
                <span className="block text-[9.5px] text-[#ED8C32] uppercase tracking-[0.28em] font-semibold leading-none mt-1">
                  Foundation
                </span>
              </div>
            </Link>

            <p className="text-white/55 text-[14.5px] leading-[1.85] mb-7 max-w-sm">
              An accredited welfare organization dedicated to systematic social infrastructure development, pediatric-driven clinics, and financial empowerment models across marginalized zones.
            </p>

            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/[0.05] border border-white/10 rounded-full mb-9 text-left">
               <ShieldCheck className="h-4 w-4 text-[#ED8C32]" />
               <span className="text-[11px] font-semibold text-white/75 uppercase tracking-[0.14em]">Govt. Registered NGO</span>
            </div>

            {/* Social Icons */}
            <div className="flex gap-2.5 text-left mb-8">
              {[
                { icon: Twitter, label: 'Twitter', url: 'https://twitter.com' },
                { icon: Facebook, label: 'Facebook', url: 'https://facebook.com' },
                { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com' },
                { icon: Github, label: 'GitHub', url: 'https://github.com' }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group relative p-3 bg-white/[0.05] hover:bg-[#ED8C32] border border-white/10 hover:border-[#ED8C32] rounded-xl transition-all duration-300"
                >
                  <social.icon className="relative z-10 h-4 w-4 text-white/65 group-hover:text-[#232F46] transition-colors" />
                </a>
              ))}
            </div>

            {/* Corporate Logo */}
            <div className="pt-6 border-t border-white/10 max-w-[240px]">
              <img 
                src="/footer-logo.jpg" 
                alt="Shukrana Digital Private Limited" 
                className="w-full h-auto rounded-lg border border-white/10 shadow-sm filter brightness-90 hover:brightness-100 transition-all duration-300" 
              />
            </div>
          </motion.div>

          {/* Col 2: Quick Links */}
          <motion.div variants={itemVariants} className="lg:col-span-2 text-left">
            <h4 className="text-white font-semibold font-display tracking-[-0.01em] text-[14px] mb-7 flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ED8C32]" />
              Quick Links
            </h4>
            <ul className="space-y-3.5 text-left">
              {[
                { name: 'Home', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
                { name: 'About Us', action: () => handleScrollToSection('about') },
                { name: 'Our Programs', action: () => handleScrollToSection('programs') },
                { name: 'Photo Gallery', action: () => handleScrollToSection('gallery') },
                { name: 'Contact Info', action: () => handleScrollToSection('contact') }
              ].map((item, i) => (
                <li key={i}>
                  <button onClick={item.action} className="relative group text-white/55 hover:text-white transition-colors cursor-pointer flex items-center gap-2 text-[14.5px] font-normal text-left">
                    <span className="relative">
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#ED8C32] transition-all duration-300 group-hover:w-full" />
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 transform" />
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3: Programs */}
          <motion.div variants={itemVariants} className="lg:col-span-3 text-left">
            <h4 className="text-white font-semibold font-display tracking-[-0.01em] text-[14px] mb-7 flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ED8C32]" />
              Impact Programs
            </h4>
            <ul className="space-y-3.5 text-left">
              {[
                { name: 'Education Support Program', id: 'programs' },
                { name: 'Mobile Healthcare Initiative', id: 'programs' },
                { name: 'Self-Help Women Guilds', id: 'programs' }
              ].map((prog, i) => (
                <li key={i}>
                  <button onClick={() => handleScrollToSection(prog.id)} className="group flex items-center gap-3 text-white/55 hover:text-white transition-colors cursor-pointer text-[14.5px] font-normal text-left">
                    <div className="w-6 h-6 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#ED8C32]/50 group-hover:bg-[#ED8C32]/10 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/30 group-hover:bg-[#ED8C32] transition-colors" />
                    </div>
                    {prog.name}
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={onOpenDonateModal}
                  className="group flex items-center gap-3 px-4 py-3 bg-[#ED8C32]/10 hover:bg-[#ED8C32]/20 border border-[#ED8C32]/20 hover:border-[#ED8C32]/40 rounded-xl text-[#ED8C32] font-semibold text-[14px] transition-all cursor-pointer text-left w-full sm:w-auto"
                >
                  General Support Fund
                  <Heart className="h-4 w-4 fill-current transform group-hover:scale-110 transition-transform" />
                </button>
              </li>
            </ul>
          </motion.div>

          {/* Col 4: Contact Info */}
          <motion.div variants={itemVariants} className="lg:col-span-3 text-left">
            <h4 className="text-white font-semibold font-display tracking-[-0.01em] text-[14px] mb-7 flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ED8C32]" />
              Contact Info
            </h4>
            <ul className="space-y-3 text-left">
              <li className="group flex gap-3.5 items-start p-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/10 rounded-2xl transition-colors duration-300">
                <div className="p-2.5 bg-white/[0.05] rounded-xl text-[#ED8C32] shrink-0 border border-white/[0.06] group-hover:bg-[#ED8C32]/10 transition-colors">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="text-[13.5px] leading-relaxed text-white/65 group-hover:text-white/90 transition-colors pt-1.5">
                  Plot No 42, Kalyan Marg, Sector 5, New Delhi 110001
                </span>
              </li>
              <li className="group flex gap-3.5 items-center p-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/10 rounded-2xl transition-colors duration-300">
                <div className="p-2.5 bg-white/[0.05] rounded-xl text-[#ED8C32] shrink-0 border border-white/[0.06] group-hover:bg-[#ED8C32]/10 transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                <a href="tel:+911145678901" className="text-[13.5px] text-white/65 group-hover:text-white transition-colors">
                  +91 11 4567 8901
                </a>
              </li>
              <li className="group flex gap-3.5 items-center p-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/10 rounded-2xl transition-colors duration-300">
                <div className="p-2.5 bg-white/[0.05] rounded-xl text-[#ED8C32] shrink-0 border border-white/[0.06] group-hover:bg-[#ED8C32]/10 transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <a href="mailto:info@shukranafoundation.org" className="text-[13.5px] text-white/65 group-hover:text-white transition-colors">
                  info@shukranafoundation.org
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Custom Visual Separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/15 to-transparent my-10" />

        {/* Trust Bar */}
        <div className="flex flex-wrap justify-center lg:justify-between items-center gap-6 mb-10 text-left">
           {[
             "Registered NGO",
             "Tax Exempt Organization",
             "Verified Impact Programs",
             "Community Driven Since 2026"
           ].map((badge, i) => (
             <div key={i} className="flex items-center gap-2 group cursor-default text-left">
                <CheckCircle2 className="h-4 w-4 text-white/30 group-hover:text-[#ED8C32] transition-colors" />
                <span className="text-[12px] font-medium text-white/45 group-hover:text-white/80 transition-colors">{badge}</span>
             </div>
           ))}
        </div>

        {/* Bottom Copyright bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-[12px] text-white/40 font-medium text-left">
          <p className="text-left">© {currentYear} Shukrana Kalyan Sangh Foundation. All Rights Reserved.</p>
          <div className="flex flex-wrap justify-center gap-6 text-left">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#tax" className="hover:text-[#ED8C32] transition-colors font-semibold">80G Certificate</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
