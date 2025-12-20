# Generate Affiliate Partner Campaign Product Link

Generate a unique affiliate link for a product in an existing affiliate partner campaign using the **TikTok Shop SDK**.  
This API allows affiliates to share a product link with a specific commission rate.

## Requirements

- A valid seller **Access Token**
- **Category Assets Cipher** (seller-authorized)
- Affiliate Partner permission enabled for the app
- SDK method: `affiliatePartner.generateAffiliatePartnerCampaignProductLink()`

Official API reference:  
https://partner.tiktokshop.com/docv2/page/generate-affiliate-partner-campaign-product-link-202405

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
    await sdk.affiliatePartner.generateAffiliatePartnerCampaignProductLink({
      path: {
        campaign_id: '49583045345',
        product_id: '9304583045345',
      },
      body: {
        creator_commission_rate: 10,
      },
    });

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
    "product_promotion_link": "https://affiliate.tiktok.com/api/v1/share/AIxvOHlaJoKO"
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

## Response Fields

- **code** — API status code (`0` means success)
- **data.product_link** — Generated affiliate product link
- **message** — Result message
- **request_id** — Unique request identifier for debugging

## Error Codes

This API uses standard TikTok Shop error codes.

Full list of error codes:  
https://partner.tiktokshop.com/docv2/page/common-errors

Error code reference for this endpoint:  
https://partner.tiktokshop.com/docv2/page/generate-affiliate-partner-campaign-product-link-202405#Error_Code

## Error Handling Example

```ts
if (error instanceof TikTokAPIError) {
  console.error(error.code);
  console.error(error.message);
  console.error(error.request_id);
}
```

## Notes

- `campaign_id` and `product_id` are required in the request path
- `creator_commission_rate` is required in the request body
- `Category Assets Cipher` must be set before calling this API
