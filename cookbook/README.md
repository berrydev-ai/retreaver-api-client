# Retreaver API Client Cookbook

A comprehensive collection of examples demonstrating how to use the Retreaver API Client in real-world scenarios. These examples are designed to be run with your actual Retreaver credentials and provide practical patterns for common use cases.

## 📋 Table of Contents

- [Setup](#-setup)
- [Getting Started](#-getting-started)
- [Calls API](#-calls-api)
- [Affiliates Management](#-affiliates-management)
- [Targets Management](#-targets-management)
- [Campaigns Management](#-campaigns-management)
- [Phone Numbers](#-phone-numbers)
- [Advanced Topics](#-advanced-topics)
- [Running Examples](#-running-examples)
- [Best Practices](#-best-practices)

## 🚀 Setup

### Prerequisites

- Node.js 14 or higher
- npm or yarn
- A Retreaver account with API access
- Your Retreaver API key

### Installation

1. **Install dependencies** (from the project root):
   ```bash
   npm install
   ```

2. **Install additional dependencies for running examples**:
   ```bash
   npm install -D ts-node dotenv
   ```

3. **Configure your API credentials**:
   ```bash
   # Copy the example environment file
   cp cookbook/.env.example cookbook/.env

   # Edit cookbook/.env and add your API key
   # RETREAVER_API_KEY=your_api_key_here
   ```

## 📚 Getting Started

Start here if you're new to the Retreaver API Client.

### Examples

| File | Description |
|------|-------------|
| [`getting-started/01-basic-setup.ts`](getting-started/01-basic-setup.ts) | Basic client configuration and connection testing |
| [`getting-started/02-authentication.ts`](getting-started/02-authentication.ts) | Authentication patterns and configuration options |

**Run these first:**
```bash
npx ts-node cookbook/getting-started/01-basic-setup.ts
npx ts-node cookbook/getting-started/02-authentication.ts
```

## 📞 Calls API

Learn how to fetch and work with call data using both V1 and V2 APIs.

### Examples

| File | Description |
|------|-------------|
| [`calls/01-fetch-calls-v1.ts`](calls/01-fetch-calls-v1.ts) | Fetch calls using V1 API (`/calls.json`) |
| [`calls/02-fetch-calls-v2.ts`](calls/02-fetch-calls-v2.ts) | Fetch calls using V2 API (`/api/v2/calls.json`) with enhanced data |
| [`calls/03-filter-calls.ts`](calls/03-filter-calls.ts) | Filter calls by various criteria |
| [`calls/04-pagination.ts`](calls/04-pagination.ts) | Handle pagination when fetching large datasets |

**Key Concepts:**
- V1 vs V2 API differences
- Pagination (25 results per page default)
- Client-side vs server-side filtering
- Call metadata and status

**Run examples:**
```bash
npx ts-node cookbook/calls/01-fetch-calls-v1.ts
npx ts-node cookbook/calls/02-fetch-calls-v2.ts
npx ts-node cookbook/calls/03-filter-calls.ts
npx ts-node cookbook/calls/04-pagination.ts
```

## 👥 Affiliates Management

Work with affiliates (publishers/sources) that generate calls.

### Examples

| File | Description |
|------|-------------|
| [`affiliates/01-list-affiliates.ts`](affiliates/01-list-affiliates.ts) | List all affiliates with pagination |
| [`affiliates/02-get-affiliate.ts`](affiliates/02-get-affiliate.ts) | Get detailed information for a specific affiliate |

**Use Cases:**
- Track affiliate performance
- Filter calls by affiliate
- Manage affiliate settings
- Generate affiliate reports

**Run examples:**
```bash
npx ts-node cookbook/affiliates/01-list-affiliates.ts
npx ts-node cookbook/affiliates/02-get-affiliate.ts
```

## 🎯 Targets Management

Manage targets (destination phone numbers where calls are routed).

### Examples

| File | Description |
|------|-------------|
| [`targets/01-list-targets.ts`](targets/01-list-targets.ts) | List all targets with pagination |
| [`targets/02-get-target.ts`](targets/02-get-target.ts) | Get detailed information for a specific target |

**Use Cases:**
- Configure call routing destinations
- Manage target availability and capacity
- Track target performance
- Set up backup/failover routing

**Run examples:**
```bash
npx ts-node cookbook/targets/01-list-targets.ts
npx ts-node cookbook/targets/02-get-target.ts
```

## 📢 Campaigns Management

Work with campaigns that control call routing logic and IVR settings.

### Examples

| File | Description |
|------|-------------|
| [`campaigns/01-list-campaigns.ts`](campaigns/01-list-campaigns.ts) | List all campaigns with pagination |
| [`campaigns/02-get-campaign.ts`](campaigns/02-get-campaign.ts) | Get detailed information for a specific campaign |

**Use Cases:**
- Understand call routing logic
- Analyze campaign performance
- Configure IVR and menus
- Manage target distribution
- Set up tracking parameters

**Run examples:**
```bash
npx ts-node cookbook/campaigns/01-list-campaigns.ts
npx ts-node cookbook/campaigns/02-get-campaign.ts
```

## 📱 Phone Numbers

Manage tracking phone numbers assigned to campaigns.

### Examples

| File | Description |
|------|-------------|
| [`numbers/01-list-numbers.ts`](numbers/01-list-numbers.ts) | List all phone numbers with pagination |
| [`numbers/02-get-number.ts`](numbers/02-get-number.ts) | Get detailed information for a specific number |

**Use Cases:**
- Tracking numbers for campaigns
- Dynamic number insertion (DNI)
- Number pooling for visitor tracking
- Multi-channel attribution

**Run examples:**
```bash
npx ts-node cookbook/numbers/01-list-numbers.ts
npx ts-node cookbook/numbers/02-get-number.ts
```

## 🚀 Advanced Topics

Production-ready patterns for error handling, batch operations, and optimization.

### Examples

| File | Description |
|------|-------------|
| [`advanced/01-error-handling.ts`](advanced/01-error-handling.ts) | Comprehensive error handling patterns with retry logic |
| [`advanced/02-batch-operations.ts`](advanced/02-batch-operations.ts) | Efficient batch processing and concurrent requests |

**Topics Covered:**
- HTTP error handling (400, 401, 404, 429, 500)
- Retry with exponential backoff
- Rate limiting and throttling
- Graceful degradation
- Input validation
- Batch processing
- Concurrent requests
- Data aggregation

**Run examples:**
```bash
npx ts-node cookbook/advanced/01-error-handling.ts
npx ts-node cookbook/advanced/02-batch-operations.ts
```

## 🏃 Running Examples

### Run a Single Example

```bash
npx ts-node cookbook/<category>/<example-file>.ts
```

### Run All Examples in a Category

```bash
# Getting started examples
npx ts-node cookbook/getting-started/01-basic-setup.ts
npx ts-node cookbook/getting-started/02-authentication.ts

# Calls examples
npx ts-node cookbook/calls/01-fetch-calls-v1.ts
npx ts-node cookbook/calls/02-fetch-calls-v2.ts
# ... etc
```

### Using the Built Library

If you've built the library, you can also import from the dist folder:

```typescript
import { Configuration, CallsApi } from '../dist';
```

## 📖 Best Practices

### Authentication
- ✅ Store API keys in environment variables, never in code
- ✅ Use a `.env` file for local development (add to `.gitignore`)
- ✅ Reuse `Configuration` objects across API clients
- ✅ Implement proper key rotation procedures

### Error Handling
- ✅ Always wrap API calls in try-catch blocks
- ✅ Implement retry logic with exponential backoff
- ✅ Handle rate limiting (HTTP 429) gracefully
- ✅ Don't retry client errors (4xx except 429)
- ✅ Log errors for debugging and monitoring

### Performance
- ✅ Use Promise.all() for concurrent independent requests
- ✅ Implement pagination for large datasets
- ✅ Process large datasets in batches
- ✅ Add delays between batch requests to respect rate limits
- ✅ Cache frequently accessed data when appropriate

### Pagination
- ✅ Use the `page` and `per_page` parameters
- ✅ Check response length to detect the last page
- ✅ Implement safety limits when fetching all records
- ✅ Parse Link headers for next/previous page URLs
- ✅ Default page size is 25, maximum varies by endpoint

### API Versioning
- ✅ Use V2 Calls API for enhanced call data
- ✅ V1 API: `/calls.json` (legacy)
- ✅ V2 API: `/api/v2/calls.json` (enhanced)
- ✅ Check the API documentation for version differences

### Rate Limiting
- ✅ Implement exponential backoff for retry logic
- ✅ Add delays between batch requests (100-500ms recommended)
- ✅ Monitor HTTP 429 responses
- ✅ Use batch operations instead of many individual requests
- ✅ Consider caching to reduce API calls

## 🤝 Contributing

Found a useful pattern or use case? Consider contributing:

1. Add your example to the appropriate category
2. Follow the existing code style and documentation format
3. Include clear comments and error handling
4. Update this README with your example

## 📚 Additional Resources

- [Retreaver API Documentation](https://docs.retreaver.com/)
- [Project README](../README.md)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 💡 Tips

- **Start with getting-started examples** to verify your setup
- **Check the console output** for detailed information and tips
- **Read the inline comments** in each example for additional context
- **Modify examples** to experiment with different parameters
- **Combine patterns** from multiple examples for complex use cases

## ⚠️ Important Notes

- These examples use real API calls and will count toward your API usage
- Start with small page sizes (`per_page`) when testing
- Some examples require existing data in your Retreaver account
- Always test in a development environment first
- Keep your API credentials secure and never commit them to version control

## 🆘 Troubleshooting

### API Key Issues
```
Error: 401 Unauthorized
```
- Check that `RETREAVER_API_KEY` is set in `cookbook/.env`
- Verify your API key is valid in your Retreaver dashboard
- Ensure there are no extra spaces or quotes in the `.env` file

### No Data Found
```
ℹ️  No [resources] found
```
- Create resources in your Retreaver dashboard first
- Check that you have the necessary permissions
- Verify you're using the correct company ID if applicable

### Rate Limiting
```
Error: 429 Too Many Requests
```
- Add delays between requests
- Reduce batch sizes
- Implement retry logic with exponential backoff

### Module Not Found
```
Error: Cannot find module
```
- Run `npm install` from the project root
- Ensure `ts-node` and `dotenv` are installed
- Build the project with `npm run build`

---

**Ready to get started?** Run the basic setup example:

```bash
npx ts-node cookbook/getting-started/01-basic-setup.ts
```
