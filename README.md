# Retreaver API Client

TypeScript/JavaScript client library for the [Retreaver Core API](https://api.retreaver.com). This client provides type-safe access to all Retreaver API endpoints for managing call tracking, routing, affiliates, campaigns, targets, and more.

## Features

- 🎯 **Full TypeScript Support** - Complete type definitions for all API operations
- 📦 **Multiple Module Formats** - CommonJS and ES Modules support
- 🔐 **Secure Authentication** - Built-in API key authentication
- 🚀 **Modern HTTP Client** - Uses Axios for reliable HTTP requests
- 📝 **Comprehensive API Coverage** - All Retreaver Core API endpoints

## Installation

```bash
npm install retreaver-api-client
```

## Quick Start

### Basic Usage

```typescript
import { Configuration, CallsV2Api } from 'retreaver-api-client';

// Configure the API client with your API key
const config = new Configuration({
  apiKey: 'your_api_key_here'
});

// Create an API instance
const callsApi = new CallsV2Api(config);

// Fetch recent calls
const calls = await callsApi.getCallsV2('your_api_key_here');
console.log(calls.data);
```

### JavaScript (CommonJS)

```javascript
const { Configuration, CallsV2Api } = require('retreaver-api-client');

const config = new Configuration({
  apiKey: 'your_api_key_here'
});

const callsApi = new CallsV2Api(config);

callsApi.getCallsV2('your_api_key_here')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

## Authentication

All API requests require an API key. You can obtain your API key from [https://retreaver.com/users/edit](https://retreaver.com/users/edit).

**Security Warning:** Never expose your API key publicly! Store it securely using environment variables.

```typescript
const config = new Configuration({
  apiKey: process.env.RETREAVER_API_KEY
});
```

If you have access to multiple companies, you'll also need to pass the `company_id` parameter:

```typescript
const calls = await callsApi.getCallsV2(
  process.env.RETREAVER_API_KEY,
  1234 // company_id
);
```

## Usage Examples

### Working with Calls

#### Fetch Recent Calls (V2 API)

```typescript
import { Configuration, CallsV2Api } from 'retreaver-api-client';

const config = new Configuration({ apiKey: process.env.RETREAVER_API_KEY });
const callsApi = new CallsV2Api(config);

// Get calls with filters
const response = await callsApi.getCallsV2(
  process.env.RETREAVER_API_KEY,
  undefined, // company_id
  '2024-01-01T00:00:00+00:00', // created_at_start
  '2024-01-31T23:59:59+00:00', // created_at_end
  'created_at', // sort_by
  'desc', // order
  undefined, // caller
  undefined, // client_afid
  undefined, // client_cid
  undefined, // client_tid
  undefined, // sub_id
  true, // call_flow_events
  1 // page
);

console.log(response.data);
```

#### Get a Specific Call by UUID

```typescript
const callUuid = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
const response = await callsApi.getCallByUuidV2(
  callUuid,
  process.env.RETREAVER_API_KEY
);

console.log(response.data.call);
```

### Managing Affiliates

```typescript
import { Configuration, AffiliatesApi } from 'retreaver-api-client';

const config = new Configuration({ apiKey: process.env.RETREAVER_API_KEY });
const affiliatesApi = new AffiliatesApi(config);

// Get all affiliates
const affiliates = await affiliatesApi.getAffiliates(process.env.RETREAVER_API_KEY);

// Create a new affiliate
const newAffiliate = await affiliatesApi.createAffiliate(
  process.env.RETREAVER_API_KEY,
  {
    affiliate: {
      afid: 'affiliate-123',
      first_name: 'John',
      last_name: 'Doe',
      company_name: 'Acme Corp'
    }
  }
);

// Update an affiliate
const updated = await affiliatesApi.updateAffiliate(
  'affiliate-123',
  process.env.RETREAVER_API_KEY,
  {
    affiliate: {
      company_name: 'Updated Company Name'
    }
  }
);

// Delete an affiliate
await affiliatesApi.deleteAffiliate('affiliate-123', process.env.RETREAVER_API_KEY);
```

### Managing Targets

```typescript
import { Configuration, TargetsApi } from 'retreaver-api-client';

const config = new Configuration({ apiKey: process.env.RETREAVER_API_KEY });
const targetsApi = new TargetsApi(config);

// Get all targets
const targets = await targetsApi.getTargets(process.env.RETREAVER_API_KEY);

// Create a new target
const newTarget = await targetsApi.createTarget(
  process.env.RETREAVER_API_KEY,
  {
    target: {
      number: '+15551234567',
      name: 'Sales Team',
      priority: 1,
      timeout_seconds: 30
    }
  }
);

// Update a target
const updatedTarget = await targetsApi.updateTarget(
  12345, // target id
  process.env.RETREAVER_API_KEY,
  {
    target: {
      name: 'Updated Sales Team',
      paused: false
    }
  }
);

// Reset target cap
await targetsApi.resetTargetCap(12345, process.env.RETREAVER_API_KEY);
```

### Managing Campaigns

```typescript
import { Configuration, CampaignsApi } from 'retreaver-api-client';

const config = new Configuration({ apiKey: process.env.RETREAVER_API_KEY });
const campaignsApi = new CampaignsApi(config);

// Get all campaigns
const campaigns = await campaignsApi.getCampaigns(process.env.RETREAVER_API_KEY);

// Create a campaign
const newCampaign = await campaignsApi.createCampaign(
  process.env.RETREAVER_API_KEY,
  {
    campaign: {
      cid: 'campaign-123',
      name: 'My Campaign',
      record_calls: true,
      message: 'Welcome to our service',
      voice_gender: 'Female'
    }
  }
);

// Update a campaign
const updated = await campaignsApi.updateCampaign(
  'campaign-123',
  process.env.RETREAVER_API_KEY,
  {
    campaign: {
      name: 'Updated Campaign Name',
      dedupe_seconds: 300
    }
  }
);
```

### Working with Numbers

```typescript
import { Configuration, NumbersApi } from 'retreaver-api-client';

const config = new Configuration({ apiKey: process.env.RETREAVER_API_KEY });
const numbersApi = new NumbersApi(config);

// Get all phone numbers
const numbers = await numbersApi.getNumbers(process.env.RETREAVER_API_KEY);
console.log(numbers.data);
```

## API Reference

### Available API Classes

- **CallsApi** - V1 calls endpoint (legacy)
- **CallsV2Api** - V2 calls endpoint with enhanced data
- **AffiliatesApi** - Manage affiliates/publishers/sources
- **TargetsApi** - Manage destination phone numbers for routing
- **CampaignsApi** - Manage campaigns with routing and IVR settings
- **NumbersApi** - View phone numbers routed to campaigns

### API Endpoints

All URIs are relative to `https://api.retreaver.com`

#### Calls API

| Method | HTTP Request | Description |
|--------|--------------|-------------|
| `getCallsV1` | `GET /calls.json` | Get recent calls (V1) |
| `getCallByUuidV1` | `GET /calls/{uuid}.json` | Get specific call by UUID (V1) |
| `getCallsV2` | `GET /api/v2/calls.json` | Get recent calls (V2) |
| `getCallByUuidV2` | `GET /api/v2/calls/{uuid}.json` | Get specific call by UUID (V2) |

#### Affiliates API

| Method | HTTP Request | Description |
|--------|--------------|-------------|
| `getAffiliates` | `GET /affiliates.json` | Get all affiliates |
| `createAffiliate` | `POST /affiliates.json` | Create an affiliate |
| `getAffiliateByAfid` | `GET /affiliates/afid/{afid}.json` | Get affiliate by AFID |
| `updateAffiliate` | `PUT /affiliates/afid/{afid}.json` | Update an affiliate |
| `deleteAffiliate` | `DELETE /affiliates/afid/{afid}.json` | Delete an affiliate |

#### Targets API

| Method | HTTP Request | Description |
|--------|--------------|-------------|
| `getTargets` | `GET /targets.json` | Get all targets |
| `createTarget` | `POST /targets.json` | Create a target |
| `getTargetById` | `GET /targets/{id}.json` | Get specific target |
| `updateTarget` | `PUT /targets/{id}.json` | Update a target |
| `deleteTarget` | `DELETE /targets/{id}.json` | Delete a target |
| `resetTargetCap` | `POST /targets/{id}/reset_cap.json` | Reset target hard cap |

#### Campaigns API

| Method | HTTP Request | Description |
|--------|--------------|-------------|
| `getCampaigns` | `GET /campaigns.json` | Get all campaigns |
| `createCampaign` | `POST /campaigns.json` | Create a campaign |
| `getCampaignByCid` | `GET /campaigns/cid/{cid}.json` | Get campaign by CID |
| `updateCampaign` | `PUT /campaigns/cid/{cid}.json` | Update a campaign |
| `deleteCampaign` | `DELETE /campaigns/cid/{cid}.json` | Delete a campaign |

#### Numbers API

| Method | HTTP Request | Description |
|--------|--------------|-------------|
| `getNumbers` | `GET /numbers.json` | Get all numbers |

## Pagination

The API returns 25 results per page. Use the `Link` HTTP header to navigate between pages:

```typescript
const response = await callsApi.getCallsV2(
  process.env.RETREAVER_API_KEY,
  undefined,
  undefined,
  undefined,
  'created_at',
  'desc',
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  false,
  2 // page number
);

// Check Link header for next/prev URLs
console.log(response.headers.link);
```

## Error Handling

```typescript
import { AxiosError } from 'axios';

try {
  const response = await callsApi.getCallsV2(process.env.RETREAVER_API_KEY);
  console.log(response.data);
} catch (error) {
  if (error instanceof AxiosError) {
    console.error('API Error:', error.response?.status);
    console.error('Error Details:', error.response?.data);
  } else {
    console.error('Unexpected Error:', error);
  }
}
```

## Building from Source

```bash
# Clone the repository
git clone https://github.com/berrydev-ai/retreaver-api-client.git
cd retreaver-api-client

# Install dependencies
npm install

# Build the project
npm run build
```

This will generate:
- CommonJS output in `dist/`
- ES Modules output in `dist/esm/`

## TypeScript Support

This library includes TypeScript definitions. The types are automatically resolved when you import the package:

```typescript
import { CallV2, Campaign, Target } from 'retreaver-api-client';

const call: CallV2 = {
  uuid: '...',
  caller: '+15551234567',
  // ... fully typed!
};
```

## Requirements

- Node.js 12.x or higher
- TypeScript 4.x or 5.x (for TypeScript projects)

## Dependencies

- `axios` ^1.6.1

## Support

- [Retreaver Support](https://support.retreaver.com/)
- [API Documentation](https://api.retreaver.com)

## License

MIT

## Testing

This project includes a comprehensive test suite using Vitest. For detailed testing guidelines, see [TESTING.md](./TESTING.md).

### Running Tests

```bash
# Development mode (watch)
npm test

# Run tests once
npm run test:run

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

### Test Structure

- **Unit tests** for all API classes, models, and utilities
- **Mock data** based on API documentation examples
- **HTTP mocking** using axios-mock-adapter
- **TypeScript support** with full type checking
- **Coverage reporting** with 80% minimum threshold

### Quality Assurance

- **ESLint** for code linting
- **Prettier** for code formatting
- **Husky** for pre-commit hooks
- **GitHub Actions** for CI/CD
- **Security audits** with npm audit

## Contributing

Contributions are welcome! Please see [TESTING.md](./TESTING.md) for testing guidelines and [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed contribution guidelines.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/berrydev-ai/retreaver-api-client.git
cd retreaver-api-client

# Install dependencies
npm install

# Run tests
npm test

# Build the project
npm run build
```

### Pre-commit Hooks

This project uses Husky and lint-staged to ensure code quality:

- **Lint and format** code before commits
- **Run tests** before pushes
- **Type checking** for TypeScript files

### Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Write tests for new functionality
4. Ensure all tests pass and coverage is maintained
5. Submit a pull request with a clear description