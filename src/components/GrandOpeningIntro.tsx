'use client';

import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { X, ArrowRight, Sparkles, Flame, Trophy } from 'lucide-react';

interface GrandOpeningIntroProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

const FRANCHISES = [
  { code: 'CSK', name: 'Chennai Super Kings' },
  { code: 'MI', name: 'Mumbai Indians' },
  { code: 'KKR', name: 'Kolkata Knight Riders' },
  { code: 'SRH', name: 'Sunrisers Hyderabad' },
  { code: 'RR', name: 'Rajasthan Royals' },
  { code: 'GT', name: 'Gujarat Titans' },
  { code: 'RCB', name: 'Royal Challengers Bengaluru' },
  { code: 'DC', name: 'Delhi Capitals' },
  { code: 'PBKS', name: 'Punjab Kings' },
  { code: 'LSG', name: 'Lucknow Super Giants' },
];

export default function GrandOpeningIntro({
  onComplete,
  forceShow = false,
}: GrandOpeningIntroProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [phase, setPhase] = useState<'storm' | 'trophy' | 'pyro' | 'complete'>('storm');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (forceShow) {
      setIsOpen(true);
      return;
    }
    const seen = sessionStorage.getItem('seen_grand_opening_intro');
    if (!seen) {
      setIsOpen(true);
      sessionStorage.setItem('seen_grand_opening_intro', 'true');
    }
  }, [forceShow]);

  // Choreographed Phase Progression
  useEffect(() => {
    if (!isOpen) return;

    setPhase('storm');

    // 0.8s: Massive Trophy rises through the golden sandstorm
    const t1 = setTimeout(() => {
      setPhase('trophy');
    }, 800);

    // 1.8s: Fire & Crackers Pyro Eruption
    const t2 = setTimeout(() => {
      setPhase('pyro');
      launchGrandFireworks();
    }, 1800);

    // 3.0s: Full Reveal & Enter CTA Ready
    const t3 = setTimeout(() => {
      setPhase('complete');
    }, 3000);

    // 7.0s: Auto-advance if untouched
    const t4 = setTimeout(() => {
      handleClose();
    }, 7000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isOpen]);

  // Combined Canvas: Swirling Desert Sandstorm + Rising Fire Embers
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // 1. Sand Particles (260 grains sweeping horizontally with wind turbulence)
    const sandColors = ['#F59E0B', '#FBBF24', '#D97706', '#FEF3C7', '#B45309'];
    const sandParticles = Array.from({ length: 260 }, () => ({
      x: Math.random() * (width + 200) - 100,
      y: Math.random() * height,
      size: Math.random() * 3 + 1,
      speedX: Math.random() * 14 + 8,
      speedY: (Math.random() - 0.48) * 3,
      color: sandColors[Math.floor(Math.random() * sandColors.length)],
      alpha: Math.random() * 0.75 + 0.25,
      wobble: Math.random() * Math.PI * 2,
    }));

    // 2. Rising Fire Pyro Embers (120 fiery sparks rising upwards)
    const emberColors = ['#FF4500', '#FF8C00', '#FFA500', '#FFD700', '#FFF5EE'];
    const pyroEmbers = Array.from({ length: 120 }, () => ({
      x: Math.random() * width,
      y: height + Math.random() * 100,
      size: Math.random() * 3 + 1.2,
      speedY: -(Math.random() * 5 + 3.5),
      speedX: (Math.random() - 0.5) * 3,
      color: emberColors[Math.floor(Math.random() * emberColors.length)],
      alpha: Math.random() * 0.9 + 0.1,
      life: Math.random() * 80 + 40,
      maxLife: 100,
    }));

    const startTime = Date.now();

    const loop = () => {
      ctx.clearRect(0, 0, width, height);
      const elapsed = (Date.now() - startTime) / 1000;

      // Sand fades out after 2.5s as storm settles
      const sandFade = Math.max(0, 1 - (elapsed - 1.2) / 2.2);

      if (sandFade > 0.01) {
        sandParticles.forEach((p) => {
          p.wobble += 0.06;
          p.x += p.speedX;
          p.y += p.speedY + Math.sin(p.wobble) * 1.8;

          if (p.x > width + 80) {
            p.x = -60;
            p.y = Math.random() * height;
          }

          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha * sandFade;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // Pyro fire sparks kick in around 1.2s and rise dramatically
      if (elapsed > 1.0) {
        pyroEmbers.forEach((e) => {
          e.x += e.speedX;
          e.y += e.speedY;
          e.life -= 0.6;

          if (e.life <= 0 || e.y < -20) {
            e.x = Math.random() * width;
            e.y = height + 10;
            e.life = e.maxLife;
            e.speedY = -(Math.random() * 6 + 3.5);
          }

          const emberAlpha = (e.life / e.maxLife) * 0.9;
          ctx.fillStyle = e.color;
          ctx.globalAlpha = emberAlpha;
          ctx.beginPath();
          ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
          ctx.fill();

          // Spark glow halo
          ctx.globalAlpha = emberAlpha * 0.3;
          ctx.beginPath();
          ctx.arc(e.x, e.y, e.size * 2.5, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', onResize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isOpen]);

  // Grand Fireworks / Crackers Sequence
  const launchGrandFireworks = () => {
    try {
      // 1. Double Corner Cannon Fire
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 65,
        origin: { x: 0.05, y: 0.8 },
        colors: ['#FF4500', '#F59E0B', '#FFD700', '#FFFFFF', '#DC2626'],
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 65,
        origin: { x: 0.95, y: 0.8 },
        colors: ['#0284C7', '#9333EA', '#10B981', '#F59E0B', '#FFFFFF'],
      });

      // 2. Center Stage High Aerial Shells
      setTimeout(() => {
        confetti({
          particleCount: 130,
          spread: 110,
          origin: { x: 0.5, y: 0.35 },
          colors: ['#FACC15', '#EA580C', '#DC2626', '#E11D48', '#FFEDD5', '#38BDF8'],
        });
      }, 350);

      // 3. Golden Confetti Shower Falling Across Trophy
      setTimeout(() => {
        confetti({
          particleCount: 90,
          spread: 120,
          startVelocity: 45,
          origin: { x: 0.5, y: 0.2 },
          colors: ['#FDE047', '#EAB308', '#CA8A04', '#FFFFFF'],
        });
      }, 700);
    } catch {
      // Graceful fallback
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onComplete) onComplete();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between overflow-y-auto overflow-x-hidden bg-[#0A0704] text-white py-6 px-4 select-none">
      
      {/* Background Interactive Canvas (Sandstorm + Pyro Embers) */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      />

      {/* Atmospheric Stadium Spotlight Beams */}
      <div className="fixed inset-0 pointer-events-none opacity-40 z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-amber-500/35 via-orange-600/15 to-transparent blur-3xl animate-pulse" />
        <div className="absolute -top-32 left-10 w-96 h-[900px] bg-gradient-to-b from-amber-400/25 to-transparent rotate-[25deg] blur-2xl animate-pulse" />
        <div className="absolute -top-32 right-10 w-96 h-[900px] bg-gradient-to-b from-orange-500/25 to-transparent -rotate-[25deg] blur-2xl animate-pulse" />
      </div>

      {/* TOP BAR: BADGE & SKIP BUTTON (NO OVERLAP) */}
      <div className="relative z-40 w-full max-w-5xl mx-auto flex items-center justify-between mb-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/35 text-xs font-black tracking-widest uppercase backdrop-blur-md">
          <Flame className="w-3.5 h-3.5 text-orange-400" />
          <span>TATA IPL 2026 AUCTION BROADCAST</span>
        </div>

        <button
          type="button"
          onClick={handleClose}
          className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-xs font-bold tracking-wider uppercase text-white/90 hover:text-white backdrop-blur-md transition-all flex items-center gap-1.5 cursor-pointer shadow-lg"
        >
          <span>Skip</span>
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* CENTERPIECE: HUGE, GLORIOUS TATA IPL TROPHY CUP */}
      <div className="relative z-30 flex-1 flex flex-col items-center justify-center my-auto w-full max-w-4xl text-center">
        
        {/* HUGE TROPHY CONTAINER */}
        <div
          className={`transition-all duration-1000 transform ${
            phase === 'storm'
              ? 'opacity-0 scale-75 translate-y-16 blur-md'
              : 'opacity-100 scale-100 translate-y-0 blur-0'
          }`}
        >
          {/* Sizing: HUGE (Up to 480px tall) */}
          <div className="relative w-64 h-80 sm:w-80 sm:h-[390px] md:w-96 md:h-[460px] mx-auto filter drop-shadow-[0_25px_50px_rgba(245,158,11,0.5)]">
            
            <svg
              viewBox="0 0 240 280"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Radiant 24K Gold Shaders */}
                <linearGradient id="gGoldLight" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFDF0" />
                  <stop offset="20%" stopColor="#FEF08A" />
                  <stop offset="50%" stopColor="#EAB308" />
                  <stop offset="80%" stopColor="#CA8A04" />
                  <stop offset="100%" stopColor="#854D0E" />
                </linearGradient>

                <linearGradient id="gGoldDark" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#EAB308" />
                  <stop offset="45%" stopColor="#CA8A04" />
                  <stop offset="85%" stopColor="#713F12" />
                  <stop offset="100%" stopColor="#451A03" />
                </linearGradient>

                <linearGradient id="gDarkPlinth" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1C1917" />
                  <stop offset="25%" stopColor="#44403C" />
                  <stop offset="50%" stopColor="#292524" />
                  <stop offset="75%" stopColor="#44403C" />
                  <stop offset="100%" stopColor="#0C0A09" />
                </linearGradient>

                <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Sparkle Glints */}
              <g className="animate-pulse">
                <circle cx="120" cy="42" r="3" fill="#FFFFFF" />
                <line x1="120" y1="34" x2="120" y2="50" stroke="#FFFFFF" strokeWidth="1.5" />
                <line x1="112" y1="42" x2="128" y2="42" stroke="#FFFFFF" strokeWidth="1.5" />
                <circle cx="56" cy="74" r="2.5" fill="#FFFFFF" />
                <circle cx="184" cy="74" r="2.5" fill="#FFFFFF" />
              </g>

              {/* Left Sculpted Lion Handle */}
              <path
                d="M74 62 C 26 62, 22 124, 78 132 L 80 118 C 42 112, 44 76, 76 76 Z"
                fill="url(#gGoldLight)"
                stroke="#713F12"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              {/* Right Sculpted Lion Handle */}
              <path
                d="M166 62 C 214 62, 218 124, 162 132 L 160 118 C 198 112, 196 76, 164 76 Z"
                fill="url(#gGoldLight)"
                stroke="#713F12"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              {/* Main Golden Chalice Bowl */}
              <path
                d="M70 54 C 70 140, 96 172, 120 172 C 144 172, 170 140, 170 54 Z"
                fill="url(#gGoldLight)"
                stroke="#713F12"
                strokeWidth="3"
              />

              {/* Polished Rim Oval */}
              <ellipse cx="120" cy="54" rx="50" ry="11" fill="url(#gGoldLight)" stroke="#713F12" strokeWidth="2.5" />
              <ellipse cx="120" cy="54" rx="45" ry="8" fill="#713F12" />

              {/* Center Heraldic Medallion / Sunburst */}
              <circle cx="120" cy="98" r="18" fill="url(#gGoldDark)" stroke="#FEF08A" strokeWidth="2" filter="url(#goldGlow)" />
              <polygon
                points="120,85 124,93 133,93 126,99 129,108 120,103 111,108 114,99 107,93 116,93"
                fill="#FFFDF0"
                stroke="#854D0E"
                strokeWidth="0.8"
              />

              {/* Chalice Fluted Stem */}
              <path d="M110 172 L 105 208 L 135 208 L 130 172 Z" fill="url(#gGoldDark)" stroke="#713F12" strokeWidth="2.5" />
              <ellipse cx="120" cy="208" rx="24" ry="5" fill="url(#gGoldLight)" stroke="#713F12" strokeWidth="1.5" />

              {/* Pedestal Tier 1 */}
              <rect x="85" y="213" width="70" height="14" rx="3" fill="url(#gGoldLight)" stroke="#713F12" strokeWidth="2" />

              {/* Pedestal Tier 2: Dark Obsidian Plinth with Gold Engraving */}
              <rect x="60" y="227" width="120" height="38" rx="5" fill="url(#gDarkPlinth)" stroke="#EAB308" strokeWidth="2.2" />

              {/* Championship Gold Ribbon Plaque on Base */}
              <rect x="66" y="232" width="108" height="28" rx="3" fill="url(#gGoldLight)" stroke="#713F12" strokeWidth="1.2" />
              <text
                x="120"
                y="245"
                textAnchor="middle"
                fontSize="9"
                fontWeight="900"
                fontFamily="system-ui, sans-serif"
                fill="#451A03"
                letterSpacing="1.8"
              >
                TATA IPL TROPHY
              </text>
              <text
                x="120"
                y="255"
                textAnchor="middle"
                fontSize="7"
                fontWeight="900"
                fontFamily="system-ui, sans-serif"
                fill="#1C1917"
                letterSpacing="1.2"
              >
                10 FRANCHISE WAR ROOMS
              </text>

              {/* Solid Heavy Plinth Base */}
              <rect x="50" y="265" width="140" height="10" rx="3" fill="url(#gDarkPlinth)" stroke="#78716C" strokeWidth="1.2" />
            </svg>

          </div>
        </div>

        {/* 10 FRANCHISE NAMES ENGRAVED ON THE CUP BASE (CLEANLY SPACED, ZERO OVERLAP) */}
        <div
          className={`mt-4 sm:mt-6 w-full transition-all duration-700 delay-150 ${
            phase === 'storm'
              ? 'opacity-0 translate-y-6'
              : 'opacity-100 translate-y-0'
          }`}
        >
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap max-w-2xl mx-auto px-2">
            {FRANCHISES.map((f) => (
              <span
                key={f.code}
                className="text-[10px] sm:text-xs font-mono font-black px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/40 tracking-wider shadow-xs"
                title={f.name}
              >
                {f.code}
              </span>
            ))}
          </div>
        </div>

        {/* HEADLINE WITH DISTINCT DOODLE UNDERLINE (NO OVERLAPPING TEXT) */}
        <div
          className={`mt-6 sm:mt-8 transition-all duration-700 delay-300 ${
            phase === 'storm'
              ? 'opacity-0 translate-y-6'
              : 'opacity-100 translate-y-0'
          }`}
        >
          <div className="relative inline-block pb-3">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-none">
              IPL Auction Arena
            </h1>

            {/* Glowing Hand-Drawn Wavy Doodle Underline (Well Spaced Below) */}
            <svg
              className="w-full h-4 absolute bottom-0 left-0 pointer-events-none"
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
          </div>

          <p className="mt-3 text-xs sm:text-sm md:text-base text-neutral-300 max-w-lg mx-auto font-medium leading-relaxed">
            Live multiplayer franchise bidding war. ₹120 Crore purses, official BCCI increment slabs, and real-time war room tables.
          </p>
        </div>

        {/* ENTER WAR ROOM BUTTON */}
        <div
          className={`mt-6 sm:mt-8 transition-all duration-500 ${
            phase === 'complete'
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
          }`}
        >
          <button
            type="button"
            onClick={handleClose}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-neutral-950 font-black text-sm sm:text-base tracking-wide shadow-[0_12px_36px_rgba(234,88,12,0.6)] hover:shadow-[0_16px_48px_rgba(234,88,12,0.8)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 mx-auto cursor-pointer"
          >
            <span>ENTER WAR ROOM 🏏</span>
            <ArrowRight className="w-5 h-5 text-neutral-950" />
          </button>
        </div>

      </div>

      {/* BOTTOM PADDING SPACER */}
      <div className="relative z-40 text-[11px] font-mono text-neutral-500 tracking-wider">
        <span>BCCI OFFICIAL SQUAD RULES • ZERO SELF-BIDDING • ANTI-SNIPE GUARD</span>
      </div>
    </div>
  );
}
