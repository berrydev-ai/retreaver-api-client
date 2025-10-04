/**
 * List Numbers Example
 *
 * This example demonstrates how to fetch and list phone numbers.
 * Numbers are the tracking phone numbers assigned to campaigns.
 *
 * Prerequisites:
 * - Set RETREAVER_API_KEY in your .env file
 *
 * Run: npx ts-node cookbook/numbers/01-list-numbers.ts
 */

import { Configuration, NumbersApi } from '../../index';
import * as dotenv from 'dotenv';

dotenv.config({ path: './cookbook/.env' });

async function main() {
  const apiKey = process.env.RETREAVER_API_KEY;

  if (!apiKey) {
    console.error('❌ Error: RETREAVER_API_KEY not found');
    process.exit(1);
  }

  console.log('📞 Listing Phone Numbers\n');

  const config = new Configuration({ apiKey });
  const numbersApi = new NumbersApi(config);

  try {
    // Fetch numbers
    console.log('🔍 Fetching phone numbers...');
    const page = 1;
    const perPage = 10;

    const response = await numbersApi.getNumbers(page, perPage);
    const numbers = response.data;

    console.log(`✅ Retrieved ${numbers.length} phone numbers\n`);

    // Display number information
    if (numbers.length === 0) {
      console.log('ℹ️  No phone numbers found. Purchase or add numbers in your Retreaver dashboard.');
    } else {
      numbers.forEach((number, index) => {
        console.log(`📞 Number ${index + 1}:`);
        console.log(`   ID: ${number.id}`);
        console.log(`   Number: ${number.number || 'N/A'}`);
        console.log(`   Name: ${number.name || 'N/A'}`);
        console.log(`   Status: ${number.active ? '🟢 Active' : '🔴 Inactive'}`);
        if (number.created_at) {
          console.log(`   Created: ${number.created_at}`);
        }
        console.log('');
      });
    }

    // Number management info
    console.log('💡 Phone Number Management:');
    console.log('   - Tracking numbers for campaigns');
    console.log('   - Dynamic number insertion (DNI)');
    console.log('   - Number pooling for visitor tracking');
    console.log('   - Port existing numbers or purchase new ones');

  } catch (error: any) {
    console.error('❌ Error fetching numbers:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Details:', error.response.data);
    }
  }
}

main().catch(console.error);
