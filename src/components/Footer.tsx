import React from 'react';
import { TPBLogo } from './TPBLogo';
import { Phone, MapPin, Mail, ShieldCheck, ArrowUp, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenSiteVisit: () => void;
  onOpenCalculator: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSiteVisit, onOpenCalculator }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#071F19] text-[#FBF9F5] border-t border-[#D4B06A]/25 relative overflow-hidden">
      
      {/* Decorative Gold Accent Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-[#0B2D24] via-[#D4B06A] to-[#0B2D24]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-[#D4B06A]/15">
          
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-5 space-y-4">
            <TPBLogo size="md" showTagline={true} />

            <p className="text-xs text-[#FBF9F5]/75 max-w-sm leading-relaxed mt-4">
              The Plot Bazaar is Pune's trusted land advisory and plot investment firm. We bring clear titles, verified 30-year documentation, and transparent below-market opportunities to prudent land investors.
            </p>

            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#123B31] border border-[#D4B06A]/25 text-[#D4B06A] text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#52B788]" />
              <span>Verified Land • Trusted Deals • Peace of Mind</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif-heading text-base font-semibold text-[#E8C888] uppercase tracking-wider text-xs">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#FBF9F5]/80">
              <li>
                <a href="#home" className="hover:text-[#D4B06A] transition-colors flex items-center space-x-1.5">
                  <span className="text-[#D4B06A] text-[10px]">›</span>
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#D4B06A] transition-colors flex items-center space-x-1.5">
                  <span className="text-[#D4B06A] text-[10px]">›</span>
                  <span>About Us</span>
                </a>
              </li>
              <li>
                <a href="#benefits" className="hover:text-[#D4B06A] transition-colors flex items-center space-x-1.5">
                  <span className="text-[#D4B06A] text-[10px]">›</span>
                  <span>Investment Benefits</span>
                </a>
              </li>
              <li>
                <a href="#properties" className="hover:text-[#D4B06A] transition-colors flex items-center space-x-1.5">
                  <span className="text-[#D4B06A] text-[10px]">›</span>
                  <span>Featured Properties</span>
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-[#D4B06A] transition-colors flex items-center space-x-1.5">
                  <span className="text-[#D4B06A] text-[10px]">›</span>
                  <span>Investment Process</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#D4B06A] transition-colors flex items-center space-x-1.5">
                  <span className="text-[#D4B06A] text-[10px]">›</span>
                  <span>Contact</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Info & Socials */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif-heading text-base font-semibold text-[#E8C888] uppercase tracking-wider text-xs">
              Direct Contact
            </h4>
            
            <div className="space-y-2.5 text-xs text-[#FBF9F5]/80">
              <div className="flex items-start space-x-2.5">
                <Phone className="w-4 h-4 text-[#D4B06A] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-[#D4B06A] block uppercase font-bold">Contact Number</span>
                  <a href="tel:9325552856" className="text-sm font-semibold text-[#FBF9F5] hover:text-[#D4B06A]">
                    9325552856
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#D4B06A] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-[#D4B06A] block uppercase font-bold">Pune Office</span>
                  <span>Business Global Hub, C-419, Kharadi, Pune 411014</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-[#FBF9F5]/60">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 text-center sm:text-left">
            <span>
              © {new Date().getFullYear()} <strong className="text-[#FBF9F5]">The Plot Bazaar</strong>. All Rights Reserved.
            </span>
            <span className="hidden sm:inline text-[#D4B06A]/40">•</span>
            <span>
              Design and Crafted by{' '}
              <a
                href="https://brahmanova.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4B06A] font-semibold hover:text-[#FFF] hover:underline transition-colors"
              >
                BRAHMANOVA
              </a>
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={onOpenCalculator}
              className="hover:text-[#D4B06A] transition-colors"
            >
              EMI & ROI Calculator
            </button>
            <button
              onClick={onOpenSiteVisit}
              className="hover:text-[#D4B06A] transition-colors"
            >
              Book Site Visit
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#123B31] border border-[#D4B06A]/30 text-[#D4B06A] hover:bg-[#1A4D41] transition-colors flex items-center space-x-1"
              title="Scroll to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
