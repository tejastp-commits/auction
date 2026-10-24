import { VERIFIED_PLAYERS, Player } from './players';

export interface CuratedSet {
  setId: string;
  setName: string;
  category: 'MARQUEE' | 'CAPPED' | 'UNCAPPED' | 'DEPTH';
  players: Player[];
}

export interface CuratedPoolPreset {
  id: string;
  name: string;
  playerCount: number;
  targetTeams: string;
  badge: string;
  tagline: string;
  description: string;
  isDefault?: boolean;
}

export const POOL_PRESETS: CuratedPoolPreset[] = [
  {
    id: 'mega-300',
    name: '10 Teams • Mega Auction Pool',
    playerCount: 300,
    targetTeams: '10 Teams',
    badge: '10 Teams (300 Players)',
    tagline: '250 Squad Slots + 50 Buffer',
    description:
      'The definitive 10-franchise mega auction pool. 300 cricketers analyzed across past 5 seasons (2021–2026 IPL) with balanced roles and overseas quotas.',
    isDefault: true,
  },
  {
    id: 'championship-200',
    name: '6–8 Teams • Championship Pool',
    playerCount: 200,
    targetTeams: '6–8 Teams',
    badge: '6–8 Teams (200 Players)',
    tagline: 'High-Density Capped Specialists',
    description:
      'Designed for 6 to 8 teams. Focuses on top marquee stars and international frontline specialists without roster dilution.',
  },
  {
    id: 'blitz-150',
    name: '4–5 Teams • Blitz Auction Pool',
    playerCount: 150,
    targetTeams: '4–5 Teams',
    badge: '4–5 Teams (150 Players)',
    tagline: 'Pure Superstar Concentration',
    description:
      'Engineered for 4 to 5 teams (100–125 squad capacity + 25 buffer). Every player in the hot seat is a proven elite match-winner.',
  },
];

// Build player index for instant O(1) resolution
const playerByName = new Map<string, Player>();
VERIFIED_PLAYERS.forEach((p) => {
  playerByName.set(p.canonicalName.toLowerCase().trim(), p);
});

// Scoring for ranking remaining players across 5-year IPL performance
function scorePlayer(p: Player): number {
  let s = p.defaultBasePrice / 1000000;
  if (p.currentAffiliation?.franchiseAffiliationStatus === 'RETAINED') s += 100;
  if (p.internationalStatus === 'CAPPED') s += 50;
  s += Math.min((p.stats.runs || 0) * 0.04, 120);
  s += Math.min((p.stats.wickets || 0) * 1.5, 120);
  if ((p.stats.strikeRate || 0) > 135) s += 25;
  if ((p.stats.battingAverage || 0) > 30) s += 20;
  if ((p.stats.wickets || 0) > 20 && (p.stats.economyRate || 10) < 8.2) s += 25;
  return s;
}

const used = new Set<string>();

const MANUAL_SETS: {
  setId: string;
  setName: string;
  category: 'MARQUEE' | 'CAPPED';
  names: string[];
}[] = [
  {
    setId: 'M1',
    setName: 'Set 1: Marquee Superstars (M1)',
    category: 'MARQUEE',
    names: [
      'Virat Kohli',
      'Jasprit Bumrah',
      'Rohit Sharma',
      'Heinrich Klaasen',
      'Travis Head',
      'Pat Cummins',
      'Mitchell Starc',
      'Rishabh Pant',
    ],
  },
  {
    setId: 'M2',
    setName: 'Set 2: Marquee Superstars (M2)',
    category: 'MARQUEE',
    names: [
      'Suryakumar Yadav',
      'Hardik Pandya',
      'Ravindra Jadeja',
      'Andre Russell',
      'Jos Buttler',
      'Rashid Khan',
      'Shreyas Iyer',
      'KL Rahul',
    ],
  },
  {
    setId: 'BA1',
    setName: 'Set 3: Capped Batters (BA1)',
    category: 'CAPPED',
    names: [
      'Shubman Gill',
      'Yashasvi Jaiswal',
      'Ruturaj Gaikwad',
      'Rinku Singh',
      'David Miller',
      'Faf du Plessis',
      'Phil Salt',
      'Devon Conway',
      'Tilak Varma',
      'Sai Sudharsan',
    ],
  },
  {
    setId: 'AL1',
    setName: 'Set 4: Capped All-Rounders (AL1)',
    category: 'CAPPED',
    names: [
      'Sunil Narine',
      'Glenn Maxwell',
      'Axar Patel',
      'Marcus Stoinis',
      'Sam Curran',
      'Liam Livingstone',
      'Washington Sundar',
      'Nitish Kumar Reddy',
      'Mitchell Marsh',
      'Krunal Pandya',
    ],
  },
  {
    setId: 'WK1',
    setName: 'Set 5: Capped Wicketkeepers (WK1)',
    category: 'CAPPED',
    names: [
      'MS Dhoni',
      'Nicholas Pooran',
      'Sanju Samson',
      'Ishan Kishan',
      'Quinton de Kock',
      'Jitesh Sharma',
      'Rahmanullah Gurbaz',
      'Dhruv Jurel',
    ],
  },
  {
    setId: 'FA1',
    setName: 'Set 6: Capped Fast Bowlers (FA1)',
    category: 'CAPPED',
    names: [
      'Mohammed Shami',
      'Mohammed Siraj',
      'Trent Boult',
      'Arshdeep Singh',
      'Anrich Nortje',
      'Matheesha Pathirana',
      'T. Natarajan',
      'Kagiso Rabada',
      'Bhuvneshwar Kumar',
      'Avesh Khan',
    ],
  },
  {
    setId: 'SP1',
    setName: 'Set 7: Capped Spinners (SP1)',
    category: 'CAPPED',
    names: [
      'Yuzvendra Chahal',
      'Kuldeep Yadav',
      'Varun Chakaravarthy',
      'Ravi Bishnoi',
      'Maheesh Theekshana',
      'Wanindu Hasaranga',
      'Noor Ahmad',
      'Rahul Chahar',
    ],
  },
];

const allSets: CuratedSet[] = [];

// Populate manual foundation sets
for (const m of MANUAL_SETS) {
  const pList: Player[] = [];
  for (const n of m.names) {
    const p = playerByName.get(n.toLowerCase());
    if (p && !used.has(p.id)) {
      used.add(p.id);
      pList.push(p);
    }
  }
  allSets.push({ setId: m.setId, setName: m.setName, category: m.category, players: pList });
}

function fillSet(
  setId: string,
  setName: string,
  category: 'MARQUEE' | 'CAPPED' | 'UNCAPPED' | 'DEPTH',
  role: string,
  capped: 'CAPPED' | 'UNCAPPED',
  count: number
) {
  const candidates = VERIFIED_PLAYERS.filter(
    (p) =>
      !used.has(p.id) &&
      p.primaryRole === role &&
      (capped === 'CAPPED'
        ? p.internationalStatus === 'CAPPED'
        : p.internationalStatus === 'UNCAPPED')
  )
    .map((p) => ({ p, s: scorePlayer(p) }))
    .sort((a, b) => b.s - a.s);

  const selected = candidates.slice(0, count).map((c) => c.p);
  selected.forEach((p) => used.add(p.id));
  allSets.push({ setId, setName, category, players: selected });
}

// Sets 8-12: Capped Round 2 (Reaching 108 players)
fillSet('BA2', 'Set 8: Capped Batters (BA2)', 'CAPPED', 'BATTER', 'CAPPED', 10);
fillSet('AL2', 'Set 9: Capped All-Rounders (AL2)', 'CAPPED', 'ALL_ROUNDER', 'CAPPED', 10);
fillSet('WK2', 'Set 10: Capped Wicketkeepers (WK2)', 'CAPPED', 'WICKETKEEPER', 'CAPPED', 8);
fillSet('FA2', 'Set 11: Capped Fast Bowlers (FA2)', 'CAPPED', 'BOWLER', 'CAPPED', 10);
fillSet('SP2', 'Set 12: Capped Spinners (SP2)', 'CAPPED', 'BOWLER', 'CAPPED', 8);

// Sets 13-17: Breakout Uncapped Round 1 (Reaching exactly 150 players for Blitz Pool)
fillSet('UBA1', 'Set 13: Uncapped Batters (UBA1)', 'UNCAPPED', 'BATTER', 'UNCAPPED', 10);
fillSet('UAL1', 'Set 14: Uncapped All-Rounders (UAL1)', 'UNCAPPED', 'ALL_ROUNDER', 'UNCAPPED', 12);
fillSet('UWK1', 'Set 15: Uncapped Wicketkeepers (UWK1)', 'UNCAPPED', 'WICKETKEEPER', 'UNCAPPED', 6);
fillSet('UFA1', 'Set 16: Uncapped Fast Bowlers (UFA1)', 'UNCAPPED', 'BOWLER', 'UNCAPPED', 8);
fillSet('USP1', 'Set 17: Uncapped Spinners (USP1)', 'UNCAPPED', 'BOWLER', 'UNCAPPED', 6);

// Sets 18-23: Capped Round 3 & Uncapped 2 (Reaching exactly 200 players for Championship Pool)
fillSet('BA3', 'Set 18: Capped Batters (BA3)', 'CAPPED', 'BATTER', 'CAPPED', 8);
fillSet('AL3', 'Set 19: Capped All-Rounders (AL3)', 'CAPPED', 'ALL_ROUNDER', 'CAPPED', 12);
fillSet('WK3', 'Set 20: Capped Wicketkeepers (WK3)', 'CAPPED', 'WICKETKEEPER', 'CAPPED', 6);
fillSet('FA3', 'Set 21: Capped Fast Bowlers (FA3)', 'CAPPED', 'BOWLER', 'CAPPED', 12);
fillSet('SP3', 'Set 22: Capped Spinners (SP3)', 'CAPPED', 'BOWLER', 'CAPPED', 6);
fillSet('UBA2', 'Set 23: Uncapped Batters (UBA2)', 'UNCAPPED', 'BATTER', 'UNCAPPED', 6);

// Sets 24-29: Squad Depth, Buffers & Emerging Stars (Reaching exactly 300 players for Mega Pool)
fillSet('BA4', 'Set 24: Capped & Emerging Batters (BA4)', 'DEPTH', 'BATTER', 'CAPPED', 12);
fillSet('AL4', 'Set 25: Capped & Emerging All-Rounders (AL4)', 'DEPTH', 'ALL_ROUNDER', 'CAPPED', 25);
fillSet('FA4', 'Set 26: High-Pace Fast Bowlers (FA4)', 'DEPTH', 'BOWLER', 'CAPPED', 25);
fillSet('SP4', 'Set 27: Spin Specialists (SP4)', 'DEPTH', 'BOWLER', 'CAPPED', 12);
fillSet('WK4', 'Set 28: Reserve Wicketkeepers (WK4)', 'DEPTH', 'WICKETKEEPER', 'CAPPED', 8);
fillSet('RES1', 'Set 29: Emerging Stars & Deep Reserves (RES1)', 'DEPTH', 'ALL_ROUNDER', 'UNCAPPED', 18);

export const CURATED_SETS: CuratedSet[] = allSets;

export interface CuratedPlayerEntry {
  player: Player;
  setGroup: string;
  setName: string;
  category: 'MARQUEE' | 'CAPPED' | 'UNCAPPED' | 'DEPTH';
}

/**
 * Returns the balanced curated pool sequence of players up to the requested pool size.
 * @param requestedSize e.g. 150, 200, or 300 (defaults to 300)
 */
export function getCuratedAuctionPool(requestedSize: number = 300): CuratedPlayerEntry[] {
  const result: CuratedPlayerEntry[] = [];

  for (const set of CURATED_SETS) {
    for (const p of set.players) {
      result.push({
        player: p,
        setGroup: set.setId,
        setName: set.setName,
        category: set.category,
      });
      if (result.length >= requestedSize) {
        return result;
      }
    }
  }

  // If requested size exceeds curated 300, append remaining verified players gracefully
  if (result.length < requestedSize) {
    const existingIds = new Set(result.map((r) => r.player.id));
    for (const p of VERIFIED_PLAYERS) {
      if (!existingIds.has(p.id)) {
        result.push({
          player: p,
          setGroup: 'EXT',
          setName: 'Extended Player Catalog',
          category: 'DEPTH',
        });
        if (result.length >= requestedSize) break;
      }
    }
  }

  return result;
}
