# Get Shop Webhooks

Retrieve all webhook subscriptions configured for a shop.  
Useful for monitoring events such as order status changes, product updates, and logistics notifications.

---

## Requirements

- A valid seller **Access Token**
- A valid **Shop Cipher** (encrypted shop identifier)
- Use `event.getShopWebhooks()` from the SDK

Official documentation:  
[TikTok Shop – Get Shop Webhooks](https://partner.tiktokshop.com/docv2/page/get-shop-webhooks-202309)

---

## Usage Example

This example shows how to retrieve all webhook subscriptions for a shop.

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

  const response = await sdk.event.getShopWebhooks();

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

This is a real example returned by TikTok Shop:

```json
{
  "code": 0,
  "data": {
    "webhooks": [
      {
        "event_type": "ORDER_STATUS_CHANGE",
        "address": "https://partner.tiktokshop.com",
        "create_time": 1635338186,
        "update_time": 1635338186
      }
    ],
    "total_count": 1
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

### Webhook Fields

Each `webhooks` entry contains:

- **event_type** — type of event (e.g., `ORDER_STATUS_CHANGE`)
- **address** — webhook callback URL
- **create_time** — creation timestamp (Unix)
- **update_time** — last update timestamp (Unix)

`total_count` indicates the number of webhooks configured for the shop.

---

## Error Handling

All API errors throw `TikTokAPIError`, which contains:

- **message**
- **code**
- **request_id**

Full error reference:  
[TikTok Common Errors](https://partner.tiktokshop.com/docv2/page/common-errors)
