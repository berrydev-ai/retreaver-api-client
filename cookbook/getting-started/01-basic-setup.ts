/**
 * Basic Setup Example
 *
 * This example demonstrates how to set up the Retreaver API client
 * with basic configuration.
 *
 * Prerequisites:
 * - Set RETREAVER_API_KEY in your .env file
 *
 * Run: npx ts-node cookbook/getting-started/01-basic-setup.ts
 */

import { Configuration, CallsApi } from '../../index';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: './cookbook/.env' });

async function main() {
  // Get API key from environment
  const apiKey = process.env.RETREAVER_API_KEY;

  if (!apiKey) {
    console.error('❌ Error: RETREAVER_API_KEY not found in environment variables');
    console.log('Please copy cookbook/.env.example to cookbook/.env and add your API key');
    process.exit(1);
  }

  console.log('🚀 Setting up Retreaver API client...\n');

  // Create configuration with API key
  const config = new Configuration({
    apiKey: apiKey,
    basePath: process.env.RETREAVER_BASE_URL || 'https://api.retreaver.com'
  });

  // Initialize API client
  const callsApi = new CallsApi(config);

  console.log('✅ Configuration created successfully!');
  console.log('📍 Base URL:', config.basePath);
  console.log('🔑 API Key:', apiKey.substring(0, 8) + '...' + apiKey.substring(apiKey.length - 4));

  // Test the connection by fetching calls
  try {
    console.log('\n🔍 Testing connection by fetching calls...');
    const response = await callsApi.getCalls(1, 1); // Fetch just 1 call
    console.log('✅ Connection successful!');
    console.log(`📊 Total calls available: ${response.data.length > 0 ? 'Yes' : 'No data yet'}`);
  } catch (error: any) {
    console.error('❌ Connection failed:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Details:', error.response.data);
    }
  }
}

// Run the example
main().catch(console.error);
