# Get Coupon

Retrieve detailed information about a specific coupon created in TikTok Shop.

Official documentation:  
https://partner.tiktokshop.com/docv2/page/get-coupon-202406

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher** (encrypted shop identifier)
- SDK Method: `promotion.getCoupon()`

---

## Path Parameter

| Parameter   | Type   | Description                               |
| ----------- | ------ | ----------------------------------------- |
| `coupon_id` | string | The unique ID of the coupon. **Required** |

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

  const response = await sdk.promotion.getCoupon('7136104329798256386');

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
  "message": "Success",
  "request_id": "202402291200000101890810281AEC88FF",
  "data": {
    "coupon_id": "7136104329798256386",
    "title": "Holiday Special Coupon",
    "status": "ONGOING",
    "create_time": 1709270400,
    "update_time": 1709270500
  }
}
```

---

## Response Descriptions

| Field        | Type   | Description                              |
| ------------ | ------ | ---------------------------------------- |
| `code`       | int    | Execution status code (0 = success).     |
| `message`    | string | Response message or failure reason.      |
| `request_id` | string | Unique request identifier for debugging. |
| `data`       | object | Contains coupon details.                 |

### `data` Object Fields

| Field         | Type   | Description                                           |
| ------------- | ------ | ----------------------------------------------------- |
| `coupon_id`   | string | The unique ID of the coupon.                          |
| `title`       | string | Name/title of the coupon.                             |
| `status`      | string | Current status (e.g., `DRAFT`, `ONGOING`, `EXPIRED`). |
| `create_time` | int    | Unix timestamp of when the coupon was created.        |
| `update_time` | int    | Unix timestamp of last coupon update.                 |

---

## Error Handling

All API errors throw `TikTokAPIError`, which exposes:

- **message**
- **code**
- **request_id**

Full error reference:  
https://partner.tiktokshop.com/docv2/page/get-coupon-202406#Error_Code
