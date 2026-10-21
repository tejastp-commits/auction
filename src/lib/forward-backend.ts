import { NextRequest, NextResponse } from 'next/server';

/**
 * Forwards an incoming Next.js API request to the persistent Render backend coordinator
 * if RENDER_BACKEND_URL is configured.
 */
export async function forwardToRender(
  req: NextRequest,
  targetPath: string
): Promise<NextResponse | null> {
  const backendUrl =
    process.env.RENDER_BACKEND_URL ||
    process.env.BACKEND_API_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!backendUrl) return null;

  try {
    const sanitized = backendUrl.replace(/\/+$/, '');
    const searchParams = req.nextUrl.search || '';
    const fullTargetUrl = `${sanitized}${targetPath}${searchParams}`;

    const headers: Record<string, string> = {
      'Content-Type': req.headers.get('content-type') || 'application/json',
    };

    const fetchOptions: RequestInit = {
      method: req.method,
      headers,
      cache: 'no-store',
    };

    if (req.method !== 'GET' && req.method !== 'HEAD') {
      const rawBody = await req.text();
      if (rawBody) {
        fetchOptions.body = rawBody;
      }
    }

    const res = await fetch(fullTargetUrl, fetchOptions);
    const data = await res.json().catch(() => ({}));

    return NextResponse.json(data, {
      status: res.status,
    });
  } catch (err: any) {
    console.error(`forwardToRender failed for ${targetPath}:`, err?.message || err);
    return null;
  }
}
