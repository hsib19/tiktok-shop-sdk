# Create Product

Create and list products intended for sale exclusively in **local shops**.

- Products can be created in **AVAILABLE** categories.
- **US sellers** may also create products in **INVITE_ONLY** categories.
- Once created, the product will be sent for **audit review** by TikTok Shop.
- Use the **Product status change webhook** to track the review status.

> **Notes:**
>
> - This API is applicable to **all sellers**.
> - **Global sellers** who have migrated to the **local replication listing method** can use this API. Others should continue using the **Create Global Product API**.
> - Before calling this API, prepare the necessary information based on your region's usage flow.
> - There may be a **daily limit** on the number of products you can list. Prioritize key products to ensure they get published. Refer to **TikTok Shop Academy** for details.
> - The language used in product content must match the **target market's language** (e.g., avoid using Chinese in non-Chinese markets), or the listing may fail or be rejected.

## Requirements

- A valid seller **Access Token**
- A valid **Shop Cipher** (encrypted shop identifier)
- Use `product.createProduct()` from the SDK

**Official documentation:** [TikTok Shop – Create Product](https://partner.tiktokshop.com/docv2/page/create-product-202309)

## Body Parameters

**Official documentation:** [Create Product – Request Body](https://partner.tiktokshop.com/docv2/page/create-product-202309#Request_Body)

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

  const body = {
    description: 'T-Shirt Fnatic Original Limited Edition Red Orange',
    category_id: '601226',
    title: 'T-Shirt Fnatic Original Limited Edition Red Orange',
    package_weight: {
      value: '0.5',
      unit: 'KILOGRAM',
    },
    main_images: [
      {
        uri: 'tos-maliva-i-o3syd03w52-us/4e48873aebfd4be88a8d2db7b2372b05',
      },
    ],
    skus: [
      {
        sales_attributes: [],
        inventory: [
          {
            warehouse_id: '7505773560071456518',
            quantity: 100,
          },
        ],
        seller_sku: 'FNC-02874823',
        price: {
          amount: '190000',
          currency: 'IDR',
        },
        combined_skus: [],
        external_urls: [],
        extra_identifier_codes: [],
        external_list_prices: [],
      },
    ],
    size_chart: {
      image: {
        uri: 'tos-maliva-i-o3syd03w52-us/b73320c9778b4aeb85dda50aeba1f9e6',
      },
    },
  };

  const response = await sdk.product.createProduct(body);

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
    "product_id": "1729592969712207008",
    "skus": [
      {
        "id": "1729592969712207012",
        "seller_sku": "Color-Red-XM001",
        "sales_attributes": [
          {
            "id": "100000",
            "value_id": "1729592969712207123"
          }
        ],
        "external_sku_id": "1729592969712207234",
        "fees": [
          {
            "type": "PFAND",
            "amount": "1.01",
            "additional_attribute": "SINGLE_USE"
          }
        ]
      }
    ],
    "warnings": [
      {
        "message": "The [brand_id]:123 field is incorrect and has been automatically cleared by the system. Reason: [Brand does not exist]. You can edit it later."
      }
    ]
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

## Response Descriptions

**Official documentation:** [Create Product – Response Body](https://partner.tiktokshop.com/docv2/page/create-product-202309#Response)

## Error Handling

All API errors throw **TikTokAPIError**, which provides:

- **message**
- **code**
- **request_id**

Full reference:  
[TikTok Common Errors](https://partner.tiktokshop.com/docv2/page/create-product-202309#Error_Code)
