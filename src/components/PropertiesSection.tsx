import React, { useState, useEffect, useRef } from 'react';
import { Property, FilterState } from '../types';
import { SAMPLE_PROPERTIES } from '../data/mockData';
import { 
  Building, 
  MapPin, 
  Ruler, 
  ShieldCheck, 
  Check, 
  Clock, 
  Eye, 
  Compass,
  BellRing,
  RotateCcw,
  SlidersHorizontal,
  Navigation,
  ExternalLink,
  Sparkles,
  TrendingUp,
  Award,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Maximize2
} from 'lucide-react';
import { 
  loadAllStoredVideos, 
  getAllExternalVideoUrls, 
  parseVideoMediaSource 
} from '../utils/videoStorage';
import { VIDEO_ASSETS, resolveVideoSource } from '../utils/videoAssets';

interface PropertiesSectionProps {
  onSelectProperty: (property: Property) => void;
  onOpenSiteVisit: (propertyName?: string) => void;
}

export const PropertiesSection: React.FC<PropertiesSectionProps> = ({
  onSelectProperty,
  onOpenSiteVisit,
}) => {
  // Properties array from data
  const properties: Property[] = SAMPLE_PROPERTIES;

  // Video State for property card banner
  const [isBannerMuted, setIsBannerMuted] = useState(true);
  const [isBannerPlaying, setIsBannerPlaying] = useState(true);
  const bannerVideoRef = useRef<HTMLVideoElement | null>(null);

  const [storedVideos, setStoredVideos] = useState<{ [trackId: string]: { url: string; name: string; size: number } }>({});
  const [externalUrls, setExternalUrls] = useState<{ [trackId: string]: string }>({});

  useEffect(() => {
    loadAllStoredVideos().then(setStoredVideos).catch(() => {});
    setExternalUrls(getAllExternalVideoUrls());
  }, []);

  // Resolve drone video source for the banner
  const getBannerVideoSrc = () => {
    if (storedVideos['monsoon-drone']?.url) return storedVideos['monsoon-drone'].url;
    if (storedVideos['drone-aerial']?.url) return storedVideos['drone-aerial'].url;
    if (externalUrls['monsoon-drone']) return externalUrls['monsoon-drone'];
    if (externalUrls['drone-aerial']) return externalUrls['drone-aerial'];
    return resolveVideoSource('drone-aerial', '/videos/video-drone.mp4');
  };

  // Resolve link destination to open full property details in a new browser tab/window
  const getBannerDestinationUrl = (prop: Property) => {
    return `?property=${prop.slug || prop.id}`;
  };

  // Filters State
  const [filters, setFilters] = useState<FilterState>({
    location: 'all',
    budget: 'all',
    plotSize: 'all',
    category: 'all',
  });

  const [notificationEmail, setNotificationEmail] = useState('');
  const [notified, setNotified] = useState(false);

  // Filter logic
  const filteredProperties = properties.filter((p) => {
    if (filters.location !== 'all' && !p.location.toLowerCase().includes(filters.location.toLowerCase()) && !p.subLocation.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    if (filters.category !== 'all' && p.category !== filters.category) {
      return false;
    }
    if (filters.budget !== 'all') {
      if (filters.budget === 'under-25' && p.priceNumeric > 2500000) return false;
      if (filters.budget === '25-40' && (p.priceNumeric < 2500000 || p.priceNumeric > 4000000)) return false;
      if (filters.budget === 'above-40' && p.priceNumeric < 4000000) return false;
    }
    if (filters.plotSize !== 'all') {
      if (filters.plotSize === 'under-2000' && p.plotSizeSqFt > 2000) return false;
      if (filters.plotSize === '2000-5000' && (p.plotSizeSqFt < 2000 || p.plotSizeSqFt > 5000)) return false;
      if (filters.plotSize === 'above-5000' && p.plotSizeSqFt < 5000) return false;
    }
    return true;
  });

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (notificationEmail) {
      setNotified(true);
      setTimeout(() => setNotified(false), 5000);
      setNotificationEmail('');
    }
  };

  const resetFilters = () => {
    setFilters({
      location: 'all',
      budget: 'all',
      plotSize: 'all',
      category: 'all',
    });
  };

  const hasProperties = properties.length > 0;

  return (
    <section id="properties" className="py-24 bg-gradient-to-b from-[#0B2D24] via-[#071F19] to-[#0B2D24] relative border-t border-[#D4B06A]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-center md:text-left">
          <div className="max-w-2xl mx-auto md:mx-0">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#123B31] border border-[#D4B06A]/30 text-[#D4B06A] text-xs font-semibold uppercase tracking-widest mb-3">
              <Building className="w-3.5 h-3.5 text-[#D4B06A]" />
              <span>Investment Portfolio</span>
            </div>

            <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#FBF9F5] font-normal tracking-tight">
              Featured Land & Plot Opportunities
            </h2>

            <p className="mt-3 text-sm sm:text-base text-[#FBF9F5]/75">
              Carefully curated, legally vetted land plots across Pune's high-appreciation corridors with clear titles and panoramic natural surroundings.
            </p>
          </div>

          <div className="flex items-center justify-center md:justify-end">
            <button
              onClick={() => onOpenSiteVisit()}
              className="px-5 py-2.5 rounded-xl border border-[#D4B06A]/40 text-[#D4B06A] hover:bg-[#123B31] text-xs font-semibold tracking-wider transition-all flex items-center space-x-2"
            >
              <Compass className="w-4 h-4" />
              <span>Schedule Site Visit</span>
            </button>
          </div>
        </div>

        {/* Filter Bar (Only shown if properties exist) */}
        {hasProperties && (
          <div className="p-5 rounded-2xl bg-[#123B31]/60 border border-[#D4B06A]/20 backdrop-blur-md mb-10 shadow-lg">
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#D4B06A] mb-4">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filter Investment Opportunities</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Location Filter */}
              <div>
                <label className="block text-[11px] font-medium text-[#FBF9F5]/70 uppercase tracking-wider mb-1.5">
                  Location
                </label>
                <select
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="w-full bg-[#071F19] text-[#FBF9F5] text-xs rounded-xl border border-[#D4B06A]/25 px-3.5 py-2.5 focus:outline-none focus:border-[#D4B06A]"
                >
                  <option value="all">All Locations</option>
                  <option value="Bhor">Bhor / Velvand (Bhatghar Dam)</option>
                  <option value="Kharadi">Kharadi / East Pune</option>
                  <option value="Shirwal">Shirwal / South Pune</option>
                  <option value="Hinjawadi">Hinjawadi / West Pune</option>
                </select>
              </div>

              {/* Budget Filter */}
              <div>
                <label className="block text-[11px] font-medium text-[#FBF9F5]/70 uppercase tracking-wider mb-1.5">
                  Budget Range
                </label>
                <select
                  value={filters.budget}
                  onChange={(e) => setFilters({ ...filters, budget: e.target.value })}
                  className="w-full bg-[#071F19] text-[#FBF9F5] text-xs rounded-xl border border-[#D4B06A]/25 px-3.5 py-2.5 focus:outline-none focus:border-[#D4B06A]"
                >
                  <option value="all">Any Budget</option>
                  <option value="under-25">₹21 Lakhs - ₹25 Lakhs (11,000 Sq. Ft.)</option>
                  <option value="25-40">₹25 Lakhs - ₹40 Lakhs (Half Acre)</option>
                  <option value="above-40">Above ₹40 Lakhs (1 Acre+)</option>
                </select>
              </div>

              {/* Plot Size Filter */}
              <div>
                <label className="block text-[11px] font-medium text-[#FBF9F5]/70 uppercase tracking-wider mb-1.5">
                  Plot Size
                </label>
                <select
                  value={filters.plotSize}
                  onChange={(e) => setFilters({ ...filters, plotSize: e.target.value })}
                  className="w-full bg-[#071F19] text-[#FBF9F5] text-xs rounded-xl border border-[#D4B06A]/25 px-3.5 py-2.5 focus:outline-none focus:border-[#D4B06A]"
                >
                  <option value="all">Any Size</option>
                  <option value="above-5000">11,000 Sq. Ft. to 1 Acre</option>
                  <option value="under-2000">Under 2,000 Sq. Ft.</option>
                  <option value="2000-5000">2,000 - 5,000 Sq. Ft.</option>
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-[11px] font-medium text-[#FBF9F5]/70 uppercase tracking-wider mb-1.5">
                  Plot Type
                </label>
                <div className="flex items-center space-x-2">
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="w-full bg-[#071F19] text-[#FBF9F5] text-xs rounded-xl border border-[#D4B06A]/25 px-3.5 py-2.5 focus:outline-none focus:border-[#D4B06A]"
                  >
                    <option value="all">All Plot Types</option>
                    <option value="Farmhouse Plot">Farmhouse & Agriculture Plots</option>
                    <option value="Residential Plot">Residential Plots</option>
                    <option value="Gated Community">Gated Community</option>
                  </select>

                  <button
                    onClick={resetFilters}
                    title="Reset Filters"
                    className="p-2.5 rounded-xl bg-[#071F19] border border-[#D4B06A]/25 text-[#D4B06A] hover:bg-[#123B31] transition-colors flex-shrink-0"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Display: Clean Blank / Empty State OR Property Cards */}
        {!hasProperties ? (
          /* Blank / Ready State */
          <div className="rounded-2xl bg-gradient-to-b from-[#123B31]/70 to-[#071F19]/90 border border-[#D4B06A]/25 p-10 sm:p-14 text-center max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="w-20 h-20 rounded-2xl bg-[#0B2D24] border border-[#D4B06A]/40 flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Clock className="w-10 h-10 text-[#D4B06A]" />
            </div>

            <h3 className="font-serif-heading text-2xl sm:text-3xl text-[#FBF9F5] font-normal mb-3">
              No properties listed yet.
            </h3>

            <p className="text-base text-[#E8C888] font-medium mb-4">
              New investment opportunities will be added soon.
            </p>

            <p className="text-xs sm:text-sm text-[#FBF9F5]/75 max-w-lg mx-auto leading-relaxed mb-8">
              Our legal and acquisition team is currently conducting 30-year title searches and due diligence on new high-yield corridors around Bhor, Kharadi, Wagholi, and Shirwal.
            </p>

            {/* Notification / Priority Lead Capture */}
            <form onSubmit={handleNotifySubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                required
                value={notificationEmail}
                onChange={(e) => setNotificationEmail(e.target.value)}
                placeholder="Enter your email for priority alerts..."
                className="flex-1 px-4 py-3 rounded-xl bg-[#071F19] border border-[#D4B06A]/30 text-xs text-[#FBF9F5] placeholder-[#FBF9F5]/40 focus:outline-none focus:border-[#D4B06A]"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4B06A] to-[#C29B4F] text-[#0B2D24] font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity flex items-center justify-center space-x-1.5 flex-shrink-0"
              >
                <BellRing className="w-3.5 h-3.5" />
                <span>Notify Me First</span>
              </button>
            </form>

            {notified && (
              <div className="mt-4 text-xs text-[#52B788] font-medium">
                ✓ Thank you! You will receive first notification as soon as new verified plots launch.
              </div>
            )}
          </div>
        ) : (
          /* Scalable Property Cards Grid */
          <>
            {filteredProperties.length === 0 ? (
              <div className="text-center py-16 bg-[#123B31]/40 rounded-2xl border border-[#D4B06A]/20 p-8">
                <p className="text-base text-[#FBF9F5]/80">No properties match your exact filter criteria.</p>
                <button
                  onClick={resetFilters}
                  className="mt-4 px-4 py-2 rounded-lg bg-[#D4B06A] text-[#0B2D24] text-xs font-bold uppercase tracking-wider"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-1 max-w-4xl mx-auto gap-8">
                {filteredProperties.map((property) => (
                  <div
                    key={property.id}
                    className="rounded-3xl bg-gradient-to-b from-[#123B31]/90 via-[#0E3228]/95 to-[#071F19]/95 border-2 border-[#D4B06A]/40 hover:border-[#D4B06A]/80 transition-all duration-300 hover:shadow-[0_20px_50px_-15px_rgba(212,176,106,0.3)] flex flex-col overflow-hidden group shadow-2xl"
                  >
                    {/* Top Hero Video & Banner in Card - Clickable link opening full details in new browser tab */}
                    <a
                      href={getBannerDestinationUrl(property)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative h-80 sm:h-[440px] w-full overflow-hidden bg-[#071F19] block group/banner cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D4B06A]/60"
                      title="Open Entire Property Details in New Tab"
                    >
                      {/* Fallback & Loading Poster Image */}
                      <img
                        src={property.imageUrl}
                        alt={property.title}
                        className="absolute inset-0 w-full h-full object-cover filter brightness-[0.7] contrast-[1.05]"
                      />

                      {/* Video Player Background */}
                      {(() => {
                        const bannerSrc = getBannerVideoSrc();
                        const parsed = parseVideoMediaSource(bannerSrc);

                        if (parsed.type === 'gdrive' && parsed.embedUrl) {
                          return (
                            <iframe
                              src={parsed.embedUrl}
                              title={property.title}
                              className="absolute inset-0 w-full h-full border-0 z-0 scale-105 pointer-events-none"
                              allow="autoplay; encrypted-media; fullscreen"
                              allowFullScreen
                            />
                          );
                        }

                        if (parsed.type === 'youtube' && parsed.embedUrl) {
                          return (
                            <iframe
                              src={parsed.embedUrl}
                              title={property.title}
                              className="absolute inset-0 w-full h-full border-0 z-0 scale-105 pointer-events-none"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          );
                        }

                        return (
                          <video
                            ref={(el) => {
                              bannerVideoRef.current = el;
                              if (el) {
                                el.muted = isBannerMuted;
                                el.defaultMuted = isBannerMuted;
                              }
                            }}
                            src={bannerSrc}
                            autoPlay
                            loop
                            muted={isBannerMuted}
                            playsInline
                            preload="auto"
                            className="absolute inset-0 w-full h-full object-cover z-0 filter brightness-[0.85] contrast-[1.1] pointer-events-none"
                          >
                            <source src={bannerSrc} type="video/mp4" />
                            <source src="/videos/video-drone.mp4" type="video/mp4" />
                          </video>
                        );
                      })()}

                      {/* Cinematic Gradient Overlays to make all text pop crystal clear */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#071F19] via-[#071F19]/40 to-[#071F19]/70 z-10 pointer-events-none" />
                      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#071F19]/60 z-10 pointer-events-none" />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 z-20">
                        <div className="flex flex-wrap gap-2 items-center">
                          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0B2D24]/95 text-[#D4B06A] border border-[#D4B06A]/40 backdrop-blur-md shadow-lg">
                            {property.category}
                          </span>
                          {property.videoTour && (
                            <span className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#123B31]/95 text-[#E8C888] border border-[#D4B06A]/40 backdrop-blur-md flex items-center space-x-1.5 shadow-lg">
                              <span className="w-2 h-2 rounded-full bg-[#52B788] animate-ping" />
                              <span>Live Site Video Tour</span>
                            </span>
                          )}
                          {property.isVerified && (
                            <span className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#123B31]/95 text-[#52B788] border border-[#52B788]/40 backdrop-blur-md flex items-center space-x-1.5 shadow-lg">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              <span>100% Clear Title</span>
                            </span>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          {/* Banner Audio/Mute Toggle */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              if (bannerVideoRef.current) {
                                bannerVideoRef.current.muted = !isBannerMuted;
                                setIsBannerMuted(!isBannerMuted);
                              }
                            }}
                            className="p-2 rounded-full bg-[#071F19]/90 hover:bg-[#123B31] border border-[#D4B06A]/40 text-[#E8C888] transition-colors shadow-lg backdrop-blur-md cursor-pointer relative z-30"
                            title={isBannerMuted ? 'Unmute Audio' : 'Mute Audio'}
                          >
                            {isBannerMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#52B788]" />}
                          </button>

                          {/* Banner Play/Pause Toggle */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              if (bannerVideoRef.current) {
                                if (isBannerPlaying) {
                                  bannerVideoRef.current.pause();
                                  setIsBannerPlaying(false);
                                } else {
                                  bannerVideoRef.current.play();
                                  setIsBannerPlaying(true);
                                }
                              }
                            }}
                            className="p-2 rounded-full bg-[#071F19]/90 hover:bg-[#123B31] border border-[#D4B06A]/40 text-[#E8C888] transition-colors shadow-lg backdrop-blur-md cursor-pointer relative z-30"
                            title={isBannerPlaying ? 'Pause Video' : 'Play Video'}
                          >
                            {isBannerPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-[#D4B06A]" />}
                          </button>

                          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#D4B06A] to-[#C29B4F] text-[#0B2D24] shadow-lg flex items-center space-x-1">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>{property.status}</span>
                          </span>
                        </div>
                      </div>

                      {/* Panoramic View Badge & Starting Price on Image Bottom */}
                      <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3 z-20">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-lg bg-[#071F19]/90 border border-[#D4B06A]/30 text-xs text-[#E8C888] font-medium backdrop-blur-md shadow-md">
                              <Sparkles className="w-3 h-3 text-[#D4B06A]" />
                              <span>180° Bhatghar Dam Backwater & Rajgad Fort View</span>
                            </span>
                            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-[#0B2D24]/90 border border-[#D4B06A]/40 text-[11px] text-[#D4B06A] font-semibold backdrop-blur-md shadow-md opacity-90 group-hover/banner:opacity-100 group-hover/banner:text-[#FBF9F5] transition-all">
                              <span>Open Details in New Tab</span>
                              <ExternalLink className="w-3 h-3 ml-0.5" />
                            </span>
                          </div>
                          <h3 className="font-serif-heading text-2xl sm:text-3xl text-[#FBF9F5] font-bold drop-shadow-md group-hover/banner:text-[#E8C888] transition-colors flex items-center space-x-2">
                            <span>{property.title}</span>
                          </h3>
                        </div>

                        <div className="text-left sm:text-right bg-[#071F19]/90 border border-[#D4B06A]/30 p-3 rounded-xl backdrop-blur-md shadow-md group-hover/banner:border-[#D4B06A]/60 transition-colors">
                          <span className="text-[10px] uppercase tracking-wider text-[#D4B06A] font-bold block">
                            Starting Price
                          </span>
                          <span className="font-serif-heading text-2xl text-[#FBF9F5] font-bold">
                            {property.price}
                          </span>
                        </div>
                      </div>
                    </a>

                    {/* Property Card Body */}
                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                      <div>
                        {/* SubLocation & Map Link */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#D4B06A]/20">
                          <div className="flex items-center space-x-2 text-xs text-[#FBF9F5]/90">
                            <MapPin className="w-4 h-4 text-[#D4B06A] flex-shrink-0" />
                            <span className="font-semibold text-sm">{property.location}</span>
                            <span className="text-[#FBF9F5]/50">•</span>
                            <span className="text-[#FBF9F5]/80">{property.subLocation}</span>
                          </div>

                          {property.mapUrl && (
                            <a
                              href={property.mapUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#071F19] border border-[#D4B06A]/40 text-xs text-[#E8C888] hover:text-[#FFF] hover:border-[#D4B06A] transition-colors font-medium self-start sm:self-auto"
                            >
                              <Navigation className="w-3.5 h-3.5 text-[#52B788]" />
                              <span>Open Map Direction</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>

                        <p className="text-sm text-[#FBF9F5]/80 mt-4 mb-5 leading-relaxed">
                          {property.tagline}
                        </p>

                        {/* Plot Options & Starting Price Single Box */}
                        <div className="mb-6">
                          <span className="text-[10px] uppercase tracking-wider text-[#D4B06A] font-bold block mb-2.5">
                            Plot Options & Pricing:
                          </span>
                          <div className="p-4 sm:p-5 rounded-xl bg-[#071F19] border border-[#D4B06A]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 shadow-md hover:border-[#D4B06A]/50 transition-colors">
                            <div className="flex items-center space-x-3.5">
                              <div className="w-10 h-10 rounded-lg bg-[#123B31] border border-[#D4B06A]/30 text-[#D4B06A] flex items-center justify-center flex-shrink-0">
                                <Ruler className="w-5 h-5" />
                              </div>
                              <div>
                                <span className="text-[10px] uppercase tracking-wider text-[#D4B06A] font-bold block">
                                  Available Configurations
                                </span>
                                <span className="text-sm sm:text-base font-bold text-[#FBF9F5] block">
                                  11 Gunthas, Half Acre and 1 Acre
                                </span>
                              </div>
                            </div>

                            <div className="sm:text-right border-t sm:border-t-0 border-[#D4B06A]/15 pt-2 sm:pt-0 pl-1 sm:pl-4">
                              <span className="text-[10px] uppercase tracking-wider text-[#D4B06A] font-bold block">
                                Starting Price
                              </span>
                              <span className="font-serif-heading text-lg sm:text-xl font-bold text-[#E8C888] whitespace-nowrap">
                                Starting at 21 Lacs
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Highlights & Potential */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 pb-4">
                          <div className="space-y-2">
                            <span className="text-[10px] uppercase tracking-wider text-[#D4B06A] font-bold block">
                              Key Highlights:
                            </span>
                            {property.highlights.slice(0, 3).map((hl, idx) => (
                              <div key={idx} className="flex items-start space-x-2 text-xs text-[#FBF9F5]/85">
                                <Check className="w-3.5 h-3.5 text-[#52B788] mt-0.5 flex-shrink-0" />
                                <span>{hl}</span>
                              </div>
                            ))}
                          </div>

                          <div className="space-y-2">
                            <span className="text-[10px] uppercase tracking-wider text-[#52B788] font-bold block">
                              Growth & Investment Returns:
                            </span>
                            <div className="flex items-start space-x-2 text-xs text-[#FBF9F5]/85">
                              <TrendingUp className="w-3.5 h-3.5 text-[#D4B06A] mt-0.5 flex-shrink-0" />
                              <span>Potential ROI of 20% p.a. through land appreciation & Airbnb</span>
                            </div>
                            <div className="flex items-start space-x-2 text-xs text-[#FBF9F5]/85">
                              <Sparkles className="w-3.5 h-3.5 text-[#52B788] mt-0.5 flex-shrink-0" />
                              <span>Farmhouse plots on agri land with future plans for NA plotting</span>
                            </div>
                          </div>
                        </div>

                        {/* Strategic Distances Strip */}
                        {property.connectivity && (
                          <div className="p-3 rounded-xl bg-[#071F19]/80 border border-[#D4B06A]/15 mb-2">
                            <span className="text-[10px] uppercase tracking-wider text-[#D4B06A] font-bold block mb-1.5">
                              Strategic Connectivity:
                            </span>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#FBF9F5]/80">
                              {property.connectivity.map((conn, idx) => (
                                <span key={idx} className="flex items-center space-x-1">
                                  <span className="text-[#D4B06A]">•</span>
                                  <span>{conn.place}: <strong className="text-[#FBF9F5]">{conn.time}</strong></span>
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#D4B06A]/20">
                        <a
                          href={getBannerDestinationUrl(property)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3 rounded-xl border border-[#D4B06A]/50 text-[#D4B06A] text-xs font-bold uppercase tracking-wider hover:bg-[#123B31] transition-all flex items-center justify-center space-x-2"
                          title="Open Full Property Details in New Tab"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Full Dossier</span>
                          <ExternalLink className="w-3 h-3 ml-0.5 opacity-75" />
                        </a>

                        <a
                          href="#media"
                          className="w-full py-3 rounded-xl bg-[#071F19] border border-[#D4B06A]/40 text-[#E8C888] text-xs font-bold uppercase tracking-wider hover:bg-[#123B31] transition-all flex items-center justify-center space-x-2 text-center"
                        >
                          <Sparkles className="w-4 h-4 text-[#D4B06A]" />
                          <span>Watch 4 Site Reels</span>
                        </a>

                        <button
                          onClick={() => onOpenSiteVisit(property.title)}
                          className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4B06A] via-[#E8C888] to-[#C29B4F] text-[#0B2D24] text-xs font-bold tracking-wider uppercase hover:opacity-95 transition-opacity flex items-center justify-center space-x-2 shadow-lg"
                        >
                          <Compass className="w-4 h-4" />
                          <span>Book Visit</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
};
