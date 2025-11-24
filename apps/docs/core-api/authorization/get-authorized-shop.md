# Get Authorized Shops

Retrieve a list of shops that have authorized your TikTok Shop application. This API is commonly used for multi-store dashboards, automation systems, and account management flows.

---

## Requirements

- A valid seller **Access Token**
- The seller must authorize your app
- Use `shop.getAuthorizedShops()` from the SDK

Official documentation: [TikTok Shop – Get Authorized Shops](https://partner.tiktokshop.com/docv2/page/get-authorized-shops-202309)

---

## Usage Example

```ts
import { TikTokShopSDK, TikTokAPIError } from 'tiktok-shop-sdk';

const sdk = new TikTokShopSDK({
  appKey: process.env.TIKTOK_APP_KEY!,
  appSecret: process.env.TIKTOK_APP_SECRET!,
});

async function main() {
  try {
    // Set Access Token (seller-level)
    sdk.setAccessToken(process.env.TIKTOK_APP_ACCESS_KEY!);

    // Get authorized shops
    const response = await sdk.shop.getAuthorizedShops();

    console.log('Authorized Shops:', response.data);
  } catch (error) {
    if (error instanceof TikTokAPIError) {
      console.error('TikTok API Error:', error.message);
      console.error('Status Code:', error.code);
      console.error('Request ID:', error.request_id);
    } else {
      console.error('Unexpected Error:', error);
    }
  }
}

main();
```

---

## Response Example

```json
{
  "code": 0,
  "data": {
    "shops": [
      {
        "id": "7000714532876273420",
        "name": "Maomao beauty shop",
        "region": "GB",
        "seller_type": "CROSS_BORDER",
        "cipher": "GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3",
        "code": "CNGBCBA4LLU8"
      }
    ]
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

Each `shops` entry contains:

- **id** — unique shop identifier
- **name** — shop display name
- **region** — marketplace region (e.g., GB, US, ID)
- **seller_type** — type of seller (e.g., CROSS_BORDER, LOCAL)
- **cipher** — encrypted shop identifier
- **code** — authorization code associated with the shop

---

## Error Handling

All API errors throw `TikTokAPIError`, which contains:

- **message**
- **code**
- **request_id**

Full error reference: [TikTok Common Errors](https://partner.tiktokshop.com/docv2/page/common-errors)
