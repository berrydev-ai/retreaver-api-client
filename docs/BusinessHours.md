# BusinessHours

## Properties

| Name            | Type        | Description                    | Notes                             |
| --------------- | ----------- | ------------------------------ | --------------------------------- |
| **id**          | **number**  |                                | [optional] [default to undefined] |
| **day_of_week** | **number**  | 0&#x3D;Sunday, 6&#x3D;Saturday | [optional] [default to undefined] |
| **work_day**    | **boolean** |                                | [optional] [default to true]      |
| **time_open**   | **number**  | 24-hour format HHMM            | [optional] [default to 0]         |
| **time_close**  | **number**  | 24-hour format HHMM            | [optional] [default to 2400]      |
| **invert**      | **boolean** | Invert open/closed hours       | [optional] [default to false]     |

## Example

```typescript
import { BusinessHours } from 'retreaver-api-client';

const instance: BusinessHours = {
  id,
  day_of_week,
  work_day,
  time_open,
  time_close,
  invert,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
