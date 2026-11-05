/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Headphones, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles,
  ShoppingBag,
  HeartHandshake
} from 'lucide-react';
import { motion } from 'motion/react';

export default function Footer() {
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
    <footer className="relative bg-[#1A2334] text-white pt-20 pb-12 overflow-hidden border-t border-white/[0.06]">
      {/* Subtle background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

      {/* Feature / Trust Badges Bar */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-5 sm:px-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-md">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#ED8C32]/15 border border-[#ED8C32]/30 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-[#ED8C32]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">100% Pure & Natural</h4>
              <p className="text-xs text-white/50 mt-0.5">Zero adulteration guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#ED8C32]/15 border border-[#ED8C32]/30 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6 text-[#ED8C32]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Pan-India Express Delivery</h4>
              <p className="text-xs text-white/50 mt-0.5">Fast & secure shipping</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#ED8C32]/15 border border-[#ED8C32]/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#ED8C32]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Certified Quality</h4>
              <p className="text-xs text-white/50 mt-0.5">Lab tested & hygienic packaging</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#ED8C32]/15 border border-[#ED8C32]/30 flex items-center justify-center shrink-0">
              <Headphones className="w-6 h-6 text-[#ED8C32]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Dedicated Support</h4>
              <p className="text-xs text-white/50 mt-0.5">Quick assistance & resolution</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 relative z-10 text-left">
        {/* Main 4 Column Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-14 pb-16"
        >
          {/* Col 1: Brand Info */}
          <motion.div variants={itemVariants} className="lg:col-span-4 text-left">
            <Link to="/" className="inline-block mb-5 group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img 
                src="/footer-logo.png" 
                alt="Shukrana" 
                className="h-16 w-auto object-contain transition-all duration-300 group-hover:scale-105"
              />
            </Link>

            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">
              Shukrana delivers farm-fresh, chemical-free kitchen spices and authentic Ayurvedic wellness tonics. Pure health, uncompromised quality, and fair community empowerment.
            </p>

            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/[0.05] border border-white/10 rounded-full text-xs font-semibold text-white/70">
              <ShieldCheck className="h-4 w-4 text-[#ED8C32]" />
              <span>100% Ayurvedic &amp; Natural Standard</span>
            </div>
          </motion.div>

          {/* Col 2: Shop & Categories */}
          <motion.div variants={itemVariants} className="lg:col-span-3 text-left">
            <h4 className="text-white font-semibold font-display text-[15px] mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ED8C32]" />
              Shop Categories
            </h4>
            <ul className="space-y-3 text-sm text-left">
              {[
                { name: '7-in-1 Mega Value Bundle (₹2100)', target: 'mega-bundle' },
                { name: 'Shukrana Pure Garam Masala', target: 'products' },
                { name: 'Chill Power Red Chilli Powder', target: 'products' },
                { name: 'Farm Fresh Coriander Powder', target: 'products' },
                { name: 'Pure Turmeric Powder (High Curcumin)', target: 'products' },
                { name: 'OjoBoost Ayurvedic Eye Tonic', target: 'products' },
                { name: 'Relax-Digest Ayurvedic Syrup', target: 'products' },
                { name: 'OjoBoost Family Health Tonic', target: 'products' },
              ].map((item, i) => (
                <li key={i}>
                  <button 
                    onClick={() => handleScrollToSection(item.target)}
                    className="text-white/60 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3: Quick Links & Member Portal */}
          <motion.div variants={itemVariants} className="lg:col-span-2 text-left">
            <h4 className="text-white font-semibold font-display text-[15px] mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ED8C32]" />
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-left">
              <li>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-white/60 hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollToSection('mega-bundle')} className="text-white/60 hover:text-white transition-colors">
                  Mega Bundle Offer
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollToSection('products')} className="text-white/60 hover:text-white transition-colors">
                  All Products
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollToSection('quality')} className="text-white/60 hover:text-white transition-colors">
                  Quality Assurance
                </button>
              </li>
              <li>
                <Link to="/login" className="text-[#ED8C32] font-semibold hover:underline">
                  Member Portal Login →
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-white/60 hover:text-white transition-colors">
                  Register as Member
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Col 4: Contact & Helpdesk */}
          <motion.div variants={itemVariants} className="lg:col-span-3 text-left">
            <h4 className="text-white font-semibold font-display text-[15px] mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ED8C32]" />
              Customer Support
            </h4>
            <ul className="space-y-3 text-left text-sm">
              <li className="flex gap-3 items-start p-3 bg-white/[0.04] border border-white/[0.06] rounded-xl">
                <MapPin className="h-4 w-4 text-[#ED8C32] shrink-0 mt-0.5" />
                <span className="text-xs text-white/70 leading-relaxed">
                  Sector 5, Main Commercial Hub, New Delhi, India 110001
                </span>
              </li>
              <li className="flex gap-3 items-center p-3 bg-white/[0.04] border border-white/[0.06] rounded-xl">
                <Phone className="h-4 w-4 text-[#ED8C32] shrink-0" />
                <a href="tel:+911145678901" className="text-xs text-white/70 hover:text-white transition-colors">
                  +91 11 4567 8901 / +91 98765 43210
                </a>
              </li>
              <li className="flex gap-3 items-center p-3 bg-white/[0.04] border border-white/[0.06] rounded-xl">
                <Mail className="h-4 w-4 text-[#ED8C32] shrink-0" />
                <a href="mailto:support@shukrana.org" className="text-xs text-white/70 hover:text-white transition-colors">
                  support@shukrana.org
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Separator */}
        <div className="w-full h-px bg-white/10 my-8" />

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center lg:justify-between items-center gap-4 text-xs text-white/45 mb-8">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#ED8C32]" />
            <span>FSSAI Compliant Quality Packaging</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#ED8C32]" />
            <span>100% Genuine Ayurvedic Formulas</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#ED8C32]" />
            <span>Safe &amp; Encrypted Online Ordering</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#ED8C32]" />
            <span>Community Empowerment Driven</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40 font-medium">
          <p>© {currentYear} Shukrana. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => alert("Privacy policy: Your information is safe and never shared.")} className="hover:text-white transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => alert("Terms of service: Authentic products with quick order dispatch.")} className="hover:text-white transition-colors">
              Terms of Service
            </button>
            <button onClick={() => alert("Refund policy: 7-day hassle-free replacement on damaged goods.")} className="hover:text-white transition-colors">
              Shipping &amp; Returns
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
