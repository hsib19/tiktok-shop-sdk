# Review Affiliate Partner Campaign Product

Review a product in an existing affiliate partner campaign using the **TikTok Shop SDK**.  
This API is used to approve or reject a product within an affiliate campaign.

## Requirements

- A valid seller **Access Token**
- **Category Assets Cipher** (seller-authorized)
- Affiliate Partner permission enabled for the app
- SDK method: `affiliatePartner.reviewAffiliatePartnerCampaign()`

Official API reference:  
https://partner.tiktokshop.com/docv2/page/review-affiliate-partner-campaign-product-202405

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

  const response = await sdk.affiliatePartner.reviewAffiliatePartnerCampaign({
    path: {
      campaign_id: '49583045345',
      product_id: '9304583045345',
    },
    body: {
      review_result: 'REJECT', // or 'APPROVE'
      reject_reasons: ['COMMISSION_TOO_LOW'], // optional if rejecting
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
  "data": {},
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

## Response Fields

- **code** — API status code (`0` means success)
- **data** — Empty object when review succeeds
- **message** — Result message
- **request_id** — Unique request identifier for debugging

## Error Codes

This API uses standard TikTok Shop error codes.

Full list of error codes:  
https://partner.tiktokshop.com/docv2/page/common-errors

Error code reference for this endpoint:  
https://partner.tiktokshop.com/docv2/page/review-affiliate-partner-campaign-product-202405#Error_Code

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
- `review_result` must be either `APPROVE` or `REJECT`
- If rejecting, `reject_reasons` should be provided
- `Category Assets Cipher` must be set before calling this API.
