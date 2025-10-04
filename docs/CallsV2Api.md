# CallsV2Api

All URIs are relative to *https://api.retreaver.com*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getCallByUuidV2**](#getcallbyuuidv2) | **GET** /api/v2/calls/{uuid}.json | Get a specific call by UUID (V2)|
|[**getCallsV2**](#getcallsv2) | **GET** /api/v2/calls.json | Get recent calls (V2)|

# **getCallByUuidV2**
> CallV2Wrapper getCallByUuidV2()

Retrieve detailed V2 information about a specific call using its UUID.

### Example

```typescript
import {
    CallsV2Api,
    Configuration
} from 'retreaver-api-client';

const configuration = new Configuration();
const apiInstance = new CallsV2Api(configuration);

let apiKey: string; //Your Retreaver API key (default to undefined)
let uuid: string; // (default to undefined)
let companyId: number; //Required if you have access to multiple companies (optional) (default to undefined)

const { status, data } = await apiInstance.getCallByUuidV2(
    apiKey,
    uuid,
    companyId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **apiKey** | [**string**] | Your Retreaver API key | defaults to undefined|
| **uuid** | [**string**] |  | defaults to undefined|
| **companyId** | [**number**] | Required if you have access to multiple companies | (optional) defaults to undefined|


### Return type

**CallV2Wrapper**

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

# **getCallsV2**
> Array<CallV2Wrapper> getCallsV2()

Version 2 of the calls API with additional fields like affiliate_name, campaign_name, connected status, profit calculations, etc.

### Example

```typescript
import {
    CallsV2Api,
    Configuration
} from 'retreaver-api-client';

const configuration = new Configuration();
const apiInstance = new CallsV2Api(configuration);

let apiKey: string; //Your Retreaver API key (default to undefined)
let companyId: number; //Required if you have access to multiple companies (optional) (default to undefined)
let createdAtStart: string; //Return calls created after this date (RFC3339 format) (optional) (default to undefined)
let createdAtEnd: string; //Return calls created before this date (RFC3339 format) (optional) (default to undefined)
let sortBy: 'created_at' | 'updated_at'; // (optional) (default to 'created_at')
let order: 'asc' | 'desc'; // (optional) (default to 'desc')
let caller: string; // (optional) (default to undefined)
let clientAfid: string; // (optional) (default to undefined)
let clientCid: string; // (optional) (default to undefined)
let clientTid: string; // (optional) (default to undefined)
let subId: string; // (optional) (default to undefined)
let callFlowEvents: boolean; //Include call flow events showing what happened during the call (optional) (default to false)
let page: number; // (optional) (default to 1)

const { status, data } = await apiInstance.getCallsV2(
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
    callFlowEvents,
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
| **sortBy** | [**&#39;created_at&#39; | &#39;updated_at&#39;**]**Array<&#39;created_at&#39; &#124; &#39;updated_at&#39;>** |  | (optional) defaults to 'created_at'|
| **order** | [**&#39;asc&#39; | &#39;desc&#39;**]**Array<&#39;asc&#39; &#124; &#39;desc&#39;>** |  | (optional) defaults to 'desc'|
| **caller** | [**string**] |  | (optional) defaults to undefined|
| **clientAfid** | [**string**] |  | (optional) defaults to undefined|
| **clientCid** | [**string**] |  | (optional) defaults to undefined|
| **clientTid** | [**string**] |  | (optional) defaults to undefined|
| **subId** | [**string**] |  | (optional) defaults to undefined|
| **callFlowEvents** | [**boolean**] | Include call flow events showing what happened during the call | (optional) defaults to false|
| **page** | [**number**] |  | (optional) defaults to 1|


### Return type

**Array<CallV2Wrapper>**

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

