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
      className="relative min-h-[100vh] flex items-center bg-[#FFFFFF] pt-[160px] pb-32 overflow-hidden"
    >
      {/* Background patterns: subtle grain */}
      <div className="absolute inset-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay pointer-events-none z-0" />

      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-14 items-center h-full">
          
          {/* Left Column (Copy and Actions) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left max-w-2xl lg:max-w-[110%] relative z-20">
            
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-4 py-2 bg-white backdrop-blur-xl border border-[#ED8C32]/40 shadow-sm rounded-full text-[#232F46] text-xs font-semibold uppercase tracking-wider mb-8 w-fit group"
            >
              <div className="relative flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-[#ED8C32] relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="text-[#232F46]/80">
                Empowering Communities Since 2026
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[48px] sm:text-[64px] lg:text-[76px] font-extrabold tracking-[-0.04em] text-[#232F46] leading-[1.15] mb-8 font-display flex flex-col gap-2"
            >
              <span>Together We Build</span>
              <span className="text-[#ED8C32] pb-2">
                A Better Future
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[18px] sm:text-[21px] text-[#232F46]/70 leading-[1.65] mb-14 max-w-[95%] font-medium tracking-tight"
            >
              Shukrana Kalyan Sangh Foundation is a global welfare movement committed to scaling modern-driven grassroot developments. We implement actionable solutions across specialized education labs, pediatric dispensaries, and sustainable female micro-guilds.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-5 w-full"
            >
              <button
                onClick={onOpenDonateModal}
                className="group relative w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4.5 bg-[#ED8C32] hover:bg-[#ED8C32] text-[#232F46] rounded-[20px] font-bold shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-400 text-[16px] cursor-pointer overflow-hidden border border-transparent"
              >
                <Heart className="h-5 w-5 fill-[#232F46] stroke-none relative z-10 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-400" />
                <span className="relative z-10 tracking-wide">Donate Now</span>
              </button>
              
              <button
                onClick={handleScrollToPrograms}
                className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4.5 bg-white hover:bg-[#FFF8F2] border border-[#232F46] hover:border-[#232F46] rounded-[20px] text-[#232F46] font-semibold text-[16px] shadow-sm transform hover:-translate-y-0.5 transition-all duration-400 cursor-pointer"
              >
                <span>Learn More</span>
                <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 group-hover:scale-110 transition-transform duration-400 text-[#232F46]" />
              </button>
            </motion.div>
          </div>

          {/* Right Column (Interactive Carousel & Floating Badges) */}
          <div className="lg:col-span-5 relative flex justify-center items-center h-full w-full mt-20 lg:mt-0 perspective-1000 lg:pl-6">
            
            {/* Layered Card Effect underlying shapes */}
            <div className="absolute top-4 -right-4 w-full aspect-[4/3] sm:aspect-[1.1] max-w-xl sm:max-w-2xl rounded-[32px] border border-black/5 bg-gray-100 shadow-sm rotate-3 z-0" />
            <div className="absolute top-2 -right-2 w-full aspect-[4/3] sm:aspect-[1.1] max-w-xl sm:max-w-2xl rounded-[32px] border border-[#232F46]/5 bg-white shadow-sm rotate-1 z-0" />

            {/* Main Carousel viewport (Layered Card Effect) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, rotateX: 5 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-[4/3] sm:aspect-[1.1] max-w-xl sm:max-w-2xl rounded-[32px] shadow-[0_16px_48px_rgba(27,39,63,0.08)] border border-[#232F46]/5 overflow-hidden group bg-white p-2 z-10"
            >
              <div className="relative w-full h-full rounded-[24px] overflow-hidden">
                {/* Carousel Image container */}
                <div className="absolute inset-0 w-full h-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-[#232F46]/80 via-[#232F46]/20 to-transparent z-10 mix-blend-multiply" />
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
                <div className="absolute bottom-6 left-6 right-6 z-20 text-left p-6 flex flex-col gap-2 rounded-[20px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <h3 className="text-white font-bold leading-tight text-lg sm:text-2xl font-display mb-2 drop-shadow-md">
                        {CAROUSEL_IMAGES[currentSlide].title}
                      </h3>
                      <p className="text-white/80 text-sm sm:text-base line-clamp-2 font-medium">
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
                <div className="absolute top-6 right-6 z-30 flex gap-2">
                  {CAROUSEL_IMAGES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2 rounded-full transition-all duration-500 ease-out cursor-pointer ${
                        currentSlide === idx ? 'w-8 bg-brand-primary shadow-sm' : 'w-2 bg-white/40 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating cards (Status) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: -30 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: [0, -12, 0] }}
              transition={{ 
                opacity: { duration: 0.8, delay: 0.5 },
                scale: { duration: 0.8, delay: 0.5 },
                x: { duration: 0.8, delay: 0.5 },
                y: { repeat: Infinity, duration: 7, ease: 'easeInOut' } 
              }}
              className="absolute top-10 -left-6 lg:-left-12 z-30 hidden sm:flex items-center gap-4 bg-white/90 backdrop-blur-2xl p-4 pr-6 rounded-[24px] shadow-[0_12px_40px_rgba(27,39,63,0.08)] border border-[#232F46]/5 hover:-translate-y-2 hover:shadow-[0_20px_56px_rgba(27,39,63,0.12)] transition-all duration-500 cursor-default"
            >
              <div className="w-14 h-14 rounded-[18px] bg-[#232F46] text-white flex items-center justify-center font-bold shadow-sm border border-transparent">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <div className="text-left">
                <p className="text-[12px] font-mono font-bold text-[#232F46]/60 uppercase tracking-[0.2em] leading-none mb-1.5">Status</p>
                <p className="text-[16px] font-extrabold text-[#232F46] leading-tight">100% Transparency</p>
              </div>
            </motion.div>

            {/* Floating cards (Assisted) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: [0, 15, 0] }}
              transition={{ 
                opacity: { duration: 0.8, delay: 0.6 },
                scale: { duration: 0.8, delay: 0.6 },
                x: { duration: 0.8, delay: 0.6 },
                y: { repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 1 } 
              }}
              className="absolute bottom-16 -right-6 lg:-right-8 z-30 hidden sm:flex items-center gap-4 bg-white/90 backdrop-blur-2xl p-4 pr-6 rounded-[24px] shadow-[0_12px_40px_rgba(27,39,63,0.08)] border border-[#232F46]/5 hover:-translate-y-2 hover:shadow-[0_20px_56px_rgba(27,39,63,0.12)] transition-all duration-500 cursor-default"
            >
              <div className="w-14 h-14 rounded-[18px] bg-[#ED8C32] text-[#232F46] flex items-center justify-center font-bold shadow-sm border border-transparent">
                <Heart className="h-6 w-6 fill-[#232F46] stroke-none" />
              </div>
              <div className="text-left">
                <p className="text-[12px] font-mono font-bold text-[#232F46]/60 uppercase tracking-[0.2em] leading-none mb-1.5">Assisted</p>
                <p className="text-[16px] font-extrabold text-[#232F46] leading-tight">5k+ Beneficiaries</p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
