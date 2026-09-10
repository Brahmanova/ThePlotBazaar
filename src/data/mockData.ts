import { Property, TrustCard, LandBenefit, ProcessStep } from '../types';

export const TRUST_CARDS: TrustCard[] = [
  {
    id: 'verified-docs',
    title: 'Verified Documentation',
    description: 'Complete document verification for your peace of mind with 30-year title search & clear chain of ownership.',
    icon: 'FileCheck2',
    highlightBadge: '100% Legal Clear',
  },
  {
    id: 'below-market-pricing',
    title: 'Below-Market Pricing',
    description: 'Attractive direct-from-source pricing with strong investment potential and zero artificial markups.',
    icon: 'BadgePercent',
    highlightBadge: 'Direct Advantage',
  },
  {
    id: 'good-return-potential',
    title: 'Good Return Potential',
    description: 'Properties selected along high-growth infrastructure corridors with long-term appreciation in mind.',
    icon: 'TrendingUp',
    highlightBadge: 'High Growth',
  },
  {
    id: 'no-cost-emi',
    title: 'No-Cost EMI Option',
    description: 'Flexible payment facilities tailored to customer needs, allowing hassle-free capital allocation.',
    icon: 'CreditCard',
    highlightBadge: 'Flexible Terms',
  },
  {
    id: 'custom-payment-schedule',
    title: 'Customized Payment Schedule',
    description: 'Structured milestone payment plans that support your personalized financial and liquidity planning.',
    icon: 'CalendarCheck',
    highlightBadge: 'Tailored Plans',
  },
  {
    id: 'transparent-process',
    title: 'Clear & Transparent Process',
    description: 'Complete clarity on pricing, documentation, demarcation, registry, and transactions from day one.',
    icon: 'ShieldCheck',
    highlightBadge: 'Zero Hidden Cost',
  },
];

export const WHY_INVEST_BENEFITS: LandBenefit[] = [
  {
    title: 'Tangible Asset',
    description: 'A real, enduring physical asset with long-term intrinsic value that does not depreciate over time.',
    icon: 'LandPlot',
    stat: 'Finite Supply',
  },
  {
    title: 'Growing Demand',
    description: 'Land remains one of the most sought-after investment categories driven by urban expansion and infrastructure.',
    icon: 'Users',
    stat: 'High Demand',
  },
  {
    title: 'Appreciation Potential',
    description: 'Well-selected plots in emerging corridors consistently generate strong future capital returns.',
    icon: 'LineChart',
    stat: 'Proven ROI',
  },
  {
    title: 'Flexible Ownership',
    description: 'Suitable for long-term investment, custom villa development, weekend farming, or future personal use.',
    icon: 'Sparkles',
    stat: 'Versatile Use',
  },
  {
    title: 'Portfolio Diversification',
    description: 'A resilient hedge against inflation and a stabilizing, non-volatile anchor for any investment portfolio.',
    icon: 'PieChart',
    stat: 'Inflation Hedge',
  },
  {
    title: 'Peace of Mind',
    description: 'Secure, unencumbered ownership backed by verified documentation, clear demarcation, and legal due diligence.',
    icon: 'Shield',
    stat: '100% Peace of Mind',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: '01',
    title: 'Inquiry & Consultation',
    tagline: 'Understand Goals & Budget',
    description: 'Discuss your investment goals, budget, preferred locations, and expected timeline with our land advisory specialists.',
    details: [
      'Personalized requirement assessment',
      'Portfolio budget & ROI objective alignment',
      'Overview of available micro-markets around Pune',
    ],
    iconName: 'MessagesSquare',
  },
  {
    stepNumber: '02',
    title: 'Property Selection',
    tagline: 'Shortlisting & Site Visits',
    description: 'Explore handpicked, verified plots matched to your vision, backed by complete location and connectivity dossiers.',
    details: [
      'Comprehensive masterplan and plot layout review',
      'Complimentary chauffeur-assisted site visits',
      'Physical survey & boundary demarcation inspection',
    ],
    iconName: 'MapPin',
  },
  {
    stepNumber: '03',
    title: 'Documentation Verification',
    tagline: 'Rigorous Legal Due Diligence',
    description: 'Review complete title search reports, government revenue records (7/12 & 8A), and legal clearances with complete transparency.',
    details: [
      'Independent 30-year title verification dossiers',
      'Zoning, NA permissions & RERA compliance audits',
      'Demarcation certificates and encumbrance check',
    ],
    iconName: 'FileCheck',
  },
  {
    stepNumber: '04',
    title: 'Booking & Ownership',
    tagline: 'Seamless Registry & Handover',
    description: 'Experience a smooth, structured booking process with tailored payment plans, registry support, and clear physical possession.',
    details: [
      'Transparent agreement drafting with zero hidden fees',
      'Customized milestone-linked payment schedules',
      'End-to-end registration & official mutation support',
    ],
    iconName: 'KeyRound',
  },
];

// Verified project listings
export const SAMPLE_PROPERTIES: Property[] = [
  {
    id: 'libertelle-bhor',
    title: 'Libertellè – Live Panorama',
    slug: 'libertelle-bhor-pune',
    tagline: 'Ultra-Luxury Farmhouse & Agriculture Plots in Sahyadri Hills with 180° Backwater & Fort Views',
    location: 'Velvand, Bhor, Pune',
    subLocation: 'Overlooking Bhatghar Dam Backwaters & Rajgad Fort',
    mapUrl: 'https://maps.app.goo.gl/JDSizjPXKfVdeEzi8?g_st=aw',
    plotSize: '11,000 Sq. Ft. to 1 Acre',
    plotSizeSqFt: 11000,
    price: '₹21 Lakhs onwards',
    priceNumeric: 2100000,
    pricePerSqFt: '₹190 / sq.ft approx',
    status: 'Upcoming Launch',
    category: 'Farmhouse Plot',
    isFeatured: true,
    isVerified: true,
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80',
    ],
    viewsDescription: 'Breathtaking 180° panoramic views of Bhatghar Dam Backwaters and the historic Rajgad Fort',
    futurePlans: 'Currently offering premium farmhouse plots on agricultural land, with future plans for NA plotting development.',
    roiPotential: 'Potential ROI of 20% per annum through rapid land appreciation and Airbnb / staycation optimization.',
    videoTour: {
      title: 'Actual On-Site Drone & Sunset Panorama Tour',
      subtitle: 'Recorded directly on site at Libertellè (Bhor), capturing the golden hour sunset, Bhatghar Dam backwaters, and 3 iconic Maratha Forts in the horizon.',
      landmarks: [
        {
          name: 'Kille Rajgad',
          marathiTitle: 'किल्ले राजगड 🚩',
          description: 'The first capital of Swarajya — clearly visible along the majestic mountain silhouette.',
          tag: '1st Capital of Swarajya',
        },
        {
          name: 'Kille Sinhagad',
          marathiTitle: 'किल्ले सिंहगड 🚩',
          description: 'The fortress where Tanaji Malusare set an unmatched historical example of bravery and valor.',
          tag: 'Fortress of Valor',
        },
        {
          name: 'Kille Purandar',
          marathiTitle: 'किल्ले पुरंदर 🚩',
          description: 'Birthplace of Chhatrapati Sambhaji Maharaj, standing tall as an eternal symbol of Maratha pride.',
          tag: 'Birthplace of Sambhaji Maharaj',
        },
        {
          name: 'Bhatghar Dam Backwaters',
          marathiTitle: 'भातघर धरण जलाशय 🌊',
          description: 'Calm, sparkling 180° water reservoir reflecting the golden sunset across the valley.',
          tag: '180° Water Horizon',
        },
      ],
    },
    highlights: [
      'Breathtaking 180° Views of Bhatghar Dam Backwater & Rajgad Fort',
      '178+ Acres Plotted Estate nestled in the pristine Sahyadri Hills',
      '100% Clear Title Plots with transparent ownership from documents to possession',
      'Hassle-free ownership with future planned NA plotting potential',
      'High potential 20% per annum ROI through land appreciation & Airbnb rentals',
    ],
    features: [
      '180° Dam Backwater View',
      'Sahyadri Hill Panorama',
      'Electricity Grid Access',
      'Water Connection',
      'Internal Tar/Gravel Roads',
      'Gated Entry & Fencing',
      'Demarcated Plot Boundaries',
      'Airbnb / Villa Potential',
    ],
    dimensions: 'Custom Demarcations Available',
    roadWidth: '30-40 ft Wide Internal Roads',
    waterElectricity: true,
    possessionTime: 'Immediate Documentation & Possession Assistance',
    connectivity: [
      { place: 'ISKCON Temple', time: '15 Mins' },
      { place: 'Varandha Ghat', time: '30 Mins' },
      { place: 'Satara City', time: '60 Mins' },
      { place: 'Pune City', time: '70 Mins' },
    ],
    sizeVariants: [
      {
        sizeLabel: '11,000 Sq. Ft. (~10-11 Gunthas)',
        sqftLabel: '11,000 Sq. Ft.',
        priceLabel: '₹21 Lakhs',
        priceNumeric: 2100000,
      },
      {
        sizeLabel: 'Half Acre (~20 Gunthas)',
        sqftLabel: '21,780 Sq. Ft.',
        priceLabel: '₹38 Lakhs',
        priceNumeric: 3800000,
      },
      {
        sizeLabel: '1 Acre (~40 Gunthas)',
        sqftLabel: '43,560 Sq. Ft.',
        priceLabel: '₹76 Lakhs',
        priceNumeric: 7600000,
      },
    ],
  },
];

