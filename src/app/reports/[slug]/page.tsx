'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { AuctionReportData } from '@/lib/types';
import { formatRupees, CRORE } from '@/lib/currency';
import { FRANCHISE_MAP } from '@/data/franchises';
import Link from 'next/link';

export default function OverallReportPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [report, setReport] = useState<AuctionReportData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [filterRole, setFilterRole] = useState('ALL');

  useEffect(() => {
    async function fetchReport() {
      try {
        const res = await fetch(`/api/reports/${slug}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Report not found');
        setReport(data.report);
      } catch (err: any) {
        setError(err.message || 'Failed to load report');
      } finally {
        setIsLoading(false);
      }
    }
    fetchReport();
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400 font-semibold text-sm">Generating Post-Auction Intelligence Report...</p>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full ipl-card p-8 rounded-2xl text-center border border-red-500/30">
          <div className="text-3xl mb-3">⚠️</div>
          <h2 className="text-lg font-bold text-white mb-2">Report Not Found</h2>
          <p className="text-sm text-slate-400 mb-6">{error || 'This report may have expired or is invalid.'}</p>
          <Link
            href="/"
            className="inline-block py-2.5 px-5 rounded-xl font-bold bg-amber-500 text-slate-950 text-xs tracking-wide"
          >
            ← Return to Arena Home
          </Link>
        </div>
      </div>
    );
  }

  const filteredSoldPlayers = report.allSoldPlayers.filter((item) => {
    if (filterRole === 'ALL') return true;
    return item.player.primaryRole === filterRole;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* REPORT BANNER */}
      <div className="ipl-card p-6 sm:p-8 rounded-3xl border border-slate-800 mb-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
              <span>Permanent Shareable Report</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              IPL Auction Arena: Tournament Report
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Room Code: <strong className="text-amber-400 font-mono">{report.roomCode}</strong> • Concluded on{' '}
              {new Date(report.createdAt).toLocaleDateString('en-US', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="py-2.5 px-4 rounded-xl font-bold text-xs border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 flex items-center gap-2 transition-all"
            >
              <span>{copied ? '✅ Report Link Copied!' : '🔗 Share Report Link'}</span>
            </button>
            <Link
              href="/"
              className="py-2.5 px-4 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all"
            >
              + Host Another
            </Link>
          </div>
        </div>

        {/* HIGH-LEVEL METRICS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Total Spent</span>
            <span className="text-xl sm:text-2xl font-black text-amber-400">
              {formatRupees(report.stats.totalSpent)}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Players Acquired</span>
            <span className="text-xl sm:text-2xl font-black text-white">
              {report.stats.totalPlayersSold}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Unsold Players</span>
            <span className="text-xl sm:text-2xl font-black text-slate-400">
              {report.unsoldPlayers.length}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Record Purchase</span>
            <span className="text-sm sm:text-base font-extrabold text-white truncate block">
              {report.stats.highestBidPlayer
                ? `${report.stats.highestBidPlayer.player.canonicalName} (${formatRupees(
                    report.stats.highestBidPlayer.price
                  )})`
                : 'None'}
            </span>
          </div>
        </div>
      </div>

      {/* 100-POINT FRANCHISE RANKINGS TABLE */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-black text-white">Franchise Squad Intelligence Rankings</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Evaluated across 6 dimensions: Batting (25%), Bowling (25%), Balance (15%), History (15%), Budget (10%), Squad (10%)
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {report.rankings.map((team, idx) => {
            const franchise = FRANCHISE_MAP.get(team.franchiseId);

            return (
              <div
                key={team.franchiseId}
                className="ipl-card p-5 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center font-black text-sm text-amber-400">
                    #{idx + 1}
                  </div>

                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shrink-0 shadow"
                    style={{
                      backgroundColor: franchise?.primaryColor,
                      color: franchise?.secondaryColor,
                    }}
                  >
                    {franchise?.logo}
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                      <span>{team.franchiseName}</span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      {team.squadSize} Players ({team.overseasCount} Overseas) • Spent {formatRupees(team.totalSpent)} • Remaining {formatRupees(team.remainingPurse)}
                    </p>
                  </div>
                </div>

                {/* SCORES MATRIX */}
                <div className="flex flex-wrap items-center gap-6 self-stretch md:self-auto justify-between md:justify-end">
                  <div className="flex items-center gap-3 text-center text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block font-bold">Batting</span>
                      <span className="font-extrabold text-white">{team.dimensionScores.battingQuality}/25</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block font-bold">Bowling</span>
                      <span className="font-extrabold text-white">{team.dimensionScores.bowlingQuality}/25</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block font-bold">Balance</span>
                      <span className="font-extrabold text-white">{team.dimensionScores.roleBalance}/15</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                      Overall Score
                    </span>
                    <span className="text-2xl font-black text-amber-400">
                      {team.totalScore}<span className="text-xs text-slate-500 font-semibold">/100</span>
                    </span>
                  </div>

                  <Link
                    href={`/reports/${slug}/${team.franchiseId}`}
                    className="py-2 px-3.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-amber-500 hover:text-slate-950 border border-slate-700 text-slate-200 transition-all shrink-0"
                  >
                    View Card →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ALL SOLD PLAYERS ROSTER */}
      <div className="ipl-card p-6 rounded-2xl border border-slate-800 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-white">Tournament Auction Ledger</h3>
            <p className="text-xs text-slate-400">Complete record of all accepted sales and winning bids</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold">Filter:</span>
            {['ALL', 'BATTER', 'BOWLER', 'ALL_ROUNDER', 'WICKETKEEPER'].map((r) => (
              <button
                key={r}
                onClick={() => setFilterRole(r)}
                className={`py-1 px-2.5 rounded-lg text-xs font-bold transition-all ${
                  filterRole === r
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {r === 'ALL_ROUNDER' ? 'ALL-ROUND' : r}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase tracking-wider">
                <th className="py-2.5 px-3">Player</th>
                <th className="py-2.5 px-3">Role</th>
                <th className="py-2.5 px-3">Acquired By</th>
                <th className="py-2.5 px-3">Winning Price</th>
                <th className="py-2.5 px-3">Key Metric</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredSoldPlayers.map((item) => {
                const f = FRANCHISE_MAP.get(item.franchiseId);
                return (
                  <tr key={item.player.id} className="hover:bg-slate-900/40">
                    <td className="py-3 px-3 font-bold text-white flex items-center gap-2">
                      <span>{item.player.canonicalName}</span>
                      {item.player.isOverseas && <span className="text-[10px] text-blue-400 font-semibold">✈️</span>}
                    </td>
                    <td className="py-3 px-3 text-slate-300 font-medium">{item.player.primaryRole}</td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1.5 font-semibold text-slate-200">
                        <span>{f?.logo}</span>
                        <span>{f?.name || item.franchiseName}</span>
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono font-black text-amber-400">
                      {formatRupees(item.price)}
                    </td>
                    <td className="py-3 px-3 text-slate-400">
                      {item.player.stats.runs > 1000
                        ? `${item.player.stats.runs} runs (${item.player.stats.strikeRate} SR)`
                        : `${item.player.stats.wickets} wkts (${item.player.stats.economyRate} eco)`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
