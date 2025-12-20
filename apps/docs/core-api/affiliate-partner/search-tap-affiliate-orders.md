# Search Tap Affiliate Orders

Search Tap affiliate orders using the **TikTok Shop SDK**.
This API allows retrieval of affiliate orders for specific campaigns within a time range.

## Requirements

- A valid seller **Access Token**
- **Category Assets Cipher** (seller-authorized)
- Affiliate Partner permission enabled for the app
- SDK method: `affiliatePartner.searchTapAffiliateOrders()`

Official API reference:
[https://partner.tiktokshop.com/docv2/page/search-tap-affiliate-orders-202411](https://partner.tiktokshop.com/docv2/page/search-tap-affiliate-orders-202411)

## Usage Example

```ts
import { TikTokAPIError, TikTokShopSDK } from 'tiktok-shop-sdk';

const sdk = new TikTokShopSDK({
  appKey: process.env.TIKTOK_APP_KEY!,
  appSecret: process.env.TIKTOK_APP_SECRET!,
});

async function main() {
  try {
    // Set Access Token
    sdk.setAccessToken(process.env.TIKTOK_APP_ACCESS_KEY!);
    // Set Category Assets Cipher
    sdk.setCategoryAssetsCipher(process.env.TIKTOK_SHOP_CIPHER!);

    const response = await sdk.affiliatePartner.searchTapAffiliateOrders({
      query: {
        page_size: 20,
        page_token: '29384204234',
      },
      body: {
        campaign_id: '2094820342394234',
        create_time_ge: 'xxxxxxxxx',
        create_time_lt: 'xxxxxxxxx',
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
}

main();
```

## Response Example

```json
{
  "code": 0,
  "data": {
    "orders": [
      {
        "id": "576962796354307765",
        "create_time": 1685548800,
        "delivery_time": 1685548800,
        "status": "COMPLETED",
        "skus": {
          "id": "1729793769377925388",
          "campaign_id": "7324371012170024705",
          "creator_username": "liuyi_id_creator1jigo",
          "product_name": "Black Hoodie",
          "product_id": "1729435310697057093",
          "price": { "amount": "99", "currency": "USD" },
          "quantity": 1,
          "content_type": "VIDEO",
          "content_id": "7494337156519332665",
          "creator_commission_rate": 3000,
          "tap_commission_rate": 4000,
          "estimated_commission_base": { "amount": "99", "currency": "USD" },
          "estimated_creator_commission": {
            "amount": "100",
            "currency": "USD"
          },
          "estimated_tap_commission": { "amount": "500", "currency": "USD" },
          "actual_commission_base": { "amount": "200", "currency": "USD" },
          "actual_creator_commission": { "amount": "100", "currency": "USD" },
          "actual_tap_commission": { "amount": "99", "currency": "USD" },
          "refunded_quantity": 1,
          "returned_quantity": 1,
          "partner_commission_reward_rate": 1000,
          "estimated_partner_commission_reward_fee": {
            "amount": "90",
            "currency": "USD"
          },
          "actual_partner_commission_reward_fee": {
            "amount": "200",
            "currency": "USD"
          },
          "creator_commission_reward_rate": 2000,
          "estimated_creator_commission_reward_fee": {
            "amount": "300",
            "currency": "USD"
          },
          "actual_creator_commission_reward_fee": {
            "amount": "100",
            "currency": "USD"
          }
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
- **data.orders** — Array of order objects
  - **id** — Order ID
  - **create_time / delivery_time** — UNIX timestamp
  - **status** — Order status (`COMPLETED`, `PENDING`, etc.)
  - **skus** — SKU details object
    - **id / campaign_id / product_id** — IDs
    - **creator_username** — Affiliate creator username
    - **product_name** — Product name
    - **price** — Price object
    - **quantity** — Order quantity
    - **content_type / content_id** — Content type and ID
    - **creator_commission_rate / tap_commission_rate** — Commission rates
    - **estimated*\* / actual*\* ** — Commission amounts
    - **refunded_quantity / returned_quantity** — Refund info
    - **partner_commission_reward_rate / creator_commission_reward_rate** — Reward rates

- **data.next_page_token** — Token for next page pagination
- **data.total_count** — Total number of orders
- **message** — Result message
- **request_id** — Unique request identifier for debugging

## Error Codes

This API uses standard TikTok Shop error codes.

Full list of error codes:
[https://partner.tiktokshop.com/docv2/page/common-errors](https://partner.tiktokshop.com/docv2/page/common-errors)

Error code reference for this endpoint:
[https://partner.tiktokshop.com/docv2/page/search-tap-affiliate-orders-202411#Error_Code](https://partner.tiktokshop.com/docv2/page/search-tap-affiliate-orders-202411#Error_Code)

## Error Handling Example

```ts
if (error instanceof TikTokAPIError) {
  console.error(error.code);
  console.error(error.message);
  console.error(error.request_id);
}
```

## Notes

- `campaign_id` is required in the request body
- Pagination is supported via `page_size` and `page_token`
- `create_time_ge` and `create_time_lt` are req
