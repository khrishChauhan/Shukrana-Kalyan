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
    }, 5000);
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
      className="relative min-h-[100vh] flex items-center bg-white pt-[168px] pb-32 overflow-hidden"
    >
      {/* Faint structural grid + soft radial wash (single-color, premium) */}
      <div className="absolute inset-0 bg-grid-faint [mask-image:radial-gradient(ellipse_75%_70%_at_50%_30%,#000_30%,transparent_80%)] pointer-events-none z-0" />
      <div className="absolute -top-32 right-0 w-[640px] h-[640px] bg-[radial-gradient(circle,rgba(237,140,50,0.10),transparent_65%)] pointer-events-none z-0" />
      <div className="absolute -bottom-40 -left-20 w-[560px] h-[560px] bg-[radial-gradient(circle,rgba(35,47,70,0.05),transparent_65%)] pointer-events-none z-0" />

      <div className="max-w-[1280px] w-full mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center h-full">

          {/* Left Column (Copy and Actions) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left max-w-2xl lg:max-w-none relative z-20">

            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 pl-2 pr-4 py-2 bg-white border border-[#232F46]/[0.08] shadow-[0_2px_10px_rgba(35,47,70,0.05)] rounded-full mb-9 w-fit group"
            >
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#FFF8F2]">
                <Sparkles className="h-3.5 w-3.5 text-[#ED8C32] group-hover:scale-110 transition-transform duration-300" />
              </span>
              <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#232F46]/70">
                Empowering Communities Since 2026
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="text-[46px] sm:text-[62px] lg:text-[74px] font-bold tracking-[-0.045em] text-[#232F46] leading-[1.04] mb-7 font-display flex flex-col"
            >
              <span>Together We Build</span>
              <span className="text-[#ED8C32]">
                A Better Future
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="text-[17px] sm:text-[19px] text-[#232F46]/65 leading-[1.7] mb-12 max-w-[34rem] font-normal tracking-[-0.01em]"
            >
              Shukrana Kalyan Sangh Foundation is a global welfare movement committed to scaling modern-driven grassroot developments. We implement actionable solutions across specialized education labs, pediatric dispensaries, and sustainable female micro-guilds.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4 w-full"
            >
              <button
                onClick={onOpenDonateModal}
                className="group relative w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 bg-[#ED8C32] text-[#232F46] rounded-2xl font-semibold shadow-[0_6px_20px_rgba(237,140,50,0.30)] hover:shadow-[0_12px_30px_rgba(237,140,50,0.42)] transform hover:-translate-y-1 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] text-[16px] cursor-pointer"
              >
                <Heart className="h-5 w-5 fill-[#232F46] stroke-none group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-400" />
                <span className="tracking-[-0.01em]">Donate Now</span>
              </button>

              <button
                onClick={handleScrollToPrograms}
                className="group w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 bg-white border border-[#232F46]/15 hover:border-[#232F46]/30 rounded-2xl text-[#232F46] font-semibold text-[16px] shadow-[0_2px_10px_rgba(35,47,70,0.04)] hover:shadow-[0_8px_22px_rgba(35,47,70,0.08)] transform hover:-translate-y-1 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
              >
                <span className="tracking-[-0.01em]">Learn More</span>
                <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-400 text-[#232F46]" />
              </button>
            </motion.div>
          </div>

          {/* Right Column (Interactive Carousel & Floating Badges) */}
          <div className="lg:col-span-5 relative flex justify-center items-center h-full w-full mt-16 lg:mt-0 perspective-1000">

            {/* Layered Card Effect underlying shapes */}
            <div className="absolute top-5 -right-3 w-full aspect-[4/3] sm:aspect-[1.05] max-w-xl sm:max-w-2xl rounded-[28px] border border-[#232F46]/[0.06] bg-[#FFF8F2] rotate-3 z-0" />
            <div className="absolute top-2.5 -right-1.5 w-full aspect-[4/3] sm:aspect-[1.05] max-w-xl sm:max-w-2xl rounded-[28px] border border-[#232F46]/[0.06] bg-white shadow-[0_4px_16px_rgba(35,47,70,0.04)] rotate-[1.5deg] z-0" />

            {/* Main Carousel viewport */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-[4/3] sm:aspect-[1.05] max-w-xl sm:max-w-2xl rounded-[28px] shadow-[0_24px_56px_rgba(35,47,70,0.14)] border border-[#232F46]/[0.06] overflow-hidden group bg-white p-2 z-10"
            >
              <div className="relative w-full h-full rounded-[22px] overflow-hidden">
                {/* Carousel Image container */}
                <div className="absolute inset-0 w-full h-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, scale: 1.06 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-[#232F46]/85 via-[#232F46]/15 to-transparent z-10" />
                      <img
                        src={CAROUSEL_IMAGES[currentSlide].url}
                        alt={CAROUSEL_IMAGES[currentSlide].title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transform scale-[1.01]"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Dynamic Overlaid description */}
                <div className="absolute bottom-5 left-5 right-5 z-20 text-left p-5 flex flex-col gap-1.5 rounded-[18px] bg-white/10 backdrop-blur-xl border border-white/20">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <h3 className="text-white font-semibold leading-tight text-lg sm:text-2xl font-display mb-1.5 tracking-[-0.01em]">
                        {CAROUSEL_IMAGES[currentSlide].title}
                      </h3>
                      <p className="text-white/80 text-sm sm:text-[15px] line-clamp-2 font-normal leading-snug">
                        {CAROUSEL_IMAGES[currentSlide].subtitle}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Manual Control buttons */}
                <button
                  onClick={handlePrevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/10 hover:bg-white/30 backdrop-blur-md border border-white/20 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110 cursor-pointer"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={handleNextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/10 hover:bg-white/30 backdrop-blur-md border border-white/20 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110 cursor-pointer"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                {/* Index indicators */}
                <div className="absolute top-5 right-5 z-30 flex gap-2">
                  {CAROUSEL_IMAGES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer ${
                        currentSlide === idx ? 'w-7 bg-[#ED8C32]' : 'w-2 bg-white/45 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating cards (Status) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: -24 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: [0, -12, 0] }}
              transition={{
                opacity: { duration: 0.8, delay: 0.5 },
                scale: { duration: 0.8, delay: 0.5 },
                x: { duration: 0.8, delay: 0.5 },
                y: { repeat: Infinity, duration: 7, ease: 'easeInOut' }
              }}
              className="absolute top-8 -left-5 lg:-left-10 z-30 hidden sm:flex items-center gap-3.5 bg-white/95 backdrop-blur-xl p-3.5 pr-6 rounded-2xl shadow-[0_16px_44px_rgba(35,47,70,0.12)] border border-[#232F46]/[0.06] hover:-translate-y-2 transition-transform duration-500 cursor-default"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#232F46] text-white flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <div className="text-left">
                <p className="text-[10px] font-semibold text-[#232F46]/50 uppercase tracking-[0.22em] leading-none mb-1.5">Status</p>
                <p className="text-[15px] font-bold text-[#232F46] leading-tight tracking-[-0.01em]">100% Transparency</p>
              </div>
            </motion.div>

            {/* Floating cards (Assisted) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 24 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: [0, 15, 0] }}
              transition={{
                opacity: { duration: 0.8, delay: 0.6 },
                scale: { duration: 0.8, delay: 0.6 },
                x: { duration: 0.8, delay: 0.6 },
                y: { repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 1 }
              }}
              className="absolute bottom-14 -right-5 lg:-right-7 z-30 hidden sm:flex items-center gap-3.5 bg-white/95 backdrop-blur-xl p-3.5 pr-6 rounded-2xl shadow-[0_16px_44px_rgba(35,47,70,0.12)] border border-[#232F46]/[0.06] hover:-translate-y-2 transition-transform duration-500 cursor-default"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#ED8C32] text-[#232F46] flex items-center justify-center">
                <Heart className="h-6 w-6 fill-[#232F46] stroke-none" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-semibold text-[#232F46]/50 uppercase tracking-[0.22em] leading-none mb-1.5">Assisted</p>
                <p className="text-[15px] font-bold text-[#232F46] leading-tight tracking-[-0.01em]">5k+ Beneficiaries</p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
