# Get Shop Video Performance Overview

Retrieve overall video-related performance metrics for your TikTok Shop.

Official documentation:  
https://partner.tiktokshop.com/docv2/page/get-shop-video-performance-overview-202409

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher**
- SDK Method: `analytics.getShopVideoPerformanceOverview()`

---

## Parameters

| Parameter       | Type   | Description                                      |
| --------------- | ------ | ------------------------------------------------ |
| `start_date_ge` | string | Start date (inclusive), format: `YYYY-MM-DD`.    |
| `end_date_lt`   | string | End date (exclusive), format: `YYYY-MM-DD`.      |
| `account_type`  | string | Video account type: `ALL`, `SHOP`, or `CREATOR`. |

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

  const response = await sdk.analytics.getShopVideoPerformanceOverview({
    end_date_lt: '2024-09-08',
    start_date_ge: '2024-09-09',
    // currency: "",
    account_type: 'ALL',
    // granularity: "",
    // with_comparison: true
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
    "total_views": 482000,
    "total_clicks": 12500,
    "video_gmv": 9400.75,
    "video_orders": 210,
    "ctr": 0.026
  },
  "message": "Success",
  "request_id": "20240917120055331122AABBCC"
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
| `data`       | object | Contains video performance metrics.     |

---

### `data` Object Fields

| Field          | Type   | Description                            |
| -------------- | ------ | -------------------------------------- |
| `total_views`  | number | Total number of video views.           |
| `total_clicks` | number | Total clicks generated from videos.    |
| `video_gmv`    | number | GMV attributed to video-driven sales.  |
| `video_orders` | number | Number of orders attributed to videos. |
| `ctr`          | number | Click-through rate for all videos.     |

---

## Error Handling

All API errors will throw a `TikTokAPIError` including:

- **message**
- **code**
- **request_id**

Full error reference:  
https://partner.tiktokshop.com/docv2/page/get-shop-video-performance-overview-202409#Error_Code
