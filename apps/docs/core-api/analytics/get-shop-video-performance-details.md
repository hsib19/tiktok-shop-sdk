# Get Shop Video Performance Details

Retrieve detailed performance metrics for a specific video in your TikTok Shop.

Official documentation:  
https://partner.tiktokshop.com/docv2/page/get-shop-video-performance-details-202409

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher**
- SDK Method: `analytics.getShopVideoPerformanceDetails()`

---

## Parameters

### Path Parameter

| Parameter  | Type   | Description                       |
| ---------- | ------ | --------------------------------- |
| `video_id` | string | The video ID you want to analyze. |

---

### Query Parameters

| Parameter         | Type    | Description                                        |
| ----------------- | ------- | -------------------------------------------------- |
| `start_date_ge`   | string  | Start date (inclusive), formatted as `YYYY-MM-DD`. |
| `end_date_lt`     | string  | End date (exclusive), formatted as `YYYY-MM-DD`.   |
| `currency`        | string  | Optional currency filter.                          |
| `granularity`     | string  | Optional time granularity (e.g., `DAILY`).         |
| `with_comparison` | boolean | Whether to include comparison data.                |

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

  const response = await sdk.analytics.getShopVideoPerformanceDetails({
    video_id: '03948503945304',
    query: {
      end_date_lt: '2024-09-08',
      start_date_ge: '2024-09-09',
      // currency: "",
      // granularity: "",
      // with_comparison: true
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
    "video_id": "03948503945304",
    "views": 15200,
    "likes": 830,
    "shares": 120,
    "comments": 64,
    "gmv": 9450.55,
    "orders": 180,
    "conversion_rate": 0.018
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
| `data`       | object | Contains detailed video performance.    |

---

### `data` Object Fields

| Field             | Type   | Description                             |
| ----------------- | ------ | --------------------------------------- |
| `video_id`        | string | The video ID.                           |
| `views`           | number | Total video views.                      |
| `likes`           | number | Total likes.                            |
| `shares`          | number | Number of shares.                       |
| `comments`        | number | Number of comments.                     |
| `gmv`             | number | Gross Merchandise Value attributed.     |
| `orders`          | number | Total orders from this video.           |
| `conversion_rate` | number | Conversion rate from views to purchase. |

---

## Error Handling

All API errors will throw a `TikTokAPIError`, including:

- **message**
- **code**
- **request_id**

Full error reference:  
https://partner.tiktokshop.com/docv2/page/get-shop-video-performance-details-202409#Error_Code
