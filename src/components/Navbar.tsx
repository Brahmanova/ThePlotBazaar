import React, { useState, useEffect } from 'react';
import { TPBLogo } from './TPBLogo';
import { Phone, Calendar, Menu, X, MessageSquareQuote, ShieldCheck, MapPin } from 'lucide-react';

interface NavbarProps {
  onOpenSiteVisit: () => void;
  onOpenCalculator: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSiteVisit,
  onOpenCalculator,
  activeSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Investment Benefits', href: '#benefits' },
    { name: 'Properties', href: '#properties' },
    { name: 'Site Media', href: '#media' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top Advisory Bar */}
      <div className="bg-[#071F19] border-b border-[#D4B06A]/15 text-xs text-[#FBF9F5]/80 py-1.5 px-4 sm:px-8 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1.5 text-[#D4B06A]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="font-medium text-[11px] uppercase tracking-wider text-[#FBF9F5]/90">
                100% Verified Land & Clear Title Assurance
              </span>
            </div>
            <div className="flex items-center space-x-1.5 text-[#FBF9F5]/70 text-[11px]">
              <MapPin className="w-3.5 h-3.5 text-[#D4B06A]" />
              <span>Business Global Hub, Kharadi, Pune</span>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={onOpenCalculator}
              className="text-[#D4B06A] hover:text-[#FFF] transition-colors text-[11px] font-medium flex items-center space-x-1"
            >
              <span>📊 Land Investment & EMI Calculator</span>
            </button>
            <a
              href="tel:9325552856"
              className="flex items-center space-x-1.5 text-[#FBF9F5] hover:text-[#D4B06A] transition-colors font-medium text-[11px]"
            >
              <Phone className="w-3 h-3 text-[#D4B06A]" />
              <span>Direct Advisory: +91 9325552856</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0B2D24]/95 backdrop-blur-md py-3 shadow-xl border-b border-[#D4B06A]/20'
            : 'bg-gradient-to-b from-[#071F19]/90 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#home" className="focus:outline-none">
            <TPBLogo size="md" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-all duration-200 relative py-1 ${
                    isActive
                      ? 'text-[#D4B06A] font-semibold'
                      : 'text-[#FBF9F5]/85 hover:text-[#D4B06A]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4B06A] to-transparent" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href="tel:9325552856"
              className="px-3.5 py-2 rounded-lg border border-[#D4B06A]/30 text-[#FBF9F5] text-xs font-medium hover:bg-[#123B31] transition-all flex items-center space-x-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4B06A]" />
              <span>9325552856</span>
            </a>

            <button
              onClick={onOpenSiteVisit}
              className="relative group px-5 py-2.5 rounded-lg font-medium text-xs tracking-wider uppercase overflow-hidden transition-all duration-300 shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4B06A] via-[#E5C378] to-[#C29B4F] transition-transform duration-300 group-hover:scale-105" />
              <div className="relative flex items-center space-x-2 text-[#0B2D24] font-bold">
                <Calendar className="w-3.5 h-3.5 text-[#0B2D24]" />
                <span>Schedule a Site Visit</span>
              </div>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={onOpenSiteVisit}
              className="sm:hidden px-3 py-1.5 rounded bg-[#D4B06A] text-[#0B2D24] text-[11px] font-bold tracking-wide"
            >
              Visit
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="p-2 rounded-lg bg-[#123B31]/70 text-[#FBF9F5] border border-[#D4B06A]/30 hover:text-[#D4B06A]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#071F19]/98 border-b border-[#D4B06A]/30 px-6 py-6 backdrop-blur-xl animate-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-[#FBF9F5] hover:text-[#D4B06A] border-b border-[#123B31] pb-2 transition-colors"
                >
                  {link.name}
                </a>
              ))}

              <div className="pt-2 flex flex-col space-y-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCalculator();
                  }}
                  className="w-full py-2.5 rounded-lg border border-[#D4B06A]/40 text-[#D4B06A] text-xs font-semibold text-center"
                >
                  📊 Open Land & EMI Calculator
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSiteVisit();
                  }}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-[#D4B06A] to-[#C29B4F] text-[#0B2D24] font-bold text-xs uppercase tracking-wider text-center"
                >
                  Schedule a Site Visit
                </button>

                <a
                  href="tel:9325552856"
                  className="w-full py-2.5 rounded-lg bg-[#123B31] text-[#FBF9F5] text-xs font-medium text-center flex items-center justify-center space-x-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D4B06A]" />
                  <span>Call: 9325552856</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
