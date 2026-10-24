'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IPL_FRANCHISES } from '@/data/franchises';
import FranchiseLogo from '@/components/FranchiseLogo';
import AuctionArenaLogo from '@/components/AuctionArenaLogo';
import { POOL_PRESETS } from '@/data/curated-pools';
import { CRORE } from '@/lib/currency';
import Link from 'next/link';
import {
  Gavel,
  Clock,
  Coins,
  Users,
  ShieldCheck,
  Zap,
  BarChart3,
  ArrowRight,
  Minus,
  Plus,
  KeyRound,
  User,
  Sparkles,
  Trophy,
  Sliders,
  CheckCircle2,
  Flame,
  ChevronRight,
  Radio,
  Award,
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();

  // Create Room state
  const [hostName, setHostName] = useState('');
  const [startingPurseCr, setStartingPurseCr] = useState<number>(120);
  const [timerSeconds, setTimerSeconds] = useState<number>(15);
  const [poolSize, setPoolSize] = useState<number>(300);
  const [showCustomPool, setShowCustomPool] = useState<boolean>(false);

  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState('');

  // Join Room state
  const [joinCode, setJoinCode] = useState('');
  const [joinName, setJoinName] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [joinError, setJoinError] = useState('');

  // Active tab in hero console
  const [activeTab, setActiveTab] = useState<'create' | 'join'>('create');

  // Interactive Live War Room Preview State (Tactile Broadcast Demo)
  const [demoBidCr, setDemoBidCr] = useState<number>(21.5);
  const [demoLeader, setDemoLeader] = useState<string>('RCB');
  const [demoTimer, setDemoTimer] = useState<number>(8);
  const [hammerActive, setHammerActive] = useState<boolean>(false);
  const [demoHistory, setDemoHistory] = useState<Array<{ team: string; amount: number; time: string }>>([
    { team: 'RCB', amount: 21.5, time: 'Just now' },
    { team: 'CSK', amount: 21.0, time: '4s ago' },
    { team: 'MI', amount: 20.5, time: '8s ago' },
  ]);

  // Interactive Hover State for "Built for Serious Cricket Competition" Steps
  const [hoveredStep, setHoveredStep] = useState<number>(1);

  // Hovered Franchise Table State
  const [hoveredTeam, setHoveredTeam] = useState<string | null>(null);

  const handleDemoBid = (teamName: string, increment: number) => {
    const nextBid = +(demoBidCr + increment).toFixed(2);
    setDemoBidCr(nextBid);
    setDemoLeader(teamName);
    setDemoTimer(12);
    setHammerActive(true);
    setTimeout(() => setHammerActive(false), 600);
    setDemoHistory((prev) => [
      { team: teamName, amount: nextBid, time: 'Just now' },
      ...prev.slice(0, 2),
    ]);
  };

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError('');

    if (startingPurseCr < 20) {
      setCreateError('Starting purse must be at least ₹20 Crore.');
      return;
    }
    if (timerSeconds < 5) {
      setCreateError('Bid timer must be at least 5 seconds.');
      return;
    }
    if (poolSize < 10) {
      setCreateError('Auction pool must contain at least 10 players.');
      return;
    }

    setIsCreating(true);

    try {
      const res = await fetch('/api/auction/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hostDisplayName: hostName.trim() || 'Auctioneer',
          config: {
            startingPurse: Math.round(startingPurseCr * CRORE),
            bidTimerSeconds: timerSeconds,
            auctionPoolSize: poolSize,
            minSquadSize: 18,
            maxSquadSize: 25,
            maxOverseas: 8,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create room');

      localStorage.setItem(`auction_token_${data.roomCode}`, data.hostToken);
      localStorage.setItem(`auction_name_${data.roomCode}`, hostName.trim() || 'Auctioneer');

      router.push(`/room/${data.roomCode}`);
    } catch (err: any) {
      setCreateError(err.message || 'Error creating room');
    } finally {
      setIsCreating(false);
    }
  };

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setJoinError('');
    const code = joinCode.trim().toUpperCase();
    if (!code) {
      setJoinError('Please enter your 6-character room code');
      return;
    }

    setIsJoining(true);
    try {
      const res = await fetch(`/api/auction/${code}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Room not found');

      if (joinName.trim()) {
        localStorage.setItem(`auction_name_${code}`, joinName.trim());
      }

      router.push(`/room/${code}`);
    } catch (err: any) {
      setJoinError(err.message || 'Room does not exist');
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full transition-colors relative overflow-hidden">
      
      {/* BACKGROUND LUXURY AMBIENT GLOWS & STADIUM CURVED RINGS */}
      <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-[35%] right-[-100px] w-[450px] h-[450px] bg-blue-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* ========================================================
          HERO SECTION: DUAL-COLUMN BROADCAST COMMAND DECK
          ======================================================== */}
      <section className="relative mb-14 sm:mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT: TITLE & LAUNCH CONSOLE */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status Pills */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full theme-accent-badge text-xs font-bold tracking-wide shadow-sm border border-amber-500/20">
                <span className="w-2 h-2 rounded-full theme-btn-primary animate-ping" />
                <span>IPL 2026 WAR ROOM LIVE</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full theme-subtle-box text-xs font-semibold border theme-border">
                <Radio className="w-3.5 h-3.5 theme-accent-text animate-pulse" />
                <span>Official Increments: +10L / +25L</span>
              </div>
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.06]">
                Command the Table.{' '}
                <span className="block theme-accent-text">
                  IPL Auction Arena.
                </span>
              </h1>
              <p className="mt-3.5 text-base sm:text-lg opacity-80 leading-snug max-w-2xl font-medium">
                Live multiplayer franchise bidding war. ₹120 Cr purses, BCCI increment paddles, and 5-year curated player pools.
              </p>
            </div>

            {/* THE ARENA CONSOLE (Stadium Beveled Edge Shape) */}
            <div className="theme-card rounded-[2rem] rounded-tr-[4rem] p-6 sm:p-7 shadow-2xl relative border theme-border">
              {/* Tab Switcher */}
              <div className="flex rounded-xl theme-subtle-box p-1.5 mb-6 border theme-border">
                <button
                  type="button"
                  onClick={() => setActiveTab('create')}
                  className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'create'
                      ? 'theme-card font-black shadow-md'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  Create War Room
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('join')}
                  className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'join'
                      ? 'theme-card font-black shadow-md'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  Join with Code
                </button>
              </div>

              {activeTab === 'create' ? (
                <form onSubmit={handleCreateRoom} className="space-y-4.5">
                  {createError && (
                    <div className="p-3.5 text-xs rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 font-medium">
                      {createError}
                    </div>
                  )}

                  {/* Host Name */}
                  <div>
                    <label className="block text-xs font-bold mb-1.5 opacity-90">
                      Auctioneer / Host Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="e.g. Richard Madley"
                        value={hostName}
                        onChange={(e) => setHostName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl theme-subtle-box text-sm focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)] transition-all font-medium border theme-border"
                      />
                      <User className="w-4 h-4 opacity-40 absolute right-3.5 top-3 pointer-events-none" />
                    </div>
                  </div>

                  {/* SETTING 1: BID TIMER (COMPACT SLIDER + STEPPER) */}
                  <div className="theme-subtle-box p-3.5 rounded-2xl border theme-border space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold opacity-90">
                        <Clock className="w-4 h-4 theme-accent-text" />
                        <span>Bid Countdown Timer</span>
                      </div>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md theme-accent-badge">
                        {timerSeconds}s {timerSeconds <= 10 ? '⚡ Blitz' : '⏱️ Standard'}
                      </span>
                    </div>

                    <input
                      type="range"
                      min={5}
                      max={60}
                      step={1}
                      value={timerSeconds}
                      onChange={(e) => setTimerSeconds(parseInt(e.target.value, 10))}
                      aria-label="Bid timer in seconds"
                      className="w-full"
                    />

                    <div className="flex items-center justify-between text-[11px] opacity-60">
                      <span>5s</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setTimerSeconds((prev) => Math.max(5, prev - 5))}
                          className="px-2 py-0.5 rounded theme-card border theme-border font-bold hover:opacity-100"
                        >
                          -5s
                        </button>
                        <span className="font-mono font-bold text-xs">{timerSeconds} sec</span>
                        <button
                          type="button"
                          onClick={() => setTimerSeconds((prev) => Math.min(60, prev + 5))}
                          className="px-2 py-0.5 rounded theme-card border theme-border font-bold hover:opacity-100"
                        >
                          +5s
                        </button>
                      </div>
                      <span>60s</span>
                    </div>
                  </div>

                  {/* SETTING 2: STARTING PURSE */}
                  <div className="theme-subtle-box p-3.5 rounded-2xl border theme-border space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold opacity-90">
                        <Coins className="w-4 h-4 theme-accent-text" />
                        <span>Franchise Starting Purse</span>
                      </div>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md theme-accent-badge">
                        ₹{startingPurseCr} Crore
                      </span>
                    </div>

                    <input
                      type="range"
                      min={50}
                      max={250}
                      step={5}
                      value={startingPurseCr}
                      onChange={(e) => setStartingPurseCr(parseInt(e.target.value, 10))}
                      aria-label="Starting purse in Crores"
                      className="w-full"
                    />

                    <div className="flex items-center justify-between text-[11px] opacity-60">
                      <span>₹50 Cr</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setStartingPurseCr((prev) => Math.max(20, prev - 10))}
                          className="px-2 py-0.5 rounded theme-card border theme-border font-bold hover:opacity-100"
                        >
                          -10 Cr
                        </button>
                        <span className="font-mono font-bold text-xs">₹{startingPurseCr} Cr</span>
                        <button
                          type="button"
                          onClick={() => setStartingPurseCr((prev) => Math.min(250, prev + 10))}
                          className="px-2 py-0.5 rounded theme-card border theme-border font-bold hover:opacity-100"
                        >
                          +10 Cr
                        </button>
                      </div>
                      <span>₹250 Cr</span>
                    </div>
                  </div>

                  {/* SETTING 3: CURATED PLAYER POOL PRESET */}
                  <div className="theme-subtle-box p-3.5 rounded-2xl border theme-border space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold opacity-90">
                        <Users className="w-4 h-4 theme-accent-text" />
                        <span>Curated Pool Preset (Aligned with Teams)</span>
                      </div>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md theme-accent-badge">
                        {poolSize} Players
                      </span>
                    </div>

                    {/* 3 PRESET CARDS */}
                    <div className="grid grid-cols-3 gap-2">
                      {POOL_PRESETS.map((preset) => {
                        const isSelected = poolSize === preset.playerCount;
                        return (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => setPoolSize(preset.playerCount)}
                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                              isSelected
                                ? 'theme-card ring-2 ring-[var(--theme-accent)] shadow-md'
                                : 'theme-card border-transparent opacity-70 hover:opacity-100'
                            }`}
                          >
                            <span className="text-[10px] font-black uppercase tracking-wider theme-accent-text">
                              {preset.targetTeams}
                            </span>
                            <div className="text-xs font-extrabold my-0.5">
                              {preset.playerCount} Players
                            </div>
                            <span className="text-[9px] opacity-60 leading-tight truncate">
                              {preset.playerCount === 300 ? '10 Teams Max' : preset.playerCount === 200 ? '6-8 Teams' : '4-5 Teams'}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between pt-0.5 text-[11px] opacity-65">
                      <span>Curated by 5-yr IPL stats</span>
                      <button
                        type="button"
                        onClick={() => setShowCustomPool(!showCustomPool)}
                        className="underline hover:opacity-100 cursor-pointer font-medium"
                      >
                        {showCustomPool ? 'Hide Custom Pool' : 'Custom Pool?'}
                      </button>
                    </div>

                    {showCustomPool && (
                      <div className="pt-2 border-t theme-border space-y-1.5">
                        <input
                          type="range"
                          min={20}
                          max={622}
                          step={10}
                          value={poolSize}
                          onChange={(e) => setPoolSize(parseInt(e.target.value, 10))}
                          aria-label="Auction pool size"
                          className="w-full"
                        />
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span>20</span>
                          <span className="font-bold theme-accent-text">{poolSize} Players</span>
                          <span>622</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* LAUNCH BUTTON */}
                  <button
                    type="submit"
                    disabled={isCreating}
                    className="w-full py-3.5 px-6 rounded-xl font-bold theme-btn-primary shadow-xl hover:opacity-95 active:scale-[0.99] disabled:opacity-50 text-sm tracking-wide flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Gavel className="w-4 h-4" />
                    <span>{isCreating ? 'INITIALIZING WAR ROOM...' : 'LAUNCH AUCTION WAR ROOM 🔨'}</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleJoinRoom} className="space-y-4.5">
                  {joinError && (
                    <div className="p-3.5 text-xs rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 font-medium">
                      {joinError}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold mb-1.5 opacity-90">
                      6-Digit Room Code
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        maxLength={6}
                        placeholder="e.g. ABC123"
                        value={joinCode}
                        onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                        className="w-full px-4 py-3 rounded-xl theme-subtle-box uppercase tracking-widest font-mono text-center font-bold text-xl focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)] transition-all border theme-border"
                      />
                      <KeyRound className="w-4 h-4 opacity-40 absolute right-3.5 top-4 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1.5 opacity-90">
                      Your Manager Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="e.g. CaptainCool99"
                        value={joinName}
                        onChange={(e) => setJoinName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl theme-subtle-box text-sm focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)] transition-all font-medium border theme-border"
                      />
                      <User className="w-4 h-4 opacity-40 absolute right-3.5 top-3 pointer-events-none" />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl theme-accent-badge text-xs opacity-90 leading-tight">
                    ⚡ Pick any open IPL franchise table to start bidding live with other managers.
                  </div>

                  <button
                    type="submit"
                    disabled={isJoining}
                    className="w-full py-3.5 px-6 rounded-xl font-bold theme-btn-primary shadow-xl hover:opacity-95 active:scale-[0.99] disabled:opacity-50 text-sm tracking-wide flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <span>{isJoining ? 'JOINING ROOM...' : 'ENTER WAR ROOM TABLE →'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* RIGHT: BROADCAST TV WAR ROOM CONSOLE (ORGANIC STADIUM-WEDGE GEOMETRY) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="theme-card rounded-[2.5rem] rounded-bl-[4rem] p-5 sm:p-6 border theme-border shadow-2xl relative overflow-hidden backdrop-blur-xl">
              
              {/* Broadcast Top Ribbon */}
              <div className="flex items-center justify-between pb-3 border-b theme-border">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
                  </span>
                  <span className="text-[11px] font-black uppercase tracking-wider">
                    WAR ROOM LOT #1
                  </span>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-500 font-bold border border-amber-500/30">
                    M1 • MARQUEE
                  </span>
                </div>

                {/* COUNTDOWN TIMER BADGE */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-500 font-bold">
                  <Clock className="w-3.5 h-3.5 animate-pulse" />
                  <span className="font-mono font-black text-xs">
                    00:0{demoTimer}s
                  </span>
                </div>
              </div>

              {/* Active Player Card with Stadium Spotlight */}
              <div className="py-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-sm">🇮🇳</span>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider theme-accent-badge px-2 py-0.5 rounded-full">
                        Top-Order Batter
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2">
                      <span>Virat Kohli</span>
                    </h3>
                    <p className="text-xs opacity-70 mt-0.5 font-medium">
                      Marquee Set 1 • Base Price ₹2.00 Cr
                    </p>
                  </div>

                  <div className="w-12 h-12 rounded-2xl theme-subtle-box border theme-border flex flex-col items-center justify-center text-center shadow-md">
                    <Sparkles className="w-4 h-4 theme-accent-text" />
                    <span className="text-[9px] font-black uppercase tracking-tighter">ELITE</span>
                  </div>
                </div>

                {/* Quick stats capsules */}
                <div className="grid grid-cols-4 gap-1.5 mt-3.5 p-2 rounded-xl theme-subtle-box border theme-border text-center font-mono text-xs">
                  <div>
                    <span className="text-[9px] opacity-60 block font-sans">RUNS</span>
                    <span className="font-extrabold">8,004</span>
                  </div>
                  <div>
                    <span className="text-[9px] opacity-60 block font-sans">S/R</span>
                    <span className="font-extrabold theme-accent-text">131.97</span>
                  </div>
                  <div>
                    <span className="text-[9px] opacity-60 block font-sans">INNINGS</span>
                    <span className="font-extrabold">244</span>
                  </div>
                  <div>
                    <span className="text-[9px] opacity-60 block font-sans">TONS</span>
                    <span className="font-extrabold text-amber-500">8</span>
                  </div>
                </div>
              </div>

              {/* Current High Bid Box with Dynamic Bidding Duel */}
              <div className={`p-4 rounded-2xl theme-subtle-box border theme-border space-y-2 transition-all ${
                hammerActive ? 'ring-2 ring-amber-500 scale-[1.01]' : ''
              }`}>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold opacity-60 uppercase tracking-wider text-[10px]">
                    Current Hammer Strike
                  </span>
                  <span className="text-emerald-500 font-bold flex items-center gap-1 text-[11px]">
                    <Zap className="w-3 h-3 fill-emerald-500" /> Live War Room Duel
                  </span>
                </div>

                <div className="flex items-baseline justify-between">
                  <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight theme-accent-text">
                    ₹{demoBidCr.toFixed(2)} <span className="text-sm font-normal opacity-70 font-sans">Cr</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl theme-card border theme-border shadow-sm">
                    <FranchiseLogo franchiseId={demoLeader} size="xs" />
                    <span className="font-black text-xs">{demoLeader}</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-bold">
                      IN LEAD
                    </span>
                  </div>
                </div>
              </div>

              {/* Live Bid Ticker with Franchise Vector Logos */}
              <div className="mt-3 space-y-1.5">
                <span className="text-[9px] uppercase font-bold tracking-wider opacity-60 block px-1">
                  Live Floor Action
                </span>
                <div className="space-y-1 font-mono text-xs">
                  {demoHistory.map((h, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg theme-subtle-box border theme-border text-[11px]"
                    >
                      <div className="flex items-center gap-2">
                        <FranchiseLogo franchiseId={h.team} size="xs" />
                        <span className="font-bold">{h.team}</span>
                        <span className="opacity-50">raised to</span>
                        <span className="font-bold theme-accent-text">₹{h.amount.toFixed(2)} Cr</span>
                      </div>
                      <span className="text-[10px] opacity-50">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Demo Test Buttons (Tactile Feedback) */}
              <div className="mt-4 pt-3 border-t theme-border flex items-center justify-between gap-2">
                <div className="text-[11px] opacity-75 font-medium truncate">
                  Try Official Bidding:
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleDemoBid('RCB', 0.25)}
                    className="px-3 py-1.5 text-xs font-bold rounded-lg theme-btn-primary shadow hover:opacity-90 active:scale-95 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span>🔨</span>
                    <span>Paddle (+25L)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoBid('CSK', 2.0)}
                    className="px-3 py-1.5 text-xs font-bold rounded-lg theme-card border theme-border hover:opacity-100 active:scale-95 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span>⚡</span>
                    <span>Jump (+₹2 Cr)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar (Pill Capsules) */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="theme-card p-2.5 rounded-2xl border theme-border text-center">
                <div className="text-lg font-black font-mono theme-accent-text">622</div>
                <div className="text-[9px] font-bold opacity-60 uppercase tracking-wider">
                  BCCI Roster
                </div>
              </div>
              <div className="theme-card p-2.5 rounded-2xl border theme-border text-center">
                <div className="text-lg font-black font-mono text-emerald-500">&lt; 1s</div>
                <div className="text-[9px] font-bold opacity-60 uppercase tracking-wider">
                  Real-Time Sync
                </div>
              </div>
              <div className="theme-card p-2.5 rounded-2xl border theme-border text-center">
                <div className="text-lg font-black font-mono">₹120-250 Cr</div>
                <div className="text-[9px] font-bold opacity-60 uppercase tracking-wider">
                  Custom Purses
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          FRANCHISE WAR ROOM TABLE (10 REPLICATED TEAMS)
          ======================================================== */}
      <section className="mb-14 sm:mb-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold theme-accent-text uppercase tracking-widest mb-1">
              <Trophy className="w-3.5 h-3.5" />
              <span>Official 10 Franchises</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Claim Your Franchise War Room Table
            </h2>
          </div>
          <p className="text-xs opacity-70 max-w-sm">
            Authentic franchise emblems, starting purse tables, and championship pedigree.
          </p>
        </div>

        {/* 10 FRANCHISE PODIUM CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {IPL_FRANCHISES.map((team) => {
            const isHovered = hoveredTeam === team.id;
            return (
              <div
                key={team.id}
                onMouseEnter={() => setHoveredTeam(team.id)}
                onMouseLeave={() => setHoveredTeam(null)}
                className={`p-3.5 rounded-2xl border theme-border theme-card transition-all duration-300 cursor-default relative overflow-hidden group ${
                  isHovered ? 'scale-105 shadow-xl ring-2 ring-[var(--theme-accent)] z-10' : 'hover:scale-[1.02]'
                }`}
              >
                {/* Top: Emblem & Code */}
                <div className="flex items-center justify-between mb-2.5">
                  <div className="w-11 h-11 rounded-xl p-1 flex items-center justify-center shadow-md bg-slate-950/70 border theme-border transition-transform group-hover:scale-110">
                    <FranchiseLogo franchiseId={team.id} size="lg" />
                  </div>
                  <span className="text-[10px] font-black font-mono tracking-wider px-2 py-0.5 rounded-md theme-subtle-box border theme-border">
                    {team.shortName}
                  </span>
                </div>

                {/* Team Info */}
                <div className="space-y-0.5">
                  <div className="text-xs sm:text-sm font-black truncate">
                    {team.name}
                  </div>
                  <div className="flex items-center justify-between text-[11px] opacity-70">
                    <span>{team.city}</span>
                    <span className="font-bold text-[10px] theme-accent-text">
                      {team.titles > 0 ? `${team.titles}x Champion` : 'Contender'}
                    </span>
                  </div>
                </div>

                {/* Trophies & Purse */}
                <div className="mt-2 pt-2 border-t theme-border flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-xs">
                    {team.titles > 0 ? (
                      Array.from({ length: team.titles }).map((_, i) => (
                        <span key={i} className="text-[11px] leading-none">⭐</span>
                      ))
                    ) : (
                      <span className="text-[9px] opacity-40">Chasing #1</span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono font-bold opacity-60">
                    ₹120 Cr
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          BUILT FOR SERIOUS CRICKET COMPETITION (DYNAMIC BUBBLE ZOOM)
          ======================================================== */}
      <section className="mb-14 sm:mb-20">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold theme-accent-text uppercase tracking-widest mb-1">
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive War Room Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Built for Serious Cricket Competition
          </h2>
          <p className="mt-1 text-xs opacity-70">
            Hover over any step below to zoom into its tactical mechanics.
          </p>
        </div>

        {/* 3 INTERACTIVE EXPANDING BUBBLE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-stretch">
          
          {/* STEP 01 */}
          <div
            onMouseEnter={() => setHoveredStep(1)}
            className={`p-6 sm:p-7 rounded-[2.5rem] border theme-border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
              hoveredStep === 1
                ? 'theme-card scale-[1.05] sm:scale-[1.08] shadow-2xl ring-2 ring-[var(--theme-accent)] z-20'
                : 'theme-subtle-box opacity-75 hover:opacity-100 hover:scale-[1.02]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                  hoveredStep === 1 ? 'theme-btn-primary shadow-lg scale-110' : 'theme-accent-badge'
                }`}>
                  <Sliders className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-black tracking-widest px-2.5 py-1 rounded-full theme-accent-badge">
                  STEP 01
                </span>
              </div>

              <h3 className="text-lg font-black mb-2">
                5-Year Curated Sets
              </h3>

              {/* Punchy, Short Copy */}
              <div className="space-y-2 text-xs opacity-85">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full theme-btn-primary" />
                  <span className="font-bold">150, 200, or 300 player presets</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full theme-btn-primary" />
                  <span>29 official broadcast sets (Marquee to Uncapped)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full theme-btn-primary" />
                  <span>Aligned perfectly with 4 to 10 teams</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t theme-border flex items-center justify-between text-[11px] font-bold theme-accent-text">
              <span>Preset Roster Math</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* STEP 02 */}
          <div
            onMouseEnter={() => setHoveredStep(2)}
            className={`p-6 sm:p-7 rounded-[2.5rem] border theme-border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
              hoveredStep === 2
                ? 'theme-card scale-[1.05] sm:scale-[1.08] shadow-2xl ring-2 ring-[var(--theme-accent)] z-20'
                : 'theme-subtle-box opacity-75 hover:opacity-100 hover:scale-[1.02]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                  hoveredStep === 2 ? 'theme-btn-primary shadow-lg scale-110' : 'theme-accent-badge'
                }`}>
                  <Gavel className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-black tracking-widest px-2.5 py-1 rounded-full theme-accent-badge">
                  STEP 02
                </span>
              </div>

              <h3 className="text-lg font-black mb-2">
                Official Bidding Paddle
              </h3>

              {/* Punchy, Short Copy */}
              <div className="space-y-2 text-xs opacity-85">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full theme-btn-primary" />
                  <span className="font-bold">+₹10L under ₹2 Cr • +₹25L over ₹2 Cr</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full theme-btn-primary" />
                  <span>Direct numerical Jump Bids (e.g. ₹10 Cr)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full theme-btn-primary" />
                  <span>Strict anti-self-bidding server locks</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t theme-border flex items-center justify-between text-[11px] font-bold theme-accent-text">
              <span>BCCI Bidding Rules</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* STEP 03 */}
          <div
            onMouseEnter={() => setHoveredStep(3)}
            className={`p-6 sm:p-7 rounded-[2.5rem] border theme-border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
              hoveredStep === 3
                ? 'theme-card scale-[1.05] sm:scale-[1.08] shadow-2xl ring-2 ring-[var(--theme-accent)] z-20'
                : 'theme-subtle-box opacity-75 hover:opacity-100 hover:scale-[1.02]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                  hoveredStep === 3 ? 'theme-btn-primary shadow-lg scale-110' : 'theme-accent-badge'
                }`}>
                  <BarChart3 className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-black tracking-widest px-2.5 py-1 rounded-full theme-accent-badge">
                  STEP 03
                </span>
              </div>

              <h3 className="text-lg font-black mb-2">
                Live Gavel & Dossier
              </h3>

              {/* Punchy, Short Copy */}
              <div className="space-y-2 text-xs opacity-85">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full theme-btn-primary" />
                  <span className="font-bold">Automated hammer strikes & anti-snipe</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full theme-btn-primary" />
                  <span>8-Overseas limit & purse validation</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full theme-btn-primary" />
                  <span>Shareable post-auction team report URL</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t theme-border flex items-center justify-between text-[11px] font-bold theme-accent-text">
              <span>Squad Analytics</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          TACTICAL SPECS (SHORT PUNCHY BADGES & INVARIANTS)
          ======================================================== */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl theme-subtle-box border theme-border space-y-1">
          <div className="w-7 h-7 rounded-lg theme-accent-badge flex items-center justify-center mb-1">
            <ShieldCheck className="w-3.5 h-3.5 theme-accent-text" />
          </div>
          <h4 className="text-xs font-black">Server Authority</h4>
          <p className="text-[10px] opacity-60">Zero desync or race condition double-sales.</p>
        </div>

        <div className="p-3.5 rounded-2xl theme-subtle-box border theme-border space-y-1">
          <div className="w-7 h-7 rounded-lg theme-accent-badge flex items-center justify-center mb-1">
            <Users className="w-3.5 h-3.5 theme-accent-text" />
          </div>
          <h4 className="text-xs font-black">622 BCCI Database</h4>
          <p className="text-[10px] opacity-60">Verified registration list & career statistics.</p>
        </div>

        <div className="p-3.5 rounded-2xl theme-subtle-box border theme-border space-y-1">
          <div className="w-7 h-7 rounded-lg theme-accent-badge flex items-center justify-center mb-1">
            <Coins className="w-3.5 h-3.5 theme-accent-text" />
          </div>
          <h4 className="text-xs font-black">₹120–250 Cr Purses</h4>
          <p className="text-[10px] opacity-60">Automatic 18-min squad and 8-overseas locks.</p>
        </div>

        <div className="p-3.5 rounded-2xl theme-subtle-box border theme-border space-y-1">
          <div className="w-7 h-7 rounded-lg theme-accent-badge flex items-center justify-center mb-1">
            <BarChart3 className="w-3.5 h-3.5 theme-accent-text" />
          </div>
          <h4 className="text-xs font-black">Permanent Dossiers</h4>
          <p className="text-[10px] opacity-60">Instant shareable championship team grades.</p>
        </div>
      </section>

    </div>
  );
}
