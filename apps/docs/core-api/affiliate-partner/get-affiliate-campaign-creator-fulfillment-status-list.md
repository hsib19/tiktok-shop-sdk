# Get Affiliate Campaign Creator Fulfillment Status List

Retrieve a list of fulfillment status for creators in an affiliate campaign using the **TikTok Shop SDK**.
This API provides insights into campaign product performance, creator participation, and commission statistics.

## Requirements

- A valid seller **Access Token**
- **Category Assets Cipher** (seller-authorized)
- Affiliate Partner permission enabled for the app
- SDK method: `affiliatePartner.getAffiliateCampaignCreatorFulfillmentStatusList()`

Official API reference:
[https://partner.tiktokshop.com/docv2/page/get-affiliate-campaign-creator-fulfillment-status-list-202501](https://partner.tiktokshop.com/docv2/page/get-affiliate-campaign-creator-fulfillment-status-list-202501)

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
    await sdk.affiliatePartner.getAffiliateCampaignCreatorFulfillmentStatusList(
      {
        path: {
          campaign_id: '092340293480234',
        },
        query: {
          page_size: 20,
          page_token: '29384204234',
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
    "total_count": 10,
    "campaign_product_statistics": [
      {
        "data_update_time": "1736204400000",
        "creator_sales_num": 1,
        "collaborated_creators_num": 0,
        "promoted_creator_num": 0,
        "sample_requested_creator_num": 0,
        "campaign_product_detail": {
          "product_id": "12344",
          "product_status": "PRODUCT_UNSPECIFIED",
          "product_name": "summer underwear soft dress summer underwear-001",
          "product_stock_count": "100",
          "total_commission_percent": "6000",
          "creator_commission_percent": "1000",
          "partner_commission_percent": "5000",
          "plan_commission_percent": "1400",
          "product_price": {
            "min_price": "1.00",
            "max_price": "3.00",
            "currency": "USD"
          },
          "product_thumbnail": {
            "uri": "tos-useast5-i-omjb5zjo8w-tx/178e97ee3b254f9ab237ea7516828266",
            "url_list": [
              "https://p19-oec-ttp.tiktokcdn-us.com/tos-useast5-i-omjb5zjo8w-tx/178e97ee3b254f9ab237ea7516828266~tplv-omjb5zjo8w-resize-jpeg:300:300.jpeg?from=520841845",
              "https://p16-oec-ttp.tiktokcdn-us.com/tos-useast5-i-omjb5zjo8w-tx/178e97ee3b254f9ab237ea7516828266~tplv-omjb5zjo8w-resize-jpeg:300:300.jpeg?from=520841845"
            ]
          },
          "indicator_data": {
            "paid_order_num": "3",
            "actual_order_num": "0",
            "estimated_amount": "0",
            "actual_amount": "0",
            "estimated_partner_commission": "0",
            "actual_partner_commission": "0",
            "creator_sales_num": "0",
            "collaborated_creators_num": "0",
            "promoted_creator_num": "0",
            "sample_requested_creator_num": "0"
          }
        }
      }
    ],
    "next_page_token": "0"
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

## Response Fields

- **code** — API status code (`0` means success)
- **data.total_count** — Total number of campaign product statistics
- **data.campaign_product_statistics** — Array of campaign product statistics
  - **data_update_time** — Last data update timestamp
  - **creator_sales_num / collaborated_creators_num / promoted_creator_num / sample_requested_creator_num** — Creator metrics
  - **campaign_product_detail** — Campaign product details
    - **product_id / product_status / product_name / product_stock_count**
    - **total_commission_percent / creator_commission_percent / partner_commission_percent / plan_commission_percent**
    - **product_price** — Min, max, and currency
    - **product_thumbnail** — URI and URL list
    - **indicator_data** — Additional campaign metrics

- **data.next_page_token** — Token for next page pagination
- **message** — Result message
- **request_id** — Unique request identifier for debugging

## Error Codes

This API uses standard TikTok Shop error codes.

Full list of error codes:
[https://partner.tiktokshop.com/docv2/page/common-errors](https://partner.tiktokshop.com/docv2/page/common-errors)

Error code reference for this endpoint:
[https://partner.tiktokshop.com/docv2/page/get-affiliate-campaign-creator-fulfillment-status-list-202501#Error_Code](https://partner.tiktokshop.com/docv2/page/get-affiliate-campaign-creator-fulfillment-status-list-202501#Error_Code)

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
- Pagination is supported via `page_size` and `page_token`
- `Category Assets Cipher` must be set before calling this API
