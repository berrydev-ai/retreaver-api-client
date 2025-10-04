# Target


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** | Internal target ID | [optional] [default to undefined]
**number** | **string** | Phone number or SIP endpoint | [optional] [default to undefined]
**name** | **string** | Descriptive name for the target | [optional] [default to undefined]
**tid** | **string** | Your custom target ID | [optional] [default to undefined]
**priority** | **number** | Lower priority targets are considered first | [optional] [default to 1]
**weight** | **number** | Used to randomize order of same-priority targets | [optional] [default to 1]
**timeout_seconds** | **number** | Max seconds to wait while ringing | [optional] [default to 30]
**send_digits** | **string** | DTMF tones to send when answered (use \&#39;w\&#39; for 0.5s pause) | [optional] [default to undefined]
**concurrency_cap** | **number** | Max concurrent calls allowed | [optional] [default to undefined]
**paused** | **boolean** | Paused targets won\&#39;t receive calls | [optional] [default to false]
**time_zone** | **string** | Time zone for business hours | [optional] [default to 'UTC']
**sip_username** | **string** |  | [optional] [default to undefined]
**sip_password** | **string** |  | [optional] [default to undefined]
**caps** | [**Array&lt;Cap&gt;**](Cap.md) |  | [optional] [default to undefined]
**business_hours** | [**Array&lt;BusinessHours&gt;**](BusinessHours.md) |  | [optional] [default to undefined]
**tag_values** | [**Array&lt;TagValue&gt;**](TagValue.md) |  | [optional] [default to undefined]
**created_at** | **string** |  | [optional] [default to undefined]
**updated_at** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { Target } from 'retreaver-api-client';

const instance: Target = {
    id,
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
    caps,
    business_hours,
    tag_values,
    created_at,
    updated_at,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
