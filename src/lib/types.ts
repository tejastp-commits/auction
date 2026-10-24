import { Player } from '@/data/players';
import { Franchise } from '@/data/franchises';
import { TeamEvaluation } from '@/lib/analytics';

export type RoomStatus = 'LOBBY' | 'ACTIVE' | 'PAUSED' | 'COMPLETED';
export type ParticipantRole = 'HOST' | 'OWNER' | 'SPECTATOR';
export type PlayerAuctionStatus =
  | 'PENDING'
  | 'IN_AUCTION'
  | 'SOLD'
  | 'UNSOLD'
  | 'SKIPPED'
  | 'EXCLUDED'
  | 'WITHDRAWN';

export interface RoomConfiguration {
  startingPurse: number;   // default 120 Cr (120,00,00,000)
  minSquadSize: number;    // default 18
  maxSquadSize: number;    // default 25
  maxOverseas: number;     // default 8
  bidTimerSeconds: number; // default 20 (e.g. 5, 10, 15, 20, 30, or custom)
  auctionPoolSize?: number; // default 200 (e.g. 50, 100, 150, 200, or custom)
}

export interface RoomParticipant {
  id: string;
  roomId: string;
  sessionToken: string;
  displayName: string;
  franchiseId: string | null;
  role: ParticipantRole;
  isConnected: boolean;
  joinedAt: string;
}

export interface AuctionPlayerItem {
  id: string;
  roomId: string;
  playerId: string;
  player: Player;
  queuePosition: number;
  status: PlayerAuctionStatus;
  basePrice: number;
  finalPrice: number | null;
  winningFranchiseId: string | null;
  soldAt: string | null;
  setGroup?: string;
  setName?: string;
  nominationRound?: number;
  exclusionReason?: string | null;
  skippedAt?: string | null;
  skippedBy?: string | null;
  lastUpdatedAt?: string;
}

export interface BidRecord {
  id: string;
  roomId: string;
  auctionPlayerId: string;
  franchiseId: string;
  sessionToken: string;
  amount: number;
  commandId: string;
  createdAt: string;
}

export interface FranchiseSquadState {
  franchiseId: string;
  franchise: Franchise;
  startingPurse: number;
  spentAmount: number;
  remainingPurse: number;
  players: {
    player: Player;
    price: number;
    boughtAt: string;
  }[];
  overseasCount: number;
}

export interface AuctionEvent {
  id: string;
  roomId: string;
  sequenceNumber: number;
  eventType: 'ROOM_CREATED' | 'PARTICIPANT_JOINED' | 'FRANCHISE_SELECTED' | 'AUCTION_STARTED' | 'BID_PLACED' | 'TIMER_EXTENDED' | 'PLAYER_SOLD' | 'PLAYER_UNSOLD' | 'AUCTION_PAUSED' | 'AUCTION_RESUMED' | 'AUCTION_COMPLETED';
  payload: Record<string, any>;
  createdAt: string;
}

export interface AuctionRoomState {
  id: string;
  roomCode: string;
  hostSessionToken: string;
  status: RoomStatus;
  config: RoomConfiguration;
  participants: RoomParticipant[];
  queue: AuctionPlayerItem[];
  currentPlayerIndex: number;
  currentBidAmount: number;
  currentBidFranchiseId: string | null;
  timerDeadlineAt: number | null; // epoch ms
  serverTime: number; // current server epoch ms
  squads: Record<string, FranchiseSquadState>;
  recentBids: BidRecord[];
  events: AuctionEvent[];
  reportSlug: string | null;
  createdAt: string;
  completedAt: string | null;
}

export interface AuctionReportData {
  roomCode: string;
  reportSlug: string;
  createdAt: string;
  config: RoomConfiguration;
  rankings: TeamEvaluation[];
  allSquads: Record<string, FranchiseSquadState>;
  allSoldPlayers: {
    player: Player;
    franchiseId: string;
    franchiseName: string;
    price: number;
  }[];
  unsoldPlayers: Player[];
  stats: {
    totalSpent: number;
    totalPlayersSold: number;
    highestBidPlayer: {
      player: Player;
      price: number;
      franchiseId: string;
    } | null;
    mostActiveFranchiseId: string | null;
  };
}
