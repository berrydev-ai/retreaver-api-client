# Number

## Properties

| Name                       | Type                                                                 | Description                           | Notes                             |
| -------------------------- | -------------------------------------------------------------------- | ------------------------------------- | --------------------------------- |
| **id**                     | **number**                                                           |                                       | [optional] [default to undefined] |
| **number**                 | **string**                                                           | The phone number                      | [optional] [default to undefined] |
| **toll_free**              | **boolean**                                                          |                                       | [optional] [default to undefined] |
| **sid**                    | **string**                                                           | Sub ID                                | [optional] [default to undefined] |
| **afid**                   | **string**                                                           | Affiliate ID                          | [optional] [default to undefined] |
| **cid**                    | **string**                                                           | Campaign ID                           | [optional] [default to undefined] |
| **uses_campaign_settings** | **boolean**                                                          | Whether number uses campaign settings | [optional] [default to undefined] |
| **greeting**               | [**NumberGreeting**](NumberGreeting.md)                              |                                       | [optional] [default to undefined] |
| **timers**                 | [**Array&lt;NumberTimersInner&gt;**](NumberTimersInner.md)           |                                       | [optional] [default to undefined] |
| **menu_options**           | [**Array&lt;NumberMenuOptionsInner&gt;**](NumberMenuOptionsInner.md) |                                       | [optional] [default to undefined] |
| **created_at**             | **string**                                                           |                                       | [optional] [default to undefined] |
| **updated_at**             | **string**                                                           |                                       | [optional] [default to undefined] |

## Example

```typescript
import { Number } from 'retreaver-api-client';

const instance: Number = {
  id,
  number,
  toll_free,
  sid,
  afid,
  cid,
  uses_campaign_settings,
  greeting,
  timers,
  menu_options,
  created_at,
  updated_at,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
