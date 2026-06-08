/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { CAROUSEL_IMAGES } from '../data';

interface HeroProps {
  onOpenDonateModal: () => void;
}

export default function Hero({ onOpenDonateModal }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
  };

  const handleScrollToPrograms = () => {
    const element = document.getElementById('programs');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[85vh] md:h-[80vh] flex items-center bg-slate-50 pt-[100px] pb-10 overflow-hidden"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-40 pointer-events-none animate-pulse duration-[10s]" />
      <div className="absolute top-[40%] right-[-10%] w-[400px] h-[400px] bg-sky-100 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center h-full">
          
          {/* Left Column (Copy and Actions) */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200/60 rounded-full text-brand-gold text-xs font-semibold uppercase tracking-wider mb-6 w-fit cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Empowering Communities Since 2026</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6 font-display"
            >
              Together We Build <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-amber-600">
                A Better Future
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-sm sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl"
            >
              Shukrana Kalyan Sangh Foundation is a global welfare movement committed to scaling modern-driven grassroot developments. We implement actionable solutions across specialized education labs, pediatric dispensaries, and sustainable female micro-guilds.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-4 w-full"
            >
              <button
                onClick={onOpenDonateModal}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 bg-brand-gold hover:bg-brand-gold-hover text-white rounded-xl font-bold hover:scale-[1.02] shadow-lg shadow-amber-400/20 active:scale-95 transition-all text-sm cursor-pointer"
              >
                <Heart className="h-4.5 w-4.5 fill-white stroke-none" />
                <span>Donate Now</span>
              </button>
              
              <button
                onClick={handleScrollToPrograms}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-semibold text-sm hover:scale-[1.02] transition-all cursor-pointer"
              >
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          </div>

          {/* Right Column (Interactive Carousel & Floating Badges) */}
          <div className="lg:col-span-6 relative flex justify-center items-center h-full w-full">
            
            {/* Subtle floating cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="absolute -top-4 -left-4 z-20 hidden sm:flex items-center gap-3 bg-white/95 p-3.5 rounded-2xl shadow-xl shadow-slate-200/80 border border-slate-150 glass-card"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <p className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest leading-none">Status</p>
                <p className="text-sm font-extrabold text-slate-800 leading-normal">100% Transparency</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
              className="absolute -bottom-4 right-10 z-20 hidden sm:flex items-center gap-3 bg-white/95 p-4 rounded-2xl shadow-xl shadow-slate-200/85 border border-slate-150 glass-card"
            >
              <div className="w-10 h-10 rounded-full bg-amber-50 text-brand-gold flex items-center justify-center font-bold">
                ❤
              </div>
              <div>
                <p className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest leading-none">Assisted</p>
                <p className="text-sm font-extrabold text-slate-800">5k+ Beneficiaries</p>
              </div>
            </motion.div>

            {/* Main Carousel viewport */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[1.5] max-w-xl sm:max-w-2xl bg-slate-900 rounded-3xl shadow-2xl overflow-hidden group">
              
              {/* Carousel Image container */}
              <div className="absolute inset-0 w-full h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent z-10" />
                    <img
                      src={CAROUSEL_IMAGES[currentSlide].url}
                      alt={CAROUSEL_IMAGES[currentSlide].title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Dynamic Overlaid description */}
              <div className="absolute bottom-6 left-6 right-6 z-20 text-left p-6 rounded-2xl bg-slate-950/40 backdrop-blur-md border border-white/5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-white font-bold leading-tight text-base sm:text-lg md:text-xl font-display mb-1.5 shadow-sm">
                      {CAROUSEL_IMAGES[currentSlide].title}
                    </h3>
                    <p className="text-slate-200 text-xs sm:text-sm line-clamp-2">
                      {CAROUSEL_IMAGES[currentSlide].subtitle}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Manual Control buttons */}
              <button
                onClick={handlePrevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-slate-900/60 hover:bg-slate-900/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-slate-900/60 hover:bg-slate-900/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Index indicators */}
              <div className="absolute top-4 right-4 z-30 flex gap-1.5">
                {CAROUSEL_IMAGES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlide === idx ? 'w-6 bg-brand-gold' : 'w-2 bg-white/60 hover:bg-white'
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
