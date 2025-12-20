# Get Affiliate Campaign Creator Product Content Statistics

Retrieve statistics of a creator's content for a specific product in an affiliate campaign using the **TikTok Shop SDK**.
This API provides detailed metrics on views, likes, comments, orders, and publication dates of the content.

## Requirements

- A valid seller **Access Token**
- **Category Assets Cipher** (seller-authorized)
- Affiliate Partner permission enabled for the app
- SDK method: `affiliatePartner.getAffiliateCampaignCreatorProductContentStatistics()`

Official API reference:
[https://partner.tiktokshop.com/docv2/page/get-affiliate-campaign-creator-product-content-statistics-202508](https://partner.tiktokshop.com/docv2/page/get-affiliate-campaign-creator-product-content-statistics-202508)

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
    await sdk.affiliatePartner.getAffiliateCampaignCreatorProductContentStatistics(
      {
        path: {
          campaign_id: '23904820343',
          creator_temp_id: '23-042-343',
          product_id: '23-0492034343',
        },
        query: {
          affiliate_product_id: '8942934324',
          content_type: '1',
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
    "creator_content_statistics": [
      {
        "content_type": "VIDEO",
        "cover_img_url": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/fa0387fa5a204dcfa44d5be75877a163~tplv-o3syd03w52-origin-webp.webp?from=3478900499",
        "source_url": "https://www.tiktok.com/@cbseveningnews/video/7458098283332767006?q=Victor%20Shaw%20Dies%20In%20Fire%20Rescue%20Attempt&t=1736545359958",
        "view_count": "1",
        "like_count": "1",
        "comment_num": "0",
        "paid_order_num": "0",
        "paid_amount": "0",
        "linked_tiktok_video": "http://xxx.tiktok.com/xxxx",
        "published_date": "2024-11-13",
        "content_end_date": "2024-11-13"
      }
    ]
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

## Response Fields

- **code** — API status code (`0` means success)
- **data.creator_content_statistics** — Array of creator content statistics
  - **content_type** — Content type (e.g., VIDEO)
  - **cover_img_url** — Cover image URL of the content
  - **source_url** — Original source URL of the content
  - **view_count / like_count / comment_num** — Engagement metrics
  - **paid_order_num / paid_amount** — Number of paid orders and amount
  - **linked_tiktok_video** — Linked TikTok video URL
  - **published_date / content_end_date** — Content publication and end dates

- **message** — Result message
- **request_id** — Unique request identifier for debugging

## Error Codes

This API uses standard TikTok Shop error codes.

Full list of error codes:
[https://partner.tiktokshop.com/docv2/page/common-errors](https://partner.tiktokshop.com/docv2/page/common-errors)

Error code reference for this endpoint:
[https://partner.tiktokshop.com/docv2/page/get-affiliate-campaign-creator-product-content-statistics-202508#Error_Code](https://partner.tiktokshop.com/docv2/page/get-affiliate-campaign-creator-product-content-statistics-202508#Error_Code)

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
- `affiliate_product_id` and `content_type` are optional query p
