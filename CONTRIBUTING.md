# Contributing to Retreaver API Client

Thank you for your interest in contributing to the Retreaver API client! This document provides guidelines and best practices for contributors.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Testing](#testing)
- [Code Style](#code-style)
- [Pull Request Process](#pull-request-process)
- [Release Process](#release-process)

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Git
- Basic knowledge of TypeScript and API client development

### Development Workflow

1. Fork the repository
2. Clone your fork locally
3. Create a feature branch
4. Make your changes
5. Write tests
6. Ensure all tests pass
7. Submit a pull request

## Development Setup

### 1. Clone and Install

```bash
# Clone your fork
git clone https://github.com/your-username/retreaver-api-client.git
cd retreaver-api-client

# Install dependencies
npm install

# or with yarn
yarn install
```

### 2. Development Scripts

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with coverage
npm run test:coverage

# Type checking
npm run typecheck

# Lint code
npm run lint

# Format code
npm run format

# Build the project
npm run build

# Prepare for publish
npm run prepare
```

### 3. IDE Configuration

We recommend using **VS Code** with the following extensions:

- **TypeScript and JavaScript Language Features** (built-in)
- **ESLint** - Microsoft
- **Prettier** - Prettier
- **Vitest** - Vitest

## Testing

### Test Requirements

- **80% minimum coverage** across all metrics
- **All tests must pass** before merging
- **New features must include tests**
- **Bug fixes must include regression tests**

### Test Structure

```
tests/
├── unit/                 # Unit tests
│   ├── api/             # API class tests
│   ├── models/          # Model tests
│   ├── configuration.test.ts
│   ├── base.test.ts
│   └── common.test.ts
├── integration/         # Integration tests
├── mocks/              # Mock utilities
│   ├── mock-data.ts    # Mock API responses
│   └── http-mocks.ts   # HTTP mocking utilities
└── setup/              # Test setup
    └── test-setup.ts   # Global configuration
```

### Writing Tests

Follow these guidelines when writing tests:

1. **Use descriptive test names**
2. **Follow Arrange-Act-Assert pattern**
3. **Mock external dependencies**
4. **Test both happy path and error cases**
5. **Use existing mock utilities**

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { CallsApi } from '../../../api/calls-api'
import { setupHttpMocks, mockGet } from '../../mocks/http-mocks'

describe('CallsApi', () => {
  let api: CallsApi

  beforeEach(() => {
    setupHttpMocks()
    api = new CallsApi(new Configuration({ apiKey: 'test-key' }))
  })

  it('should retrieve calls successfully', async () => {
    // Arrange
    const expectedResponse = { data: mockCallsV1ListResponse }
    mockGet('/calls.json', expectedResponse.data)

    // Act
    const result = await api.getCallsV1('test-api-key', 1)

    // Assert
    expect(result.data).toEqual(expectedResponse.data)
  })
})
```

For detailed testing guidelines, see [TESTING.md](./TESTING.md).

## Code Style

### ESLint Configuration

We use ESLint with TypeScript support. Configuration is in `.eslintrc.js`.

### Prettier Configuration

We use Prettier for code formatting. Configuration is in `.prettierrc`.

### Pre-commit Hooks

Husky and lint-staged automatically:
- **Lint and format** code before commits
- **Run tests** before pushes

### Code Guidelines

1. **TypeScript**: Use strict TypeScript typing
2. **Naming**: Use camelCase for variables, PascalCase for classes
3. **Comments**: Document public APIs and complex logic
4. **Error Handling**: Use proper error handling with try-catch
5. **Async/Await**: Prefer async/await over Promise chains

### Example Code Style

```typescript
// Good
import { Configuration, CallsApi } from '../api'

/**
 * Fetches calls with optional filtering
 * @param apiKey - Your Retreaver API key
 * @param companyId - Optional company ID
 * @returns Promise resolving to calls data
 */
export async function fetchCalls(
  apiKey: string,
  companyId?: number
): Promise<CallV1[]> {
  try {
    const config = new Configuration({ apiKey })
    const api = new CallsApi(config)
    
    const response = await api.getCallsV1(apiKey, companyId)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`API Error: ${error.response?.status}`)
    }
    throw error
  }
}
```

## Pull Request Process

### 1. Branch Naming

Use descriptive branch names:

```bash
# Good
feature/add-calls-v2-support
fix/fix-authentication-error
docs/update-api-documentation

# Avoid
feature-branch
fix-stuff
temp-branch
```

### 2. Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

```bash
# Format
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]

# Examples
feat(calls): add V2 API support
fix(auth): handle missing API key gracefully
docs(readme): update installation instructions
test(calls): add error handling tests
```

### 3. Pull Request Template

When creating a pull request, include:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] All tests pass
- [ ] New tests added
- [ ] Coverage maintained

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

### 4. Review Process

1. **Self-review**: Review your own changes
2. **Automated checks**: CI must pass
3. **Peer review**: At least one maintainer approval
4. **Merge**: Squash and merge to main branch

## Release Process

### Version Management

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Steps

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create release tag
4. Publish to npm
5. Create GitHub release

### Automated Releases

Releases are automated through GitHub Actions when:
- Merging to main branch
- Creating a new tag

## Bug Reports

When reporting bugs, include:

1. **Environment**: Node.js version, OS, browser
2. **Reproduction steps**: Minimal reproduction case
3. **Expected behavior**: What should happen
4. **Actual behavior**: What actually happens
5. **Error messages**: Full error stack traces
6. **Code examples**: Minimal code to reproduce

## Feature Requests

When requesting features:

1. **Use case**: Describe the problem you're solving
2. **Proposed solution**: How you envision the feature
3. **Alternatives**: Other approaches considered
4. **Additional context**: Any relevant information

## Questions and Support

- **GitHub Issues**: For bug reports and feature requests
- **Discussions**: For general questions and ideas
- **Documentation**: Check existing docs first

## Community Guidelines

### Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please:

- **Be respectful** of different viewpoints and experience levels
- **Be constructive** in feedback and criticism
- **Be collaborative** and work towards common goals
- **Be patient** with newcomers and questions

### Getting Help

- **Check documentation** first
- **Search existing issues** before creating new ones
- **Ask questions** in GitHub Discussions
- **Join our community** for real-time help

## Recognition

Contributors are recognized in:

- **README.md**: Contributors section
- **CHANGELOG.md**: Feature attributions
- **Release notes**: Major contributor acknowledgments

Thank you for contributing to the Retreaver API client! 🎉