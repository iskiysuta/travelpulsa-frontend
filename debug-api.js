const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337/api';

async function debugAPI() {
  console.log('🔍 Debugging API Connection...\n');

  try {
    // Test 1: Basic connectivity
    console.log('1️⃣ Testing basic connectivity...');
    const response = await axios.get(`${STRAPI_URL}/promotions`, {
      timeout: 10000,
      validateStatus: function (status) {
        return status < 500; // Accept any status less than 500
      }
    });
    
    console.log(`   Status: ${response.status}`);
    console.log(`   Headers:`, response.headers);
    
    if (response.status === 200) {
      console.log('   ✅ API is working correctly');
      console.log(`   📊 Found ${response.data.data?.length || 0} promotions`);
    } else if (response.status === 404) {
      console.log('   ⚠️  API endpoint not found - check if promotion content type exists');
    } else if (response.status === 403) {
      console.log('   ⚠️  Permission denied - check API permissions');
    } else {
      console.log('   ❌ Unexpected status code');
    }
    
    console.log('   Response data:', JSON.stringify(response.data, null, 2));
    
  } catch (error) {
    console.log('❌ Connection failed:');
    
    if (error.code === 'ECONNREFUSED') {
      console.log('   💡 Strapi is not running on http://localhost:1337');
      console.log('   💡 Start Strapi: cd travelpulsa-cms && npm run develop');
    } else if (error.code === 'ENOTFOUND') {
      console.log('   💡 Cannot resolve localhost - check your network settings');
    } else if (error.code === 'ETIMEDOUT') {
      console.log('   💡 Request timed out - Strapi might be starting up');
    } else {
      console.log('   Error details:', error.message);
    }
  }

  // Test 2: Check Strapi health
  try {
    console.log('\n2️⃣ Testing Strapi health endpoint...');
    const healthResponse = await axios.get('http://localhost:1337/_health', {
      timeout: 5000
    });
    console.log('   ✅ Strapi health check passed');
    console.log('   Status:', healthResponse.status);
  } catch (error) {
    console.log('   ⚠️  Strapi health check failed:', error.message);
  }

  // Test 3: Check content types
  try {
    console.log('\n3️⃣ Testing content types...');
    const contentTypesResponse = await axios.get('http://localhost:1337/api/content-manager/content-types', {
      timeout: 5000
    });
    
    const promotionType = contentTypesResponse.data.data?.find(
      (type) => type.uid === 'api::promotion.promotion'
    );
    
    if (promotionType) {
      console.log('   ✅ Promotion content type found');
      console.log('   Name:', promotionType.schema?.info?.displayName);
    } else {
      console.log('   ❌ Promotion content type not found');
      console.log('   Available types:', contentTypesResponse.data.data?.map((t) => t.uid));
    }
  } catch (error) {
    console.log('   ⚠️  Could not check content types:', error.message);
  }

  // Test 4: Check if there are any promotions
  try {
    console.log('\n4️⃣ Testing promotions data...');
    const promotionsResponse = await axios.get(`${STRAPI_URL}/promotions?pagination[pageSize]=1`, {
      timeout: 5000
    });
    
    if (promotionsResponse.data.data && promotionsResponse.data.data.length > 0) {
      console.log('   ✅ Promotions data found');
      console.log('   Sample promotion:', {
        id: promotionsResponse.data.data[0].id,
        title: promotionsResponse.data.data[0].attributes?.title
      });
    } else {
      console.log('   ⚠️  No promotions found - you may need to add sample data');
      console.log('   💡 Run: cd travelpulsa-cms && node add-promotion-data.js');
    }
  } catch (error) {
    console.log('   ❌ Could not fetch promotions:', error.message);
  }

  console.log('\n📋 Debug Summary:');
  console.log('   If you see connection errors, make sure Strapi is running');
  console.log('   If you see 404 errors, check if promotion content type exists');
  console.log('   If you see 403 errors, check API permissions in Strapi admin');
  console.log('   If you see empty data, add sample promotions to CMS');
}

debugAPI();
