import React from 'react';

interface TPBLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  iconOnly?: boolean;
  isDark?: boolean;
  className?: string;
}

export const TPBLogo: React.FC<TPBLogoProps> = ({
  size = 'md',
  showTagline = true,
  iconOnly = false,
  className = '',
}) => {
  const sizeMap = {
    sm: { shield: 'w-8 h-9', title: 'text-sm tracking-wider', tagline: 'text-[9px] tracking-widest', gap: 'gap-2.5' },
    md: { shield: 'w-11 h-12', title: 'text-lg tracking-widest', tagline: 'text-[10px] tracking-widest', gap: 'gap-3' },
    lg: { shield: 'w-16 h-18', title: 'text-2xl tracking-widest', tagline: 'text-xs tracking-[0.25em]', gap: 'gap-4' },
    xl: { shield: 'w-24 h-28', title: 'text-3xl tracking-widest', tagline: 'text-sm tracking-[0.3em]', gap: 'gap-5' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center ${currentSize.gap} ${className} select-none group`}>
      {/* Luxury Shield Vector Icon */}
      <div className={`relative ${currentSize.shield} flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}>
        <svg viewBox="0 0 100 115" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
          {/* Shield Outer Gold Gradient Border */}
          <path
            d="M50 3L92 18V58C92 88 50 112 50 112C50 112 8 88 8 58V18L50 3Z"
            fill="url(#shieldGoldGrad)"
            stroke="#F7E2A8"
            strokeWidth="1.5"
          />

          {/* Shield Inner Deep Forest Background */}
          <path
            d="M50 8L86 21V56C86 83 50 105 50 105C50 105 14 83 14 56V21L50 8Z"
            fill="url(#shieldGreenGrad)"
          />

          {/* Land Plot Isometric Grid in Lower Half */}
          <g opacity="0.95">
            {/* Grid base area */}
            <path
              d="M20 74L50 56L80 74L50 94L20 74Z"
              fill="#06231B"
              stroke="#D4B06A"
              strokeWidth="1.2"
            />
            {/* Perspective grid division lines */}
            <line x1="30" y1="68" x2="60" y2="88" stroke="#D4B06A" strokeWidth="0.9" opacity="0.85" />
            <line x1="40" y1="62" x2="70" y2="82" stroke="#D4B06A" strokeWidth="0.9" opacity="0.85" />
            <line x1="40" y1="88" x2="70" y2="68" stroke="#D4B06A" strokeWidth="0.9" opacity="0.85" />
            <line x1="30" y1="82" x2="60" y2="62" stroke="#D4B06A" strokeWidth="0.9" opacity="0.85" />
          </g>

          {/* Golden Serif 'P' */}
          <text
            x="36"
            y="54"
            fontFamily="'Playfair Display', Georgia, serif"
            fontSize="48"
            fontWeight="bold"
            fill="url(#goldTextGrad)"
            filter="drop-shadow(0px 2px 3px rgba(0,0,0,0.5))"
          >
            P
          </text>

          {/* Verification Checkmark (Green & Gold) */}
          <path
            d="M48 46L58 59L78 33"
            stroke="#52B788"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="drop-shadow(0px 1px 2px rgba(0,0,0,0.4))"
          />
          <path
            d="M48 46L58 59L78 33"
            stroke="#D4B06A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* SVG Gradients */}
          <defs>
            <linearGradient id="shieldGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9E6B3" />
              <stop offset="35%" stopColor="#D4B06A" />
              <stop offset="70%" stopColor="#9C772F" />
              <stop offset="100%" stopColor="#E5C378" />
            </linearGradient>
            <linearGradient id="shieldGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#164A3E" />
              <stop offset="60%" stopColor="#0B2D24" />
              <stop offset="100%" stopColor="#051913" />
            </linearGradient>
            <linearGradient id="goldTextGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF4D4" />
              <stop offset="40%" stopColor="#E5C378" />
              <stop offset="70%" stopColor="#D4B06A" />
              <stop offset="100%" stopColor="#AA8235" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Typography Brand Name and Tagline */}
      {!iconOnly && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center space-x-1">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#D4B06A]/90 font-medium">
              THE
            </span>
            <div className="h-[1px] w-6 bg-gradient-to-r from-[#D4B06A]/60 to-transparent"></div>
          </div>

          <span className={`font-brand-display font-semibold text-[#FBF9F5] uppercase ${currentSize.title} tracking-wider leading-none mt-0.5`}>
            PLOT BAZAAR
          </span>

          {showTagline && (
            <div className="flex items-center space-x-1.5 mt-1">
              <span className={`text-[#D4B06A] uppercase font-semibold ${currentSize.tagline} tracking-[0.18em] opacity-90`}>
                VERIFIED LAND
              </span>
              <span className="text-[#D4B06A]/60 text-[8px]">•</span>
              <span className={`text-[#D4B06A] uppercase font-semibold ${currentSize.tagline} tracking-[0.18em] opacity-90`}>
                TRUSTED DEALS
              </span>
              <span className="text-[#D4B06A]/60 text-[8px]">•</span>
              <span className={`text-[#D4B06A] uppercase font-semibold ${currentSize.tagline} tracking-[0.18em] opacity-90`}>
                PEACE OF MIND
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
