# Reject Cancellation

Reject a buyer's cancellation request in TikTok Shop.

Official documentation:  
https://partner.tiktokshop.com/docv2/page/reject-cancellation-202309

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher**
- SDK Method: `return_refund.rejectCancellation()`

---

## Parameters

### Path / Main Parameters

| Field       | Type   | Description                               |
| ----------- | ------ | ----------------------------------------- |
| `cancel_id` | string | The cancellation request ID. **Required** |

---

### Query Parameters

| Field             | Type   | Description                              |
| ----------------- | ------ | ---------------------------------------- |
| `idempotency_key` | string | Unique key to prevent duplicate actions. |

---

### Body Parameters

| Field           | Type     | Description                                                       |
| --------------- | -------- | ----------------------------------------------------------------- |
| `reject_reason` | string   | Reason code for rejecting the cancellation. **Required**          |
| `comment`       | string   | Optional comment explaining the rejection.                        |
| `images`        | object[] | Image evidence list (`image_id`, `mime_type`, `height`, `width`). |

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

  const response = await sdk.return_refund.rejectCancellation({
    cancel_id: '09830495345435',
    query: {
      idempotency_key: '03498530l94056',
    },
    body: {
      reject_reason: 'seller_reject_apply_product_has_been_packed',
      comment: 'I have packed the products before cancellation request',
      images: [
        {
          image_id:
            'tos-maliva-i-o3syd03w52-us/57a1c8908fe74572861ea5e50887d8d1',
          mime_type: 'image/png',
          height: 200,
          width: 200,
        },
      ],
    },
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
    "success": true,
    "status": "CANCELLATION_REJECTED"
  },
  "message": "Success",
  "request_id": "202407031330998877665544AA"
}
```

---

## Response Descriptions

### Top-Level Fields

| Field        | Type   | Description                    |
| ------------ | ------ | ------------------------------ |
| `code`       | int    | API status code (0 = success). |
| `message`    | string | Operation message.             |
| `request_id` | string | Unique request identifier.     |
| `data`       | object | Contains rejection result.     |

---

### `data` Object

| Field     | Type    | Description                               |
| --------- | ------- | ----------------------------------------- |
| `success` | boolean | Whether the rejection was successful.     |
| `status`  | string  | Final status of the cancellation request. |

---

## Error Handling

All API errors will throw a `TikTokAPIError` containing:

- **message**
- **code**
- **request_id**

Full error reference:  
https://partner.tiktokshop.com/docv2/page/reject-cancellation-202309#Error_Code
