import React from 'react';
import { TRUST_CARDS } from '../data/mockData';
import { 
  FileCheck2, 
  BadgePercent, 
  TrendingUp, 
  CreditCard, 
  CalendarCheck, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  FileCheck2: <FileCheck2 className="w-7 h-7 text-[#D4B06A]" />,
  BadgePercent: <BadgePercent className="w-7 h-7 text-[#D4B06A]" />,
  TrendingUp: <TrendingUp className="w-7 h-7 text-[#D4B06A]" />,
  CreditCard: <CreditCard className="w-7 h-7 text-[#D4B06A]" />,
  CalendarCheck: <CalendarCheck className="w-7 h-7 text-[#D4B06A]" />,
  ShieldCheck: <ShieldCheck className="w-7 h-7 text-[#D4B06A]" />,
};

export const TrustSection: React.FC = () => {
  return (
    <section id="trust" className="py-24 bg-[#0B2D24] relative border-t border-[#D4B06A]/15">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-96 bg-[#123B31]/30 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#123B31] border border-[#D4B06A]/30 text-[#D4B06A] text-xs font-semibold uppercase tracking-widest mb-4">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#52B788]" />
            <span>The Plot Bazaar Standard</span>
          </div>
          
          <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#FBF9F5] font-normal tracking-tight">
            Built on Absolute Trust & Verified Value
          </h2>
          
          <p className="mt-4 text-base text-[#FBF9F5]/75 leading-relaxed">
            Every plot in our portfolio undergoes rigorous legal due diligence and financial structuring to ensure safety, appreciation, and seamless acquisition.
          </p>
        </div>

        {/* 6 Premium Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TRUST_CARDS.map((card) => {
            return (
              <div
                key={card.id}
                className="group relative p-8 rounded-2xl bg-gradient-to-b from-[#123B31]/80 to-[#0B2D24]/95 border border-[#D4B06A]/20 hover:border-[#D4B06A]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_-10px_rgba(212,176,106,0.25)] flex flex-col justify-between"
              >
                {/* Top Corner Accent */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl pointer-events-none">
                  <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-[#D4B06A]/20 to-transparent transform rotate-45 translate-x-4 -translate-y-4" />
                </div>

                <div>
                  {/* Icon & Badge Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-[#071F19] border border-[#D4B06A]/30 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                      {iconMap[card.icon]}
                    </div>
                    {card.highlightBadge && (
                      <span className="text-[11px] font-semibold text-[#D4B06A] bg-[#123B31] border border-[#D4B06A]/30 px-3 py-1 rounded-full uppercase tracking-wider">
                        {card.highlightBadge}
                      </span>
                    )}
                  </div>

                  {/* Card Title */}
                  <h3 className="font-serif-heading text-xl text-[#FBF9F5] font-semibold mb-3 group-hover:text-[#E8C888] transition-colors">
                    {card.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-sm text-[#FBF9F5]/75 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Bottom subtle gold line accent on hover */}
                <div className="mt-6 pt-4 border-t border-[#D4B06A]/10 flex items-center justify-between text-xs text-[#D4B06A]/80 font-medium">
                  <span>Guaranteed by TPB</span>
                  <div className="w-6 h-[1px] bg-[#D4B06A]/40 group-hover:w-12 transition-all duration-300" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
