---
title: Update Shop Webhook
description: Update an existing TikTok Shop webhook callback URL or event type using TikTok Shop SDK.
---

# Update Shop Webhook

Update an existing webhook subscription for a shop.  
This API is used to change the callback URL or event type for notifications such as order updates or address changes.

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher** (encrypted shop identifier)
- Use `event.updateShopWebhook()` from the SDK

**Official documentation:**  
[TikTok Shop – Update Shop Webhook](https://partner.tiktokshop.com/docv2/page/update-shop-webhook-202309)

---

## Usage Example

Below is an example showing how to update a webhook subscription for a shop using the TikTok Shop SDK.

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

  const response = await sdk.event.updateShopWebhook({
    address: 'https://urlhere.com/notify',
    event_type: 'RECIPIENT_ADDRESS_UPDATE',
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

Here is an example of a real response returned by TikTok Shop:

```json
{
  "code": 0,
  "data": {},
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

**Response fields:**

- **code** — API status code (`0` means success)
- **data** — empty object (no additional payload)
- **message** — API message
- **request_id** — unique identifier for request

---

## Error Handling

All API errors throw `TikTokAPIError`, which contains:

- `message`
- `code`
- `request_id`

For full error reference:  
[TikTok Common Errors](https://partner.tiktokshop.com/docv2/page/common-errors)
