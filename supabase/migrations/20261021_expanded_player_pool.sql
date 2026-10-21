-- Migration: Expanded Player Pool & Operational State Machine
-- Version: 2.0.0

-- 1. Extend players table with enriched metadata
ALTER TABLE players
  ADD COLUMN IF NOT EXISTS full_name TEXT,
  ADD COLUMN IF NOT EXISTS normalized_name TEXT,
  ADD COLUMN IF NOT EXISTS short_display_name TEXT,
  ADD COLUMN IF NOT EXISTS international_status TEXT,
  ADD COLUMN IF NOT EXISTS state_association TEXT,
  ADD COLUMN IF NOT EXISTS international_career_summary TEXT,
  ADD COLUMN IF NOT EXISTS official_profile_url TEXT;

-- 2. Player Auction History (Separate collection per Section 3)
CREATE TABLE IF NOT EXISTS player_auction_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id TEXT NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  auction_season TEXT NOT NULL,
  auction_date DATE,
  auction_type TEXT NOT NULL,
  auction_status TEXT NOT NULL,
  reserve_price BIGINT NOT NULL,
  final_sold_price BIGINT,
  currency TEXT DEFAULT 'INR',
  purchasing_franchise TEXT,
  purchasing_franchise_id TEXT,
  bidding_order_or_set TEXT,
  source_url TEXT,
  source_document_title TEXT,
  source_publication_date DATE,
  verification_status TEXT DEFAULT 'VERIFIED_OFFICIAL',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_auction_history_player ON player_auction_history(player_id);
CREATE INDEX IF NOT EXISTS idx_auction_history_season ON player_auction_history(auction_season);

-- 3. Player Current Affiliations & Availability (Section 3)
CREATE TABLE IF NOT EXISTS player_current_affiliations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id TEXT UNIQUE NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  latest_confirmed_franchise TEXT,
  latest_confirmed_franchise_id TEXT,
  franchise_affiliation_status TEXT NOT NULL,
  latest_confirmed_squad_season TEXT NOT NULL,
  latest_auction_status TEXT NOT NULL,
  available_for_custom_auction BOOLEAN DEFAULT TRUE,
  availability_last_verified_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Data Sources & Provenance Audit (Section 4)
CREATE TABLE IF NOT EXISTS data_sources (
  id TEXT PRIMARY KEY,
  source_url TEXT UNIQUE NOT NULL,
  source_title TEXT NOT NULL,
  publisher TEXT NOT NULL,
  publication_date DATE,
  retrieved_at TIMESTAMPTZ DEFAULT NOW(),
  source_type TEXT NOT NULL,
  fields_supported TEXT[],
  verification_status TEXT DEFAULT 'VERIFIED_OFFICIAL'
);

CREATE TABLE IF NOT EXISTS data_import_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_name TEXT NOT NULL,
  records_processed INT NOT NULL,
  records_imported INT NOT NULL,
  records_updated INT NOT NULL,
  records_flagged INT NOT NULL,
  executed_at TIMESTAMPTZ DEFAULT NOW(),
  provenance_summary JSONB
);

-- 5. Expand auction_players table with operational pool states (Section 5)
ALTER TABLE auction_players
  DROP CONSTRAINT IF EXISTS auction_players_status_check;

ALTER TABLE auction_players
  ADD CONSTRAINT auction_players_status_check
  CHECK (status IN ('PENDING', 'IN_AUCTION', 'SOLD', 'UNSOLD', 'SKIPPED', 'EXCLUDED', 'WITHDRAWN'));

ALTER TABLE auction_players
  ADD COLUMN IF NOT EXISTS nomination_round INT DEFAULT 1,
  ADD COLUMN IF NOT EXISTS exclusion_reason TEXT,
  ADD COLUMN IF NOT EXISTS skipped_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS skipped_by TEXT,
  ADD COLUMN IF NOT EXISTS last_updated_at TIMESTAMPTZ DEFAULT NOW();
