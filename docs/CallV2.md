# CallV2

## Properties

| Name                           | Type                                                       | Description                                           | Notes                             |
| ------------------------------ | ---------------------------------------------------------- | ----------------------------------------------------- | --------------------------------- |
| **uuid**                       | **string**                                                 | Unique identifier for the call                        | [optional] [default to undefined] |
| **caller**                     | **string**                                                 | Caller\&#39;s phone number in E.164 format            | [optional] [default to undefined] |
| **caller_zip**                 | **string**                                                 | Caller\&#39;s ZIP code                                | [optional] [default to undefined] |
| **caller_state**               | **string**                                                 | Caller\&#39;s state                                   | [optional] [default to undefined] |
| **caller_city**                | **string**                                                 | Caller\&#39;s city                                    | [optional] [default to undefined] |
| **caller_country**             | **string**                                                 | Caller\&#39;s country code                            | [optional] [default to undefined] |
| **dialed_call_duration**       | **number**                                                 | Duration of the connected call in seconds             | [optional] [default to undefined] |
| **total_duration**             | **number**                                                 | Total duration including IVR and hold time in seconds | [optional] [default to undefined] |
| **status**                     | **string**                                                 | Call status                                           | [optional] [default to undefined] |
| **start_time**                 | **string**                                                 | When the call started                                 | [optional] [default to undefined] |
| **forwarded_time**             | **string**                                                 | When the call was forwarded to target                 | [optional] [default to undefined] |
| **end_time**                   | **string**                                                 | When the call ended                                   | [optional] [default to undefined] |
| **cid**                        | **string**                                                 | Campaign ID                                           | [optional] [default to undefined] |
| **afid**                       | **string**                                                 | Affiliate ID                                          | [optional] [default to undefined] |
| **sid**                        | **string**                                                 | Sub ID                                                | [optional] [default to undefined] |
| **dialed_number**              | **string**                                                 | Number that was dialed                                | [optional] [default to undefined] |
| **recording_url**              | **string**                                                 | URL to call recording                                 | [optional] [default to undefined] |
| **updated_at**                 | **string**                                                 |                                                       | [optional] [default to undefined] |
| **created_at**                 | **string**                                                 |                                                       | [optional] [default to undefined] |
| **affiliate_name**             | **string**                                                 | Full name of the affiliate                            | [optional] [default to undefined] |
| **campaign_id**                | **number**                                                 | Internal campaign ID                                  | [optional] [default to undefined] |
| **campaign_name**              | **string**                                                 | Name of the campaign                                  | [optional] [default to undefined] |
| **connected**                  | **boolean**                                                | Whether caller was connected to a target              | [optional] [default to undefined] |
| **number_id**                  | **number**                                                 | ID of the number that received the call               | [optional] [default to undefined] |
| **profit_gross**               | **string**                                                 | Gross profit: revenue - payout - cost                 | [optional] [default to undefined] |
| **profit_net**                 | **number**                                                 | Net profit: revenue - payout                          | [optional] [default to undefined] |
| **target_id**                  | **number**                                                 | ID of target the caller was connected to              | [optional] [default to undefined] |
| **target_name**                | **string**                                                 | Name of the target                                    | [optional] [default to undefined] |
| **time_to_call_in_seconds**    | **number**                                                 | Time it took for caller to make the call              | [optional] [default to undefined] |
| **time_to_connect_in_seconds** | **number**                                                 | IVR duration + hold duration                          | [optional] [default to undefined] |
| **total_cost**                 | **string**                                                 | Total cost of the call                                | [optional] [default to undefined] |
| **revenue**                    | **number**                                                 | Revenue from the call                                 | [optional] [default to undefined] |
| **payout**                     | **number**                                                 | Payout for the call                                   | [optional] [default to undefined] |
| **converted**                  | **boolean**                                                | Whether the call converted                            | [optional] [default to undefined] |
| **payable**                    | **boolean**                                                | Whether the call is payable                           | [optional] [default to undefined] |
| **receivable**                 | **boolean**                                                | Whether the call is receivable                        | [optional] [default to undefined] |
| **tags**                       | **{ [key: string]: string; }**                             | Tags applied to the call                              | [optional] [default to undefined] |
| **fired_pixels**               | [**Array&lt;FiredPixelWrapper&gt;**](FiredPixelWrapper.md) |                                                       | [optional] [default to undefined] |

## Example

```typescript
import { CallV2 } from 'retreaver-api-client';

const instance: CallV2 = {
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
  affiliate_name,
  campaign_id,
  campaign_name,
  connected,
  number_id,
  profit_gross,
  profit_net,
  target_id,
  target_name,
  time_to_call_in_seconds,
  time_to_connect_in_seconds,
  total_cost,
  revenue,
  payout,
  converted,
  payable,
  receivable,
  tags,
  fired_pixels,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
