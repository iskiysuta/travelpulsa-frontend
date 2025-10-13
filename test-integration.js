const axios = require('axios');

const FRONTEND_URL = 'http://localhost:3000';
const STRAPI_URL = 'http://localhost:1337/api';

async function testIntegration() {
  console.log('🧪 Testing Frontend Integration...\n');

  const tests = [
    {
      name: 'Frontend Server',
      test: async () => {
        const response = await axios.get(`${FRONTEND_URL}/promotions`, { timeout: 5000 });
        return response.status === 200;
      }
    },
    {
      name: 'Strapi API',
      test: async () => {
        const response = await axios.get(`${STRAPI_URL}/promotions`, { timeout: 5000 });
        return response.status === 200;
      }
    },
    {
      name: 'Promotions Data',
      test: async () => {
        const response = await axios.get(`${STRAPI_URL}/promotions?populate=image,bannerImage`);
        return response.data.data && response.data.data.length > 0;
      }
    },
    {
      name: 'Featured Promotions',
      test: async () => {
        const response = await axios.get(`${STRAPI_URL}/promotions/featured`);
        return response.status === 200;
      }
    },
    {
      name: 'Active Promotions',
      test: async () => {
        const response = await axios.get(`${STRAPI_URL}/promotions/active`);
        return response.status === 200;
      }
    }
  ];

  let passedTests = 0;
  let totalTests = tests.length;

  for (const test of tests) {
    try {
      console.log(`🔍 Testing: ${test.name}`);
      const result = await test.test();
      
      if (result) {
        console.log(`✅ PASSED`);
        passedTests++;
      } else {
        console.log(`❌ FAILED`);
      }
    } catch (error) {
      console.log(`❌ FAILED - ${error.message}`);
    }
    console.log('');
  }

  // Summary
  console.log('📊 Integration Test Summary:');
  console.log(`   ✅ Passed: ${passedTests}/${totalTests}`);
  console.log(`   ❌ Failed: ${totalTests - passedTests}/${totalTests}`);
  
  if (passedTests === totalTests) {
    console.log('🎉 All integration tests passed!');
    console.log('\n💡 Next steps:');
    console.log('   1. Open http://localhost:3000/promotions in your browser');
    console.log('   2. Test the search and filter functionality');
    console.log('   3. Check responsive design on different screen sizes');
    console.log('   4. Test promo code copying functionality');
  } else if (passedTests === 0) {
    console.log('💡 Make sure both servers are running:');
    console.log('   Frontend: npm run dev (in travelpulsa-frontend)');
    console.log('   Strapi: npm run develop (in travelpulsa-cms)');
  } else {
    console.log('⚠️  Some tests failed. Check the errors above.');
  }
}

// Run the tests
testIntegration();





