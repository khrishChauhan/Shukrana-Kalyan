import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useTranslation, Language } from '../../context/LanguageContext';

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  const currentLabel = language === 'en' ? 'English' : 'हिन्दी';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ED8C32]"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Change Language"
      >
        <Globe className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-[#232F46]">{currentLabel}</span>
        <ChevronDown className="w-3 h-3 text-gray-400" />
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-1 w-32 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50 overflow-hidden origin-top-right"
          role="listbox"
        >
          <button
            type="button"
            onClick={() => handleSelect('en')}
            role="option"
            aria-selected={language === 'en'}
            className={`w-full text-left px-4 py-2 text-sm transition-colors ${
              language === 'en' 
                ? 'bg-orange-50 text-[#ED8C32] font-semibold' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            🌐 English
          </button>
          <button
            type="button"
            onClick={() => handleSelect('hi')}
            role="option"
            aria-selected={language === 'hi'}
            className={`w-full text-left px-4 py-2 text-sm transition-colors ${
              language === 'hi' 
                ? 'bg-orange-50 text-[#ED8C32] font-semibold' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            🌐 हिन्दी
          </button>
        </div>
      )}
    </div>
  );
}
