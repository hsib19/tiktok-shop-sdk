# Get Authorized Category Assets

Retrieve seller-authorized product categories using the **TikTok Shop SDK**. This API is typically used in product creation flows to ensure that only approved categories can be selected.

---

## Requirements

- A valid seller **Access Token**
- The app must have category authorization from the seller
- Use `shop.getCategoryAssets()` from the SDK

Official API reference: [TikTok Shop – Get Authorized Category Assets](https://partner.tiktokshop.com/docv2/page/get-authorized-category-assets-202405)

---

## Usage Example

This example demonstrates how to retrieve authorized product categories.

```ts
import { TikTokShopSDK, TikTokAPIError } from 'tiktok-shop-sdk';

const sdk = new TikTokShopSDK({
  appKey: process.env.TIKTOK_APP_KEY!,
  appSecret: process.env.TIKTOK_APP_SECRET!,
});

async function main() {
  try {
    // Set Access Token (required for seller-level APIs)
    sdk.setAccessToken(process.env.TIKTOK_APP_ACCESS_KEY!);

    // Fetch authorized category assets
    const response = await sdk.shop.getCategoryAssets({
      category_type: 1, // 1 = Product Category
      page_number: 1,
      page_size: 50,
    });

    console.log('Authorized Categories:', response.data);
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

Example response returned from TikTok Shop:

```json
{
  "code": 0,
  "data": {
    "category_assets": [
      {
        "cipher": "TTP_XF90igAAAABh0sddwer0qsWgt233vOiG",
        "target_market": "US",
        "category": {
          "id": 3,
          "name": "Customer Support"
        }
      }
    ]
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

Each `category_assets` entry contains:

- **cipher** — encrypted identifier
- **target_market** — marketplace (e.g. US)
- **category.id** — numeric category ID
- **category.name** — readable category name

---

## Error Handling

All API errors throw `TikTokAPIError`, which includes:

- **message**
- **code**
- **request_id**

Full list of error codes: [TikTok Common Errors](https://partner.tiktokshop.com/docv2/page/common-errors)
