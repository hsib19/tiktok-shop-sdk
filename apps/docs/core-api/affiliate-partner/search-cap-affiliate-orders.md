# Search CAP Affiliate Orders

Search for CAP (Creator Affiliate Program) affiliate orders using the **TikTok Shop SDK**.
This API allows retrieving detailed order information including product, commission, content, and agency data.

## Requirements

- A valid seller **Access Token**
- **Category Assets Cipher** (seller-authorized)
- Affiliate Partner permission enabled for the app
- SDK method: `affiliatePartner.searchCAPAffiliateOrders()`

Official API reference:
[https://partner.tiktokshop.com/docv2/page/search-cap-affiliate-orders-202504](https://partner.tiktokshop.com/docv2/page/search-cap-affiliate-orders-202504)

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

  const response = await sdk.affiliatePartner.searchCAPAffiliateOrders({
    query: {
      page_size: 20,
      page_token: '49850345345345',
    },
    body: {
      product_id: '20394802394234',
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
    "orders": [
      {
        "id": "576962796354307765",
        "tags": "test-01",
        "create_time": 1685548800,
        "delivery_time": 1685548800,
        "status": "COMPLETED",
        "skus": {
          "id": "1729478689395213981",
          "open_collaboration_id": "7324371012170024705",
          "target_collaboration_id": "7324371012170024705",
          "creator_username": "liuyi_id_creator1jigo",
          "product_name": "Black Hoodie",
          "product_id": "1729435310697057093",
          "price": { "amount": "99", "currency": "USD" },
          "quantity": 1,
          "shop_name": "xuyann aaaaa",
          "content_type": "VIDEO",
          "content_id": "7494337156519332665\n",
          "attribution_type": "Direct",
          "commission_tier_setting": "3.0 OR 5.0",
          "commission_model": "Tiered commission",
          "commission_rate": "3.0",
          "commission_bonus_rate": "3.0",
          "shop_ads_commission_rate": "5.0",
          "estimated_commission_base": { "amount": "99", "currency": "USD" },
          "estimated_commission": { "amount": "99", "currency": "USD" },
          "actual_commission": { "amount": "100", "currency": "USD" },
          "returned_quantity": 1,
          "refunded_quantity": 1
        }
      }
    ],
    "next_page_token": "6AsPQsUMvH3RkchNUPPh22NROHkE0D8pmq/N5M1kHYcZmtRyv9aVrNv65W7Q6tFA+7D1ud64MPNz5OaT",
    "total_count": 100
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

## Response Fields

- **code** — API status code (`0` means success)
- **data.orders** — Array of CAP affiliate orders
  - **id** — Order ID
  - **tags** — Order tags
  - **create_time / delivery_time** — Timestamps
  - **status** — Order status
  - **skus** — SKU details including creator, product, commission, and quantities

- **data.next_page_token** — Token for next page
- **data.total_count** — Total number of orders
- **message** — Result message
- **request_id** — Unique request identifier for debugging

## Error Codes

This API uses standard TikTok Shop error codes.

Full list of error codes:
[https://partner.tiktokshop.com/docv2/page/common-errors](https://partner.tiktokshop.com/docv2/page/common-errors)

Error code reference for this endpoint:
[https://partner.tiktokshop.com/docv2/page/search-cap-affiliate-orders-202504#Error_Code](https://partner.tiktokshop.com/docv2/page/search-cap-affiliate-orders-202504#Error_Code)

## Error Handling Example

```ts
if (error instanceof TikTokAPIError) {
  console.error(error.code);
  console.error(error.message);
  console.error(error.request_id);
}
```

## Notes

- `product_id` can be provided in the body to filter orders
- `page_size` and `page_token` are optional query parameters for pagination
- `Category Assets
