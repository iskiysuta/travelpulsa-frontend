export type CareerDepartment =
  | 'engineering'
  | 'product'
  | 'design'
  | 'marketing'
  | 'sales'
  | 'operations'
  | 'customer-support'
  | 'finance'
  | 'hr';

export type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'internship';

export interface CareerAttributes {
  title: string;
  slug: string;
  department?: CareerDepartment;
  employmentType?: EmploymentType;
  location?: string;
  isRemote?: boolean;
  isFeatured?: boolean;
  isActive?: boolean;
  salaryMin?: number | null;
  salaryMax?: number | null;
  currency?: string | null;
  shortDescription?: string | null;
  description?: string | null;
  requirements?: string | null;
  responsibilities?: string | null;
  benefits?: string | null;
  applicationLink?: string | null;
  applicationEmail?: string | null;
  deadline?: string | null;
  priority?: number | null;
  tags?: unknown;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string | null;
}

export interface CareerEntity {
  id: number;
  attributes: CareerAttributes;
}

export interface CareersResponse {
  data: CareerEntity[];
  meta: { pagination?: { page: number; pageSize: number; pageCount: number; total: number } };
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const API_BASE = `${STRAPI_URL}/api`;

async function fetchAPI<T>(endpoint: string, init?: RequestInit): Promise<T> {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init && init.headers ? init.headers : {}),
    },
    cache: 'no-store',
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return (await res.json()) as T;
}

function normalizeCareerEntity(entity: any): CareerEntity {
  if (!entity) return { id: 0, attributes: {} as CareerAttributes };
  if (entity.attributes && typeof entity.attributes === 'object') return entity as CareerEntity;
  // Some backends may flatten fields at top-level; wrap them into attributes
  const { id, ...rest } = entity;
  return {
    id: typeof id === 'number' ? id : parseInt(String(id || '0'), 10) || 0,
    attributes: rest as CareerAttributes,
  };
}

export type CareersFilters = {
  page?: number;
  pageSize?: number;
  search?: string;
  department?: CareerDepartment | 'all';
  onlyActive?: boolean;
  onlyFeatured?: boolean;
};

export async function getCareers(filters: CareersFilters = {}): Promise<CareersResponse> {
  const { page = 1, pageSize = 12, search, department, onlyActive, onlyFeatured } = filters;
  const params = new URLSearchParams();
  params.set('populate', '*');
  // Use Strapi v5 sort syntax
  params.append('sort', 'priority:desc');
  params.append('sort', 'createdAt:desc');
  params.set('pagination[page]', String(page));
  params.set('pagination[pageSize]', String(pageSize));

  if (search) {
    params.set('filters[$or][0][title][$containsi]', search);
    params.set('filters[$or][1][shortDescription][$containsi]', search);
  }
  if (department && department !== 'all') {
    params.set('filters[department][$eq]', department);
  }
  if (onlyActive) {
    params.set('filters[isActive][$eq]', 'true');
  }
  if (onlyFeatured) {
    params.set('filters[isFeatured][$eq]', 'true');
  }

  const res = await fetchAPI<CareersResponse>(`/careers?${params.toString()}`);
  return {
    data: Array.isArray(res?.data) ? res.data.map(normalizeCareerEntity) : [],
    meta: res?.meta || { pagination: { page: 1, pageSize, pageCount: 1, total: 0 } },
  };
}

export async function getCareerBySlug(slug: string): Promise<CareersResponse> {
  const params = new URLSearchParams();
  params.set('populate', '*');
  params.set('filters[slug][$eq]', slug);
  params.set('pagination[pageSize]', '1');
  const res = await fetchAPI<CareersResponse>(`/careers?${params.toString()}`);
  return {
    data: Array.isArray(res?.data) ? res.data.map(normalizeCareerEntity) : [],
    meta: res?.meta || {},
  };
}

export async function getCareerById(id: string | number): Promise<CareerEntity | null> {
  const res = await fetchAPI<{ data: any | null }>(`/careers/${id}?populate=*`);
  // Strapi returns { data: {id, attributes} } or { data: null }
  const ent = (res as any)?.data || null;
  return ent ? normalizeCareerEntity(ent) : null;
}

export function formatSalary(min?: number | null, max?: number | null, currency: string = 'IDR'): string {
  if (!min && !max) return 'Negotiable';
  const cur = currency || 'IDR';
  const fmt = new Intl.NumberFormat('id-ID');
  if (min && max) return `${cur} ${fmt.format(min)} - ${fmt.format(max)}`;
  if (min) return `From ${cur} ${fmt.format(min)}`;
  if (max) return `Up to ${cur} ${fmt.format(max)}`;
  return 'Negotiable';
}

export function htmlToText(html?: string | null, maxLen = 140): string | null {
  if (!html) return null;
  const temp = typeof window !== 'undefined' ? document.createElement('div') : null;
  let text = html;
  if (temp) {
    temp.innerHTML = html;
    text = temp.textContent || temp.innerText || '';
  } else {
    text = html.replace(/<[^>]+>/g, ' ');
  }
  text = text.trim().replace(/\s+/g, ' ');
  if (text.length > maxLen) return text.slice(0, maxLen).trim() + '…';
  return text;
}


