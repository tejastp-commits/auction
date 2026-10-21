import { Player } from '@/data/players';
import { Franchise } from '@/data/franchises';
import { CRORE } from './currency';

export interface SquadPlayerItem {
  player: Player;
  purchasePrice: number;
  boughtAt: string;
}

export interface DimensionScores {
  battingQuality: number; // Max 25
  bowlingQuality: number; // Max 25
  roleBalance: number;    // Max 15
  historicalPerformance: number; // Max 15
  budgetEfficiency: number;      // Max 10
  squadCompleteness: number;     // Max 10
}

export interface TeamEvaluation {
  franchiseId: string;
  franchiseName: string;
  totalScore: number; // 0 - 100
  dimensionScores: DimensionScores;
  squadSize: number;
  overseasCount: number;
  totalSpent: number;
  remainingPurse: number;
  roleBreakdown: {
    batters: number;
    wicketkeepers: number;
    allRounders: number;
    bowlers: number;
    paceBowlers: number;
    spinBowlers: number;
  };
  topAcquisitions: {
    player: Player;
    price: number;
    rationale: string;
  }[];
  bestValueBuys: {
    player: Player;
    price: number;
    estimatedValue: number;
    saving: number;
  }[];
  keyStrengths: string[];
  keyWeaknesses: string[];
  recommendedXI: Player[];
  rank?: number;
  summary: string;
}

/**
 * Calculates a baseline player valuation (in rupees) based on historical performance,
 * roles, economy rates, and strike rates.
 */
export function estimatePlayerValue(player: Player): number {
  let val = player.defaultBasePrice;
  const s = player.stats;

  if (s.matches >= 30) {
    // Batting contribution
    if (s.runs > 2000) val += 4 * CRORE;
    else if (s.runs > 1000) val += 2 * CRORE;

    if (s.strikeRate >= 140) val += 2 * CRORE;
    else if (s.strikeRate >= 130) val += 1 * CRORE;

    if (s.battingAverage >= 35) val += 2 * CRORE;

    // Bowling contribution
    if (s.wickets > 100) val += 4 * CRORE;
    else if (s.wickets > 50) val += 2 * CRORE;

    if (s.economyRate > 0 && s.economyRate <= 7.5) val += 2.5 * CRORE;
    else if (s.economyRate > 0 && s.economyRate <= 8.5) val += 1 * CRORE;

    // All-rounder boost
    if (player.primaryRole === 'ALL_ROUNDER' && s.runs > 1000 && s.wickets > 30) {
      val += 3 * CRORE;
    }
  }

  // Ceiling to realistic auction peaks
  return Math.min(val, 25 * CRORE);
}

/**
 * Evaluates a single franchise's completed squad according to the PRD 100-point framework.
 */
export function evaluateSquad(
  franchise: Franchise,
  squad: SquadPlayerItem[],
  startingPurse: number = 120 * CRORE,
  minSquad: number = 18,
  maxSquad: number = 25,
  maxOverseas: number = 8
): TeamEvaluation {
  const players = squad.map((item) => item.player);
  const totalSpent = squad.reduce((sum, item) => sum + item.purchasePrice, 0);
  const remainingPurse = Math.max(0, startingPurse - totalSpent);

  const overseasPlayers = players.filter((p) => p.isOverseas);
  const batters = players.filter((p) => p.primaryRole === 'BATTER');
  const wicketkeepers = players.filter((p) => p.primaryRole === 'WICKETKEEPER');
  const allRounders = players.filter((p) => p.primaryRole === 'ALL_ROUNDER');
  const bowlers = players.filter((p) => p.primaryRole === 'BOWLER');
  const paceBowlers = players.filter((p) => p.bowlingType === 'PACE');
  const spinBowlers = players.filter((p) => p.bowlingType === 'SPIN');

  // 1. Batting Quality & Depth (Max 25)
  let battingScore = 0;
  const topBatters = [...players].sort((a, b) => b.stats.runs - a.stats.runs).slice(0, 5);
  const avgBattingSR = topBatters.length > 0
    ? topBatters.reduce((acc, p) => acc + p.stats.strikeRate, 0) / topBatters.length
    : 0;
  const avgRuns = topBatters.length > 0
    ? topBatters.reduce((acc, p) => acc + p.stats.runs, 0) / topBatters.length
    : 0;

  if (topBatters.length >= 4) battingScore += 8;
  else battingScore += topBatters.length * 2;

  if (avgBattingSR >= 145) battingScore += 9;
  else if (avgBattingSR >= 135) battingScore += 7;
  else if (avgBattingSR >= 125) battingScore += 5;
  else battingScore += 3;

  if (avgRuns >= 3000) battingScore += 8;
  else if (avgRuns >= 1500) battingScore += 6;
  else if (avgRuns >= 800) battingScore += 4;
  else battingScore += 2;

  battingScore = Math.min(25, Math.max(0, battingScore));

  // 2. Bowling Quality & Depth (Max 25)
  let bowlingScore = 0;
  const topBowlers = [...players].sort((a, b) => b.stats.wickets - a.stats.wickets).slice(0, 5);
  const totalWickets = topBowlers.reduce((acc, p) => acc + p.stats.wickets, 0);

  if (paceBowlers.length >= 3) bowlingScore += 6;
  else bowlingScore += paceBowlers.length * 2;

  if (spinBowlers.length >= 2) bowlingScore += 6;
  else bowlingScore += spinBowlers.length * 3;

  if (totalWickets >= 400) bowlingScore += 8;
  else if (totalWickets >= 250) bowlingScore += 6;
  else if (totalWickets >= 120) bowlingScore += 4;
  else bowlingScore += 2;

  // Economy & death capability
  const eliteEco = players.filter((p) => p.stats.economyRate > 0 && p.stats.economyRate <= 8.0);
  if (eliteEco.length >= 3) bowlingScore += 5;
  else bowlingScore += eliteEco.length * 1.5;

  bowlingScore = Math.min(25, Math.max(0, Math.round(bowlingScore)));

  // 3. Role Balance & Flexibility (Max 15)
  let balanceScore = 0;
  if (wicketkeepers.length >= 1) balanceScore += 4;
  if (wicketkeepers.length >= 2) balanceScore += 1; // backup keeper
  if (allRounders.length >= 2) balanceScore += 5;
  else if (allRounders.length === 1) balanceScore += 3;

  // Left-hand / Right-hand flexibility
  const leftHanders = players.filter((p) => p.battingStyle.includes('Left'));
  const rightHanders = players.filter((p) => p.battingStyle.includes('Right'));
  if (leftHanders.length >= 2 && rightHanders.length >= 3) balanceScore += 3;
  else balanceScore += 1;

  if (paceBowlers.length >= 2 && spinBowlers.length >= 2) balanceScore += 2;
  balanceScore = Math.min(15, balanceScore);

  // 4. Historical Player Performance (Max 15)
  let historyScore = 0;
  const totalIPLMatches = players.reduce((sum, p) => sum + p.stats.matches, 0);
  const centuriesCount = players.reduce((sum, p) => sum + p.stats.hundreds, 0);
  const fifitiesCount = players.reduce((sum, p) => sum + p.stats.fifties, 0);

  if (totalIPLMatches >= 800) historyScore += 6;
  else if (totalIPLMatches >= 400) historyScore += 4;
  else historyScore += 2;

  if (centuriesCount >= 5) historyScore += 5;
  else if (fifitiesCount >= 20) historyScore += 3;
  else historyScore += 1;

  const provenMatchWinners = players.filter(
    (p) => p.stats.runs >= 2000 || p.stats.wickets >= 80
  );
  if (provenMatchWinners.length >= 4) historyScore += 4;
  else historyScore += provenMatchWinners.length;

  historyScore = Math.min(15, historyScore);

  // 5. Budget Efficiency (Max 10)
  let budgetScore = 5;
  const squadValuation = players.reduce((sum, p) => sum + estimatePlayerValue(p), 0);
  const valueRatio = totalSpent > 0 ? squadValuation / totalSpent : 1.0;

  if (valueRatio >= 1.2) budgetScore += 4;
  else if (valueRatio >= 1.0) budgetScore += 3;
  else if (valueRatio >= 0.8) budgetScore += 1;
  else budgetScore -= 1;

  // Reward keeping healthy remaining purse without leaving too much unspent
  if (remainingPurse >= 1 * CRORE && remainingPurse <= 20 * CRORE) {
    budgetScore += 1;
  }
  budgetScore = Math.min(10, Math.max(2, budgetScore));

  // 6. Squad Completeness & Eligibility (Max 10)
  let completenessScore = 0;
  if (players.length >= minSquad && players.length <= maxSquad) {
    completenessScore += 6;
  } else if (players.length >= 11) {
    completenessScore += 3; // playing XI achieved
  }

  // Overseas compliance
  if (overseasPlayers.length <= maxOverseas && overseasPlayers.length >= 4) {
    completenessScore += 4;
  } else if (overseasPlayers.length <= maxOverseas) {
    completenessScore += 2;
  }

  completenessScore = Math.min(10, completenessScore);

  const totalScore = Math.round(
    battingScore + bowlingScore + balanceScore + historyScore + budgetScore + completenessScore
  );

  // Top acquisitions
  const topAcquisitions = squad
    .slice()
    .sort((a, b) => b.purchasePrice - a.purchasePrice)
    .slice(0, 3)
    .map((item) => ({
      player: item.player,
      price: item.purchasePrice,
      rationale: `${item.player.canonicalName} provides established ${item.player.primaryRole.toLowerCase()} prowess with ${
        item.player.stats.runs > 1000
          ? `${item.player.stats.runs} career runs (${item.player.stats.strikeRate} SR)`
          : `${item.player.stats.wickets} wickets (${item.player.stats.economyRate} eco)`
      }.`,
    }));

  // Best value buys
  const bestValueBuys = squad
    .map((item) => {
      const est = estimatePlayerValue(item.player);
      return {
        player: item.player,
        price: item.purchasePrice,
        estimatedValue: est,
        saving: est - item.purchasePrice,
      };
    })
    .filter((b) => b.saving > 0)
    .sort((a, b) => b.saving - a.saving)
    .slice(0, 3);

  // Strengths & Weaknesses
  const keyStrengths: string[] = [];
  const keyWeaknesses: string[] = [];

  if (battingScore >= 18) keyStrengths.push('Formidable batting firepower with elite career strike rates');
  if (bowlingScore >= 18) keyStrengths.push('High-octane bowling attack featuring proven wicket-takers');
  if (allRounders.length >= 2) keyStrengths.push('Strong all-rounder contingency providing tactical batting depth');
  if (wicketkeepers.length >= 1) keyStrengths.push(`Reliable wicketkeeping presence led by ${wicketkeepers[0].canonicalName}`);
  if (paceBowlers.length >= 3) keyStrengths.push('Versatile fast-bowling unit covering powerplay and death overs');
  if (spinBowlers.length >= 2) keyStrengths.push('Dangerous spin tandem capable of controlling the middle overs');

  if (wicketkeepers.length === 0) keyWeaknesses.push('Critical vulnerability: No specialist wicketkeeper acquired in the squad');
  if (paceBowlers.length < 2) keyWeaknesses.push('Pace attack is thin; vulnerable during powerplay and death overs');
  if (spinBowlers.length === 0) keyWeaknesses.push('Absence of specialist spin options could prove costly on turning wickets');
  if (allRounders.length === 0) keyWeaknesses.push('Lack of two-way all-rounders restricts bowling options and tail flexibility');
  if (players.length < 11) keyWeaknesses.push('Incomplete playing XI: Squad does not yet have 11 registered players');

  // Build recommended Best XI
  const recommendedXI: Player[] = [];
  // 1 keeper
  if (wicketkeepers.length > 0) recommendedXI.push(wicketkeepers[0]);
  // up to 4 top batters
  const availBatters = batters.filter((b) => !recommendedXI.includes(b)).slice(0, 4);
  recommendedXI.push(...availBatters);
  // up to 2 all-rounders
  const availAllRounders = allRounders.filter((a) => !recommendedXI.includes(a)).slice(0, 2);
  recommendedXI.push(...availAllRounders);
  // bowlers
  const availBowlers = bowlers.filter((b) => !recommendedXI.includes(b));
  recommendedXI.push(...availBowlers);

  // Fill up to 11 if possible from remaining squad
  for (const p of players) {
    if (recommendedXI.length >= 11) break;
    if (!recommendedXI.includes(p)) {
      recommendedXI.push(p);
    }
  }

  const summary = `${franchise.name} concluded the auction with ${players.length} players (${overseasPlayers.length} overseas) and ${remainingPurse > 0 ? `${(remainingPurse / CRORE).toFixed(2)} Cr remaining purse` : 'exhausted purse'}. Overall squad rating: ${totalScore}/100.`;

  return {
    franchiseId: franchise.id,
    franchiseName: franchise.name,
    totalScore,
    dimensionScores: {
      battingQuality: battingScore,
      bowlingQuality: bowlingScore,
      roleBalance: balanceScore,
      historicalPerformance: historyScore,
      budgetEfficiency: budgetScore,
      squadCompleteness: completenessScore,
    },
    squadSize: players.length,
    overseasCount: overseasPlayers.length,
    totalSpent,
    remainingPurse,
    roleBreakdown: {
      batters: batters.length,
      wicketkeepers: wicketkeepers.length,
      allRounders: allRounders.length,
      bowlers: bowlers.length,
      paceBowlers: paceBowlers.length,
      spinBowlers: spinBowlers.length,
    },
    topAcquisitions,
    bestValueBuys,
    keyStrengths,
    keyWeaknesses,
    recommendedXI,
    summary,
  };
}

/**
 * Evaluates all squads in an auction room and assigns relative ranks
 */
export function rankAllSquads(
  evaluations: TeamEvaluation[]
): TeamEvaluation[] {
  const sorted = [...evaluations].sort((a, b) => b.totalScore - a.totalScore);
  return sorted.map((item, idx) => ({
    ...item,
    rank: idx + 1,
  }));
}
