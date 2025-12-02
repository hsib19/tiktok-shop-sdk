# Approve Cancellation

Approve a buyer's cancellation request in TikTok Shop.

Official documentation:\
https://partner.tiktokshop.com/docv2/page/approve-cancellation-202309

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher**
- SDK Method: `return_refund.approveCancellation()`

---

## Parameters

### Path / Main Parameters

Field Type Description

---

`cancel_id` string The cancellation request ID. **Required**

---

### Query Parameters

---

Field Type Description

---

`idempotency_key` string Unique key to prevent duplicate approvals.

---

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

  const response = await sdk.return_refund.approveCancellation({
    cancel_id: '09830495345435',
    query: {
      idempotency_key: '03498530l94056',
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
    "status": "CANCELLATION_APPROVED"
  },
  "message": "Success",
  "request_id": "202407031400112233445566778899"
}
```

---

## Response Descriptions

### Top-Level Fields

Field Type Description

---

`code` int API status code (0 = success).
`message` string Operation message.
`request_id` string Unique request identifier.
`data` object Contains approval result.

---

### `data` Object

Field Type Description

---

`success` boolean Whether approval was successful.
`status` string Final status of the cancellation request.

---

## Error Handling

All API errors will throw a `TikTokAPIError` containing:

- **message**
- **code**
- **request_id**

Full error reference:\
https://partner.tiktokshop.com/docv2/page/approve-cancellation-202309#Error_Code
