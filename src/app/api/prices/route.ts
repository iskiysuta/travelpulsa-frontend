/*
  Cached proxy for external prices source (otoreport).
  - Validates `src` to only allow the expected host/path
  - Applies a 10s fetch timeout and caches successful responses for 10 minutes
*/

const DEFAULT_URL = 'https://travelpulsa.otoreport.com/harga.js.php?id=261961d19c9819d08d948c082d00d388b28ab658b5c14471ad51c430420be8496b27cde0959069b42b00ba2fc9017dc6-206';

function sanitizeSourceUrl(candidate?: string | null): string {
  if (!candidate) return DEFAULT_URL;
  try {
    const decoded = decodeURIComponent(candidate);
    const url = new URL(decoded);
    const isValidHost = url.protocol === 'https:' && url.hostname === 'travelpulsa.otoreport.com';
    const isValidPath = url.pathname === '/harga.js.php';
    return isValidHost && isValidPath ? url.toString() : DEFAULT_URL;
  } catch {
    return DEFAULT_URL;
  }
}

async function fetchWithTimeout(url: string, timeoutMs: number): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      // Cache upstream for 10 minutes; Next.js can reuse this across requests
      next: { revalidate: 600 },
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`Upstream responded ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const srcParam = searchParams.get('src');
  const SOURCE_URL = sanitizeSourceUrl(srcParam);

  try {
    const text = await fetchWithTimeout(SOURCE_URL, 10000); // 10s budget on API layer
    return new Response(text, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        // Allow edge/CDN/proxy caching for 10 minutes
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=60',
      },
    });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 502 });
  }
}




