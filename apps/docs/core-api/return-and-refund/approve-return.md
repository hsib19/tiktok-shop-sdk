# Approve Return

Approve or reject a return request in TikTok Shop.

Official documentation:  
https://partner.tiktokshop.com/docv2/page/approve-return-202309

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher**
- SDK Method: `return_refund.approveReturn()`

---

## Parameters

### Path / Main Parameters

| Field       | Type   | Description                         |
| ----------- | ------ | ----------------------------------- |
| `return_id` | string | The return request ID. **Required** |

---

### Query Parameters

| Field             | Type   | Description                              |
| ----------------- | ------ | ---------------------------------------- |
| `idempotency_key` | string | Unique key to prevent duplicate actions. |

---

### Body Parameters

| Field             | Type    | Description                                            |
| ----------------- | ------- | ------------------------------------------------------ |
| `decision`        | string  | Decision value, e.g., `APPROVE_RETURN`. **Required**   |
| `buyer_keep_item` | boolean | Whether buyer keeps the item.                          |
| `partial_refund`  | object  | Optional partial refund object (`currency`, `amount`). |

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

  const response = await sdk.return_refund.approveReturn({
    return_id: '4035633475056536357',
    query: {
      idempotency_key: '40b456b1-78e7-412d-9fe6-82181496e1bd',
    },
    body: {
      decision: 'APPROVE_RETURN',
      buyer_keep_item: true,
      // partial_refund: {
      //   currency: "IDR",
      //   amount: "100000"
      // }
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
    "status": "APPROVED"
  },
  "message": "Success",
  "request_id": "202407031300112233445566778899"
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
| `data`       | object | Contains approval result.      |

---

### `data` Object

| Field     | Type    | Description                         |
| --------- | ------- | ----------------------------------- |
| `success` | boolean | Whether approval was successful.    |
| `status`  | string  | Final status of the return request. |

---

## Error Handling

All API errors will throw a `TikTokAPIError` containing:

- **message**
- **code**
- **request_id**

Full error reference:  
https://partner.tiktokshop.com/docv2/page/approve-return-202309#Error_Code
