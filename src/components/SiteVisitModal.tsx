import React, { useState } from 'react';
import { SiteVisitBooking } from '../types';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Car, 
  ShieldCheck, 
  Phone, 
  Compass,
  Send
} from 'lucide-react';

interface SiteVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProperty?: string;
}

export const SiteVisitModal: React.FC<SiteVisitModalProps> = ({
  isOpen,
  onClose,
  initialProperty = '',
}) => {
  const [formData, setFormData] = useState<SiteVisitBooking>({
    name: '',
    phone: '',
    email: '',
    preferredDate: '',
    preferredTime: 'Morning (10:00 AM – 1:00 PM)',
    locationInterest: initialProperty || 'Libertellè – Velvand, Bhor (Dam & Fort View)',
    transportRequired: true,
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071F19]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-gradient-to-b from-[#123B31] to-[#071F19] border border-[#D4B06A]/40 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden text-[#FBF9F5]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-[#0B2D24] text-[#FBF9F5]/70 hover:text-[#D4B06A] border border-[#D4B06A]/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[#0B2D24] border border-[#52B788] flex items-center justify-center mx-auto text-[#52B788] shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-serif-heading text-2xl text-[#FBF9F5] font-semibold">
              Site Visit Confirmed!
            </h3>

            <p className="text-xs sm:text-sm text-[#FBF9F5]/80 max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-[#D4B06A]">{formData.name}</strong>. Our logistics officer will contact you at <strong className="text-[#D4B06A]">{formData.phone}</strong> to confirm your complimentary chauffeur pickup and site dossier.
            </p>

            <div className="p-4 rounded-xl bg-[#0B2D24] border border-[#D4B06A]/20 text-xs text-left space-y-1.5 max-w-sm mx-auto">
              <div className="text-[#D4B06A] font-semibold">Visit Details:</div>
              <div>📍 Location: {formData.locationInterest}</div>
              <div>📅 Date: {formData.preferredDate || 'Upcoming Weekend'}</div>
              <div>⏰ Slot: {formData.preferredTime}</div>
              <div>🚗 Chauffeur Pickup: {formData.transportRequired ? 'Requested' : 'Self-drive'}</div>
            </div>

            <div className="pt-4 flex justify-center space-x-3">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4B06A] to-[#C29B4F] text-[#0B2D24] font-bold text-xs uppercase tracking-wider"
              >
                Close & Return to Website
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Modal Header */}
            <div className="flex items-center space-x-3 mb-6 border-b border-[#D4B06A]/20 pb-4">
              <div className="w-12 h-12 rounded-xl bg-[#0B2D24] border border-[#D4B06A]/40 flex items-center justify-center">
                <Compass className="w-6 h-6 text-[#D4B06A]" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4B06A]">
                  VIP Land Tour
                </span>
                <h3 className="font-serif-heading text-xl sm:text-2xl text-[#FBF9F5] font-semibold">
                  Schedule a Site Visit
                </h3>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-semibold text-[#FBF9F5]/80 uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Rajesh Patil"
                    className="w-full bg-[#071F19] text-[#FBF9F5] text-xs rounded-xl border border-[#D4B06A]/30 px-3.5 py-2.5 focus:outline-none focus:border-[#D4B06A]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-[#FBF9F5]/80 uppercase tracking-wider mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="9325552856"
                    className="w-full bg-[#071F19] text-[#FBF9F5] text-xs rounded-xl border border-[#D4B06A]/30 px-3.5 py-2.5 focus:outline-none focus:border-[#D4B06A]"
                  />
                </div>
              </div>

              {/* Location of Interest */}
              <div>
                <label className="block text-[10px] font-semibold text-[#FBF9F5]/80 uppercase tracking-wider mb-1">
                  Location / Property of Interest
                </label>
                <select
                  value={formData.locationInterest}
                  onChange={(e) => setFormData({ ...formData, locationInterest: e.target.value })}
                  className="w-full bg-[#071F19] text-[#FBF9F5] text-xs rounded-xl border border-[#D4B06A]/30 px-3.5 py-2.5 focus:outline-none focus:border-[#D4B06A]"
                >
                  <option value="Kharadi / East Pune (Emerald Acres)">The Emerald Acres – Kharadi Annexe</option>
                  <option value="Shirwal / South Pune (Royal Palms)">Royal Palms County – Shirwal</option>
                  <option value="Hinjawadi / West Pune (Green Valley)">Green Valley Greens – Hinjawadi West</option>
                  <option value="Custom Location Consultation">Custom Plot Consultation in Pune Region</option>
                </select>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-semibold text-[#FBF9F5]/80 uppercase tracking-wider mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-[#071F19] text-[#FBF9F5] text-xs rounded-xl border border-[#D4B06A]/30 px-3.5 py-2.5 focus:outline-none focus:border-[#D4B06A]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-[#FBF9F5]/80 uppercase tracking-wider mb-1">
                    Time Window
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full bg-[#071F19] text-[#FBF9F5] text-xs rounded-xl border border-[#D4B06A]/30 px-3.5 py-2.5 focus:outline-none focus:border-[#D4B06A]"
                  >
                    <option value="Morning (10:00 AM – 1:00 PM)">Morning (10:00 AM – 1:00 PM)</option>
                    <option value="Afternoon (1:00 PM – 4:00 PM)">Afternoon (1:00 PM – 4:00 PM)</option>
                    <option value="Evening (4:00 PM – 6:30 PM)">Evening (4:00 PM – 6:30 PM)</option>
                  </select>
                </div>
              </div>

              {/* Chauffeur Transport Checkbox */}
              <div className="p-3 rounded-xl bg-[#071F19] border border-[#D4B06A]/20 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <Car className="w-4 h-4 text-[#D4B06A]" />
                  <div>
                    <span className="text-xs font-semibold text-[#FBF9F5] block">
                      Complimentary Chauffeur Pickup & Drop
                    </span>
                    <span className="text-[10px] text-[#FBF9F5]/60">
                      Available across Pune city limits
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.transportRequired}
                  onChange={(e) => setFormData({ ...formData, transportRequired: e.target.checked })}
                  className="w-4 h-4 rounded text-[#D4B06A] accent-[#D4B06A]"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4B06A] via-[#E8C888] to-[#C29B4F] text-[#0B2D24] font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-lg flex items-center justify-center space-x-2 mt-4"
              >
                {submitting ? (
                  <span>Scheduling Visit...</span>
                ) : (
                  <>
                    <span>Confirm Site Visit Request</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <div className="text-[10px] text-center text-[#FBF9F5]/50 flex items-center justify-center space-x-1.5">
                <ShieldCheck className="w-3 h-3 text-[#52B788]" />
                <span>Zero obligations. Physical survey map & title extract provided on site.</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
