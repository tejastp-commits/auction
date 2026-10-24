'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IPL_FRANCHISES } from '@/data/franchises';
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
  Award,
  ArrowRight,
  Flame,
  Radio,
  Sparkles,
  Trophy,
  CheckCircle2,
  ChevronRight,
  Sliders,
  Share2,
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();

  // Create Room state
  const [hostName, setHostName] = useState('');
  const [startingPurseCr, setStartingPurseCr] = useState<number>(120);
  const [isCustomPurse, setIsCustomPurse] = useState<boolean>(false);
  const [customPurseInput, setCustomPurseInput] = useState<string>('150');

  const [timerSeconds, setTimerSeconds] = useState<number>(20);
  const [isCustomTimer, setIsCustomTimer] = useState<boolean>(false);
  const [customTimerInput, setCustomTimerInput] = useState<string>('10');

  const [poolSize, setPoolSize] = useState<number>(200);
  const [isCustomPool, setIsCustomPool] = useState<boolean>(false);
  const [customPoolInput, setCustomPoolInput] = useState<string>('150');

  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState('');

  // Join Room state
  const [joinCode, setJoinCode] = useState('');
  const [joinName, setJoinName] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [joinError, setJoinError] = useState('');

  // Active tab in hero console
  const [activeTab, setActiveTab] = useState<'create' | 'join'>('create');

  // Interactive Live War Room Preview Demo State
  const [demoBidCr, setDemoBidCr] = useState<number>(21.5);
  const [demoLeader, setDemoLeader] = useState<string>('CSK');
  const [demoTimer, setDemoTimer] = useState<number>(8);
  const [demoHistory, setDemoHistory] = useState<Array<{ team: string; amount: number; time: string }>>([
    { team: 'CSK', amount: 21.5, time: 'Just now' },
    { team: 'RCB', amount: 21.0, time: '4s ago' },
    { team: 'MI', amount: 20.5, time: '8s ago' },
  ]);

  // Simulated countdown for the interactive card
  useEffect(() => {
    const interval = setInterval(() => {
      setDemoTimer((prev) => {
        if (prev <= 1) return 12; // reset
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDemoBid = (teamName: string, increment: number) => {
    const nextBid = +(demoBidCr + increment).toFixed(2);
    setDemoBidCr(nextBid);
    setDemoLeader(teamName);
    setDemoTimer(10);
    setDemoHistory((prev) => [
      { team: teamName, amount: nextBid, time: 'Just now' },
      ...prev.slice(0, 2),
    ]);
  };

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError('');

    const finalPurse = isCustomPurse
      ? parseFloat(customPurseInput)
      : startingPurseCr;
    if (isNaN(finalPurse) || finalPurse < 20) {
      setCreateError('Starting purse must be at least ₹20 Crore.');
      return;
    }

    const finalTimer = isCustomTimer
      ? parseInt(customTimerInput, 10)
      : timerSeconds;
    if (isNaN(finalTimer) || finalTimer < 5) {
      setCreateError('Bid timer must be at least 5 seconds.');
      return;
    }

    const finalPool = isCustomPool
      ? parseInt(customPoolInput, 10)
      : poolSize;
    if (isNaN(finalPool) || finalPool < 10) {
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
            startingPurse: Math.round(finalPurse * CRORE),
            bidTimerSeconds: finalTimer,
            auctionPoolSize: finalPool,
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
      setJoinError('Please enter a 6-character room code');
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
    <div className="flex-1 flex flex-col justify-between overflow-hidden">
      {/* ========================================================
          HERO SECTION: BROADCAST DUAL-COLUMN COMMAND DECK
          ======================================================== */}
      <section className="relative pt-10 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient Stadium Spotlights */}
        <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[600px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            
            {/* LEFT COLUMN: TITLE & LAUNCH CONSOLE */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Broadcast Status Pills */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wide shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>2025 BCCI AUCTION ENGINE</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-slate-300 text-xs font-medium">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Multiplayer War Rooms</span>
                </div>
              </div>

              {/* Main Headline */}
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
                  Outbid Rivals.{' '}
                  <span className="block gold-gradient-text">
                    Build The Champions.
                  </span>
                </h1>
                <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                  Take the franchise owner’s seat for CSK, MI, or RCB. Command synchronized bidding wars with official BCCI player stats, customizable starting purses, and instant AI-powered squad evaluations.
                </p>
              </div>

              {/* THE LAUNCH CONSOLE CARD */}
              <div className="premium-glass-card rounded-2xl p-6 sm:p-7 shadow-2xl relative border border-white/[0.08]">
                {/* Console Mode Switcher */}
                <div className="flex rounded-xl bg-slate-950/80 p-1.5 mb-6 border border-slate-800 shadow-inner">
                  <button
                    type="button"
                    onClick={() => setActiveTab('create')}
                    className={`flex-1 py-2.5 text-xs sm:text-sm font-black rounded-lg transition-all flex items-center justify-center gap-2 ${
                      activeTab === 'create'
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Gavel className="w-4 h-4" />
                    <span>Create Auction Arena</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('join')}
                    className={`flex-1 py-2.5 text-xs sm:text-sm font-black rounded-lg transition-all flex items-center justify-center gap-2 ${
                      activeTab === 'join'
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <span>Join with Room Code</span>
                  </button>
                </div>

                {activeTab === 'create' ? (
                  <form onSubmit={handleCreateRoom} className="space-y-5">
                    {createError && (
                      <div className="p-3 text-xs rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-medium flex items-center gap-2">
                        <span>⚠️</span>
                        <span>{createError}</span>
                      </div>
                    )}

                    {/* Host Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Auctioneer / Host Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Richard Madley / Host"
                        value={hostName}
                        onChange={(e) => setHostName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all font-medium"
                      />
                    </div>

                    {/* SETTING 1: BID CLOCK STARTING POINT */}
                    <div className="bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
                          <Clock className="w-4 h-4 text-amber-400" />
                          <span>Bid Timer Starting Point</span>
                        </div>
                        <span className="text-xs font-mono font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          {isCustomTimer ? `${customTimerInput || 0}s` : `${timerSeconds}s`}
                        </span>
                      </div>

                      <div className="grid grid-cols-6 gap-1.5">
                        {[5, 10, 15, 20, 30].map((sec) => (
                          <button
                            key={sec}
                            type="button"
                            onClick={() => {
                              setTimerSeconds(sec);
                              setIsCustomTimer(false);
                            }}
                            className={`py-1.5 text-xs font-black rounded-lg border transition-all ${
                              !isCustomTimer && timerSeconds === sec
                                ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md shadow-amber-400/20'
                                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                            }`}
                          >
                            {sec}s
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => setIsCustomTimer(true)}
                          className={`py-1.5 text-xs font-black rounded-lg border transition-all ${
                            isCustomTimer
                              ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md shadow-amber-400/20'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                          }`}
                        >
                          Custom
                        </button>
                      </div>

                      {isCustomTimer && (
                        <div className="relative pt-1">
                          <input
                            type="number"
                            min={5}
                            max={120}
                            value={customTimerInput}
                            onChange={(e) => setCustomTimerInput(e.target.value)}
                            placeholder="Enter seconds (e.g. 5, 10, 30)"
                            className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-amber-400/60 text-white text-xs focus:outline-none focus:ring-1 focus:ring-amber-400 font-mono"
                          />
                          <span className="absolute right-3 top-3 text-[11px] text-slate-400 font-medium pointer-events-none">
                            seconds (min 5s)
                          </span>
                        </div>
                      )}
                    </div>

                    {/* SETTING 2: STARTING PURSE */}
                    <div className="bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
                          <Coins className="w-4 h-4 text-amber-400" />
                          <span>Franchise Starting Purse</span>
                        </div>
                        <span className="text-xs font-mono font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          ₹{isCustomPurse ? customPurseInput : startingPurseCr} Cr
                        </span>
                      </div>

                      <div className="grid grid-cols-5 gap-1.5">
                        {[100, 120, 150, 200].map((cr) => (
                          <button
                            key={cr}
                            type="button"
                            onClick={() => {
                              setStartingPurseCr(cr);
                              setIsCustomPurse(false);
                            }}
                            className={`py-1.5 text-xs font-black rounded-lg border transition-all ${
                              !isCustomPurse && startingPurseCr === cr
                                ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md shadow-amber-400/20'
                                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                            }`}
                          >
                            ₹{cr}Cr
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => setIsCustomPurse(true)}
                          className={`py-1.5 text-xs font-black rounded-lg border transition-all ${
                            isCustomPurse
                              ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md shadow-amber-400/20'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                          }`}
                        >
                          Custom
                        </button>
                      </div>

                      {isCustomPurse && (
                        <div className="relative pt-1">
                          <input
                            type="number"
                            min={20}
                            max={500}
                            value={customPurseInput}
                            onChange={(e) => setCustomPurseInput(e.target.value)}
                            placeholder="Enter Crores (e.g. 150 or 200)"
                            className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-amber-400/60 text-white text-xs focus:outline-none focus:ring-1 focus:ring-amber-400 font-mono"
                          />
                          <span className="absolute right-3 top-3 text-[11px] text-slate-400 font-medium pointer-events-none">
                            Crores (₹ Cr)
                          </span>
                        </div>
                      )}
                    </div>

                    {/* SETTING 3: AUCTION POOL SIZE */}
                    <div className="bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
                          <Users className="w-4 h-4 text-amber-400" />
                          <span>Auction Size (Player Catalog)</span>
                        </div>
                        <span className="text-xs font-mono font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          {isCustomPool
                            ? `${customPoolInput || 0} Players`
                            : `${poolSize} Players`}
                        </span>
                      </div>

                      <div className="grid grid-cols-5 gap-1.5">
                        {[50, 100, 150, 200].map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => {
                              setPoolSize(size);
                              setIsCustomPool(false);
                            }}
                            className={`py-1.5 text-xs font-black rounded-lg border transition-all ${
                              !isCustomPool && poolSize === size
                                ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md shadow-amber-400/20'
                                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => setIsCustomPool(true)}
                          className={`py-1.5 text-xs font-black rounded-lg border transition-all ${
                            isCustomPool
                              ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md shadow-amber-400/20'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                          }`}
                        >
                          Custom
                        </button>
                      </div>

                      {isCustomPool && (
                        <div className="relative pt-1">
                          <input
                            type="number"
                            min={10}
                            max={622}
                            value={customPoolInput}
                            onChange={(e) => setCustomPoolInput(e.target.value)}
                            placeholder="Enter 10 to 622 players"
                            className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-amber-400/60 text-white text-xs focus:outline-none focus:ring-1 focus:ring-amber-400 font-mono"
                          />
                          <span className="absolute right-3 top-3 text-[11px] text-slate-400 font-medium pointer-events-none">
                            players (10 - 622)
                          </span>
                        </div>
                      )}
                    </div>

                    {/* SUBMIT BUTTON */}
                    <button
                      type="submit"
                      disabled={isCreating}
                      className="w-full py-4 px-6 rounded-xl font-black text-slate-950 gold-shimmer-btn transition-all text-sm tracking-wider uppercase flex items-center justify-center gap-2.5 disabled:opacity-50 mt-4 cursor-pointer"
                    >
                      <Gavel className="w-5 h-5 stroke-[2.5]" />
                      <span>{isCreating ? 'INITIALIZING ARENA...' : 'LAUNCH AUCTION ARENA'}</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleJoinRoom} className="space-y-5">
                    {joinError && (
                      <div className="p-3 text-xs rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-medium">
                        {joinError}
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        6-Digit Room Code
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        placeholder="e.g. K97M2P"
                        value={joinCode}
                        onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white uppercase tracking-widest font-mono text-center font-black text-xl focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 shadow-inner"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Your Owner / Manager Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. CaptainCool99"
                        value={joinName}
                        onChange={(e) => setJoinName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                      />
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-400 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Instant Roster & Purse Synchronization</span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Entering will allow you to pick any available franchise and bid live alongside other players.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isJoining}
                      className="w-full py-4 px-6 rounded-xl font-black text-slate-950 gold-shimmer-btn transition-all text-sm tracking-wider uppercase flex items-center justify-center gap-2 disabled:opacity-50 mt-4 cursor-pointer"
                    >
                      <span>{isJoining ? 'CONNECTING TO WAR ROOM...' : 'ENTER AUCTION WAR ROOM'}</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: INTERACTIVE LIVE WAR ROOM PREVIEW */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative">
                {/* Glow behind the war room card */}
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-75" />

                {/* THE LIVE WAR ROOM CARD */}
                <div className="relative premium-glass-card rounded-2xl p-5 sm:p-6 border border-white/10 shadow-2xl">
                  {/* Card Broadcast Header */}
                  <div className="flex items-center justify-between pb-3.5 border-b border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                      </span>
                      <span className="text-xs font-black uppercase tracking-wider text-white">
                        LIVE WAR ROOM #1
                      </span>
                      <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                        LOT 1 • M1
                      </span>
                    </div>

                    {/* COUNTDOWN TIMER BADGE */}
                    <div className="flex items-center gap-1.5 bg-red-950/80 border border-red-500/40 px-2.5 py-1 rounded-lg">
                      <Clock className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                      <span className="font-mono font-black text-xs text-red-400">
                        00:0{demoTimer}s
                      </span>
                    </div>
                  </div>

                  {/* ACTIVE PLAYER BLOCK */}
                  <div className="py-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm">🇮🇳</span>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                            Wicketkeeper-Batter
                          </span>
                        </div>
                        <h3 className="text-2xl font-black text-white tracking-tight">
                          Rishabh Pant
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Marquee Set 1 • Base Price ₹2.00 Cr
                        </p>
                      </div>

                      {/* Marquee Badge */}
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500/20 to-yellow-500/10 border border-amber-400/30 flex flex-col items-center justify-center text-center">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span className="text-[9px] font-black text-amber-300 uppercase">SET 1</span>
                      </div>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-4 gap-2 mt-4 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-center font-mono text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 block">IPL RUNS</span>
                        <span className="font-bold text-white">3,284</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">STRIKE RATE</span>
                        <span className="font-bold text-amber-400">148.9</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">MATCHES</span>
                        <span className="font-bold text-white">111</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">50s / 100s</span>
                        <span className="font-bold text-white">18 / 1</span>
                      </div>
                    </div>
                  </div>

                  {/* CURRENT BID HIGHLIGHT DECK */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
                        Leading Franchise Bid
                      </span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                        <CheckCircle2 className="w-3 h-3" /> Live Bidding
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between">
                      <div className="text-3xl font-black text-amber-400 font-mono tracking-tight">
                        ₹{demoBidCr.toFixed(2)} <span className="text-base font-normal text-amber-200">Cr</span>
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-700">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        <span className="font-black text-xs text-white">{demoLeader}</span>
                        <span className="text-[10px] text-slate-400">Lead</span>
                      </div>
                    </div>
                  </div>

                  {/* LIVE BID TICKER */}
                  <div className="mt-3.5 space-y-1.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block px-1">
                      Recent Bidding Exchanges
                    </span>
                    <div className="space-y-1 text-xs font-mono">
                      {demoHistory.map((h, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 text-slate-300"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-black text-amber-400 text-xs">{h.team}</span>
                            <span className="text-[11px] text-slate-400">bid</span>
                            <span className="font-bold text-white">₹{h.amount.toFixed(2)} Cr</span>
                          </div>
                          <span className="text-[10px] text-slate-500">{h.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* INTERACTIVE DEMO CTA */}
                  <div className="mt-4 pt-3.5 border-t border-slate-800 flex items-center justify-between gap-2">
                    <div className="text-[11px] text-slate-400">
                      Try live bidding simulation:
                    </div>
                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleDemoBid('RCB', 0.5)}
                        className="px-2.5 py-1 text-xs font-bold rounded-lg bg-red-600/20 text-red-300 border border-red-500/30 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
                      >
                        +₹0.5 Cr (RCB)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDemoBid('CSK', 0.5)}
                        className="px-2.5 py-1 text-xs font-bold rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500 hover:text-slate-950 transition-all cursor-pointer"
                      >
                        +₹0.5 Cr (CSK)
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* CREDIBILITY STATS STRIP */}
              <div className="grid grid-cols-3 gap-3">
                <div className="premium-glass-card p-3 rounded-xl border border-white/[0.05] text-center">
                  <div className="text-xl font-black text-amber-400 font-mono">622</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Official Players
                  </div>
                </div>
                <div className="premium-glass-card p-3 rounded-xl border border-white/[0.05] text-center">
                  <div className="text-xl font-black text-emerald-400 font-mono">&lt; 1s</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Sync Latency
                  </div>
                </div>
                <div className="premium-glass-card p-3 rounded-xl border border-white/[0.05] text-center">
                  <div className="text-xl font-black text-blue-400 font-mono">10</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    IPL Franchises
                  </div>
                </div>
              </div>

              {/* VIEW SAMPLE DOSSIER LINK */}
              <Link
                href="/reports/sample-mega-auction-2024"
                className="w-full p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-400/50 flex items-center justify-between text-xs text-slate-300 hover:text-white transition-all group"
              >
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold">Explore 100-Point AI Squad Dossier</span>
                </div>
                <span className="text-amber-400 group-hover:translate-x-1 transition-transform">
                  View Sample →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          FRANCHISE WAR ROOM PAVILION (10 TEAMS)
          ======================================================== */}
      <section className="border-y border-white/[0.08] bg-slate-950/60 py-12 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-widest mb-1.5">
                <Trophy className="w-4 h-4" />
                <span>The 10 Official Franchises</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Claim Your Seat At The War Room Table
              </h2>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              Each franchise features authentic team branding, historical championship records, and dedicated purse management.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {IPL_FRANCHISES.map((team) => (
              <div
                key={team.id}
                className="group relative p-4 rounded-xl border border-slate-800/80 bg-slate-900/40 hover:bg-slate-900/80 transition-all duration-300 hover:border-amber-500/30 hover:shadow-xl hover:shadow-amber-500/5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-md transition-transform group-hover:scale-105"
                    style={{ backgroundColor: team.primaryColor, color: team.secondaryColor }}
                  >
                    {team.logo}
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold font-mono tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {team.shortName}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm font-black text-white truncate group-hover:text-amber-400 transition-colors">
                    {team.name}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{team.city}</span>
                    <span className="text-amber-400 font-semibold">
                      {team.titles > 0 ? `${team.titles}x Champion` : 'Contender'}
                    </span>
                  </div>
                </div>

                {/* Championship Star Badges */}
                <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center gap-1 text-amber-400">
                  {team.titles > 0 ? (
                    Array.from({ length: team.titles }).map((_, i) => (
                      <span key={i} className="text-xs leading-none">⭐</span>
                    ))
                  ) : (
                    <span className="text-[10px] text-slate-500">Chasing 1st Trophy</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          HOW IT WORKS (3-STEP BROADCAST WORKFLOW)
          ======================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">
            <Sliders className="w-4 h-4" />
            <span>Tactical Blueprint</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            How The IPL Auction Arena Works
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Engineered from the ground up to reproduce the exact pressure, rules, and mathematical rigor of an official BCCI mega-auction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* STEP 1 */}
          <div className="premium-glass-card p-6 sm:p-7 rounded-2xl border border-white/[0.08] relative group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-110 transition-transform">
              <Sliders className="w-6 h-6" />
            </div>
            <div className="text-amber-400 font-mono text-xs font-bold tracking-widest mb-1 uppercase">
              Step 01
            </div>
            <h3 className="text-lg font-black text-white mb-2">Configure & Host</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Define starting purse amounts (₹100Cr–₹200Cr), bid countdown clocks (5s–30s), and player pool size (50–622 players). Generate a room code and invite your friends in one click.
            </p>
          </div>

          {/* STEP 2 */}
          <div className="premium-glass-card p-6 sm:p-7 rounded-2xl border border-white/[0.08] relative group">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-5 group-hover:scale-110 transition-transform">
              <Gavel className="w-6 h-6" />
            </div>
            <div className="text-blue-400 font-mono text-xs font-bold tracking-widest mb-1 uppercase">
              Step 02
            </div>
            <h3 className="text-lg font-black text-white mb-2">Live Bidding Wars</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Every bid dynamically resets the countdown timer. Server-authoritative validation prevents race conditions, enforces overseas roster quotas, and manages dynamic purse depletion.
            </p>
          </div>

          {/* STEP 3 */}
          <div className="premium-glass-card p-6 sm:p-7 rounded-2xl border border-white/[0.08] relative group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div className="text-emerald-400 font-mono text-xs font-bold tracking-widest mb-1 uppercase">
              Step 03
            </div>
            <h3 className="text-lg font-black text-white mb-2">AI Squad Intelligence</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Immediately receive a permanent 100-point tactical intelligence dossier. Our algorithm grades batting depth, death bowling, spin reserves, and crowns the auction champion.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          THE COMPETITIVE EDGE / TECH SPECIFICATIONS
          ======================================================== */}
      <section className="border-t border-white/[0.08] bg-slate-950/40 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1.5">Server Authority</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Single-source-of-truth room states prevent phantom bids and race conditions between fast bidders.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1.5">Official 2025 Registry</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                622 authentic players with base prices, role categories, age, and historical IPL stats.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
                <Coins className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1.5">Strict Roster Math</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Overseas caps, 18-player minimum rosters, and remaining budget thresholds are strictly tracked in real time.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800">
              <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-3">
                <Share2 className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1.5">Shareable Reports</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every concluded auction generates a unique permanent URL to review squad ratings and brag to friends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          BOTTOM HERO CALL TO ACTION
          ======================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center mx-auto shadow-2xl shadow-amber-500/30 border border-amber-300/40">
            <Gavel className="w-8 h-8 text-slate-950 stroke-[2.5]" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Ready To Claim The Auction Gavel?
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Gather your cricket group, configure custom purse limits and bid timers, and discover who has the tactical masterclass to build the champion franchise.
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setActiveTab('create');
              }}
              className="py-4 px-8 rounded-xl font-black text-slate-950 gold-shimmer-btn transition-all text-sm tracking-wider uppercase inline-flex items-center gap-2 cursor-pointer"
            >
              <Gavel className="w-5 h-5 stroke-[2.5]" />
              <span>START FREE AUCTION ROOM</span>
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
