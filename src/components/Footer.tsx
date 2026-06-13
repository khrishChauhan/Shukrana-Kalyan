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
    <footer className="relative bg-[#232F46] text-white pt-24 lg:pt-32 pb-12 overflow-hidden border-t border-white/5">
      {/* Background with Deep Navy */}
      <div className="absolute inset-0 bg-[#232F46] z-0" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none z-0" />
      
      {/* Ambient Lighting Removed for Premium Flat Look */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] max-w-[1000px] h-[100px] pointer-events-none z-0" />

      {/* Pre-Footer Impact Banner */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-20 lg:mb-28 text-left">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-[32px] p-8 lg:p-12 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-md shadow-[0_24px_64px_rgba(0,0,0,0.4)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#ED8C32]/10 to-transparent opacity-50 mix-blend-overlay" />
          
          <div className="relative z-10 max-w-2xl text-left">
             <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#ED8C32]/10 border border-[#ED8C32]/20 rounded-full mb-6">
                <Globe2 className="h-3.5 w-3.5 text-[#ED8C32]" />
                <span className="text-[10px] font-mono font-bold text-[#ED8C32] uppercase tracking-widest">Global Impact Mission</span>
             </div>
             <h3 className="text-[28px] sm:text-[32px] lg:text-[40px] font-bold text-white font-display leading-[1.1] tracking-tight text-left">
               Empowering Communities Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/90 to-white/50">Education, Healthcare & Sustainable Development</span>
             </h3>
          </div>

          <div className="relative z-10 shrink-0 flex items-center gap-6 sm:gap-10 text-left">
             <div className="text-left">
               <span className="block text-[32px] sm:text-[40px] font-display font-bold text-white leading-none mb-1 shadow-[0_2px_12px_rgba(255,255,255,0.1)]">1.2M+</span>
               <span className="text-[12px] font-mono text-white/50 uppercase tracking-widest font-semibold">Lives Impacted</span>
             </div>
             <div className="w-px h-16 bg-white/10" />
             <div className="text-left">
               <span className="block text-[32px] sm:text-[40px] font-display font-bold text-white leading-none mb-1 shadow-[0_2px_12px_rgba(255,255,255,0.1)]">240+</span>
               <span className="text-[12px] font-mono text-white/50 uppercase tracking-widest font-semibold">Active Villages</span>
             </div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
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
            <Link to="/" className="inline-flex items-center gap-3.5 mb-8 group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="relative">
                <div className="relative p-3 bg-gradient-to-br from-[#ED8C32] to-[#ED8C32] rounded-[16px] text-white shadow-[0_8px_24px_rgba(35,47,70,0.3)]">
                  <Award className="h-6 w-6 stroke-[2]" />
                </div>
              </div>
              <div className="text-left">
                <span className="block font-bold tracking-tight text-white text-[18px] uppercase leading-tight font-display drop-shadow-sm">
                  Shukrana Kalyan Sangh
                </span>
                <span className="block text-[10px] text-[#ED8C32] uppercase tracking-[0.2em] font-mono font-bold leading-none mt-1">
                  Foundation
                </span>
              </div>
            </Link>
            
            <p className="text-white/60 text-[15px] leading-[1.8] mb-8 max-w-sm">
              An accredited welfare organization dedicated to systematic social infrastructure development, pediatric-driven clinics, and financial empowerment models across marginalized zones.
            </p>

            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-10 shadow-sm text-left">
               <ShieldCheck className="h-4 w-4 text-[#ED8C32]" />
               <span className="text-[11px] font-mono font-bold text-white/80 uppercase tracking-widest">Govt. Registered NGO</span>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 text-left">
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
                  className="group relative p-3 bg-white/5 hover:bg-[#ED8C32]/90 border border-white/10 hover:border-[#ED8C32] rounded-full transition-all duration-300 shadow-sm"
                >
                  <social.icon className="relative z-10 h-4.5 w-4.5 text-white/70 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Col 2: Quick Links */}
          <motion.div variants={itemVariants} className="lg:col-span-2 text-left">
            <h4 className="text-white font-bold font-display tracking-wider text-[15px] mb-8 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ED8C32]" />
              Quick Links
            </h4>
            <ul className="space-y-4 text-left">
              {[
                { name: 'Home', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
                { name: 'About Us', action: () => handleScrollToSection('about') },
                { name: 'Our Programs', action: () => handleScrollToSection('programs') },
                { name: 'Photo Gallery', action: () => handleScrollToSection('gallery') },
                { name: 'Contact Info', action: () => handleScrollToSection('contact') }
              ].map((item, i) => (
                <li key={i}>
                  <button onClick={item.action} className="relative group text-white/60 hover:text-white transition-colors cursor-pointer flex items-center gap-2 text-[15px] font-medium text-left">
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
            <h4 className="text-white font-bold font-display tracking-wider text-[15px] mb-8 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ED8C32]" />
              Impact Programs
            </h4>
            <ul className="space-y-4 text-left">
              {[
                { name: 'Education Support Program', id: 'programs' },
                { name: 'Mobile Healthcare Initiative', id: 'programs' },
                { name: 'Self-Help Women Guilds', id: 'programs' }
              ].map((prog, i) => (
                <li key={i}>
                  <button onClick={() => handleScrollToSection(prog.id)} className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors cursor-pointer text-[15px] font-medium text-left">
                    <div className="w-6 h-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#ED8C32]/50 group-hover:bg-[#ED8C32]/10 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/30 group-hover:bg-[#ED8C32] transition-colors" />
                    </div>
                    {prog.name}
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <button 
                  onClick={onOpenDonateModal} 
                  className="group flex items-center gap-3 px-4 py-3 bg-[#ED8C32]/10 hover:bg-[#ED8C32]/20 border border-[#ED8C32]/20 hover:border-[#ED8C32]/40 rounded-xl text-[#ED8C32] font-bold text-[14px] transition-all cursor-pointer text-left w-full sm:w-auto"
                >
                  General Support Fund
                  <Heart className="h-4 w-4 fill-current transform group-hover:scale-110 transition-transform" />
                </button>
              </li>
            </ul>
          </motion.div>

          {/* Col 4: Contact Info */}
          <motion.div variants={itemVariants} className="lg:col-span-3 text-left">
            <h4 className="text-white font-bold font-display tracking-wider text-[15px] mb-8 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ED8C32]" />
              Contact Info
            </h4>
            <ul className="space-y-5 text-left">
              <li className="group flex gap-4 items-start p-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-[16px] transition-colors duration-300">
                <div className="p-2.5 bg-white/5 rounded-xl text-[#ED8C32] shrink-0 border border-white/5 group-hover:bg-[#ED8C32]/10 transition-colors">
                  <MapPin className="h-4.5 w-4.5" />
                </div>
                <span className="text-[14px] leading-relaxed text-white/70 group-hover:text-white/90 transition-colors pt-1">
                  Plot No 42, Kalyan Marg, Sector 5, New Delhi 110001
                </span>
              </li>
              <li className="group flex gap-4 items-center p-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-[16px] transition-colors duration-300">
                <div className="p-2.5 bg-white/5 rounded-xl text-[#ED8C32] shrink-0 border border-white/5 group-hover:bg-[#ED8C32]/10 transition-colors">
                  <Phone className="h-4.5 w-4.5" />
                </div>
                <a href="tel:+911145678901" className="text-[14px] text-white/70 group-hover:text-white transition-colors mt-0.5">
                  +91 11 4567 8901
                </a>
              </li>
              <li className="group flex gap-4 items-center p-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-[16px] transition-colors duration-300">
                <div className="p-2.5 bg-white/5 rounded-xl text-[#ED8C32] shrink-0 border border-white/5 group-hover:bg-[#ED8C32]/10 transition-colors">
                  <Mail className="h-4.5 w-4.5" />
                </div>
                <a href="mailto:info@shukranafoundation.org" className="text-[14px] text-white/70 group-hover:text-white transition-colors mt-0.5">
                  info@shukranafoundation.org
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Custom Visual Separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-10" />

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
                <span className="text-[12px] font-semibold text-white/50 group-hover:text-white/80 transition-colors">{badge}</span>
             </div>
           ))}
        </div>

        {/* Bottom Copyright bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-[12px] text-white/40 font-medium text-left">
          <p className="text-left font-mono">© {currentYear} Shukrana Kalyan Sangh Foundation. All Rights Reserved.</p>
          <div className="flex flex-wrap justify-center gap-6 text-left">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#tax" className="hover:text-[#ED8C32] transition-colors font-bold">80G Certificate</a>
          </div>
        </div>

      </div>
    </footer>
  );
}