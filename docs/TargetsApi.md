# TargetsApi

All URIs are relative to *https://api.retreaver.com*

| Method                                | HTTP request                          | Description           |
| ------------------------------------- | ------------------------------------- | --------------------- |
| [**createTarget**](#createtarget)     | **POST** /targets.json                | Create a target       |
| [**deleteTarget**](#deletetarget)     | **DELETE** /targets/{id}.json         | Delete a target       |
| [**getTargetById**](#gettargetbyid)   | **GET** /targets/{id}.json            | Get a specific target |
| [**getTargets**](#gettargets)         | **GET** /targets.json                 | Get all targets       |
| [**resetTargetCap**](#resettargetcap) | **POST** /targets/{id}/reset_cap.json | Reset target hard cap |
| [**updateTarget**](#updatetarget)     | **PUT** /targets/{id}.json            | Update a target       |

# **createTarget**

> TargetWrapper createTarget(targetCreateRequest)

Create a new target with phone number and routing configuration.

### Example

```typescript
import { TargetsApi, Configuration, TargetCreateRequest } from 'retreaver-api-client';

const configuration = new Configuration();
const apiInstance = new TargetsApi(configuration);

let apiKey: string; //Your Retreaver API key (default to undefined)
let targetCreateRequest: TargetCreateRequest; //
let companyId: number; //Required if you have access to multiple companies (optional) (default to undefined)

const { status, data } = await apiInstance.createTarget(apiKey, targetCreateRequest, companyId);
```

### Parameters

| Name                    | Type                    | Description                                       | Notes                            |
| ----------------------- | ----------------------- | ------------------------------------------------- | -------------------------------- |
| **targetCreateRequest** | **TargetCreateRequest** |                                                   |                                  |
| **apiKey**              | [**string**]            | Your Retreaver API key                            | defaults to undefined            |
| **companyId**           | [**number**]            | Required if you have access to multiple companies | (optional) defaults to undefined |

### Return type

**TargetWrapper**

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description                 | Response headers |
| ----------- | --------------------------- | ---------------- |
| **201**     | Target created successfully | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteTarget**

> deleteTarget()

Delete a target by its internal ID.

### Example

```typescript
import { TargetsApi, Configuration } from 'retreaver-api-client';

const configuration = new Configuration();
const apiInstance = new TargetsApi(configuration);

let apiKey: string; //Your Retreaver API key (default to undefined)
let id: number; // (default to undefined)
let companyId: number; //Required if you have access to multiple companies (optional) (default to undefined)

const { status, data } = await apiInstance.deleteTarget(apiKey, id, companyId);
```

### Parameters

| Name          | Type         | Description                                       | Notes                            |
| ------------- | ------------ | ------------------------------------------------- | -------------------------------- |
| **apiKey**    | [**string**] | Your Retreaver API key                            | defaults to undefined            |
| **id**        | [**number**] |                                                   | defaults to undefined            |
| **companyId** | [**number**] | Required if you have access to multiple companies | (optional) defaults to undefined |

### Return type

void (empty response body)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

### HTTP response details

| Status code | Description                 | Response headers |
| ----------- | --------------------------- | ---------------- |
| **204**     | Target deleted successfully | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getTargetById**

> TargetWrapper getTargetById()

Retrieve a target by its internal ID.

### Example

```typescript
import { TargetsApi, Configuration } from 'retreaver-api-client';

const configuration = new Configuration();
const apiInstance = new TargetsApi(configuration);

let apiKey: string; //Your Retreaver API key (default to undefined)
let id: number; //The internal target ID (default to undefined)
let companyId: number; //Required if you have access to multiple companies (optional) (default to undefined)

const { status, data } = await apiInstance.getTargetById(apiKey, id, companyId);
```

### Parameters

| Name          | Type         | Description                                       | Notes                            |
| ------------- | ------------ | ------------------------------------------------- | -------------------------------- |
| **apiKey**    | [**string**] | Your Retreaver API key                            | defaults to undefined            |
| **id**        | [**number**] | The internal target ID                            | defaults to undefined            |
| **companyId** | [**number**] | Required if you have access to multiple companies | (optional) defaults to undefined |

### Return type

**TargetWrapper**

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

# **getTargets**

> Array<TargetWrapper> getTargets()

Retrieve all destination phone numbers (targets) that calls can be routed to.

### Example

```typescript
import { TargetsApi, Configuration } from 'retreaver-api-client';

const configuration = new Configuration();
const apiInstance = new TargetsApi(configuration);

let apiKey: string; //Your Retreaver API key (default to undefined)
let companyId: number; //Required if you have access to multiple companies (optional) (default to undefined)

const { status, data } = await apiInstance.getTargets(apiKey, companyId);
```

### Parameters

| Name          | Type         | Description                                       | Notes                            |
| ------------- | ------------ | ------------------------------------------------- | -------------------------------- |
| **apiKey**    | [**string**] | Your Retreaver API key                            | defaults to undefined            |
| **companyId** | [**number**] | Required if you have access to multiple companies | (optional) defaults to undefined |

### Return type

**Array<TargetWrapper>**

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

# **resetTargetCap**

> resetTargetCap()

Clear calls contributing to the target\'s hard cap, resetting it to 0.

### Example

```typescript
import { TargetsApi, Configuration } from 'retreaver-api-client';

const configuration = new Configuration();
const apiInstance = new TargetsApi(configuration);

let apiKey: string; //Your Retreaver API key (default to undefined)
let id: number; // (default to undefined)
let companyId: number; //Required if you have access to multiple companies (optional) (default to undefined)

const { status, data } = await apiInstance.resetTargetCap(apiKey, id, companyId);
```

### Parameters

| Name          | Type         | Description                                       | Notes                            |
| ------------- | ------------ | ------------------------------------------------- | -------------------------------- |
| **apiKey**    | [**string**] | Your Retreaver API key                            | defaults to undefined            |
| **id**        | [**number**] |                                                   | defaults to undefined            |
| **companyId** | [**number**] | Required if you have access to multiple companies | (optional) defaults to undefined |

### Return type

void (empty response body)

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

### HTTP response details

| Status code | Description            | Response headers |
| ----------- | ---------------------- | ---------------- |
| **200**     | Cap reset successfully | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateTarget**

> TargetWrapper updateTarget(targetUpdateRequest)

Update any attributes of an existing target.

### Example

```typescript
import { TargetsApi, Configuration, TargetUpdateRequest } from 'retreaver-api-client';

const configuration = new Configuration();
const apiInstance = new TargetsApi(configuration);

let apiKey: string; //Your Retreaver API key (default to undefined)
let id: number; // (default to undefined)
let targetUpdateRequest: TargetUpdateRequest; //
let companyId: number; //Required if you have access to multiple companies (optional) (default to undefined)

const { status, data } = await apiInstance.updateTarget(apiKey, id, targetUpdateRequest, companyId);
```

### Parameters

| Name                    | Type                    | Description                                       | Notes                            |
| ----------------------- | ----------------------- | ------------------------------------------------- | -------------------------------- |
| **targetUpdateRequest** | **TargetUpdateRequest** |                                                   |                                  |
| **apiKey**              | [**string**]            | Your Retreaver API key                            | defaults to undefined            |
| **id**                  | [**number**]            |                                                   | defaults to undefined            |
| **companyId**           | [**number**]            | Required if you have access to multiple companies | (optional) defaults to undefined |

### Return type

**TargetWrapper**

### Authorization

[ApiKeyAuth](../README.md#ApiKeyAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description                 | Response headers |
| ----------- | --------------------------- | ---------------- |
| **200**     | Target updated successfully | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
