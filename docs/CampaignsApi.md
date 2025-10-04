# CampaignsApi

All URIs are relative to *https://api.retreaver.com*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createCampaign**](#createcampaign) | **POST** /campaigns.json | Create a campaign|
|[**deleteCampaign**](#deletecampaign) | **DELETE** /campaigns/cid/{cid}.json | Delete a campaign|
|[**getCampaignByCid**](#getcampaignbycid) | **GET** /campaigns/cid/{cid}.json | Get a specific campaign by CID|
|[**getCampaigns**](#getcampaigns) | **GET** /campaigns.json | Get all campaigns|
|[**updateCampaign**](#updatecampaign) | **PUT** /campaigns/cid/{cid}.json | Update a campaign|

# **createCampaign**
> CampaignWrapper createCampaign(campaignCreateRequest)

Create a new campaign with greeting, timers, and menu options.

### Example

```typescript
import {
    CampaignsApi,
    Configuration,
    CampaignCreateRequest
} from 'retreaver-api-client';

const configuration = new Configuration();
const apiInstance = new CampaignsApi(configuration);

let apiKey: string; //Your Retreaver API key (default to undefined)
let campaignCreateRequest: CampaignCreateRequest; //
let companyId: number; //Required if you have access to multiple companies (optional) (default to undefined)

const { status, data } = await apiInstance.createCampaign(
    apiKey,
    campaignCreateRequest,
    companyId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **campaignCreateRequest** | **CampaignCreateRequest**|  | |
| **apiKey** | [**string**] | Your Retreaver API key | defaults to undefined|
| **companyId** | [**number**] | Required if you have access to multiple companies | (optional) defaults to undefined|


### Return type

**CampaignWrapper**

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Campaign created successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteCampaign**
> deleteCampaign()

Delete a campaign. You must delete all numbers belonging to the campaign first.

### Example

```typescript
import {
    CampaignsApi,
    Configuration
} from 'retreaver-api-client';

const configuration = new Configuration();
const apiInstance = new CampaignsApi(configuration);

let apiKey: string; //Your Retreaver API key (default to undefined)
let cid: string; // (default to undefined)
let companyId: number; //Required if you have access to multiple companies (optional) (default to undefined)

const { status, data } = await apiInstance.deleteCampaign(
    apiKey,
    cid,
    companyId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **apiKey** | [**string**] | Your Retreaver API key | defaults to undefined|
| **cid** | [**string**] |  | defaults to undefined|
| **companyId** | [**number**] | Required if you have access to multiple companies | (optional) defaults to undefined|


### Return type

void (empty response body)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**204** | Campaign deleted successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getCampaignByCid**
> CampaignWrapper getCampaignByCid()

Retrieve a campaign using your custom campaign ID.

### Example

```typescript
import {
    CampaignsApi,
    Configuration
} from 'retreaver-api-client';

const configuration = new Configuration();
const apiInstance = new CampaignsApi(configuration);

let apiKey: string; //Your Retreaver API key (default to undefined)
let cid: string; //The custom campaign ID (default to undefined)
let companyId: number; //Required if you have access to multiple companies (optional) (default to undefined)

const { status, data } = await apiInstance.getCampaignByCid(
    apiKey,
    cid,
    companyId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **apiKey** | [**string**] | Your Retreaver API key | defaults to undefined|
| **cid** | [**string**] | The custom campaign ID | defaults to undefined|
| **companyId** | [**number**] | Required if you have access to multiple companies | (optional) defaults to undefined|


### Return type

**CampaignWrapper**

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

# **getCampaigns**
> Array<CampaignWrapper> getCampaigns()

List all campaigns with their routing settings and IVR configuration.

### Example

```typescript
import {
    CampaignsApi,
    Configuration
} from 'retreaver-api-client';

const configuration = new Configuration();
const apiInstance = new CampaignsApi(configuration);

let apiKey: string; //Your Retreaver API key (default to undefined)
let companyId: number; //Required if you have access to multiple companies (optional) (default to undefined)

const { status, data } = await apiInstance.getCampaigns(
    apiKey,
    companyId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **apiKey** | [**string**] | Your Retreaver API key | defaults to undefined|
| **companyId** | [**number**] | Required if you have access to multiple companies | (optional) defaults to undefined|


### Return type

**Array<CampaignWrapper>**

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

# **updateCampaign**
> CampaignWrapper updateCampaign(campaignUpdateRequest)

Update any attributes of an existing campaign.

### Example

```typescript
import {
    CampaignsApi,
    Configuration,
    CampaignUpdateRequest
} from 'retreaver-api-client';

const configuration = new Configuration();
const apiInstance = new CampaignsApi(configuration);

let apiKey: string; //Your Retreaver API key (default to undefined)
let cid: string; // (default to undefined)
let campaignUpdateRequest: CampaignUpdateRequest; //
let companyId: number; //Required if you have access to multiple companies (optional) (default to undefined)

const { status, data } = await apiInstance.updateCampaign(
    apiKey,
    cid,
    campaignUpdateRequest,
    companyId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **campaignUpdateRequest** | **CampaignUpdateRequest**|  | |
| **apiKey** | [**string**] | Your Retreaver API key | defaults to undefined|
| **cid** | [**string**] |  | defaults to undefined|
| **companyId** | [**number**] | Required if you have access to multiple companies | (optional) defaults to undefined|


### Return type

**CampaignWrapper**

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Campaign updated successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

