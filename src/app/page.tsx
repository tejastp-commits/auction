'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IPL_FRANCHISES } from '@/data/franchises';
import { CRORE } from '@/lib/currency';
import Link from 'next/link';

export default function LandingPage() {
  const router = useRouter();

  // Create Room state
  const [hostName, setHostName] = useState('');
  const [startingPurseCr, setStartingPurseCr] = useState(120);
  const [timerSeconds, setTimerSeconds] = useState(20);
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState('');

  // Join Room state
  const [joinCode, setJoinCode] = useState('');
  const [joinName, setJoinName] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [joinError, setJoinError] = useState('');

  // Tab switch
  const [activeTab, setActiveTab] = useState<'create' | 'join'>('create');

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError('');
    setIsCreating(true);

    try {
      const res = await fetch('/api/auction/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hostDisplayName: hostName.trim() || 'Auctioneer',
          config: {
            startingPurse: startingPurseCr * CRORE,
            bidTimerSeconds: timerSeconds,
            minSquadSize: 18,
            maxSquadSize: 25,
            maxOverseas: 8,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create room');

      // Save host token into localStorage
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
      // First verify room exists
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
    <div className="flex-1 flex flex-col justify-between">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-slate-950 to-slate-950 pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold shadow-sm">
              <span>⚡ Real-Time Multiplayer IPL Auction</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            </div>
            <Link
              href="/reports/sample-mega-auction-2024"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700 hover:border-amber-400 text-slate-300 hover:text-white text-xs font-semibold transition-all shadow-sm"
            >
              <span>📊 View Sample Report →</span>
            </Link>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
            Build Your Ultimate IPL Squad with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
              Live Multiplayer Bidding
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Create a private auction room, invite your friends, take the helm of iconic franchises like CSK, MI, or RCB, and battle across live timer-backed bidding wars with authentic IPL player statistics.
          </p>

          {/* ACTION CONSOLE */}
          <div className="mt-10 max-w-lg mx-auto ipl-card rounded-2xl p-6 shadow-2xl relative">
            <div className="flex rounded-xl bg-slate-900/80 p-1 mb-6 border border-slate-800">
              <button
                type="button"
                onClick={() => setActiveTab('create')}
                className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                  activeTab === 'create'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Create Room
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('join')}
                className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                  activeTab === 'join'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Join with Code
              </button>
            </div>

            {activeTab === 'create' ? (
              <form onSubmit={handleCreateRoom} className="space-y-4 text-left">
                {createError && (
                  <div className="p-3 text-xs rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 font-medium">
                    {createError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Your Display Name / Auctioneer
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Richard Madley"
                    value={hostName}
                    onChange={(e) => setHostName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Starting Purse (₹ Cr)
                    </label>
                    <select
                      value={startingPurseCr}
                      onChange={(e) => setStartingPurseCr(Number(e.target.value))}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-amber-400"
                    >
                      <option value={100}>₹100 Crore</option>
                      <option value={120}>₹120 Crore (Default)</option>
                      <option value={130}>₹130 Crore</option>
                      <option value={150}>₹150 Crore</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Bid Timer
                    </label>
                    <select
                      value={timerSeconds}
                      onChange={(e) => setTimerSeconds(Number(e.target.value))}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-amber-400"
                    >
                      <option value={15}>15 Seconds (Fast)</option>
                      <option value={20}>20 Seconds (Standard)</option>
                      <option value={30}>30 Seconds (Strategic)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isCreating}
                  className="w-full py-3 px-4 rounded-xl font-black text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 transition-all shadow-lg shadow-amber-500/25 disabled:opacity-50 text-sm tracking-wide mt-2"
                >
                  {isCreating ? 'CREATING ROOM...' : 'CREATE AUCTION ARENA 🔨'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleJoinRoom} className="space-y-4 text-left">
                {joinError && (
                  <div className="p-3 text-xs rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 font-medium">
                    {joinError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Room Code
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="e.g. ABC123"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white uppercase tracking-widest font-mono text-center font-bold text-lg focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Your Display Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CricketFan99"
                    value={joinName}
                    onChange={(e) => setJoinName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isJoining}
                  className="w-full py-3 px-4 rounded-xl font-black text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 transition-all shadow-lg shadow-amber-500/25 disabled:opacity-50 text-sm tracking-wide mt-2"
                >
                  {isJoining ? 'JOINING ROOM...' : 'ENTER AUCTION ROOM →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 10 FRANCHISES BANNER */}
      <section className="border-y border-slate-800/60 bg-slate-900/40 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs uppercase font-extrabold tracking-widest text-slate-400 mb-6">
            Compete as any of the 10 Official IPL Franchises
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {IPL_FRANCHISES.map((team) => (
              <div
                key={team.id}
                className="p-3 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-slate-700 transition-all flex items-center gap-2.5 text-left"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-base shadow-sm shrink-0"
                  style={{ backgroundColor: team.primaryColor, color: team.secondaryColor }}
                >
                  {team.logo}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate">{team.name}</div>
                  <div className="text-[10px] text-slate-400 font-semibold">{team.shortName} • {team.titles} {team.titles === 1 ? 'Title' : 'Titles'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="ipl-card p-6 rounded-2xl border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-xl mb-4">
              ⏱️
            </div>
            <h3 className="text-base font-bold text-white mb-2">Authoritative Live Timer</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Synchronized countdowns with smart bid extensions give players an authentic auction rush with zero double-sales.
            </p>
          </div>

          <div className="ipl-card p-6 rounded-2xl border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-xl mb-4">
              📊
            </div>
            <h3 className="text-base font-bold text-white mb-2">Verified Career Stats</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every player card features verified IPL runs, wickets, strike rates, bowling averages, and historical milestones.
            </p>
          </div>

          <div className="ipl-card p-6 rounded-2xl border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-xl mb-4">
              🏆
            </div>
            <h3 className="text-base font-bold text-white mb-2">100-Point Intelligence Reports</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Permanent shareable report URLs with tactical team evaluations, strengths, weaknesses, and playing XI analysis.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
