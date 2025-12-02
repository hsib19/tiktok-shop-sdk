# Update Activity Product

Update product details within an existing promotion or discount activity on TikTok Shop.  
This API allows you to modify promotional prices, SKU-level configurations, quantity limits, and more.

Official Documentation:  
https://partner.tiktokshop.com/docv2/page/update-activity-product-202309

---

## Requirements

- **Valid Access Token**
- **Shop Cipher** (encrypted shop identifier)
- SDK Method: `promotion.updateActivityProduct()`

---

## Request Body Parameters

### Root Parameters

| Parameter     | Type   | Description                                                  |
| ------------- | ------ | ------------------------------------------------------------ |
| `activity_id` | string | The activity ID to update. **Required**                      |
| `products`    | array  | List of products to update within the activity. **Required** |

---

### Product Object

| Field                   | Type   | Description                                                                   |
| ----------------------- | ------ | ----------------------------------------------------------------------------- |
| `id`                    | string | Product ID. **Required**                                                      |
| `activity_price_amount` | string | Promotional price for the product. Optional.                                  |
| `discount`              | string | Discount value (percentage). Optional.                                        |
| `quantity_limit`        | int    | Maximum quantity allowed for the promotion (set `-1` for no limit). Optional. |
| `quantity_per_user`     | int    | Limit per user (set `-1` for no limit). Optional.                             |
| `skus`                  | array  | List of SKU-specific configurations. Optional.                                |

---

### SKU Object

| Field                   | Type   | Description                                                          |
| ----------------------- | ------ | -------------------------------------------------------------------- |
| `id`                    | string | SKU ID. **Required**                                                 |
| `activity_price_amount` | string | Promotional price for the SKU. Optional.                             |
| `discount`              | string | Discount value (percentage). Optional.                               |
| `quantity_limit`        | int    | Max quantity allowed for this SKU (use `-1` for no limit). Optional. |
| `quantity_per_user`     | int    | User purchase limit for this SKU. Optional.                          |

---

## Example Usage (TypeScript)

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

  const response = await sdk.promotion.updateActivityProduct({
    products: [
      {
        id: '7135427619356477189',
        activity_price_amount: '4.5',
        discount: '10',
        quantity_limit: -1,
        quantity_per_user: -1,
        skus: [
          {
            id: '7125688837187176194',
            activity_price_amount: '6.5',
            discount: '10',
            quantity_limit: -1,
            quantity_per_user: 10,
          },
        ],
      },
    ],
    activity_id: '7136104288010372865',
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

---

## Response Example

```json
{
  "code": 0,
  "data": {
    "success": true,
    "activity_id": "7136104288010372865",
    "update_time": 1710000000
  },
  "message": "Success",
  "request_id": "20240301120000123981273ABCDEF11"
}
```

---

## Response Description

| Field        | Type   | Description                          |
| ------------ | ------ | ------------------------------------ |
| `code`       | int    | Execution status code (0 = success). |
| `message`    | string | API message or error reason.         |
| `request_id` | string | Unique request ID for debugging.     |
| `data`       | object | Contains update result info.         |

### `data` Object

| Field         | Type    | Description                                  |
| ------------- | ------- | -------------------------------------------- |
| `success`     | boolean | Indicates whether the update was successful. |
| `activity_id` | string  | The activity that was updated.               |
| `update_time` | int     | Unix timestamp of the update.                |

---

## Error Handling

All API errors throw `TikTokAPIError`, containing:

- **message**
- **code**
- **request_id**

Full error reference:  
https://partner.tiktokshop.com/docv2/page/update-activity-product-202309#Error_Code
