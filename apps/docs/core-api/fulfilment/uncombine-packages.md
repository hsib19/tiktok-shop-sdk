# Uncombine Packages

Undo previously combined packages in TikTok Shop fulfillment.

Official documentation:  
https://partner.tiktokshop.com/docv2/page/uncombine-packages-202309

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher**
- SDK Method: `fulfillment.uncombinePackages()`

---

## Parameters

### Path / Query Parameters

| Parameter    | Type   | Description                           |
| ------------ | ------ | ------------------------------------- |
| `package_id` | string | The combined package ID. **Required** |

### Body Parameters

| Parameter   | Type     | Description                               |
| ----------- | -------- | ----------------------------------------- |
| `order_ids` | string[] | List of order IDs to uncombine. Required. |

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

  const response = await sdk.fulfillment.uncombinePackages({
    package_id: '1162200639229365029',
    body: {
      order_ids: ['580205195696114469', '1162118637559581477'],
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
    "uncombined_orders": [
      {
        "order_id": "580205195696114469",
        "status": "SUCCESS"
      }
    ]
  },
  "message": "Success",
  "request_id": "20240701150000123456789ABCDEFFF"
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
| `data`       | object | Contains uncombine results.             |

---

### `data.uncombined_orders[]` Object

| Field      | Type   | Description                        |
| ---------- | ------ | ---------------------------------- |
| `order_id` | string | Order ID that has been uncombined. |
| `status`   | string | Status of the uncombine operation. |

---

## Error Handling

Errors will throw a `TikTokAPIError` containing:

- **message**
- **code**
- **request_id**

Full reference:  
https://partner.tiktokshop.com/docv2/page/uncombine-packages-202309#Error_Code
