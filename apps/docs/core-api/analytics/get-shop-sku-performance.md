# Get Shop SKU Performance

Retrieve performance metrics for a specific SKU in your TikTok Shop.

Official documentation:  
https://partner.tiktokshop.com/docv2/page/get-shop-sku-performance-202406

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher**
- SDK Method: `analytics.getShopSKUPerformance()`

---

## Parameters

### Path / Main Parameters

| Field    | Type   | Description                                      |
| -------- | ------ | ------------------------------------------------ |
| `sku_id` | string | SKU ID to retrieve performance for. **Required** |

---

### Query Parameters

| Field             | Type    | Description                                                |
| ----------------- | ------- | ---------------------------------------------------------- |
| `start_date_ge`   | string  | Start date (inclusive), format: `YYYY-MM-DD`. **Required** |
| `end_date_lt`     | string  | End date (exclusive), format: `YYYY-MM-DD`. **Required**   |
| `currency`        | string  | Currency of metrics returned (optional).                   |
| `granularity`     | string  | Data granularity (`DAILY`, `WEEKLY`, etc.). Optional.      |
| `with_comparison` | boolean | Whether to return comparison data. Optional.               |

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

  const response = await sdk.analytics.getShopSKUPerformance({
    sku_id: '9830453450345345',
    query: {
      end_date_lt: '2024-09-08',
      start_date_ge: '2024-09-09',
      // currency: "",
      // granularity: "",
      // with_comparison: true,
    },
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
    "sku_id": "9830453450345345",
    "performance": {
      "gmv": "1500000",
      "units_sold": 120,
      "views": 4500,
      "conversion_rate": 0.026
    }
  },
  "message": "Success",
  "request_id": "202407041210998877665544"
}
```

---

## Response Descriptions

### Top-Level Fields

| Field        | Type   | Description                       |
| ------------ | ------ | --------------------------------- |
| `code`       | int    | API status code (0 = success).    |
| `message`    | string | Response message.                 |
| `request_id` | string | Unique request ID for debugging.  |
| `data`       | object | Contains SKU performance results. |

---

### `data.performance` Object

| Field             | Type   | Description                         |
| ----------------- | ------ | ----------------------------------- |
| `gmv`             | string | Gross Merchandise Value of the SKU. |
| `units_sold`      | number | SKU units sold.                     |
| `views`           | number | Number of product detail views.     |
| `conversion_rate` | number | Conversion rate (0–1).              |

---

## Error Handling

All API errors will throw a `TikTokAPIError` containing:

- **message**
- **code**
- **request_id**

Full error reference:  
https://partner.tiktokshop.com/docv2/page/get-shop-sku-performance-202406#Error_Code
