/**
 * Pagination Example
 *
 * This example demonstrates how to handle pagination when fetching calls.
 * The Retreaver API returns 25 results per page by default and uses
 * Link headers for pagination.
 *
 * Prerequisites:
 * - Set RETREAVER_API_KEY in your .env file
 *
 * Run: npx ts-node cookbook/calls/04-pagination.ts
 */

import { Configuration, CallsApi } from '../../index';
import * as dotenv from 'dotenv';

dotenv.config({ path: './cookbook/.env' });

async function main() {
  const apiKey = process.env.RETREAVER_API_KEY;

  if (!apiKey) {
    console.error('❌ Error: RETREAVER_API_KEY not found');
    process.exit(1);
  }

  console.log('📄 Pagination Examples\n');

  const config = new Configuration({ apiKey });
  const callsApi = new CallsApi(config);

  // Example 1: Fetch multiple pages
  console.log('1️⃣  Fetching Multiple Pages');
  try {
    const perPage = 5;
    const maxPages = 3;
    let allCalls: any[] = [];

    for (let page = 1; page <= maxPages; page++) {
      console.log(`   📖 Fetching page ${page}...`);
      const response = await callsApi.getCalls(page, perPage);
      const calls = response.data;

      if (calls.length === 0) {
        console.log(`   ℹ️  No more calls found at page ${page}`);
        break;
      }

      allCalls = allCalls.concat(calls);
      console.log(`   ✅ Retrieved ${calls.length} calls from page ${page}`);

      // Check if we got fewer results than requested (last page)
      if (calls.length < perPage) {
        console.log('   ℹ️  Reached last page');
        break;
      }
    }

    console.log(`\n   📊 Total calls retrieved: ${allCalls.length}`);
    console.log('');
  } catch (error: any) {
    console.error('   ❌ Error:', error.message);
  }

  // Example 2: Fetch all calls (with safety limit)
  console.log('2️⃣  Fetch All Calls (with Safety Limit)');
  try {
    const perPage = 25;
    const maxCalls = 100; // Safety limit
    let allCalls: any[] = [];
    let currentPage = 1;
    let hasMore = true;

    console.log(`   🔄 Fetching up to ${maxCalls} calls...`);

    while (hasMore && allCalls.length < maxCalls) {
      const response = await callsApi.getCalls(currentPage, perPage);
      const calls = response.data;

      if (calls.length === 0) {
        hasMore = false;
        break;
      }

      allCalls = allCalls.concat(calls);
      console.log(`   📖 Page ${currentPage}: ${calls.length} calls (total: ${allCalls.length})`);

      // Stop if we got fewer results than requested (last page)
      if (calls.length < perPage) {
        hasMore = false;
      }

      currentPage++;

      // Respect rate limits - add small delay
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log(`\n   ✅ Retrieved ${allCalls.length} calls across ${currentPage - 1} pages`);
    console.log('');
  } catch (error: any) {
    console.error('   ❌ Error:', error.message);
  }

  // Example 3: Pagination best practices
  console.log('3️⃣  Pagination Best Practices');
  console.log('   ✅ Always use per_page parameter to control page size');
  console.log('   ✅ Check response length to detect last page');
  console.log('   ✅ Implement safety limits when fetching all records');
  console.log('   ✅ Add delays between requests to respect rate limits');
  console.log('   ✅ Handle pagination errors gracefully');
  console.log('   ✅ Parse Link headers if needed for next/prev pages');
  console.log('');
  console.log('   💡 Pagination Parameters:');
  console.log('      - page: Page number (starts at 1)');
  console.log('      - per_page: Results per page (default: 25, max varies by endpoint)');
  console.log('');

  // Example 4: Calculate pagination metadata
  console.log('4️⃣  Pagination Metadata Calculation');
  try {
    const perPage = 25;
    const firstPageResponse = await callsApi.getCalls(1, perPage);
    const firstPageCalls = firstPageResponse.data;

    console.log(`   📊 First page has ${firstPageCalls.length} results`);

    if (firstPageCalls.length === perPage) {
      console.log('   ℹ️  More pages likely available');
      console.log('   💡 Continue fetching until response.data.length < perPage');
    } else {
      console.log('   ℹ️  This is likely the last (or only) page');
    }
  } catch (error: any) {
    console.error('   ❌ Error:', error.message);
  }
}

main().catch(console.error);
