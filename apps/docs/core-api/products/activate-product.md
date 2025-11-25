# Activate Product

Use this API to activate products that are currently in:

- `Seller_deactivated` status
- `Platform_deactivated` status

Once the activation request is submitted:

- The product status will change to **Pending** and be sent to **TikTok Shop for audit**.
- If the product **passes the audit**, its status will change to **Activate**.
- Use the [**Product status change webhook**](https://partner.tiktokshop.com/docv2/page/650956aff1fd3102b90b6261) to monitor the audit progress and final status.

## Requirements

- A valid seller **Access Token**
- A valid **Shop Cipher** (encrypted shop identifier)
- Use `product.activateProducts()` from the SDK

**Official documentation:** [TikTok Shop – Activate Product](https://partner.tiktokshop.com/docv2/page/activate-product-202309)

## Body Parameters

| Property          | Type     | Description                                                                                                                                                                               |
| ----------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| product_ids       | []string | List of product IDs to activate. <br>• **Required** <br>• Max: 20 IDs                                                                                                                     |
| listing_platforms | []string | Platforms where the product will be activated. <br>• Possible values: `TOKOPEDIA`, `TIKTOK_SHOP` <br>• Default: `TIKTOK_SHOP` <br><br>Applicable only for sellers migrated from Tokopedia |

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

  const response = await sdk.product.activateProducts({
    product_ids: ['1731477962415703193'],
    listing_platforms: ['TIKTOK_SHOP', 'TOKOPEDIA'],
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
        "code": 12052990,
        "message": "Check failed",
        "detail": {
          "product_id": "1729382588639839583",
          "extra_errors": [
            {
              "code": 12052048,
              "message": "You can't edit other sellers' products"
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

| Field        | Type     | Description                                              |
| ------------ | -------- | -------------------------------------------------------- |
| product_id   | string   | ID of the product that could not be activated.           |
| extra_errors | []object | List of additional nested errors related to the product. |

---

### `data.errors.detail.extra_errors` Array

| Field   | Type   | Description              |
| ------- | ------ | ------------------------ |
| code    | int    | Secondary error code.    |
| message | string | Secondary error message. |

## Error Handling

All API errors throw **TikTokAPIError**, which provides:

- **message**
- **code**
- **request_id**

Full reference:  
[TikTok Common Errors](https://partner.tiktokshop.com/docv2/page/activate-product-202309#Error_Code)
