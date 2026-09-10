import React, { useState } from 'react';
import { 
  X, 
  Calculator, 
  TrendingUp, 
  CalendarCheck, 
  IndianRupee, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface EMICalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSiteVisit: () => void;
}

export const EMICalculatorModal: React.FC<EMICalculatorModalProps> = ({
  isOpen,
  onClose,
  onOpenSiteVisit,
}) => {
  const [plotValue, setPlotValue] = useState<number>(3000000); // 30 Lakhs
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30); // 30%
  const [tenureMonths, setTenureMonths] = useState<number>(18); // 18 months
  const [expectedAnnualGrowth, setExpectedAnnualGrowth] = useState<number>(15); // 15% CAGR

  if (!isOpen) return null;

  const downPaymentAmount = (plotValue * downPaymentPercent) / 100;
  const balanceAmount = plotValue - downPaymentAmount;
  const monthlyNoCostEMI = balanceAmount / tenureMonths;

  // 5-year and 10-year appreciation forecast
  const value5Years = plotValue * Math.pow(1 + expectedAnnualGrowth / 100, 5);
  const capitalGain5Years = value5Years - plotValue;

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071F19]/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-gradient-to-b from-[#123B31] via-[#0E3228] to-[#071F19] border border-[#D4B06A]/40 rounded-2xl shadow-2xl overflow-hidden text-[#FBF9F5] p-6 sm:p-8 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-[#0B2D24] text-[#FBF9F5]/70 hover:text-[#D4B06A] border border-[#D4B06A]/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6 border-b border-[#D4B06A]/20 pb-4">
          <div className="w-12 h-12 rounded-xl bg-[#0B2D24] border border-[#D4B06A]/40 flex items-center justify-center">
            <Calculator className="w-6 h-6 text-[#D4B06A]" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4B06A]">
              Interactive Financial Modeler
            </span>
            <h3 className="font-serif-heading text-xl sm:text-2xl text-[#FBF9F5] font-semibold">
              Land Investment & Flexible Payment Calculator
            </h3>
          </div>
        </div>

        <div className="space-y-6">
          
          {/* Controls Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-5 rounded-2xl bg-[#071F19] border border-[#D4B06A]/20">
            
            {/* Plot Value Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-[#FBF9F5]/80 uppercase text-[10px]">Estimated Plot Value</span>
                <span className="text-[#D4B06A] font-serif-heading text-sm">{formatINR(plotValue)}</span>
              </div>
              <input
                type="range"
                min={1500000}
                max={10000000}
                step={250000}
                value={plotValue}
                onChange={(e) => setPlotValue(Number(e.target.value))}
                className="w-full accent-[#D4B06A] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#FBF9F5]/50 mt-1">
                <span>₹15 Lakhs</span>
                <span>₹1 Crore</span>
              </div>
            </div>

            {/* Down Payment Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-[#FBF9F5]/80 uppercase text-[10px]">Down Payment ({downPaymentPercent}%)</span>
                <span className="text-[#D4B06A] font-serif-heading text-sm">{formatINR(downPaymentAmount)}</span>
              </div>
              <input
                type="range"
                min={20}
                max={60}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full accent-[#D4B06A] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#FBF9F5]/50 mt-1">
                <span>20% (₹{(plotValue * 0.2 / 100000).toFixed(1)}L)</span>
                <span>60%</span>
              </div>
            </div>

            {/* Payment Schedule Tenure */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-[#FBF9F5]/80 uppercase text-[10px]">Tenure (Structured / No-Cost EMI)</span>
                <span className="text-[#D4B06A] font-serif-heading text-sm">{tenureMonths} Months</span>
              </div>
              <input
                type="range"
                min={6}
                max={24}
                step={6}
                value={tenureMonths}
                onChange={(e) => setTenureMonths(Number(e.target.value))}
                className="w-full accent-[#D4B06A] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#FBF9F5]/50 mt-1">
                <span>6 Months</span>
                <span>12 Mo</span>
                <span>18 Mo</span>
                <span>24 Mo</span>
              </div>
            </div>

            {/* Projected Corridor CAGR */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-[#FBF9F5]/80 uppercase text-[10px]">Projected Corridor Appreciation</span>
                <span className="text-[#52B788] font-bold text-sm">{expectedAnnualGrowth}% / year</span>
              </div>
              <input
                type="range"
                min={10}
                max={25}
                step={1}
                value={expectedAnnualGrowth}
                onChange={(e) => setExpectedAnnualGrowth(Number(e.target.value))}
                className="w-full accent-[#52B788] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#FBF9F5]/50 mt-1">
                <span>10% Conservative</span>
                <span>25% Aggressive</span>
              </div>
            </div>

          </div>

          {/* Results Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Card 1: EMI & Payment breakdown */}
            <div className="p-5 rounded-2xl bg-[#071F19] border border-[#D4B06A]/30">
              <div className="flex items-center space-x-2 text-[#D4B06A] text-xs font-semibold uppercase mb-2">
                <CalendarCheck className="w-4 h-4" />
                <span>Monthly Structured Installment</span>
              </div>
              <div className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#FBF9F5] mb-1">
                {formatINR(monthlyNoCostEMI)} <span className="text-xs text-[#FBF9F5]/60 font-sans">/ month</span>
              </div>
              <p className="text-[11px] text-[#FBF9F5]/70">
                Based on balance of {formatINR(balanceAmount)} spread evenly across {tenureMonths} equal monthly installments with zero interest surcharge.
              </p>
            </div>

            {/* Card 2: 5-Year Capital Growth Projection */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#123B31] to-[#071F19] border border-[#52B788]/40">
              <div className="flex items-center space-x-2 text-[#52B788] text-xs font-semibold uppercase mb-2">
                <TrendingUp className="w-4 h-4" />
                <span>Estimated 5-Year Asset Value</span>
              </div>
              <div className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#E8C888] mb-1">
                {formatINR(value5Years)}
              </div>
              <p className="text-[11px] text-[#52B788] font-medium">
                + {formatINR(capitalGain5Years)} projected gain ({((capitalGain5Years / plotValue) * 100).toFixed(0)}% ROI)
              </p>
            </div>

          </div>

          {/* Action Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-[11px] text-[#FBF9F5]/60 flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#52B788]" />
              <span>Tailored milestone schedules can be customized for your exact cash flow.</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenSiteVisit();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4B06A] to-[#C29B4F] text-[#0B2D24] font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-md flex items-center justify-center space-x-1.5"
            >
              <span>Schedule Site Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
