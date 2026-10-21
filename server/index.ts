import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';
import { AuctionStore } from '../src/lib/auction-store';
import { getReportFromSupabase } from '../src/lib/supabase';
import { VERIFIED_PLAYERS } from '../src/data/players';

const app = express();
const PORT = process.env.PORT || 10000;

// Enable CORS for Vercel frontends and local dev
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
  : '*';

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

// -------------------------------------------------------------
// Health Check (Render Health Monitor)
// -------------------------------------------------------------
app.get('/health', (_req: Request, res: Response) => {
  const mem = process.memoryUsage();
  res.json({
    status: 'ok',
    service: 'ipl-auction-coordinator',
    uptime: Math.floor(process.uptime()),
    timestamp: Date.now(),
    activeRooms: AuctionStore.getRoomsCount(),
    persistedReports: AuctionStore.getReportsCount(),
    maxConcurrentAllowed: parseInt(process.env.MAX_CONCURRENT_ROOMS || '2', 10),
    memoryMb: {
      rss: Math.round(mem.rss / 1024 / 1024),
      heapUsed: Math.round(mem.heapUsed / 1024 / 1024),
      heapTotal: Math.round(mem.heapTotal / 1024 / 1024),
    },
    planTier: 'Render Free Plan (512MB RAM, 0.1 CPU)',
    storageEngine: 'Single-Instance Persistent Memory + Disk Snapshot + Supabase',
  });
});

// -------------------------------------------------------------
// Player Catalog API
// -------------------------------------------------------------
app.get('/api/players', (req: Request, res: Response) => {
  try {
    const role = (req.query.role as string)?.toUpperCase();
    const overseas = req.query.overseas as string;
    const search = (req.query.search as string)?.toLowerCase();

    let filtered = [...VERIFIED_PLAYERS];

    if (role && ['BATTER', 'BOWLER', 'ALL_ROUNDER', 'WICKETKEEPER'].includes(role)) {
      filtered = filtered.filter((p) => p.primaryRole === role);
    }

    if (overseas === 'true') {
      filtered = filtered.filter((p) => p.isOverseas);
    } else if (overseas === 'false') {
      filtered = filtered.filter((p) => !p.isOverseas);
    }

    if (search) {
      filtered = filtered.filter(
        (p) =>
          p.canonicalName.toLowerCase().includes(search) ||
          p.nationality.toLowerCase().includes(search)
      );
    }

    res.json({
      success: true,
      count: filtered.length,
      players: filtered,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch players' });
  }
});

// -------------------------------------------------------------
// Auction Room Management APIs
// -------------------------------------------------------------

// 1. Create Room
app.post('/api/auction/create', (req: Request, res: Response) => {
  try {
    const { hostDisplayName, config } = req.body || {};
    const { room, hostToken } = AuctionStore.createRoom(
      hostDisplayName || 'Auctioneer',
      config
    );

    res.json({
      success: true,
      roomCode: room.roomCode,
      roomId: room.id,
      hostToken,
      room,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to create room' });
  }
});

// 2. Get Room State
app.get('/api/auction/:code', (req: Request, res: Response) => {
  try {
    const roomCode = String(req.params.code);
    const room = AuctionStore.getRoom(roomCode);

    if (!room) {
      return res.status(404).json({ error: `Room "${roomCode}" not found.` });
    }

    res.json({ success: true, room });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch room state' });
  }
});

// 3. Join Room
app.post('/api/auction/join', (req: Request, res: Response) => {
  try {
    const { roomCode, displayName, sessionToken } = req.body || {};
    if (!roomCode) {
      return res.status(400).json({ error: 'roomCode is required.' });
    }

    const result = AuctionStore.joinRoom(
      roomCode,
      displayName || 'CricketFan',
      sessionToken
    );

    res.json({
      success: true,
      sessionToken: result.sessionToken,
      participant: result.participant,
      room: result.room,
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to join room' });
  }
});

// 4. Select Franchise
app.post('/api/auction/select-franchise', (req: Request, res: Response) => {
  try {
    const { roomCode, sessionToken, franchiseId } = req.body || {};
    if (!roomCode || !sessionToken) {
      return res.status(400).json({ error: 'roomCode and sessionToken are required.' });
    }

    const updatedRoom = AuctionStore.selectFranchise(
      roomCode,
      sessionToken,
      franchiseId || null
    );

    res.json({ success: true, room: updatedRoom });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to select franchise' });
  }
});

// 5. Start Auction
app.post('/api/auction/start', (req: Request, res: Response) => {
  try {
    const { roomCode, sessionToken } = req.body || {};
    if (!roomCode || !sessionToken) {
      return res.status(400).json({ error: 'roomCode and sessionToken are required.' });
    }

    const updatedRoom = AuctionStore.startAuction(roomCode, sessionToken);
    res.json({ success: true, room: updatedRoom });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to start auction' });
  }
});

// 6. Place Bid
app.post('/api/auction/bid', (req: Request, res: Response) => {
  try {
    const { roomCode, sessionToken, franchiseId, amount, commandId } = req.body || {};
    if (!roomCode || !sessionToken || !franchiseId || !amount || !commandId) {
      return res.status(400).json({
        error:
          'Missing required bid parameters (roomCode, sessionToken, franchiseId, amount, commandId).',
      });
    }

    const updatedRoom = AuctionStore.placeBid(
      roomCode,
      sessionToken,
      franchiseId,
      Number(amount),
      String(commandId)
    );

    res.json({ success: true, room: updatedRoom });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Bid rejected' });
  }
});

// 7. Finalize Player (Sell or mark unsold)
app.post('/api/auction/finalize', (req: Request, res: Response) => {
  try {
    const { roomCode, sessionToken } = req.body || {};
    if (!roomCode || !sessionToken) {
      return res.status(400).json({ error: 'roomCode and sessionToken are required.' });
    }

    const updatedRoom = AuctionStore.finalizePlayer(roomCode, sessionToken);
    res.json({ success: true, room: updatedRoom });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to finalize player' });
  }
});

// 8. Skip Player
app.post('/api/auction/skip', (req: Request, res: Response) => {
  try {
    const { roomCode, sessionToken } = req.body || {};
    if (!roomCode || !sessionToken) {
      return res.status(400).json({ error: 'roomCode and sessionToken are required.' });
    }

    const updatedRoom = AuctionStore.skipPlayer(roomCode, sessionToken);
    res.json({ success: true, room: updatedRoom });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to skip player' });
  }
});

// 9. Pause / Resume Timer
app.post('/api/auction/pause', (req: Request, res: Response) => {
  try {
    const { roomCode, sessionToken } = req.body || {};
    if (!roomCode || !sessionToken) {
      return res.status(400).json({ error: 'roomCode and sessionToken are required.' });
    }

    const updatedRoom = AuctionStore.togglePause(roomCode, sessionToken);
    res.json({ success: true, room: updatedRoom });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to toggle pause' });
  }
});

// 10. Conclude Auction Early
app.post('/api/auction/finish', (req: Request, res: Response) => {
  try {
    const { roomCode, sessionToken } = req.body || {};
    if (!roomCode || !sessionToken) {
      return res.status(400).json({ error: 'roomCode and sessionToken are required.' });
    }

    const updatedRoom = AuctionStore.finishAuction(roomCode, sessionToken);
    res.json({ success: true, room: updatedRoom });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to conclude auction' });
  }
});

// -------------------------------------------------------------
// Persistent Analytics Report API
// -------------------------------------------------------------
app.get('/api/reports/:slug', async (req: Request, res: Response) => {
  try {
    const slug = String(req.params.slug);
    let report = AuctionStore.getReport(slug);

    if (!report) {
      report = await getReportFromSupabase(slug);
      if (report) {
        AuctionStore.setReport(slug, report);
      }
    }

    if (!report) {
      return res.status(404).json({
        error: `Report with slug "${slug}" not found or expired.`,
      });
    }

    res.json({ success: true, report });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch report' });
  }
});

// -------------------------------------------------------------
// Authoritative Server-Side Timer Loop (1-Second Tick)
// Checks active rooms and auto-finalizes players when deadlines expire
// -------------------------------------------------------------
setInterval(() => {
  try {
    const now = Date.now();
    const rooms = AuctionStore.getAllRooms();
    for (const room of rooms) {
      if (
        room.status === 'ACTIVE' &&
        room.timerDeadlineAt &&
        now >= room.timerDeadlineAt
      ) {
        // Calling getRoom evaluates autoFinalizeCurrentPlayer internally
        AuctionStore.getRoom(room.roomCode);
      }
    }
  } catch (e) {
    console.error('Timer worker tick exception:', e);
  }
}, 1000);

// Keep-alive heartbeat: ping self every 10 minutes if an auction is currently ACTIVE
// to prevent Render's free tier from sleeping mid-auction
setInterval(() => {
  try {
    const activeRooms = AuctionStore.getAllRooms().filter((r) => r.status === 'ACTIVE');
    const selfUrl = process.env.RENDER_EXTERNAL_URL || process.env.RENDER_BACKEND_URL;
    if (activeRooms.length > 0 && selfUrl) {
      fetch(`${selfUrl.replace(/\/+$/, '')}/health`).catch(() => {});
    }
  } catch {
    // non-fatal
  }
}, 10 * 60 * 1000);

// -------------------------------------------------------------
// Start Persistent Server
// -------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🏏 IPL Auction Arena Backend Coordinator Running`);
  console.log(`Port: ${PORT}`);
  console.log(`Health Check: http://localhost:${PORT}/health`);
  console.log(`Loaded Rooms: ${AuctionStore.getRoomsCount()}`);
  console.log(`Loaded Reports: ${AuctionStore.getReportsCount()}`);
  console.log(`=======================================================`);
});
