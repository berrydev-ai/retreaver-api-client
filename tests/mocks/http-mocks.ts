import { vi } from 'vitest'
import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'

// Create a mock adapter for axios
export const mockAxios = new AxiosMockAdapter(axios, {
  onNoMatch: 'throwException',
  delayResponse: 0,
})

// Helper function to setup common mocks
export function setupHttpMocks() {
  // Reset all mocks
  mockAxios.reset()
  // Don't set up a default catch-all - let onNoMatch: 'throwException' handle unmatched requests
}

// Helper function to restore mocks
export function restoreHttpMocks() {
  mockAxios.restore()
}

// Helper function to create a mock response
export function createMockResponse<T>(data: T, status = 200, headers = {}) {
  return [status, data, headers] as const
}

// Helper function to create a mock error response
export function createMockErrorResponse(status: number, message: string, data?: any) {
  const error = new Error(message)
  ;(error as any).response = {
    status,
    data: data || { error: message },
  }
  return error
}

// Helper function to mock a GET request
// Accepts either a path (/calls.json) or full URL (https://...)
// Uses regex matcher to handle both cases and ignore query parameters
export function mockGet(url: string, response: any, status = 200) {
  // Create a regex that matches the URL path regardless of base URL or query params
  const urlPattern = url.startsWith('http')
    ? new RegExp(`^${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\?.*)?$`)
    : new RegExp(`^https?://[^/]+${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\?.*)?$`)
  mockAxios.onGet(urlPattern).reply(status, response)
}

// Helper function to mock a POST request
export function mockPost(url: string, response: any, status = 201) {
  const urlPattern = url.startsWith('http')
    ? new RegExp(`^${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\?.*)?$`)
    : new RegExp(`^https?://[^/]+${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\?.*)?$`)
  mockAxios.onPost(urlPattern).reply(status, response)
}

// Helper function to mock a PUT request
export function mockPut(url: string, response: any, status = 200) {
  const urlPattern = url.startsWith('http')
    ? new RegExp(`^${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\?.*)?$`)
    : new RegExp(`^https?://[^/]+${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\?.*)?$`)
  mockAxios.onPut(urlPattern).reply(status, response)
}

// Helper function to mock a DELETE request
export function mockDelete(url: string, status = 204) {
  const urlPattern = url.startsWith('http')
    ? new RegExp(`^${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\?.*)?$`)
    : new RegExp(`^https?://[^/]+${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\?.*)?$`)
  mockAxios.onDelete(urlPattern).reply(status)
}

// Helper function to mock a request with specific parameters
export function mockRequest(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  response: any,
  status = 200,
  params?: Record<string, any>
) {
  const matcher = params 
    ? { url, params, method }
    : { url, method }
  
  mockAxios.onAny(matcher).reply(status, response)
}

// Helper function to verify a request was made
export function verifyRequest(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  params?: Record<string, any>,
  data?: any
) {
  const history = mockAxios.history
  const methodHistory = history[method.toLowerCase() as keyof typeof history]

  const matchingRequest = methodHistory?.find(req => {
    // Handle both full URLs and paths
    const requestUrl = req.url || ''
    const urlMatch = url.startsWith('http')
      ? requestUrl.split('?')[0] === url  // Full URL comparison (without query string)
      : requestUrl.includes(url)           // Path comparison

    if (!urlMatch) return false

    // If params are provided, extract and compare query parameters from URL
    if (params) {
      try {
        const urlObj = new URL(requestUrl)
        const actualParams: Record<string, any> = {}
        urlObj.searchParams.forEach((value, key) => {
          actualParams[key] = value
        })

        // Convert expected params to strings for comparison (URL params are always strings)
        const expectedParams: Record<string, string> = {}
        Object.entries(params).forEach(([key, value]) => {
          expectedParams[key] = String(value)
        })

        if (!deepEqual(actualParams, expectedParams)) return false
      } catch (e) {
        // If URL parsing fails, fall back to params object comparison
        if (!deepEqual(req.params, params)) return false
      }
    }

    if (data && !deepEqual(JSON.parse(req.data || '{}'), data)) return false
    return true
  })

  if (!matchingRequest) {
    throw new Error(`Expected ${method.toUpperCase()} request to ${url} was not made`)
  }

  return matchingRequest
}

// Helper function to get request history
export function getRequestHistory() {
  return {
    get: mockAxios.history.get,
    post: mockAxios.history.post,
    put: mockAxios.history.put,
    delete: mockAxios.history.delete,
  }
}

// Helper function to clear request history
export function clearRequestHistory() {
  mockAxios.resetHistory()
}

// Deep equality check for objects
function deepEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) return true
  if (obj1 == null || obj2 == null) return false
  if (typeof obj1 !== typeof obj2) return false
  
  if (typeof obj1 !== 'object') return obj1 === obj2
  
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)
  
  if (keys1.length !== keys2.length) return false
  
  for (const key of keys1) {
    if (!keys2.includes(key)) return false
    if (!deepEqual(obj1[key], obj2[key])) return false
  }
  
  return true
}

// Vitest setup and teardown helpers
export function setupTestMocks() {
  beforeAll(() => {
    setupHttpMocks()
  })
  
  afterEach(() => {
    clearRequestHistory()
  })
  
  afterAll(() => {
    restoreHttpMocks()
  })
}