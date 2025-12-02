# Remove Activity Product

Remove specific products or SKUs from an existing TikTok Shop promotion activity.

Official documentation:  
https://partner.tiktokshop.com/docv2/page/remove-activity-product-202309

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher** (encrypted shop identifier)
- SDK Method: `promotion.removeActivityProduct()`

---

## Path Parameter

| Parameter     | Type   | Description                                |
| ------------- | ------ | ------------------------------------------ |
| `activity_id` | string | ID of the promotion activity. **Required** |

---

## Body Parameters

| Parameter     | Type     | Description                                      |
| ------------- | -------- | ------------------------------------------------ |
| `product_ids` | string[] | List of product IDs to remove from the activity. |
| `sku_ids`     | string[] | List of SKU IDs to remove from the activity.     |

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

  const response = await sdk.promotion.removeActivityProduct({
    body: {
      product_ids: ['7493989962827597361'],
      sku_ids: ['7135657830438176513'],
    },
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
    "activity_id": "7136104288010372865",
    "update_time": 1709270400
  },
  "message": "Success",
  "request_id": "202402291200000101890810281AEC88FF"
}
```

---

## Response Descriptions

| Field        | Type   | Description                              |
| ------------ | ------ | ---------------------------------------- |
| `code`       | int    | Execution result code (0 = success).     |
| `message`    | string | Result message or reason for failure.    |
| `request_id` | string | Unique request identifier for debugging. |
| `data`       | object | Contains details about the update.       |

### `data` Object

| Field         | Type   | Description                          |
| ------------- | ------ | ------------------------------------ |
| `activity_id` | string | ID of the updated activity.          |
| `update_time` | int    | Unix timestamp of the latest update. |

---

## Error Handling

All API errors throw `TikTokAPIError`, which exposes:

- **message**
- **code**
- **request_id**

Full error reference:  
https://partner.tiktokshop.com/docv2/page/remove-activity-product-202309#Error_Code
