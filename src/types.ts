export interface Property {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  location: string;
  subLocation: string;
  plotSize: string;
  plotSizeSqFt: number;
  price: string;
  priceNumeric: number; // in INR
  pricePerSqFt?: string;
  status: 'Available' | 'Few Plots Left' | 'Upcoming Launch' | 'Sold Out';
  category: 'Residential Plot' | 'Commercial Plot' | 'Farmhouse Plot' | 'Villa Plot' | 'Gated Community';
  isFeatured: boolean;
  isVerified: boolean;
  reraNumber?: string;
  imageUrl: string;
  gallery?: string[];
  developer?: string;
  externalUrl?: string;
  mapUrl?: string;
  videoTour?: {
    title: string;
    subtitle: string;
    videoSrc?: string;
    landmarks: {
      name: string;
      marathiTitle: string;
      description: string;
      tag: string;
    }[];
  };
  highlights: string[];
  features: string[];
  dimensions?: string;
  roadWidth?: string;
  waterElectricity: boolean;
  possessionTime: string;
  futurePlans?: string;
  viewsDescription?: string;
  roiPotential?: string;
  connectivity?: { place: string; time: string }[];
  sizeVariants?: {
    sizeLabel: string;
    sqftLabel: string;
    priceLabel: string;
    priceNumeric: number;
  }[];
}

export interface FilterState {
  location: string;
  budget: string;
  plotSize: string;
  category: string;
}

export interface SiteVisitBooking {
  name: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  locationInterest: string;
  transportRequired: boolean;
  notes?: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  interestedLocation: string;
  budgetRange: string;
  message: string;
  purpose: 'Investment' | 'Immediate Construction' | 'Farmhouse / Weekend Home' | 'General Inquiry';
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  tagline: string;
  description: string;
  details: string[];
  iconName: string;
}

export interface TrustCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  highlightBadge?: string;
}

export interface LandBenefit {
  title: string;
  description: string;
  icon: string;
  stat?: string;
}
