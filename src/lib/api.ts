// API configuration
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export const api = {
  // Company Info
  getCompanyInfo: async () => {
    const response = await fetch(`${STRAPI_URL}/api/company-info?populate=*`);
    return response.json();
  },
  getTeamMembers: async () => {
    const res = await fetch(`${STRAPI_URL}/api/team-members?populate=*&sort=order:asc`);
    return res.json();
  },

  // Services
  getServices: async () => {
    const response = await fetch(`${STRAPI_URL}/api/services?populate=*&sort=order:asc`);
    return response.json();
  },

  // Blog Posts (News Articles)
  getNewsArticles: async () => {
    const response = await fetch(`${STRAPI_URL}/api/blog-posts?populate=*&sort=publishedAt:desc`);
    return response.json();
  },

  getFeaturedNews: async () => {
    const response = await fetch(`${STRAPI_URL}/api/blog-posts?populate=*&filters[isFeatured][$eq]=true&sort=publishedAt:desc`);
    return response.json();
  },

  getNewsArticleBySlug: async (slug: string) => {
    try {
      const response = await fetch(
        `${STRAPI_URL}/api/blog-posts?populate=*&filters[slug][$eq]=${encodeURIComponent(slug)}&publicationState=live`
      );
      return await response.json();
    } catch (e) {
      return { data: [] };
    }
  },

  getNewsArticleByParam: async (param: string) => {
    // If numeric, treat as ID endpoint
    if (/^\d+$/.test(param)) {
      try {
        const res = await fetch(`${STRAPI_URL}/api/blog-posts/${param}?populate=*`);
        const json = await res.json();
        if (json?.data) return { data: [json.data] };
      } catch (e) {}
    }
    // Otherwise, fall back to slug query
    return api.getNewsArticleBySlug(param);
  },

  // Promotions
  getPromotions: async () => {
    const response = await fetch(`${STRAPI_URL}/api/promotions?populate=*&sort=order:asc`);
    return response.json();
  },

  getFeaturedPromotions: async () => {
    const response = await fetch(`${STRAPI_URL}/api/promotions?populate=*&filters[isActive][$eq]=true&sort=order:asc`);
    return response.json();
  },

  // Careers
  getCareers: async () => {
    const response = await fetch(`${STRAPI_URL}/api/careers?populate=*&sort=order:asc`);
    return response.json();
  },

  // Global Settings (single type)
  getGlobalSettings: async () => {
    const response = await fetch(`${STRAPI_URL}/api/global-setting?populate=*`);
    return response.json();
  },

  // CMS pages
  getHelpPage: async () => {
    const res = await fetch(`${STRAPI_URL}/api/help`);
    return res.json();
  },
  getFaqs: async () => {
    const res = await fetch(`${STRAPI_URL}/api/faqs?sort=order:asc`);
    return res.json();
  },
  getTermsPage: async () => {
    const res = await fetch(`${STRAPI_URL}/api/terms`);
    return res.json();
  },
  getPrivacyPage: async () => {
    const res = await fetch(`${STRAPI_URL}/api/privacy`);
    return res.json();
  }
};
