/**
 * Get Affiliate Details Example
 *
 * This example demonstrates how to fetch detailed information
 * about a specific affiliate by ID.
 *
 * Prerequisites:
 * - Set RETREAVER_API_KEY in your .env file
 * - Have at least one affiliate in your Retreaver account
 *
 * Run: npx ts-node cookbook/affiliates/02-get-affiliate.ts
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

  console.log('👤 Get Affiliate Details\n');

  const config = new Configuration({ apiKey });
  const affiliatesApi = new AffiliatesApi(config);

  try {
    // First, get list of affiliates to find an ID
    console.log('🔍 Fetching affiliates to get an ID...');
    const listResponse = await affiliatesApi.getAffiliates(1, 1);
    const affiliates = listResponse.data;

    if (affiliates.length === 0) {
      console.log('ℹ️  No affiliates found. Create one in your Retreaver dashboard first.');
      console.log('💡 Tip: Go to your Retreaver dashboard and create an affiliate/publisher');
      return;
    }

    // Get details for the first affiliate
    const affiliateId = affiliates[0].id!;
    console.log(`✅ Found affiliate ID: ${affiliateId}\n`);

    console.log('🔍 Fetching detailed information...');
    const response = await affiliatesApi.getAffiliate(affiliateId);
    const affiliate = response.data;

    // Display detailed information
    console.log('📋 Affiliate Details:\n');
    console.log(`   ID: ${affiliate.id}`);
    console.log(`   Name: ${affiliate.name || 'N/A'}`);
    console.log(`   Status: ${affiliate.active ? '🟢 Active' : '🔴 Inactive'}`);

    if (affiliate.created_at) {
      console.log(`   Created: ${affiliate.created_at}`);
    }

    if (affiliate.updated_at) {
      console.log(`   Updated: ${affiliate.updated_at}`);
    }

    // Display any additional fields
    console.log('\n   💡 Use this data to:');
    console.log('      - Track affiliate performance');
    console.log('      - Update affiliate settings');
    console.log('      - Filter calls by affiliate');
    console.log('      - Generate affiliate reports');

  } catch (error: any) {
    console.error('❌ Error fetching affiliate:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Details:', error.response.data);
    }
  }
}

main().catch(console.error);
