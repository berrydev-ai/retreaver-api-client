/**
 * Batch Operations Example
 *
 * This example demonstrates how to efficiently perform batch operations
 * such as fetching multiple resources, processing large datasets, and
 * handling concurrent requests.
 *
 * Prerequisites:
 * - Set RETREAVER_API_KEY in your .env file
 *
 * Run: npx ts-node cookbook/advanced/02-batch-operations.ts
 */

import { Configuration, CallsApi, AffiliatesApi, TargetsApi, CampaignsApi } from '../../src';
import * as dotenv from 'dotenv';

dotenv.config({ path: './cookbook/.env' });

// Helper to add delay between requests
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to process items in batches
async function processBatch<T, R>(
  items: T[],
  batchSize: number,
  processFn: (item: T) => Promise<R>,
  delayMs: number = 100
): Promise<R[]> {
  const results: R[] = [];

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    console.log(`   📦 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(items.length / batchSize)} (${batch.length} items)`);

    const batchResults = await Promise.all(batch.map(processFn));
    results.push(...batchResults);

    // Add delay between batches to respect rate limits
    if (i + batchSize < items.length) {
      await delay(delayMs);
    }
  }

  return results;
}

async function main() {
  const apiKey = process.env.RETREAVER_API_KEY;

  if (!apiKey) {
    console.error('❌ Error: RETREAVER_API_KEY not found');
    process.exit(1);
  }

  console.log('🚀 Batch Operations Examples\n');

  const config = new Configuration({ apiKey });
  const callsApi = new CallsApi(config);
  const affiliatesApi = new AffiliatesApi(config);
  const targetsApi = new TargetsApi(config);
  const campaignsApi = new CampaignsApi(config);

  // Example 1: Fetch all pages of calls
  console.log('1️⃣  Fetch All Calls (Multiple Pages)');
  try {
    const perPage = 25;
    const maxPages = 5; // Limit for demo
    let allCalls: any[] = [];

    console.log('   🔄 Fetching multiple pages...');

    for (let page = 1; page <= maxPages; page++) {
      const response = await callsApi.getCalls(page, perPage);
      const calls = response.data;

      if (calls.length === 0) break;

      allCalls = allCalls.concat(calls);
      console.log(`   📖 Page ${page}: ${calls.length} calls (total: ${allCalls.length})`);

      if (calls.length < perPage) break;

      // Small delay to respect rate limits
      await delay(100);
    }

    console.log(`   ✅ Total calls fetched: ${allCalls.length}\n`);
  } catch (error: any) {
    console.error('   ❌ Error:', error.message);
  }

  // Example 2: Fetch multiple resource types concurrently
  console.log('2️⃣  Fetch Multiple Resource Types Concurrently');
  try {
    console.log('   🔄 Fetching calls, affiliates, targets, and campaigns in parallel...');

    const [callsResponse, affiliatesResponse, targetsResponse, campaignsResponse] = await Promise.all([
      callsApi.getCalls(1, 5),
      affiliatesApi.getAffiliates(1, 5),
      targetsApi.getTargets(1, 5),
      campaignsApi.getCampaigns(1, 5)
    ]);

    console.log(`   ✅ Calls: ${callsResponse.data.length}`);
    console.log(`   ✅ Affiliates: ${affiliatesResponse.data.length}`);
    console.log(`   ✅ Targets: ${targetsResponse.data.length}`);
    console.log(`   ✅ Campaigns: ${campaignsResponse.data.length}\n`);
  } catch (error: any) {
    console.error('   ❌ Error:', error.message);
  }

  // Example 3: Process calls in batches
  console.log('3️⃣  Process Calls in Batches');
  try {
    // Fetch some calls
    const response = await callsApi.getCalls(1, 20);
    const calls = response.data;

    if (calls.length === 0) {
      console.log('   ℹ️  No calls to process\n');
    } else {
      console.log(`   📊 Processing ${calls.length} calls in batches of 5...\n`);

      // Process calls in batches
      const processed = await processBatch(
        calls,
        5, // batch size
        async (call) => {
          // Simulate some processing (e.g., enrichment, analysis)
          return {
            id: call.id,
            duration: call.duration || 0,
            status: call.complete ? 'completed' : 'in-progress'
          };
        },
        200 // delay between batches
      );

      console.log(`   ✅ Processed ${processed.length} calls\n`);
    }
  } catch (error: any) {
    console.error('   ❌ Error:', error.message);
  }

  // Example 4: Fetch call details for multiple IDs
  console.log('4️⃣  Fetch Details for Multiple Call IDs');
  try {
    // First get some call IDs
    const response = await callsApi.getCalls(1, 5);
    const callIds = response.data.map(call => call.id!).filter(id => id);

    if (callIds.length === 0) {
      console.log('   ℹ️  No call IDs available\n');
    } else {
      console.log(`   🔍 Fetching details for ${callIds.length} calls...`);

      // Fetch details with rate limiting
      const callDetails = await processBatch(
        callIds,
        2, // fetch 2 at a time to be conservative
        async (callId) => {
          try {
            const detailResponse = await callsApi.getCall(callId);
            return detailResponse.data;
          } catch (error) {
            console.error(`   ⚠️  Failed to fetch call ${callId}`);
            return null;
          }
        },
        500 // 500ms delay between batches
      );

      const successCount = callDetails.filter(d => d !== null).length;
      console.log(`   ✅ Successfully fetched ${successCount}/${callIds.length} call details\n`);
    }
  } catch (error: any) {
    console.error('   ❌ Error:', error.message);
  }

  // Example 5: Aggregate data from multiple sources
  console.log('5️⃣  Aggregate Data from Multiple Sources');
  try {
    console.log('   📊 Fetching and aggregating data...');

    const [calls, affiliates, targets] = await Promise.all([
      callsApi.getCalls(1, 10).then(r => r.data),
      affiliatesApi.getAffiliates(1, 10).then(r => r.data),
      targetsApi.getTargets(1, 10).then(r => r.data)
    ]);

    // Aggregate statistics
    const stats = {
      totalCalls: calls.length,
      completedCalls: calls.filter(c => c.complete).length,
      totalDuration: calls.reduce((sum, c) => sum + (c.duration || 0), 0),
      activeAffiliates: affiliates.filter(a => a.active).length,
      activeTargets: targets.filter(t => t.active).length
    };

    console.log('\n   📈 Aggregated Statistics:');
    console.log(`      Total Calls: ${stats.totalCalls}`);
    console.log(`      Completed Calls: ${stats.completedCalls}`);
    console.log(`      Total Call Duration: ${stats.totalDuration}s`);
    console.log(`      Active Affiliates: ${stats.activeAffiliates}`);
    console.log(`      Active Targets: ${stats.activeTargets}\n`);
  } catch (error: any) {
    console.error('   ❌ Error:', error.message);
  }

  // Best practices summary
  console.log('📋 Batch Operations Best Practices:');
  console.log('   ✅ Fetch multiple pages to get complete datasets');
  console.log('   ✅ Use Promise.all() for concurrent independent requests');
  console.log('   ✅ Process large datasets in smaller batches');
  console.log('   ✅ Add delays between batches to respect rate limits');
  console.log('   ✅ Handle individual failures gracefully in batch operations');
  console.log('   ✅ Implement progress tracking for long-running operations');
  console.log('   ✅ Set reasonable limits to avoid overwhelming the API');
  console.log('   ✅ Aggregate data efficiently to minimize API calls');
}

main().catch(console.error);
