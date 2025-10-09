import { NextRequest } from 'next/server';
import { promotionAPI } from '@/lib/promotion-api';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Build params object from query string
    const filters: Record<string, unknown> = {};
    const sort: string[] = [];
    const pagination: { page?: number; pageSize?: number } = {};
    const populate: string[] = [];

    // Map known params
    searchParams.forEach((value, key) => {
      if (key.startsWith('filters[')) {
        // Keep raw filter keys for Strapi
        const filterKey = key.slice(8, -1);
        filters[filterKey] = value;
      } else if (key === 'sort') {
        sort.push(value);
      } else if (key === 'pagination[page]') {
        pagination.page = Number(value);
      } else if (key === 'pagination[pageSize]') {
        pagination.pageSize = Number(value);
      } else if (key === 'populate') {
        populate.push(value);
      }
    });

    const data = await promotionAPI.getPromotions({ filters, sort, pagination, populate });
    return Response.json(data, { status: 200 });
  } catch (e) {
    return Response.json({ error: (e as Error).message || 'Failed to fetch promotions' }, { status: 500 });
  }
}


