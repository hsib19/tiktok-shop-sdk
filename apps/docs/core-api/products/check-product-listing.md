# Check Product Listing

Identify any issues with your product properties in advance to ensure your product is ready for listing.

- Every product must meet **TikTok Shop requirements** before it can be listed.
- You can submit all relevant product information to this API to check whether the listing meets those requirements.
- The API will return a list of issues to resolve before listing, helping reduce the risk of failure during product creation.

> **Note:**  
> The language used in the product content must match the target market's language (e.g., **do not use Chinese** for non-Chinese markets), or the listing may fail or be rejected.

## Requirements

- A valid seller **Access Token**
- Use `product.createCustomBrands()` from the SDK

**Official documentation:**  
[TikTok Shop – Check Product Listing](https://https://partner.tiktokshop.com/docv2/page/check-product-listing-202309)

## Usage Example

```ts
import { TikTokShopSDK, TikTokAPIError } from 'tiktok-shop-sdk';

const sdk = new TikTokShopSDK({
  appKey: process.env.TIKTOK_APP_KEY!,
  appSecret: process.env.TIKTOK_APP_SECRET!,
});
try {
  // Set Access Token
  sdk.setAccessToken(process.env.TIKTOK_APP_ACCESS_KEY!);
  sdk.setShopCipher(process.env.TIKTOK_SHOP_CIPHER!);

  const response = await sdk.product.checkProductListing({
    description:
      '<p>Please compare above detailed size with your measurement before purchase.</p><ul>   <li>M-Size</li>  <li>XL-Size</li></ul> <img src="https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/181595ea7d26489284b5667488d708c1~tplv-o3syd03w52-origin-jpeg.jpeg?from=1432613627" />',
    category_id: '600001',
    brand_id: '7082427311584347905',
    main_images: [
      {
        uri: 'tos-maliva-i-o3syd03w52-us/c668cdf70b7f483c94dbe',
      },
    ],
    skus: [
      {
        sales_attributes: [
          {
            id: '100089',
            name: 'Specification',
            value_id: '1729592969712207000',
            value_name: 'XL',
            sku_img: {
              uri: 'tos-maliva-i-o3syd03w52-us/c668cdf70b7f483c94dbe',
            },
            supplementary_sku_images: [
              {
                uri: 'tos-maliva-i-o3syd03w52-us/c668cdf70b7f483c94dbe',
              },
            ],
          },
        ],
        seller_sku: 'Color-Red-XM01',
        price: {
          amount: '1.23',
          currency: 'USD',
        },
        external_sku_id: '1729592969712207012',
        identifier_code: {
          code: '10000000000000',
          type: 'GTIN',
        },
        inventory: [
          {
            warehouse_id: '7068517275539719942',
            quantity: 999,
          },
        ],
        combined_skus: [
          {
            product_id: '1729582718312380123',
            sku_id: '1729582718312380123',
            sku_count: 11,
          },
        ],
        sku_unit_count: '100.00',
        external_urls: [
          'https://example.com/path1',
          'https://example.com/path2',
        ],
        extra_identifier_codes: ['00012345678905', '9780596520687'],
        pre_sale: {
          type: 'PRE_ORDER',
          fulfillment_type: {
            handling_duration_days: 24,
            release_date: 1619611761,
          },
        },
        list_price: {
          amount: '1',
          currency: 'USD',
        },
        external_list_prices: [
          {
            source: 'SHOPIFY_COMPARE_AT_PRICE',
            amount: '1',
            currency: 'USD',
          },
        ],
      },
    ],
    title:
      "Men's Fashion Sports Low Cut Cotton Breathable Ankle Short Boat Invisible Socks",
    is_cod_allowed: false,
    certifications: [
      {
        id: '7182427311584347905',
        images: [
          {
            uri: 'tos-maliva-i-o3syd03w52-us/c668cdf70b7f483c94dbe',
          },
        ],
        files: [
          {
            id: 'v09ea0g40000cj91373c77u3mid3g1s0',
            name: 'SNI.PDF',
            format: 'PDF',
          },
        ],
        expiration_date: 1741234626,
      },
    ],
    package_weight: {
      value: '1.32',
      unit: 'KILOGRAM',
    },
    product_attributes: [
      {
        id: '100392',
        values: [
          {
            id: '1001533',
            name: 'Birthday',
          },
        ],
      },
    ],
    size_chart: {
      image: {
        uri: 'tos-maliva-i-o3syd03w52-us/c668cdf70b7f483c94dbe',
      },
      template: {
        id: '7267563252536723205',
      },
    },
    package_dimensions: {
      length: '10',
      width: '10',
      height: '10',
      unit: 'CENTIMETER',
    },
    external_product_id: '172959296971220002',
    delivery_option_ids: ['1729592969712203232'],
    video: {
      id: 'v09e40f40000cfu0ovhc77ub7fl97k4w',
    },
    primary_combined_product_id: '1729582718312380123',
    manufacturer_ids: ['172959296971220002'],
    responsible_person_ids: ['172959296971220003'],
    listing_platforms: ['TIKTOK_SHOP'],
    shipping_insurance_requirement: 'NOT_SUPPORTED',
    is_pre_owned: false,
    minimum_order_quantity: 4,
  });

  console.log(response);
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
    "check_result": "FAILED",
    "fail_reasons": [
      {
        "code": 12052700,
        "message": "Product title invalid"
      }
    ],
    "warnings": {
      "message": "Your product will not be sent for review. "
    },
    "listing_quality": {
      "current_tier": "POOR",
      "remaining_recommendations": 3
    },
    "diagnoses": [
      {
        "field": "TITLE",
        "diagnosis_results": [
          {
            "code": "TITLE_LESS_THAN_40_CHARACTERS",
            "how_to_solve": "Names must be at least 40 characters long and contain product-identifying information, such as \"hiking boots\" or \"lipstick\".",
            "quality_tier": "POOR"
          }
        ],
        "suggestions": {
          "seo_words": [
            {
              "text": "dress"
            }
          ],
          "smart_texts": [
            {
              "text": "this is a good title"
            }
          ],
          "images": [
            {
              "uri": "tos-maliva-i-o3syd03w52-us/53b55d6e8cdf1f315affa7e70b45707d",
              "url": "https://p16-graph-va.ibyteimg.com/tos-maliva-i-1por3rr4fy-us/v2/53b55d6e8cdf1f315affa7e70b45707d~tplv-1por3rr4fy-image.webp",
              "optimized_uri": "tos-maliva-i-o3syd03w52-us/0266127022264e54ad2f639f5e0fb5e6",
              "optimized_url": "https://p16-graph-va.ibyteimg.com/tos-maliva-i-1por3rr4fy-us/v2/0266127022264e54ad2f639f5e0fb5e6~tplv-1por3rr4fy-image.webp",
              "height": 600,
              "width": 600
            }
          ]
        }
      }
    ]
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

## Error Handling

All API errors throw **TikTokAPIError**, which provides:

- **message**
- **code**
- **request_id**

Full reference:  
[TikTok Common Errors](https://partner.tiktokshop.com/docv2/page/check-product-listing-202309#Error_Code)
