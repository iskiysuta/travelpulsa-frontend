# Frontend Integration - Travel Pulsa Promotions

## Overview
Integrasi frontend untuk halaman promotions yang terhubung dengan Strapi CMS. Halaman ini menampilkan promo-promo dari CMS dengan fitur filtering, search, dan pagination.

## 🚀 Features

### ✅ Implemented
- **Dynamic Content**: Mengambil data promo dari Strapi CMS
- **Search & Filter**: Pencarian dan filter berdasarkan kategori, status, dll
- **Responsive Design**: Tampilan yang responsif untuk semua device
- **Loading States**: Skeleton loading untuk UX yang baik
- **Error Handling**: Error states dengan retry functionality
- **Pagination**: Pagination dengan custom page size
- **View Modes**: Grid dan list view
- **Promo Cards**: Komponen card dengan berbagai variant
- **Copy Promo Code**: Fitur copy kode promo ke clipboard
- **Promo Detail**: Halaman detail promo individual

## 📁 File Structure

```
src/
├── app/
│   └── promotions/
│       ├── page.tsx                 # Halaman utama promotions
│       └── [slug]/
│           └── page.tsx            # Halaman detail promo
├── components/
│   ├── PromotionCard.tsx           # Komponen card promo
│   ├── PromotionFilters.tsx        # Komponen filter dan search
│   ├── PromotionPagination.tsx     # Komponen pagination
│   ├── PromotionLoading.tsx        # Komponen loading state
│   └── PromotionError.tsx          # Komponen error state
├── hooks/
│   └── usePromotions.ts            # Custom hook untuk state management
└── lib/
    └── promotion-api.ts            # API service untuk Strapi
```

## 🛠️ Setup Instructions

### 1. Environment Variables
Buat file `.env.local` di root project:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_strapi_api_token_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Install Dependencies
```bash
npm install
# atau
yarn install
```

### 3. Start Development Server
```bash
npm run dev
# atau
yarn dev
```

### 4. Start Strapi CMS
```bash
cd ../travelpulsa-cms
npm run develop
```

## 🎯 Usage Examples

### Basic Usage
```tsx
import { usePromotions } from '@/hooks/usePromotions';
import PromotionCard from '@/components/PromotionCard';

export default function MyComponent() {
  const { promotions, loading, error } = usePromotions();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {promotions.map(promotion => (
        <PromotionCard
          key={promotion.id}
          promotion={promotion}
          variant="default"
        />
      ))}
    </div>
  );
}
```

### With Filters
```tsx
const { 
  promotions, 
  filters, 
  setFilters, 
  searchTerm, 
  setSearchTerm 
} = usePromotions({
  initialFilters: {
    category: 'discount',
    isFeatured: true
  }
});

// Update filters
setFilters({ category: 'flash-sale' });
setSearchTerm('hotel');
```

### Custom API Calls
```tsx
import { promotionAPI } from '@/lib/promotion-api';

// Get featured promotions
const featured = await promotionAPI.getFeaturedPromotions();

// Get promotions by category
const discounts = await promotionAPI.getPromotionsByCategory('discount');

// Get single promotion
const promotion = await promotionAPI.getPromotion(1, ['image', 'bannerImage']);
```

## 🎨 Components

### PromotionCard
Komponen untuk menampilkan promo dengan berbagai variant.

```tsx
<PromotionCard
  promotion={promotion}
  variant="featured" // 'featured' | 'default' | 'compact'
  onUsePromo={(promo) => console.log('Using:', promo)}
/>
```

### PromotionFilters
Komponen untuk filter dan search.

```tsx
<PromotionFilters
  onFilterChange={setFilters}
  onSearchChange={setSearchTerm}
  searchTerm={searchTerm}
  activeFilters={filters}
/>
```

### PromotionPagination
Komponen pagination.

```tsx
<PromotionPagination
  currentPage={pagination.page}
  totalPages={pagination.pageCount}
  totalItems={pagination.total}
  itemsPerPage={pagination.pageSize}
  onPageChange={handlePageChange}
  onItemsPerPageChange={handleItemsPerPageChange}
/>
```

## 🔧 Customization

### Styling
Semua komponen menggunakan Tailwind CSS. Anda dapat mengkustomisasi dengan:

1. **Color Scheme**: Ubah warna primary, secondary di `tailwind.config.ts`
2. **Component Styles**: Edit class CSS di setiap komponen
3. **Layout**: Modifikasi grid dan spacing sesuai kebutuhan

### API Configuration
Ubah konfigurasi API di `src/lib/promotion-api.ts`:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337/api';
```

### Data Structure
Interface data promotion di `src/lib/promotion-api.ts`:

```typescript
interface Promotion {
  id: number;
  attributes: {
    title: string;
    description: string;
    content: string;
    category: string;
    promoCode?: string;
    discountType?: string;
    discountValue?: number;
    // ... dan field lainnya
  };
}
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px (1 kolom)
- **Tablet**: 768px - 1024px (2 kolom)
- **Desktop**: > 1024px (3 kolom)

### View Modes
- **Grid View**: Tampilan card dalam grid
- **List View**: Tampilan compact dalam list

## 🔍 Search & Filter Features

### Search
- Pencarian berdasarkan title, description, promo code, dan tags
- Real-time search dengan debouncing
- Highlight hasil pencarian

### Filters
- **Kategori**: flash-sale, discount, cashback, bonus, general, seasonal, referral
- **Status**: Featured, Active
- **Target Audience**: All users, New users, Existing users, VIP users

### Sorting
- Priority (descending)
- Created date (descending)
- Custom sorting options

## 🚨 Error Handling

### Error States
- **Network Error**: Connection refused, timeout
- **API Error**: 404, 500, validation errors
- **Empty State**: No promotions found

### Retry Mechanism
- Automatic retry untuk network errors
- Manual retry button
- Fallback content

## 📊 Performance

### Optimization
- **Lazy Loading**: Images dan komponen
- **Pagination**: Load data per halaman
- **Memoization**: useMemo dan useCallback untuk optimasi
- **Debouncing**: Search input debouncing

### Caching
- Browser caching untuk API responses
- Local state management dengan React hooks

## 🧪 Testing

### Test Files
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
```

### Test Examples
```typescript
// Component test
import { render, screen } from '@testing-library/react';
import PromotionCard from '@/components/PromotionCard';

test('renders promotion card', () => {
  const mockPromotion = {
    id: 1,
    attributes: {
      title: 'Test Promo',
      description: 'Test description',
      // ... other fields
    }
  };
  
  render(<PromotionCard promotion={mockPromotion} />);
  expect(screen.getByText('Test Promo')).toBeInTheDocument();
});
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables
Set environment variables di production:

```env
NEXT_PUBLIC_STRAPI_URL=https://your-strapi-domain.com
STRAPI_API_TOKEN=your_production_token
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 🔄 Future Enhancements

### Planned Features
- [ ] **Real-time Updates**: WebSocket untuk update real-time
- [ ] **Favorites**: Save favorite promotions
- [ ] **Share**: Social media sharing
- [ ] **QR Code**: Generate QR code untuk promo
- [ ] **Analytics**: Track promo usage
- [ ] **A/B Testing**: Test different layouts
- [ ] **Push Notifications**: Browser notifications
- [ ] **Offline Support**: PWA capabilities

### API Enhancements
- [ ] **GraphQL**: Migrate to GraphQL
- [ ] **Caching**: Redis caching layer
- [ ] **Rate Limiting**: API rate limiting
- [ ] **Webhooks**: Real-time updates

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Error**
   ```
   Error: Connection refused
   ```
   - Check if Strapi is running
   - Verify API URL in environment variables

2. **CORS Error**
   ```
   CORS policy: No 'Access-Control-Allow-Origin'
   ```
   - Configure CORS in Strapi settings
   - Add frontend URL to allowed origins

3. **Image Loading Error**
   ```
   Failed to load image
   ```
   - Check Strapi media URL configuration
   - Verify image upload permissions

4. **Build Error**
   ```
   Module not found
   ```
   - Check import paths
   - Verify file structure
   - Run `npm install` to install dependencies

### Debug Mode
Enable debug mode untuk detailed logging:

```typescript
// In promotion-api.ts
const DEBUG = process.env.NODE_ENV === 'development';

if (DEBUG) {
  console.log('API Request:', endpoint, params);
}
```

## 📞 Support

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Strapi Docs](https://docs.strapi.io)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Contact
- **Development Team**: dev@travelpulsa.com
- **Issues**: GitHub Issues
- **Discord**: Travel Pulsa Dev Community

---

**Happy Coding! 🚀**



