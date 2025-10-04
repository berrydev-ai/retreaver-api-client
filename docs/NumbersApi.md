# NumbersApi

All URIs are relative to *https://api.retreaver.com*

| Method                        | HTTP request          | Description     |
| ----------------------------- | --------------------- | --------------- |
| [**getNumbers**](#getnumbers) | **GET** /numbers.json | Get all numbers |

# **getNumbers**

> Array<NumberWrapper> getNumbers()

Retrieve all phone numbers routed to campaigns.

### Example

```typescript
import { NumbersApi, Configuration } from 'retreaver-api-client';

const configuration = new Configuration();
const apiInstance = new NumbersApi(configuration);

let apiKey: string; //Your Retreaver API key (default to undefined)
let companyId: number; //Required if you have access to multiple companies (optional) (default to undefined)

const { status, data } = await apiInstance.getNumbers(apiKey, companyId);
```

### Parameters

| Name          | Type         | Description                                       | Notes                            |
| ------------- | ------------ | ------------------------------------------------- | -------------------------------- |
| **apiKey**    | [**string**] | Your Retreaver API key                            | defaults to undefined            |
| **companyId** | [**number**] | Required if you have access to multiple companies | (optional) defaults to undefined |

### Return type

**Array<NumberWrapper>**

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
