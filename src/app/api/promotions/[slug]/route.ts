import { NextRequest } from 'next/server';
import { promotionAPI } from '@/lib/promotion-api';

export async function GET(_req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await ctx.params;
    const data = await promotionAPI.getPromotionBySlug(slug, ['image', 'bannerImage']);
    return Response.json(data, { status: 200 });
  } catch (e) {
    return Response.json({ error: (e as Error).message || 'Failed to fetch promotion' }, { status: 500 });
  }
}


