'use client';

import { Promotion } from '@/lib/promotion-api';
import { promotionAPI } from '@/lib/promotion-api';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

interface PromotionCardProps {
  promotion: Promotion;
  variant?: 'featured' | 'default' | 'compact';
  onUsePromo?: (promotion: Promotion) => void;
}

export default function PromotionCard({ 
  promotion, 
  variant = 'default',
  onUsePromo 
}: PromotionCardProps) {
  const [isCopied, setIsCopied] = useState(false);
  
  const { attributes } = promotion;
  const isActive = promotionAPI.isPromotionActive(promotion);
  const remainingDays = promotionAPI.getRemainingDays(promotion);
  const discountValue = promotionAPI.formatDiscountValue(promotion);
  const categoryName = promotionAPI.getCategoryDisplayName(attributes.category);
  const categoryColors = promotionAPI.getCategoryColorClasses(attributes.category);
  
  const handleCopyCode = () => {
    if (attributes.promoCode) {
      navigator.clipboard.writeText(attributes.promoCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleUsePromo = () => {
    if (onUsePromo) onUsePromo(promotion);
  };

  if (variant === 'featured') {
    const mediaBase = (process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337').replace(/\/api\/?$/, '');
    const rawBanner =
      attributes.bannerImage?.data?.attributes?.url ||
      (attributes as Record<string, unknown>)?.bannerImage?.attributes?.url ||
      (attributes as Record<string, unknown>)?.bannerImage?.url ||
      attributes.image?.data?.attributes?.url ||
      (attributes as Record<string, unknown>)?.image?.attributes?.url ||
      (attributes as Record<string, unknown>)?.image?.url;
    const bannerUrl = rawBanner
      ? (rawBanner.startsWith('http') ? rawBanner : `${mediaBase}${rawBanner}`)
      : null;
    return (
      <div className="relative rounded-lg shadow-lg overflow-hidden bg-white border border-gray-100">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-pink-500 to-primary" />
        <div className="relative p-8">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
              {categoryName}
            </span>
            <span className="text-sm text-gray-500">
              {remainingDays > 0 ? `${remainingDays} hari lagi` : 'Berakhir'}
            </span>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-secondary">{attributes.title}</h3>
          <p className="text-gray-600 mb-6 max-w-3xl">{attributes.description}</p>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold mb-1 text-primary">{discountValue}</div>
              <div className="text-sm text-gray-600">Diskon</div>
            </div>
            {attributes.promoCode && (
              <div className="text-right">
                <div className="text-sm text-gray-600 mb-1">Kode Promo</div>
                <button
                  onClick={handleCopyCode}
                  className="text-lg font-bold bg-primary/10 text-primary px-3 py-1 rounded hover:bg-primary/20 transition-colors"
                >
                  {isCopied ? 'Copied!' : attributes.promoCode}
                </button>
              </div>
            )}
          </div>
          <Link 
            href={`/promotions/${attributes.slug}`}
            className={`block text-center w-full mt-6 py-3 rounded-lg font-medium transition-colors duration-200 bg-primary text-white hover:bg-primary-700`}
          >
            Lihat Lebih Detail
          </Link>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="relative bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-pink-500 to-primary" />
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${categoryColors}`}>
            {categoryName}
          </span>
          {attributes.isFeatured && (
            <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-primary text-white">
              Featured
            </span>
          )}
        </div>
        
        <h3 className="text-sm font-semibold text-secondary mb-2 line-clamp-2">
          {attributes.title}
        </h3>
        
        <div className="flex items-center justify-between mb-3">
          <div className="text-lg font-bold text-primary">{discountValue}</div>
          {attributes.promoCode && (
            <button
              onClick={handleCopyCode}
              className="text-xs font-bold text-primary bg-primary-50 px-2 py-1 rounded hover:bg-primary-100 transition-colors"
            >
              {isCopied ? 'Copied!' : attributes.promoCode}
            </button>
          )}
        </div>
        
        <Link 
          href={`/promotions/${attributes.slug}`}
          className={`block text-center w-full py-2 rounded text-xs font-medium transition-colors duration-200 bg-primary text-white hover:bg-primary-700`}
        >
          Lihat Lebih Detail
        </Link>
      </div>
    );
  }

  // Default variant
  return (
    <div className="relative bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-100">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-pink-500 to-primary" />
      {/* Image */}
      {attributes.image?.data && (
        <div className="mb-4">
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${attributes.image.data.attributes.url}`}
            alt={attributes.image.data.attributes.alternativeText || attributes.title}
            width={400}
            height={200}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      )}
      
      <div className="flex items-center justify-between mb-4">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${categoryColors}`}>
          {categoryName}
        </span>
        <div className="flex items-center gap-2">
          {attributes.isFeatured && (
            <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-primary text-white">
              Featured
            </span>
          )}
          {!isActive && (
            <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Berakhir
            </span>
          )}
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-secondary mb-3">{attributes.title}</h3>
      <p className="text-gray-600 mb-4 text-sm line-clamp-3">{attributes.description}</p>
      
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-2xl font-bold text-primary">{discountValue}</div>
          <div className="text-xs text-gray-500">Diskon</div>
        </div>
        {attributes.promoCode && (
          <div className="text-right">
            <div className="text-xs text-gray-500 mb-1">Kode Promo</div>
            <button
              onClick={handleCopyCode}
              className="text-sm font-bold text-primary bg-primary-50 px-2 py-1 rounded hover:bg-primary-100 transition-colors"
            >
              {isCopied ? 'Copied!' : attributes.promoCode}
            </button>
          </div>
        )}
      </div>
      
      <div className="text-xs text-gray-500 mb-4">
        {remainingDays > 0 ? `Berlaku ${remainingDays} hari lagi` : 'Promo telah berakhir'}
      </div>
      
      <Link 
        href={`/promotions/${attributes.slug}`}
        className={`block text-center w-full py-2 rounded-lg font-medium text-sm transition-colors duration-200 bg-primary text-white hover:bg-primary-700`}
      >
        Lihat Lebih Detail
      </Link>
    </div>
  );
}
