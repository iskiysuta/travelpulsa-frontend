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
  fetchPromotions: (params?: any) => Promise<void>;
  fetchFeaturedPromotions: () => Promise<void>;
  setSearchTerm: (term: string) => void;
  setFilters: (filters: any) => void;
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

  const fetchPromotions = useCallback(async (params?: any) => {
    setLoading(true);
    setError(null);
    
    try {
      const queryParams = {
        ...params,
        filters: {
          ...filters,
          ...params?.filters
        },
        pagination: {
          page: pagination.page,
          pageSize: pagination.pageSize,
          ...params?.pagination
        },
        populate: ['image', 'bannerImage'],
        sort: ['priority:desc', 'createdAt:desc']
      };

      const response: PromotionsResponse = await promotionAPI.getPromotions(queryParams);
      
      setPromotions(response.data);
      setPagination(response.meta.pagination);
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

  const handleSetFilters = useCallback((newFilters: any) => {
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
    
    const term = searchTerm.toLowerCase();
    return promotions.filter(promotion => 
      promotion.attributes.title.toLowerCase().includes(term) ||
      promotion.attributes.description.toLowerCase().includes(term) ||
      promotion.attributes.promoCode?.toLowerCase().includes(term) ||
      promotion.attributes.tags?.some(tag => tag.toLowerCase().includes(term))
    );
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
