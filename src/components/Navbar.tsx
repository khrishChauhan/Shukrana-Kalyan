/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
      // If we are not on landing page, redirect first
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'py-3 glass-nav shadow-sm' 
            : 'py-5 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <Link 
              to="/" 
              className="flex items-center gap-3 group text-left"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="p-2 bg-brand-gold rounded-xl text-white shadow-md shadow-amber-400/20 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                <Award className="h-6 w-6 stroke-[2.2]" />
              </div>
              <div>
                <span className="block font-bold tracking-tight text-gray-900 text-[14px] sm:text-[16px] uppercase leading-tight font-display">
                  Shukrana Kalyan Sangh
                </span>
                <span className="block text-[10px] text-gray-500 uppercase tracking-widest font-mono font-bold leading-none mt-0.5">
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
                  className="font-medium text-sm text-gray-600 hover:text-brand-gold transition-colors duration-200 cursor-pointer"
                >
                  {link.name}
                </button>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/login"
                id="btn-nav-login"
                className="px-4 py-2 font-medium text-sm text-gray-700 hover:text-brand-gold hover:bg-gray-50 rounded-lg transition-all duration-200"
              >
                Login
              </Link>
              <button
                id="btn-nav-donate"
                onClick={onOpenDonateModal}
                className="flex items-center gap-2 px-5 py-2.5 bg-brand-gold hover:bg-brand-gold-hover text-white rounded-lg font-semibold text-sm shadow-md shadow-amber-400/10 hover:shadow-lg transition-all duration-250 cursor-pointer"
              >
                <Heart className="h-4 w-4 fill-white stroke-none" />
                <span>Donate Now</span>
              </button>
            </div>

            {/* Mobile Hamburger toggle */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={onOpenDonateModal}
                className="p-2 text-brand-gold bg-amber-50 hover:bg-amber-100 rounded-lg mr-1"
                aria-label="Quick Donate"
              >
                <Heart className="h-5 w-5 fill-brand-gold stroke-none" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-700 hover:text-brand-gold hover:bg-gray-100 rounded-lg transition-colors"
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
              className="md:hidden border-b border-gray-100 bg-white shadow-inner overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleLinkClick(link.path)}
                    className="block w-full text-left px-4 py-2.5 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-brand-gold transition-colors"
                  >
                    {link.name}
                  </button>
                ))}
                <div className="pt-4 border-t border-gray-100 flex flex-col gap-3 px-4">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex justify-center items-center py-2.5 font-semibold text-sm text-gray-700 hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors"
                  >
                    Admin Login
                  </Link>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenDonateModal();
                    }}
                    className="flex justify-center items-center gap-2 py-2.5 bg-brand-gold hover:bg-brand-gold-hover text-white rounded-lg font-bold text-sm shadow-md transition-all cursor-pointer"
                  >
                    <Heart className="h-4 w-4 fill-white stroke-none" />
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
