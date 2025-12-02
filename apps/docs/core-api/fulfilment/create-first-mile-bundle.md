# Create First Mile Bundle

Create a first-mile bundle for one or more TikTok Shop orders.  
This is used to group orders for pickup or drop-off during the first-mile fulfillment stage.

Official documentation:  
https://partner.tiktokshop.com/docv2/page/create-first-mile-bundle-202407

---

## Requirements

- A valid **Access Token**
- SDK Method: `fulfillment.createFirstMileBundle()`

---

## Body Parameters

| Parameter              | Type     | Description                                                           |
| ---------------------- | -------- | --------------------------------------------------------------------- |
| `order_ids`            | string[] | List of order IDs to bundle. **Required**                             |
| `handover_method`      | string   | Method for handover: `PICKUP` or `DROPOFF`. **Required**              |
| `shipping_provider_id` | string   | The shipping provider ID used for fulfillment. **Required**           |
| `tracking_number`      | string   | Tracking number assigned for the bundle. **Required**                 |
| `phone_tail_number`    | string   | Last 4 digits of the phone number for pickup validation. **Required** |

---

## Example Usage (TypeScript)

```ts
import { TikTokShopSDK, TikTokAPIError } from 'tiktok-shop-sdk';

const sdk = new TikTokShopSDK({
  appKey: process.env.TIKTOK_APP_KEY!,
  appSecret: process.env.TIKTOK_APP_SECRET!,
});

try {
  // Set Access Token
  sdk.setAccessToken(process.env.TIKTOK_APP_ACCESS_KEY!);

  const response = await sdk.fulfillment.createFirstMileBundle({
    order_ids: ['1162200639229365029'],
    handover_method: 'PICKUP',
    shipping_provider_id: '6617675021119438849',
    tracking_number: '173988244330623',
    phone_tail_number: '1234',
  });

  console.log(response);
} catch (error) {
  if (error instanceof TikTokAPIError) {
    console.error('TikTok API Error:', error.message);
    console.error('Status Code:', error.code);
    console.log('Request Id:', error.request_id);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

---

## Response Example

```json
{
  "code": 0,
  "data": {
    "bundle_id": "FM123456789",
    "handover_method": "PICKUP",
    "shipping_provider_id": "6617675021119438849",
    "tracking_number": "173988244330623",
    "order_ids": ["1162200639229365029"]
  },
  "message": "Success",
  "request_id": "2024070114300001ABCDEF9876543210"
}
```

---

## Response Descriptions

### Top-Level Fields

| Field        | Type   | Description                          |
| ------------ | ------ | ------------------------------------ |
| `code`       | int    | API status code (0 = success).       |
| `message`    | string | Result or error message.             |
| `request_id` | string | Unique identifier for the request.   |
| `data`       | object | Contains the created bundle details. |

---

### `data` Object

| Field                  | Type     | Description                       |
| ---------------------- | -------- | --------------------------------- |
| `bundle_id`            | string   | The created first-mile bundle ID. |
| `handover_method`      | string   | Pickup or drop-off method.        |
| `shipping_provider_id` | string   | Shipping provider used.           |
| `tracking_number`      | string   | Tracking number for the bundle.   |
| `order_ids`            | string[] | Orders included in the bundle.    |

---

## Error Handling

All API errors throw a `TikTokAPIError` containing:

- **message**
- **code**
- **request_id**

Full error reference:  
https://partner.tiktokshop.com/docv2/page/create-first-mile-bundle-202407#Error_Code
