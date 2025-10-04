/**
 * Error Handling Example
 *
 * This example demonstrates comprehensive error handling patterns
 * when working with the Retreaver API.
 *
 * Prerequisites:
 * - Set RETREAVER_API_KEY in your .env file
 *
 * Run: npx ts-node cookbook/advanced/01-error-handling.ts
 */

import { Configuration, CallsApi, AffiliatesApi } from '../../src';
import * as dotenv from 'dotenv';
import { AxiosError } from 'axios';

dotenv.config({ path: './cookbook/.env' });

// Helper function to handle API errors
function handleApiError(error: any, context: string) {
  console.error(`❌ Error in ${context}:`);

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error(`   Status: ${error.response.status}`);
    console.error(`   Message: ${error.message}`);

    switch (error.response.status) {
      case 400:
        console.error('   💡 Bad Request - Check your request parameters');
        break;
      case 401:
        console.error('   💡 Unauthorized - Check your API key');
        break;
      case 403:
        console.error('   💡 Forbidden - You may not have permission to access this resource');
        break;
      case 404:
        console.error('   💡 Not Found - The requested resource does not exist');
        break;
      case 429:
        console.error('   💡 Rate Limited - Too many requests, slow down');
        break;
      case 500:
        console.error('   💡 Server Error - Try again later or contact Retreaver support');
        break;
      default:
        console.error(`   💡 Unexpected error code: ${error.response.status}`);
    }

    if (error.response.data) {
      console.error('   Details:', JSON.stringify(error.response.data, null, 2));
    }
  } else if (error.request) {
    // The request was made but no response was received
    console.error('   💡 No response received from server');
    console.error('   Check your network connection and API endpoint');
  } else {
    // Something happened in setting up the request
    console.error('   💡 Error setting up request:', error.message);
  }
}

// Retry helper with exponential backoff
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: any;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;

      // Don't retry on client errors (4xx except 429)
      if (error.response?.status >= 400 && error.response?.status < 500 && error.response?.status !== 429) {
        throw error;
      }

      if (attempt < maxRetries) {
        const delay = baseDelay * Math.pow(2, attempt - 1);
        console.log(`   🔄 Retry ${attempt}/${maxRetries} after ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}

async function main() {
  const apiKey = process.env.RETREAVER_API_KEY;

  if (!apiKey) {
    console.error('❌ Error: RETREAVER_API_KEY not found');
    process.exit(1);
  }

  console.log('⚠️  Error Handling Examples\n');

  const config = new Configuration({ apiKey });
  const callsApi = new CallsApi(config);
  const affiliatesApi = new AffiliatesApi(config);

  // Example 1: Basic error handling
  console.log('1️⃣  Basic Error Handling');
  try {
    // Try to fetch a non-existent call
    const fakeCallId = 'non-existent-id-12345';
    await callsApi.getCall(fakeCallId);
  } catch (error: any) {
    handleApiError(error, 'fetching non-existent call');
  }
  console.log('');

  // Example 2: Authentication error handling
  console.log('2️⃣  Authentication Error Handling');
  try {
    const badConfig = new Configuration({ apiKey: 'invalid-api-key' });
    const badCallsApi = new CallsApi(badConfig);
    await badCallsApi.getCalls(1, 1);
  } catch (error: any) {
    handleApiError(error, 'authentication with invalid API key');
  }
  console.log('');

  // Example 3: Network error handling with retry
  console.log('3️⃣  Retry with Exponential Backoff');
  try {
    console.log('   Attempting request with retry logic...');
    const result = await retryWithBackoff(
      () => callsApi.getCalls(1, 1),
      3, // max retries
      1000 // base delay in ms
    );
    console.log('   ✅ Request succeeded');
  } catch (error: any) {
    handleApiError(error, 'request with retry logic');
  }
  console.log('');

  // Example 4: Graceful degradation
  console.log('4️⃣  Graceful Degradation');
  async function fetchDataWithFallback() {
    try {
      // Try to fetch calls
      const response = await callsApi.getCalls(1, 5);
      console.log(`   ✅ Successfully fetched ${response.data.length} calls`);
      return response.data;
    } catch (error: any) {
      console.error('   ⚠️  Failed to fetch calls, using empty dataset');
      handleApiError(error, 'fetching calls');
      // Return empty array as fallback
      return [];
    }
  }

  const calls = await fetchDataWithFallback();
  console.log(`   📊 Working with ${calls.length} calls (may be fallback data)`);
  console.log('');

  // Example 5: Validation before API call
  console.log('5️⃣  Input Validation');
  function validatePagination(page: number, perPage: number): boolean {
    if (page < 1) {
      console.error('   ❌ Page number must be >= 1');
      return false;
    }
    if (perPage < 1 || perPage > 100) {
      console.error('   ❌ Per page must be between 1 and 100');
      return false;
    }
    return true;
  }

  const testPage = 0;
  const testPerPage = 150;
  if (validatePagination(testPage, testPerPage)) {
    console.log('   ✅ Validation passed');
  } else {
    console.log('   💡 Fix validation errors before making API call');
  }
  console.log('');

  // Best practices summary
  console.log('📋 Error Handling Best Practices:');
  console.log('   ✅ Always wrap API calls in try-catch blocks');
  console.log('   ✅ Check error.response for HTTP error details');
  console.log('   ✅ Implement retry logic for transient failures');
  console.log('   ✅ Use exponential backoff for retries');
  console.log('   ✅ Validate inputs before making API calls');
  console.log('   ✅ Implement graceful degradation with fallbacks');
  console.log('   ✅ Log errors for debugging and monitoring');
  console.log('   ✅ Don\'t retry on client errors (4xx)');
  console.log('   ✅ Handle rate limiting (429) appropriately');
}

main().catch(console.error);
