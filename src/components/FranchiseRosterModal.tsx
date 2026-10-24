'use client';

import React, { useState } from 'react';
import { FRANCHISE_2026_ROSTERS, Franchise2026Data, FranchiseRosterPlayer } from '@/data/franchise-rosters-2026';
import FranchiseLogo from '@/components/FranchiseLogo';
import DoodleFlag from '@/components/DoodleFlag';
import { X, Trophy, MapPin, Shield, Star, Users, Award, ExternalLink } from 'lucide-react';

interface FranchiseRosterModalProps {
  franchiseId: string | null;
  onClose: () => void;
}

export default function FranchiseRosterModal({
  franchiseId,
  onClose,
}: FranchiseRosterModalProps) {
  const [roleFilter, setRoleFilter] = useState<'ALL' | 'BATTER' | 'ALL_ROUNDER' | 'BOWLER' | 'WICKETKEEPER'>('ALL');

  if (!franchiseId) return null;

  const teamData: Franchise2026Data | undefined = FRANCHISE_2026_ROSTERS[franchiseId.toLowerCase()];
  if (!teamData) return null;

  const filteredPlayers = teamData.players.filter((p) => {
    if (roleFilter === 'ALL') return true;
    return p.role === roleFilter;
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#FFFBF8] text-[#1E1B18] rounded-3xl border-2 border-[#FED7AA] shadow-2xl flex flex-col overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER WITH TEAM COLORS */}
        <div className="p-5 sm:p-6 border-b border-[#FED7AA] bg-gradient-to-r from-orange-50 via-amber-50 to-orange-100 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-2 bg-white border-2 border-[#FED7AA] shadow-md flex items-center justify-center shrink-0">
              <FranchiseLogo franchiseId={teamData.id} size="xl" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-black px-2 py-0.5 rounded-lg bg-orange-200 text-orange-950 border border-orange-300">
                  {teamData.shortName}
                </span>
                <span className="text-xs font-bold text-orange-800 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {teamData.city}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#1E1B18] mt-0.5">
                {teamData.name}
              </h2>

              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[#786C64] mt-1">
                <span className="flex items-center gap-1 font-bold text-amber-900">
                  <Trophy className="w-3.5 h-3.5 text-amber-600" />
                  {teamData.titles > 0 ? `${teamData.titles}x Champion` : 'Contender'}
                </span>
                <span>•</span>
                <span>Captain: <strong className="text-[#1E1B18]">{teamData.captain}</strong></span>
                <span>•</span>
                <span className="hidden sm:inline">Ground: {teamData.homeGround}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white border border-[#FED7AA] flex items-center justify-center text-[#786C64] hover:text-[#1E1B18] hover:bg-orange-50 transition-colors shadow-xs cursor-pointer shrink-0"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SUBHEADER: PURSE & ROSTER FILTERS */}
        <div className="px-5 sm:px-6 py-3 bg-[#FFF7ED] border-b border-[#FED7AA] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#1E1B18]">
            <span className="px-2.5 py-1 rounded-lg bg-white border border-[#FED7AA] shadow-xs">
              💰 Purse: <strong>₹{teamData.purseCr} Cr</strong>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white border border-[#FED7AA] shadow-xs text-orange-900">
              🏏 2026 Core Roster ({teamData.players.length} Key Stars)
            </span>
          </div>

          {/* Role Filter Chips */}
          <div className="flex items-center gap-1 text-xs font-bold overflow-x-auto pb-1 sm:pb-0">
            {(['ALL', 'BATTER', 'ALL_ROUNDER', 'BOWLER', 'WICKETKEEPER'] as const).map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setRoleFilter(role)}
                className={`px-2.5 py-1 rounded-lg transition-all text-xs font-bold whitespace-nowrap cursor-pointer ${
                  roleFilter === role
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-white text-[#786C64] hover:text-[#1E1B18] border border-[#FED7AA]'
                }`}
              >
                {role === 'ALL'
                  ? 'All'
                  : role === 'ALL_ROUNDER'
                  ? 'All-Rounder'
                  : role.charAt(0) + role.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* 2026 SQUAD PLAYERS GRID */}
        <div className="p-5 sm:p-6 overflow-y-auto max-h-[55vh] space-y-2.5">
          {filteredPlayers.length === 0 ? (
            <div className="text-center py-12 text-sm text-[#786C64]">
              No players found for this role in the 2026 roster.
            </div>
          ) : (
            filteredPlayers.map((player) => (
              <div
                key={player.id}
                className="p-3.5 rounded-2xl bg-white border border-[#FED7AA] hover:border-orange-400 hover:shadow-md transition-all flex items-center justify-between gap-3"
              >
                {/* Left: Flag, Name, Role */}
                <div className="flex items-center gap-3 min-w-0">
                  <DoodleFlag country={player.nationality} className="w-7 h-5 shrink-0" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm sm:text-base text-[#1E1B18] truncate">
                        {player.name}
                      </span>
                      {player.isCaptain && (
                        <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-300">
                          👑 CAPTAIN
                        </span>
                      )}
                      {player.isRetained && (
                        <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-900 border border-emerald-300">
                          RETAINED
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[#786C64] flex items-center gap-2 font-medium mt-0.5">
                      <span className="font-semibold text-orange-900">
                        {player.role.replace('_', ' ')}
                      </span>
                      <span>•</span>
                      <span>{player.nationality}</span>
                      <span>•</span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                        {player.keyStat}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Price */}
                <div className="text-right shrink-0">
                  <div className="text-sm sm:text-base font-black font-mono text-orange-700">
                    {player.priceFormatted}
                  </div>
                  <span className="text-[10px] font-mono text-[#786C64] uppercase block">
                    Valuation
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="p-4 bg-orange-50/70 border-t border-[#FED7AA] flex items-center justify-between text-xs text-[#786C64] font-medium">
          <span>Official 2026 Squad Roster • IPL Season Core</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white border border-[#FED7AA] font-bold text-[#1E1B18] hover:bg-orange-100 transition-colors cursor-pointer"
          >
            Close Roster
          </button>
        </div>
      </div>
    </div>
  );
}
