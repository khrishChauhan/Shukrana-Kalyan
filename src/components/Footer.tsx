/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import { Award, Mail, Phone, MapPin, Heart, ArrowUpRight, Github, Twitter, Facebook, Linkedin } from 'lucide-react';

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

  return (
    <footer className="bg-slate-950 text-slate-400 pt-20 pb-10 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 4 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-900">
          
          {/* Col 1: Foundation Info (4 Colswide on large) */}
          <div className="lg:col-span-4 text-left">
            <Link to="/" className="flex items-center gap-3 mb-6" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="p-2 bg-brand-gold rounded-xl text-slate-950 shadow-md">
                <Award className="h-5.5 w-5.5 stroke-[2.2]" />
              </div>
              <div>
                <span className="block font-bold tracking-tight text-white text-[15px] uppercase leading-tight font-display">
                  Shukrana Kalyan Sangh
                </span>
                <span className="block text-[9px] text-amber-400 uppercase tracking-widest font-mono font-bold leading-none mt-0.5">
                  Foundation
                </span>
              </div>
            </Link>
            
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              An accredited welfare organization dedicated to systematic social infrastructure development, pediatric-driven clinics, and financial empowerment models across marginalized zones.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 hover:bg-brand-gold/15 text-slate-400 hover:text-brand-gold border border-slate-800/80 rounded-xl transition-all" aria-label="Twitter Header Link">
                <Twitter className="h-4.5 w-4.5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 hover:bg-brand-gold/15 text-slate-400 hover:text-brand-gold border border-slate-800/80 rounded-xl transition-all" aria-label="Facebook Header Link">
                <Facebook className="h-4.5 w-4.5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 hover:bg-brand-gold/15 text-slate-400 hover:text-brand-gold border border-slate-800/80 rounded-xl transition-all" aria-label="LinkedIn Header Link">
                <Linkedin className="h-4.5 w-4.5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 hover:bg-brand-gold/15 text-slate-400 hover:text-brand-gold border border-slate-800/80 rounded-xl transition-all" aria-label="Github Header Link">
                <Github className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (2 Colswide) */}
          <div className="lg:col-span-2 text-left">
            <h4 className="text-white font-semibold font-display tracking-wide text-sm uppercase mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1 group">
                  <span>Home</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollToSection('about')} className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1 group">
                  <span>About Us</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollToSection('programs')} className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1 group">
                  <span>Our Programs</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollToSection('gallery')} className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1 group">
                  <span>Photo Gallery</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollToSection('contact')} className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1 group">
                  <span>Contact Info</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Programs (3 Colswide) */}
          <div className="lg:col-span-3 text-left">
            <h4 className="text-white font-semibold font-display tracking-wide text-sm uppercase mb-6">
              Impact Programs
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li>
                <button onClick={() => handleScrollToSection('programs')} className="hover:text-amber-400 text-left transition-colors cursor-pointer block">
                  Education Support Program
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollToSection('programs')} className="hover:text-amber-400 text-left transition-colors cursor-pointer block">
                  Mobile Healthcare Initiative
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollToSection('programs')} className="hover:text-amber-400 text-left transition-colors cursor-pointer block">
                  Self-Help Women Guilds
                </button>
              </li>
              <li>
                <button onClick={onOpenDonateModal} className="text-brand-gold font-bold flex items-center gap-1 hover:underline transition-all cursor-pointer">
                  <span>General Support Fund</span>
                  <Heart className="h-3 w-3 fill-brand-gold stroke-none" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info (3 Colswide) */}
          <div className="lg:col-span-3 text-left">
            <h4 className="text-white font-semibold font-display tracking-wide text-sm uppercase mb-6">
              Contact Info
            </h4>
            <ul className="space-y-4 text-sm-custom">
              <li className="flex gap-3 items-start text-xs sm:text-sm">
                <MapPin className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                <span>Headquarters: Plot No 42, Kalyan Marg, Institutional Area, Sector 5, New Delhi 110001, India</span>
              </li>
              <li className="flex gap-3 items-center text-xs sm:text-sm">
                <Phone className="h-4.5 w-4.5 text-brand-gold shrink-0" />
                <a href="tel:+911145678901" className="hover:text-white transition-all">+91 11 4567 8901</a>
              </li>
              <li className="flex gap-3 items-center text-xs sm:text-sm">
                <Mail className="h-4.5 w-4.5 text-brand-gold shrink-0" />
                <a href="mailto:info@shukranafoundation.org" className="hover:text-white transition-all">info@shukranafoundation.org</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-10 text-xs text-slate-500 font-mono">
          <p>© {currentYear} Shukrana Kalyan Sangh Foundation. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#tax" className="hover:text-slate-400 transition-colors">80G Certificate</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
