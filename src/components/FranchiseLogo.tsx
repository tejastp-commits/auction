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
    // 1. CHENNAI SUPER KINGS (CSK) - Authentic Roaring Lion Profile & Crown
    case 'csk':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Chennai Super Kings"
        >
          <defs>
            <linearGradient id="csk-shield-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#005B9E" />
              <stop offset="50%" stopColor="#003D73" />
              <stop offset="100%" stopColor="#001B3A" />
            </linearGradient>
            <linearGradient id="csk-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF780" />
              <stop offset="40%" stopColor="#FDB913" />
              <stop offset="100%" stopColor="#F28C00" />
            </linearGradient>
            <linearGradient id="csk-mane-orange" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF8C00" />
              <stop offset="100%" stopColor="#E55100" />
            </linearGradient>
          </defs>
          {/* Outer Shield with Gold Edge */}
          <path
            d="M50 4 L88 18 C88 58 72 82 50 96 C28 82 12 58 12 18 Z"
            fill="url(#csk-shield-bg)"
            stroke="url(#csk-gold-grad)"
            strokeWidth="3.5"
          />
          {/* Inner Heraldic Gold Rim */}
          <path
            d="M50 8 L84 20 C84 54 70 76 50 89 C30 76 16 54 16 20 Z"
            stroke="url(#csk-gold-grad)"
            strokeWidth="1"
            opacity="0.45"
            fill="none"
          />
          {/* Royal King Crown */}
          <g fill="url(#csk-gold-grad)">
            <path d="M36 21 L50 13 L64 21 L59 27 L41 27 Z" />
            <circle cx="50" cy="11.5" r="2.2" fill="#FFFFFF" />
            <circle cx="36" cy="19.5" r="1.8" fill="#FFFFFF" />
            <circle cx="64" cy="19.5" r="1.8" fill="#FFFFFF" />
          </g>
          {/* CSK Roaring Lion Mane Flames (Spiking backward) */}
          <path
            d="M60 28 C68 30 74 38 72 48 C76 44 78 40 76 34 C82 42 80 52 74 58 C78 54 80 50 80 44 C84 54 80 64 70 70 C74 66 76 60 74 54 C70 66 62 70 52 72 Z"
            fill="url(#csk-mane-orange)"
            opacity="0.9"
          />
          {/* Roaring Lion Head & Snout Profile (Facing left) */}
          <path
            d="M52 28 C42 28 32 34 28 42 C24 48 24 55 28 60 C30 63 36 63 38 60 C38 63 34 66 31 67 C36 70 44 69 49 65 C45 66 39 67 36 64 C42 62 46 58 48 54 C46 54 44 55 42 55 C46 50 49 46 52 46 C56 46 58 50 60 55 C64 48 64 36 52 28 Z"
            fill="url(#csk-gold-grad)"
          />
          {/* Fierce Eye & Fangs */}
          <circle cx="37" cy="42" r="2.2" fill="#001B3A" />
          <circle cx="36.5" cy="41.5" r="0.8" fill="#FFFFFF" />
          {/* Open Roar Jaw & Fangs */}
          <polygon points="32,54 35,50 36,54" fill="#FFFFFF" />
          <polygon points="31,58 34,60 36,58" fill="#FFFFFF" />
          {/* CSK Wordmark Banner */}
          <rect x="22" y="74" width="56" height="13" rx="3.5" fill="url(#csk-gold-grad)" stroke="#FFFFFF" strokeWidth="0.8" />
          <text x="50" y="84" textAnchor="middle" fontSize="9.5" fontWeight="900" letterSpacing="0.8" fill="#001B3A" fontFamily="sans-serif">
            CSK
          </text>
        </svg>
      );

    // 2. MUMBAI INDIANS (MI) - Sudarshan Razor Chakra & Tricolor Ribbon
    case 'mi':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Mumbai Indians"
        >
          <defs>
            <linearGradient id="mi-blue-core" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0077B6" />
              <stop offset="50%" stopColor="#004BA0" />
              <stop offset="100%" stopColor="#001F54" />
            </linearGradient>
            <linearGradient id="mi-gold-blade" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF3B0" />
              <stop offset="50%" stopColor="#E0B130" />
              <stop offset="100%" stopColor="#B38600" />
            </linearGradient>
          </defs>
          {/* Outer Ring */}
          <circle cx="50" cy="50" r="46" fill="url(#mi-blue-core)" stroke="url(#mi-gold-blade)" strokeWidth="3" />
          {/* Outer Razor Chakra Blades (8 Aerodynamic Curved Swirl Blades) */}
          <g transform="translate(50,50)">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <path
                key={angle}
                d="M0 -42 C8 -32 14 -18 6 -6 C-2 -16 -4 -30 0 -42 Z"
                fill={i % 2 === 0 ? 'url(#mi-gold-blade)' : '#FFFFFF'}
                transform={`rotate(${angle})`}
                opacity={i % 2 === 0 ? '1' : '0.85'}
              />
            ))}
            {/* Center Disk */}
            <circle cx="0" cy="0" r="22" fill="#001F54" stroke="url(#mi-gold-blade)" strokeWidth="2.5" />
            {/* MI Monogram */}
            <text
              x="0"
              y="6"
              textAnchor="middle"
              fontSize="16"
              fontWeight="900"
              letterSpacing="1"
              fill="url(#mi-gold-blade)"
              fontFamily="sans-serif"
            >
              MI
            </text>
          </g>
          {/* Indian Tricolor Wave Accent at Bottom */}
          <path d="M26 84 Q50 78 74 84" stroke="#FF9933" strokeWidth="2" strokeLinecap="round" />
          <path d="M28 87 Q50 81 72 87" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M30 90 Q50 84 70 90" stroke="#138808" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    // 3. ROYAL CHALLENGERS BENGALURU (RCB) - Rampant Lion Standing & Royal Crown
    case 'rcb':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Royal Challengers Bengaluru"
        >
          <defs>
            <linearGradient id="rcb-shield-red" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D90429" />
              <stop offset="60%" stopColor="#A0001E" />
              <stop offset="100%" stopColor="#4A000C" />
            </linearGradient>
            <linearGradient id="rcb-gold-lion" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF176" />
              <stop offset="50%" stopColor="#E5A823" />
              <stop offset="100%" stopColor="#B37D00" />
            </linearGradient>
          </defs>
          {/* Shield Outline */}
          <path
            d="M50 4 L88 18 C88 56 74 80 50 96 C26 80 12 56 12 18 Z"
            fill="url(#rcb-shield-red)"
            stroke="url(#rcb-gold-lion)"
            strokeWidth="3.5"
          />
          {/* Inner Black Field (RCB Iconic split) */}
          <path
            d="M50 10 L82 22 C82 52 70 72 50 86 C30 72 18 52 18 22 Z"
            fill="#0A0A0A"
          />
          {/* Royal Crown atop lion */}
          <g fill="url(#rcb-gold-lion)">
            <path d="M36 21 L50 14 L64 21 L59 26 L41 26 Z" />
            <circle cx="50" cy="12.5" r="2" fill="#FFFFFF" />
            <circle cx="36" cy="19.5" r="1.5" fill="#FFFFFF" />
            <circle cx="64" cy="19.5" r="1.5" fill="#FFFFFF" />
          </g>
          {/* Authentic Heraldic Rampant Lion (Standing upright, paws raised in strike) */}
          <g fill="url(#rcb-gold-lion)">
            {/* Lion Head & Roar */}
            <path d="M48 27 C54 27 58 31 56 36 C54 39 49 40 46 38 C44 36 44 31 48 27 Z" />
            {/* Upper Raised Paws (Claws striking left & up) */}
            <path d="M46 34 L36 30 L38 34 L43 37 Z" />
            <path d="M47 38 L34 40 L36 43 L44 42 Z" />
            {/* Muscular Lion Torso */}
            <path d="M48 37 C54 39 55 48 51 54 C48 58 45 61 46 66 L52 66 C50 71 44 71 42 66 C40 60 44 52 45 44 Z" />
            {/* Hind Legs & Paws */}
            <path d="M46 58 L58 64 L54 67 L44 63 Z" />
            <path d="M43 64 L36 71 L40 73 L45 68 Z" />
            {/* Heraldic S-Curve Tail */}
            <path
              d="M52 56 C62 52 66 44 63 36 C61 36 60 38 61 41 C62 46 58 50 50 53 Z"
            />
          </g>
          {/* Wordmark Banner */}
          <rect x="22" y="73" width="56" height="13" rx="3.5" fill="url(#rcb-gold-lion)" />
          <text x="50" y="83" textAnchor="middle" fontSize="10" fontWeight="900" letterSpacing="1" fill="#0A0A0A" fontFamily="sans-serif">
            RCB
          </text>
        </svg>
      );

    // 4. KOLKATA KNIGHT RIDERS (KKR) - Corinthian Knight Helmet & Flaming Plume
    case 'kkr':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Kolkata Knight Riders"
        >
          <defs>
            <linearGradient id="kkr-purple-shield" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#582C83" />
              <stop offset="60%" stopColor="#37185B" />
              <stop offset="100%" stopColor="#1C0A33" />
            </linearGradient>
            <linearGradient id="kkr-gold-metal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2A3" />
              <stop offset="45%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#997A15" />
            </linearGradient>
            <linearGradient id="kkr-flame" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#E5A823" />
              <stop offset="50%" stopColor="#FFD54F" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
          </defs>
          <path
            d="M50 4 L88 18 C88 58 72 82 50 96 C28 82 12 58 12 18 Z"
            fill="url(#kkr-purple-shield)"
            stroke="url(#kkr-gold-metal)"
            strokeWidth="3.5"
          />
          {/* Knight Helmet Crest Flame (Comet fire blazing upward) */}
          <path
            d="M50 11 C44 20 48 28 50 34 C52 28 56 20 50 11 Z"
            fill="url(#kkr-flame)"
          />
          <path
            d="M44 18 C38 24 42 30 46 34 C43 28 41 24 44 18 Z"
            fill="url(#kkr-gold-metal)"
            opacity="0.8"
          />
          <path
            d="M56 18 C62 24 58 30 54 34 C57 28 59 24 56 18 Z"
            fill="url(#kkr-gold-metal)"
            opacity="0.8"
          />
          {/* Corinthian Knight Helmet Visor & Cheeks */}
          <path
            d="M32 38 C32 28 68 28 68 38 C68 48 65 58 58 66 C54 70 46 70 42 66 C35 58 32 48 32 38 Z"
            fill="url(#kkr-gold-metal)"
          />
          {/* Helmet Eye Visor Cutout */}
          <path d="M38 43 L62 43 L58 49 L42 49 Z" fill="#1C0A33" />
          {/* T-bar Nose & Mouth Guard */}
          <path d="M47 49 L53 49 L51 63 L49 63 Z" fill="#1C0A33" />
          <line x1="42" y1="56" x2="47" y2="56" stroke="#1C0A33" strokeWidth="1.5" />
          <line x1="53" y1="56" x2="58" y2="56" stroke="#1C0A33" strokeWidth="1.5" />
          {/* Wordmark Banner */}
          <rect x="22" y="73" width="56" height="13" rx="3.5" fill="url(#kkr-gold-metal)" stroke="#FFFFFF" strokeWidth="0.8" />
          <text x="50" y="83" textAnchor="middle" fontSize="9.5" fontWeight="900" letterSpacing="0.8" fill="#1C0A33" fontFamily="sans-serif">
            KKR
          </text>
        </svg>
      );

    // 5. RAJASTHAN ROYALS (RR) - Twin Heraldic Lions & Maharajah Crown
    case 'rr':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Rajasthan Royals"
        >
          <defs>
            <linearGradient id="rr-jaipur-pink" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF409F" />
              <stop offset="50%" stopColor="#EA1A85" />
              <stop offset="100%" stopColor="#A60055" />
            </linearGradient>
            <linearGradient id="rr-royal-navy" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#003566" />
              <stop offset="100%" stopColor="#001429" />
            </linearGradient>
            <linearGradient id="rr-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2A3" />
              <stop offset="50%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#B38600" />
            </linearGradient>
          </defs>
          <path
            d="M50 4 L88 18 C88 58 72 82 50 96 C28 82 12 58 12 18 Z"
            fill="url(#rr-jaipur-pink)"
            stroke="#FFFFFF"
            strokeWidth="3.5"
          />
          {/* Maharajah Crown on Top */}
          <g fill="url(#rr-gold)">
            <path d="M35 22 L50 14 L65 22 L60 28 L40 28 Z" stroke="#FFFFFF" strokeWidth="0.8" />
            <circle cx="50" cy="12.5" r="2.2" fill="#FFFFFF" />
            <circle cx="35" cy="20.5" r="1.8" fill="#FFFFFF" />
            <circle cx="65" cy="20.5" r="1.8" fill="#FFFFFF" />
          </g>
          {/* Twin Heraldic Lions flanking the central badge */}
          {/* Left Lion */}
          <path
            d="M26 36 C29 36 32 40 31 44 C27 45 23 50 25 56 C27 62 33 62 36 60 C32 64 26 64 22 58 C19 50 20 42 26 36 Z"
            fill="url(#rr-gold)"
          />
          {/* Right Lion */}
          <path
            d="M74 36 C71 36 68 40 69 44 C73 45 77 50 75 56 C73 62 67 62 64 60 C68 64 74 64 78 58 C81 50 80 42 74 36 Z"
            fill="url(#rr-gold)"
          />
          {/* Center Royal Navy Emblem with Interlocking RR */}
          <circle cx="50" cy="49" r="18" fill="url(#rr-royal-navy)" stroke="url(#rr-gold)" strokeWidth="2.5" />
          <text
            x="50"
            y="55"
            textAnchor="middle"
            fontSize="14"
            fontWeight="900"
            letterSpacing="1"
            fill="url(#rr-gold)"
            fontFamily="serif"
          >
            RR
          </text>
          {/* ROYALS Banner */}
          <rect x="20" y="74" width="60" height="13" rx="3.5" fill="url(#rr-royal-navy)" stroke="url(#rr-gold)" strokeWidth="1" />
          <text x="50" y="84" textAnchor="middle" fontSize="9" fontWeight="900" letterSpacing="1.2" fill="#FFFFFF" fontFamily="sans-serif">
            ROYALS
          </text>
        </svg>
      );

    // 6. SUNRISERS HYDERABAD (SRH) - Outstretched Rising Eagle & Sunburst
    case 'srh':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Sunrisers Hyderabad"
        >
          <defs>
            <linearGradient id="srh-fire-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E1E1E" />
              <stop offset="100%" stopColor="#0A0A0A" />
            </linearGradient>
            <linearGradient id="srh-orange-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFB300" />
              <stop offset="50%" stopColor="#FF6D00" />
              <stop offset="100%" stopColor="#DD2C00" />
            </linearGradient>
            <radialGradient id="srh-sun-core" cx="50%" cy="45%" r="40%">
              <stop offset="0%" stopColor="#FFFF8D" />
              <stop offset="60%" stopColor="#FF9100" />
              <stop offset="100%" stopColor="#DD2C00" />
            </radialGradient>
          </defs>
          <path
            d="M50 4 L88 18 C88 58 72 82 50 96 C28 82 12 58 12 18 Z"
            fill="url(#srh-fire-bg)"
            stroke="url(#srh-orange-grad)"
            strokeWidth="3.5"
          />
          {/* Sunburst Core Arc */}
          <circle cx="50" cy="46" r="23" fill="url(#srh-sun-core)" />
          {/* Sunburst Radiant Rays */}
          {[0, 25, 50, 75, 105, 130, 155, 180].map((deg) => (
            <line
              key={deg}
              x1="50"
              y1="46"
              x2={50 + 26 * Math.cos((deg * Math.PI) / 180 - Math.PI)}
              y2={46 + 26 * Math.sin((deg * Math.PI) / 180 - Math.PI)}
              stroke="#FFF"
              strokeWidth="1.8"
              opacity="0.85"
            />
          ))}
          {/* Soaring Eagle / Falcon Outstretched Wings & Head */}
          <path
            d="M50 32 C46 36 34 38 18 36 C25 43 36 47 46 47 L50 63 L54 47 C64 47 75 43 82 36 C66 38 54 36 50 32 Z"
            fill="#FFFFFF"
          />
          {/* Eagle Chest Layer in Gold/Orange */}
          <path
            d="M50 42 C45 42 36 44 26 42 C33 46 42 49 48 49 L50 58 L52 49 C58 49 67 46 74 42 C64 44 55 42 50 42 Z"
            fill="url(#srh-orange-grad)"
          />
          {/* Eagle Beak & Eye */}
          <polygon points="50,34 48,39 52,39" fill="#0A0A0A" />
          {/* Wordmark Banner */}
          <rect x="22" y="73" width="56" height="13" rx="3.5" fill="url(#srh-orange-grad)" stroke="#FFFFFF" strokeWidth="0.8" />
          <text x="50" y="83" textAnchor="middle" fontSize="9.5" fontWeight="900" letterSpacing="0.8" fill="#000000" fontFamily="sans-serif">
            SRH
          </text>
        </svg>
      );

    // 7. GUJARAT TITANS (GT) - Aerodynamic Titanium Prism & Gold Lightning Bolt
    case 'gt':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Gujarat Titans"
        >
          <defs>
            <linearGradient id="gt-titan-navy" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#253248" />
              <stop offset="50%" stopColor="#172033" />
              <stop offset="100%" stopColor="#0B0F19" />
            </linearGradient>
            <linearGradient id="gt-gold-armor" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5DFB3" />
              <stop offset="50%" stopColor="#C8A668" />
              <stop offset="100%" stopColor="#8C682A" />
            </linearGradient>
          </defs>
          {/* Kite/Prism Shield Shape */}
          <polygon
            points="50,4 92,26 78,88 50,97 22,88 8,26"
            fill="url(#gt-titan-navy)"
            stroke="url(#gt-gold-armor)"
            strokeWidth="3.5"
          />
          {/* Faceted Prism 3D Geometry */}
          <polygon points="50,4 50,97 8,26" fill="#FFFFFF" opacity="0.04" />
          <polygon points="50,4 92,26 50,97" fill="#000000" opacity="0.25" />
          {/* Electric Gold Lightning Bolt */}
          <polygon
            points="56,16 34,48 49,48 44,76 68,40 52,40"
            fill="url(#gt-gold-armor)"
            stroke="#FFFFFF"
            strokeWidth="1.2"
          />
          {/* Wordmark Banner */}
          <rect x="22" y="75" width="56" height="13" rx="3.5" fill="url(#gt-gold-armor)" />
          <text x="50" y="85" textAnchor="middle" fontSize="9.5" fontWeight="900" letterSpacing="0.8" fill="#0B0F19" fontFamily="sans-serif">
            TITANS
          </text>
        </svg>
      );

    // 8. LUCKNOW SUPER GIANTS (LSG) - Tricolor Garuda Wings & Cricket Ball
    case 'lsg':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Lucknow Super Giants"
        >
          <defs>
            <linearGradient id="lsg-sky-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00A8E8" />
              <stop offset="50%" stopColor="#007EA7" />
              <stop offset="100%" stopColor="#003459" />
            </linearGradient>
          </defs>
          <path
            d="M50 4 L88 18 C88 58 72 82 50 96 C28 82 12 58 12 18 Z"
            fill="url(#lsg-sky-bg)"
            stroke="#FFFFFF"
            strokeWidth="3.5"
          />
          {/* Garuda Feather Wings in Indian Tricolor */}
          {/* Top Saffron / Orange Feathers */}
          <path d="M20 34 Q36 28 48 40 Q34 44 20 40 Z" fill="#FF9933" />
          <path d="M80 34 Q64 28 52 40 Q66 44 80 40 Z" fill="#FF9933" />
          {/* Middle White Feathers */}
          <path d="M22 43 Q38 38 48 48 Q36 52 24 49 Z" fill="#FFFFFF" />
          <path d="M78 43 Q62 38 52 48 Q64 52 76 49 Z" fill="#FFFFFF" />
          {/* Bottom Green Feathers */}
          <path d="M26 51 Q40 48 48 56 Q38 60 28 57 Z" fill="#138808" />
          <path d="M74 51 Q60 48 52 56 Q62 60 72 57 Z" fill="#138808" />
          {/* Center Cricket Ball with White Seam */}
          <circle cx="50" cy="49" r="8.5" fill="#E63946" stroke="#FFFFFF" strokeWidth="1.5" />
          <path d="M45 46 Q50 49 55 46" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="1.2 1" fill="none" />
          {/* Wordmark Banner */}
          <rect x="22" y="73" width="56" height="13" rx="3.5" fill="#FFFFFF" stroke="#003459" strokeWidth="1" />
          <text x="50" y="83" textAnchor="middle" fontSize="9.5" fontWeight="900" letterSpacing="0.8" fill="#003459" fontFamily="sans-serif">
            LSG
          </text>
        </svg>
      );

    // 9. DELHI CAPITALS (DC) - Three Roaring Tigers & Parliament Dome
    case 'dc':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Delhi Capitals"
        >
          <defs>
            <linearGradient id="dc-shield-blue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0078BC" />
              <stop offset="50%" stopColor="#004D80" />
              <stop offset="100%" stopColor="#002244" />
            </linearGradient>
            <linearGradient id="dc-tiger-red" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF3344" />
              <stop offset="100%" stopColor="#CC0011" />
            </linearGradient>
          </defs>
          <path
            d="M50 4 L88 18 C88 58 72 82 50 96 C28 82 12 58 12 18 Z"
            fill="url(#dc-shield-blue)"
            stroke="url(#dc-tiger-red)"
            strokeWidth="3.5"
          />
          {/* Parliament Dome Silhouette */}
          <path d="M40 28 C40 18 60 18 60 28 Z" fill="#FFFFFF" opacity="0.9" />
          <rect x="38" y="28" width="24" height="3" fill="#FFFFFF" opacity="0.9" />
          {/* Three Roaring Tiger Emblems */}
          {/* Center Main Tiger */}
          <circle cx="50" cy="42" r="10" fill="url(#dc-tiger-red)" stroke="#FFFFFF" strokeWidth="1.2" />
          {/* Tiger Ears & Snout */}
          <polygon points="43,34 46,30 48,34" fill="#FFFFFF" />
          <polygon points="57,34 54,30 52,34" fill="#FFFFFF" />
          <polygon points="50,44 47,41 53,41" fill="#FFFFFF" />
          {/* Left Flanking Tiger */}
          <circle cx="34" cy="48" r="8" fill="url(#dc-tiger-red)" stroke="#FFFFFF" strokeWidth="1" />
          <polygon points="28,42 30,38 33,42" fill="#FFFFFF" />
          {/* Right Flanking Tiger */}
          <circle cx="66" cy="48" r="8" fill="url(#dc-tiger-red)" stroke="#FFFFFF" strokeWidth="1" />
          <polygon points="72,42 70,38 67,42" fill="#FFFFFF" />
          {/* Wordmark Banner */}
          <rect x="22" y="73" width="56" height="13" rx="3.5" fill="url(#dc-tiger-red)" stroke="#FFFFFF" strokeWidth="0.8" />
          <text x="50" y="83" textAnchor="middle" fontSize="10" fontWeight="900" letterSpacing="1" fill="#FFFFFF" fontFamily="sans-serif">
            DC
          </text>
        </svg>
      );

    // 10. PUNJAB KINGS (PBKS) - Red Shield & Roaring Golden Lion
    case 'pbks':
    case 'pk':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${dimensionClass} shrink-0 inline-block ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Punjab Kings"
        >
          <defs>
            <linearGradient id="pbks-red-shield" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E61C24" />
              <stop offset="50%" stopColor="#B30006" />
              <stop offset="100%" stopColor="#5E0003" />
            </linearGradient>
            <linearGradient id="pbks-gold-lion" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2A3" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#997A15" />
            </linearGradient>
          </defs>
          <path
            d="M50 4 L88 18 C88 58 72 82 50 96 C28 82 12 58 12 18 Z"
            fill="url(#pbks-red-shield)"
            stroke="url(#pbks-gold-lion)"
            strokeWidth="3.5"
          />
          {/* Crown Pennants atop shield */}
          <g fill="url(#pbks-gold-lion)">
            <path d="M37 21 L50 14 L63 21 L59 26 L41 26 Z" />
            <circle cx="50" cy="12.5" r="2" fill="#FFFFFF" />
          </g>
          {/* Fierce Front-Facing Roaring Lion Head */}
          <g fill="url(#pbks-gold-lion)">
            {/* Mane */}
            <path
              d="M32 38 C32 30 68 30 68 38 C74 46 72 58 64 66 C56 72 44 72 36 66 C28 58 26 46 32 38 Z"
            />
            {/* Inner Face Mask */}
            <path
              d="M38 42 C42 38 58 38 62 42 C65 48 64 56 58 62 C54 66 46 66 42 62 C36 56 35 48 38 42 Z"
              fill="#5E0003"
            />
            {/* Lion Eyes */}
            <circle cx="44" cy="46" r="2" fill="#FFFFFF" />
            <circle cx="56" cy="46" r="2" fill="#FFFFFF" />
            {/* Lion Nose & Fangs */}
            <polygon points="50,52 46,49 54,49" fill="url(#pbks-gold-lion)" />
            <polygon points="46,56 48,53 50,56" fill="#FFFFFF" />
            <polygon points="54,56 52,53 50,56" fill="#FFFFFF" />
          </g>
          {/* Wordmark Banner */}
          <rect x="20" y="73" width="60" height="13" rx="3.5" fill="url(#pbks-gold-lion)" stroke="#FFFFFF" strokeWidth="0.8" />
          <text x="50" y="83" textAnchor="middle" fontSize="9" fontWeight="900" letterSpacing="1" fill="#5E0003" fontFamily="sans-serif">
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
