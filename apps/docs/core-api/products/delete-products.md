# Delete Products

Use this API to delete products that are **no longer needed** and are **not frozen**.

- Applicable to all sellers.
- For the **Indonesia market**, deletion is only allowed if the product is **not frozen on any listing platform**.
- If a product is frozen on even one platform, it **cannot be deleted**.

> This helps maintain catalog integrity and ensures only eligible products are removed.

## Requirements

- A valid seller **Access Token**
- A valid **Shop Cipher** (encrypted shop identifier)
- Use `product.deleteProducts()` from the SDK

**Official documentation:** [TikTok Shop – Delete Products](https://partner.tiktokshop.com/docv2/page/delete-products-202309)

## Body Parameters

| Property    | Type     | Description                                                         |
| ----------- | -------- | ------------------------------------------------------------------- |
| product_ids | []string | List of product IDs to delete. <br>• **Required** <br>• Max: 20 IDs |

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

  const response = await sdk.product.deleteProducts({
    product_ids: ['1731477962415703193'],
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
    "errors": [
      {
        "code": 12052048,
        "message": "You can't edit other sellers' products",
        "detail": {
          "product_id": "1729382588639839583"
        }
      }
    ]
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

## Response Descriptions

### Top-Level Fields

| Field      | Type   | Description                                                                |
| ---------- | ------ | -------------------------------------------------------------------------- |
| code       | int    | Status code indicating success or failure of the API response.             |
| message    | string | Message describing the result. Includes reasons for failure if applicable. |
| request_id | string | Unique identifier for tracking the request.                                |
| data       | object | Contains specific return information.                                      |

---

### `data.errors` Array

| Field   | Type   | Description                           |
| ------- | ------ | ------------------------------------- |
| code    | int    | Main error code.                      |
| message | string | Main error message.                   |
| detail  | object | Detailed information about the error. |

---

### `data.errors.detail` Object

| Field      | Type   | Description                                      |
| ---------- | ------ | ------------------------------------------------ |
| product_id | string | ID of the product that could not be deactivated. |

## Error Handling

All API errors throw **TikTokAPIError**, which provides:

- **message**
- **code**
- **request_id**

Full reference:  
[TikTok Common Errors](https://partner.tiktokshop.com/docv2/page/delete-products-202309#Error_Code)
