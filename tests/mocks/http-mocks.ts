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
  
  // Setup default headers
  mockAxios.onAny().reply(config => {
    // Add default headers if not present
    config.headers = {
      'Content-Type': 'application/json',
      ...config.headers,
    }
    return [200, {}]
  })
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
export function mockGet(url: string, response: any, status = 200) {
  mockAxios.onGet(url).reply(status, response)
}

// Helper function to mock a POST request
export function mockPost(url: string, response: any, status = 201) {
  mockAxios.onPost(url).reply(status, response)
}

// Helper function to mock a PUT request
export function mockPut(url: string, response: any, status = 200) {
  mockAxios.onPut(url).reply(status, response)
}

// Helper function to mock a DELETE request
export function mockDelete(url: string, status = 204) {
  mockAxios.onDelete(url).reply(status)
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
    if (req.url !== url) return false
    if (params && !deepEqual(req.params, params)) return false
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