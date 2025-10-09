'use client';

import { useState } from 'react';

interface PromotionFiltersProps {
  onFilterChange: (filters: {
    category?: string;
    isFeatured?: boolean;
    isActive?: boolean;
  }) => void;
  onSearchChange: (searchTerm: string) => void;
  searchTerm: string;
  activeFilters: {
    category?: string;
    isFeatured?: boolean;
    isActive?: boolean;
  };
}

const categories = [
  { value: '', label: 'Semua Kategori' },
  { value: 'flash-sale', label: 'Flash Sale' },
  { value: 'discount', label: 'Diskon' },
  { value: 'cashback', label: 'Cashback' },
  { value: 'bonus', label: 'Bonus' },
  { value: 'general', label: 'Umum' },
  { value: 'seasonal', label: 'Musiman' },
  { value: 'referral', label: 'Referral' }
];

export default function PromotionFilters({
  onFilterChange,
  onSearchChange,
  searchTerm,
  activeFilters
}: PromotionFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  const handleCategoryChange = (category: string) => {
    onFilterChange({
      ...activeFilters,
      category: category || undefined
    });
  };

  const handleFeaturedChange = (isFeatured: boolean) => {
    onFilterChange({
      ...activeFilters,
      isFeatured: isFeatured || undefined
    });
  };

  const handleActiveChange = (isActive: boolean) => {
    onFilterChange({
      ...activeFilters,
      isActive: isActive || undefined
    });
  };

  const clearFilters = () => {
    onFilterChange({});
    onSearchChange('');
  };

  const hasActiveFilters = Object.values(activeFilters).some(value => value !== undefined) || searchTerm;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Cari promo..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-secondary">Filter Promo</h3>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-primary hover:text-primary-700 transition-colors"
        >
          <span>Filter</span>
          <svg 
            className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="space-y-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
            <select
              value={activeFilters.category || ''}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Checkbox Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={activeFilters.isFeatured || false}
                onChange={(e) => handleFeaturedChange(e.target.checked)}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Hanya Promo Unggulan</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={activeFilters.isActive || false}
                onChange={(e) => handleActiveChange(e.target.checked)}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Hanya Promo Aktif</span>
            </label>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Hapus Semua Filter
              </button>
            </div>
          )}
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Pencarian: &quot;{searchTerm}&quot;
                <button
                  onClick={() => onSearchChange('')}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            )}
            
            {activeFilters.category && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Kategori: {categories.find(c => c.value === activeFilters.category)?.label}
                <button
                  onClick={() => handleCategoryChange('')}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </span>
            )}
            
            {activeFilters.isFeatured && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Unggulan
                <button
                  onClick={() => handleFeaturedChange(false)}
                  className="ml-2 text-purple-600 hover:text-purple-800"
                >
                  ×
                </button>
              </span>
            )}
            
            {activeFilters.isActive && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                Aktif
                <button
                  onClick={() => handleActiveChange(false)}
                  className="ml-2 text-orange-600 hover:text-orange-800"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}





