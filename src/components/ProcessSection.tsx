import React from 'react';
import { PROCESS_STEPS } from '../data/mockData';
import { 
  MessagesSquare, 
  MapPin, 
  FileCheck, 
  KeyRound, 
  Sparkles,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

const processIconMap: Record<string, React.ReactNode> = {
  MessagesSquare: <MessagesSquare className="w-7 h-7 text-[#D4B06A]" />,
  MapPin: <MapPin className="w-7 h-7 text-[#D4B06A]" />,
  FileCheck: <FileCheck className="w-7 h-7 text-[#D4B06A]" />,
  KeyRound: <KeyRound className="w-7 h-7 text-[#D4B06A]" />,
};

interface ProcessSectionProps {
  onOpenSiteVisit: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenSiteVisit }) => {
  return (
    <section id="process" className="py-24 bg-[#0B2D24] relative border-t border-[#D4B06A]/15 overflow-hidden">
      
      {/* Background Decorative Grid */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#D4B06A 1px, transparent 1px), linear-gradient(90deg, #D4B06A 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#123B31] border border-[#D4B06A]/30 text-[#D4B06A] text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#D4B06A]" />
            <span>Seamless Acquisition Journey</span>
          </div>

          <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#FBF9F5] font-normal tracking-tight">
            Our 4-Step Investment Process
          </h2>

          <p className="mt-4 text-base text-[#FBF9F5]/75 leading-relaxed">
            From your initial consultation to legal registration and clear physical possession, our advisory guarantees a structured, secure, and stress-free experience.
          </p>
        </div>

        {/* 4 Steps with Gold Connectors */}
        <div className="relative">
          
          {/* Desktop Horizontal Gold Connecting Line */}
          <div className="hidden lg:block absolute top-1/4 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-[#D4B06A]/20 via-[#D4B06A]/60 to-[#D4B06A]/20 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {PROCESS_STEPS.map((step, index) => (
              <div
                key={step.stepNumber}
                className="relative p-7 rounded-2xl bg-gradient-to-b from-[#123B31]/80 to-[#071F19]/95 border border-[#D4B06A]/25 hover:border-[#D4B06A]/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_30px_-10px_rgba(212,176,106,0.25)] flex flex-col justify-between group"
              >
                <div>
                  {/* Step Top Bar with Number Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#071F19] border border-[#D4B06A]/40 flex items-center justify-center group-hover:scale-105 transition-transform shadow-md">
                      {processIconMap[step.iconName]}
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4B06A]/70">
                        STEP
                      </span>
                      <span className="font-editorial text-2xl font-bold text-[#E8C888] leading-none">
                        {step.stepNumber}
                      </span>
                    </div>
                  </div>

                  {/* Step Title & Tagline */}
                  <h3 className="font-serif-heading text-lg font-semibold text-[#FBF9F5] mb-1 group-hover:text-[#E8C888] transition-colors">
                    {step.title}
                  </h3>
                  <span className="text-[11px] font-semibold text-[#D4B06A] uppercase tracking-wider block mb-3">
                    {step.tagline}
                  </span>

                  {/* Description */}
                  <p className="text-xs text-[#FBF9F5]/75 leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                {/* Key Inclusions Checklist */}
                <div className="pt-4 border-t border-[#D4B06A]/15 space-y-2">
                  {step.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-[11px] text-[#FBF9F5]/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#52B788] mt-0.5 flex-shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={onOpenSiteVisit}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D4B06A] to-[#C29B4F] text-[#0B2D24] font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-lg inline-flex items-center space-x-2"
          >
            <span>Begin Step 1: Request Free Land Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
