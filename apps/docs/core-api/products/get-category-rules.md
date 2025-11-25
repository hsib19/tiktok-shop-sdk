# Get Category Rules

Retrieve the additional requirements (beyond mandatory product attributes) for listing a product in a particular category based on your shop's location. Requirements may include product certifications, size charts, dimensions and more.

Use this API to determine the supporting information that you must prepare before listing a product.

**_Note_**: It must be a [leaf category]("https://partner.tiktokshop.com/docv2/page/6509c89d0fcef602bf1acd9b") that corresponds to the category tree type specified in the `category_version` property.

## Requirements

- A valid seller **Access Token**
- A valid **Shop Cipher** (encrypted shop identifier)
- Use `product.getCategoryRules()` from the SDK

**Official documentation:**  
[TikTok Shop – Get Category Rules](https://partner.tiktokshop.com/docv2/page/get-category-rules-202309)

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

  const response = await sdk.product.getCategoryRules({
    category_id: '601226',
    query: {
      category_version: 'v1',
      locale: 'en-US',
    },
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

## Response Example

```json
{
  "code": 0,
  "data": {
    "product_certifications": [
      {
        "id": "602362",
        "name": "SNI Certificate",
        "is_required": true,
        "document_details": "Upload a user manual or instructions in the official local language.\\n\\nWhere there are multiple items sold as a part of a bundle, please clearly indicate which specific product the certification pertains to in the uploaded file or image.",
        "sample_image_url": "https://p-boei18n.byted.org/tos-boei18n-i-jvtte31kaf/80b32f2896829eeb69d4b278c4f3aa75.jpg~tplv-jvtte31kaf-origin-jpeg.jpeg",
        "requirement_conditions": [
          {
            "condition_type": "VALUE_ID_MATCH",
            "attribute_id": "101610",
            "attribute_value_id": "1024358"
          }
        ],
        "expiration_date": {
          "is_required": true
        }
      }
    ],
    "size_chart": {
      "is_supported": true,
      "is_required": true
    },
    "cod": {
      "is_supported": true
    },
    "package_dimension": {
      "is_required": true
    },
    "epr": {
      "is_required": false
    },
    "responsible_person": {
      "is_required": false
    },
    "manufacturer": {
      "is_required": false
    },
    "allowed_special_product_types": "\"PRE_ORDER\"",
    "fees": [
      {
        "type": "PFAND",
        "is_required": true
      }
    ]
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

## Error Handling

All API errors throw **TikTokAPIError**, which provides:

- **message**
- **code**
- **request_id**

Full reference:  
[TikTok Common Errors](https://partner.tiktokshop.com/docv2/page/common-errors)
