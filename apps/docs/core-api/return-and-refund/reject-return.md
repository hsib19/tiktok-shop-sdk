# Reject Return

Reject a return request submitted by the buyer in TikTok Shop.

Official documentation:  
https://partner.tiktokshop.com/docv2/page/reject-return-202309

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher**
- SDK Method: `return_refund.rejectReturn()`

---

## Parameters

### Query Parameters

| Field             | Type   | Description                               |
| ----------------- | ------ | ----------------------------------------- |
| `idempotency_key` | string | Unique key to prevent duplicate requests. |

---

### Body Parameters

| Field           | Type   | Description                                        |
| --------------- | ------ | -------------------------------------------------- |
| `decision`      | string | Must be `REJECT_RETURN`. **Required**              |
| `reject_reason` | string | Reason code for rejecting the return. **Required** |
| `comment`       | string | Additional explanation for the rejection.          |

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

  const response = await sdk.return_refund.rejectReturn({
    return_id: '4035633471902223141',
    query: {
      idempotency_key: '40b456b1-78e7-412d-9fe6-82181496e1bd',
    },
    body: {
      decision: 'REJECT_RETURN',
      reject_reason: 'reverse_reject_request_reason_2',
      comment: 'I have reached an agreement with the buyer',
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
    "return_id": "4035633471902223141",
    "status": "REJECTED"
  },
  "message": "Success",
  "request_id": "202407031256009988776655AABBCC"
}
```

---

## Response Descriptions

### Top-Level Fields

| Field        | Type   | Description                       |
| ------------ | ------ | --------------------------------- |
| `code`       | int    | API status code (0 = success).    |
| `message`    | string | Operation message.                |
| `request_id` | string | Unique request identifier.        |
| `data`       | object | Contains return decision details. |

---

### `data` Object

| Field       | Type   | Description                       |
| ----------- | ------ | --------------------------------- |
| `return_id` | string | The return request ID.            |
| `status`    | string | Final status after the rejection. |

---

## Error Handling

All API errors will throw a `TikTokAPIError` containing:

- **message**
- **code**
- **request_id**

Full error reference:  
https://partner.tiktokshop.com/docv2/page/reject-return-202309#Error_Code
