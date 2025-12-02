# Get Shop Performance

Retrieve overall performance metrics for your TikTok Shop.

Official documentation:  
https://partner.tiktokshop.com/docv2/page/get-shop-performance-202405

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher**
- SDK Method: `analytics.getShopPerformance()`

---

## Parameters

| Parameter       | Type   | Description                                   |
| --------------- | ------ | --------------------------------------------- |
| `start_date_ge` | string | Start date (inclusive), format: `YYYY-MM-DD`. |
| `end_date_lt`   | string | End date (exclusive), format: `YYYY-MM-DD`.   |

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
  sdk.setShopCipher(process.env.TIKTOK_SHOP_CIPHER!);

  const response = await sdk.analytics.getShopPerformance({
    end_date_lt: '2024-09-08',
    start_date_ge: '2024-09-09',
  });

  console.log(response);
} catch (error) {
  if (error instanceof TikTokAPIError) {
    console.error('TikTok API Error:', error.message);
    console.error('Status Code:', error.code);
    console.log('Request Id: ', error.request_id);
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
    "gmv": 12500.45,
    "orders": 320,
    "refund_rate": 0.012,
    "visitor_count": 15000,
    "conversion_rate": 0.021
  },
  "message": "Success",
  "request_id": "202407021200000122334455AAFFEE"
}
```

---

## Response Descriptions

### Top-Level Fields

| Field        | Type   | Description                             |
| ------------ | ------ | --------------------------------------- |
| `code`       | int    | API status code (0 = success).          |
| `message`    | string | Operation message or error description. |
| `request_id` | string | Unique request ID for debugging.        |
| `data`       | object | Contains shop performance metrics.      |

---

### `data` Object Fields

| Field             | Type   | Description                                      |
| ----------------- | ------ | ------------------------------------------------ |
| `gmv`             | number | Total Gross Merchandise Value within the period. |
| `orders`          | number | Total number of completed orders.                |
| `refund_rate`     | number | Percentage of refunded orders.                   |
| `visitor_count`   | number | Total number of visitors to your shop.           |
| `conversion_rate` | number | Percentage of visitors who made a purchase.      |

---

## Error Handling

All API errors will throw a `TikTokAPIError` including:

- **message**
- **code**
- **request_id**

Full error reference:  
https://partner.tiktokshop.com/docv2/page/get-shop-performance-202405#Error_Code
