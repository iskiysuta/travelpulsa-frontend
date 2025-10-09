'use client';

import { useEffect } from 'react';
import { api } from '@/lib/api';

const STRAPI_BASE = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export default function DynamicFavicon() {
  useEffect(() => {
    const setFavicon = async () => {
      try {
        const gs = await api.getGlobalSettings();
        const faviconData = gs?.data?.favicon;
        
        if (faviconData) {
          // Get favicon URL
          const faviconUrl = faviconData.url || faviconData?.data?.attributes?.url;
          
          if (faviconUrl) {
            const fullUrl = faviconUrl.startsWith('http') ? faviconUrl : `${STRAPI_BASE}${faviconUrl}`;
            
            // Remove existing favicon links
            const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
            existingFavicons.forEach(link => link.remove());
            
            // Add new favicon
            const link = document.createElement('link');
            link.rel = 'icon';
            link.type = 'image/x-icon';
            link.href = fullUrl;
            document.head.appendChild(link);
            
            // Also add for different sizes
            const link32 = document.createElement('link');
            link32.rel = 'icon';
            link32.type = 'image/png';
            link32.sizes = '32x32';
            link32.href = fullUrl;
            document.head.appendChild(link32);
            
            const link16 = document.createElement('link');
            link16.rel = 'icon';
            link16.type = 'image/png';
            link16.sizes = '16x16';
            link16.href = fullUrl;
            document.head.appendChild(link16);
            
            console.log('Favicon updated from Strapi:', fullUrl);
          }
        }
      } catch (error) {
        console.log('Failed to load favicon from Strapi:', error);
        // Fallback to default favicon
        setDefaultFavicon();
      }
    };

    const setDefaultFavicon = () => {
      // Set default favicon if Strapi favicon fails
      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/x-icon';
      link.href = '/favicon.ico';
      document.head.appendChild(link);
    };

    setFavicon();
  }, []);

  return null; // This component doesn't render anything
}


