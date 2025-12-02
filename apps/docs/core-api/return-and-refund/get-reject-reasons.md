# Get Reject Reasons

Retrieve the list of valid reject reasons for a return or cancellation request in TikTok Shop.

Official documentation:  
https://partner.tiktokshop.com/docv2/page/get-reject-reasons-202309

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher**
- SDK Method: `return_refund.getRejectReasons()`

---

## Parameters

| Parameter             | Type   | Description                                   |
| --------------------- | ------ | --------------------------------------------- |
| `return_or_cancel_id` | string | The return or cancel request ID. **Required** |

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

  const response = await sdk.return_refund.getRejectReasons({
    return_or_cancel_id: '4035633471902223141',
  });

  console.log(JSON.stringify(response));
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
    "reject_reasons": [
      {
        "reason_code": "R001",
        "reason_description": "Item not eligible for return"
      },
      {
        "reason_code": "R002",
        "reason_description": "Evidence provided is insufficient"
      }
    ]
  },
  "message": "Success",
  "request_id": "202407021210000112233445566AABB"
}
```

---

## Response Descriptions

### Top-Level Fields

| Field        | Type   | Description                     |
| ------------ | ------ | ------------------------------- |
| `code`       | int    | API status code (0 = success).  |
| `message`    | string | Operation message or reason.    |
| `request_id` | string | Unique request identifier.      |
| `data`       | object | Contains reject reason details. |

---

### `data.reject_reasons[]` Object

| Field                | Type   | Description                          |
| -------------------- | ------ | ------------------------------------ |
| `reason_code`        | string | Code representing the reject reason. |
| `reason_description` | string | Description of the reject reason.    |

---

## Error Handling

All API errors throw a `TikTokAPIError` containing:

- **message**
- **code**
- **request_id**

Full error reference:  
https://partner.tiktokshop.com/docv2/page/get-reject-reasons-202309#Error_Code
