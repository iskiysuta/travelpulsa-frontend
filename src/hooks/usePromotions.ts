'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { promotionAPI, Promotion, PromotionsResponse } from '@/lib/promotion-api';

interface UsePromotionsOptions {
  autoFetch?: boolean;
  initialFilters?: {
    category?: string;
    isFeatured?: boolean;
    isActive?: boolean;
  };
}

interface UsePromotionsReturn {
  promotions: Promotion[];
  featuredPromotions: Promotion[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  filters: {
    category?: string;
    isFeatured?: boolean;
    isActive?: boolean;
  };
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
  fetchPromotions: (params?: Record<string, unknown>) => Promise<void>;
  fetchFeaturedPromotions: () => Promise<void>;
  setSearchTerm: (term: string) => void;
  setFilters: (filters: Record<string, unknown>) => void;
  clearFilters: () => void;
  refresh: () => Promise<void>;
}

export function usePromotions(options: UsePromotionsOptions = {}): UsePromotionsReturn {
  const { autoFetch = true, initialFilters = {} } = options;
  
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [featuredPromotions, setFeaturedPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState(initialFilters);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 12,
    pageCount: 0,
    total: 0
  });

  const fetchPromotions = useCallback(async (params?: Record<string, unknown>) => {
    setLoading(true);
    setError(null);
    
    try {
      const queryParams = {
        ...params,
        filters: {
          ...filters,
          ...(params?.filters as Record<string, unknown> | undefined)
        },
        pagination: {
          page: pagination.page,
          pageSize: pagination.pageSize,
          ...(params?.pagination as Record<string, unknown> | undefined)
        },
        populate: ['image', 'bannerImage'],
        sort: ['priority:desc', 'createdAt:desc']
      };

      // Prefer same-origin proxy to avoid CORS issues on client
      const sp = new URLSearchParams();
      // filters
      Object.entries(queryParams.filters as Record<string, unknown>).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (typeof value === 'object') {
            Object.entries(value as Record<string, unknown>).forEach(([op, val]) => {
              sp.append(`filters[${key}][${op}]`, String(val));
            });
          } else {
            sp.append(`filters[${key}]`, String(value));
          }
        }
      });
      // sort
      (queryParams.sort as string[]).forEach((s) => sp.append('sort', s));
      // pagination
      sp.append('pagination[page]', String((queryParams.pagination as any).page || 1));
      sp.append('pagination[pageSize]', String((queryParams.pagination as any).pageSize || 12));
      // populate
      sp.append('populate', '*');

      const res = await fetch(`/api/promotions?${sp.toString()}`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const response: PromotionsResponse = await res.json();

      setPromotions(response.data || []);
      setPagination(response.meta?.pagination || { page: 1, pageSize: 12, pageCount: 1, total: (response.data || []).length });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch promotions');
      console.error('Error fetching promotions:', err);
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.page, pagination.pageSize]);

  const fetchFeaturedPromotions = useCallback(async () => {
    try {
      const response: PromotionsResponse = await promotionAPI.getFeaturedPromotions();
      setFeaturedPromotions(response.data);
    } catch (err) {
      console.error('Error fetching featured promotions:', err);
    }
  }, []);

  const handleSetFilters = useCallback((newFilters: Record<string, unknown>) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page when filters change
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({});
    setSearchTerm('');
    setPagination(prev => ({ ...prev, page: 1 }));
  }, []);

  const refresh = useCallback(async () => {
    await Promise.all([
      fetchPromotions(),
      fetchFeaturedPromotions()
    ]);
  }, [fetchPromotions, fetchFeaturedPromotions]);

  // Filter promotions by search term
  const filteredPromotions = useMemo(() => {
    if (!searchTerm) return promotions;
    const term = String(searchTerm || '').toLowerCase();

    return promotions.filter((promotion) => {
      const attrs = promotion?.attributes as Promotion['attributes'];
      const title = String(attrs?.title || '').toLowerCase();
      const description = String(attrs?.description || '').toLowerCase();
      const promoCode = String(attrs?.promoCode || '').toLowerCase();
      const tags: string[] = Array.isArray(attrs?.tags) ? (attrs?.tags as string[]) : [];
      return (
        (title && title.includes(term)) ||
        (description && description.includes(term)) ||
        (promoCode && promoCode.includes(term)) ||
        tags.some((t) => String(t || '').toLowerCase().includes(term))
      );
    });
  }, [promotions, searchTerm]);

  // Auto-fetch on mount and when dependencies change
  useEffect(() => {
    if (autoFetch) {
      fetchPromotions();
      fetchFeaturedPromotions();
    }
  }, [autoFetch, fetchPromotions, fetchFeaturedPromotions]);

  return {
    promotions: filteredPromotions,
    featuredPromotions,
    loading,
    error,
    searchTerm,
    filters,
    pagination,
    fetchPromotions,
    fetchFeaturedPromotions,
    setSearchTerm,
    setFilters: handleSetFilters,
    clearFilters: handleClearFilters,
    refresh
  };
}

// Hook for single promotion
export function usePromotion(id: number) {
  const [promotion, setPromotion] = useState<Promotion | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPromotion = useCallback(async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await promotionAPI.getPromotion(id, ['image', 'bannerImage']);
      setPromotion(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch promotion');
      console.error('Error fetching promotion:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPromotion();
  }, [fetchPromotion]);

  return {
    promotion,
    loading,
    error,
    refetch: fetchPromotion
  };
}

// Hook for promotions by category
export function usePromotionsByCategory(category: string) {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPromotionsByCategory = useCallback(async () => {
    if (!category) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response: PromotionsResponse = await promotionAPI.getPromotionsByCategory(category);
      setPromotions(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch promotions by category');
      console.error('Error fetching promotions by category:', err);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchPromotionsByCategory();
  }, [fetchPromotionsByCategory]);

  return {
    promotions,
    loading,
    error,
    refetch: fetchPromotionsByCategory
  };
}
