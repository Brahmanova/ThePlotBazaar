import React, { useState, useEffect } from 'react';
import { Property } from '../types';
import { SiteTourVideoPlayer } from './SiteTourVideoPlayer';
import { EMICalculatorModal } from './EMICalculatorModal';
import { SiteVisitModal } from './SiteVisitModal';
import { TPBLogo } from './TPBLogo';
import { 
  ArrowLeft,
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
  Mail,
  Share2,
  Download,
  Check,
  Building,
  TreePine,
  ShieldAlert,
  ChevronRight,
  Maximize2,
  X
} from 'lucide-react';

interface PropertyDetailsPageProps {
  property: Property;
  onBack: () => void;
  onOpenSiteVisit: (propertyName?: string) => void;
}

export const PropertyDetailsPage: React.FC<PropertyDetailsPageProps> = ({
  property,
  onBack,
  onOpenSiteVisit,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'pricing' | 'video' | 'legal' | 'gallery'>('overview');
  const [calculatorOpen, setCalculatorOpen] = useState<boolean>(false);
  const [siteVisitOpen, setSiteVisitOpen] = useState<boolean>(false);
  const [activeGalleryImage, setActiveGalleryImage] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Quick enquiry form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDay, setPreferredDay] = useState('Saturday');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Set document title
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${property.title} | The Plot Bazaar`;
    window.scrollTo({ top: 0, behavior: 'instant' });
    return () => {
      document.title = prevTitle;
    };
  }, [property.title]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setFormSubmitted(true);
  };

  const allImages = [
    property.imageUrl,
    ...(property.gallery || [])
  ].filter((img, idx, arr) => arr.indexOf(img) === idx);

  return (
    <div className="min-h-screen bg-[#071F19] text-[#FBF9F5] font-sans selection:bg-[#D4B06A]/30 selection:text-[#FBF9F5] pb-24">
      
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#0B2D24]/95 backdrop-blur-md border-b border-[#D4B06A]/30 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={onBack}
              className="inline-flex items-center space-x-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[#123B31] border border-[#D4B06A]/40 text-xs sm:text-sm font-semibold text-[#E8C888] hover:text-[#FFF] hover:bg-[#1A4D41] transition-all"
              title="Return to Main Portal"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to All Properties</span>
              <span className="sm:hidden">Back</span>
            </button>

            <div className="h-6 w-px bg-[#D4B06A]/20 hidden sm:block" />

            <button
              onClick={onBack}
              className="flex items-center space-x-2.5 focus:outline-none text-left cursor-pointer group"
              title="Return to The Plot Bazaar"
            >
              <TPBLogo size="sm" showTagline={false} />
              <span className="hidden lg:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#123B31] text-[#D4B06A] border border-[#D4B06A]/30">
                Verified Dossier
              </span>
            </button>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={handleShare}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-[#123B31] border border-[#D4B06A]/40 text-xs text-[#E8C888] hover:text-[#FFF] transition-all flex items-center space-x-1.5"
              title="Share property link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-[#52B788]" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden md:inline">{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>

            <a
              href="tel:09325552856"
              className="hidden lg:inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-[#071F19] border border-[#D4B06A]/40 text-xs text-[#D4B06A] font-medium hover:text-[#FFF] transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>09325552856</span>
            </a>

            <button
              onClick={() => setSiteVisitOpen(true)}
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#D4B06A] via-[#E8C888] to-[#C29B4F] text-[#0B2D24] font-bold text-xs sm:text-sm uppercase tracking-wider hover:opacity-95 transition-all shadow-lg flex items-center space-x-1.5"
            >
              <Compass className="w-4 h-4" />
              <span>Book Site Visit</span>
            </button>
          </div>

        </div>
      </header>

      {/* Breadcrumb Navigation */}
      <div className="bg-[#0A261F] border-b border-[#D4B06A]/15 py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-2 text-xs text-[#FBF9F5]/70 overflow-x-auto">
          <button onClick={onBack} className="hover:text-[#D4B06A] transition-colors whitespace-nowrap">
            Home
          </button>
          <span>/</span>
          <button onClick={onBack} className="hover:text-[#D4B06A] transition-colors whitespace-nowrap">
            Pune Farmhouse Plots
          </button>
          <span>/</span>
          <span className="text-[#D4B06A] font-medium whitespace-nowrap">
            {property.title}
          </span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-8 sm:space-y-12">
        
        {/* Title & Key Highlight Banner */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0B2D24] text-[#D4B06A] border border-[#D4B06A]/40 backdrop-blur-md shadow-md">
              {property.category}
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#123B31] text-[#52B788] border border-[#52B788]/40 backdrop-blur-md flex items-center space-x-1.5 shadow-md">
              <BadgeCheck className="w-3.5 h-3.5" />
              <span>100% Clear Title (7/12 Direct Transfer)</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#D4B06A] to-[#C29B4F] text-[#0B2D24] shadow-md flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{property.status}</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#071F19] text-[#E8C888] border border-[#D4B06A]/30">
              178+ Acre Plotted Estate
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#D4B06A]/20">
            <div className="space-y-2">
              <h1 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FBF9F5] tracking-tight">
                {property.title}
              </h1>
              <p className="text-base sm:text-lg text-[#E8C888] max-w-3xl font-light leading-relaxed">
                {property.tagline}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#FBF9F5]/90 pt-1">
                <div className="flex items-center space-x-1.5 text-[#D4B06A]">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="font-medium">{property.location}</span>
                </div>
                <span className="text-[#D4B06A]/50">•</span>
                <span className="text-[#FBF9F5]/80">{property.subLocation}</span>
                {property.mapUrl && (
                  <>
                    <span className="text-[#D4B06A]/50">•</span>
                    <a
                      href={property.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-[#123B31] border border-[#52B788]/40 text-[#52B788] hover:text-[#FFF] transition-colors font-medium"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* Price Card */}
            <div className="bg-gradient-to-br from-[#123B31] to-[#071F19] border-2 border-[#D4B06A]/40 rounded-2xl p-5 sm:p-6 shadow-2xl min-w-[280px]">
              <span className="text-xs uppercase tracking-widest text-[#D4B06A] font-bold block mb-1">
                Investment Starting Price
              </span>
              <div className="font-serif-heading text-3xl sm:text-4xl text-[#FBF9F5] font-bold">
                {property.price}
              </div>
              <div className="flex items-center justify-between text-xs text-[#FBF9F5]/70 mt-2 pt-2 border-t border-[#D4B06A]/20">
                <span>{property.pricePerSqFt}</span>
                <span className="text-[#52B788] font-semibold">100% Clear Title</span>
              </div>
              <button
                onClick={() => setCalculatorOpen(true)}
                className="w-full mt-3 py-2 rounded-xl bg-[#071F19] border border-[#D4B06A]/30 text-[#E8C888] hover:text-[#FFF] hover:bg-[#0B2D24] text-xs font-semibold transition-all flex items-center justify-center space-x-1.5"
              >
                <IndianRupee className="w-3.5 h-3.5 text-[#D4B06A]" />
                <span>Calculate EMI & Payment Plan</span>
              </button>
            </div>
          </div>
        </section>

        {/* Section 1: Actual Site Video Tour Player */}
        <section id="video-tour" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4B06A] block">
                Actual Ground-Truth Footage
              </span>
              <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#FBF9F5] flex items-center space-x-2">
                <span>Live 4K Site Drone Tour & Fort Sightlines</span>
              </h2>
            </div>
            <span className="text-xs text-[#FBF9F5]/70">
              4 HD Drone & Sunset Reels filmed on site at Velvand Bhor
            </span>
          </div>

          <div className="rounded-2xl overflow-hidden border-2 border-[#D4B06A]/40 shadow-2xl bg-[#071F19]">
            <SiteTourVideoPlayer 
              onBookVisit={() => setSiteVisitOpen(true)} 
            />
          </div>
        </section>

        {/* Section 2: Available Plot Options & Starting Price */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4B06A] block">
                Plot Inventory & Options
              </span>
              <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#FBF9F5] flex items-center space-x-2">
                <Ruler className="w-6 h-6 text-[#D4B06A]" />
                <span>Available Plot Configurations</span>
              </h2>
            </div>
            <span className="text-xs text-[#52B788] font-bold">
              ✓ Ready For Immediate Demarcation
            </span>
          </div>

          <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-b from-[#123B31] to-[#0B2D24] border border-[#D4B06A]/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold uppercase bg-[#071F19] text-[#D4B06A] border border-[#D4B06A]/30">
                <span>Verified Clear Title Plots</span>
              </div>
              <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#FBF9F5]">
                11 Gunthas, Half Acre and 1 Acre
              </h3>
              <p className="text-xs sm:text-sm text-[#FBF9F5]/80 max-w-xl leading-relaxed">
                Choose from pre-demarcated 11 Gunthas (~11,000 sq.ft.), Half Acre (~21,780 sq.ft.), and 1 Acre (~43,560 sq.ft.) agricultural investment plots with 30-40 ft internal road connectivity, separate 7/12 extract, and immediate possession assistance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-between gap-4 border-t md:border-t-0 md:border-l border-[#D4B06A]/20 pt-4 md:pt-0 md:pl-8 flex-shrink-0">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#D4B06A] font-bold block">
                  All-Inclusive Pricing
                </span>
                <div className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#E8C888]">
                  Starting at 21 Lacs
                </div>
              </div>

              <button
                onClick={() => onOpenSiteVisit(`${property.title} - Site Visit`)}
                className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#D4B06A] to-[#C29B4F] text-[#0B2D24] text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-md flex items-center space-x-2"
              >
                <Compass className="w-4 h-4" />
                <span>Reserve Site Visit</span>
              </button>
            </div>
          </div>
        </section>

        {/* Section 3: Key Specifications & Estate Matrix */}
        <section className="bg-gradient-to-b from-[#0B2D24] to-[#071F19] border border-[#D4B06A]/30 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-[#D4B06A]/20 pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4B06A] block">
              Land Infrastructure & Features
            </span>
            <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#FBF9F5]">
              Project Specifications & Site Development
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#071F19] border border-[#D4B06A]/20">
              <span className="text-xs uppercase text-[#D4B06A] font-bold block mb-1">Total Estate Size</span>
              <span className="font-serif-heading text-xl font-bold text-[#FBF9F5]">178+ Acres</span>
              <span className="text-[11px] text-[#FBF9F5]/60 block mt-1">Scenic Sahyadri foothills</span>
            </div>

            <div className="p-4 rounded-xl bg-[#071F19] border border-[#D4B06A]/20">
              <span className="text-xs uppercase text-[#D4B06A] font-bold block mb-1">Internal Roads</span>
              <span className="font-serif-heading text-xl font-bold text-[#FBF9F5]">{property.roadWidth || '30-40 ft Wide'}</span>
              <span className="text-[11px] text-[#FBF9F5]/60 block mt-1">Grooved all-weather concrete</span>
            </div>

            <div className="p-4 rounded-xl bg-[#071F19] border border-[#D4B06A]/20">
              <span className="text-xs uppercase text-[#D4B06A] font-bold block mb-1">Security & Access</span>
              <span className="font-serif-heading text-xl font-bold text-[#FBF9F5]">Gated Compound</span>
              <span className="text-[11px] text-[#FBF9F5]/60 block mt-1">Heavy iron gate & security cabin</span>
            </div>

            <div className="p-4 rounded-xl bg-[#071F19] border border-[#D4B06A]/20">
              <span className="text-xs uppercase text-[#D4B06A] font-bold block mb-1">Ownership / Transfer</span>
              <span className="font-serif-heading text-xl font-bold text-[#52B788]">Immediate 7/12</span>
              <span className="text-[11px] text-[#FBF9F5]/60 block mt-1">Direct registry assistance</span>
            </div>
          </div>

          {/* Amenities checklist */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#D4B06A] mb-3">
              Included Estate Amenities & Site Provisions:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {property.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#123B31]/70 border border-[#D4B06A]/20 text-xs text-[#FBF9F5] flex items-center space-x-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#52B788] flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Historic Sightlines & Landmark Views */}
        {property.videoTour?.landmarks && (
          <section className="space-y-4">
            <div className="border-b border-[#D4B06A]/20 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4B06A] block">
                Historic Maratha Heritage & Natural Vistas
              </span>
              <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#FBF9F5]">
                Direct Views of 3 Iconic Sahyadri Forts & Backwaters
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {property.videoTour.landmarks.map((lm, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#0B2D24] border border-[#D4B06A]/30 hover:border-[#D4B06A]/70 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#071F19] text-[#D4B06A] border border-[#D4B06A]/30 inline-block mb-3">
                      {lm.tag}
                    </span>
                    <h3 className="font-serif-heading text-lg font-bold text-[#FBF9F5] mb-1">
                      {lm.name}
                    </h3>
                    <p className="text-xs font-medium text-[#E8C888] mb-2 font-mono">
                      {lm.marathiTitle}
                    </p>
                    <p className="text-xs text-[#FBF9F5]/80 leading-relaxed">
                      {lm.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 5: Strategic Connectivity & Distance */}
        {property.connectivity && property.connectivity.length > 0 && (
          <section className="bg-[#0B2D24] border border-[#D4B06A]/30 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="border-b border-[#D4B06A]/20 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#D4B06A] block">
                  Location Proximity
                </span>
                <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#FBF9F5] flex items-center space-x-2">
                  <Clock className="w-6 h-6 text-[#D4B06A]" />
                  <span>Connectivity & Estimated Travel Times</span>
                </h2>
              </div>
              <span className="text-xs text-[#E8C888]">
                Accessible via smooth Pune-Bangalore Highway (NH-48) & Bhor Ghat Road
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {property.connectivity.map((conn, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#071F19] border border-[#D4B06A]/20 text-center">
                  <span className="text-xs text-[#FBF9F5]/70 block mb-1">{conn.place}</span>
                  <span className="font-serif-heading text-2xl font-bold text-[#E8C888] font-mono">{conn.time}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 6: Legal Verification & Clear Title Guarantee */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0B2D24] border-2 border-[#52B788]/40 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-2xl bg-[#123B31] border border-[#52B788]/40 text-[#52B788]">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-[#52B788] block">Due Diligence</span>
                <h3 className="font-serif-heading text-xl font-bold text-[#FBF9F5]">100% Clear Title Verification</h3>
              </div>
            </div>
            
            <ul className="space-y-3 text-xs sm:text-sm text-[#FBF9F5]/85">
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#52B788] mt-0.5 flex-shrink-0" />
                <span><strong>Verified 7/12 Extract:</strong> Single ownership documentation with clear ancestral title history and no encumbrances.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#52B788] mt-0.5 flex-shrink-0" />
                <span><strong>Demarcated Boundaries:</strong> Every individual plot is marked with concrete boundary pillars and GPS coordinates.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#52B788] mt-0.5 flex-shrink-0" />
                <span><strong>Direct Sub-Registrar Transfer:</strong> Full legal registration done directly in buyer's name at the Bhor registration office.</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#52B788] mt-0.5 flex-shrink-0" />
                <span><strong>Future NA Masterplan:</strong> Master layout planned for smooth progression into NA residential plotting.</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#0B2D24] border-2 border-[#D4B06A]/40 rounded-3xl p-6 sm:p-8 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-[#123B31] border border-[#D4B06A]/40 text-[#D4B06A]">
                  <TrendingUp className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-[#D4B06A] block">Capital Growth</span>
                  <h3 className="font-serif-heading text-xl font-bold text-[#FBF9F5]">20% Per Annum ROI & Rental Yield</h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#FBF9F5]/85 leading-relaxed">
                {property.roiPotential}
              </p>

              <div className="p-4 rounded-xl bg-[#071F19] border border-[#D4B06A]/20 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#FBF9F5]/70">Weekend Villa Rental Demand:</span>
                  <strong className="text-[#52B788]">₹15,000 - ₹25,000 / night</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#FBF9F5]/70">Land Value Appreciation:</span>
                  <strong className="text-[#D4B06A]">18% - 22% Year-over-Year</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#FBF9F5]/70">Ideal Use:</span>
                  <strong className="text-[#FBF9F5]">Luxury Agro-Tourism, Farmhouse, Treehouse</strong>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCalculatorOpen(true)}
              className="w-full py-3 rounded-xl bg-[#123B31] border border-[#D4B06A]/40 text-[#E8C888] hover:text-[#FFF] hover:bg-[#1A4D41] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2"
            >
              <IndianRupee className="w-4 h-4 text-[#D4B06A]" />
              <span>Simulate 5-Year Land ROI</span>
            </button>
          </div>
        </section>

        {/* Section 7: High Resolution Photo Gallery */}
        <section className="space-y-4">
          <div className="border-b border-[#D4B06A]/20 pb-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4B06A] block">
                Visual Inspection
              </span>
              <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#FBF9F5]">
                Estate Photo Gallery
              </h2>
            </div>
            <span className="text-xs text-[#FBF9F5]/70">
              Click any photo to enlarge
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {allImages.map((imgUrl, i) => (
              <div
                key={i}
                onClick={() => setActiveGalleryImage(imgUrl)}
                className="relative h-64 rounded-2xl overflow-hidden cursor-pointer group border border-[#D4B06A]/30 shadow-lg"
              >
                <img
                  src={imgUrl}
                  alt={`Libertelle ground photo ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071F19] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#FBF9F5]">
                  <span className="font-medium">Site Perspective {i + 1}</span>
                  <div className="p-1.5 rounded-lg bg-[#071F19]/80 text-[#D4B06A]">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 8: Direct Site Visit Booking & Consultation Box */}
        <section className="bg-gradient-to-br from-[#123B31] via-[#0E3228] to-[#071F19] border-2 border-[#D4B06A] rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            <div className="space-y-4">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#071F19] text-[#D4B06A] border border-[#D4B06A]/40 inline-block">
                Free Private Cab & Site Tour
              </span>
              <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#FBF9F5]">
                Experience Libertellè In Person This Weekend
              </h2>
              <p className="text-sm sm:text-base text-[#FBF9F5]/85 leading-relaxed">
                We arrange complimentary door-to-door cab pickup from Pune, guided site walkthrough with our senior land specialist, and review of all original 7/12 title deeds.
              </p>
              
              <div className="space-y-2.5 text-xs sm:text-sm text-[#FBF9F5]/90 pt-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#52B788]" />
                  <span>Complimentary AC cab pickup & drop from anywhere in Pune</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#52B788]" />
                  <span>Direct physical boundary stone demarcation check</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#52B788]" />
                  <span>Complete legal dossier & 7/12 title inspection</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4 items-center">
                <a
                  href="tel:09325552856"
                  className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-[#071F19] border border-[#D4B06A]/40 text-xs font-bold text-[#D4B06A] hover:text-[#FFF] hover:border-[#D4B06A] transition-all shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Direct Advisory: 09325552856</span>
                </a>
              </div>
            </div>

            {/* Quick RSVP Form */}
            <div className="bg-[#071F19]/90 border border-[#D4B06A]/30 rounded-2xl p-6 sm:p-8">
              <h3 className="font-serif-heading text-xl font-bold text-[#FBF9F5] mb-1">
                Schedule Your Site Visit
              </h3>
              <p className="text-xs text-[#FBF9F5]/70 mb-5">
                Our land advisory team will call you within 15 minutes to confirm timings.
              </p>

              {formSubmitted ? (
                <div className="p-6 rounded-xl bg-[#123B31] border border-[#52B788]/40 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-[#52B788] mx-auto" />
                  <h4 className="font-bold text-[#FBF9F5] text-sm">Site Visit Request Received!</h4>
                  <p className="text-xs text-[#FBF9F5]/80">
                    Our land specialist will call you shortly to confirm your complimentary cab pickup and timings.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-[#D4B06A] block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0B2D24] border border-[#D4B06A]/30 text-[#FBF9F5] text-xs focus:outline-none focus:border-[#D4B06A]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#D4B06A] block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0B2D24] border border-[#D4B06A]/30 text-[#FBF9F5] text-xs focus:outline-none focus:border-[#D4B06A]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#D4B06A] block mb-1">Preferred Day for Visit</label>
                    <select
                      value={preferredDay}
                      onChange={(e) => setPreferredDay(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0B2D24] border border-[#D4B06A]/30 text-[#FBF9F5] text-xs focus:outline-none focus:border-[#D4B06A]"
                    >
                      <option value="Saturday">This Saturday (Recommended)</option>
                      <option value="Sunday">This Sunday (Recommended)</option>
                      <option value="Weekday">Weekday (Personalized timing)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4B06A] via-[#E8C888] to-[#C29B4F] text-[#0B2D24] font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-lg flex items-center justify-center space-x-2"
                  >
                    <Compass className="w-4 h-4" />
                    <span>Confirm Complimentary Cab Visit</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-[#D4B06A]/20 bg-[#051813] py-8 text-xs text-[#FBF9F5]/60 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
            <span>
              © {new Date().getFullYear()} <strong className="text-[#FBF9F5]">The Plot Bazaar</strong>. All Rights Reserved.
            </span>
            <span className="hidden sm:inline text-[#D4B06A]/40">•</span>
            <span>
              Design and Crafted by{' '}
              <a
                href="https://brahmanova.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4B06A] font-semibold hover:text-[#FFF] hover:underline transition-colors"
              >
                BRAHMANOVA
              </a>
            </span>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-2 rounded-lg bg-[#123B31] border border-[#D4B06A]/30 text-[#D4B06A] hover:bg-[#1A4D41] transition-colors flex items-center space-x-1"
            title="Scroll to Top"
          >
            <ArrowLeft className="w-3.5 h-3.5 rotate-90" />
            <span className="text-[11px]">Top</span>
          </button>
        </div>
      </footer>

      {/* Floating Bottom Bar on Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0B2D24]/95 backdrop-blur-md border-t border-[#D4B06A]/30 p-3 sm:hidden flex items-center justify-between gap-3 shadow-2xl">
        <div className="leading-tight">
          <span className="text-[10px] uppercase text-[#D4B06A] font-bold block">Starting</span>
          <span className="font-serif-heading text-lg font-bold text-[#FBF9F5]">{property.price}</span>
        </div>

        <div className="flex items-center space-x-2">
          <a
            href="tel:09325552856"
            className="p-2.5 rounded-xl bg-[#123B31] border border-[#D4B06A]/40 text-[#D4B06A] hover:text-[#FFF]"
            title="Call Land Advisory"
          >
            <Phone className="w-5 h-5" />
          </a>
          <button
            onClick={() => setSiteVisitOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4B06A] to-[#C29B4F] text-[#0B2D24] font-bold text-xs uppercase tracking-wider shadow-lg"
          >
            Book Visit
          </button>
        </div>
      </div>

      {/* Lightbox Modal for Gallery Images */}
      {activeGalleryImage && (
        <div 
          className="fixed inset-0 z-50 bg-[#071F19]/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveGalleryImage(null)}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setActiveGalleryImage(null)}
              className="absolute -top-12 right-0 p-2 rounded-xl bg-[#123B31] text-[#FBF9F5] hover:text-[#D4B06A] border border-[#D4B06A]/30"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={activeGalleryImage}
              alt="Enlarged view"
              className="max-h-[85vh] w-auto object-contain rounded-2xl border-2 border-[#D4B06A]/50 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* EMI Calculator Modal */}
      <EMICalculatorModal
        isOpen={calculatorOpen}
        onClose={() => setCalculatorOpen(false)}
        onOpenSiteVisit={() => {
          setCalculatorOpen(false);
          setSiteVisitOpen(true);
        }}
      />

      {/* Site Visit Modal */}
      <SiteVisitModal
        isOpen={siteVisitOpen}
        onClose={() => setSiteVisitOpen(false)}
        initialProperty={property.title}
      />

    </div>
  );
};
