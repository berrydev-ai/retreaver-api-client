# CallV1


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**uuid** | **string** | Unique identifier for the call | [optional] [default to undefined]
**caller** | **string** | Caller\&#39;s phone number in E.164 format | [optional] [default to undefined]
**caller_zip** | **string** | Caller\&#39;s ZIP code | [optional] [default to undefined]
**caller_state** | **string** | Caller\&#39;s state | [optional] [default to undefined]
**caller_city** | **string** | Caller\&#39;s city | [optional] [default to undefined]
**caller_country** | **string** | Caller\&#39;s country code | [optional] [default to undefined]
**dialed_call_duration** | **number** | Duration of the connected call in seconds | [optional] [default to undefined]
**total_duration** | **number** | Total duration including IVR and hold time in seconds | [optional] [default to undefined]
**status** | **string** | Call status | [optional] [default to undefined]
**start_time** | **string** | When the call started | [optional] [default to undefined]
**forwarded_time** | **string** | When the call was forwarded to target | [optional] [default to undefined]
**end_time** | **string** | When the call ended | [optional] [default to undefined]
**cid** | **string** | Campaign ID | [optional] [default to undefined]
**afid** | **string** | Affiliate ID | [optional] [default to undefined]
**sid** | **string** | Sub ID | [optional] [default to undefined]
**dialed_number** | **string** | Number that was dialed | [optional] [default to undefined]
**recording_url** | **string** | URL to call recording | [optional] [default to undefined]
**updated_at** | **string** |  | [optional] [default to undefined]
**created_at** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { CallV1 } from 'retreaver-api-client';

const instance: CallV1 = {
    uuid,
    caller,
    caller_zip,
    caller_state,
    caller_city,
    caller_country,
    dialed_call_duration,
    total_duration,
    status,
    start_time,
    forwarded_time,
    end_time,
    cid,
    afid,
    sid,
    dialed_number,
    recording_url,
    updated_at,
    created_at,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
