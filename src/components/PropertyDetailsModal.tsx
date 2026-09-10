import React from 'react';
import { Property } from '../types';
import { SiteTourVideoPlayer } from './SiteTourVideoPlayer';
import { 
  X, 
  MapPin, 
  Ruler, 
  ShieldCheck, 
  CheckCircle2, 
  Compass, 
  Phone, 
  Calendar, 
  IndianRupee,
  Layers,
  FileText,
  BadgeCheck,
  Navigation,
  ExternalLink,
  Clock,
  Sparkles,
  TrendingUp,
  Mail
} from 'lucide-react';

interface PropertyDetailsModalProps {
  property: Property | null;
  onClose: () => void;
  onOpenSiteVisit: (propertyName: string) => void;
}

export const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({
  property,
  onClose,
  onOpenSiteVisit,
}) => {
  if (!property) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071F19]/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-gradient-to-b from-[#123B31] via-[#0E3228] to-[#071F19] border border-[#D4B06A]/40 rounded-2xl shadow-2xl overflow-hidden text-[#FBF9F5] my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-[#0B2D24]/80 text-[#FBF9F5] hover:text-[#D4B06A] border border-[#D4B06A]/30 transition-colors backdrop-blur-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image in Modal */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-[#071F19]">
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-full object-cover filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E3228] via-[#0E3228]/40 to-transparent" />

          {/* Badges on Image */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0B2D24]/90 text-[#D4B06A] border border-[#D4B06A]/40 backdrop-blur-md">
              {property.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#123B31]/90 text-[#52B788] border border-[#52B788]/40 backdrop-blur-md flex items-center space-x-1">
              <BadgeCheck className="w-3.5 h-3.5" />
              <span>100% Clear Title</span>
            </span>
          </div>

          <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs text-[#D4B06A] uppercase font-semibold tracking-widest block">
                {property.location}
              </span>
              <h2 className="font-serif-heading text-2xl sm:text-3xl text-[#FBF9F5] font-bold">
                {property.title}
              </h2>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[11px] text-[#FBF9F5]/70 uppercase tracking-wider block">
                Starting Price
              </span>
              <span className="font-serif-heading text-2xl text-[#E8C888] font-bold">
                {property.price}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Sub Location & Tagline */}
          <div className="space-y-2">
            <p className="text-sm sm:text-base text-[#FBF9F5]/90 leading-relaxed font-normal">
              {property.tagline}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#D4B06A]">
              <span className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{property.subLocation}</span>
              </span>
              {property.mapUrl && (
                <a
                  href={property.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-[#071F19] border border-[#D4B06A]/40 text-[#E8C888] hover:text-[#FFF] transition-colors font-medium"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#52B788]" />
                  <span>Open Google Maps Directions</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              )}
            </div>
          </div>

          {/* Actual Video Tour Section */}
          {property.videoTour && (
            <SiteTourVideoPlayer 
              onBookVisit={() => {
                onClose();
                onOpenSiteVisit(property.title);
              }}
            />
          )}

          {/* Pricing & Plot Size Variant Box */}
          <div className="p-4 rounded-xl bg-[#071F19] border border-[#D4B06A]/30">
            <div className="flex items-center justify-between mb-3 border-b border-[#D4B06A]/15 pb-2">
              <h4 className="text-xs uppercase tracking-wider font-bold text-[#D4B06A] flex items-center space-x-1.5">
                <Ruler className="w-4 h-4" />
                <span>Available Plot Sizes & Pricing</span>
              </h4>
              <span className="text-[11px] text-[#52B788] font-semibold">100% Clear Title Ownership</span>
            </div>
            <div className="p-3.5 rounded-lg bg-[#123B31]/60 border border-[#D4B06A]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#D4B06A] font-semibold block">
                  Available Configurations
                </span>
                <span className="text-sm font-bold text-[#FBF9F5]">
                  11 Gunthas, Half Acre and 1 Acre
                </span>
              </div>
              <div className="sm:text-right border-t sm:border-t-0 border-[#D4B06A]/10 pt-2 sm:pt-0">
                <span className="text-[10px] uppercase tracking-wider text-[#D4B06A] font-semibold block">
                  Starting Price
                </span>
                <span className="font-serif-heading text-base font-bold text-[#E8C888]">
                  Starting at 21 Lacs
                </span>
              </div>
            </div>
          </div>

          {/* Future Plans & Views Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {property.futurePlans && (
              <div className="p-3.5 rounded-xl bg-[#123B31]/70 border border-[#52B788]/30 flex items-start space-x-3">
                <Sparkles className="w-5 h-5 text-[#52B788] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#52B788] block">Project Vision & Status</span>
                  <p className="text-xs text-[#FBF9F5]/85 leading-relaxed">{property.futurePlans}</p>
                </div>
              </div>
            )}

            {property.roiPotential && (
              <div className="p-3.5 rounded-xl bg-[#123B31]/70 border border-[#D4B06A]/30 flex items-start space-x-3">
                <TrendingUp className="w-5 h-5 text-[#D4B06A] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#D4B06A] block">20% ROI & Rental Optimization</span>
                  <p className="text-xs text-[#FBF9F5]/85 leading-relaxed">{property.roiPotential}</p>
                </div>
              </div>
            )}
          </div>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#071F19] border border-[#D4B06A]/20 text-xs">
            <div>
              <span className="text-[#D4B06A] block text-[10px] uppercase font-bold">Plot Range</span>
              <span className="font-semibold text-[#FBF9F5]">{property.plotSize}</span>
            </div>
            <div>
              <span className="text-[#D4B06A] block text-[10px] uppercase font-bold">Land Scale</span>
              <span className="font-semibold text-[#FBF9F5]">178+ Acres in Sahyadri</span>
            </div>
            <div>
              <span className="text-[#D4B06A] block text-[10px] uppercase font-bold">Internal Roads</span>
              <span className="font-semibold text-[#FBF9F5]">{property.roadWidth || '30-40 ft Roads'}</span>
            </div>
            <div>
              <span className="text-[#D4B06A] block text-[10px] uppercase font-bold">Possession</span>
              <span className="font-semibold text-[#52B788]">{property.possessionTime}</span>
            </div>
          </div>

          {/* Travel & Connectivity */}
          {property.connectivity && property.connectivity.length > 0 && (
            <div>
              <h4 className="font-serif-heading text-sm font-semibold text-[#E8C888] mb-2.5 flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[#D4B06A]" />
                <span>Strategic Distance & Connectivity</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {property.connectivity.map((c, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-[#071F19] border border-[#D4B06A]/20 text-center">
                    <span className="text-[10px] text-[#FBF9F5]/70 block">{c.place}</span>
                    <span className="text-xs font-bold text-[#E8C888] font-mono">{c.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Highlights & Verified Documents */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-serif-heading text-base font-semibold text-[#E8C888] mb-3 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#52B788]" />
                <span>Investment Advantages</span>
              </h4>
              <ul className="space-y-2 text-xs text-[#FBF9F5]/80">
                {property.highlights.map((hl, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-[#D4B06A] font-bold">•</span>
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-serif-heading text-base font-semibold text-[#E8C888] mb-3 flex items-center space-x-2">
                <FileText className="w-4 h-4 text-[#D4B06A]" />
                <span>Legal & Ownership Safeguards</span>
              </h4>
              <ul className="space-y-2 text-xs text-[#FBF9F5]/80">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#52B788]" />
                  <span>100% Clear Title with 7/12 Documentation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#52B788]" />
                  <span>Transparent Ownership from Documents to Possession</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#52B788]" />
                  <span>Hassle-Free Direct Registration Support</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#52B788]" />
                  <span>Planned Future NA Plotting Development</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Amenities / Infrastructure Chips */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#D4B06A] mb-2.5">
              Infrastructure & Site Development
            </h4>
            <div className="flex flex-wrap gap-2">
              {property.features.map((feat, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-[#071F19] border border-[#D4B06A]/20 text-xs text-[#FBF9F5]/90"
                >
                  ✓ {feat}
                </span>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-[#D4B06A]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#FBF9F5]/80">
              <a href="tel:09325552856" className="flex items-center space-x-1.5 hover:text-[#D4B06A] transition-colors">
                <Phone className="w-4 h-4 text-[#D4B06A]" />
                <span>09325552856</span>
              </a>
              <a href="mailto:libertellesales@gmail.com" className="flex items-center space-x-1.5 hover:text-[#D4B06A] transition-colors">
                <Mail className="w-4 h-4 text-[#D4B06A]" />
                <span>libertellesales@gmail.com</span>
              </a>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button
                onClick={() => {
                  onClose();
                  onOpenSiteVisit(property.title);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4B06A] via-[#E8C888] to-[#C29B4F] text-[#0B2D24] font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-lg flex items-center justify-center space-x-2"
              >
                <Compass className="w-4 h-4" />
                <span>Book Site Visit for this Plot</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
