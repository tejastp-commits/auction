import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AuctionRoomState, AuctionReportData, BidRecord } from './types';

let cachedClient: SupabaseClient | null = null;
let isConfigLogged = false;

export function getSupabaseClient(): SupabaseClient | null {
  if (cachedClient) return cachedClient;

  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    if (!isConfigLogged) {
      console.warn(
        '⚠️ Supabase credentials not detected (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY). Running in standalone storage mode.'
      );
      isConfigLogged = true;
    }
    return null;
  }

  try {
    cachedClient = createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
    return cachedClient;
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
    return null;
  }
}

export function isSupabaseConfigured(): boolean {
  return getSupabaseClient() !== null;
}

/**
 * Persists an auction room state and denormalized snapshots into Supabase
 */
export async function persistRoomToSupabase(room: AuctionRoomState): Promise<boolean> {
  const supabase = getSupabaseClient();
  if (!supabase) return false;

  try {
    // 1. Upsert auction_room
    const { error: roomErr } = await supabase.from('auction_rooms').upsert(
      {
        id: room.id,
        room_code: room.roomCode,
        host_session_token: room.hostSessionToken,
        status: room.status,
        starting_purse: room.config.startingPurse,
        min_squad_size: room.config.minSquadSize,
        max_squad_size: room.config.maxSquadSize,
        max_overseas: room.config.maxOverseas,
        bid_timer_seconds: room.config.bidTimerSeconds,
        current_player_index: room.currentPlayerIndex,
        current_bid_amount: room.currentBidAmount,
        current_bid_franchise_id: room.currentBidFranchiseId,
        timer_deadline_at: room.timerDeadlineAt,
        started_at: room.status !== 'LOBBY' ? room.createdAt : null,
        completed_at: room.completedAt,
      },
      { onConflict: 'id' }
    );

    if (roomErr) {
      console.error('Supabase room upsert error:', roomErr.message);
    }

    // 2. Upsert participants
    if (room.participants && room.participants.length > 0) {
      const participantRows = room.participants.map((p) => ({
        id: p.id,
        room_id: room.id,
        session_token: p.sessionToken,
        display_name: p.displayName,
        franchise_id: p.franchiseId,
        role: p.role,
        is_connected: p.isConnected,
        joined_at: p.joinedAt,
      }));

      await supabase.from('room_participants').upsert(participantRows, {
        onConflict: 'id',
      });
    }

    // 3. Upsert franchise squad ledgers
    if (room.squads) {
      const squadRows = Object.values(room.squads).map((sq) => ({
        room_id: room.id,
        franchise_id: sq.franchiseId,
        starting_purse: sq.startingPurse,
        spent_amount: sq.spentAmount,
        remaining_purse: sq.remainingPurse,
        player_count: sq.players.length,
        overseas_count: sq.overseasCount,
      }));

      await supabase.from('franchise_squads').upsert(squadRows, {
        onConflict: 'room_id,franchise_id',
      });
    }

    return true;
  } catch (err: any) {
    console.error('persistRoomToSupabase exception:', err?.message || err);
    return false;
  }
}

/**
 * Persists an immutable bid record into Supabase
 */
export async function persistBidToSupabase(
  roomId: string,
  auctionPlayerId: string,
  bid: BidRecord
): Promise<boolean> {
  const supabase = getSupabaseClient();
  if (!supabase) return false;

  try {
    const { error } = await supabase.from('bids').upsert(
      {
        room_id: roomId,
        auction_player_id: auctionPlayerId,
        franchise_id: bid.franchiseId,
        session_token: bid.sessionToken || 'system',
        amount: bid.amount,
        command_id: bid.commandId,
        created_at: bid.createdAt,
      },
      { onConflict: 'command_id' }
    );

    if (error) {
      console.error('Supabase bid insert error:', error.message);
      return false;
    }
    return true;
  } catch (err: any) {
    console.error('persistBidToSupabase exception:', err?.message || err);
    return false;
  }
}

/**
 * Persists a permanent final analytical report into Supabase
 */
export async function persistReportToSupabase(
  report: AuctionReportData,
  roomId?: string
): Promise<boolean> {
  const supabase = getSupabaseClient();
  if (!supabase) return false;

  try {
    const { error } = await supabase.from('auction_reports').upsert(
      {
        room_id: roomId || null,
        public_slug: report.reportSlug,
        report_version: '1.0.0',
        analytics_version: '100-point-v1',
        report_data: report,
      },
      { onConflict: 'public_slug' }
    );

    if (error) {
      console.error('Supabase report upsert error:', error.message);
      return false;
    }
    return true;
  } catch (err: any) {
    console.error('persistReportToSupabase exception:', err?.message || err);
    return false;
  }
}

/**
 * Retrieves a report snapshot from Supabase if not found in memory
 */
export async function getReportFromSupabase(
  slug: string
): Promise<AuctionReportData | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('auction_reports')
      .select('report_data')
      .eq('public_slug', slug)
      .single();

    if (error || !data) return null;
    return data.report_data as AuctionReportData;
  } catch {
    return null;
  }
}
