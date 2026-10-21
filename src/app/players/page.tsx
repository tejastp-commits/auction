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
  const [cappedStatus, setCappedStatus] = useState('ALL');
  const [auctionStatus, setAuctionStatus] = useState('ALL');
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
        if (cappedStatus !== 'ALL') params.set('capped', cappedStatus);
        if (auctionStatus !== 'ALL') params.set('status', auctionStatus);
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
  }, [search, role, isOverseas, cappedStatus, auctionStatus, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* HEADER */}
      <div className="ipl-card p-6 sm:p-8 rounded-3xl border border-slate-800 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
            <span>Official BCCI / IPL Player Catalog</span>
          </div>
          <div className="text-xs text-slate-400 font-semibold">
            Showing <span className="text-amber-400 font-black">{players.length}</span> Verified Players
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">Master IPL Player Database</h1>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Comprehensive official database covering 620+ players sourced from the official BCCI TATA IPL 2025 Auction List, 2025 franchise retentions, and all-time highest auction records. Verified dates of birth, cricket profiles, and authentic career metrics.
        </p>

        {/* SEARCH & FILTERS BAR */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          <input
            type="text"
            placeholder="Search by name, state, or franchise..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400 lg:col-span-2"
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
            value={cappedStatus}
            onChange={(e) => setCappedStatus(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
          >
            <option value="ALL">All Capped Status</option>
            <option value="CAPPED">Capped International</option>
            <option value="UNCAPPED">Uncapped Domestic</option>
            <option value="ASSOCIATE">Associate ICC</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
          >
            <option value="runs">Sort by Career Runs</option>
            <option value="wickets">Sort by Career Wickets</option>
            <option value="strikeRate">Sort by Strike Rate</option>
            <option value="soldPrice">Sort by Sold/Retained Price</option>
            <option value="basePrice">Sort by Base Price</option>
            <option value="age">Sort by Age</option>
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
          {players.map((player) => {
            const aff = player.currentAffiliation;
            const lastHist = player.auctionHistory?.[0];

            return (
              <div
                key={player.id}
                className="ipl-card p-5 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
                        {player.primaryRole}
                      </span>
                      {player.internationalStatus && (
                        <span
                          className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${
                            player.internationalStatus === 'CAPPED'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              : 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                          }`}
                        >
                          {player.internationalStatus}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {player.isOverseas ? (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/30">
                          ✈️ {player.nationality}
                        </span>
                      ) : (
                        player.stateAssociation && (
                          <span className="text-[10px] text-slate-400 font-mono">
                            {player.stateAssociation}
                          </span>
                        )
                      )}
                      <span className="text-[11px] text-slate-400 font-semibold">
                        Age {player.calculatedAge}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-white">{player.canonicalName}</h3>
                  
                  {/* Style info */}
                  <div className="text-[11px] text-slate-400 flex items-center gap-2 mb-2">
                    <span>{player.battingStyle}</span>
                    {player.bowlingStyle && player.bowlingStyle !== 'None' && (
                      <>
                        <span>•</span>
                        <span>{player.bowlingStyle}</span>
                      </>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 mt-1 mb-3 leading-relaxed line-clamp-2">
                    {player.profileSummary}
                  </p>

                  {/* 2025 STATUS PILL */}
                  {aff && (
                    <div className="mb-3">
                      {aff.latestAuctionStatus === 'RETAINED' && (
                        <div className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center justify-between">
                          <span>🔒 Retained by {aff.latestConfirmedFranchise}</span>
                          {lastHist?.finalSoldPrice && (
                            <span className="font-mono">{formatRupees(lastHist.finalSoldPrice)}</span>
                          )}
                        </div>
                      )}
                      {aff.latestAuctionStatus === 'SOLD' && (
                        <div className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold flex items-center justify-between">
                          <span>🔨 Sold to {aff.latestConfirmedFranchise}</span>
                          {lastHist?.finalSoldPrice && (
                            <span className="font-mono font-black">{formatRupees(lastHist.finalSoldPrice)}</span>
                          )}
                        </div>
                      )}
                      {aff.latestAuctionStatus === 'UNSOLD' && (
                        <div className="px-2 py-0.5 rounded text-[10px] text-slate-400 bg-slate-800/60 inline-block font-medium">
                          Unsold in 2025 Jeddah Auction (Reserve: {formatRupees(player.defaultBasePrice)})
                        </div>
                      )}
                    </div>
                  )}

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
                  <span className="text-[10px] text-slate-500 truncate max-w-[150px]">
                    {player.stats.provenance}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
