import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CallsApi, GetCallsV1SortByEnum, GetCallsV1OrderEnum } from '../../../api/calls-api';
import { Configuration } from '../../../configuration';
import { setupHttpMocks, mockGet, verifyRequest, getRequestHistory } from '../../mocks/http-mocks';
import {
  mockCallsV1,
  mockCallV1Response,
  mockCallsV1ListResponse,
  mockNotFoundResponse,
  mockUnauthorizedResponse,
} from '../../mocks/mock-data';

describe('CallsApi', () => {
  let api: CallsApi;
  let config: Configuration;

  beforeEach(() => {
    setupHttpMocks();
    config = new Configuration({
      apiKey: 'test-api-key',
      basePath: 'https://api.retreaver.com',
    });
    api = new CallsApi(config);
  });

  describe('getCalls', () => {
    it('should retrieve calls successfully', async () => {
      // Arrange
      const expectedResponse = mockCallsV1ListResponse;
      mockGet('/calls.json', expectedResponse.data);

      // Act
      const result = await api.getCallsV1('test-api-key', 1);

      // Assert
      expect(result.data).toEqual(expectedResponse.data);
      expect(result.status).toBe(200);
      verifyRequest('get', '/calls.json', { api_key: 'test-api-key', company_id: 1 });
    });

    it('should retrieve calls without company ID', async () => {
      // Arrange
      const expectedResponse = mockCallsV1ListResponse;
      mockGet('/calls.json', expectedResponse.data);

      // Act
      const result = await api.getCallsV1('test-api-key');

      // Assert
      expect(result.data).toEqual(expectedResponse.data);
      expect(result.status).toBe(200);
      verifyRequest('get', '/calls.json', { api_key: 'test-api-key' });
    });

    it('should handle API key authentication', async () => {
      // Arrange
      const expectedResponse = mockCallsV1ListResponse;
      mockGet('/calls.json', expectedResponse.data);

      // Act
      await api.getCallsV1('test-api-key', 1);

      // Assert
      const history = getRequestHistory();
      const getRequests = history.get;
      expect(getRequests).toHaveLength(1);

      // Extract api_key from URL query string
      const requestUrl = getRequests![0].url || '';
      const urlObj = new URL(requestUrl);
      expect(urlObj.searchParams.get('api_key')).toBe('test-api-key');
    });

    it('should handle query parameters correctly', async () => {
      // Arrange
      const expectedResponse = mockCallsV1ListResponse;
      mockGet('/calls.json', expectedResponse.data);

      const queryParams = {
        created_at_start: '2024-01-01T00:00:00+00:00',
        created_at_end: '2024-01-31T23:59:59+00:00',
        sort_by: 'created_at' as const,
        order: 'desc' as const,
        caller: '+1234567890',
        client_afid: 'test-afid',
        page: 1,
      };

      // Act
      await api.getCallsV1(
        'test-api-key',
        1,
        queryParams.created_at_start,
        queryParams.created_at_end,
        queryParams.sort_by as GetCallsV1SortByEnum,
        queryParams.order as GetCallsV1OrderEnum,
        queryParams.caller,
        queryParams.client_afid,
        undefined, // client_cid
        undefined, // client_tid
        undefined, // sub_id
        queryParams.page
      );

      // Assert
      verifyRequest('get', '/calls.json', {
        api_key: 'test-api-key',
        company_id: 1,
        ...queryParams,
      });
    });

    it('should handle API errors gracefully', async () => {
      // Arrange
      const errorResponse = mockUnauthorizedResponse;
      mockGet('/calls.json', errorResponse.response.data, 401);

      // Act & Assert
      await expect(api.getCallsV1('invalid-api-key', 1)).rejects.toThrow();
    });
  });

  describe('getCallByUuidV1', () => {
    it('should retrieve a specific call by UUID', async () => {
      // Arrange
      const callUuid = 'addcf985-017e-4962-be34-cf5d55e74afc';
      const expectedResponse = mockCallV1Response;
      mockGet(`/calls/${callUuid}.json`, expectedResponse);

      // Act
      const result = await api.getCallByUuidV1('test-api-key', callUuid, 1);

      // Assert
      expect(result.data).toEqual(expectedResponse);
      expect(result.status).toBe(200);
      verifyRequest('get', `/calls/${callUuid}.json`, {
        api_key: 'test-api-key',
        company_id: 1,
      });
    });

    it('should handle call not found error', async () => {
      // Arrange
      const callUuid = 'non-existent-uuid';
      const errorResponse = mockNotFoundResponse;
      mockGet(`/calls/${callUuid}.json`, errorResponse.response.data, 404);

      // Act & Assert
      await expect(api.getCallByUuidV1('test-api-key', callUuid, 1)).rejects.toThrow();
    });

    it('should validate required parameters', async () => {
      // Act & Assert - generated code only validates null/undefined, not empty strings
      await expect(api.getCallByUuidV1(null, 'some-uuid', 1)).rejects.toThrow(
        'Required parameter apiKey was null or undefined'
      );

      await expect(api.getCallByUuidV1('test-api-key', null, 1)).rejects.toThrow(
        'Required parameter uuid was null or undefined'
      );
    });

    it('should work without company ID', async () => {
      // Arrange
      const callUuid = 'addcf985-017e-4962-be34-cf5d55e74afc';
      const expectedResponse = mockCallV1Response;
      mockGet(`/calls/${callUuid}.json`, expectedResponse);

      // Act
      const result = await api.getCallByUuidV1('test-api-key', callUuid);

      // Assert
      expect(result.data).toEqual(expectedResponse);
      verifyRequest('get', `/calls/${callUuid}.json`, {
        api_key: 'test-api-key',
      });
    });
  });

  describe('URL encoding', () => {
    it('should properly encode UUID in URL', async () => {
      // Arrange
      const callUuid = 'uuid-with-special-chars/123';
      const expectedResponse = mockCallV1Response;
      mockGet(`/calls/${encodeURIComponent(callUuid)}.json`, expectedResponse);

      // Act
      await api.getCallByUuidV1('test-api-key', callUuid, 1);

      // Assert
      const history = getRequestHistory();
      expect(history.get![0].url).toContain(encodeURIComponent(callUuid));
    });
  });

  describe('Response validation', () => {
    it('should return valid call objects', async () => {
      // Arrange
      const expectedResponse = mockCallsV1ListResponse;
      mockGet('/calls.json', expectedResponse.data);

      // Act
      const result = await api.getCallsV1('test-api-key', 1);

      // Assert - list endpoints return array of wrapped calls
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBeGreaterThan(0);
      expect(result.data[0]).toHaveProperty('call');
      expect(result.data[0].call).toBeValidCall();
    });
  });
});
