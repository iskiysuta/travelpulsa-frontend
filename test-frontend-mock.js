const axios = require('axios');

const FRONTEND_URL = 'http://localhost:3000';

async function testFrontendWithMock() {
  console.log('🧪 Testing Frontend with Mock Data...\n');

  try {
    // Test 1: Check if frontend is running
    console.log('1️⃣ Testing frontend server...');
    const response = await axios.get(`${FRONTEND_URL}/promotions`, {
      timeout: 10000,
      validateStatus: function (status) {
        return status < 500;
      }
    });
    
    if (response.status === 200) {
      console.log('   ✅ Frontend is running');
      console.log('   Status:', response.status);
    } else {
      console.log('   ⚠️  Frontend returned status:', response.status);
    }
    
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.log('   ❌ Frontend is not running on http://localhost:3000');
      console.log('   💡 Start frontend: npm run dev');
    } else {
      console.log('   ❌ Error:', error.message);
    }
  }

  // Test 2: Check if we can access the promotions page
  try {
    console.log('\n2️⃣ Testing promotions page...');
    const response = await axios.get(`${FRONTEND_URL}/promotions`, {
      timeout: 10000
    });
    
    if (response.data.includes('Promo & Penawaran')) {
      console.log('   ✅ Promotions page loaded successfully');
    } else {
      console.log('   ⚠️  Promotions page loaded but content may be missing');
    }
    
  } catch (error) {
    console.log('   ❌ Could not load promotions page:', error.message);
  }

  console.log('\n📋 Instructions:');
  console.log('   1. Make sure frontend is running: npm run dev');
  console.log('   2. Open http://localhost:3000/promotions in your browser');
  console.log('   3. Check if mock data is displayed');
  console.log('   4. Test search and filter functionality');
  console.log('   5. Test responsive design on different screen sizes');
  
  console.log('\n💡 If you see errors:');
  console.log('   - Check browser console for JavaScript errors');
  console.log('   - Verify all components are properly imported');
  console.log('   - Check if TypeScript compilation is successful');
  console.log('   - Run: npm run build to check for build errors');
}

testFrontendWithMock();



