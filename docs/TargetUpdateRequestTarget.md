# TargetUpdateRequestTarget


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **string** |  | [optional] [default to undefined]
**number** | **string** |  | [optional] [default to undefined]
**paused** | **boolean** |  | [optional] [default to undefined]
**priority** | **number** |  | [optional] [default to undefined]
**weight** | **number** |  | [optional] [default to undefined]
**timeout_seconds** | **number** |  | [optional] [default to undefined]
**concurrency_cap** | **number** |  | [optional] [default to undefined]
**tag_list** | **string** | Comma-delimited list of tags in format: &lt;&lt;&lt;key:value&gt;&gt;&gt; | [optional] [default to undefined]
**hard_cap_attributes** | [**TargetUpdateRequestTargetHardCapAttributes**](TargetUpdateRequestTargetHardCapAttributes.md) |  | [optional] [default to undefined]
**hourly_cap_attributes** | [**TargetUpdateRequestTargetHardCapAttributes**](TargetUpdateRequestTargetHardCapAttributes.md) |  | [optional] [default to undefined]
**daily_cap_attributes** | [**TargetUpdateRequestTargetHardCapAttributes**](TargetUpdateRequestTargetHardCapAttributes.md) |  | [optional] [default to undefined]
**monthly_cap_attributes** | [**TargetUpdateRequestTargetHardCapAttributes**](TargetUpdateRequestTargetHardCapAttributes.md) |  | [optional] [default to undefined]

## Example

```typescript
import { TargetUpdateRequestTarget } from 'retreaver-api-client';

const instance: TargetUpdateRequestTarget = {
    name,
    number,
    paused,
    priority,
    weight,
    timeout_seconds,
    concurrency_cap,
    tag_list,
    hard_cap_attributes,
    hourly_cap_attributes,
    daily_cap_attributes,
    monthly_cap_attributes,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
