-- IPL Auction Arena: Normalized PostgreSQL Schema Migration
-- Version: 1.0.0

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. FRANCHISES
CREATE TABLE IF NOT EXISTS franchises (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  logo_url TEXT,
  primary_color TEXT NOT NULL,
  secondary_color TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PLAYERS (Verified IPL Player Catalog)
CREATE TABLE IF NOT EXISTS players (
  id TEXT PRIMARY KEY,
  canonical_name TEXT NOT NULL,
  date_of_birth DATE,
  calculated_age INT,
  nationality TEXT NOT NULL,
  is_overseas BOOLEAN DEFAULT FALSE,
  primary_role TEXT NOT NULL CHECK (primary_role IN ('BATTER', 'BOWLER', 'ALL_ROUNDER', 'WICKETKEEPER')),
  secondary_role TEXT,
  batting_style TEXT,
  bowling_style TEXT,
  bowling_type TEXT CHECK (bowling_type IN ('PACE', 'SPIN', 'NONE')),
  profile_summary TEXT,
  data_completeness TEXT DEFAULT 'VERIFIED_HISTORICAL',
  image_url TEXT,
  default_base_price BIGINT NOT NULL DEFAULT 20000000,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PLAYER SEASON & CAREER STATS
CREATE TABLE IF NOT EXISTS player_season_stats (
  id TEXT PRIMARY KEY,
  player_id TEXT NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  season_range TEXT NOT NULL,
  matches INT DEFAULT 0,
  innings INT DEFAULT 0,
  runs INT DEFAULT 0,
  batting_average NUMERIC(6,2),
  strike_rate NUMERIC(6,2),
  fifties INT DEFAULT 0,
  hundreds INT DEFAULT 0,
  highest_score TEXT,
  wickets INT DEFAULT 0,
  bowling_average NUMERIC(6,2),
  economy_rate NUMERIC(6,2),
  best_bowling TEXT,
  catches INT DEFAULT 0,
  stumpings INT DEFAULT 0,
  provenance TEXT DEFAULT 'Official IPL Historical Archives'
);

-- 4. AUCTION ROOMS
CREATE TABLE IF NOT EXISTS auction_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_code TEXT UNIQUE NOT NULL,
  host_session_token TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('LOBBY', 'ACTIVE', 'PAUSED', 'COMPLETED')) DEFAULT 'LOBBY',
  starting_purse BIGINT NOT NULL DEFAULT 1200000000,
  min_squad_size INT NOT NULL DEFAULT 18,
  max_squad_size INT NOT NULL DEFAULT 25,
  max_overseas INT NOT NULL DEFAULT 8,
  bid_timer_seconds INT NOT NULL DEFAULT 20,
  current_player_index INT NOT NULL DEFAULT 0,
  current_bid_amount BIGINT NOT NULL DEFAULT 0,
  current_bid_franchise_id TEXT,
  timer_deadline_at BIGINT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ
);

-- 5. ROOM PARTICIPANTS
CREATE TABLE IF NOT EXISTS room_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID NOT NULL REFERENCES auction_rooms(id) ON DELETE CASCADE,
  session_token TEXT NOT NULL,
  display_name TEXT NOT NULL,
  franchise_id TEXT,
  role TEXT NOT NULL CHECK (role IN ('HOST', 'OWNER', 'SPECTATOR')) DEFAULT 'OWNER',
  is_connected BOOLEAN DEFAULT TRUE,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_room_session UNIQUE (room_id, session_token),
  CONSTRAINT unique_room_franchise UNIQUE (room_id, franchise_id)
);

-- 6. AUCTION PLAYERS (Room Queue)
CREATE TABLE IF NOT EXISTS auction_players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID NOT NULL REFERENCES auction_rooms(id) ON DELETE CASCADE,
  player_id TEXT NOT NULL REFERENCES players(id),
  queue_position INT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('PENDING', 'IN_AUCTION', 'SOLD', 'UNSOLD')) DEFAULT 'PENDING',
  base_price BIGINT NOT NULL,
  final_price BIGINT,
  winning_franchise_id TEXT,
  sold_at TIMESTAMPTZ,
  CONSTRAINT unique_room_queue_pos UNIQUE (room_id, queue_position)
);

-- 7. BIDS (Immutable Transaction Log)
CREATE TABLE IF NOT EXISTS bids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID NOT NULL REFERENCES auction_rooms(id) ON DELETE CASCADE,
  auction_player_id UUID NOT NULL REFERENCES auction_players(id) ON DELETE CASCADE,
  franchise_id TEXT NOT NULL,
  session_token TEXT NOT NULL,
  amount BIGINT NOT NULL,
  command_id TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. FRANCHISE SQUADS (Denormalized Balance Cache & Accounting)
CREATE TABLE IF NOT EXISTS franchise_squads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID NOT NULL REFERENCES auction_rooms(id) ON DELETE CASCADE,
  franchise_id TEXT NOT NULL,
  starting_purse BIGINT NOT NULL,
  spent_amount BIGINT NOT NULL DEFAULT 0,
  remaining_purse BIGINT NOT NULL,
  player_count INT NOT NULL DEFAULT 0,
  overseas_count INT NOT NULL DEFAULT 0,
  CONSTRAINT unique_room_franchise_squad UNIQUE (room_id, franchise_id),
  CONSTRAINT non_negative_remaining_purse CHECK (remaining_purse >= 0)
);

-- 9. AUCTION EVENTS (Audit Trail)
CREATE TABLE IF NOT EXISTS auction_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID NOT NULL REFERENCES auction_rooms(id) ON DELETE CASCADE,
  sequence_number BIGINT NOT NULL,
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. AUCTION REPORTS (Persistent Frozen Snapshots)
CREATE TABLE IF NOT EXISTS auction_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID NOT NULL REFERENCES auction_rooms(id) ON DELETE CASCADE,
  public_slug TEXT UNIQUE NOT NULL,
  report_version TEXT NOT NULL DEFAULT '1.0.0',
  analytics_version TEXT NOT NULL DEFAULT '100-point-v1',
  report_data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES for fast lookup
CREATE INDEX IF NOT EXISTS idx_auction_rooms_code ON auction_rooms(room_code);
CREATE INDEX IF NOT EXISTS idx_room_participants_room ON room_participants(room_id);
CREATE INDEX IF NOT EXISTS idx_auction_players_room ON auction_players(room_id, queue_position);
CREATE INDEX IF NOT EXISTS idx_bids_player ON bids(auction_player_id, amount DESC);
CREATE INDEX IF NOT EXISTS idx_franchise_squads_room ON franchise_squads(room_id);
CREATE INDEX IF NOT EXISTS idx_auction_reports_slug ON auction_reports(public_slug);
