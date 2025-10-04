# AffiliatesApi

All URIs are relative to *https://api.retreaver.com*

| Method                                        | HTTP request                            | Description                      |
| --------------------------------------------- | --------------------------------------- | -------------------------------- |
| [**createAffiliate**](#createaffiliate)       | **POST** /affiliates.json               | Create an affiliate              |
| [**deleteAffiliate**](#deleteaffiliate)       | **DELETE** /affiliates/afid/{afid}.json | Delete an affiliate              |
| [**getAffiliateByAfid**](#getaffiliatebyafid) | **GET** /affiliates/afid/{afid}.json    | Get a specific affiliate by AFID |
| [**getAffiliates**](#getaffiliates)           | **GET** /affiliates.json                | Get all affiliates               |
| [**updateAffiliate**](#updateaffiliate)       | **PUT** /affiliates/afid/{afid}.json    | Update an affiliate              |

# **createAffiliate**

> AffiliateWrapper createAffiliate(affiliateCreateRequest)

Create a new affiliate with identifying information.

### Example

```typescript
import { AffiliatesApi, Configuration, AffiliateCreateRequest } from 'retreaver-api-client';

const configuration = new Configuration();
const apiInstance = new AffiliatesApi(configuration);

let apiKey: string; //Your Retreaver API key (default to undefined)
let affiliateCreateRequest: AffiliateCreateRequest; //
let companyId: number; //Required if you have access to multiple companies (optional) (default to undefined)

const { status, data } = await apiInstance.createAffiliate(
  apiKey,
  affiliateCreateRequest,
  companyId
);
```

### Parameters

| Name                       | Type                       | Description                                       | Notes                            |
| -------------------------- | -------------------------- | ------------------------------------------------- | -------------------------------- |
| **affiliateCreateRequest** | **AffiliateCreateRequest** |                                                   |                                  |
| **apiKey**                 | [**string**]               | Your Retreaver API key                            | defaults to undefined            |
| **companyId**              | [**number**]               | Required if you have access to multiple companies | (optional) defaults to undefined |

### Return type

**AffiliateWrapper**

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description                    | Response headers |
| ----------- | ------------------------------ | ---------------- |
| **201**     | Affiliate created successfully | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteAffiliate**

> deleteAffiliate()

Delete an affiliate. You must delete any numbers associated with the affiliate first.

### Example

```typescript
import { AffiliatesApi, Configuration } from 'retreaver-api-client';

const configuration = new Configuration();
const apiInstance = new AffiliatesApi(configuration);

let apiKey: string; //Your Retreaver API key (default to undefined)
let afid: string; // (default to undefined)
let companyId: number; //Required if you have access to multiple companies (optional) (default to undefined)

const { status, data } = await apiInstance.deleteAffiliate(apiKey, afid, companyId);
```

### Parameters

| Name          | Type         | Description                                       | Notes                            |
| ------------- | ------------ | ------------------------------------------------- | -------------------------------- |
| **apiKey**    | [**string**] | Your Retreaver API key                            | defaults to undefined            |
| **afid**      | [**string**] |                                                   | defaults to undefined            |
| **companyId** | [**number**] | Required if you have access to multiple companies | (optional) defaults to undefined |

### Return type

void (empty response body)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

### HTTP response details

| Status code | Description                    | Response headers |
| ----------- | ------------------------------ | ---------------- |
| **204**     | Affiliate deleted successfully | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getAffiliateByAfid**

> AffiliateWrapper getAffiliateByAfid()

Retrieve an affiliate using your custom affiliate ID.

### Example

```typescript
import { AffiliatesApi, Configuration } from 'retreaver-api-client';

const configuration = new Configuration();
const apiInstance = new AffiliatesApi(configuration);

let apiKey: string; //Your Retreaver API key (default to undefined)
let afid: string; //The custom affiliate ID (default to undefined)
let companyId: number; //Required if you have access to multiple companies (optional) (default to undefined)

const { status, data } = await apiInstance.getAffiliateByAfid(apiKey, afid, companyId);
```

### Parameters

| Name          | Type         | Description                                       | Notes                            |
| ------------- | ------------ | ------------------------------------------------- | -------------------------------- |
| **apiKey**    | [**string**] | Your Retreaver API key                            | defaults to undefined            |
| **afid**      | [**string**] | The custom affiliate ID                           | defaults to undefined            |
| **companyId** | [**number**] | Required if you have access to multiple companies | (optional) defaults to undefined |

### Return type

**AffiliateWrapper**

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description         | Response headers |
| ----------- | ------------------- | ---------------- |
| **200**     | Successful response | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getAffiliates**

> Array<AffiliateWrapper> getAffiliates()

Retrieve a complete list of affiliates. Affiliates are also known as Publishers or Sources.

### Example

```typescript
import { AffiliatesApi, Configuration } from 'retreaver-api-client';

const configuration = new Configuration();
const apiInstance = new AffiliatesApi(configuration);

let apiKey: string; //Your Retreaver API key (default to undefined)
let companyId: number; //Required if you have access to multiple companies (optional) (default to undefined)

const { status, data } = await apiInstance.getAffiliates(apiKey, companyId);
```

### Parameters

| Name          | Type         | Description                                       | Notes                            |
| ------------- | ------------ | ------------------------------------------------- | -------------------------------- |
| **apiKey**    | [**string**] | Your Retreaver API key                            | defaults to undefined            |
| **companyId** | [**number**] | Required if you have access to multiple companies | (optional) defaults to undefined |

### Return type

**Array<AffiliateWrapper>**

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description         | Response headers |
| ----------- | ------------------- | ---------------- |
| **200**     | Successful response | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateAffiliate**

> AffiliateWrapper updateAffiliate(affiliateUpdateRequest)

Update any attributes of an existing affiliate.

### Example

```typescript
import { AffiliatesApi, Configuration, AffiliateUpdateRequest } from 'retreaver-api-client';

const configuration = new Configuration();
const apiInstance = new AffiliatesApi(configuration);

let apiKey: string; //Your Retreaver API key (default to undefined)
let afid: string; // (default to undefined)
let affiliateUpdateRequest: AffiliateUpdateRequest; //
let companyId: number; //Required if you have access to multiple companies (optional) (default to undefined)

const { status, data } = await apiInstance.updateAffiliate(
  apiKey,
  afid,
  affiliateUpdateRequest,
  companyId
);
```

### Parameters

| Name                       | Type                       | Description                                       | Notes                            |
| -------------------------- | -------------------------- | ------------------------------------------------- | -------------------------------- |
| **affiliateUpdateRequest** | **AffiliateUpdateRequest** |                                                   |                                  |
| **apiKey**                 | [**string**]               | Your Retreaver API key                            | defaults to undefined            |
| **afid**                   | [**string**]               |                                                   | defaults to undefined            |
| **companyId**              | [**number**]               | Required if you have access to multiple companies | (optional) defaults to undefined |

### Return type

**AffiliateWrapper**

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description                    | Response headers |
| ----------- | ------------------------------ | ---------------- |
| **200**     | Affiliate updated successfully | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
