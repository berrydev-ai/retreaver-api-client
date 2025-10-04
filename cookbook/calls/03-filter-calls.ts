/**
 * Filter Calls Example
 *
 * This example demonstrates how to filter calls using various parameters
 * such as date ranges, caller numbers, and other criteria.
 *
 * Prerequisites:
 * - Set RETREAVER_API_KEY in your .env file
 *
 * Run: npx ts-node cookbook/calls/03-filter-calls.ts
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

  console.log('🔍 Filtering Calls Examples\n');

  const config = new Configuration({ apiKey });
  const callsApi = new CallsApi(config);

  // Example 1: Filter by specific call ID
  console.log('1️⃣  Fetch Specific Call by ID');
  try {
    // Note: Replace with an actual call ID from your system
    const callId = 'your_call_id_here';
    console.log(`   Fetching call ID: ${callId}`);
    console.log('   💡 Tip: Run 01-fetch-calls-v1.ts first to get actual call IDs\n');

    // const call = await callsApi.getCall(callId);
    // console.log('   ✅ Call found:', call.data);
  } catch (error: any) {
    console.log('   ℹ️  Update callId with a real ID to test this example\n');
  }

  // Example 2: Filter by page and limit results
  console.log('2️⃣  Paginated Results');
  try {
    const page = 1;
    const perPage = 5;

    const response = await callsApi.getCalls(page, perPage);
    const calls = response.data;

    console.log(`   ✅ Retrieved ${calls.length} calls (page ${page}, ${perPage} per page)`);

    // Display basic info
    calls.forEach((call, index) => {
      console.log(`   ${index + 1}. Call ${call.id} - ${call.caller_number || 'N/A'} (${call.duration || 0}s)`);
    });
    console.log('');
  } catch (error: any) {
    console.error('   ❌ Error:', error.message);
  }

  // Example 3: Custom filtering tips
  console.log('3️⃣  Custom Filtering Tips');
  console.log('   The Retreaver API supports filtering via query parameters:');
  console.log('   - Date ranges: start_date, end_date');
  console.log('   - Campaign filtering: campaign_id');
  console.log('   - Status filtering: complete=true/false');
  console.log('   - Number filtering: caller_number, receiving_number');
  console.log('');
  console.log('   💡 For advanced filtering, you can:');
  console.log('   1. Fetch calls and filter in your application');
  console.log('   2. Use query parameters with the API endpoints');
  console.log('   3. Combine pagination with client-side filtering');
  console.log('');

  // Example 4: Client-side filtering
  console.log('4️⃣  Client-Side Filtering Example');
  try {
    const response = await callsApi.getCalls(1, 20);
    const calls = response.data;

    // Filter completed calls only
    const completedCalls = calls.filter(call => call.complete === true);
    console.log(`   ✅ Total calls fetched: ${calls.length}`);
    console.log(`   ✅ Completed calls: ${completedCalls.length}`);

    // Filter calls with duration > 30 seconds
    const longCalls = calls.filter(call => (call.duration || 0) > 30);
    console.log(`   ✅ Calls longer than 30s: ${longCalls.length}`);

  } catch (error: any) {
    console.error('   ❌ Error:', error.message);
  }
}

main().catch(console.error);
