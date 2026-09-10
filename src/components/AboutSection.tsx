import React from 'react';
import { ShieldCheck, Target, Award, HeartHandshake, ArrowUpRight } from 'lucide-react';

interface AboutSectionProps {
  onOpenSiteVisit: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenSiteVisit }) => {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-[#0B2D24] via-[#071F19] to-[#0B2D24] relative overflow-hidden border-t border-[#D4B06A]/15">
      
      {/* Decorative luxury background elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#123B31]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#D4B06A]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Showcase & Brand Heritage Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#D4B06A]/30 shadow-2xl bg-[#071F19]">
              
              {/* Image */}
              <div className="relative h-80 sm:h-96 w-full">
                <img
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80"
                  alt="Verified Land Plots Pune"
                  className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071F19] via-[#071F19]/40 to-transparent" />
              </div>

              {/* Floating Shield Overlay Badge */}
              <div className="absolute top-6 left-6 bg-[#0B2D24]/90 border border-[#D4B06A]/40 backdrop-blur-md p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-[#123B31] border border-[#D4B06A]/50 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-[#D4B06A]" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#D4B06A] font-semibold block">
                      Clear Title Guaranteed
                    </span>
                    <span className="text-xs text-[#FBF9F5]/90 font-medium">
                      Zero Legal Compromise
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Advisory Info */}
              <div className="p-6 bg-[#071F19] border-t border-[#D4B06A]/20">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <span className="font-serif-heading text-xl sm:text-2xl text-[#D4B06A] font-bold block">
                      100%
                    </span>
                    <span className="text-[11px] text-[#FBF9F5]/70 uppercase tracking-wider">
                      Verified Plots
                    </span>
                  </div>
                  <div className="border-x border-[#D4B06A]/20">
                    <span className="font-serif-heading text-xl sm:text-2xl text-[#D4B06A] font-bold block">
                      30 Yr
                    </span>
                    <span className="text-[11px] text-[#FBF9F5]/70 uppercase tracking-wider">
                      Title Search
                    </span>
                  </div>
                  <div>
                    <span className="font-serif-heading text-xl sm:text-2xl text-[#D4B06A] font-bold block">
                      0%
                    </span>
                    <span className="text-[11px] text-[#FBF9F5]/70 uppercase tracking-wider">
                      Hidden Costs
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: About Narrative & Philosophy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Section Eyebrow */}
            <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-[#D4B06A] mb-4">
              <span className="w-8 h-[1px] bg-[#D4B06A]" />
              <span>About The Plot Bazaar</span>
            </div>

            {/* Headline */}
            <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-4xl text-[#FBF9F5] font-normal leading-[1.3] tracking-tight">
              Investing in Land Should Be{' '}
              <span className="italic font-editorial text-[#E8C888] font-normal">
                Simple, Transparent and Rewarding
              </span>
            </h2>

            {/* Body Copy */}
            <div className="mt-6 space-y-4 text-base text-[#FBF9F5]/80 font-normal leading-relaxed">
              <p>
                At <strong className="text-[#FBF9F5] font-semibold">The Plot Bazaar</strong>, we focus on helping individuals and families discover genuine land investment opportunities with confidence. Our approach is built on transparency, proper documentation, customer-first service and long-term value creation.
              </p>
              <p>
                Whether you are looking for a future investment, farmhouse plot or a long-term asset, our goal is to make the process straightforward and trustworthy from start to finish.
              </p>
            </div>

            {/* Core Values Pillars */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#123B31]/50 border border-[#D4B06A]/15 flex items-start space-x-3.5">
                <Target className="w-5 h-5 text-[#D4B06A] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-[#FBF9F5]">Selective Corridors</h4>
                  <p className="text-xs text-[#FBF9F5]/70 mt-0.5">Focusing exclusively on high-growth infrastructure corridors around Pune.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#123B31]/50 border border-[#D4B06A]/15 flex items-start space-x-3.5">
                <HeartHandshake className="w-5 h-5 text-[#D4B06A] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-[#FBF9F5]">Client-First Advisory</h4>
                  <p className="text-xs text-[#FBF9F5]/70 mt-0.5">Unbiased consulting tailored to your liquidity and investment horizon.</p>
                </div>
              </div>
            </div>

            {/* Action link */}
            <div className="mt-8 pt-6 border-t border-[#D4B06A]/15 flex items-center justify-between">
              <div className="text-xs text-[#FBF9F5]/70">
                Operating from Pune's prime business district — <span className="text-[#D4B06A]">Kharadi</span>.
              </div>
              <button
                onClick={onOpenSiteVisit}
                className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#D4B06A] hover:text-[#FBF9F5] transition-colors"
              >
                <span>Book a Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
