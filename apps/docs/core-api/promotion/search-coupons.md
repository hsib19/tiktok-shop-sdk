# Search Coupons

Search and filter existing coupons in TikTok Shop.  
This API allows sellers to retrieve coupon lists by status, display type, keywords, and more.

Official documentation:  
https://partner.tiktokshop.com/docv2/page/search-coupons-202406

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher**
- SDK Method: `promotion.searchCoupon()`

---

## Query Parameters

| Parameter       | Type     | Description                                                         |
| --------------- | -------- | ------------------------------------------------------------------- |
| `status`        | string[] | Filter coupons by status (e.g., `ONGOING`, `EXPIRED`). **Optional** |
| `title_keyword` | string   | Keyword to search coupon titles. **Optional**                       |
| `display_type`  | string[] | Display channels such as `FEED`, `CHAT`. **Optional**               |

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

  const response = await sdk.promotion.searchCoupon({
    status: ['ONGOING'],
    title_keyword: 'Coupon123',
    display_type: ['CHAT'],
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
    "coupons": [
      {
        "coupon_id": "7136104329798256386",
        "title": "Coupon123",
        "status": "ONGOING",
        "display_type": ["CHAT"],
        "start_time": 1709270400,
        "end_time": 1711958800
      }
    ],
    "total": 1
  },
  "message": "Success",
  "request_id": "202402291200000101890810281AEC88FF"
}
```

---

## Response Descriptions

### Top-Level Fields

| Field        | Type   | Description                                 |
| ------------ | ------ | ------------------------------------------- |
| `code`       | int    | Status code of the operation (0 = success). |
| `message`    | string | Description of the operation result.        |
| `request_id` | string | Unique request identifier for debugging.    |
| `data`       | object | Coupon list and metadata.                   |

---

### `data` Object

| Field     | Type  | Description                       |
| --------- | ----- | --------------------------------- |
| `coupons` | array | List of coupons matching filters. |
| `total`   | int   | Total number of matched coupons.  |

---

### `coupons[]` Fields

| Field          | Type     | Description                           |
| -------------- | -------- | ------------------------------------- |
| `coupon_id`    | string   | Unique coupon ID.                     |
| `title`        | string   | Coupon title.                         |
| `status`       | string   | Status of the coupon (e.g., ONGOING). |
| `display_type` | string[] | Channels where the coupon appears.    |
| `start_time`   | int      | Start time (UNIX timestamp).          |
| `end_time`     | int      | End time (UNIX timestamp).            |

---

## Error Handling

All API errors will throw a `TikTokAPIError`, including:

- **message**: Error description
- **code**: Error status code
- **request_id**: Unique identifier for debugging

Full error reference:  
https://partner.tiktokshop.com/docv2/page/search-coupons-202406#Error_Code
