// Import mock data for fallback
import { mockPromotionsResponse, mockFeaturedPromotions } from './mock-promotions';

const RAW_STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
// Normalize to always include trailing /api for REST endpoints
const API_BASE_URL = RAW_STRAPI_URL.endsWith('/api')
  ? RAW_STRAPI_URL
  : `${RAW_STRAPI_URL.replace(/\/+$/, '')}/api`;
const USE_MOCK_DATA = process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

export interface Promotion {
  id: number;
  attributes: {
    title: string;
    slug: string;
    description: string;
    content: string;
    category: 'flash-sale' | 'discount' | 'cashback' | 'bonus' | 'general' | 'seasonal' | 'referral';
    promoCode?: string;
    discountType?: 'percentage' | 'fixed-amount' | 'free-shipping' | 'bonus-item';
    discountValue?: number;
    minimumPurchase?: number;
    maximumDiscount?: number;
    startDate: string;
    endDate: string;
    isActive: boolean;
    isFeatured: boolean;
    priority: number;
    termsAndConditions?: string;
    targetAudience: 'all-users' | 'new-users' | 'existing-users' | 'vip-users';
    usageLimit?: number;
    usedCount: number;
    tags?: string[];
    externalLink?: string;
    isExternal: boolean;
    image?: {
      data?: {
        attributes: {
          url: string;
          alternativeText?: string;
        };
      };
    };
    bannerImage?: {
      data?: {
        attributes: {
          url: string;
          alternativeText?: string;
        };
      };
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface PromotionsResponse {
  data: Promotion[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface SinglePromotionResponse {
  data: Promotion;
  meta: {};
}

class PromotionAPI {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Resolve media URL from various Strapi shapes (v4/v5, single/relational)
  getMediaPath(media: any): string | null {
    if (!media) return null;
    if (typeof media === 'string') return media;
    const fromData = media?.data?.attributes?.url;
    const fromAttributes = media?.attributes?.url;
    const direct = media?.url;
    return fromData || fromAttributes || direct || null;
  }

  getAbsoluteMediaUrl(media: any): string | null {
    const path = this.getMediaPath(media);
    if (!path) return null;
    const mediaBase = RAW_STRAPI_URL.replace(/\/api\/?$/, '');
    return `${mediaBase}${path}`;
  }
  private addPopulate(params: URLSearchParams, fields?: string[]) {
    if (!fields || fields.length === 0) return;
    fields.forEach((f) => params.append(`populate[${f}]`, '*'));
  }

  // Normalize Strapi v5 responses to ensure attributes shape
  private normalizePromotion(raw: any): Promotion {
    if (!raw) {
      return {
        id: 0,
        attributes: {
          title: '', slug: '', description: '', content: '', category: 'general',
          isActive: false, isFeatured: false, priority: 0,
          startDate: new Date(0).toISOString(), endDate: new Date(0).toISOString(),
          usedCount: 0, isExternal: false, createdAt: new Date(0).toISOString(),
          updatedAt: new Date(0).toISOString(), publishedAt: new Date(0).toISOString()
        }
      } as Promotion;
    }
    // Strapi usual shape: { id, attributes }
    if (raw.attributes) {
      return raw as Promotion;
    }
    // Some endpoints/seed may return flattened fields
    const {
      id = raw.id ?? 0,
      title = '', slug = '', description = '', content = '', category = 'general',
      promoCode, discountType, discountValue, minimumPurchase, maximumDiscount,
      startDate, endDate, isActive = false, isFeatured = false, priority = 0,
      termsAndConditions, targetAudience = 'all-users', usageLimit, usedCount = 0,
      tags, externalLink, isExternal = false, image, bannerImage,
      createdAt = new Date(0).toISOString(), updatedAt = new Date(0).toISOString(),
      publishedAt = new Date(0).toISOString(), documentId
    } = raw;

    // Ensure a usable slug
    const safeSlug = (slug && String(slug).trim().length > 0)
      ? String(slug)
      : (title
          ? String(title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
          : `promo-${id || Date.now()}`);

    return {
      id,
      attributes: {
        title, slug: safeSlug, description, content,
        category: category as Promotion['attributes']['category'],
        promoCode, discountType: discountType as Promotion['attributes']['discountType'], discountValue,
        minimumPurchase, maximumDiscount,
        startDate: startDate ?? createdAt, endDate: endDate ?? publishedAt,
        isActive, isFeatured, priority,
        termsAndConditions, targetAudience: targetAudience as Promotion['attributes']['targetAudience'], usageLimit,
        usedCount, tags, externalLink, isExternal,
        image, bannerImage,
        createdAt, updatedAt, publishedAt
      }
    } as Promotion;
  }

  private async fetchAPI(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        
        try {
          const errorData = await response.json();
          if (errorData.error) {
            errorMessage += ` - ${errorData.error.message || errorData.error}`;
          }
        } catch (e) {
          // If response is not JSON, use status text
          errorMessage += ` - ${response.statusText}`;
        }
        
        throw new Error(errorMessage);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', {
        url,
        error: error instanceof Error ? error.message : String(error),
        status: (error as any)?.status
      });
      throw error;
    }
  }

  // Get all promotions with optional filters
  async getPromotions(params?: {
    filters?: Record<string, any>;
    sort?: string[];
    pagination?: {
      page?: number;
      pageSize?: number;
    };
    populate?: string[];
  }): Promise<PromotionsResponse> {
    // Use mock data if enabled or if API fails
    if (USE_MOCK_DATA) {
      console.log('Using mock data for promotions');
      return mockPromotionsResponse;
    }

    const searchParams = new URLSearchParams();
    
    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          Object.entries(value).forEach(([op, val]) => {
            searchParams.append(`filters[${key}][${op}]`, String(val));
          });
        } else {
          searchParams.append(`filters[${key}]`, String(value));
        }
      });
    }
    
    if (params?.sort) {
      params.sort.forEach(sort => {
        searchParams.append('sort', sort);
      });
    }
    
    if (params?.pagination) {
      if (params.pagination.page) {
        searchParams.append('pagination[page]', params.pagination.page.toString());
      }
      if (params.pagination.pageSize) {
        searchParams.append('pagination[pageSize]', params.pagination.pageSize.toString());
      }
    }
    
    // Populate all relations/media to avoid key issues
    searchParams.append('populate', '*');

    const queryString = searchParams.toString();
    const endpoint = `/promotions${queryString ? `?${queryString}` : ''}`;
    
    try {
      const json = await this.fetchAPI(endpoint);
      // Normalize list shape
      const normalized = Array.isArray(json?.data) ? json.data.map((p: any) => this.normalizePromotion(p)) : [];
      return { data: normalized, meta: json?.meta } as PromotionsResponse;
    } catch (error) {
      if (USE_MOCK_DATA) {
        console.warn('API failed, using mock data:', error instanceof Error ? error.message : String(error));
        return mockPromotionsResponse;
      }
      throw error;
    }
  }

  // Get single promotion by ID
  async getPromotion(id: number, populate?: string[]): Promise<SinglePromotionResponse> {
    const searchParams = new URLSearchParams();
    
    if (populate) searchParams.append('populate', '*');

    const queryString = searchParams.toString();
    const endpoint = `/promotions/${id}${queryString ? `?${queryString}` : ''}`;
    
    const json = await this.fetchAPI(endpoint);
    const normalized = this.normalizePromotion(json?.data);
    return { data: normalized, meta: json?.meta } as SinglePromotionResponse;
  }

  // Get single promotion by slug
  async getPromotionBySlug(slug: string, populate?: string[]): Promise<SinglePromotionResponse> {
    const searchParams = new URLSearchParams();
    searchParams.append('filters[slug][$eq]', slug);
    searchParams.append('populate', '*');
    const queryString = searchParams.toString();
    const json = await this.fetchAPI(`/promotions?${queryString}`);
    const first = Array.isArray(json?.data) && json.data.length > 0 ? json.data[0] : null;
    const normalized = first ? this.normalizePromotion(first) : undefined;
    return { data: normalized as unknown as Promotion, meta: json?.meta } as SinglePromotionResponse;
  }

  // Get featured promotions (use filters instead of custom route for portability)
  async getFeaturedPromotions(): Promise<PromotionsResponse> {
    if (USE_MOCK_DATA) {
      console.log('Using mock data for featured promotions');
      return mockFeaturedPromotions;
    }

    try {
      const params = new URLSearchParams();
      params.append('filters[isFeatured][$eq]', 'true');
      params.append('filters[isActive][$eq]', 'true');
      params.append('sort', 'priority:desc');
      params.append('sort', 'createdAt:desc');
      params.append('populate', '*');
      const json = await this.fetchAPI(`/promotions?${params.toString()}`);
      const normalized = Array.isArray(json?.data) ? json.data.map((p: any) => this.normalizePromotion(p)) : [];
      return { data: normalized, meta: json?.meta } as PromotionsResponse;
    } catch (error) {
      if (USE_MOCK_DATA) {
        console.warn('API failed, using mock data for featured promotions:', error instanceof Error ? error.message : String(error));
        return mockFeaturedPromotions;
      }
      throw error;
    }
  }

  // Get active promotions (use filters instead of custom route)
  async getActivePromotions(): Promise<PromotionsResponse> {
    const params = new URLSearchParams();
    const nowIso = new Date().toISOString();
    params.append('filters[isActive][$eq]', 'true');
    // Strapi v5 uses $lte/$gte operators on datetime
    params.append('filters[startDate][$lte]', nowIso);
    params.append('filters[endDate][$gte]', nowIso);
    params.append('sort', 'priority:desc');
    params.append('sort', 'createdAt:desc');
    params.append('populate', '*');
    const json = await this.fetchAPI(`/promotions?${params.toString()}`);
    const normalized = Array.isArray(json?.data) ? json.data.map((p: any) => this.normalizePromotion(p)) : [];
    return { data: normalized, meta: json?.meta } as PromotionsResponse;
  }

  // Get promotions by category
  async getPromotionsByCategory(category: string): Promise<PromotionsResponse> {
    return this.fetchAPI(`/promotions/category/${category}?populate=image,bannerImage`);
  }

  // Get promotions with custom filters
  async getPromotionsWithFilters(filters: {
    isActive?: boolean;
    isFeatured?: boolean;
    category?: string;
    targetAudience?: string;
  }): Promise<PromotionsResponse> {
    const searchParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(`filters[${key}]`, value.toString());
      }
    });
    
    searchParams.append('populate', 'image,bannerImage');
    searchParams.append('sort', 'priority:desc,createdAt:desc');

    const queryString = searchParams.toString();
    return this.fetchAPI(`/promotions?${queryString}`);
  }

  // Check if promotion is currently active
  isPromotionActive(promotion: Promotion): boolean {
    const attrs = promotion?.attributes as Promotion['attributes'];
    if (!attrs || attrs.isActive !== true) {
      return false;
    }

    const startMs = attrs.startDate ? Date.parse(attrs.startDate) : NaN;
    const endMs = attrs.endDate ? Date.parse(attrs.endDate) : NaN;
    if (Number.isNaN(startMs) || Number.isNaN(endMs)) {
      return false;
    }

    const nowMs = Date.now();
    return nowMs >= startMs && nowMs <= endMs;
  }

  // Get remaining days for promotion
  getRemainingDays(promotion: Promotion): number {
    const attrs = promotion?.attributes as Promotion['attributes'];
    if (!attrs?.endDate) {
      return 0;
    }
    const endMs = Date.parse(attrs.endDate);
    if (Number.isNaN(endMs)) {
      return 0;
    }
    const diffTime = endMs - Date.now();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  }

  // Format discount value for display
  formatDiscountValue(promotion: Promotion): string {
    const attrs = promotion?.attributes as Promotion['attributes'] | undefined;
    if (!attrs) return 'Special';
    const { discountType, discountValue } = attrs;
    if (!discountType || discountValue == null) return 'Special';
    
    switch (discountType) {
      case 'percentage':
        return `${discountValue}%`;
      case 'fixed-amount':
        return `Rp ${Number(discountValue).toLocaleString('id-ID')}`;
      case 'free-shipping':
        return 'Gratis Ongkir';
      case 'bonus-item':
        return 'Bonus Item';
      default:
        return 'Special';
    }
  }

  // Get category display name
  getCategoryDisplayName(category?: string): string {
    const categoryMap: Record<string, string> = {
      'flash-sale': 'Flash Sale',
      'discount': 'Diskon',
      'cashback': 'Cashback',
      'bonus': 'Bonus',
      'general': 'Umum',
      'seasonal': 'Musiman',
      'referral': 'Referral'
    };
    
    const key = category ?? 'general';
    return categoryMap[key] || 'Promo';
  }

  // Get category color classes
  getCategoryColorClasses(category?: string): string {
    const colorMap: Record<string, string> = {
      'flash-sale': 'bg-red-100 text-red-800',
      'discount': 'bg-blue-100 text-blue-800',
      'cashback': 'bg-green-100 text-green-800',
      'bonus': 'bg-yellow-100 text-yellow-800',
      'general': 'bg-purple-100 text-purple-800',
      'seasonal': 'bg-orange-100 text-orange-800',
      'referral': 'bg-pink-100 text-pink-800'
    };
    
    const key = category ?? 'general';
    return colorMap[key] || 'bg-gray-100 text-gray-800';
  }
}

// Export singleton instance
export const promotionAPI = new PromotionAPI();
export default promotionAPI;
