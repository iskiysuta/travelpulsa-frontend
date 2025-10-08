'use client';

import { useState } from 'react';
import { usePromotions } from '@/hooks/usePromotions';
import PromotionCard from '@/components/PromotionCard';
import PromotionFilters from '@/components/PromotionFilters';
import PromotionPagination from '@/components/PromotionPagination';
import PromotionLoading from '@/components/PromotionLoading';
import PromotionError from '@/components/PromotionError';

export default function Promotions() {
  const {
    promotions,
    featuredPromotions,
    loading,
    error,
    searchTerm,
    filters,
    pagination,
    setSearchTerm,
    setFilters,
    clearFilters,
    refresh
  } = usePromotions();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleUsePromo = (promotion: any) => {
    // Handle promo usage - could redirect to app or show modal
    console.log('Using promo:', promotion.attributes.promoCode);
    // You can implement redirect to app or show success modal here
  };

  const handlePageChange = (page: number) => {
    // This would need to be implemented in the hook
    console.log('Page changed to:', page);
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    // This would need to be implemented in the hook
    console.log('Items per page changed to:', itemsPerPage);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-secondary mb-6 reveal">
              Promo & <span className="text-primary">Penawaran</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto reveal" data-delay="150">
              Nikmati berbagai promo menarik dan penawaran terbaik dari Travel Pulsa
            </p>
          </div>
        </div>
      </section>

      {/* Featured Promotions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Promo Unggulan
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Jangan lewatkan promo-promo menarik yang sedang berlangsung
            </p>
          </div>
          
          {loading ? (
            <PromotionLoading variant="featured" count={2} />
          ) : error ? (
            <PromotionError error={error} onRetry={refresh} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[...featuredPromotions]
                .sort((a: any, b: any) => new Date(b.attributes?.createdAt || b.createdAt || 0).getTime() - new Date(a.attributes?.createdAt || a.createdAt || 0).getTime())
                .map((promotion, idx) => (
                <div key={promotion.id} className="reveal" data-delay={`${idx * 120}`}>
                  <PromotionCard
                    promotion={promotion}
                    variant="featured"
                    onUsePromo={handleUsePromo}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* All Promotions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Semua Promo
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Kumpulan promo dan penawaran terbaik untuk Anda
            </p>
          </div>

          {/* Filters */}
          <PromotionFilters
            onFilterChange={setFilters}
            onSearchChange={setSearchTerm}
            searchTerm={searchTerm}
            activeFilters={filters}
          />

          {/* View Mode Toggle */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {pagination.total} promo ditemukan
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${
                  viewMode === 'grid' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${
                  viewMode === 'list' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Promotions Grid/List */}
          {loading ? (
            <PromotionLoading variant="grid" count={pagination.pageSize} />
          ) : error ? (
            <PromotionError error={error} onRetry={refresh} />
          ) : promotions.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-4">
                <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada promo ditemukan</h3>
              <p className="text-gray-600 mb-4">
                Coba ubah filter atau kata kunci pencarian Anda
              </p>
              <button
                onClick={clearFilters}
                className="text-primary hover:text-primary-700 font-medium"
              >
                Hapus semua filter
              </button>
            </div>
          ) : (
            <>
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                  : 'space-y-6'
              }>
                {promotions.map((promotion, idx) => (
                  <div key={promotion.id} className="reveal" data-delay={`${idx * 100}`}>
                    <PromotionCard
                      promotion={promotion}
                      variant={viewMode === 'list' ? 'compact' : 'default'}
                      onUsePromo={handleUsePromo}
                    />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-12">
                <PromotionPagination
                  currentPage={pagination.page}
                  totalPages={pagination.pageCount}
                  totalItems={pagination.total}
                  itemsPerPage={pagination.pageSize}
                  onPageChange={handlePageChange}
                  onItemsPerPageChange={handleItemsPerPageChange}
                />
              </div>
            </>
          )}
        </div>
      </section>

     
    </div>
  );
}

