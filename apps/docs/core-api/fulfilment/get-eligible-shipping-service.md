# Get Eligible Shipping Service

Retrieve eligible shipping service options for a specific TikTok Shop order.  
This API determines which shipping services can be used based on weight, dimensions, and item details.

Official documentation:  
https://partner.tiktokshop.com/docv2/page/get-eligible-shipping-service-202309

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher**
- SDK Method: `fulfillment.getEligibleShippingService()`

---

## Body Parameters

| Parameter             | Type     | Description                                                 |
| --------------------- | -------- | ----------------------------------------------------------- |
| `order_id`            | string   | The order ID to check. **Required**                         |
| `order_line_item_ids` | string[] | List of line item IDs included in the package. **Required** |
| `weight`              | object   | Weight details of the package. **Required**                 |
| `dimension`           | object   | Dimension details of the package. **Required**              |

### `weight` Object

| Field   | Type   | Description                  |
| ------- | ------ | ---------------------------- |
| `value` | string | Weight value (e.g. `"0.4"`). |
| `unit`  | string | Weight unit (e.g. `"GRAM"`). |

### `dimension` Object

| Field    | Type   | Description                   |
| -------- | ------ | ----------------------------- |
| `length` | string | Package length.               |
| `width`  | string | Package width.                |
| `height` | string | Package height.               |
| `unit`   | string | Dimension unit (e.g. `"CM"`). |

---

## Example Usage (TypeScript)

```ts
import { TikTokShopSDK, TikTokAPIError } from 'tiktok-shop-sdk';

const sdk = new TikTokShopSDK({
  appKey: process.env.TIKTOK_APP_KEY!,
  appSecret: process.env.TIKTOK_APP_SECRET!,
});

try {
  // Set Access Token & Shop Cipher
  sdk.setAccessToken(process.env.TIKTOK_APP_ACCESS_KEY!);
  sdk.setShopCipher(process.env.TIKTOK_SHOP_CIPHER!);

  const response = await sdk.fulfillment.getEligibleShippingService({
    order_id: '1162200639229365029',
    body: {
      order_line_item_ids: ['580205195696245541'],
      weight: {
        value: '0.4',
        unit: 'GRAM',
      },
      dimension: {
        length: '0.3',
        width: '0.2',
        height: 'CM',
        unit: 'INCH',
      },
    },
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
    "services": [
      {
        "service_id": "EXPRESS_001",
        "name": "Express Delivery",
        "estimated_delivery_time": "1-2 days",
        "cost": "25000"
      }
    ]
  },
  "message": "Success",
  "request_id": "202407011530000112233445566ABCDEFFF"
}
```

---

## Response Descriptions

### Top-Level Fields

| Field        | Type   | Description                             |
| ------------ | ------ | --------------------------------------- |
| `code`       | int    | API status code (0 = success).          |
| `message`    | string | Operation message or error description. |
| `request_id` | string | Unique request identifier.              |
| `data`       | object | Contains shipping service results.      |

---

### `data.services[]` Object

| Field                     | Type   | Description                      |
| ------------------------- | ------ | -------------------------------- |
| `service_id`              | string | ID of the shipping service.      |
| `name`                    | string | Name of the shipping service.    |
| `estimated_delivery_time` | string | Estimated delivery time.         |
| `cost`                    | string | Shipping cost in local currency. |

---

## Error Handling

All API errors will throw a `TikTokAPIError` containing:

- **message**
- **code**
- **request_id**

Full error reference:  
https://partner.tiktokshop.com/docv2/page/get-eligible-shipping-service-202309#Error_Code
