# Get Affiliate Partner Campaign List

Retrieve a list of affiliate partner campaigns using the **TikTok Shop SDK**.
This API returns campaigns with pagination support.

## Requirements

- A valid seller **Access Token**
- **Category Assets Cipher** (seller-authorized)
- Affiliate Partner permission enabled for the app
- SDK method: `affiliatePartner.getAffiliatePartnerCampaignList()`

Official API reference:
[https://partner.tiktokshop.com/docv2/page/get-affiliate-partner-campaign-list-202405](https://partner.tiktokshop.com/docv2/page/get-affiliate-partner-campaign-list-202405)

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

  const response = await sdk.affiliatePartner.getAffiliatePartnerCampaignList({
    query: {
      page_size: 10,
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
    "campaigns": [
      {
        "id": "7360590375814268715",
        "name": "test",
        "status": "READY",
        "registration_start_time": 1712941200,
        "registration_end_time": 1713891599,
        "campaign_start_time": 1712941200,
        "campaign_end_time": 1715878799
      }
    ],
    "next_page_token": "absdfV231as2V0PTAK",
    "total_count": 1570
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

## Response Fields

- **code** — API status code (`0` means success)
- **data.campaigns** — Array of campaign objects
  - **id** — Campaign ID
  - **name** — Campaign name
  - **status** — Campaign status (`READY`, `DRAFT`, etc.)
  - **registration_start_time / registration_end_time** — Registration period (UNIX timestamp)
  - **campaign_start_time / campaign_end_time** — Campaign active period (UNIX timestamp)

- **data.next_page_token** — Token for next page pagination
- **data.total_count** — Total number of campaigns
- **message** — Result message
- **request_id** — Unique request identifier for debugging

## Error Codes

This API uses standard TikTok Shop error codes.

Full list of error codes:
[https://partner.tiktokshop.com/docv2/page/common-errors](https://partner.tiktokshop.com/docv2/page/common-errors)

Error code reference for this endpoint:
[https://partner.tiktokshop.com/docv2/page/get-affiliate-partner-campaign-list-202405#Error_Code](https://partner.tiktokshop.com/docv2/page/get-affiliate-partner-campaign-list-202405#Error_Code)

## Error Handling Example

```ts
if (error instanceof TikTokAPIError) {
  console.error(error.code);
  console.error(error.message);
  console.error(error.request_id);
}
```

## Notes

- Pagination is supported via `page_size` and `next_page_token`
- `Category Assets Cipher` must be set before calling this API
