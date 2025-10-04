/**
 * Fetch Calls (V1 API) Example
 *
 * This example demonstrates how to fetch call data using the V1 API.
 * The V1 API uses the /calls.json endpoint.
 *
 * Prerequisites:
 * - Set RETREAVER_API_KEY in your .env file
 *
 * Run: npx ts-node cookbook/calls/01-fetch-calls-v1.ts
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

  console.log('📞 Fetching Calls (V1 API)\n');

  // Setup
  const config = new Configuration({ apiKey });
  const callsApi = new CallsApi(config);

  try {
    // Fetch first page of calls (25 results per page by default)
    console.log('🔍 Fetching calls...');
    const page = 1;
    const perPage = 10; // Fetch 10 calls for this example

    const response = await callsApi.getCalls(page, perPage);
    const calls = response.data;

    console.log(`✅ Retrieved ${calls.length} calls\n`);

    // Display call information
    calls.forEach((call, index) => {
      console.log(`📱 Call ${index + 1}:`);
      console.log(`   ID: ${call.id}`);
      console.log(`   Caller: ${call.caller_number || 'N/A'}`);
      console.log(`   Duration: ${call.duration ? `${call.duration}s` : 'N/A'}`);
      console.log(`   Created: ${call.created_at}`);
      console.log(`   Status: ${call.complete ? 'Complete' : 'In Progress'}`);
      console.log('');
    });

    // Pagination info
    console.log('📄 Pagination:');
    console.log(`   Current page: ${page}`);
    console.log(`   Per page: ${perPage}`);
    console.log('   💡 Use the Link header in response for pagination');

  } catch (error: any) {
    console.error('❌ Error fetching calls:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Details:', error.response.data);
    }
  }
}

main().catch(console.error);
