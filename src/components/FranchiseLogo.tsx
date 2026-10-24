'use client';

import React from 'react';

interface FranchiseLogoProps {
  franchiseId: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const SIZE_MAP = {
  xs: 'w-4 h-4',
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

export default function FranchiseLogo({
  franchiseId,
  size = 'md',
  className = '',
}: FranchiseLogoProps) {
  const fid = (franchiseId || '').toLowerCase().trim();
  const dimensionClass = SIZE_MAP[size] || SIZE_MAP.md;

  switch (fid) {
    // 1. CHENNAI SUPER KINGS (CSK) - Luxury Champagne Gold & Sovereign Midnight Navy
    case 'csk':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block drop-shadow-sm ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Chennai Super Kings Luxury Crest"
        >
          <defs>
            <linearGradient id="csk-lux-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B1A30" />
              <stop offset="60%" stopColor="#050E1B" />
              <stop offset="100%" stopColor="#02060D" />
            </linearGradient>
            <linearGradient id="csk-lux-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF4B8" />
              <stop offset="40%" stopColor="#F5C042" />
              <stop offset="100%" stopColor="#C98B14" />
            </linearGradient>
            <radialGradient id="csk-lux-glow" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#F5C042" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0B1A30" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Luxury Shield Silhouette */}
          <path
            d="M50 4 L86 17 C86 57 71 81 50 96 C29 81 14 57 14 17 Z"
            fill="url(#csk-lux-bg)"
            stroke="url(#csk-lux-gold)"
            strokeWidth="2.5"
          />
          {/* Inner Hairline Ring */}
          <path
            d="M50 9 L81 20 C81 53 68 74 50 88 C32 74 19 53 19 20 Z"
            stroke="url(#csk-lux-gold)"
            strokeWidth="0.8"
            strokeOpacity="0.5"
            fill="url(#csk-lux-glow)"
          />

          {/* Minimalist Aristocratic Crown */}
          <g fill="url(#csk-lux-gold)">
            <path d="M39 20 L50 13 L61 20 L57 25 L43 25 Z" />
            <circle cx="50" cy="11.5" r="1.8" fill="#FFFFFF" />
            <circle cx="39" cy="18.5" r="1.3" fill="#FFFFFF" />
            <circle cx="61" cy="18.5" r="1.3" fill="#FFFFFF" />
          </g>

          {/* Sleek Geometric Lion Mane Arcs */}
          <path
            d="M27 34 Q38 27 50 33 Q36 38 27 34 Z"
            fill="url(#csk-lux-gold)"
            opacity="0.85"
          />
          <path
            d="M73 34 Q62 27 50 33 Q64 38 73 34 Z"
            fill="url(#csk-lux-gold)"
            opacity="0.85"
          />

          {/* Center Luxury Monogram CSK */}
          <text
            x="50"
            y="62"
            textAnchor="middle"
            fontSize="26"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="2"
            fill="url(#csk-lux-gold)"
          >
            CSK
          </text>

          {/* Champagne Gold Ribbon Bar */}
          <rect x="25" y="73" width="50" height="9" rx="2.5" fill="url(#csk-lux-gold)" />
          <text
            x="50"
            y="80"
            textAnchor="middle"
            fontSize="5.5"
            fontWeight="900"
            letterSpacing="1.2"
            fill="#050E1B"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            SUPER KINGS
          </text>
        </svg>
      );

    // 2. MUMBAI INDIANS (MI) - Luxury Deep Sapphire & Machined Platinum Gold
    case 'mi':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block drop-shadow-sm ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Mumbai Indians Luxury Crest"
        >
          <defs>
            <linearGradient id="mi-lux-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B1E3F" />
              <stop offset="50%" stopColor="#061226" />
              <stop offset="100%" stopColor="#020812" />
            </linearGradient>
            <linearGradient id="mi-lux-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF8D6" />
              <stop offset="50%" stopColor="#E2BA49" />
              <stop offset="100%" stopColor="#A87913" />
            </linearGradient>
            <radialGradient id="mi-lux-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E2BA49" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#061226" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Precision Circular Medallion */}
          <circle cx="50" cy="50" r="46" fill="url(#mi-lux-bg)" stroke="url(#mi-lux-gold)" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="41" stroke="url(#mi-lux-gold)" strokeWidth="0.8" strokeOpacity="0.4" fill="url(#mi-lux-glow)" />

          {/* Aerodynamic Minimalist Chakra Vortex Blades */}
          <g transform="translate(50,50)">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <path
                key={angle}
                d="M0 -40 C5 -30 9 -18 2 -8 C-1 -18 -2 -30 0 -40 Z"
                fill={i % 2 === 0 ? 'url(#mi-lux-gold)' : '#FFFFFF'}
                transform={`rotate(${angle})`}
                opacity={i % 2 === 0 ? '0.9' : '0.4'}
              />
            ))}
          </g>

          {/* Center Matte Sapphire Hub */}
          <circle cx="50" cy="50" r="26" fill="#061226" stroke="url(#mi-lux-gold)" strokeWidth="1.8" />

          {/* Center Luxury Monogram MI */}
          <text
            x="50"
            y="61"
            textAnchor="middle"
            fontSize="30"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="2.5"
            fill="url(#mi-lux-gold)"
          >
            MI
          </text>

          {/* Refined Tricolor Accent Pin */}
          <path d="M35 83 Q50 79 65 83" stroke="#FF9933" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M37 86 Q50 82 63 86" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
          <path d="M39 89 Q50 85 61 89" stroke="#138808" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    // 3. ROYAL CHALLENGERS BENGALURU (RCB) - Luxury Velvet Carmine & Champagne Gold
    case 'rcb':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block drop-shadow-sm ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Royal Challengers Bengaluru Luxury Crest"
        >
          <defs>
            <linearGradient id="rcb-lux-red" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7E1521" />
              <stop offset="50%" stopColor="#4A0A10" />
              <stop offset="100%" stopColor="#1E0306" />
            </linearGradient>
            <linearGradient id="rcb-lux-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF4B8" />
              <stop offset="50%" stopColor="#E5B242" />
              <stop offset="100%" stopColor="#9E7314" />
            </linearGradient>
            <radialGradient id="rcb-lux-glow" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#E5B242" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#1E0306" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Luxury Shield */}
          <path
            d="M50 4 L86 17 C86 57 71 81 50 96 C29 81 14 57 14 17 Z"
            fill="url(#rcb-lux-red)"
            stroke="url(#rcb-lux-gold)"
            strokeWidth="2.5"
          />
          {/* Inner Matte Obsidian Core */}
          <path
            d="M50 9 L80 20 C80 52 67 73 50 87 C33 73 20 52 20 20 Z"
            fill="#0C0A0A"
            stroke="url(#rcb-lux-gold)"
            strokeWidth="0.8"
            strokeOpacity="0.45"
          />

          {/* Aristocratic Sovereign Crown */}
          <g fill="url(#rcb-lux-gold)">
            <path d="M39 19 L50 12 L61 19 L57 24 L43 24 Z" />
            <circle cx="50" cy="10.5" r="1.8" fill="#FFFFFF" />
            <circle cx="39" cy="17.5" r="1.3" fill="#FFFFFF" />
            <circle cx="61" cy="17.5" r="1.3" fill="#FFFFFF" />
          </g>

          {/* Stylized Rampant Lion Silhouette Header */}
          <path
            d="M44 26 C47 24 53 24 56 26 C54 29 51 31 47 30 C45 29 44 28 44 26 Z"
            fill="url(#rcb-lux-gold)"
            opacity="0.8"
          />

          {/* Center Luxury Monogram RCB */}
          <text
            x="50"
            y="60"
            textAnchor="middle"
            fontSize="26"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="2"
            fill="url(#rcb-lux-gold)"
          >
            RCB
          </text>

          {/* Gold Filigree Ribbon */}
          <rect x="24" y="72" width="52" height="9" rx="2.5" fill="url(#rcb-lux-gold)" />
          <text
            x="50"
            y="79"
            textAnchor="middle"
            fontSize="5.5"
            fontWeight="900"
            letterSpacing="1.2"
            fill="#0C0A0A"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            BENGALURU
          </text>
        </svg>
      );

    // 4. KOLKATA KNIGHT RIDERS (KKR) - Luxury Imperial Royal Amethyst & Polished Gold
    case 'kkr':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block drop-shadow-sm ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Kolkata Knight Riders Luxury Crest"
        >
          <defs>
            <linearGradient id="kkr-lux-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B175E" />
              <stop offset="50%" stopColor="#220B38" />
              <stop offset="100%" stopColor="#10031B" />
            </linearGradient>
            <linearGradient id="kkr-lux-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF4B8" />
              <stop offset="45%" stopColor="#E2BA49" />
              <stop offset="100%" stopColor="#9C700F" />
            </linearGradient>
          </defs>

          {/* Corinthian Shield Silhouette */}
          <path
            d="M50 4 L86 17 C86 57 71 81 50 96 C29 81 14 57 14 17 Z"
            fill="url(#kkr-lux-bg)"
            stroke="url(#kkr-lux-gold)"
            strokeWidth="2.5"
          />
          <path
            d="M50 9 L81 20 C81 53 68 74 50 88 C32 74 19 53 19 20 Z"
            stroke="url(#kkr-lux-gold)"
            strokeWidth="0.8"
            strokeOpacity="0.45"
          />

          {/* Minimalist Corinthian Plume & Visor Crest */}
          <g fill="url(#kkr-lux-gold)">
            <path d="M47 11 C47 19 53 19 53 11 C50 14 50 14 47 11 Z" />
            <circle cx="50" cy="19" r="4.5" />
            <path d="M44 26 L56 26 L53 30 L47 30 Z" opacity="0.7" />
          </g>

          {/* Center Luxury Monogram KKR */}
          <text
            x="50"
            y="60"
            textAnchor="middle"
            fontSize="26"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="2"
            fill="url(#kkr-lux-gold)"
          >
            KKR
          </text>

          {/* Polished Gold Banner */}
          <rect x="24" y="72" width="52" height="9" rx="2.5" fill="url(#kkr-lux-gold)" />
          <text
            x="50"
            y="79"
            textAnchor="middle"
            fontSize="5.5"
            fontWeight="900"
            letterSpacing="1.2"
            fill="#10031B"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            KNIGHT RIDERS
          </text>
        </svg>
      );

    // 5. RAJASTHAN ROYALS (RR) - Luxury Frosted Jaipur Rose & Sovereign Navy
    case 'rr':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block drop-shadow-sm ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Rajasthan Royals Luxury Crest"
        >
          <defs>
            <linearGradient id="rr-lux-pink" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9E205D" />
              <stop offset="50%" stopColor="#5E0D36" />
              <stop offset="100%" stopColor="#2D0318" />
            </linearGradient>
            <linearGradient id="rr-lux-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF4B8" />
              <stop offset="50%" stopColor="#E2BA49" />
              <stop offset="100%" stopColor="#9C700F" />
            </linearGradient>
          </defs>

          {/* Regal Shield Silhouette */}
          <path
            d="M50 4 L86 17 C86 57 71 81 50 96 C29 81 14 57 14 17 Z"
            fill="url(#rr-lux-pink)"
            stroke="url(#rr-lux-gold)"
            strokeWidth="2.5"
          />
          <path
            d="M50 9 L81 20 C81 53 68 74 50 88 C32 74 19 53 19 20 Z"
            stroke="url(#rr-lux-gold)"
            strokeWidth="0.8"
            strokeOpacity="0.45"
          />

          {/* Minimalist Maharajah Tiara */}
          <g fill="url(#rr-lux-gold)">
            <path d="M38 18 L50 11 L62 18 L58 23 L42 23 Z" />
            <circle cx="50" cy="9.5" r="1.8" fill="#FFFFFF" />
          </g>

          {/* Center Navy Roundel */}
          <circle cx="50" cy="51" r="26" fill="#0C152B" stroke="url(#rr-lux-gold)" strokeWidth="1.8" />

          {/* Center Luxury Monogram RR */}
          <text
            x="50"
            y="61"
            textAnchor="middle"
            fontSize="30"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="2.5"
            fill="url(#rr-lux-gold)"
          >
            RR
          </text>

          {/* Royals Banner */}
          <rect x="25" y="73" width="50" height="9" rx="2.5" fill="#0C152B" stroke="url(#rr-lux-gold)" strokeWidth="0.8" />
          <text
            x="50"
            y="80"
            textAnchor="middle"
            fontSize="5.5"
            fontWeight="900"
            letterSpacing="1.2"
            fill="#FFFFFF"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            ROYALS
          </text>
        </svg>
      );

    // 6. SUNRISERS HYDERABAD (SRH) - Luxury Terracotta Amber & Basalt Noir
    case 'srh':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block drop-shadow-sm ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Sunrisers Hyderabad Luxury Crest"
        >
          <defs>
            <linearGradient id="srh-lux-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E1916" />
              <stop offset="100%" stopColor="#0B0908" />
            </linearGradient>
            <linearGradient id="srh-lux-amber" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFCE7A" />
              <stop offset="45%" stopColor="#E66A23" />
              <stop offset="100%" stopColor="#9C3408" />
            </linearGradient>
          </defs>

          {/* Luxury Shield Silhouette */}
          <path
            d="M50 4 L86 17 C86 57 71 81 50 96 C29 81 14 57 14 17 Z"
            fill="url(#srh-lux-bg)"
            stroke="url(#srh-lux-amber)"
            strokeWidth="2.5"
          />
          <path
            d="M50 9 L81 20 C81 53 68 74 50 88 C32 74 19 53 19 20 Z"
            stroke="url(#srh-lux-amber)"
            strokeWidth="0.8"
            strokeOpacity="0.45"
          />

          {/* Architectural Falcon Wing & Sun Arc */}
          <circle cx="50" cy="30" r="10" stroke="url(#srh-lux-amber)" strokeWidth="1" strokeDasharray="2 2" fill="none" />
          <path d="M28 28 Q50 36 72 28 Q50 31 28 28 Z" fill="url(#srh-lux-amber)" opacity="0.85" />

          {/* Center Luxury Monogram SRH */}
          <text
            x="50"
            y="60"
            textAnchor="middle"
            fontSize="26"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="2"
            fill="url(#srh-lux-amber)"
          >
            SRH
          </text>

          {/* Amber Terracotta Banner */}
          <rect x="24" y="72" width="52" height="9" rx="2.5" fill="url(#srh-lux-amber)" />
          <text
            x="50"
            y="79"
            textAnchor="middle"
            fontSize="5.5"
            fontWeight="900"
            letterSpacing="1.2"
            fill="#0B0908"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            SUNRISERS
          </text>
        </svg>
      );

    // 7. GUJARAT TITANS (GT) - Luxury Faceted Titanium Slate & Pale Gold
    case 'gt':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block drop-shadow-sm ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Gujarat Titans Luxury Crest"
        >
          <defs>
            <linearGradient id="gt-lux-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E2738" />
              <stop offset="50%" stopColor="#111722" />
              <stop offset="100%" stopColor="#070A0F" />
            </linearGradient>
            <linearGradient id="gt-lux-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5DFB3" />
              <stop offset="50%" stopColor="#C49F5A" />
              <stop offset="100%" stopColor="#87672B" />
            </linearGradient>
          </defs>

          {/* Faceted Titanium Prism Kite */}
          <polygon
            points="50,4 90,25 77,87 50,96 23,87 10,25"
            fill="url(#gt-lux-bg)"
            stroke="url(#gt-lux-gold)"
            strokeWidth="2.5"
          />
          <polygon
            points="50,9 83,27 72,81 50,89 28,81 17,27"
            stroke="url(#gt-lux-gold)"
            strokeWidth="0.8"
            strokeOpacity="0.4"
          />

          {/* Geometric Precision Chevron / Lightning Accent */}
          <polygon points="52,14 40,32 49,32 45,46 59,28 50,28" fill="url(#gt-lux-gold)" opacity="0.85" />

          {/* Center Luxury Monogram GT */}
          <text
            x="50"
            y="64"
            textAnchor="middle"
            fontSize="32"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="2.5"
            fill="url(#gt-lux-gold)"
          >
            GT
          </text>

          {/* Titanium Gold Plaque */}
          <rect x="25" y="74" width="50" height="9" rx="2.5" fill="url(#gt-lux-gold)" />
          <text
            x="50"
            y="81"
            textAnchor="middle"
            fontSize="6"
            fontWeight="900"
            letterSpacing="1.2"
            fill="#070A0F"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            TITANS
          </text>
        </svg>
      );

    // 8. LUCKNOW SUPER GIANTS (LSG) - Luxury Arctic Ice Sky & Saffron/Emerald Arcs
    case 'lsg':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block drop-shadow-sm ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Lucknow Super Giants Luxury Crest"
        >
          <defs>
            <linearGradient id="lsg-lux-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B3C68" />
              <stop offset="50%" stopColor="#06223D" />
              <stop offset="100%" stopColor="#020E1C" />
            </linearGradient>
            <linearGradient id="lsg-lux-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#90E0EF" />
              <stop offset="100%" stopColor="#0077B6" />
            </linearGradient>
          </defs>

          {/* Luxury Shield Silhouette */}
          <path
            d="M50 4 L86 17 C86 57 71 81 50 96 C29 81 14 57 14 17 Z"
            fill="url(#lsg-lux-bg)"
            stroke="url(#lsg-lux-cyan)"
            strokeWidth="2.5"
          />
          <path
            d="M50 9 L81 20 C81 53 68 74 50 88 C32 74 19 53 19 20 Z"
            stroke="url(#lsg-lux-cyan)"
            strokeWidth="0.8"
            strokeOpacity="0.45"
          />

          {/* Minimalist Wing Arcs in Saffron & Emerald */}
          <path d="M26 26 Q38 22 48 30 Q36 33 26 26 Z" fill="#E87A1E" opacity="0.9" />
          <path d="M74 26 Q62 22 52 30 Q64 33 74 26 Z" fill="#E87A1E" opacity="0.9" />
          <path d="M28 32 Q39 28 48 36 Q37 39 28 32 Z" fill="#2E8540" opacity="0.9" />
          <path d="M72 32 Q61 28 52 36 Q63 39 72 32 Z" fill="#2E8540" opacity="0.9" />

          {/* Center Luxury Monogram LSG */}
          <text
            x="50"
            y="60"
            textAnchor="middle"
            fontSize="26"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="2"
            fill="#FFFFFF"
          >
            LSG
          </text>

          {/* Cyan Silver Plaque */}
          <rect x="24" y="72" width="52" height="9" rx="2.5" fill="#FFFFFF" opacity="0.95" />
          <text
            x="50"
            y="79"
            textAnchor="middle"
            fontSize="5.5"
            fontWeight="900"
            letterSpacing="1.2"
            fill="#020E1C"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            SUPER GIANTS
          </text>
        </svg>
      );

    // 9. DELHI CAPITALS (DC) - Luxury Heritage Venetian Navy & Scarlet Red
    case 'dc':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block drop-shadow-sm ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Delhi Capitals Luxury Crest"
        >
          <defs>
            <linearGradient id="dc-lux-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0E274D" />
              <stop offset="50%" stopColor="#081730" />
              <stop offset="100%" stopColor="#030A17" />
            </linearGradient>
            <linearGradient id="dc-lux-red" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B6B" />
              <stop offset="50%" stopColor="#D92534" />
              <stop offset="100%" stopColor="#8C0814" />
            </linearGradient>
          </defs>

          {/* Luxury Shield Silhouette */}
          <path
            d="M50 4 L86 17 C86 57 71 81 50 96 C29 81 14 57 14 17 Z"
            fill="url(#dc-lux-bg)"
            stroke="url(#dc-lux-red)"
            strokeWidth="2.5"
          />
          <path
            d="M50 9 L81 20 C81 53 68 74 50 88 C32 74 19 53 19 20 Z"
            stroke="url(#dc-lux-red)"
            strokeWidth="0.8"
            strokeOpacity="0.45"
          />

          {/* Architectural Parliament Dome & Triple Crest Arcs */}
          <path d="M43 20 C43 14 57 14 57 20 Z" fill="#FFFFFF" opacity="0.8" />
          <rect x="41" y="20" width="18" height="2" fill="#FFFFFF" opacity="0.8" />

          {/* Center Luxury Monogram DC */}
          <text
            x="50"
            y="60"
            textAnchor="middle"
            fontSize="32"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="2.5"
            fill="#FFFFFF"
          >
            DC
          </text>

          {/* Venetian Red Ribbon */}
          <rect x="25" y="72" width="50" height="9" rx="2.5" fill="url(#dc-lux-red)" />
          <text
            x="50"
            y="79"
            textAnchor="middle"
            fontSize="5.5"
            fontWeight="900"
            letterSpacing="1.2"
            fill="#FFFFFF"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            CAPITALS
          </text>
        </svg>
      );

    // 10. PUNJAB KINGS (PBKS) - Luxury Bordeaux Scarlet & Warm Brushed Gold
    case 'pbks':
    case 'pk':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block drop-shadow-sm ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Punjab Kings Luxury Crest"
        >
          <defs>
            <linearGradient id="pbks-lux-red" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8C1824" />
              <stop offset="50%" stopColor="#540810" />
              <stop offset="100%" stopColor="#240206" />
            </linearGradient>
            <linearGradient id="pbks-lux-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF4B8" />
              <stop offset="50%" stopColor="#E2BA49" />
              <stop offset="100%" stopColor="#9C700F" />
            </linearGradient>
          </defs>

          {/* Luxury Shield Silhouette */}
          <path
            d="M50 4 L86 17 C86 57 71 81 50 96 C29 81 14 57 14 17 Z"
            fill="url(#pbks-lux-red)"
            stroke="url(#pbks-lux-gold)"
            strokeWidth="2.5"
          />
          <path
            d="M50 9 L81 20 C81 53 68 74 50 88 C32 74 19 53 19 20 Z"
            stroke="url(#pbks-lux-gold)"
            strokeWidth="0.8"
            strokeOpacity="0.45"
          />

          {/* Minimalist Crown Pennants */}
          <g fill="url(#pbks-lux-gold)">
            <path d="M38 18 L50 11 L62 18 L58 23 L42 23 Z" />
            <circle cx="50" cy="9.5" r="1.8" fill="#FFFFFF" />
          </g>

          {/* Center Luxury Monogram PBKS */}
          <text
            x="50"
            y="59"
            textAnchor="middle"
            fontSize="23"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="1.8"
            fill="url(#pbks-lux-gold)"
          >
            PBKS
          </text>

          {/* Brushed Gold Banner */}
          <rect x="25" y="72" width="50" height="9" rx="2.5" fill="url(#pbks-lux-gold)" />
          <text
            x="50"
            y="79"
            textAnchor="middle"
            fontSize="6"
            fontWeight="900"
            letterSpacing="1.2"
            fill="#240206"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            PUNJAB
          </text>
        </svg>
      );

    default:
      return (
        <span
          className={`inline-flex items-center justify-center rounded-full bg-slate-800 text-[10px] font-bold text-white uppercase ${dimensionClass} ${className}`}
        >
          {fid.substring(0, 3)}
        </span>
      );
  }
}
