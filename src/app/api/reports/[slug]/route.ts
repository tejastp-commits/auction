import { NextRequest, NextResponse } from 'next/server';
import { AuctionStore } from '@/lib/auction-store';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const report = AuctionStore.getReport(slug);

    if (!report) {
      return NextResponse.json(
        { error: `Report with slug "${slug}" not found or expired.` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      report,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to fetch report' },
      { status: 500 }
    );
  }
}
