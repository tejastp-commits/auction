'use client';

import React from 'react';

interface DoodleFlagProps {
  country: string;
  className?: string;
}

/**
 * 100% HAND-DRAWN DOODLE FLAGS
 * Features a cute wavy flagpole, sketched marker stripes, and hand-drawn emblems
 * (including India's tricolor with hand-drawn Ashoka Chakra).
 */
export default function DoodleFlag({ country, className = 'w-6 h-5' }: DoodleFlagProps) {
  const norm = (country || '').toLowerCase().trim();

  // 1. INDIA DOODLE FLAG (Hand-drawn saffron, white with Ashoka Chakra, green)
  if (norm.includes('india') || norm === 'in' || norm === 'ind') {
    return (
      <svg
        viewBox="0 0 32 24"
        className={`${className} shrink-0 inline-block drop-shadow-xs`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="India Hand-Drawn Doodle Flag"
      >
        {/* Wavy Flagpole */}
        <line x1="5" y1="2" x2="5" y2="23" stroke="#2C2825" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="5" cy="2" r="1.5" fill="#FACC15" stroke="#2C2825" strokeWidth="1" />

        {/* Wavy Flag Cloth Outline */}
        <path
          d="M6 4 C 13 2, 20 6, 27 4 L 27 18 C 20 20, 13 16, 6 18 Z"
          fill="#FFFFFF"
          stroke="#2C2825"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Saffron Top Stripe */}
        <path
          d="M6 4 C 13 2, 20 6, 27 4 L 27 8.5 C 20 10.5, 13 6.5, 6 8.5 Z"
          fill="#FB923C"
        />

        {/* Green Bottom Stripe */}
        <path
          d="M6 13.5 C 13 11.5, 20 15.5, 27 13.5 L 27 18 C 20 20, 13 16, 6 18 Z"
          fill="#22C55E"
        />

        {/* Hand-Drawn Ashoka Chakra in Center (Blue circle with spokes) */}
        <circle cx="16.5" cy="11" r="2.2" stroke="#0284C7" strokeWidth="0.8" fill="none" />
        <line x1="14.5" y1="11" x2="18.5" y2="11" stroke="#0284C7" strokeWidth="0.6" />
        <line x1="16.5" y1="9" x2="16.5" y2="13" stroke="#0284C7" strokeWidth="0.6" />
        <circle cx="16.5" cy="11" r="0.6" fill="#0284C7" />
      </svg>
    );
  }

  // 2. AUSTRALIA DOODLE FLAG
  if (norm.includes('australia') || norm === 'aus') {
    return (
      <svg
        viewBox="0 0 32 24"
        className={`${className} shrink-0 inline-block drop-shadow-xs`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Australia Hand-Drawn Doodle Flag"
      >
        <line x1="5" y1="2" x2="5" y2="23" stroke="#2C2825" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="5" cy="2" r="1.5" fill="#FACC15" stroke="#2C2825" strokeWidth="1" />
        <path
          d="M6 4 C 13 2, 20 6, 27 4 L 27 18 C 20 20, 13 16, 6 18 Z"
          fill="#1E3A8A"
          stroke="#2C2825"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Union jack doodle canton */}
        <rect x="6" y="4" width="9" height="6.5" fill="#1E3A8A" stroke="#FFFFFF" strokeWidth="0.6" />
        <line x1="6" y1="7" x2="15" y2="7" stroke="#EF4444" strokeWidth="0.8" />
        <line x1="10.5" y1="4" x2="10.5" y2="10.5" stroke="#EF4444" strokeWidth="0.8" />
        {/* Southern Cross doodle stars */}
        <circle cx="21" cy="8" r="0.8" fill="#FFFFFF" />
        <circle cx="24" cy="10" r="0.8" fill="#FFFFFF" />
        <circle cx="21" cy="14" r="0.8" fill="#FFFFFF" />
        <circle cx="18" cy="11" r="0.8" fill="#FFFFFF" />
      </svg>
    );
  }

  // 3. ENGLAND DOODLE FLAG
  if (norm.includes('england') || norm === 'eng' || norm === 'uk') {
    return (
      <svg
        viewBox="0 0 32 24"
        className={`${className} shrink-0 inline-block drop-shadow-xs`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="England Hand-Drawn Doodle Flag"
      >
        <line x1="5" y1="2" x2="5" y2="23" stroke="#2C2825" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="5" cy="2" r="1.5" fill="#FACC15" stroke="#2C2825" strokeWidth="1" />
        <path
          d="M6 4 C 13 2, 20 6, 27 4 L 27 18 C 20 20, 13 16, 6 18 Z"
          fill="#FFFFFF"
          stroke="#2C2825"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Red St George cross */}
        <path d="M15 3.5 L15 18.5" stroke="#EF4444" strokeWidth="2.2" />
        <path d="M6 11 C 13 9, 20 13, 27 11" stroke="#EF4444" strokeWidth="2.2" />
      </svg>
    );
  }

  // 4. SOUTH AFRICA DOODLE FLAG
  if (norm.includes('south africa') || norm === 'sa' || norm === 'rsa') {
    return (
      <svg
        viewBox="0 0 32 24"
        className={`${className} shrink-0 inline-block drop-shadow-xs`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="South Africa Hand-Drawn Doodle Flag"
      >
        <line x1="5" y1="2" x2="5" y2="23" stroke="#2C2825" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="5" cy="2" r="1.5" fill="#FACC15" stroke="#2C2825" strokeWidth="1" />
        <path
          d="M6 4 C 13 2, 20 6, 27 4 L 27 18 C 20 20, 13 16, 6 18 Z"
          fill="#1E3A8A"
          stroke="#2C2825"
          strokeWidth="1.5"
        />
        <path d="M6 4 C 13 2, 20 6, 27 4 L 27 11 C 20 13, 13 9, 6 11 Z" fill="#EF4444" />
        {/* Green Y stripe */}
        <path d="M6 4 L 14 11 L 27 11" stroke="#10B981" strokeWidth="2.2" />
        <path d="M6 18 L 14 11" stroke="#10B981" strokeWidth="2.2" />
      </svg>
    );
  }

  // 5. WEST INDIES DOODLE FLAG
  if (norm.includes('west indies') || norm === 'wi') {
    return (
      <svg
        viewBox="0 0 32 24"
        className={`${className} shrink-0 inline-block drop-shadow-xs`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="West Indies Hand-Drawn Doodle Flag"
      >
        <line x1="5" y1="2" x2="5" y2="23" stroke="#2C2825" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="5" cy="2" r="1.5" fill="#FACC15" stroke="#2C2825" strokeWidth="1" />
        <path
          d="M6 4 C 13 2, 20 6, 27 4 L 27 18 C 20 20, 13 16, 6 18 Z"
          fill="#881337"
          stroke="#2C2825"
          strokeWidth="1.5"
        />
        {/* Palm tree / sun doodle */}
        <circle cx="16.5" cy="9.5" r="3" fill="#FACC15" />
        <line x1="16.5" y1="10" x2="16.5" y2="15" stroke="#15803D" strokeWidth="1.2" />
        <line x1="14" y1="10" x2="19" y2="10" stroke="#15803D" strokeWidth="1.2" />
      </svg>
    );
  }

  // 6. NEW ZEALAND DOODLE FLAG
  if (norm.includes('new zealand') || norm === 'nz') {
    return (
      <svg
        viewBox="0 0 32 24"
        className={`${className} shrink-0 inline-block drop-shadow-xs`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="New Zealand Hand-Drawn Doodle Flag"
      >
        <line x1="5" y1="2" x2="5" y2="23" stroke="#2C2825" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="5" cy="2" r="1.5" fill="#FACC15" stroke="#2C2825" strokeWidth="1" />
        <path
          d="M6 4 C 13 2, 20 6, 27 4 L 27 18 C 20 20, 13 16, 6 18 Z"
          fill="#0F172A"
          stroke="#2C2825"
          strokeWidth="1.5"
        />
        {/* 4 red stars with white border */}
        <circle cx="21" cy="7" r="1" fill="#EF4444" stroke="#FFF" strokeWidth="0.5" />
        <circle cx="24" cy="10" r="1" fill="#EF4444" stroke="#FFF" strokeWidth="0.5" />
        <circle cx="21" cy="15" r="1" fill="#EF4444" stroke="#FFF" strokeWidth="0.5" />
        <circle cx="18" cy="11" r="1" fill="#EF4444" stroke="#FFF" strokeWidth="0.5" />
      </svg>
    );
  }

  // 7. AFGHANISTAN DOODLE FLAG
  if (norm.includes('afghanistan') || norm === 'afg') {
    return (
      <svg
        viewBox="0 0 32 24"
        className={`${className} shrink-0 inline-block drop-shadow-xs`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Afghanistan Hand-Drawn Doodle Flag"
      >
        <line x1="5" y1="2" x2="5" y2="23" stroke="#2C2825" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="5" cy="2" r="1.5" fill="#FACC15" stroke="#2C2825" strokeWidth="1" />
        <path
          d="M6 4 C 13 2, 20 6, 27 4 L 27 18 C 20 20, 13 16, 6 18 Z"
          fill="#10B981"
          stroke="#2C2825"
          strokeWidth="1.5"
        />
        <path d="M6 4 L 13 4 L 13 18 L 6 18 Z" fill="#18181B" />
        <path d="M13 4 L 20 4 L 20 18 L 13 18 Z" fill="#EF4444" />
      </svg>
    );
  }

  // DEFAULT CRICKET DOODLE FLAG
  return (
    <svg
      viewBox="0 0 32 24"
      className={`${className} shrink-0 inline-block drop-shadow-xs`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="5" y1="2" x2="5" y2="23" stroke="#2C2825" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="5" cy="2" r="1.5" fill="#FACC15" stroke="#2C2825" strokeWidth="1" />
      <path
        d="M6 4 C 13 2, 20 6, 27 4 L 27 18 C 20 20, 13 16, 6 18 Z"
        fill="#FCE7F3"
        stroke="#2C2825"
        strokeWidth="1.5"
      />
      <circle cx="16" cy="11" r="3.5" fill="#FDA4AF" stroke="#2C2825" strokeWidth="1" />
    </svg>
  );
}
