/**
 * Fetch Calls (V2 API) Example
 *
 * This example demonstrates how to fetch call data using the V2 API.
 * The V2 API uses /api/v2/calls.json and provides enhanced call data
 * including additional fields not available in V1.
 *
 * Prerequisites:
 * - Set RETREAVER_API_KEY in your .env file
 *
 * Run: npx ts-node cookbook/calls/02-fetch-calls-v2.ts
 */

import { Configuration, CallsV2Api } from '../../index';
import * as dotenv from 'dotenv';

dotenv.config({ path: './cookbook/.env' });

async function main() {
  const apiKey = process.env.RETREAVER_API_KEY;

  if (!apiKey) {
    console.error('❌ Error: RETREAVER_API_KEY not found');
    process.exit(1);
  }

  console.log('📞 Fetching Calls (V2 API)\n');

  // Setup
  const config = new Configuration({ apiKey });
  const callsV2Api = new CallsV2Api(config);

  try {
    // Fetch first page of calls with V2 API
    console.log('🔍 Fetching calls with V2 API (enhanced data)...');
    const page = 1;
    const perPage = 5; // Fetch 5 calls for this example

    const response = await callsV2Api.getCallsV2(page, perPage);
    const calls = response.data;

    console.log(`✅ Retrieved ${calls.length} calls\n`);

    // Display enhanced call information
    calls.forEach((call, index) => {
      console.log(`📱 Call ${index + 1} (Enhanced V2 Data):`);
      console.log(`   ID: ${call.id}`);
      console.log(`   Caller: ${call.caller_number || 'N/A'}`);
      console.log(`   Receiver: ${call.receiving_number || 'N/A'}`);
      console.log(`   Duration: ${call.duration ? `${call.duration}s` : 'N/A'}`);
      console.log(`   Created: ${call.created_at}`);
      console.log(`   Status: ${call.complete ? 'Complete' : 'In Progress'}`);

      // V2-specific fields (if available)
      if (call.campaign_id) {
        console.log(`   Campaign ID: ${call.campaign_id}`);
      }
      if (call.affiliate_id) {
        console.log(`   Affiliate ID: ${call.affiliate_id}`);
      }
      if (call.target_id) {
        console.log(`   Target ID: ${call.target_id}`);
      }

      console.log('');
    });

    // Compare V1 vs V2
    console.log('💡 V2 API Benefits:');
    console.log('   - Enhanced call metadata');
    console.log('   - Additional tracking fields');
    console.log('   - Better integration data');
    console.log('   - More detailed call attribution');

  } catch (error: any) {
    console.error('❌ Error fetching calls:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Details:', error.response.data);
    }
  }
}

main().catch(console.error);
