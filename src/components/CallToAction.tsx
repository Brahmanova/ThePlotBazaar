import React from 'react';
import { Phone, Calendar, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

interface CallToActionProps {
  onOpenSiteVisit: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onOpenSiteVisit }) => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#0B2D24] via-[#071F19] to-[#0B2D24] relative overflow-hidden border-t border-[#D4B06A]/20">
      
      {/* Decorative Gold & Green Ambient Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#123B31]/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#D4B06A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#123B31] border border-[#D4B06A]/40 text-[#D4B06A] text-xs font-semibold uppercase tracking-widest mb-6">
          <ShieldCheck className="w-4 h-4 text-[#52B788]" />
          <span>Exclusive Land Advisory • Pune & Growing Suburbs</span>
        </div>

        {/* Exact Headline from Prompt */}
        <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl text-[#FBF9F5] font-normal leading-tight tracking-tight max-w-3xl mx-auto">
          Why Wait for the Right Opportunity When You Can{' '}
          <span className="italic font-editorial text-[#E8C888] font-normal">
            Invest Smartly Today?
          </span>
        </h2>

        {/* Exact Text from Prompt */}
        <p className="mt-6 text-base sm:text-lg text-[#FBF9F5]/80 max-w-2xl mx-auto font-normal leading-relaxed">
          Contact us today for project details, location information, pricing and site visit scheduling.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="tel:9325552856"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4B06A] via-[#E8C888] to-[#C29B4F] text-[#0B2D24] font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:shadow-[0_10px_25px_-5px_rgba(212,176,106,0.4)] flex items-center justify-center space-x-2.5"
          >
            <Phone className="w-4 h-4 text-[#0B2D24]" />
            <span>Call Now: 9325552856</span>
          </a>

          <button
            onClick={onOpenSiteVisit}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#123B31] hover:bg-[#1A4D41] text-[#FBF9F5] border border-[#D4B06A]/40 font-semibold text-sm tracking-wider uppercase transition-all duration-300 backdrop-blur-sm flex items-center justify-center space-x-2.5"
          >
            <Calendar className="w-4 h-4 text-[#D4B06A]" />
            <span>Schedule Site Visit</span>
          </button>
        </div>

        {/* Sub-text footer info */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-[#FBF9F5]/60">
          <div className="flex items-center space-x-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#D4B06A]" />
            <span>Office: Business Global Hub, C-419, Kharadi, Pune 411014</span>
          </div>
          <span className="hidden sm:inline">•</span>
          <span>Complimentary weekend chauffeur site pickups available</span>
        </div>

      </div>
    </section>
  );
};
