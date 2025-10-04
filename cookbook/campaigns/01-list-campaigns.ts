/**
 * List Campaigns Example
 *
 * This example demonstrates how to fetch and list campaigns.
 * Campaigns contain the routing logic and IVR settings for call flows.
 *
 * Prerequisites:
 * - Set RETREAVER_API_KEY in your .env file
 *
 * Run: npx ts-node cookbook/campaigns/01-list-campaigns.ts
 */

import { Configuration, CampaignsApi } from '../../index';
import * as dotenv from 'dotenv';

dotenv.config({ path: './cookbook/.env' });

async function main() {
  const apiKey = process.env.RETREAVER_API_KEY;

  if (!apiKey) {
    console.error('❌ Error: RETREAVER_API_KEY not found');
    process.exit(1);
  }

  console.log('📢 Listing Campaigns\n');

  const config = new Configuration({ apiKey });
  const campaignsApi = new CampaignsApi(config);

  try {
    // Fetch campaigns
    console.log('🔍 Fetching campaigns...');
    const page = 1;
    const perPage = 10;

    const response = await campaignsApi.getCampaigns(page, perPage);
    const campaigns = response.data;

    console.log(`✅ Retrieved ${campaigns.length} campaigns\n`);

    // Display campaign information
    if (campaigns.length === 0) {
      console.log('ℹ️  No campaigns found. Create one in your Retreaver dashboard first.');
    } else {
      campaigns.forEach((campaign, index) => {
        console.log(`📢 Campaign ${index + 1}:`);
        console.log(`   ID: ${campaign.id}`);
        console.log(`   Name: ${campaign.name || 'N/A'}`);
        console.log(`   Status: ${campaign.active ? '🟢 Active' : '🔴 Inactive'}`);
        if (campaign.created_at) {
          console.log(`   Created: ${campaign.created_at}`);
        }
        console.log('');
      });
    }

    // Campaign overview
    console.log('💡 Campaign Features:');
    console.log('   - Call routing rules and priority');
    console.log('   - IVR and menu configurations');
    console.log('   - Target distribution logic');
    console.log('   - Call recording settings');
    console.log('   - Tracking parameters');

  } catch (error: any) {
    console.error('❌ Error fetching campaigns:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Details:', error.response.data);
    }
  }
}

main().catch(console.error);
