import React from 'react';
import { WHY_INVEST_BENEFITS } from '../data/mockData';
import { 
  LandPlot, 
  Users, 
  LineChart, 
  Sparkles, 
  PieChart, 
  Shield,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

const benefitIconMap: Record<string, React.ReactNode> = {
  LandPlot: <LandPlot className="w-6 h-6 text-[#D4B06A]" />,
  Users: <Users className="w-6 h-6 text-[#D4B06A]" />,
  LineChart: <LineChart className="w-6 h-6 text-[#D4B06A]" />,
  Sparkles: <Sparkles className="w-6 h-6 text-[#D4B06A]" />,
  PieChart: <PieChart className="w-6 h-6 text-[#D4B06A]" />,
  Shield: <Shield className="w-6 h-6 text-[#D4B06A]" />,
};

interface WhyInvestSectionProps {
  onOpenCalculator: () => void;
}

export const WhyInvestSection: React.FC<WhyInvestSectionProps> = ({ onOpenCalculator }) => {
  return (
    <section id="benefits" className="py-24 bg-[#0B2D24] relative border-t border-[#D4B06A]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#123B31] border border-[#D4B06A]/30 text-[#D4B06A] text-xs font-semibold uppercase tracking-widest mb-4">
            <TrendingUp className="w-3.5 h-3.5 text-[#D4B06A]" />
            <span>Strategic Wealth Preservation</span>
          </div>

          <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#FBF9F5] font-normal tracking-tight">
            Why Invest in Land?
          </h2>

          <p className="mt-4 text-base text-[#FBF9F5]/75 leading-relaxed">
            Land is the foundational asset class of generational wealth — finite in supply, immune to structural depreciation, and backed by constant infrastructural appreciation.
          </p>
        </div>

        {/* 3-Column Premium Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_INVEST_BENEFITS.map((benefit, index) => (
            <div
              key={benefit.title}
              className="relative p-8 rounded-2xl bg-gradient-to-b from-[#123B31]/70 to-[#071F19]/90 border border-[#D4B06A]/20 hover:border-[#D4B06A]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_-5px_rgba(212,176,106,0.2)] flex flex-col justify-between group"
            >
              <div>
                {/* Number & Icon Row */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#0B2D24] border border-[#D4B06A]/30 flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                    {benefitIconMap[benefit.icon]}
                  </div>

                  <span className="text-xs font-bold font-editorial text-[#D4B06A]/50 group-hover:text-[#D4B06A] transition-colors text-lg">
                    0{index + 1}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif-heading text-xl font-semibold text-[#FBF9F5] mb-3 group-hover:text-[#E8C888] transition-colors">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#FBF9F5]/75 leading-relaxed">
                  {benefit.description}
                </p>
              </div>

              {/* Bottom Stat Pill */}
              {benefit.stat && (
                <div className="mt-6 pt-4 border-t border-[#D4B06A]/10 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#D4B06A] uppercase tracking-wider">
                    {benefit.stat}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[#52B788]/80" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Interactive Growth Assessment Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#123B31] via-[#0E3228] to-[#071F19] border border-[#D4B06A]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h4 className="font-serif-heading text-xl sm:text-2xl text-[#FBF9F5] font-medium">
              Want to evaluate projected land appreciation & customized EMI?
            </h4>
            <p className="text-xs sm:text-sm text-[#FBF9F5]/70 mt-1 max-w-xl">
              Use our interactive land appreciation & flexible payment schedule simulator designed for Pune micro-markets.
            </p>
          </div>

          <button
            onClick={onOpenCalculator}
            className="flex-shrink-0 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D4B06A] to-[#C29B4F] text-[#0B2D24] font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-md flex items-center space-x-2"
          >
            <span>Simulate Investment Returns</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
