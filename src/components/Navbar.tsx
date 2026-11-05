import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onOpenCart?: () => void;
}

export default function Navbar({ onOpenCart }: NavbarProps = {}) {
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
    { name: 'Mega Bundle', path: '#mega-bundle' },
    { name: 'Products', path: '#products' },
    { name: 'Quality Promise', path: '#quality' },
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
        className="fixed top-5 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex justify-center w-full px-4 sm:px-6 pointer-events-none"
      >
        <div
          className={`w-full max-w-[1180px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-auto rounded-2xl border bg-white/90 backdrop-blur-xl ${
            isScrolled
              ? 'py-3 px-6 border-[#232F46]/[0.08] shadow-[0_8px_30px_rgba(35,47,70,0.10)] bg-white/95'
              : 'py-4 px-6 border-white/60 shadow-[0_4px_24px_rgba(35,47,70,0.05)]'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <Link
              to="/"
              className="inline-block group cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img 
                src="/navbar-logo.png" 
                alt="Shukrana" 
                className="h-10 w-auto object-contain transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.path)}
                  className="relative group font-medium text-[14px] text-[#232F46]/70 hover:text-[#232F46] transition-colors duration-300 cursor-pointer py-1"
                >
                  <span className="relative z-10 tracking-[-0.01em]">{link.name}</span>
                  <span className="absolute inset-x-0 -bottom-1 h-[2px] bg-[#ED8C32] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left rounded-full" />
                </button>
              ))}
            </nav>

            {/* Action Buttons - Login only as requested */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/login"
                id="btn-nav-login"
                className="flex items-center gap-2 px-6 py-2.5 bg-[#232F46] text-white hover:bg-[#1a2334] rounded-xl font-semibold text-[14px] shadow-[0_4px_14px_rgba(35,47,70,0.2)] hover:shadow-[0_8px_20px_rgba(35,47,70,0.3)] transform hover:-translate-y-0.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
              >
                <span>Login</span>
                <ArrowRight className="w-4 h-4 text-[#ED8C32]" />
              </Link>
            </div>

            {/* Mobile Hamburger toggle */}
            <div className="flex md:hidden items-center gap-2">
              <Link
                to="/login"
                className="px-3 py-1.5 text-xs font-semibold text-white bg-[#232F46] rounded-lg"
              >
                Login
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 text-[#232F46] hover:bg-[#232F46]/[0.06] rounded-xl transition-colors duration-300"
                id="mobile-menu-toggle"
                aria-label="Toggle Navigation Menu"
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
              className="md:hidden absolute top-full mt-2 left-4 right-4 rounded-2xl border border-[#232F46]/[0.08] bg-white/98 backdrop-blur-xl shadow-[0_16px_48px_rgba(35,47,70,0.14)] overflow-hidden pointer-events-auto"
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
                <div className="pt-4 mt-2 border-t border-[#232F46]/[0.08] flex flex-col gap-2 px-1">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex justify-center items-center gap-2 py-3 bg-[#232F46] text-white rounded-xl font-semibold text-[14px] shadow-[0_4px_14px_rgba(35,47,70,0.2)] transition-all duration-300 cursor-pointer"
                  >
                    <span>Member Login</span>
                    <ArrowRight className="w-4 h-4 text-[#ED8C32]" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
