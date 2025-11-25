---
title: Get Product Categories
description: Retrieve TikTok Shop product categories for listing creation based on locale, keyword, and platform.
---

# Get Product Categories

Use this API to retrieve TikTok Shop product categories dynamically when building a product creation form.

This helps sellers find the correct category using localized keywords.

---

## Requirements

- A valid seller **Access Token**
- A valid **Shop Cipher** (encrypted shop identifier)
- Use `product.getCategories()` from the SDK

Official documentation:  
<https://partner.tiktokshop.com/docv2/page/get-categories-202312>

---

## Usage Example

This example shows how to search categories using a keyword based on language and platform.

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

  const response = await sdk.product.getCategories({
    locale: 'id-ID',
    keyword: 'Kaos',
    category_version: 'v1',
    listing_platform: 'TIKTOK_SHOP',
  });

  console.log(response.data?.categories);
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
    "categories": [
      {
        "id": "123123",
        "name": "Kaos Pria",
        "parent_id": "123",
        "is_leaf": true
      }
    ]
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

Each `shops` entry contains:

| Field       | Description                                     |
| ----------- | ----------------------------------------------- |
| `id`        | Unique category identifier                      |
| `name`      | Localized category name                         |
| `parent_id` | Parent category ID (if exists)                  |
| `is_leaf`   | Whether the category is the final/leaf category |

---

## Error Handling

All API errors throw `TikTokAPIError`, which contains:

- **message**
- **code**
- **request_id**

Full error reference:  
<https://partner.tiktokshop.com/docv2/page/common-errors>
