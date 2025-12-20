# Get Affiliate Campaign Creator Fulfillment Status Info

Retrieve detailed fulfillment status information for creators promoting a specific product in an affiliate campaign using the **TikTok Shop SDK**.
This API provides per-creator insights, including commissions, video count, room count, and sample status.

## Requirements

- A valid seller **Access Token**
- **Category Assets Cipher** (seller-authorized)
- Affiliate Partner permission enabled for the app
- SDK method: `affiliatePartner.getAffiliateCampaignCreatorFulfillmentStatusInfo()`

Official API reference:
[https://partner.tiktokshop.com/docv2/page/get-affiliate-campaign-creator-fulfillment-status-info-202508](https://partner.tiktokshop.com/docv2/page/get-affiliate-campaign-creator-fulfillment-status-info-202508)

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
      await sdk.affiliatePartner.getAffiliateCampaignCreatorFulfillmentStatusInfo(
        {
          query: {
            page_size: 20,
            page_token: '49850345345345',
          },
          path: {
            campaign_id: '20394823049234',
            product_id: '29084203942034',
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
    "total_creator_count": 1,
    "promotion_creators": [
      {
        "paid_amount": {
          "currency": "USD",
          "amount": "3.00"
        },
        "room_count": 1,
        "video_count": 1,
        "free_sample_status": "AWAITING_COLLECTION",
        "commission": "100",
        "effective_end_time": "1731020040687",
        "effective_start_time": "1731019880391",
        "creator": {
          "nick_name": "Test_Creator_E",
          "avatar_url": "https://p19-sign.tiktokcdn-us.com/tos-useast5-avt-0068-tx/c614d3b6ba4d93b31fbda5add0802dd7~c5_1080x1080.webp",
          "follower_num": 19,
          "user_name": "us_lxq6213",
          "creator_open_id": "uACafQAAAABmUU2qon4R0vUYvUVS3QC6CICP2m5A2-wd77j8R9G0yg"
        },
        "affiliate_product_id": "123456789"
      }
    ],
    "next_page_token": "tk811a4455s2"
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

## Response Fields

- **code** — API status code (`0` means success)
- **data.total_creator_count** — Total number of creators promoting the product
- **data.promotion_creators** — Array of creator promotion info
  - **paid_amount** — Paid amount object (currency, amount)
  - **room_count / video_count** — Number of rooms and videos created by the creator
  - **free_sample_status** — Status of free sample collection (`AWAITING_COLLECTION`, etc.)
  - **commission** — Commission amount
  - **effective_start_time / effective_end_time** — Effective time of promotion (timestamp)
  - **creator** — Creator details
    - **nick_name / avatar_url / follower_num / user_name / creator_open_id**

  - **affiliate_product_id** — Affiliate product ID

- **data.next_page_token** — Token for next page pagination
- **message** — Result message
- **request_id** — Unique request identifier for debugging

## Error Codes

This API uses standard TikTok Shop error codes.

Full list of error codes:
[https://partner.tiktokshop.com/docv2/page/common-errors](https://partner.tiktokshop.com/docv2/page/common-errors)

Error code reference for this endpoint:
[https://partner.tiktokshop.com/docv2/page/get-affiliate-campaign-creator-fulfillment-status-info-202508#Error_Code](https://partner.tiktokshop.com/docv2/page/get-affiliate-campaign-creator-fulfillment-status-info-202508#Error_Code)

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
- Pagination is supported via `page_size` and `page_token`
- `Category Assets Cipher
