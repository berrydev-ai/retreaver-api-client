# CampaignUpdateRequestCampaign

## Properties

| Name               | Type        | Description                             | Notes                             |
| ------------------ | ----------- | --------------------------------------- | --------------------------------- |
| **name**           | **string**  |                                         | [optional] [default to undefined] |
| **dedupe_seconds** | **number**  |                                         | [optional] [default to undefined] |
| **record_calls**   | **boolean** |                                         | [optional] [default to undefined] |
| **message**        | **string**  |                                         | [optional] [default to undefined] |
| **voice_gender**   | **string**  |                                         | [optional] [default to undefined] |
| **destroy_nested** | **boolean** | Remove existing timers and menu options | [optional] [default to undefined] |

## Example

```typescript
import { CampaignUpdateRequestCampaign } from 'retreaver-api-client';

const instance: CampaignUpdateRequestCampaign = {
  name,
  dedupe_seconds,
  record_calls,
  message,
  voice_gender,
  destroy_nested,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
