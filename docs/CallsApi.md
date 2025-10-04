# CallsApi

All URIs are relative to *https://api.retreaver.com*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getCallByUuidV1**](#getcallbyuuidv1) | **GET** /calls/{uuid}.json | Get a specific call by UUID (V1)|
|[**getCallsV1**](#getcallsv1) | **GET** /calls.json | Get recent calls (V1)|

# **getCallByUuidV1**
> CallV1Wrapper getCallByUuidV1()

Retrieve detailed information about a specific call using its UUID.

### Example

```typescript
import {
    CallsApi,
    Configuration
} from 'retreaver-api-client';

const configuration = new Configuration();
const apiInstance = new CallsApi(configuration);

let apiKey: string; //Your Retreaver API key (default to undefined)
let uuid: string; //The UUID of the call (default to undefined)
let companyId: number; //Required if you have access to multiple companies (optional) (default to undefined)

const { status, data } = await apiInstance.getCallByUuidV1(
    apiKey,
    uuid,
    companyId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **apiKey** | [**string**] | Your Retreaver API key | defaults to undefined|
| **uuid** | [**string**] | The UUID of the call | defaults to undefined|
| **companyId** | [**number**] | Required if you have access to multiple companies | (optional) defaults to undefined|


### Return type

**CallV1Wrapper**

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getCallsV1**
> Array<CallV1Wrapper> getCallsV1()

Provides access to the call log containing all calls made through numbers under your control.

### Example

```typescript
import {
    CallsApi,
    Configuration
} from 'retreaver-api-client';

const configuration = new Configuration();
const apiInstance = new CallsApi(configuration);

let apiKey: string; //Your Retreaver API key (default to undefined)
let companyId: number; //Required if you have access to multiple companies (optional) (default to undefined)
let createdAtStart: string; //Return calls created after this date (RFC3339 format) (optional) (default to undefined)
let createdAtEnd: string; //Return calls created before this date (RFC3339 format) (optional) (default to undefined)
let sortBy: 'created_at' | 'updated_at'; //Sort calls by this field (optional) (default to 'created_at')
let order: 'asc' | 'desc'; //Sort order (Note: updated_at always returns desc) (optional) (default to 'desc')
let caller: string; //Filter by caller number (URL encoded, e.g., %2B13015236555) (optional) (default to undefined)
let clientAfid: string; //Filter by affiliate ID (optional) (default to undefined)
let clientCid: string; //Filter by campaign ID (optional) (default to undefined)
let clientTid: string; //Filter by target ID (optional) (default to undefined)
let subId: string; //Filter by affiliate Sub ID (optional) (default to undefined)
let page: number; //Page number for pagination (25 results per page) (optional) (default to 1)

const { status, data } = await apiInstance.getCallsV1(
    apiKey,
    companyId,
    createdAtStart,
    createdAtEnd,
    sortBy,
    order,
    caller,
    clientAfid,
    clientCid,
    clientTid,
    subId,
    page
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **apiKey** | [**string**] | Your Retreaver API key | defaults to undefined|
| **companyId** | [**number**] | Required if you have access to multiple companies | (optional) defaults to undefined|
| **createdAtStart** | [**string**] | Return calls created after this date (RFC3339 format) | (optional) defaults to undefined|
| **createdAtEnd** | [**string**] | Return calls created before this date (RFC3339 format) | (optional) defaults to undefined|
| **sortBy** | [**&#39;created_at&#39; | &#39;updated_at&#39;**]**Array<&#39;created_at&#39; &#124; &#39;updated_at&#39;>** | Sort calls by this field | (optional) defaults to 'created_at'|
| **order** | [**&#39;asc&#39; | &#39;desc&#39;**]**Array<&#39;asc&#39; &#124; &#39;desc&#39;>** | Sort order (Note: updated_at always returns desc) | (optional) defaults to 'desc'|
| **caller** | [**string**] | Filter by caller number (URL encoded, e.g., %2B13015236555) | (optional) defaults to undefined|
| **clientAfid** | [**string**] | Filter by affiliate ID | (optional) defaults to undefined|
| **clientCid** | [**string**] | Filter by campaign ID | (optional) defaults to undefined|
| **clientTid** | [**string**] | Filter by target ID | (optional) defaults to undefined|
| **subId** | [**string**] | Filter by affiliate Sub ID | (optional) defaults to undefined|
| **page** | [**number**] | Page number for pagination (25 results per page) | (optional) defaults to 1|


### Return type

**Array<CallV1Wrapper>**

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

