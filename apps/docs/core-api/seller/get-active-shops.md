---
title: Get Active Shops
description: Retrieve a list of active shops associated with a seller account using TikTok Shop SDK.
---

# Get Active Shops

Retrieve a list of active shops associated with a seller account. This API is useful for multi-store dashboards, seller management, and automation flows.

---

## Requirements

- A valid seller **Access Token**
- Use `seller.getActiveShops()` from the SDK

Official documentation:  
<https://partner.tiktokshop.com/docv2/page/get-active-shops-202309>

---

## Usage Example

This example shows how to retrieve all active shops for a seller.

```ts
import { TikTokShopSDK, TikTokAPIError } from 'tiktok-shop-sdk';

const sdk = new TikTokShopSDK({
  appKey: process.env.TIKTOK_APP_KEY!,
  appSecret: process.env.TIKTOK_APP_SECRET!,
});

try {
  // Set Access Token
  sdk.setAccessToken(process.env.TIKTOK_APP_ACCESS_KEY!);

  const response = await sdk.seller.getActiveShops();
  console.log(JSON.stringify(response.data?.shops));
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
    "shops": [
      {
        "id": "36123502970007",
        "region": "GB"
      }
    ]
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

Each `shops` entry contains:

- **id** — unique shop identifier
- **region** — marketplace region (e.g., GB, US, ID)

---

## Error Handling

All API errors throw `TikTokAPIError`, which contains:

- **message**
- **code**
- **request_id**

Full error reference:  
<https://partner.tiktokshop.com/docv2/page/common-errors>
