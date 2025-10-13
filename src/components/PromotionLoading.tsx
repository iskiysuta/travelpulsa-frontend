interface PromotionLoadingProps {
  variant?: 'card' | 'featured' | 'compact' | 'grid';
  count?: number;
}

export default function PromotionLoading({ variant = 'card', count = 6 }: PromotionLoadingProps) {
  const renderCardSkeleton = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 animate-pulse">
      {/* Image skeleton */}
      <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
      
      {/* Category and featured badges */}
      <div className="flex items-center justify-between mb-4">
        <div className="bg-gray-200 h-6 w-20 rounded-full"></div>
        <div className="bg-gray-200 h-6 w-16 rounded-full"></div>
      </div>
      
      {/* Title skeleton */}
      <div className="space-y-2 mb-3">
        <div className="bg-gray-200 h-5 w-3/4 rounded"></div>
        <div className="bg-gray-200 h-5 w-1/2 rounded"></div>
      </div>
      
      {/* Description skeleton */}
      <div className="space-y-2 mb-4">
        <div className="bg-gray-200 h-4 w-full rounded"></div>
        <div className="bg-gray-200 h-4 w-5/6 rounded"></div>
        <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
      </div>
      
      {/* Discount and promo code skeleton */}
      <div className="flex items-center justify-between mb-4">
        <div className="bg-gray-200 h-8 w-16 rounded"></div>
        <div className="bg-gray-200 h-6 w-20 rounded"></div>
      </div>
      
      {/* Date skeleton */}
      <div className="bg-gray-200 h-4 w-32 rounded mb-4"></div>
      
      {/* Button skeleton */}
      <div className="bg-gray-200 h-10 w-full rounded-lg"></div>
    </div>
  );

  const renderFeaturedSkeleton = () => (
    <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg shadow-lg overflow-hidden text-white animate-pulse">
      <div className="p-8">
        {/* Category and date */}
        <div className="flex items-center justify-between mb-4">
          <div className="bg-white bg-opacity-20 h-6 w-20 rounded-full"></div>
          <div className="bg-white bg-opacity-20 h-4 w-24 rounded"></div>
        </div>
        
        {/* Title skeleton */}
        <div className="space-y-2 mb-4">
          <div className="bg-white bg-opacity-20 h-6 w-3/4 rounded"></div>
          <div className="bg-white bg-opacity-20 h-6 w-1/2 rounded"></div>
        </div>
        
        {/* Description skeleton */}
        <div className="space-y-2 mb-6">
          <div className="bg-white bg-opacity-20 h-4 w-full rounded"></div>
          <div className="bg-white bg-opacity-20 h-4 w-5/6 rounded"></div>
        </div>
        
        {/* Discount and promo code */}
        <div className="flex items-center justify-between">
          <div className="bg-white bg-opacity-20 h-12 w-20 rounded"></div>
          <div className="bg-white bg-opacity-20 h-8 w-24 rounded"></div>
        </div>
        
        {/* Button skeleton */}
        <div className="bg-white bg-opacity-20 h-12 w-full rounded-lg mt-6"></div>
      </div>
    </div>
  );

  const renderCompactSkeleton = () => (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 animate-pulse">
      {/* Category and featured badges */}
      <div className="flex items-center justify-between mb-3">
        <div className="bg-gray-200 h-5 w-16 rounded-full"></div>
        <div className="bg-gray-200 h-5 w-12 rounded-full"></div>
      </div>
      
      {/* Title skeleton */}
      <div className="bg-gray-200 h-4 w-3/4 rounded mb-2"></div>
      
      {/* Discount and promo code */}
      <div className="flex items-center justify-between mb-3">
        <div className="bg-gray-200 h-6 w-12 rounded"></div>
        <div className="bg-gray-200 h-5 w-16 rounded"></div>
      </div>
      
      {/* Button skeleton */}
      <div className="bg-gray-200 h-8 w-full rounded"></div>
    </div>
  );

  const renderGridSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          {renderCardSkeleton()}
        </div>
      ))}
    </div>
  );

  if (variant === 'grid') {
    return renderGridSkeleton();
  }

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          {variant === 'featured' && renderFeaturedSkeleton()}
          {variant === 'compact' && renderCompactSkeleton()}
          {variant === 'card' && renderCardSkeleton()}
        </div>
      ))}
    </div>
  );
}





