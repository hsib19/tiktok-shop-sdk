---
title: Get Seller Permissions
description: Retrieve the list of permissions granted to a seller account using TikTok Shop SDK.
---

# Get Seller Permissions

Retrieve the list of permissions granted to a seller account. This API is useful for verifying access scopes and managing feature availability in dashboards or automation flows.

---

## Requirements

- A valid seller **Access Token**
- Use `seller.getSellerPermissions()` from the SDK

Official documentation:  
<https://partner.tiktokshop.com/docv2/page/get-seller-permissions-202309>

---

## Usage Example

This example shows how to retrieve all permissions granted to a seller.

```ts
import { TikTokShopSDK, TikTokAPIError } from 'tiktok-shop-sdk';

const sdk = new TikTokShopSDK({
  appKey: process.env.TIKTOK_APP_KEY!,
  appSecret: process.env.TIKTOK_APP_SECRET!,
});

try {
  // Set Access Token
  sdk.setAccessToken(process.env.TIKTOK_APP_ACCESS_KEY!);

  const response = await sdk.seller.getSellerPermissions();
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

This is a real example returned by TikTok Shop:

```json
{
  "code": 0,
  "data": {
    "permissions": ["MANAGE_GLOBAL_PRODUCT"]
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

The `permissions` array contains:

- **permissions** — list of permission codes granted to the seller (e.g., MANAGE_GLOBAL_PRODUCT)

---

## Error Handling

All API errors throw `TikTokAPIError`, which contains:

- **message**
- **code**
- **request_id**

Full error reference:  
<https://partner.tiktokshop.com/docv2/page/common-errors>
