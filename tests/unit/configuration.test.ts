import { describe, it, expect } from 'vitest';
import { Configuration } from '../../configuration';

describe('Configuration', () => {
  describe('constructor', () => {
    it('should create configuration with default values', () => {
      // Act
      const config = new Configuration();

      // Assert
      expect(config.apiKey).toBeUndefined();
      expect(config.username).toBeUndefined();
      expect(config.password).toBeUndefined();
      expect(config.accessToken).toBeUndefined();
      expect(config.basePath).toBeUndefined();
      expect(config.serverIndex).toBeUndefined();
      expect(config.baseOptions).toEqual({ headers: {} });
    });

    it('should create configuration with provided values', () => {
      // Arrange
      const params = {
        apiKey: 'test-api-key',
        username: 'test-user',
        password: 'test-password',
        accessToken: 'test-token',
        basePath: 'https://test.api.com',
        serverIndex: 1,
        baseOptions: {
          timeout: 5000,
          headers: { 'Custom-Header': 'value' },
        },
      };

      // Act
      const config = new Configuration(params);

      // Assert
      expect(config.apiKey).toBe('test-api-key');
      expect(config.username).toBe('test-user');
      expect(config.password).toBe('test-password');
      expect(config.accessToken).toBe('test-token');
      expect(config.basePath).toBe('https://test.api.com');
      expect(config.serverIndex).toBe(1);
      expect(config.baseOptions).toEqual({
        timeout: 5000,
        headers: { 'Custom-Header': 'value' },
      });
    });

    it('should merge base options headers correctly', () => {
      // Arrange
      const params = {
        baseOptions: {
          headers: { 'Existing-Header': 'value' },
        },
      };

      // Act
      const config = new Configuration(params);

      // Assert
      expect(config.baseOptions.headers).toEqual({
        'Existing-Header': 'value',
      });
    });
  });

  describe('isJsonMime', () => {
    it('should return true for JSON MIME types', () => {
      // Arrange
      const config = new Configuration();
      const jsonMimes = [
        'application/json',
        'application/json; charset=UTF8',
        'APPLICATION/JSON',
        'application/vnd.company+json',
        'application/json-patch+json',
      ];

      // Act & Assert
      jsonMimes.forEach(mime => {
        expect(config.isJsonMime(mime)).toBe(true);
      });
    });

    it('should return false for non-JSON MIME types', () => {
      // Arrange
      const config = new Configuration();
      const nonJsonMimes = [
        'text/plain',
        'application/xml',
        'text/html',
        'image/png',
        'application/octet-stream',
      ];

      // Act & Assert
      nonJsonMimes.forEach(mime => {
        expect(config.isJsonMime(mime)).toBe(false);
      });
    });

    it('should return false for null or empty MIME types', () => {
      // Arrange
      const config = new Configuration();

      // Act & Assert
      expect(config.isJsonMime(null as any)).toBe(false);
      expect(config.isJsonMime('')).toBe(false);
    });
  });

  describe('API key handling', () => {
    it('should accept string API key', () => {
      // Arrange
      const config = new Configuration({ apiKey: 'test-key' });

      // Act & Assert
      expect(config.apiKey).toBe('test-key');
    });

    it('should accept function API key', () => {
      // Arrange
      const keyFunction = () => 'dynamic-key';
      const config = new Configuration({ apiKey: keyFunction });

      // Act & Assert
      expect(config.apiKey).toBe(keyFunction);
    });

    it('should accept async function API key', () => {
      // Arrange
      const asyncKeyFunction = async () => 'async-key';
      const config = new Configuration({ apiKey: asyncKeyFunction });

      // Act & Assert
      expect(config.apiKey).toBe(asyncKeyFunction);
    });
  });

  describe('Access token handling', () => {
    it('should accept string access token', () => {
      // Arrange
      const config = new Configuration({ accessToken: 'test-token' });

      // Act & Assert
      expect(config.accessToken).toBe('test-token');
    });

    it('should accept function access token', () => {
      // Arrange
      const tokenFunction = () => 'dynamic-token';
      const config = new Configuration({ accessToken: tokenFunction });

      // Act & Assert
      expect(config.accessToken).toBe(tokenFunction);
    });

    it('should accept async function access token', () => {
      // Arrange
      const asyncTokenFunction = async () => 'async-token';
      const config = new Configuration({ accessToken: asyncTokenFunction });

      // Act & Assert
      expect(config.accessToken).toBe(asyncTokenFunction);
    });
  });

  describe('Form data constructor', () => {
    it('should accept custom FormData constructor', () => {
      // Arrange
      class CustomFormData {
        // Mock FormData implementation
      }

      // Act
      const config = new Configuration({ formDataCtor: CustomFormData });

      // Assert
      expect(config.formDataCtor).toBe(CustomFormData);
    });

    it('should default to undefined FormData constructor', () => {
      // Act
      const config = new Configuration();

      // Assert
      expect(config.formDataCtor).toBeUndefined();
    });
  });
});
