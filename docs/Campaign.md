# Campaign


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**cid** | **string** | Your custom campaign ID | [optional] [default to undefined]
**name** | **string** |  | [optional] [default to undefined]
**record_calls** | **boolean** |  | [optional] [default to true]
**record_seconds** | **number** | Max recording length in seconds | [optional] [default to undefined]
**dedupe_seconds** | **number** | Prevent repeat callers from firing timers within N seconds | [optional] [default to 0]
**affiliate_can_pull_number** | **boolean** |  | [optional] [default to false]
**show_key** | **string** | Key for accessing campaign data | [optional] [default to undefined]
**greeting** | [**CampaignGreeting**](CampaignGreeting.md) |  | [optional] [default to undefined]
**timers** | [**Array&lt;TimerWrapper&gt;**](TimerWrapper.md) |  | [optional] [default to undefined]
**menu_options** | [**Array&lt;MenuOptionWrapper&gt;**](MenuOptionWrapper.md) |  | [optional] [default to undefined]
**updated_at** | **string** |  | [optional] [default to undefined]
**created_at** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { Campaign } from 'retreaver-api-client';

const instance: Campaign = {
    cid,
    name,
    record_calls,
    record_seconds,
    dedupe_seconds,
    affiliate_can_pull_number,
    show_key,
    greeting,
    timers,
    menu_options,
    updated_at,
    created_at,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
