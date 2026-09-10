/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustSection } from './components/TrustSection';
import { AboutSection } from './components/AboutSection';
import { WhyInvestSection } from './components/WhyInvestSection';
import { PropertiesSection } from './components/PropertiesSection';
import { ProjectMediaSection } from './components/ProjectMediaSection';
import { ProcessSection } from './components/ProcessSection';
import { CallToAction } from './components/CallToAction';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SiteVisitModal } from './components/SiteVisitModal';
import { PropertyDetailsModal } from './components/PropertyDetailsModal';
import { PropertyDetailsPage } from './components/PropertyDetailsPage';
import { EMICalculatorModal } from './components/EMICalculatorModal';
import { Property } from './types';
import { SAMPLE_PROPERTIES } from './data/mockData';
import { Phone, Calculator, Compass, ShieldCheck } from 'lucide-react';

const getPropertyFromUrl = (): Property | null => {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const propKey = params.get('property') || params.get('id');
  if (!propKey) return null;
  return (
    SAMPLE_PROPERTIES.find(
      (p) =>
        p.id.toLowerCase() === propKey.toLowerCase() ||
        p.slug?.toLowerCase() === propKey.toLowerCase()
    ) || SAMPLE_PROPERTIES[0]
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [siteVisitOpen, setSiteVisitOpen] = useState<boolean>(false);
  const [selectedPropertyForVisit, setSelectedPropertyForVisit] = useState<string>('');
  const [selectedPropertyDetails, setSelectedPropertyDetails] = useState<Property | null>(null);
  const [viewingPropertyPage, setViewingPropertyPage] = useState<Property | null>(() => getPropertyFromUrl());
  const [calculatorOpen, setCalculatorOpen] = useState<boolean>(false);

  // Sync with browser back/forward or tab changes
  useEffect(() => {
    const handlePopState = () => {
      setViewingPropertyPage(getPropertyFromUrl());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Active section tracking on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'benefits', 'properties', 'media', 'process', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenSiteVisit = (propertyName?: string) => {
    setSelectedPropertyForVisit(propertyName || '');
    setSiteVisitOpen(true);
  };

  const handleExploreProperties = () => {
    const propSection = document.getElementById('properties');
    if (propSection) {
      propSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (viewingPropertyPage) {
    return (
      <PropertyDetailsPage
        property={viewingPropertyPage}
        onBack={() => {
          window.history.pushState({}, '', window.location.pathname);
          setViewingPropertyPage(null);
        }}
        onOpenSiteVisit={(propName) => handleOpenSiteVisit(propName)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0B2D24] text-[#FBF9F5] flex flex-col font-sans selection:bg-[#D4B06A]/30 selection:text-[#FBF9F5]">
      
      {/* Header & Sticky Navigation */}
      <Navbar
        onOpenSiteVisit={() => handleOpenSiteVisit()}
        onOpenCalculator={() => setCalculatorOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <Hero
          onOpenSiteVisit={() => handleOpenSiteVisit()}
          onExploreProperties={handleExploreProperties}
        />

        <TrustSection />

        <AboutSection
          onOpenSiteVisit={() => handleOpenSiteVisit()}
        />

        <WhyInvestSection
          onOpenCalculator={() => setCalculatorOpen(true)}
        />

        <PropertiesSection
          onSelectProperty={(prop) => setSelectedPropertyDetails(prop)}
          onOpenSiteVisit={(propTitle) => handleOpenSiteVisit(propTitle)}
        />

        <ProjectMediaSection
          onOpenSiteVisit={(propTitle) => handleOpenSiteVisit(propTitle)}
        />

        <ProcessSection
          onOpenSiteVisit={() => handleOpenSiteVisit()}
        />

        <CallToAction
          onOpenSiteVisit={() => handleOpenSiteVisit()}
        />

        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenSiteVisit={() => handleOpenSiteVisit()}
        onOpenCalculator={() => setCalculatorOpen(true)}
      />

      {/* Floating Action Buttons: Quick Advisory & Calculator */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-3 pointer-events-none">
        
        {/* Floating Quick Land Calculator Button */}
        <button
          onClick={() => setCalculatorOpen(true)}
          className="pointer-events-auto p-3 rounded-full bg-[#123B31] border border-[#D4B06A]/50 text-[#D4B06A] hover:text-[#FFF] hover:bg-[#1A4D41] shadow-xl transition-all hover:scale-105 group relative"
          title="Open Land ROI & Payment Calculator"
        >
          <Calculator className="w-5 h-5" />
          <span className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1 bg-[#071F19] text-[#D4B06A] border border-[#D4B06A]/30 text-[11px] font-semibold rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
            EMI & ROI Calculator
          </span>
        </button>

        {/* Floating Direct Call Advisory Button */}
        <a
          href="tel:9325552856"
          className="pointer-events-auto flex items-center space-x-2 px-4 py-3 rounded-full bg-[#123B31] border border-[#D4B06A]/60 text-[#E8C888] hover:text-[#FFF] hover:bg-[#1A4D41] font-bold text-xs shadow-2xl transition-all hover:scale-105 group"
          title="Direct Land Advisory: 9325552856"
        >
          <Phone className="w-4 h-4 text-[#D4B06A]" />
          <span className="hidden sm:inline font-semibold">Call Advisory</span>
        </a>
      </div>

      {/* Interactive Modals */}
      <SiteVisitModal
        isOpen={siteVisitOpen}
        onClose={() => setSiteVisitOpen(false)}
        initialProperty={selectedPropertyForVisit}
      />

      <PropertyDetailsModal
        property={selectedPropertyDetails}
        onClose={() => setSelectedPropertyDetails(null)}
        onOpenSiteVisit={(propName) => {
          setSelectedPropertyDetails(null);
          handleOpenSiteVisit(propName);
        }}
      />

      <EMICalculatorModal
        isOpen={calculatorOpen}
        onClose={() => setCalculatorOpen(false)}
        onOpenSiteVisit={() => {
          setCalculatorOpen(false);
          handleOpenSiteVisit();
        }}
      />

    </div>
  );
}

