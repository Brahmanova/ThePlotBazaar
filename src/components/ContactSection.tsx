import React, { useState } from 'react';
import { ContactFormData } from '../types';
import { 
  Phone, 
  MapPin, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    email: '',
    interestedLocation: 'Kharadi / East Pune',
    budgetRange: '₹25L - ₹40L',
    message: '',
    purpose: 'Investment',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      interestedLocation: 'Kharadi / East Pune',
      budgetRange: '₹25L - ₹40L',
      message: '',
      purpose: 'Investment',
    });
  };

  return (
    <section id="contact" className="py-24 bg-[#0B2D24] relative border-t border-[#D4B06A]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#123B31] border border-[#D4B06A]/30 text-[#D4B06A] text-xs font-semibold uppercase tracking-widest mb-4">
            <Mail className="w-3.5 h-3.5 text-[#D4B06A]" />
            <span>Connect with Land Specialists</span>
          </div>

          <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#FBF9F5] font-normal tracking-tight">
            Begin Your Land Investment Journey
          </h2>

          <p className="mt-4 text-base text-[#FBF9F5]/75 leading-relaxed">
            Have questions regarding title verification, plot demarcations, or upcoming projects? Reach out directly or visit our office in Kharadi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Contact Cards, Direct Action Buttons & Map Placeholder */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Details Card */}
            <div className="p-8 rounded-2xl bg-gradient-to-b from-[#123B31]/80 to-[#071F19]/95 border border-[#D4B06A]/25 shadow-xl space-y-6">
              
              <h3 className="font-serif-heading text-2xl text-[#FBF9F5] font-semibold border-b border-[#D4B06A]/15 pb-4">
                Contact Information
              </h3>

              {/* Phone Item */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-[#0B2D24] border border-[#D4B06A]/40 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#D4B06A]" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#D4B06A] font-bold block">
                    Direct Phone / Hotline
                  </span>
                  <a
                    href="tel:9325552856"
                    className="text-lg font-serif-heading font-semibold text-[#FBF9F5] hover:text-[#E8C888] transition-colors"
                  >
                    9325552856
                  </a>
                  <p className="text-xs text-[#FBF9F5]/60 mt-0.5">
                    Available Monday to Sunday (9:00 AM – 8:00 PM)
                  </p>
                </div>
              </div>

              {/* Address Item */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-[#0B2D24] border border-[#D4B06A]/40 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#D4B06A]" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#D4B06A] font-bold block">
                    Office Address
                  </span>
                  <p className="text-sm font-medium text-[#FBF9F5] leading-relaxed">
                    Business Global Hub, C-419, Kharadi, Pune 411014
                  </p>
                  <p className="text-xs text-[#FBF9F5]/60 mt-0.5">
                    Maharashtra, India
                  </p>
                </div>
              </div>

              {/* Advisory Hours */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-[#0B2D24] border border-[#D4B06A]/40 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#D4B06A]" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#D4B06A] font-bold block">
                    Consultation & Site Visits
                  </span>
                  <p className="text-xs text-[#FBF9F5]/80 leading-relaxed">
                    Office visits by appointment. Site visits arranged with private transport 7 days a week.
                  </p>
                </div>
              </div>

              {/* Action Button: Call Us */}
              <div className="pt-4 border-t border-[#D4B06A]/15">
                <a
                  href="tel:9325552856"
                  className="w-full py-3 px-4 rounded-xl bg-[#123B31] border border-[#D4B06A]/40 text-[#FBF9F5] hover:bg-[#1A4D41] transition-all font-semibold text-xs text-center flex items-center justify-center space-x-2 shadow-md"
                >
                  <Phone className="w-4 h-4 text-[#D4B06A]" />
                  <span>Call Us: +91 9325552856</span>
                </a>
              </div>

            </div>

            {/* Google Maps Location Card Placeholder */}
            <div className="rounded-2xl bg-[#071F19] border border-[#D4B06A]/25 p-5 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-[#D4B06A]" />
                  <span className="text-xs font-semibold text-[#FBF9F5]">Kharadi Prime Hub Location</span>
                </div>
                <a
                  href="https://maps.google.com/?q=Business+Global+Hub+Kharadi+Pune"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-[#D4B06A] hover:underline flex items-center space-x-1"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Map Visual Container */}
              <div className="relative h-44 rounded-xl overflow-hidden border border-[#D4B06A]/15 bg-[#0B2D24] flex items-center justify-center">
                <iframe
                  title="The Plot Bazaar Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.261298150493!2d73.93510527599026!3d18.562254382539958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c1404c08801d%3A0xb24d08ecaa8ff870!2sKharadi%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  className="w-full h-full border-0 filter invert-[0.9] hue-rotate-[145deg] contrast-[1.2] opacity-80"
                  loading="lazy"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-[#071F19]/90 backdrop-blur-md p-2 rounded-lg border border-[#D4B06A]/30 text-[10px] text-[#FBF9F5]/90 flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-[#D4B06A] flex-shrink-0" />
                  <span className="truncate">Business Global Hub, C-419, Kharadi, Pune</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact & Lead Capture Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-b from-[#123B31]/85 to-[#071F19]/95 border border-[#D4B06A]/30 shadow-2xl relative">
              
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#123B31] border border-[#52B788] flex items-center justify-center mx-auto text-[#52B788]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif-heading text-2xl text-[#FBF9F5] font-semibold">
                    Thank You, {formData.name}!
                  </h3>
                  <p className="text-sm text-[#FBF9F5]/80 max-w-md mx-auto leading-relaxed">
                    Your inquiry has been received. Our senior land advisor will review your preferred location ({formData.interestedLocation}) and call you at <strong className="text-[#D4B06A]">{formData.phone}</strong> shortly.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={handleReset}
                      className="px-6 py-2.5 rounded-xl border border-[#D4B06A]/40 text-[#D4B06A] text-xs font-semibold hover:bg-[#123B31] transition-colors"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center justify-between border-b border-[#D4B06A]/15 pb-4 mb-2">
                    <div>
                      <h3 className="font-serif-heading text-2xl text-[#FBF9F5] font-semibold">
                        Request Plot Dossier & Consultation
                      </h3>
                      <p className="text-xs text-[#FBF9F5]/70 mt-0.5">
                        Guaranteed response within 2 business hours.
                      </p>
                    </div>
                    <ShieldCheck className="w-6 h-6 text-[#52B788]" />
                  </div>

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#FBF9F5]/80 uppercase tracking-wider mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rajesh Patil"
                        className="w-full bg-[#071F19] text-[#FBF9F5] text-xs rounded-xl border border-[#D4B06A]/25 px-4 py-3 placeholder-[#FBF9F5]/35 focus:outline-none focus:border-[#D4B06A]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#FBF9F5]/80 uppercase tracking-wider mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 9325552856"
                        className="w-full bg-[#071F19] text-[#FBF9F5] text-xs rounded-xl border border-[#D4B06A]/25 px-4 py-3 placeholder-[#FBF9F5]/35 focus:outline-none focus:border-[#D4B06A]"
                      />
                    </div>
                  </div>

                  {/* Email & Purpose */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#FBF9F5]/80 uppercase tracking-wider mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. rajesh@example.com"
                        className="w-full bg-[#071F19] text-[#FBF9F5] text-xs rounded-xl border border-[#D4B06A]/25 px-4 py-3 placeholder-[#FBF9F5]/35 focus:outline-none focus:border-[#D4B06A]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#FBF9F5]/80 uppercase tracking-wider mb-1.5">
                        Investment Purpose
                      </label>
                      <select
                        value={formData.purpose}
                        onChange={(e) => setFormData({ ...formData, purpose: e.target.value as any })}
                        className="w-full bg-[#071F19] text-[#FBF9F5] text-xs rounded-xl border border-[#D4B06A]/25 px-4 py-3 focus:outline-none focus:border-[#D4B06A]"
                      >
                        <option value="Investment">Long-term Capital Growth</option>
                        <option value="Immediate Construction">Immediate Villa / Bungalow Construction</option>
                        <option value="Farmhouse / Weekend Home">Farmhouse / Weekend Getaway</option>
                        <option value="General Inquiry">General Advisory / Title Inquiry</option>
                      </select>
                    </div>
                  </div>

                  {/* Interested Location & Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#FBF9F5]/80 uppercase tracking-wider mb-1.5">
                        Preferred Location
                      </label>
                      <select
                        value={formData.interestedLocation}
                        onChange={(e) => setFormData({ ...formData, interestedLocation: e.target.value })}
                        className="w-full bg-[#071F19] text-[#FBF9F5] text-xs rounded-xl border border-[#D4B06A]/25 px-4 py-3 focus:outline-none focus:border-[#D4B06A]"
                      >
                        <option value="Kharadi / East Pune">Kharadi / Wagholi / East Pune</option>
                        <option value="Shirwal / South Pune">Shirwal / Pune-Bangalore Corridor</option>
                        <option value="Hinjawadi / West Pune">Hinjawadi / Marunji / West Pune</option>
                        <option value="Pirangut / Paud Road">Pirangut / Mulshi / Paud Road</option>
                        <option value="Open to recommendations">Open to high-growth recommendations</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#FBF9F5]/80 uppercase tracking-wider mb-1.5">
                        Target Budget
                      </label>
                      <select
                        value={formData.budgetRange}
                        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                        className="w-full bg-[#071F19] text-[#FBF9F5] text-xs rounded-xl border border-[#D4B06A]/25 px-4 py-3 focus:outline-none focus:border-[#D4B06A]"
                      >
                        <option value="Under ₹20 Lakhs">Under ₹20 Lakhs</option>
                        <option value="₹20L - ₹35L">₹20 Lakhs – ₹35 Lakhs</option>
                        <option value="₹35L - ₹50L">₹35 Lakhs – ₹50 Lakhs</option>
                        <option value="₹50L+">₹50 Lakhs & Above</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#FBF9F5]/80 uppercase tracking-wider mb-1.5">
                      Specific Requirements or Questions (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. Looking for a 3,000 sq ft gated plot with immediate registration and electricity connection..."
                      className="w-full bg-[#071F19] text-[#FBF9F5] text-xs rounded-xl border border-[#D4B06A]/25 px-4 py-3 placeholder-[#FBF9F5]/35 focus:outline-none focus:border-[#D4B06A]"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4B06A] via-[#E8C888] to-[#C29B4F] text-[#0B2D24] font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-lg flex items-center justify-center space-x-2"
                  >
                    {submitting ? (
                      <span>Submitting Inquiry...</span>
                    ) : (
                      <>
                        <span>Submit Inquiry & Receive Plot Dossier</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-[#FBF9F5]/50 text-center">
                    🔒 Your details are strictly confidential. We never spam or share your contact number.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
