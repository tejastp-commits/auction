import { NextRequest, NextResponse } from 'next/server';
import { AuctionStore } from '@/lib/auction-store';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { roomCode, displayName, sessionToken } = body;

    if (!roomCode) {
      return NextResponse.json(
        { error: 'Room code is required.' },
        { status: 400 }
      );
    }

    const result = AuctionStore.joinRoom(roomCode, displayName, sessionToken);

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to join room' },
      { status: 400 }
    );
  }
}
