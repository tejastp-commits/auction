import { NextRequest, NextResponse } from 'next/server';
import { AuctionStore } from '@/lib/auction-store';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const roomCode = params.code;
    const room = AuctionStore.getRoom(roomCode);

    if (!room) {
      return NextResponse.json(
        { error: `Room "${roomCode}" not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, room });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to fetch room state' },
      { status: 500 }
    );
  }
}
