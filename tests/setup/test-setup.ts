import { vi } from 'vitest'

// Global test setup
beforeAll(() => {
  // Mock console methods to reduce noise in tests
  vi.spyOn(console, 'warn').mockImplementation(() => {})
  vi.spyOn(console, 'error').mockImplementation(() => {})
})

// Reset mocks after each test
afterEach(() => {
  vi.clearAllMocks()
})

// Global test utilities
declare global {
  namespace Vi {
    interface JestAssertion<T = any> {
      toBeValidCall(): T
      toBeValidAffiliate(): T
      toBeValidTarget(): T
      toBeValidCampaign(): T
    }
  }
}

// Custom matchers
expect.extend({
  toBeValidCall(received: any) {
    const pass = received && 
      typeof received.uuid === 'string' &&
      typeof received.caller === 'string' &&
      typeof received.status === 'string'
    
    return {
      message: () => `expected ${received} to be a valid call object`,
      pass,
    }
  },
  
  toBeValidAffiliate(received: any) {
    const pass = received && 
      typeof received.afid === 'string'
    
    return {
      message: () => `expected ${received} to be a valid affiliate object`,
      pass,
    }
  },
  
  toBeValidTarget(received: any) {
    const pass = received && 
      typeof received.id === 'number' &&
      typeof received.number === 'string'
    
    return {
      message: () => `expected ${received} to be a valid target object`,
      pass,
    }
  },
  
  toBeValidCampaign(received: any) {
    const pass = received && 
      typeof received.cid === 'string' &&
      typeof received.name === 'string'
    
    return {
      message: () => `expected ${received} to be a valid campaign object`,
      pass,
    }
  },
})