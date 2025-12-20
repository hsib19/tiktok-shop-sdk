# Get Affiliate Partner Campaign Detail

Retrieve detailed information about an existing affiliate partner campaign using the **TikTok Shop SDK**.
This API is used to get all campaign metadata including status, commission, duration, and contact information.

## Requirements

- A valid seller **Access Token**
- **Category Assets Cipher** (seller-authorized)
- Affiliate Partner permission enabled for the app
- SDK method: `affiliatePartner.getAffiliatePartnerCampaignDetail()`

Official API reference:
[https://partner.tiktokshop.com/docv2/page/get-affiliate-partner-campaign-detail-202405](https://partner.tiktokshop.com/docv2/page/get-affiliate-partner-campaign-detail-202405)

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

  const response = await sdk.affiliatePartner.getAffiliatePartnerCampaignDetail(
    {
      path: {
        campaign_id: '49583045345',
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
    "id": "7356876895365105455",
    "name": "test_campaign",
    "description": "Campaign for api test.",
    "status": "READY",
    "region": "US",
    "registration_start_time": 1712941200,
    "registration_end_time": 1713891599,
    "campaign_start_time": 1712941200,
    "campaign_end_time": 1715878799,
    "commission_rate": 1000,
    "contact_info": {
      "whatsapp": "+14255550100",
      "email": "123456@gmail.com",
      "phone": "+14255550100",
      "zalo": "+14255550100",
      "viber": "+14255550100",
      "line": "+14255550100"
    },
    "target_shops": [
      {
        "code": "THCBELNL4Y",
        "name": "my_shop"
      }
    ],
    "target_seller_types": ["LOCAL"]
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

## Response Fields

- **code** — API status code (`0` means success)
- **data** — Campaign details object
  - **id** — Campaign ID
  - **name** — Campaign name
  - **description** — Campaign description
  - **status** — Campaign status (`READY`, `DRAFT`, etc.)
  - **region** — Campaign region
  - **registration_start_time / registration_end_time** — Campaign registration period (UNIX timestamp)
  - **campaign_start_time / campaign_end_time** — Campaign active period (UNIX timestamp)
  - **commission_rate** — Default commission rate
  - **contact_info** — Contact information object
  - **target_shops** — Array of target shops
  - **target_seller_types** — Array of seller types

- **message** — Result message
- **request_id** — Unique request identifier for debugging

## Error Codes

This API uses standard TikTok Shop error codes.

Full list of error codes:
[https://partner.tiktokshop.com/docv2/page/common-errors](https://partner.tiktokshop.com/docv2/page/common-errors)

Error code reference for this endpoint:
[https://partner.tiktokshop.com/docv2/page/get-affiliate-partner-campaign-detail-202405#Error_Code](https://partner.tiktokshop.com/docv2/page/get-affiliate-partner-campaign-detail-202405#Error_Code)

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
- `Category Assets Cipher` must be set before calling this API
