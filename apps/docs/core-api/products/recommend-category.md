---
title: Recommend Category
description: Automatically recommend the best TikTok Shop product category based on the product title using TikTok Shop SDK.
---

# Recommend Category

Use this API to automatically detect and recommend the best product category based on the product title.

This helps simplify product listing workflows and reduce publishing failures caused by incorrect category selection.

## Requirements

- A valid seller **Access Token**
- A valid **Shop Cipher** (encrypted shop identifier)
- Use `product.recommendCategory()` from the SDK

Official documentation:  
<https://partner.tiktokshop.com/docv2/page/recommend-category-202309>

## Usage Example

This example shows how to get an AI-based category recommendation for a product title.

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

  const response = await sdk.product.recommendCategory({
    product_title: 'T-Shirt Fnatic Unisex Lengan Pendek Premium Cotton',
  });

  console.log(response.data);
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

## Response Example

This is a real example returned by TikTok Shop:

```json
{
  "code": 0,
  "data": {
    "leaf_category_id": "605254",
    "categories": [
      {
        "id": "605254",
        "name": "Teas",
        "level": 1,
        "is_leaf": true,
        "permission_statuses": ["INVITE_ONLY"]
      }
    ]
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

Each `shops` entry contains:

| Field                              | Description                                          |
| ---------------------------------- | ---------------------------------------------------- |
| `leaf_category_id`                 | Final recommended category ID                        |
| `categories[].id`                  | Category ID                                          |
| `categories[].name`                | Category name                                        |
| `categories[].level`               | Category level in the category tree                  |
| `categories[].is_leaf`             | Whether the category is a leaf category              |
| `categories[].permission_statuses` | Category permission restrictions (e.g., INVITE_ONLY) |

## Error Handling

All API errors throw `TikTokAPIError`, which contains:

- **message**
- **code**
- **request_id**

Full error reference:  
<https://partner.tiktokshop.com/docv2/page/common-errors>
