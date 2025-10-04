/**
 * Authentication Patterns Example
 *
 * This example demonstrates different authentication patterns
 * including company-specific access and custom configuration.
 *
 * Prerequisites:
 * - Set RETREAVER_API_KEY in your .env file
 * - Optionally set RETREAVER_COMPANY_ID for multi-company access
 *
 * Run: npx ts-node cookbook/getting-started/02-authentication.ts
 */

import { Configuration, CallsApi, AffiliatesApi } from '../../index';
import * as dotenv from 'dotenv';

dotenv.config({ path: './cookbook/.env' });

async function main() {
  const apiKey = process.env.RETREAVER_API_KEY;

  if (!apiKey) {
    console.error('❌ Error: RETREAVER_API_KEY not found');
    process.exit(1);
  }

  console.log('🔐 Authentication Patterns Demo\n');

  // Pattern 1: Basic Authentication
  console.log('1️⃣  Basic Authentication');
  const basicConfig = new Configuration({
    apiKey: apiKey
  });
  const basicCallsApi = new CallsApi(basicConfig);
  console.log('   ✅ Basic config created\n');

  // Pattern 2: Multi-Company Authentication
  if (process.env.RETREAVER_COMPANY_ID) {
    console.log('2️⃣  Multi-Company Authentication');
    const companyConfig = new Configuration({
      apiKey: apiKey,
      // Note: Company ID can be passed as query param in requests
      basePath: 'https://api.retreaver.com'
    });
    const companyCallsApi = new CallsApi(companyConfig);
    console.log('   ✅ Company-specific config created');
    console.log('   🏢 Company ID:', process.env.RETREAVER_COMPANY_ID);
    console.log('   💡 Tip: Pass company_id in request params when needed\n');
  }

  // Pattern 3: Custom Base URL (for testing/staging)
  console.log('3️⃣  Custom Base URL');
  const customConfig = new Configuration({
    apiKey: apiKey,
    basePath: process.env.RETREAVER_BASE_URL || 'https://api.retreaver.com'
  });
  console.log('   ✅ Custom base URL config created');
  console.log('   🌐 Base URL:', customConfig.basePath);
  console.log('\n');

  // Pattern 4: Multiple API Clients
  console.log('4️⃣  Multiple API Clients with Shared Config');
  const sharedConfig = new Configuration({ apiKey: apiKey });
  const callsApi = new CallsApi(sharedConfig);
  const affiliatesApi = new AffiliatesApi(sharedConfig);
  console.log('   ✅ Multiple APIs initialized:');
  console.log('   📞 CallsApi');
  console.log('   👥 AffiliatesApi');
  console.log('   💡 Tip: Reuse Configuration objects for efficiency\n');

  // Test authentication
  try {
    console.log('🧪 Testing authentication...');
    const response = await basicCallsApi.getCalls(1, 1);
    console.log('✅ Authentication successful!');
  } catch (error: any) {
    console.error('❌ Authentication failed:', error.message);
    if (error.response?.status === 401) {
      console.error('🔑 Invalid API key - check your credentials');
    }
  }
}

main().catch(console.error);
