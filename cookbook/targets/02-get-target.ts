/**
 * Get Target Details Example
 *
 * This example demonstrates how to fetch detailed information
 * about a specific target by ID.
 *
 * Prerequisites:
 * - Set RETREAVER_API_KEY in your .env file
 * - Have at least one target in your Retreaver account
 *
 * Run: npx ts-node cookbook/targets/02-get-target.ts
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

  console.log('🎯 Get Target Details\n');

  const config = new Configuration({ apiKey });
  const targetsApi = new TargetsApi(config);

  try {
    // First, get list of targets to find an ID
    console.log('🔍 Fetching targets to get an ID...');
    const listResponse = await targetsApi.getTargets(1, 1);
    const targets = listResponse.data;

    if (targets.length === 0) {
      console.log('ℹ️  No targets found. Create one in your Retreaver dashboard first.');
      console.log('💡 Tip: Go to your Retreaver dashboard and create a target destination');
      return;
    }

    // Get details for the first target
    const targetId = targets[0].id!;
    console.log(`✅ Found target ID: ${targetId}\n`);

    console.log('🔍 Fetching detailed information...');
    const response = await targetsApi.getTarget(targetId);
    const target = response.data;

    // Display detailed information
    console.log('📋 Target Details:\n');
    console.log(`   ID: ${target.id}`);
    console.log(`   Name: ${target.name || 'N/A'}`);
    console.log(`   Number: ${target.number || 'N/A'}`);
    console.log(`   Status: ${target.active ? '🟢 Active' : '🔴 Inactive'}`);

    if (target.created_at) {
      console.log(`   Created: ${target.created_at}`);
    }

    if (target.updated_at) {
      console.log(`   Updated: ${target.updated_at}`);
    }

    // Display configuration hints
    console.log('\n   💡 Common Target Settings:');
    console.log('      - Call routing priority');
    console.log('      - Operating hours/schedule');
    console.log('      - Concurrent call capacity');
    console.log('      - Geographic routing rules');
    console.log('      - Backup/failover targets');

  } catch (error: any) {
    console.error('❌ Error fetching target:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Details:', error.response.data);
    }
  }
}

main().catch(console.error);
