'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { AuctionReportData } from '@/lib/types';
import { TeamEvaluation } from '@/lib/analytics';
import { formatRupees, CRORE } from '@/lib/currency';
import { FRANCHISE_MAP } from '@/data/franchises';
import FranchiseLogo from '@/components/FranchiseLogo';
import Link from 'next/link';

export default function FranchiseReportPage() {
  const params = useParams();
  const slug = params.slug as string;
  const franchiseId = (params.franchise as string)?.toLowerCase();

  const [report, setReport] = useState<AuctionReportData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

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
          <p className="text-slate-400 font-semibold text-sm">Loading Franchise Intelligence Card...</p>
        </div>
      </div>
    );
  }

  const teamEval: TeamEvaluation | undefined = report?.rankings.find(
    (r) => r.franchiseId.toLowerCase() === franchiseId
  );
  const franchise = FRANCHISE_MAP.get(franchiseId);
  const squadState = report?.allSquads[franchiseId];

  if (error || !report || !teamEval || !franchise) {
    return (
      <div className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full ipl-card p-8 rounded-2xl text-center border border-red-500/30">
          <div className="text-3xl mb-3">⚠️</div>
          <h2 className="text-lg font-bold text-white mb-2">Franchise Report Not Found</h2>
          <p className="text-sm text-slate-400 mb-6">{error || 'Team or report does not exist.'}</p>
          <Link
            href={`/reports/${slug}`}
            className="inline-block py-2.5 px-5 rounded-xl font-bold bg-amber-500 text-slate-950 text-xs tracking-wide"
          >
            ← Return to Tournament Report
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* BREADCRUMB */}
      <div className="mb-6 flex items-center gap-2 text-xs text-slate-400">
        <Link href={`/reports/${slug}`} className="hover:text-amber-400">
          ← Tournament Standings
        </Link>
        <span>/</span>
        <span className="text-slate-200 font-semibold">{franchise.name}</span>
      </div>

      {/* TEAM HERO BANNER */}
      <div className="ipl-card p-6 sm:p-8 rounded-3xl border border-slate-800 mb-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl p-1.5 flex items-center justify-center shadow-xl shrink-0 bg-slate-900 border border-slate-700">
              <FranchiseLogo franchiseId={franchise.id} size="xl" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  TOURNAMENT RANK #{teamEval.rank}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {franchise.shortName} • {franchise.city}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-white">{franchise.name}</h1>
              <p className="text-xs text-slate-400 mt-1 max-w-xl">{teamEval.summary}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                100-Point Score
              </span>
              <span className="text-3xl font-black text-amber-400">
                {teamEval.totalScore}
                <span className="text-sm font-semibold text-slate-500">/100</span>
              </span>
            </div>

            <button
              onClick={handleCopyLink}
              className="py-3 px-4 rounded-xl font-bold text-xs border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 flex items-center justify-center gap-2 transition-all"
            >
              <span>{copied ? '✅ Copied!' : '🔗 Share Card'}</span>
            </button>
          </div>
        </div>

        {/* 6-DIMENSION EVALUATION SCORES */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-6">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Batting Depth</span>
            <span className="text-lg font-black text-white">
              {teamEval.dimensionScores.battingQuality}
              <span className="text-xs text-slate-500 font-medium">/25</span>
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Bowling Depth</span>
            <span className="text-lg font-black text-white">
              {teamEval.dimensionScores.bowlingQuality}
              <span className="text-xs text-slate-500 font-medium">/25</span>
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Role Balance</span>
            <span className="text-lg font-black text-white">
              {teamEval.dimensionScores.roleBalance}
              <span className="text-xs text-slate-500 font-medium">/15</span>
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Historical Pedigree</span>
            <span className="text-lg font-black text-white">
              {teamEval.dimensionScores.historicalPerformance}
              <span className="text-xs text-slate-500 font-medium">/15</span>
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Budget Efficiency</span>
            <span className="text-lg font-black text-white">
              {teamEval.dimensionScores.budgetEfficiency}
              <span className="text-xs text-slate-500 font-medium">/10</span>
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Squad Bounds</span>
            <span className="text-lg font-black text-white">
              {teamEval.dimensionScores.squadCompleteness}
              <span className="text-xs text-slate-500 font-medium">/10</span>
            </span>
          </div>
        </div>
      </div>

      {/* STRENGTHS & TACTICAL GAPS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="ipl-card p-6 rounded-2xl border border-emerald-500/20 bg-emerald-950/10">
          <h3 className="text-sm font-bold text-emerald-400 mb-3 flex items-center gap-2">
            <span>✅ Core Tactical Strengths</span>
          </h3>
          {teamEval.keyStrengths.length > 0 ? (
            <ul className="space-y-2 text-xs text-slate-300">
              {teamEval.keyStrengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-500 italic">No standout tactical strengths identified.</p>
          )}
        </div>

        <div className="ipl-card p-6 rounded-2xl border border-red-500/20 bg-red-950/10">
          <h3 className="text-sm font-bold text-red-400 mb-3 flex items-center gap-2">
            <span>⚠️ Vulnerabilities & Squad Gaps</span>
          </h3>
          {teamEval.keyWeaknesses.length > 0 ? (
            <ul className="space-y-2 text-xs text-slate-300">
              {teamEval.keyWeaknesses.map((w, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-400">All fundamental team roles adequately covered!</p>
          )}
        </div>
      </div>

      {/* TOP ACQUISITIONS & BEST VALUE BUYS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="ipl-card p-6 rounded-2xl border border-slate-800">
          <h3 className="text-sm font-bold text-white mb-4">Marquee Signings</h3>
          {teamEval.topAcquisitions.length > 0 ? (
            <div className="space-y-3">
              {teamEval.topAcquisitions.map((acq, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-white block">{acq.player.canonicalName}</span>
                    <span className="text-[11px] text-slate-400">{acq.rationale}</span>
                  </div>
                  <span className="font-mono font-black text-amber-400 shrink-0 ml-3">
                    {formatRupees(acq.price)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">No players purchased.</p>
          )}
        </div>

        <div className="ipl-card p-6 rounded-2xl border border-slate-800">
          <h3 className="text-sm font-bold text-white mb-4">Value Acquisitions (Bargain Buys)</h3>
          {teamEval.bestValueBuys.length > 0 ? (
            <div className="space-y-3">
              {teamEval.bestValueBuys.map((buy, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-white block">{buy.player.canonicalName}</span>
                    <span className="text-[11px] text-slate-400">
                      Paid {formatRupees(buy.price)} vs Estimated {formatRupees(buy.estimatedValue)}
                    </span>
                  </div>
                  <span className="font-mono font-extrabold text-emerald-400 shrink-0 ml-3">
                    +{formatRupees(buy.saving)} Value
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">No players acquired below baseline valuation.</p>
          )}
        </div>
      </div>

      {/* RECOMMENDED BEST PLAYING XI */}
      {teamEval.recommendedXI.length > 0 && (
        <div className="ipl-card p-6 rounded-2xl border border-slate-800 mb-8">
          <div className="mb-4">
            <h3 className="text-base font-bold text-white">Hypothetical Best Playing XI</h3>
            <p className="text-xs text-slate-400">Optimized tactical lineup based on role balance and historical form</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {teamEval.recommendedXI.map((p, idx) => (
              <div
                key={p.id}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3 text-xs"
              >
                <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-[10px] text-amber-400">
                  {idx + 1}
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-white block truncate">{p.canonicalName}</span>
                  <span className="text-[10px] text-slate-400 block">
                    {p.primaryRole} {p.isOverseas && '• ✈️ Overseas'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FULL ACQUIRED SQUAD ROSTER TABLE */}
      <div className="ipl-card p-6 rounded-2xl border border-slate-800">
        <h3 className="text-base font-bold text-white mb-4">Complete Acquired Roster</h3>
        {squadState && squadState.players.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase tracking-wider">
                  <th className="py-2.5 px-3">Player</th>
                  <th className="py-2.5 px-3">Role</th>
                  <th className="py-2.5 px-3">Style</th>
                  <th className="py-2.5 px-3">Purchase Price</th>
                  <th className="py-2.5 px-3">Career Matches</th>
                  <th className="py-2.5 px-3">Runs (SR)</th>
                  <th className="py-2.5 px-3">Wickets (Eco)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {squadState.players.map((item) => (
                  <tr key={item.player.id} className="hover:bg-slate-900/40">
                    <td className="py-3 px-3 font-bold text-white flex items-center gap-2">
                      <span>{item.player.canonicalName}</span>
                      {item.player.isOverseas && (
                        <span className="text-[10px] text-blue-400 font-semibold">✈️</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-slate-300 font-medium">{item.player.primaryRole}</td>
                    <td className="py-3 px-3 text-slate-400">{item.player.battingStyle}</td>
                    <td className="py-3 px-3 font-mono font-black text-amber-400">
                      {formatRupees(item.price)}
                    </td>
                    <td className="py-3 px-3 text-slate-300">{item.player.stats.matches}</td>
                    <td className="py-3 px-3 text-slate-300">
                      {item.player.stats.runs} ({item.player.stats.strikeRate})
                    </td>
                    <td className="py-3 px-3 text-slate-300">
                      {item.player.stats.wickets} ({item.player.stats.economyRate || '-'})
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-slate-500 italic">No players acquired during this auction session.</p>
        )}
      </div>
    </div>
  );
}
