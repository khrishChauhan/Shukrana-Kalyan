import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Shield, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onOpenDonateModal: () => void;
}

export default function Navbar({ onOpenDonateModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '#home' },
    { name: 'About', path: '#about' },
    { name: 'Programs', path: '#programs' },
    { name: 'Gallery', path: '#gallery' },
    { name: 'Contact', path: '#contact' },
  ];

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      window.location.href = `/${id}`;
      return;
    }
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-6 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex justify-center w-full px-4 sm:px-8 pointer-events-none`}
      >
        <div 
          className={`w-full max-w-[1200px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-auto rounded-[28px] border border-white/50 bg-white/70 backdrop-blur-2xl shadow-[0_8px_32px_rgba(27,39,63,0.06)] ${
            isScrolled
              ? 'py-3.5 px-6 shadow-[0_16px_48px_rgba(27,39,63,0.12)] bg-white/85'
              : 'py-5 px-6'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <Link 
              to="/" 
              className="flex items-center gap-3.5 group text-left cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="p-2.5 bg-[#ED8C32] rounded-[16px] text-[#232F46] shadow-sm group-hover:bg-[#ED8C32] group-hover:scale-[1.03] transition-all duration-500 flex items-center justify-center relative overflow-hidden border border-transparent">
                <Award className="h-5 w-5 stroke-[2.2] relative z-10" />
              </div>
              <div className="flex flex-col">
                <span className="block font-bold tracking-tight text-[#232F46] text-[15px] sm:text-[17px] leading-tight font-display transition-colors duration-300">
                  Shukrana Kalyan Sangh
                </span>
                <span className="block text-[10.5px] text-[#232F46]/60 uppercase tracking-[0.2em] font-bold leading-[1] mt-0.5">
                  Foundation
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.path)}
                  className="relative group font-semibold text-sm text-[#232F46]/70 hover:text-[#232F46] transition-colors duration-300 cursor-pointer px-1 py-1"
                >
                  <span className="relative z-10">{link.name}</span>
                  <span className="absolute inset-x-0 -bottom-1 h-[2px] bg-[#ED8C32] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                </button>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/login"
                id="btn-nav-login"
                className="px-5 py-2.5 font-semibold text-[14px] text-[#232F46]/70 hover:text-[#232F46] rounded-[16px] border border-transparent hover:border-black/[0.08] hover:bg-black/[0.02] hover:shadow-sm transition-all duration-300"
              >
                Login
              </Link>
              <button
                id="btn-nav-donate"
                onClick={onOpenDonateModal}
                className="relative flex items-center gap-2.5 px-7 py-3 bg-[#ED8C32] text-[#232F46] hover:bg-[#ED8C32] rounded-[16px] font-bold text-[14px] shadow-sm transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer overflow-hidden group border border-transparent"
              >
                <Heart className="h-4 w-4 fill-[#232F46] stroke-none relative z-10 group-hover:scale-110 transition-transform duration-300" />
                <span className="relative z-10 tracking-wide">Donate Now</span>
              </button>
            </div>

            {/* Mobile Hamburger toggle */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={onOpenDonateModal}
                className="p-2 text-[#232F46] bg-[#232F46]/10 hover:bg-[#232F46]/20 rounded-xl mr-1 transition-colors"
                aria-label="Quick Donate"
              >
                <Heart className="h-5 w-5 fill-[#232F46] stroke-none" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-[#232F46] hover:bg-[#FFFFFF] rounded-xl transition-colors"
                id="mobile-menu-toggle"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden absolute top-full mt-2 left-4 right-4 rounded-2xl border border-white/50 bg-white/95 backdrop-blur-xl shadow-2xl overflow-hidden pointer-events-auto"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleLinkClick(link.path)}
                    className="block w-full text-left px-4 py-3 rounded-xl text-base font-semibold text-[#232F46] hover:bg-[#FFF8F2] hover:text-[#ED8C32] transition-colors"
                  >
                    {link.name}
                  </button>
                ))}
                <div className="pt-4 border-t border-gray-100 flex flex-col gap-3 px-4">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex justify-center items-center py-3 font-semibold text-sm text-[#232F46] hover:bg-[#FFFFFF] border border-gray-200 rounded-xl transition-colors"
                  >
                    Admin Login
                  </Link>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenDonateModal();
                    }}
                    className="flex justify-center items-center gap-2 py-3 bg-[#ED8C32] hover:bg-[#ED8C32] text-[#232F46] rounded-xl font-bold text-sm shadow-sm transition-all cursor-pointer"
                  >
                    <Heart className="h-4 w-4 fill-[#232F46] stroke-none" />
                    <span>Donate Now</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
