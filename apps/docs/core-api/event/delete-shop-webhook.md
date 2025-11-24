# Delete Shop Webhook

Delete an existing webhook subscription for a shop.  
This API is used to remove event notifications such as message listeners or order updates.

---

## Requirements

- A valid seller **Access Token**
- A valid **Shop Cipher** (encrypted shop identifier)
- Use `event.deleteShopWebhook()` from the SDK

**Official documentation:**  
[TikTok Shop – Delete Shop Webhook](https://partner.tiktokshop.com/docv2/page/delete-shop-webhook-202309)

---

## Usage Example

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

  const response = await sdk.event.deleteShopWebhook({
    event_type: 'NEW_MESSAGE_LISTENER',
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

```json
{
  "code": 0,
  "data": {},
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

### Response Fields

- **code** — API status code (0 means success)
- **data** — empty object
- **message** — response message
- **request_id** — unique request identifier

---

## Error Handling

All API errors throw **TikTokAPIError**, which provides:

- **message**
- **code**
- **request_id**

Full reference:  
[TikTok Common Errors](https://partner.tiktokshop.com/docv2/page/common-errors)
