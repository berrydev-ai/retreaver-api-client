# Testing Guide

This document provides comprehensive guidelines for testing the Retreaver API client.

## Overview

We use **Vitest** as our testing framework with TypeScript support. The test suite includes unit tests, integration tests, and mocking utilities to ensure the reliability of the API client.

## Test Structure

```
tests/
├── unit/                 # Unit tests
│   ├── api/             # API class tests
│   ├── models/          # Model validation tests
│   ├── configuration.test.ts
│   ├── base.test.ts
│   └── common.test.ts
├── integration/         # Integration tests
├── mocks/              # Mock utilities and data
│   ├── mock-data.ts    # Mock API responses
│   └── http-mocks.ts   # HTTP mocking utilities
└── setup/              # Test setup files
    └── test-setup.ts   # Global test configuration
```

## Running Tests

### Development Mode
```bash
npm test                # Run tests in watch mode
npm run test:ui         # Run tests with Vitest UI
```

### CI Mode
```bash
npm run test:run        # Run tests once
npm run test:coverage   # Run tests with coverage
```

## Writing Tests

### Test Organization

1. **Arrange-Act-Assert Pattern**: Structure tests clearly with setup, execution, and verification phases
2. **Descriptive Test Names**: Use clear, descriptive test names that explain what is being tested
3. **Test Isolation**: Each test should be independent and not rely on other tests

### Example Test Structure

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { CallsApi } from '../../../api/calls-api'
import { Configuration } from '../../../configuration'
import { setupHttpMocks, mockGet } from '../../mocks/http-mocks'

describe('CallsApi', () => {
  let api: CallsApi
  let config: Configuration

  beforeEach(() => {
    setupHttpMocks()
    config = new Configuration({ apiKey: 'test-api-key' })
    api = new CallsApi(config)
  })

  describe('getCallsV1', () => {
    it('should retrieve calls successfully', async () => {
      // Arrange
      const expectedResponse = { data: mockCallsV1ListResponse }
      mockGet('/calls.json', expectedResponse.data)

      // Act
      const result = await api.getCallsV1('test-api-key', 1)

      // Assert
      expect(result.data).toEqual(expectedResponse.data)
      expect(result.status).toBe(200)
    })
  })
})
```

## Mocking

### HTTP Mocking

We use `axios-mock-adapter` for HTTP request mocking. The `http-mocks.ts` file provides utilities for common mocking scenarios:

```typescript
import { mockGet, mockPost, mockPut, mockDelete } from '../../mocks/http-mocks'

// Mock a GET request
mockGet('/calls.json', mockResponse)

// Mock a POST request
mockPost('/targets', mockResponse, 201)

// Mock with specific parameters
mockGet('/calls.json', mockResponse, 200, { api_key: 'test-key' })
```

### Mock Data

Mock data is centralized in `mock-data.ts` and based on the API documentation examples:

```typescript
import { mockCallsV1, mockCallV1Response } from '../../mocks/mock-data'

// Use mock data in tests
mockGet('/calls/uuid.json', mockCallV1Response)
```

## Test Coverage

We aim for **80% minimum coverage** across all metrics:
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%
- **Statements**: 80%

Coverage is automatically reported to Codecov in CI.

## Custom Matchers

We provide custom Vitest matchers for common validations:

```typescript
expect(call).toBeValidCall()
expect(affiliate).toBeValidAffiliate()
expect(target).toBeValidTarget()
expect(campaign).toBeValidCampaign()
```

## Testing Scenarios

### API Classes
- **Happy path**: Successful API calls with valid parameters
- **Error handling**: Network errors, API errors, validation errors
- **Parameter validation**: Required parameters, type validation
- **Authentication**: API key handling, company ID validation
- **Pagination**: Link header parsing, page navigation

### Configuration
- **Default values**: Ensure proper initialization
- **Custom values**: Test configuration overrides
- **MIME type detection**: JSON vs non-JSON content handling
- **Authentication methods**: API key, basic auth, bearer auth

### Models
- **Type validation**: Ensure proper TypeScript types
- **Data transformation**: API response to model mapping
- **Edge cases**: Empty responses, malformed data

### Common Utilities
- **Parameter validation**: Required parameter checking
- **URL construction**: Proper URL building and encoding
- **Serialization**: JSON serialization for requests
- **Authentication**: Various auth method implementations

## Best Practices

### 1. Test Naming
```typescript
// Good
it('should retrieve calls with valid API key')
it('should throw error when API key is missing')

// Avoid
it('test 1')
it('works')
```

### 2. Mock Management
```typescript
beforeEach(() => {
  setupHttpMocks() // Reset mocks before each test
})

afterEach(() => {
  clearRequestHistory() // Clean up request history
})
```

### 3. Error Testing
```typescript
it('should handle API errors gracefully', async () => {
  // Arrange
  mockGet('/calls.json', mockErrorResponse, 500)

  // Act & Assert
  await expect(api.getCallsV1('test-api-key', 1))
    .rejects.toThrow()
})
```

### 4. Parameter Validation
```typescript
it('should validate required parameters', async () => {
  // Act & Assert
  await expect(api.getCallByUuidV1('', 'uuid'))
    .rejects.toThrow('Required parameter apiKey was null or undefined')
})
```

## Debugging Tests

### 1. Console Output
```typescript
it('should debug request', async () => {
  console.log('Making request...')
  const result = await api.getCallsV1('test-api-key', 1)
  console.log('Response:', result.data)
})
```

### 2. Request Verification
```typescript
import { verifyRequest, getRequestHistory } from '../../mocks/http-mocks'

it('should verify request was made correctly', async () => {
  await api.getCallsV1('test-api-key', 1)
  
  // Verify specific request
  verifyRequest('get', '/calls.json', { api_key: 'test-api-key', company_id: 1 })
  
  // Check request history
  const history = getRequestHistory()
  expect(history.get).toHaveLength(1)
})
```

## Continuous Integration

Tests run automatically on:
- **Push** to main/develop branches
- **Pull requests** to main/develop branches
- **Multiple Node.js versions** (18.x, 20.x, latest)

### CI Checks
1. **Type checking**: `npm run typecheck`
2. **Linting**: `npm run lint`
3. **Formatting**: `npm run format:check`
4. **Tests**: `npm run test:coverage`
5. **Security audit**: `npm audit`
6. **Build verification**: `npm run build`

## Contributing Tests

When adding new features:

1. **Write tests first** (TDD approach when possible)
2. **Cover all scenarios**: happy path, errors, edge cases
3. **Use existing mock utilities** before creating new ones
4. **Update mock data** if API responses change
5. **Ensure 80% coverage** for new code
6. **Run tests locally** before pushing

### Pre-commit Hooks
We use Husky and lint-staged to automatically:
- **Lint and format** code before commits
- **Run tests** before pushes

This ensures code quality and prevents broken code from being committed.

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [axios-mock-adapter](https://github.com/ctimmerm/axios-mock-adapter)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)