# Get Affiliate Partner Campaign Product List

Retrieve a list of products in an existing affiliate partner campaign using the **TikTok Shop SDK**.
This API returns campaign products with pagination support.

## Requirements

- A valid seller **Access Token**
- **Category Assets Cipher** (seller-authorized)
- Affiliate Partner permission enabled for the app
- SDK method: `affiliatePartner.getAffiliatePartnerCampaignProductList()`

Official API reference:
[https://partner.tiktokshop.com/docv2/page/get-affiliate-partner-campaign-product-list-202405](https://partner.tiktokshop.com/docv2/page/get-affiliate-partner-campaign-product-list-202405)

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

    const response =
      await sdk.affiliatePartner.getAffiliatePartnerCampaignProductList({
        path: {
          campaign_id: '3498573945345',
        },
        query: {
          page_size: 20,
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
    "products": [
      {
        "id": "1729442777527587334",
        "review_status": "PENDING",
        "name": "test case number 4 test case number 4",
        "main_image_url": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/fa0387fa5a204dcfa44d5be75877a163~tplv-o3syd03w52-origin-webp.webp?from=3478900499",
        "lowest_price": { "currency": "USD", "amount": "1.1" },
        "highest_price": { "currency": "USD", "amount": "12.21" },
        "inventory": 89,
        "shop_name": "my_shop",
        "total_commission_rate": 6600,
        "creator_commission_rate": 1000,
        "partner_commission_rate": 5600,
        "open_collaboration_commission_rate": 1000,
        "is_available": true,
        "product_sales": 10,
        "category": { "id": "12222", "name": "COMPUTER" },
        "sample_quota": 12,
        "sku_information_list": [
          {
            "sku_name": "factory product",
            "sku_id": "1729666531097281876",
            "inventory": { "available_quantity": "80" },
            "base_price": {
              "region_code": "MY",
              "currency": "MYR",
              "list_price": "162.34",
              "sale_price": "162.34",
              "localized_dutiable_price": "141.58"
            },
            "region_prices": [
              {
                "region_code": "MY",
                "currency": "MYR",
                "list_price": "162.34",
                "sale_price": "162.34",
                "localized_dutiable_price": "141.58"
              }
            ],
            "properties": [{ "name": "Spesifikasi", "value_name": "lalai" }]
          }
        ],
        "product_description": "<p>This is an example product description.</p>"
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
- **data.products** — Array of product objects
  - **id** — Product ID
  - **review_status** — Review status (`PENDING`, `APPROVED`, `REJECTED`)
  - **name** — Product name
  - **main_image_url** — Product main image URL
  - **lowest_price / highest_price** — Price range
  - **inventory** — Total inventory
  - **shop_name** — Seller shop name
  - **total_commission_rate** — Total commission rate
  - **creator_commission_rate** — Creator commission rate
  - **partner_commission_rate** — Partner commission rate
  - **open_collaboration_commission_rate** — Open collaboration commission rate
  - **is_available** — Availability status
  - **product_sales** — Number of sales
  - **category** — Product category object
  - **sample_quota** — Sample quota
  - **sku_information_list** — Array of SKU details
  - **product_description** — HTML product description

- **data.next_page_token** — Token for next page pagination
- **data.total_count** — Total number of products
- **message** — Result message
- **request_id** — Unique request identifier for debugging

## Error Codes

This API uses standard TikTok Shop error codes.

Full list of error codes:
[https://partner.tiktokshop.com/docv2/page/common-errors](https://partner.tiktokshop.com/docv2/page/common-errors)

Error code reference for this endpoint:
[https://partner.tiktokshop.com/docv2/page/get-affiliate-partner-campaign-product-list-202405#Error_Code](https://partner.tiktokshop.com/docv2/page/get-affiliate-partner-campaign-product-list-202405#Error_Code)

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
- Pagination is supported via `page_size` and `next_page_token`
- `Category Assets Cipher` must be se
