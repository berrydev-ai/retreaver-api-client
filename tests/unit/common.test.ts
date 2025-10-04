import { describe, it, expect, beforeEach } from 'vitest';
import {
  assertParamExists,
  setApiKeyToObject,
  setBasicAuthToObject,
  setBearerAuthToObject,
  setSearchParams,
  serializeDataIfNeeded,
  toPathString,
  createRequestFunction,
  DUMMY_BASE_URL,
} from '../../common';
import { Configuration } from '../../configuration';
import { RequiredError } from '../../base';
import axios from 'axios';

describe('Common Utilities', () => {
  describe('assertParamExists', () => {
    it('should not throw when parameter exists', () => {
      // Act & Assert
      expect(() => assertParamExists('testFunction', 'param1', 'value')).not.toThrow();
      expect(() => assertParamExists('testFunction', 'param1', 0)).not.toThrow();
      expect(() => assertParamExists('testFunction', 'param1', false)).not.toThrow();
    });

    it('should throw RequiredError when parameter is null', () => {
      // Act & Assert
      expect(() => assertParamExists('testFunction', 'param1', null)).toThrow(RequiredError);
      expect(() => assertParamExists('testFunction', 'param1', null)).toThrow(
        'Required parameter param1 was null or undefined when calling testFunction.'
      );
    });

    it('should throw RequiredError when parameter is undefined', () => {
      // Act & Assert
      expect(() => assertParamExists('testFunction', 'param1', undefined)).toThrow(RequiredError);
      expect(() => assertParamExists('testFunction', 'param1', undefined)).toThrow(
        'Required parameter param1 was null or undefined when calling testFunction.'
      );
    });
  });

  describe('setApiKeyToObject', () => {
    it('should set API key from configuration', async () => {
      // Arrange
      const obj: any = {};
      const config = new Configuration({ apiKey: 'test-api-key' });

      // Act
      await setApiKeyToObject(obj, 'api_key', config);

      // Assert
      expect(obj.api_key).toBe('test-api-key');
    });

    it('should handle function API key', async () => {
      // Arrange
      const obj: any = {};
      const keyFunction = () => 'dynamic-key';
      const config = new Configuration({ apiKey: keyFunction });

      // Act
      await setApiKeyToObject(obj, 'api_key', config);

      // Assert
      expect(obj.api_key).toBe('dynamic-key');
    });

    it('should handle async function API key', async () => {
      // Arrange
      const obj: any = {};
      const asyncKeyFunction = async () => 'async-key';
      const config = new Configuration({ apiKey: asyncKeyFunction });

      // Act
      await setApiKeyToObject(obj, 'api_key', config);

      // Assert
      expect(obj.api_key).toBe('async-key');
    });

    it('should not set API key when configuration is undefined', async () => {
      // Arrange
      const obj: any = {};

      // Act
      await setApiKeyToObject(obj, 'api_key', undefined);

      // Assert
      expect(obj.api_key).toBeUndefined();
    });
  });

  describe('setBasicAuthToObject', () => {
    it('should set basic auth when username and password are provided', () => {
      // Arrange
      const obj: any = {};
      const config = new Configuration({
        username: 'testuser',
        password: 'testpass',
      });

      // Act
      setBasicAuthToObject(obj, config);

      // Assert
      expect(obj.auth).toEqual({
        username: 'testuser',
        password: 'testpass',
      });
    });

    it('should set auth with undefined username when only password provided', () => {
      // Arrange
      const obj: any = {};
      const config = new Configuration({ password: 'testpass' });

      // Act
      setBasicAuthToObject(obj, config);

      // Assert
      expect(obj.auth).toEqual({
        username: undefined,
        password: 'testpass',
      });
    });

    it('should not set auth when configuration is undefined', () => {
      // Arrange
      const obj: any = {};

      // Act
      setBasicAuthToObject(obj, undefined);

      // Assert
      expect(obj.auth).toBeUndefined();
    });
  });

  describe('setBearerAuthToObject', () => {
    it('should set bearer auth when access token is provided', async () => {
      // Arrange
      const obj: any = {};
      const config = new Configuration({ accessToken: 'test-token' });

      // Act
      await setBearerAuthToObject(obj, config);

      // Assert
      expect(obj.Authorization).toBe('Bearer test-token');
    });

    it('should handle function access token', async () => {
      // Arrange
      const obj: any = {};
      const tokenFunction = () => 'dynamic-token';
      const config = new Configuration({ accessToken: tokenFunction });

      // Act
      await setBearerAuthToObject(obj, config);

      // Assert
      expect(obj.Authorization).toBe('Bearer dynamic-token');
    });

    it('should not set authorization when access token is missing', async () => {
      // Arrange
      const obj: any = {};
      const config = new Configuration();

      // Act
      await setBearerAuthToObject(obj, config);

      // Assert
      expect(obj.Authorization).toBeUndefined();
    });
  });

  describe('setSearchParams', () => {
    it('should set search parameters from object', () => {
      // Arrange
      const url = new URL('https://example.com');
      const params = {
        param1: 'value1',
        param2: 'value2',
        number: 42,
      };

      // Act
      setSearchParams(url, params);

      // Assert
      expect(url.search).toBe('?param1=value1&param2=value2&number=42');
    });

    it('should handle array parameters', () => {
      // Arrange
      const url = new URL('https://example.com');
      const params = {
        tags: ['tag1', 'tag2', 'tag3'],
      };

      // Act
      setSearchParams(url, params);

      // Assert
      expect(url.search).toBe('?tags=tag1&tags=tag2&tags=tag3');
    });

    it('should handle nested objects', () => {
      // Arrange
      const url = new URL('https://example.com');
      const params = {
        user: {
          name: 'John',
          age: 30,
        },
      };

      // Act
      setSearchParams(url, params);

      // Assert
      expect(url.search).toBe('?user.name=John&user.age=30');
    });

    it('should handle null and undefined values', () => {
      // Arrange
      const url = new URL('https://example.com');
      const params = {
        param1: 'value1',
        param2: null,
        param3: undefined,
        param4: 'value4',
      };

      // Act
      setSearchParams(url, params);

      // Assert
      expect(url.search).toBe('?param1=value1&param4=value4');
    });
  });

  describe('serializeDataIfNeeded', () => {
    it('should serialize objects to JSON when content type is JSON', () => {
      // Arrange
      const data = { key: 'value' };
      const requestOptions = { headers: { 'Content-Type': 'application/json' } };
      const config = new Configuration();

      // Act
      const result = serializeDataIfNeeded(data, requestOptions, config);

      // Assert
      expect(result).toBe('{"key":"value"}');
    });

    it('should not serialize strings', () => {
      // Arrange
      const data = 'string data';
      const requestOptions = { headers: { 'Content-Type': 'application/json' } };
      const config = new Configuration();

      // Act
      const result = serializeDataIfNeeded(data, requestOptions, config);

      // Assert
      expect(result).toBe('string data');
    });

    it('should not serialize when content type is not JSON', () => {
      // Arrange
      const data = { key: 'value' };
      const requestOptions = { headers: { 'Content-Type': 'text/plain' } };
      const config = new Configuration();

      // Act
      const result = serializeDataIfNeeded(data, requestOptions, config);

      // Assert
      expect(result).toBe(data);
    });

    it('should handle undefined data', () => {
      // Arrange
      const requestOptions = { headers: { 'Content-Type': 'application/json' } };
      const config = new Configuration();

      // Act
      const result = serializeDataIfNeeded(undefined, requestOptions, config);

      // Assert
      expect(result).toBe('{}');
    });
  });

  describe('toPathString', () => {
    it('should return pathname and search', () => {
      // Arrange
      const url = new URL('https://example.com/path?param=value#hash');

      // Act
      const result = toPathString(url);

      // Assert
      expect(result).toBe('/path?param=value#hash');
    });

    it('should handle URL without search or hash', () => {
      // Arrange
      const url = new URL('https://example.com/path');

      // Act
      const result = toPathString(url);

      // Assert
      expect(result).toBe('/path');
    });
  });

  describe('createRequestFunction', () => {
    it('should create a request function', () => {
      // Arrange
      const axiosArgs = {
        url: '/test',
        options: { method: 'GET' },
      };

      // Act
      const requestFunction = createRequestFunction(axiosArgs, axios, DUMMY_BASE_URL);

      // Assert
      expect(typeof requestFunction).toBe('function');
    });
  });
});
