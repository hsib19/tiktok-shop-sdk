# Partner Generate Multi Affiliate Campaign Product Link

Generate affiliate product links for multiple products in a campaign using the **TikTok Shop SDK**.
This API allows generating links for multiple products at once.

## Requirements

- A valid seller **Access Token**
- **Category Assets Cipher** (seller-authorized)
- Affiliate Partner permission enabled for the app
- SDK method: `affiliatePartner.partnerGenerateMultiAffiliateCampaignProductLink()`

Official API reference:
[https://partner.tiktokshop.com/docv2/page/partner-generate-multi-affiliate-campaign-product-link-202505](https://partner.tiktokshop.com/docv2/page/partner-generate-multi-affiliate-campaign-product-link-202505)

## Usage Example

```ts
import { TikTokAPIError, TikTokShopSDK } from 'tiktok-shop-sdk';

const sdk = new TikTokShopSDK({
  appKey: process.env.TIKTOK_APP_KEY!,
  appSecret: process.env.TIKTOK_APP_SECRET!,
});

try {
  // Set Access Token
  sdk.setAccessToken(process.env.TIKTOK_APP_ACCESS_KEY!);
  // Set Category Assets Cipher
  sdk.setCategoryAssetsCipher(process.env.TIKTOK_SHOP_CIPHER!);

  const response =
    await sdk.affiliatePartner.partnerGenerateMultiAffiliateCampaignProductLink(
      {
        path: {
          campaign_id: '092842094204',
        },
        body: {
          product_ids: ['298209340234', '89792348234'],
        },
      },
    );

  console.log('Response:', response);
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
    "product_promotion_links": [
      {
        "product_id": "7362840009596339971",
        "link": "https://affiliate.tiktok.com/api/v1/share/AIxvOHlaJoKO"
      }
    ],
    "failed_product_ids": [7362840009596340000]
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

## Response Fields

- **code** — API status code (`0` means success)
- **data.product_promotion_links** — Array of successfully generated product links
  - **product_id** — Product ID
  - **link** — Generated affiliate link

- **data.failed_product_ids** — Array of product IDs that failed to generate links
- **message** — Result message
- **request_id** — Unique request identifier for debugging

## Error Codes

This API uses standard TikTok Shop error codes.

Full list of error codes:
[https://partner.tiktokshop.com/docv2/page/common-errors](https://partner.tiktokshop.com/docv2/page/common-errors)

Error code reference for this endpoint:
[https://partner.tiktokshop.com/docv2/page/partner-generate-multi-affiliate-campaign-product-link-202505#Error_Code](https://partner.tiktokshop.com/docv2/page/partner-generate-multi-affiliate-campaign-product-link-202505#Error_Code)

## Error Handling Example

```ts
if (error instanceof TikTokAPIError) {
  console.error(error.code);
  console.error(error.message);
  console.error(error.request_id);
}
```

## Notes

- `campaign_id` is required in the request path
- `product_ids` is required in the request body
- `Category Assets Cipher` must be set before calling this API
