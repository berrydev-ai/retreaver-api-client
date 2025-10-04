# TargetCreateRequestTarget


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**number** | **string** | Phone number (E.164) or SIP endpoint (required) | [default to undefined]
**name** | **string** |  | [optional] [default to undefined]
**tid** | **string** |  | [optional] [default to undefined]
**priority** | **number** |  | [optional] [default to undefined]
**weight** | **number** |  | [optional] [default to undefined]
**timeout_seconds** | **number** |  | [optional] [default to undefined]
**send_digits** | **string** |  | [optional] [default to undefined]
**concurrency_cap** | **number** |  | [optional] [default to undefined]
**paused** | **boolean** |  | [optional] [default to undefined]
**time_zone** | **string** |  | [optional] [default to undefined]
**sip_username** | **string** |  | [optional] [default to undefined]
**sip_password** | **string** |  | [optional] [default to undefined]
**business_hours_attributes** | [**Array&lt;TargetCreateRequestTargetBusinessHoursAttributesInner&gt;**](TargetCreateRequestTargetBusinessHoursAttributesInner.md) |  | [optional] [default to undefined]

## Example

```typescript
import { TargetCreateRequestTarget } from 'retreaver-api-client';

const instance: TargetCreateRequestTarget = {
    number,
    name,
    tid,
    priority,
    weight,
    timeout_seconds,
    send_digits,
    concurrency_cap,
    paused,
    time_zone,
    sip_username,
    sip_password,
    business_hours_attributes,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
