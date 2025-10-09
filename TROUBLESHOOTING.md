# Troubleshooting Guide - Travel Pulsa Frontend

## 🚨 Common Errors and Solutions

### 1. HTTP Error Status 404/500

#### Error Message:
```
HTTP error! status: 404
HTTP error! status: 500
```

#### Possible Causes:
- Strapi CMS is not running
- Promotion content type doesn't exist
- API endpoint is incorrect
- CORS issues

#### Solutions:

**Step 1: Check if Strapi is running**
```bash
# Check if Strapi is running on port 1337
curl http://localhost:1337/api/promotions

# Or check in browser
# http://localhost:1337/admin
```

**Step 2: Start Strapi if not running**
```bash
cd travelpulsa-cms
npm run develop
```

**Step 3: Check if promotion content type exists**
```bash
# Run debug script
cd travelpulsa-frontend
node debug-api.js
```

**Step 4: Create promotion content type if missing**
```bash
cd travelpulsa-cms
# The promotion content type should be created automatically
# Check src/api/promotion/ directory exists
```

### 2. Connection Refused Error

#### Error Message:
```
Connection refused
ECONNREFUSED
```

#### Solutions:

**Check Strapi Status:**
```bash
# Check if Strapi is running
ps aux | grep strapi

# Check port 1337
netstat -tulpn | grep 1337
# or on Windows
netstat -an | findstr 1337
```

**Start Strapi:**
```bash
cd travelpulsa-cms
npm run develop
```

**Check Strapi Logs:**
```bash
# Look for errors in Strapi console output
# Common issues:
# - Port 1337 already in use
# - Database connection issues
# - Missing dependencies
```

### 3. CORS Error

#### Error Message:
```
CORS policy: No 'Access-Control-Allow-Origin'
```

#### Solutions:

**Configure CORS in Strapi:**
```javascript
// In travelpulsa-cms/config/middlewares.js
module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'http:', 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            'res.cloudinary.com',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            'res.cloudinary.com',
          ],
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://localhost:3000', 'http://localhost:1337'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

### 4. TypeScript Compilation Errors

#### Error Message:
```
Module not found
Cannot find module
Type error
```

#### Solutions:

**Check Import Paths:**
```typescript
// Make sure imports are correct
import { usePromotions } from '@/hooks/usePromotions';
import PromotionCard from '@/components/PromotionCard';
```

**Check TypeScript Config:**
```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Install Missing Dependencies:**
```bash
npm install
# or
yarn install
```

### 5. Build Errors

#### Error Message:
```
Build failed
Module not found during build
```

#### Solutions:

**Check Build Process:**
```bash
# Clean and rebuild
rm -rf .next
npm run build

# Check for specific errors
npm run build 2>&1 | grep -i error
```

**Check Environment Variables:**
```bash
# Make sure .env.local exists
cat .env.local

# Check if variables are set correctly
echo $NEXT_PUBLIC_STRAPI_URL
```

### 6. Mock Data Not Loading

#### Error Message:
```
No promotions found
Empty state displayed
```

#### Solutions:

**Enable Mock Data:**
```bash
# Set environment variable
echo "NEXT_PUBLIC_USE_MOCK_DATA=true" >> .env.local

# Restart development server
npm run dev
```

**Check Mock Data Import:**
```typescript
// Check if mock-promotions.ts exists
// Check if import is correct in promotion-api.ts
import { mockPromotionsResponse } from './mock-promotions';
```

### 7. Image Loading Issues

#### Error Message:
```
Failed to load image
Image not displaying
```

#### Solutions:

**Check Image Paths:**
```typescript
// Make sure image URLs are correct
const imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}${image.attributes.url}`;
```

**Check Strapi Media Configuration:**
```javascript
// In Strapi config
module.exports = {
  // ... other config
  upload: {
    config: {
      sizeLimit: 100000000, // 100MB
    },
  },
};
```

**Use Placeholder Images:**
```typescript
// Add fallback for missing images
const imageUrl = image?.data?.attributes?.url 
  ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${image.data.attributes.url}`
  : '/images/placeholder.jpg';
```

## 🔧 Debug Tools

### 1. API Debug Script
```bash
cd travelpulsa-frontend
node debug-api.js
```

### 2. Frontend Test Script
```bash
cd travelpulsa-frontend
node test-frontend-mock.js
```

### 3. Integration Test Script
```bash
cd travelpulsa-frontend
node test-integration.js
```

### 4. Browser Developer Tools
- Open browser DevTools (F12)
- Check Console tab for JavaScript errors
- Check Network tab for failed API calls
- Check Application tab for environment variables

## 📋 Quick Checklist

### Before Starting Development:
- [ ] Strapi CMS is running on port 1337
- [ ] Frontend is running on port 3000
- [ ] Environment variables are set correctly
- [ ] All dependencies are installed
- [ ] TypeScript compilation is successful

### When API Errors Occur:
- [ ] Check if Strapi is running
- [ ] Check if promotion content type exists
- [ ] Check CORS configuration
- [ ] Check API endpoint URLs
- [ ] Enable mock data as fallback

### When Frontend Errors Occur:
- [ ] Check browser console for errors
- [ ] Check TypeScript compilation
- [ ] Check import paths
- [ ] Check component props
- [ ] Check environment variables

## 🆘 Getting Help

### 1. Check Logs
```bash
# Strapi logs
cd travelpulsa-cms
npm run develop

# Frontend logs
cd travelpulsa-frontend
npm run dev
```

### 2. Common Solutions
- Restart both servers
- Clear browser cache
- Check network connectivity
- Verify port availability
- Check firewall settings

### 3. Debug Mode
```bash
# Enable debug logging
NEXT_PUBLIC_DEBUG=true npm run dev
```

### 4. Contact Support
- Check GitHub Issues
- Contact development team
- Check documentation
- Review error messages carefully

## 🎯 Success Indicators

### When Everything Works:
- ✅ Strapi admin panel accessible at http://localhost:1337/admin
- ✅ Frontend loads at http://localhost:3000/promotions
- ✅ Promotions are displayed correctly
- ✅ Search and filter work
- ✅ No console errors
- ✅ Responsive design works
- ✅ Images load properly

### Test Commands:
```bash
# Test API
curl http://localhost:1337/api/promotions

# Test Frontend
curl http://localhost:3000/promotions

# Test Integration
node test-integration.js
```

---

**Remember: Most issues are resolved by ensuring both servers are running and environment variables are set correctly!** 🚀



