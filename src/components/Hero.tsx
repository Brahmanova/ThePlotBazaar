import React from 'react';
import { Shield, Sparkles, Phone, ArrowRight, CheckCircle2, ChevronDown, Compass } from 'lucide-react';

interface HeroProps {
  onOpenSiteVisit: () => void;
  onExploreProperties: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenSiteVisit, onExploreProperties }) => {
  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-12 pb-20">
      {/* Background with luxury aerial land overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=85"
          alt="Aerial view of prime green plots and fertile land"
          className="w-full h-full object-cover object-center transform scale-105 filter brightness-[0.38] contrast-[1.1]"
        />
        {/* Layered luxury emerald gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2D24] via-[#0B2D24]/85 to-[#071F19]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#123B31]/40 via-transparent to-[#0B2D24]" />
        
        {/* Geometric Plot Grid Watermark */}
        <div 
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#D4B06A 1px, transparent 1px), linear-gradient(90deg, #D4B06A 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Verified Land Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#123B31]/80 border border-[#D4B06A]/40 text-[#D4B06A] text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-md shadow-md">
          <Shield className="w-3.5 h-3.5 text-[#52B788]" />
          <span>RERA Compliant • Clear Title • 100% Verified Land In Pune</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif-heading text-3xl sm:text-5xl lg:text-6xl font-normal text-[#FBF9F5] tracking-tight leading-[1.2] max-w-4xl">
          Your Dream Plot.{' '}
          <span className="block italic font-editorial text-[#E8C888] font-normal mt-1">
            A Smart Investment. A Transparent Deal.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-base sm:text-lg text-[#FBF9F5]/80 max-w-2xl font-normal leading-relaxed">
          Looking for the right plot at the right price? We bring you carefully selected land investment opportunities designed around transparency, affordability, and long-term value.
        </p>

        {/* Trust Indicators Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-[#FBF9F5]/90 font-medium">
          <div className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#52B788]" />
            <span>30-Year Title Search</span>
          </div>
          <div className="hidden sm:block text-[#D4B06A]/40">•</div>
          <div className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#52B788]" />
            <span>Below-Market Direct Pricing</span>
          </div>
          <div className="hidden sm:block text-[#D4B06A]/40">•</div>
          <div className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#52B788]" />
            <span>No-Cost EMI & Tailored Schedules</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button
            onClick={onExploreProperties}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4B06A] via-[#E8C888] to-[#C29B4F] text-[#0B2D24] font-bold text-sm tracking-wider uppercase transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-5px_rgba(212,176,106,0.4)] flex items-center justify-center space-x-2"
          >
            <span>Explore Opportunities</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenSiteVisit}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#123B31]/90 hover:bg-[#1A4D41] text-[#FBF9F5] border border-[#D4B06A]/40 font-semibold text-sm tracking-wider uppercase transition-all duration-300 backdrop-blur-sm flex items-center justify-center space-x-2"
          >
            <Compass className="w-4 h-4 text-[#D4B06A]" />
            <span>Book Site Visit</span>
          </button>
        </div>

        {/* Direct Call Quick Link */}
        <div className="mt-8 text-xs text-[#FBF9F5]/60 flex items-center space-x-2">
          <span>Speak directly with a Land Specialist:</span>
          <a
            href="tel:9325552856"
            className="text-[#D4B06A] font-semibold hover:underline flex items-center space-x-1"
          >
            <Phone className="w-3 h-3 inline" />
            <span>+91 9325552856</span>
          </a>
        </div>
      </div>

      {/* Elegant Down Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4B06A] mb-1">Scroll to Explore</span>
        <ChevronDown className="w-4 h-4 text-[#D4B06A] animate-bounce" />
      </div>
    </section>
  );
};
