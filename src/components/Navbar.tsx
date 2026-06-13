import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Award } from 'lucide-react';
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
        className={`fixed top-5 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex justify-center w-full px-4 sm:px-6 pointer-events-none`}
      >
        <div
          className={`w-full max-w-[1180px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-auto rounded-2xl border bg-white/80 backdrop-blur-xl ${
            isScrolled
              ? 'py-3 px-6 border-[#232F46]/[0.08] shadow-[0_8px_30px_rgba(35,47,70,0.10)] bg-white/90'
              : 'py-4 px-6 border-white/60 shadow-[0_4px_24px_rgba(35,47,70,0.05)]'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <Link
              to="/"
              className="flex items-center gap-3 group text-left cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="p-2.5 bg-[#ED8C32] rounded-xl text-[#232F46] group-hover:scale-[1.04] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center shadow-[0_4px_14px_rgba(237,140,50,0.32)]">
                <Award className="h-5 w-5 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="block font-semibold tracking-[-0.01em] text-[#232F46] text-[15px] sm:text-[16px] leading-tight font-display">
                  Shukrana Kalyan Sangh
                </span>
                <span className="block text-[9.5px] text-[#232F46]/45 uppercase tracking-[0.32em] font-semibold leading-none mt-1">
                  Foundation
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-9">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.path)}
                  className="relative group font-medium text-[14px] text-[#232F46]/65 hover:text-[#232F46] transition-colors duration-300 cursor-pointer py-1"
                >
                  <span className="relative z-10 tracking-[-0.01em]">{link.name}</span>
                  <span className="absolute inset-x-0 -bottom-1 h-[2px] bg-[#ED8C32] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left rounded-full" />
                </button>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                to="/login"
                id="btn-nav-login"
                className="px-5 py-2.5 font-medium text-[14px] text-[#232F46]/65 hover:text-[#232F46] rounded-xl hover:bg-[#232F46]/[0.04] transition-all duration-300"
              >
                Login
              </Link>
              <button
                id="btn-nav-donate"
                onClick={onOpenDonateModal}
                className="relative flex items-center gap-2 px-6 py-2.5 bg-[#ED8C32] text-[#232F46] rounded-xl font-semibold text-[14px] shadow-[0_4px_14px_rgba(237,140,50,0.28)] hover:shadow-[0_8px_22px_rgba(237,140,50,0.38)] transform hover:-translate-y-0.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer group"
              >
                <Heart className="h-4 w-4 fill-[#232F46] stroke-none group-hover:scale-110 transition-transform duration-300" />
                <span className="tracking-[-0.01em]">Donate Now</span>
              </button>
            </div>

            {/* Mobile Hamburger toggle */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={onOpenDonateModal}
                className="p-2.5 text-[#232F46] bg-[#ED8C32]/15 hover:bg-[#ED8C32]/25 rounded-xl transition-colors duration-300"
                aria-label="Quick Donate"
              >
                <Heart className="h-5 w-5 fill-[#232F46] stroke-none" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 text-[#232F46] hover:bg-[#232F46]/[0.06] rounded-xl transition-colors duration-300"
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
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden absolute top-full mt-2 left-4 right-4 rounded-2xl border border-[#232F46]/[0.08] bg-white/95 backdrop-blur-xl shadow-[0_16px_48px_rgba(35,47,70,0.14)] overflow-hidden pointer-events-auto"
            >
              <div className="px-3 pt-3 pb-5 space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleLinkClick(link.path)}
                    className="block w-full text-left px-4 py-3 rounded-xl text-[15px] font-medium text-[#232F46] hover:bg-[#FFF8F2] hover:text-[#ED8C32] transition-colors duration-300"
                  >
                    {link.name}
                  </button>
                ))}
                <div className="pt-4 mt-2 border-t border-[#232F46]/[0.08] flex flex-col gap-3 px-1">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex justify-center items-center py-3 font-medium text-[14px] text-[#232F46] border border-[#232F46]/12 rounded-xl hover:bg-[#232F46]/[0.04] transition-colors duration-300"
                  >
                    Admin Login
                  </Link>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenDonateModal();
                    }}
                    className="flex justify-center items-center gap-2 py-3 bg-[#ED8C32] text-[#232F46] rounded-xl font-semibold text-[14px] shadow-[0_4px_14px_rgba(237,140,50,0.28)] transition-all duration-300 cursor-pointer"
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
