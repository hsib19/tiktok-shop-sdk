---
title: Check Listing Prerequisites
description: Validate whether a product meets TikTok Shop requirements before creating or publishing a product listing.
---

# Check Listing Prerequisites

Use this API to check whether a product satisfies TikTok Shop listing rules based on its category, attributes, and SKU structure.

This helps prevent product-creation failures and improves listing success rates.

---

## Requirements

- A valid seller **Access Token**
- A valid **Shop Cipher** (encrypted shop identifier)
- Use `product.checkListingPrerequisites()` from the SDK

Official documentation:  
<https://partner.tiktokshop.com/docv2/page/check-listing-prerequisites>

---

## Usage Example

This example shows how to validate a product before listing it on TikTok Shop.

```ts
import { TikTokShopSDK, TikTokAPIError } from 'tiktok-shop-sdk';

const sdk = new TikTokShopSDK({
  appKey: process.env.TIKTOK_APP_KEY!,
  appSecret: process.env.TIKTOK_APP_SECRET!,
});

try {
  // Set Access Token
  sdk.setAccessToken(process.env.TIKTOK_APP_ACCESS_KEY!);

  const body = {
    category_id: '123456',
    product_attributes: [
      { attribute_id: 'color', value: 'Blue' },
      { attribute_id: 'size', value: 'L' },
    ],
    skus: [
      {
        seller_sku: 'SKU-001',
        price: 25000,
        stock_qty: 12,
      },
    ],
  };

  const response = await sdk.product.checkListingPrerequisites(body);
  console.log(JSON.stringify(response.data, null, 2));
} catch (error) {
  if (error instanceof TikTokAPIError) {
    console.error('TikTok API Error:', error.message);
    console.error('Status Code:', error.code);
    console.log('Request Id:', error.request_id);
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
    "eligible": true,
    "suggestions": [],
    "violations": []
  },
  "message": "Success",
  "request_id": "2024090309100002003458902ABCD123"
}
```

Each `shops` entry contains:

- **eligible** — Whether the product is eligible for listing
- **violations** — List of rules the product fails to meet
- **suggestions** — Recommendations for improving product eligibility

---

## Error Handling

All API errors throw `TikTokAPIError`, which contains:

- **message**
- **code**
- **request_id**

Full error reference:  
<https://partner.tiktokshop.com/docv2/page/common-errors>
