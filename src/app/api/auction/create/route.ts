import { NextRequest, NextResponse } from 'next/server';
import { AuctionStore } from '@/lib/auction-store';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { hostDisplayName, config } = body;

    const { room, hostToken } = AuctionStore.createRoom(
      hostDisplayName || 'Auctioneer',
      config
    );

    return NextResponse.json({
      success: true,
      roomCode: room.roomCode,
      roomId: room.id,
      hostToken,
      room,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to create room' },
      { status: 500 }
    );
  }
}
