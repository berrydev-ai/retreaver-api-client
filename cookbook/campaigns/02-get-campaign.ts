/**
 * Get Campaign Details Example
 *
 * This example demonstrates how to fetch detailed information
 * about a specific campaign by ID.
 *
 * Prerequisites:
 * - Set RETREAVER_API_KEY in your .env file
 * - Have at least one campaign in your Retreaver account
 *
 * Run: npx ts-node cookbook/campaigns/02-get-campaign.ts
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

  console.log('📢 Get Campaign Details\n');

  const config = new Configuration({ apiKey });
  const campaignsApi = new CampaignsApi(config);

  try {
    // First, get list of campaigns to find an ID
    console.log('🔍 Fetching campaigns to get an ID...');
    const listResponse = await campaignsApi.getCampaigns(1, 1);
    const campaigns = listResponse.data;

    if (campaigns.length === 0) {
      console.log('ℹ️  No campaigns found. Create one in your Retreaver dashboard first.');
      console.log('💡 Tip: Go to your Retreaver dashboard and create a campaign');
      return;
    }

    // Get details for the first campaign
    const campaignId = campaigns[0].id!;
    console.log(`✅ Found campaign ID: ${campaignId}\n`);

    console.log('🔍 Fetching detailed information...');
    const response = await campaignsApi.getCampaign(campaignId);
    const campaign = response.data;

    // Display detailed information
    console.log('📋 Campaign Details:\n');
    console.log(`   ID: ${campaign.id}`);
    console.log(`   Name: ${campaign.name || 'N/A'}`);
    console.log(`   Status: ${campaign.active ? '🟢 Active' : '🔴 Inactive'}`);

    if (campaign.created_at) {
      console.log(`   Created: ${campaign.created_at}`);
    }

    if (campaign.updated_at) {
      console.log(`   Updated: ${campaign.updated_at}`);
    }

    // Display usage information
    console.log('\n   💡 Use Campaign Data For:');
    console.log('      - Understanding call routing logic');
    console.log('      - Analyzing campaign performance');
    console.log('      - Configuring IVR and menus');
    console.log('      - Managing target distribution');
    console.log('      - Setting up tracking pixels');

  } catch (error: any) {
    console.error('❌ Error fetching campaign:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Details:', error.response.data);
    }
  }
}

main().catch(console.error);
