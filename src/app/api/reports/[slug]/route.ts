import { NextRequest, NextResponse } from 'next/server';
import { AuctionStore } from '@/lib/auction-store';
import { getReportFromSupabase } from '@/lib/supabase';
import { forwardToRender } from '@/lib/forward-backend';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const forwarded = await forwardToRender(req, `/api/reports/${params.slug}`);
    if (forwarded) return forwarded;

    const slug = params.slug;
    let report = AuctionStore.getReport(slug);

    if (!report) {
      report = await getReportFromSupabase(slug);
      if (report) {
        AuctionStore.setReport(slug, report);
      }
    }

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
