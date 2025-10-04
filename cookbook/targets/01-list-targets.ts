/**
 * List Targets Example
 *
 * This example demonstrates how to fetch and list targets.
 * Targets are the destination phone numbers where calls are routed.
 *
 * Prerequisites:
 * - Set RETREAVER_API_KEY in your .env file
 *
 * Run: npx ts-node cookbook/targets/01-list-targets.ts
 */

import { Configuration, TargetsApi } from '../../index';
import * as dotenv from 'dotenv';

dotenv.config({ path: './cookbook/.env' });

async function main() {
  const apiKey = process.env.RETREAVER_API_KEY;

  if (!apiKey) {
    console.error('❌ Error: RETREAVER_API_KEY not found');
    process.exit(1);
  }

  console.log('🎯 Listing Targets\n');

  const config = new Configuration({ apiKey });
  const targetsApi = new TargetsApi(config);

  try {
    // Fetch targets
    console.log('🔍 Fetching targets...');
    const page = 1;
    const perPage = 10;

    const response = await targetsApi.getTargets(page, perPage);
    const targets = response.data;

    console.log(`✅ Retrieved ${targets.length} targets\n`);

    // Display target information
    if (targets.length === 0) {
      console.log('ℹ️  No targets found. Create one in your Retreaver dashboard first.');
    } else {
      targets.forEach((target, index) => {
        console.log(`🎯 Target ${index + 1}:`);
        console.log(`   ID: ${target.id}`);
        console.log(`   Name: ${target.name || 'N/A'}`);
        console.log(`   Number: ${target.number || 'N/A'}`);
        console.log(`   Status: ${target.active ? '🟢 Active' : '🔴 Inactive'}`);
        if (target.created_at) {
          console.log(`   Created: ${target.created_at}`);
        }
        console.log('');
      });
    }

    // Usage tips
    console.log('💡 Target Management:');
    console.log('   - Targets are destination numbers for call routing');
    console.log('   - Configure routing rules in campaigns');
    console.log('   - Track target performance via call data');
    console.log('   - Set target-specific settings (capacity, schedule, etc.)');

  } catch (error: any) {
    console.error('❌ Error fetching targets:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Details:', error.response.data);
    }
  }
}

main().catch(console.error);
