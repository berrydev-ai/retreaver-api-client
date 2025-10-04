/**
 * List Affiliates Example
 *
 * This example demonstrates how to fetch and list affiliates (publishers/sources).
 * Affiliates represent the sources of your calls in the Retreaver system.
 *
 * Prerequisites:
 * - Set RETREAVER_API_KEY in your .env file
 *
 * Run: npx ts-node cookbook/affiliates/01-list-affiliates.ts
 */

import { Configuration, AffiliatesApi } from '../../src';
import * as dotenv from 'dotenv';

dotenv.config({ path: './cookbook/.env' });

async function main() {
  const apiKey = process.env.RETREAVER_API_KEY;

  if (!apiKey) {
    console.error('❌ Error: RETREAVER_API_KEY not found');
    process.exit(1);
  }

  console.log('👥 Listing Affiliates\n');

  const config = new Configuration({ apiKey });
  const affiliatesApi = new AffiliatesApi(config);

  try {
    // Fetch affiliates
    console.log('🔍 Fetching affiliates...');
    const page = 1;
    const perPage = 10;

    const response = await affiliatesApi.getAffiliates(page, perPage);
    const affiliates = response.data;

    console.log(`✅ Retrieved ${affiliates.length} affiliates\n`);

    // Display affiliate information
    if (affiliates.length === 0) {
      console.log('ℹ️  No affiliates found. Create one in your Retreaver dashboard first.');
    } else {
      affiliates.forEach((affiliate, index) => {
        console.log(`👤 Affiliate ${index + 1}:`);
        console.log(`   ID: ${affiliate.id}`);
        console.log(`   Name: ${affiliate.name || 'N/A'}`);
        console.log(`   Status: ${affiliate.active ? '🟢 Active' : '🔴 Inactive'}`);
        if (affiliate.created_at) {
          console.log(`   Created: ${affiliate.created_at}`);
        }
        console.log('');
      });
    }

    // Pagination info
    console.log('📄 Pagination:');
    console.log(`   Current page: ${page}`);
    console.log(`   Results: ${affiliates.length}`);
    if (affiliates.length === perPage) {
      console.log('   💡 More affiliates may be available on next pages');
    }

  } catch (error: any) {
    console.error('❌ Error fetching affiliates:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Details:', error.response.data);
    }
  }
}

main().catch(console.error);
