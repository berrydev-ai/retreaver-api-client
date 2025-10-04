# CampaignCreateRequestCampaign


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**cid** | **string** | Your custom campaign ID (8 chars if not provided) | [optional] [default to undefined]
**name** | **string** |  | [optional] [default to undefined]
**dedupe_seconds** | **number** |  | [optional] [default to undefined]
**record_calls** | **boolean** |  | [optional] [default to undefined]
**message** | **string** | Text-to-speech greeting | [optional] [default to undefined]
**voice_gender** | **string** |  | [optional] [default to undefined]
**repeat** | **number** | Times to repeat greeting | [optional] [default to 4]
**timers_attributes** | [**Array&lt;CampaignCreateRequestCampaignTimersAttributesInner&gt;**](CampaignCreateRequestCampaignTimersAttributesInner.md) |  | [optional] [default to undefined]
**menu_options_attributes** | [**Array&lt;CampaignCreateRequestCampaignMenuOptionsAttributesInner&gt;**](CampaignCreateRequestCampaignMenuOptionsAttributesInner.md) |  | [optional] [default to undefined]

## Example

```typescript
import { CampaignCreateRequestCampaign } from 'retreaver-api-client';

const instance: CampaignCreateRequestCampaign = {
    cid,
    name,
    dedupe_seconds,
    record_calls,
    message,
    voice_gender,
    repeat,
    timers_attributes,
    menu_options_attributes,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
