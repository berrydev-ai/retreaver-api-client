/**
 * Get Number Details Example
 *
 * This example demonstrates how to fetch detailed information
 * about a specific phone number by ID.
 *
 * Prerequisites:
 * - Set RETREAVER_API_KEY in your .env file
 * - Have at least one phone number in your Retreaver account
 *
 * Run: npx ts-node cookbook/numbers/02-get-number.ts
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

  console.log('📞 Get Phone Number Details\n');

  const config = new Configuration({ apiKey });
  const numbersApi = new NumbersApi(config);

  try {
    // First, get list of numbers to find an ID
    console.log('🔍 Fetching phone numbers to get an ID...');
    const listResponse = await numbersApi.getNumbers(1, 1);
    const numbers = listResponse.data;

    if (numbers.length === 0) {
      console.log('ℹ️  No phone numbers found. Purchase or add numbers in your Retreaver dashboard.');
      console.log('💡 Tip: Go to your Retreaver dashboard to purchase tracking numbers');
      return;
    }

    // Get details for the first number
    const numberId = numbers[0].id!;
    console.log(`✅ Found number ID: ${numberId}\n`);

    console.log('🔍 Fetching detailed information...');
    const response = await numbersApi.getNumber(numberId);
    const number = response.data;

    // Display detailed information
    console.log('📋 Phone Number Details:\n');
    console.log(`   ID: ${number.id}`);
    console.log(`   Number: ${number.number || 'N/A'}`);
    console.log(`   Name: ${number.name || 'N/A'}`);
    console.log(`   Status: ${number.active ? '🟢 Active' : '🔴 Inactive'}`);

    if (number.created_at) {
      console.log(`   Created: ${number.created_at}`);
    }

    if (number.updated_at) {
      console.log(`   Updated: ${number.updated_at}`);
    }

    // Display usage scenarios
    console.log('\n   💡 Number Usage Scenarios:');
    console.log('      - Display on website for call tracking');
    console.log('      - Use in marketing campaigns');
    console.log('      - Dynamic number insertion (DNI)');
    console.log('      - Track visitor-to-call attribution');
    console.log('      - A/B testing with multiple numbers');

  } catch (error: any) {
    console.error('❌ Error fetching number:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Details:', error.response.data);
    }
  }
}

main().catch(console.error);
