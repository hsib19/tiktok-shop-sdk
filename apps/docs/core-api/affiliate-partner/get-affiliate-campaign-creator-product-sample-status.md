# Get Affiliate Campaign Creator Product Sample Status

Retrieve the sample status for a creator's product in an affiliate campaign using the **TikTok Shop SDK**.
This API provides details about shipping, delivery dates, quantity, and tracking events.

## Requirements

- A valid seller **Access Token**
- **Category Assets Cipher** (seller-authorized)
- Affiliate Partner permission enabled for the app
- SDK method: `affiliatePartner.getAffiliateCampaignCreatorProductSampleStatus()`

Official API reference:
[https://partner.tiktokshop.com/docv2/page/get-affiliate-campaign-creator-product-sample-status-202508](https://partner.tiktokshop.com/docv2/page/get-affiliate-campaign-creator-product-sample-status-202508)

## Usage Example

```ts
import { TikTokAPIError, TikTokShopSDK } from 'tiktok-shop-sdk';

const sdk = new TikTokShopSDK({
  appKey: process.env.TIKTOK_APP_KEY!,
  appSecret: process.env.TIKTOK_APP_SECRET!,
});

export async function main() {
  try {
    // Set Access Token
    sdk.setAccessToken(process.env.TIKTOK_APP_ACCESS_KEY!);
    // Set Category Assets Cipher
    sdk.setCategoryAssetsCipher(process.env.TIKTOK_SHOP_CIPHER!);

    const response =
      await sdk.affiliatePartner.getAffiliateCampaignCreatorProductSampleStatus(
        {
          path: {
            campaign_id: '23904820343',
            creator_temp_id: '23042343',
            product_id: '230492034343',
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
}

main();
```

## Response Example

```json
{
  "code": 0,
  "data": {
    "sample_status": {
      "shipping_provider_name": "USPS",
      "delivery_option": "PREMIUM_SHIPPING",
      "estimated_earliest_delivery_date": "1712941200",
      "estimated_latest_delivery_date": "1712941200",
      "quantity": 1,
      "tracking_results": [
        {
          "tracking_event_update_date": "1712941200",
          "tracking_event_description": "THE_PACKAGE_HAS_BEEN_DELIVERED",
          "tracking_event_description_extended": "delivering"
        }
      ]
    }
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

## Response Fields

- **code** — API status code (`0` means success)
- **data.sample_status** — Object containing sample shipment details
  - **shipping_provider_name** — Name of the shipping provider
  - **delivery_option** — Shipping method (e.g., PREMIUM_SHIPPING)
  - **estimated_earliest_delivery_date / estimated_latest_delivery_date** — Estimated delivery timestamps
  - **quantity** — Quantity of samples shipped
  - **tracking_results** — Array of tracking events
    - **tracking_event_update_date** — Event timestamp
    - **tracking_event_description** — Event description
    - **tracking_event_description_extended** — Extended description

- **message** — Result message
- **request_id** — Unique request identifier for debugging

## Error Codes

This API uses standard TikTok Shop error codes.

Full list of error codes:
[https://partner.tiktokshop.com/docv2/page/common-errors](https://partner.tiktokshop.com/docv2/page/common-errors)

Error code reference for this endpoint:
[https://partner.tiktokshop.com/docv2/page/get-affiliate-campaign-creator-product-sample-status-202508#Error_Code](https://partner.tiktokshop.com/docv2/page/get-affiliate-campaign-creator-product-sample-status-202508#Error_Code)

## Error Handling Example

```ts
if (error instanceof TikTokAPIError) {
  console.error(error.code);
  console.error(error.message);
  console.error(error.request_id);
}
```

## Notes

- `campaign_id`, `creator_temp_id`, and `product_id` are required in the request path
- `Category Assets Cipher` must be set before calling this API
