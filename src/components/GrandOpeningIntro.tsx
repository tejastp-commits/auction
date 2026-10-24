'use client';

import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, X, ArrowRight, Flame } from 'lucide-react';

interface GrandOpeningIntroProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

const FRANCHISE_NAMES = [
  'CSK',
  'MI',
  'KKR',
  'SRH',
  'RR',
  'GT',
  'RCB',
  'DC',
  'PBKS',
  'LSG',
];

export default function GrandOpeningIntro({
  onComplete,
  forceShow = false,
}: GrandOpeningIntroProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<'sand' | 'trophy' | 'fireworks' | 'ready'>('sand');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Check if intro should run
  useEffect(() => {
    if (forceShow) {
      setIsOpen(true);
      return;
    }
    const hasSeen = sessionStorage.getItem('seen_grand_opening_intro');
    if (!hasSeen) {
      setIsOpen(true);
      sessionStorage.setItem('seen_grand_opening_intro', 'true');
    }
  }, [forceShow]);

  // Phase Progression
  useEffect(() => {
    if (!isOpen) return;

    // Phase 1: Sand storm starts immediately
    setAnimationPhase('sand');

    // Phase 2: Trophy emerges through the sand at 1.0s
    const t1 = setTimeout(() => {
      setAnimationPhase('trophy');
    }, 1000);

    // Phase 3: Fireworks explode at 2.0s
    const t2 = setTimeout(() => {
      setAnimationPhase('fireworks');
      triggerFireworks();
    }, 2000);

    // Phase 4: Ready with enter button at 3.2s
    const t3 = setTimeout(() => {
      setAnimationPhase('ready');
    }, 3200);

    // Auto-dismiss after 6s
    const t4 = setTimeout(() => {
      handleClose();
    }, 6200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isOpen]);

  // Sand Storm Canvas Animation
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 280 Golden Sand Particles
    const particleCount = 280;
    const sandColors = ['#F59E0B', '#D97706', '#FEF08A', '#FDE68A', '#B45309', '#FED7AA'];
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width - 100,
      y: Math.random() * height,
      size: Math.random() * 3.5 + 1,
      speedX: Math.random() * 12 + 6,
      speedY: (Math.random() - 0.45) * 4,
      color: sandColors[Math.floor(Math.random() * sandColors.length)],
      alpha: Math.random() * 0.8 + 0.2,
      wobble: Math.random() * Math.PI * 2,
    }));

    let startTime = Date.now();

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const elapsed = (Date.now() - startTime) / 1000;

      // Gradually reduce sand density after 2.5s
      const sandFade = Math.max(0, 1 - (elapsed - 1.8) / 2);

      if (sandFade > 0.01) {
        particles.forEach((p) => {
          p.wobble += 0.05;
          p.x += p.speedX;
          p.y += p.speedY + Math.sin(p.wobble) * 1.5;

          if (p.x > width + 50) {
            p.x = -50;
            p.y = Math.random() * height;
          }

          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha * sandFade;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isOpen]);

  // Fireworks / Crackers Sequence
  const triggerFireworks = () => {
    try {
      // Left side burst
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { x: 0.15, y: 0.75 },
        colors: ['#F59E0B', '#EA580C', '#E11D48', '#FACC15', '#FFFFFF'],
      });

      // Right side burst
      setTimeout(() => {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { x: 0.85, y: 0.75 },
          colors: ['#0284C7', '#9333EA', '#10B981', '#F59E0B', '#FFFFFF'],
        });
      }, 250);

      // Center skyburst
      setTimeout(() => {
        confetti({
          particleCount: 110,
          spread: 100,
          origin: { x: 0.5, y: 0.45 },
          colors: ['#FACC15', '#EA580C', '#DC2626', '#0284C7', '#9333EA'],
        });
      }, 550);
    } catch {
      // Fallback gracefully
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onComplete) onComplete();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#0F0C08] text-white">
      {/* Background Sandstorm Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10 w-full h-full"
      />

      {/* Atmospheric Gold Stadium Beams */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-radial from-amber-500/30 via-orange-500/10 to-transparent blur-3xl animate-pulse" />
        <div className="absolute -top-40 left-1/4 w-96 h-[800px] bg-gradient-to-b from-amber-400/20 to-transparent rotate-12 blur-2xl" />
        <div className="absolute -top-40 right-1/4 w-96 h-[800px] bg-gradient-to-b from-orange-400/20 to-transparent -rotate-12 blur-2xl" />
      </div>

      {/* Top Skip Button */}
      <button
        type="button"
        onClick={handleClose}
        className="absolute top-6 right-6 z-40 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold tracking-wider uppercase text-white/80 hover:text-white backdrop-blur-md transition-all flex items-center gap-1.5 cursor-pointer shadow-lg"
      >
        <span>Skip Intro</span>
        <X className="w-3.5 h-3.5" />
      </button>

      {/* CENTERPIECE: TROPHY CUP & ARENA TITLE */}
      <div className="relative z-30 max-w-xl mx-auto px-6 text-center flex flex-col items-center">
        
        {/* GRAND GOLDEN IPL TROPHY CUP */}
        <div
          className={`transition-all duration-1000 transform ${
            animationPhase === 'sand'
              ? 'opacity-0 scale-75 translate-y-12 blur-md'
              : 'opacity-100 scale-100 translate-y-0 blur-0'
          }`}
        >
          <div className="relative w-44 h-52 sm:w-52 sm:h-60 mx-auto filter drop-shadow-[0_20px_40px_rgba(245,158,11,0.45)]">
            
            {/* SVG Glorious Golden IPL Trophy */}
            <svg
              viewBox="0 0 200 240"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="cupGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFBEB" />
                  <stop offset="25%" stopColor="#FDE047" />
                  <stop offset="60%" stopColor="#EAB308" />
                  <stop offset="85%" stopColor="#CA8A04" />
                  <stop offset="100%" stopColor="#854D0E" />
                </linearGradient>

                <linearGradient id="cupDarkGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#EAB308" />
                  <stop offset="50%" stopColor="#CA8A04" />
                  <stop offset="100%" stopColor="#713F12" />
                </linearGradient>

                <linearGradient id="baseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1C1917" />
                  <stop offset="30%" stopColor="#44403C" />
                  <stop offset="50%" stopColor="#292524" />
                  <stop offset="100%" stopColor="#0C0A09" />
                </linearGradient>

                <linearGradient id="shineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="50%" stopColor="rgba(255,255,255,0.7)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>

              {/* Sparkle Glints */}
              <g className="animate-pulse">
                <circle cx="100" cy="40" r="3" fill="#FFFFFF" />
                <path d="M100 32 L100 48 M92 40 L108 40" stroke="#FFFFFF" strokeWidth="1.5" />
                <circle cx="48" cy="70" r="2" fill="#FFFFFF" />
                <circle cx="152" cy="70" r="2" fill="#FFFFFF" />
              </g>

              {/* Left Trophy Handle */}
              <path
                d="M62 55 C 24 55, 20 105, 66 112 L 68 100 C 36 94, 38 66, 64 66 Z"
                fill="url(#cupGold)"
                stroke="#854D0E"
                strokeWidth="2"
              />

              {/* Right Trophy Handle */}
              <path
                d="M138 55 C 176 55, 180 105, 134 112 L 132 100 C 164 94, 162 66, 136 66 Z"
                fill="url(#cupGold)"
                stroke="#854D0E"
                strokeWidth="2"
              />

              {/* Main Cup Chalice Bowl */}
              <path
                d="M58 48 C 58 120, 80 148, 100 148 C 120 148, 142 120, 142 48 Z"
                fill="url(#cupGold)"
                stroke="#854D0E"
                strokeWidth="2.5"
              />

              {/* Cup Rim Top Oval */}
              <ellipse cx="100" cy="48" rx="42" ry="9" fill="url(#cupGold)" stroke="#854D0E" strokeWidth="2" />
              <ellipse cx="100" cy="48" rx="38" ry="7" fill="#713F12" />

              {/* Cup Center Crest / Map of India Silhouette */}
              <circle cx="100" cy="85" r="14" fill="url(#cupDarkGold)" stroke="#FEF08A" strokeWidth="1.5" />
              <polygon points="100,75 103,82 110,82 105,86 107,93 100,89 93,93 95,86 90,82 97,82" fill="#FFFFFF" />

              {/* Chalice Stem Column */}
              <path d="M92 148 L 88 178 L 112 178 L 108 148 Z" fill="url(#cupDarkGold)" stroke="#854D0E" strokeWidth="2" />
              <ellipse cx="100" cy="178" rx="20" ry="4" fill="url(#cupGold)" />

              {/* Trophy Base Pedestal Step 1 */}
              <rect x="70" y="182" width="60" height="12" rx="3" fill="url(#cupGold)" stroke="#854D0E" strokeWidth="1.5" />

              {/* Main Dark Pedestal Step 2 with Team Name Engravings */}
              <rect x="52" y="194" width="96" height="34" rx="4" fill="url(#baseGrad)" stroke="#EAB308" strokeWidth="1.8" />
              
              {/* Gold Plaque on Base */}
              <rect x="56" y="198" width="88" height="26" rx="2" fill="url(#cupGold)" stroke="#854D0E" strokeWidth="1" />
              <text
                x="100"
                y="209"
                textAnchor="middle"
                fontSize="7.5"
                fontWeight="900"
                fontFamily="system-ui, sans-serif"
                fill="#713F12"
                letterSpacing="1.2"
              >
                TATA IPL TROPHY
              </text>
              <text
                x="100"
                y="219"
                textAnchor="middle"
                fontSize="6"
                fontWeight="900"
                fontFamily="system-ui, sans-serif"
                fill="#0C0A09"
                letterSpacing="0.8"
              >
                10 WAR ROOM FRANCHISES
              </text>

              {/* Bottom Pedestal Plinth */}
              <rect x="44" y="228" width="112" height="8" rx="2" fill="url(#baseGrad)" stroke="#78716C" strokeWidth="1" />
            </svg>

            {/* TEAM NAMES ENGRAVED ON THE BASE RIBBON (REQUESTED BY USER) */}
            <div className="mt-1 w-full flex items-center justify-center gap-1.5 flex-wrap px-1">
              {FRANCHISE_NAMES.map((team) => (
                <span
                  key={team}
                  className="text-[9px] sm:text-[10px] font-mono font-black px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40 tracking-wider shadow-xs"
                >
                  {team}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* TITLE & GLOWING DOODLE UNDERLINE */}
        <div
          className={`mt-4 transition-all duration-700 delay-300 ${
            animationPhase === 'sand'
              ? 'opacity-0 translate-y-6'
              : 'opacity-100 translate-y-0'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-400/40 mb-3 shadow-lg">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>LIVE 2026 AUCTION BROADCAST</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white relative inline-block">
            <span>IPL Auction Arena</span>
            
            {/* Hand-Drawn Wavy Doodle Underline */}
            <svg
              className="w-full h-3.5 absolute -bottom-2.5 left-0"
              viewBox="0 0 160 16"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M2 9 Q 40 16, 80 8 T 158 9"
                stroke="#F59E0B"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M8 12 Q 48 18, 88 11 T 152 12"
                stroke="#EA580C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="5 3"
              />
              <circle cx="158" cy="9" r="2.5" fill="#FACC15" />
            </svg>
          </h1>

          <p className="mt-4 text-xs sm:text-sm text-neutral-300 max-w-md mx-auto leading-relaxed font-medium">
            Step into the high-stakes ₹120 Crore war room table. Bid with friends, claim your franchise, and conquer the auction block.
          </p>
        </div>

        {/* ENTER WAR ROOM BUTTON & CELEBRATION CTA */}
        <div
          className={`mt-6 transition-all duration-500 ${
            animationPhase === 'ready'
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
          }`}
        >
          <button
            type="button"
            onClick={handleClose}
            className="px-7 py-3 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-neutral-950 font-black text-sm sm:text-base tracking-wide shadow-[0_10px_30px_rgba(234,88,12,0.5)] hover:shadow-[0_14px_40px_rgba(234,88,12,0.7)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 mx-auto cursor-pointer"
          >
            <span>ENTER WAR ROOM</span>
            <ArrowRight className="w-4 h-4 text-neutral-950" />
          </button>
        </div>

      </div>
    </div>
  );
}
