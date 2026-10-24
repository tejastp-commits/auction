'use client';

import React, { useState } from 'react';
import { THEMES } from './ThemeCustomizer';
import { Palette, Sparkles, Heart } from 'lucide-react';

export default function DoodleSection() {
  const [activeDoodleTheme, setActiveDoodleTheme] = useState('pastel-rose');
  const [doodleNotification, setDoodleNotification] = useState('');

  const applyDoodleTheme = (themeId: string) => {
    const theme = THEMES.find((t) => t.id === themeId) || THEMES[0];
    const root = document.documentElement;

    root.style.setProperty('--theme-bg', theme.bg);
    root.style.setProperty('--theme-surface', theme.surface);
    root.style.setProperty('--theme-subtle', theme.subtle);
    root.style.setProperty('--theme-subtle-border', theme.subtleBorder);
    root.style.setProperty('--theme-text', theme.text);
    root.style.setProperty('--theme-muted', theme.muted);
    root.style.setProperty('--theme-border', theme.border);
    root.style.setProperty('--theme-accent', theme.accent);
    root.style.setProperty('--theme-accent-hover', theme.accentHover);
    root.style.setProperty('--theme-accent-light', theme.accentLight);
    root.style.setProperty('--theme-shadow', theme.shadow);
    root.setAttribute('data-theme', theme.id);

    localStorage.setItem('auction_theme_id', theme.id);
    setActiveDoodleTheme(theme.id);
    setDoodleNotification(`Switched to ${theme.name}! ✏️`);
    setTimeout(() => setDoodleNotification(''), 2500);
  };

  return (
    <section className="mb-16 sm:mb-24 relative font-doodle">
      {/* Background Soft Pastel Pink Paper with Doodle Border */}
      <div className="relative rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-10 border-2 border-[#2C2825] bg-[#FFF1F5] shadow-[6px_6px_0px_#2C2825] overflow-hidden text-[#2C2825]">
        
        {/* Floating Background Doodles */}
        <div className="absolute top-3 right-6 opacity-25 pointer-events-none hidden md:block">
          <svg width="140" height="100" viewBox="0 0 140 100" fill="none">
            {/* Hand-drawn cricket pitch */}
            <rect x="20" y="20" width="100" height="40" rx="6" stroke="#2C2825" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="40" y1="20" x2="40" y2="60" stroke="#2C2825" strokeWidth="2" />
            <line x1="100" y1="20" x2="100" y2="60" stroke="#2C2825" strokeWidth="2" />
            {/* Stumps */}
            <line x1="28" y1="35" x2="28" y2="45" stroke="#2C2825" strokeWidth="2.5" />
            <line x1="30" y1="35" x2="30" y2="45" stroke="#2C2825" strokeWidth="2.5" />
            <line x1="32" y1="35" x2="32" y2="45" stroke="#2C2825" strokeWidth="2.5" />
          </svg>
        </div>

        {/* Section Header: User requested "The Cricket War Room" (without writing 'doodle cricket') */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b-2 border-dashed border-[#2C2825]">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-sm font-black tracking-wider uppercase bg-pink-200 text-pink-900 border border-pink-400 shadow-sm mb-2">
              <span>✏️ Hand-Drawn Sketchbook</span>
              <span className="w-1.5 h-1.5 rounded-full bg-pink-600 animate-ping" />
              <span>Pastel Pink Edition</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight flex flex-wrap items-baseline gap-3">
              <span>The</span>
              <span className="text-5xl sm:text-6xl lg:text-7xl text-[#E11D48] rotate-[-1.5deg] inline-block font-bold relative">
                Cricket War Room
                {/* Hand-drawn squiggly underline */}
                <svg className="w-full h-3.5 text-[#E11D48] opacity-80 mt-0.5 block" viewBox="0 0 240 12" fill="none" preserveAspectRatio="none">
                  <path d="M2 9 C 50 2, 100 11, 150 5 C 200 1, 238 8, 238 8" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
              </span>
            </h2>

            <p className="mt-2 text-lg sm:text-xl opacity-85 max-w-xl font-medium leading-relaxed">
              Every bid paddle raise, 300 curated players, and franchise purse calculation sketched out in authentic hand-drawn pastel notes.
            </p>
          </div>

          {/* 1-Click Pastel Theme Switchers */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => applyDoodleTheme('pastel-rose')}
              className={`px-4 py-2 rounded-2xl font-black text-sm border-2 border-[#2C2825] transition-all cursor-pointer flex items-center gap-1.5 ${
                activeDoodleTheme === 'pastel-rose'
                  ? 'bg-pink-300 text-pink-950 shadow-[3px_3px_0px_#2C2825] translate-x-[-1px] translate-y-[-1px]'
                  : 'bg-white hover:bg-pink-100 shadow-[2px_2px_0px_#2C2825]'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
              <span>Pastel Rose (Pink)</span>
            </button>

            <button
              type="button"
              onClick={() => applyDoodleTheme('pastel-lavender')}
              className="px-3.5 py-2 rounded-2xl font-bold text-sm bg-purple-100 hover:bg-purple-200 border-2 border-[#2C2825] shadow-[2px_2px_0px_#2C2825] transition-all cursor-pointer"
            >
              🌸 Lavender
            </button>

            <button
              type="button"
              onClick={() => applyDoodleTheme('pastel-mint')}
              className="px-3.5 py-2 rounded-2xl font-bold text-sm bg-emerald-100 hover:bg-emerald-200 border-2 border-[#2C2825] shadow-[2px_2px_0px_#2C2825] transition-all cursor-pointer"
            >
              🍵 Matcha Mint
            </button>

            <button
              type="button"
              onClick={() => applyDoodleTheme('pastel-butter')}
              className="px-3.5 py-2 rounded-2xl font-bold text-sm bg-amber-100 hover:bg-amber-200 border-2 border-[#2C2825] shadow-[2px_2px_0px_#2C2825] transition-all cursor-pointer"
            >
              🍯 Butter Yellow
            </button>
          </div>
        </div>

        {doodleNotification && (
          <div className="mb-6 p-3 rounded-2xl bg-pink-200 border-2 border-[#2C2825] text-center font-bold text-base shadow-[2px_2px_0px_#2C2825] animate-fade-in">
            {doodleNotification}
          </div>
        )}

        {/* 6 EXPANDED HAND-DRAWN SKETCHBOOK CARDS PACKED WITH DOODLE DRAWINGS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          
          {/* 1. DOODLE DRAWING: THE CRICKET PITCH, BATSMAN & BOWLER */}
          <div className="relative p-6 rounded-[2rem] bg-[#FEFCE8] border-2 border-[#2C2825] shadow-[4px_5px_0px_#2C2825] rotate-[-1deg] hover:rotate-0 hover:scale-[1.01] transition-all flex flex-col justify-between">
            {/* Pink tape */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-6 bg-pink-200/90 border-l-2 border-r-2 border-dashed border-[#2C2825] rotate-1 shadow-xs" />

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl font-bold text-amber-900">#01 Batsman vs Bowler</span>
                <span className="text-xs font-black px-2 py-0.5 rounded-lg bg-amber-200 border border-amber-400">PITCH ACTION</span>
              </div>

              {/* Hand-Drawn Doodle Bowler & Batsman SVG */}
              <div className="w-full h-32 my-2 flex items-center justify-center">
                <svg viewBox="0 0 160 80" className="w-full h-full drop-shadow-xs" fill="none">
                  {/* Pitch strip */}
                  <rect x="10" y="55" width="140" height="14" rx="4" fill="#FEF08A" stroke="#2C2825" strokeWidth="2" strokeDasharray="3 3" />
                  
                  {/* Bowler (Left) */}
                  <g transform="translate(20, 15)">
                    {/* Head */}
                    <circle cx="15" cy="10" r="5" fill="#FED7AA" stroke="#2C2825" strokeWidth="1.8" />
                    {/* Torso */}
                    <line x1="15" y1="15" x2="14" y2="30" stroke="#2C2825" strokeWidth="2.2" strokeLinecap="round" />
                    {/* Bowling arm swinging overhead */}
                    <path d="M14 18 C 16 10, 24 6, 26 12" stroke="#2C2825" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                    {/* Ball in hand */}
                    <circle cx="27" cy="12" r="3" fill="#E11D48" stroke="#2C2825" strokeWidth="1.2" />
                    {/* Running legs */}
                    <line x1="14" y1="30" x2="6" y2="42" stroke="#2C2825" strokeWidth="2.2" strokeLinecap="round" />
                    <line x1="14" y1="30" x2="22" y2="42" stroke="#2C2825" strokeWidth="2.2" strokeLinecap="round" />
                  </g>

                  {/* Ball motion trajectory dotted arc */}
                  <path d="M50 26 Q 80 18, 110 38" stroke="#E11D48" strokeWidth="2" strokeDasharray="3 3" fill="none" />

                  {/* Stumps at batting end */}
                  <g transform="translate(132, 28)">
                    <line x1="2" y1="0" x2="2" y2="28" stroke="#854D0E" strokeWidth="2" />
                    <line x1="6" y1="0" x2="6" y2="28" stroke="#854D0E" strokeWidth="2" />
                    <line x1="10" y1="0" x2="10" y2="28" stroke="#854D0E" strokeWidth="2" />
                    <line x1="0" y1="0" x2="12" y2="0" stroke="#854D0E" strokeWidth="2" />
                  </g>

                  {/* Batsman (Right) */}
                  <g transform="translate(100, 14)">
                    {/* Helmet head */}
                    <circle cx="15" cy="10" r="6" fill="#60A5FA" stroke="#2C2825" strokeWidth="1.8" />
                    <line x1="16" y1="11" x2="21" y2="11" stroke="#2C2825" strokeWidth="1.5" />
                    {/* Torso & arms swinging bat */}
                    <line x1="15" y1="16" x2="13" y2="32" stroke="#2C2825" strokeWidth="2.2" strokeLinecap="round" />
                    {/* Cricket Bat in grip */}
                    <rect x="2" y="10" width="4" height="26" rx="2" transform="rotate(-35 4 10)" fill="#FDE68A" stroke="#2C2825" strokeWidth="1.8" />
                    {/* Legs with batting pads */}
                    <rect x="9" y="32" width="5" height="12" rx="2.5" fill="#FFFFFF" stroke="#2C2825" strokeWidth="1.5" />
                    <rect x="16" y="32" width="5" height="12" rx="2.5" fill="#FFFFFF" stroke="#2C2825" strokeWidth="1.5" />
                  </g>
                </svg>
              </div>

              <h3 className="text-xl font-black mb-1">5-Year T20 Performance Math</h3>
              <p className="text-sm opacity-85 leading-snug">
                Every player analyzed through 5 years of IPL & T20 data including IPL 2026 strike rates, economy rates, and clutch ratings.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t-2 border-dashed border-[#2C2825] flex items-center justify-between text-base font-bold text-amber-900">
              <span>Preset Roster Size</span>
              <span>150, 200, or 300 Players 🏏</span>
            </div>
          </div>

          {/* 2. DOODLE DRAWING: THE UMPIRE SIX & OUT CALLS */}
          <div className="relative p-6 rounded-[2rem] bg-[#DCFCE7] border-2 border-[#2C2825] shadow-[4px_5px_0px_#2C2825] rotate-[1deg] hover:rotate-0 hover:scale-[1.01] transition-all flex flex-col justify-between">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-6 bg-pink-200/90 border-l-2 border-r-2 border-dashed border-[#2C2825] -rotate-1 shadow-xs" />

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl font-bold text-emerald-900">#02 Umpire Calls</span>
                <span className="text-xs font-black px-2 py-0.5 rounded-lg bg-emerald-200 border border-emerald-400">FAIR PLAY</span>
              </div>

              {/* Hand-Drawn Umpire SVG */}
              <div className="w-full h-32 my-2 flex items-center justify-center">
                <svg viewBox="0 0 160 80" className="w-full h-full drop-shadow-xs" fill="none">
                  {/* Left Umpire: Signaling SIX (Both hands raised) */}
                  <g transform="translate(30, 8)">
                    {/* White hat */}
                    <path d="M12 10 C 12 6, 28 6, 28 10 Z" fill="#FFFFFF" stroke="#2C2825" strokeWidth="1.8" />
                    <line x1="8" y1="10" x2="32" y2="10" stroke="#2C2825" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="20" cy="14" r="4.5" fill="#FED7AA" stroke="#2C2825" strokeWidth="1.5" />
                    {/* Coat */}
                    <rect x="13" y="19" width="14" height="22" rx="3" fill="#FFFFFF" stroke="#2C2825" strokeWidth="1.8" />
                    <line x1="20" y1="19" x2="20" y2="41" stroke="#2C2825" strokeWidth="1.2" />
                    {/* Two arms raised straight up */}
                    <line x1="14" y1="20" x2="8" y2="3" stroke="#2C2825" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="26" y1="20" x2="32" y2="3" stroke="#2C2825" strokeWidth="2.5" strokeLinecap="round" />
                    {/* Legs */}
                    <line x1="16" y1="41" x2="15" y2="58" stroke="#1E293B" strokeWidth="2.5" />
                    <line x1="24" y1="41" x2="25" y2="58" stroke="#1E293B" strokeWidth="2.5" />
                    {/* Celebration stars */}
                    <text x="36" y="16" fontSize="14" fontWeight="900" fontFamily="Caveat, cursive" fill="#E11D48">SIX! 🔥</text>
                  </g>

                  {/* Right Umpire: Signaling OUT (Index finger raised) */}
                  <g transform="translate(100, 8)">
                    <path d="M12 10 C 12 6, 28 6, 28 10 Z" fill="#FFFFFF" stroke="#2C2825" strokeWidth="1.8" />
                    <line x1="8" y1="10" x2="32" y2="10" stroke="#2C2825" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="20" cy="14" r="4.5" fill="#FED7AA" stroke="#2C2825" strokeWidth="1.5" />
                    <rect x="13" y="19" width="14" height="22" rx="3" fill="#FFFFFF" stroke="#2C2825" strokeWidth="1.8" />
                    <line x1="20" y1="19" x2="20" y2="41" stroke="#2C2825" strokeWidth="1.2" />
                    {/* Right arm pointing up with index finger */}
                    <path d="M26 22 L 32 10 L 32 3" stroke="#2C2825" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    {/* Left arm down */}
                    <line x1="14" y1="22" x2="10" y2="34" stroke="#2C2825" strokeWidth="2" strokeLinecap="round" />
                    <line x1="16" y1="41" x2="15" y2="58" stroke="#1E293B" strokeWidth="2.5" />
                    <line x1="24" y1="41" x2="25" y2="58" stroke="#1E293B" strokeWidth="2.5" />
                    <text x="-12" y="18" fontSize="13" fontWeight="900" fontFamily="Caveat, cursive" fill="#DC2626">OUT! ☝️</text>
                  </g>
                </svg>
              </div>

              <h3 className="text-xl font-black mb-1">Strict Unsold Skipping Protection</h3>
              <p className="text-sm opacity-85 leading-snug">
                When a player is skipped after the 5s blitz countdown, exactly one player moves to unsold. The next star remains queued accurately.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t-2 border-dashed border-[#2C2825] flex items-center justify-between text-base font-bold text-emerald-900">
              <span>Fair Play Server</span>
              <span>100% Guaranteed 🛡️</span>
            </div>
          </div>

          {/* 3. DOODLE DRAWING: THE AUCTION GAVEL & BIDDING PADDLES */}
          <div className="relative p-6 rounded-[2rem] bg-[#FCE7F3] border-2 border-[#2C2825] shadow-[4px_5px_0px_#2C2825] rotate-[-1deg] hover:rotate-0 hover:scale-[1.01] transition-all flex flex-col justify-between">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-6 bg-pink-300 border-l-2 border-r-2 border-dashed border-[#2C2825] rotate-1 shadow-xs" />

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl font-bold text-rose-900">#03 Official Gavel & Paddle</span>
                <span className="text-xs font-black px-2 py-0.5 rounded-lg bg-rose-200 border border-rose-400">RAISE OR JUMP</span>
              </div>

              {/* Hand-Drawn Gavel & Paddle SVG */}
              <div className="w-full h-32 my-2 flex items-center justify-center">
                <svg viewBox="0 0 160 80" className="w-full h-full drop-shadow-xs" fill="none">
                  {/* Sound block */}
                  <path d="M15 58 C 30 55, 60 55, 75 58 L 73 68 C 55 71, 35 71, 17 68 Z" fill="#FED7AA" stroke="#2C2825" strokeWidth="2" strokeLinejoin="round" />
                  
                  {/* Slamming Hammer */}
                  <g transform="rotate(-30 45 40)">
                    <rect x="42" y="10" width="5" height="45" rx="2.5" fill="#FDE68A" stroke="#2C2825" strokeWidth="2" />
                    <rect x="26" y="14" width="36" height="14" rx="3.5" fill="#FECDD3" stroke="#2C2825" strokeWidth="2" />
                    <circle cx="44.5" cy="21" r="3" fill="#E11D48" />
                  </g>

                  {/* Impact action burst */}
                  <path d="M52 48 L58 42 M58 54 L68 50 M48 58 L54 65" stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round" />
                  <text x="64" y="40" fontSize="16" fontWeight="900" fontFamily="Caveat, cursive" fill="#E11D48">SOLD! 🔨</text>

                  {/* Bidding Paddle (Right) */}
                  <g transform="translate(112, 10)">
                    <rect x="14" y="32" width="4" height="32" rx="2" fill="#FDE68A" stroke="#2C2825" strokeWidth="2" />
                    <circle cx="16" cy="20" r="18" fill="#FEF08A" stroke="#2C2825" strokeWidth="2.2" />
                    <circle cx="16" cy="20" r="14" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 3" />
                    <text x="16" y="17" textAnchor="middle" fontSize="11" fontWeight="900" fontFamily="Caveat, cursive" fill="#854D0E">BID</text>
                    <text x="16" y="27" textAnchor="middle" fontSize="12" fontWeight="900" fontFamily="system-ui" fill="#854D0E">+25L</text>
                  </g>
                </svg>
              </div>

              <h3 className="text-xl font-black mb-1">Official Baddiing Increments</h3>
              <p className="text-sm opacity-85 leading-snug">
                Under ₹2 Cr raises by official +10 Lakhs. Over ₹2 Cr raises by +25 Lakhs. Plus a direct Jump Bid blank to quote ₹10 Cr instantly.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t-2 border-dashed border-[#2C2825] flex items-center justify-between text-base font-bold text-rose-900">
              <span>BCCI Paddle Math</span>
              <span>Anti-Self-Bid Lock 🔒</span>
            </div>
          </div>

          {/* 4. DOODLE DRAWING: THE 10 FRANCHISE WAR ROOM TABLES */}
          <div className="relative p-6 rounded-[2rem] bg-[#F3E8FF] border-2 border-[#2C2825] shadow-[4px_5px_0px_#2C2825] rotate-[1deg] hover:rotate-0 hover:scale-[1.01] transition-all flex flex-col justify-between">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-6 bg-pink-200/90 border-l-2 border-r-2 border-dashed border-[#2C2825] -rotate-1 shadow-xs" />

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl font-bold text-purple-900">#04 10 Franchise Tables</span>
                <span className="text-xs font-black px-2 py-0.5 rounded-lg bg-purple-200 border border-purple-400">1-CLICK SEAT</span>
              </div>

              {/* Hand-Drawn War Room Table with Manager Avatars */}
              <div className="w-full h-32 my-2 flex items-center justify-center">
                <svg viewBox="0 0 160 80" className="w-full h-full drop-shadow-xs" fill="none">
                  {/* Big oval conference table */}
                  <ellipse cx="80" cy="48" rx="60" ry="24" fill="#DDD6FE" stroke="#2C2825" strokeWidth="2.5" />
                  <ellipse cx="80" cy="48" rx="52" ry="18" stroke="#9333EA" strokeWidth="1.2" strokeDasharray="3 3" />
                  
                  {/* Center War Room Strategy Screen */}
                  <rect x="68" y="40" width="24" height="16" rx="3" fill="#FFFFFF" stroke="#2C2825" strokeWidth="1.5" />
                  <text x="80" y="52" textAnchor="middle" fontSize="10" fontWeight="900" fontFamily="Caveat, cursive" fill="#7E22CE">₹120 Cr</text>

                  {/* Manager Avatars around table */}
                  {/* Manager 1 */}
                  <circle cx="40" cy="26" r="6" fill="#FDBA74" stroke="#2C2825" strokeWidth="1.8" />
                  <path d="M30 40 C 30 32, 50 32, 50 40 Z" fill="#FDE047" stroke="#2C2825" strokeWidth="1.8" />
                  <text x="40" y="20" textAnchor="middle" fontSize="10" fontFamily="Caveat, cursive" fill="#2C2825">CSK</text>

                  {/* Manager 2 (Top) */}
                  <circle cx="80" cy="18" r="6" fill="#BAE6FD" stroke="#2C2825" strokeWidth="1.8" />
                  <path d="M70 32 C 70 24, 90 24, 90 32 Z" fill="#60A5FA" stroke="#2C2825" strokeWidth="1.8" />
                  <text x="80" y="11" textAnchor="middle" fontSize="10" fontFamily="Caveat, cursive" fill="#2C2825">MI</text>

                  {/* Manager 3 */}
                  <circle cx="120" cy="26" r="6" fill="#FECDD3" stroke="#2C2825" strokeWidth="1.8" />
                  <path d="M110 40 C 110 32, 130 32, 130 40 Z" fill="#F43F5E" stroke="#2C2825" strokeWidth="1.8" />
                  <text x="120" y="20" textAnchor="middle" fontSize="10" fontFamily="Caveat, cursive" fill="#2C2825">RCB</text>
                </svg>
              </div>

              <h3 className="text-xl font-black mb-1">Pick Your War Room Table</h3>
              <p className="text-sm opacity-85 leading-snug">
                Replaced confusing "Claim Team" with "SELECT TABLE SEAT 🏏" and a clear "VACATE TABLE SEAT ⇄" button. Direct 1-click table re-seating.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t-2 border-dashed border-[#2C2825] flex items-center justify-between text-base font-bold text-purple-900">
              <span>Franchise Seats</span>
              <span>10 Teams Ready 🏆</span>
            </div>
          </div>

          {/* 5. DOODLE DRAWING: THE CHAMPIONSHIP TROPHY & CELEBRATIONS */}
          <div className="relative p-6 rounded-[2rem] bg-[#E0F2FE] border-2 border-[#2C2825] shadow-[4px_5px_0px_#2C2825] rotate-[-1deg] hover:rotate-0 hover:scale-[1.01] transition-all flex flex-col justify-between">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-6 bg-pink-200/90 border-l-2 border-r-2 border-dashed border-[#2C2825] rotate-1 shadow-xs" />

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl font-bold text-sky-900">#05 Trophy & Dossier</span>
                <span className="text-xs font-black px-2 py-0.5 rounded-lg bg-sky-200 border border-sky-400">CHAMPIONSHIP</span>
              </div>

              {/* Hand-Drawn Trophy with Confetti & Sparkles */}
              <div className="w-full h-32 my-2 flex items-center justify-center">
                <svg viewBox="0 0 160 80" className="w-full h-full drop-shadow-xs" fill="none">
                  {/* Confetti doodles */}
                  <path d="M30 20 L35 25 M32 40 L38 35 M125 22 L120 28 M130 45 L124 40" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="25" cy="30" r="2" fill="#FACC15" />
                  <circle cx="135" cy="32" r="2" fill="#38BDF8" />
                  <circle cx="45" cy="15" r="1.5" fill="#10B981" />

                  {/* Trophy Cup */}
                  <g transform="translate(56, 10)">
                    <path d="M12 8 C 12 28, 22 38, 24 38 C 26 38, 36 28, 36 8 Z" fill="#FDE047" stroke="#2C2825" strokeWidth="2.2" strokeLinejoin="round" />
                    {/* Handles */}
                    <path d="M12 14 C 2 14, 2 26, 14 26" stroke="#2C2825" strokeWidth="2" strokeLinecap="round" fill="none" />
                    <path d="M36 14 C 46 14, 46 26, 34 26" stroke="#2C2825" strokeWidth="2" strokeLinecap="round" fill="none" />
                    {/* Base */}
                    <path d="M21 38 L21 48 L27 48 L27 38" fill="#FACC15" stroke="#2C2825" strokeWidth="2" />
                    <rect x="12" y="48" width="24" height="12" rx="3" fill="#9333EA" stroke="#2C2825" strokeWidth="2" />
                    {/* Trophy Star */}
                    <polygon points="24,14 25.5,18 30,18 26.5,21 28,25 24,22.5 20,25 21.5,21 18,18 22.5,18" fill="#FFFFFF" stroke="#2C2825" strokeWidth="1" />
                    <text x="24" y="58" textAnchor="middle" fontSize="9" fontWeight="900" fontFamily="Caveat, cursive" fill="#FFFFFF">IPL 2026</text>
                  </g>
                </svg>
              </div>

              <h3 className="text-xl font-black mb-1">Squad Analytics & Final Report</h3>
              <p className="text-sm opacity-85 leading-snug">
                Instant post-auction dossier detailing remaining purse balances, squad role composition, overseas quota limits, and franchise depth.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t-2 border-dashed border-[#2C2825] flex items-center justify-between text-base font-bold text-sky-900">
              <span>Full Squad Dossier</span>
              <span>Persistent URL 📊</span>
            </div>
          </div>

          {/* 6. DOODLE DRAWING: THE CRICKET GEAR & STRATEGY BOARD */}
          <div className="relative p-6 rounded-[2rem] bg-[#FFF0F5] border-2 border-[#2C2825] shadow-[4px_5px_0px_#2C2825] rotate-[1deg] hover:rotate-0 hover:scale-[1.01] transition-all flex flex-col justify-between">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-6 bg-pink-300 border-l-2 border-r-2 border-dashed border-[#2C2825] -rotate-1 shadow-xs" />

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl font-bold text-pink-900">#06 Strategy Whiteboard</span>
                <span className="text-xs font-black px-2 py-0.5 rounded-lg bg-pink-200 border border-pink-400">TACTICS</span>
              </div>

              {/* Hand-Drawn Strategy Whiteboard SVG */}
              <div className="w-full h-32 my-2 flex items-center justify-center">
                <svg viewBox="0 0 160 80" className="w-full h-full drop-shadow-xs" fill="none">
                  {/* Whiteboard with frame */}
                  <rect x="20" y="8" width="120" height="62" rx="6" fill="#FFFFFF" stroke="#2C2825" strokeWidth="2.5" />
                  
                  {/* Strategy board markings */}
                  <text x="80" y="24" textAnchor="middle" fontSize="13" fontWeight="900" fontFamily="Caveat, cursive" fill="#E11D48">PLAN A: KOHLI + HEAD</text>
                  
                  {/* Tactical field sketches */}
                  <circle cx="45" cy="44" r="6" fill="#FEF08A" stroke="#2C2825" strokeWidth="1.5" />
                  <text x="45" y="48" textAnchor="middle" fontSize="10" fontFamily="Caveat, cursive" fill="#2C2825">BAT</text>

                  {/* Curved tactic arrow */}
                  <path d="M55 44 C 70 38, 90 40, 100 48" stroke="#2563EB" strokeWidth="2" strokeDasharray="3 3" markerEnd="url(#arrow)" />
                  
                  <circle cx="110" cy="50" r="6" fill="#FDA4AF" stroke="#2C2825" strokeWidth="1.5" />
                  <text x="110" y="54" textAnchor="middle" fontSize="10" fontFamily="Caveat, cursive" fill="#2C2825">BOWL</text>

                  {/* Checkmarks */}
                  <path d="M126 20 L130 24 L138 16" stroke="#10B981" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M126 34 L130 38 L138 30" stroke="#10B981" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </div>

              <h3 className="text-xl font-black mb-1">Real-Time Queue Management</h3>
              <p className="text-sm opacity-85 leading-snug">
                Hosts can re-order player lots on the fly, fast-track marquee sets, or nominate any of the 622 players directly into the live bidding floor.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t-2 border-dashed border-[#2C2825] flex items-center justify-between text-base font-bold text-pink-900">
              <span>Lot Reordering</span>
              <span>Instant Nomination 🎯</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
