import { NextRequest, NextResponse } from 'next/server';
import { AuctionStore } from '@/lib/auction-store';
import { forwardToRender } from '@/lib/forward-backend';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const forwarded = await forwardToRender(req, `/api/auction/${params.code}`);
    if (forwarded) return forwarded;

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
