'use client';

import { useState, useEffect } from 'react';
import { Player } from '@/data/players';
import { formatRupees } from '@/lib/currency';
import Link from 'next/link';

export default function PlayersCatalogPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('ALL');
  const [isOverseas, setIsOverseas] = useState('ALL');
  const [sortBy, setSortBy] = useState('runs');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPlayers() {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.set('q', search);
        if (role !== 'ALL') params.set('role', role);
        if (isOverseas !== 'ALL') params.set('overseas', isOverseas);
        params.set('sortBy', sortBy);

        const res = await fetch(`/api/players?${params.toString()}`);
        const data = await res.json();
        if (data.players) setPlayers(data.players);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    loadPlayers();
  }, [search, role, isOverseas, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* HEADER */}
      <div className="ipl-card p-6 sm:p-8 rounded-3xl border border-slate-800 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-2">
          <span>Verified IPL Player Catalog</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">Historical Player Database</h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Traceable IPL statistics covering all-time icons and modern match-winners. Sourced from official archives with verified dates of birth and complete performance metrics.
        </p>

        {/* SEARCH & FILTERS BAR */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="Search by player or team..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
          >
            <option value="ALL">All Roles</option>
            <option value="BATTER">Batters</option>
            <option value="BOWLER">Bowlers</option>
            <option value="ALL_ROUNDER">All-Rounders</option>
            <option value="WICKETKEEPER">Wicketkeepers</option>
          </select>

          <select
            value={isOverseas}
            onChange={(e) => setIsOverseas(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
          >
            <option value="ALL">Domestic & Overseas</option>
            <option value="false">Indian Players Only</option>
            <option value="true">Overseas Players Only</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
          >
            <option value="runs">Sort by Career Runs</option>
            <option value="wickets">Sort by Career Wickets</option>
            <option value="strikeRate">Sort by Strike Rate</option>
            <option value="age">Sort by Age</option>
            <option value="basePrice">Sort by Base Price</option>
          </select>
        </div>
      </div>

      {/* PLAYER CARDS GRID */}
      {isLoading ? (
        <div className="py-20 text-center">
          <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-slate-400 text-xs font-semibold">Filtering verified players...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {players.map((player) => (
            <div
              key={player.id}
              className="ipl-card p-5 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    {player.primaryRole}
                  </span>
                  {player.isOverseas && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/30">
                      ✈️ {player.nationality}
                    </span>
                  )}
                  <span className="text-[11px] text-slate-400 font-semibold">
                    Age {player.calculatedAge}
                  </span>
                </div>

                <h3 className="text-lg font-black text-white">{player.canonicalName}</h3>
                <p className="text-xs text-slate-400 mt-1 mb-4 leading-relaxed line-clamp-2">
                  {player.profileSummary}
                </p>

                {/* STATS MATRIX */}
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs mb-4">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-500 block">Matches</span>
                    <span className="font-extrabold text-white">{player.stats.matches}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-500 block">Runs (SR)</span>
                    <span className="font-extrabold text-white">
                      {player.stats.runs} <span className="text-[10px] text-slate-400 font-normal">({player.stats.strikeRate})</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-500 block">Wkts (Eco)</span>
                    <span className="font-extrabold text-white">
                      {player.stats.wickets} <span className="text-[10px] text-slate-400 font-normal">({player.stats.economyRate || '-'})</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  Base Price: <strong className="text-amber-400 font-mono">{formatRupees(player.defaultBasePrice)}</strong>
                </span>
                <span className="text-[10px] text-slate-500">{player.stats.provenance}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
