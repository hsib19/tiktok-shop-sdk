# Add External Order References

Attach or reference an external order ID (e.g., Shopify order ID) to a TikTok Shop order.  
This allows easy synchronization and cross-platform tracking.

Official documentation:  
https://partner.tiktokshop.com/docv2/page/add-external-order-references-202406

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher**
- SDK Method: `order.searchOrderByExternalOrderReference()`

---

## Body Parameters

| Parameter           | Type   | Description                                                   |
| ------------------- | ------ | ------------------------------------------------------------- |
| `platform`          | string | The source platform (e.g., `SHOPIFY`). **Required**           |
| `external_order_id` | string | The external platform's order ID to link/search. **Required** |

---

## Example Usage (TypeScript)

```ts
import { TikTokShopSDK, TikTokAPIError } from 'tiktok-shop-sdk';

const sdk = new TikTokShopSDK({
  appKey: process.env.TIKTOK_APP_KEY!,
  appSecret: process.env.TIKTOK_APP_SECRET!,
});

try {
  // Set Access Token & Shop Cipher
  sdk.setAccessToken(process.env.TIKTOK_APP_ACCESS_KEY!);
  sdk.setShopCipher(process.env.TIKTOK_SHOP_CIPHER!);

  const response = await sdk.order.searchOrderByExternalOrderReference({
    platform: 'SHOPIFY',
    external_order_id: '676461413038785752',
  });

  console.log(response.data);
} catch (error) {
  if (error instanceof TikTokAPIError) {
    console.error('TikTok API Error:', error.message);
    console.error('Status Code:', error.code);
    console.log('Request Id:', error.request_id);
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
    "orders": [
      {
        "order_id": "580194061699025701",
        "external_order_id": "676461413038785752",
        "platform": "SHOPIFY"
      }
    ]
  },
  "message": "Success",
  "request_id": "20240701143000010123456789ABCDEF01"
}
```

---

## Response Descriptions

### Top-Level Fields

| Field        | Type   | Description                                 |
| ------------ | ------ | ------------------------------------------- |
| `code`       | int    | Status code of the operation (0 = success). |
| `message`    | string | Operation message or failure reason.        |
| `request_id` | string | Unique request identifier.                  |
| `data`       | object | The result data containing linked orders.   |

---

### `data.orders[]` Object

| Field               | Type   | Description                                   |
| ------------------- | ------ | --------------------------------------------- |
| `order_id`          | string | TikTok Shop order ID.                         |
| `external_order_id` | string | The linked external order ID.                 |
| `platform`          | string | The external platform name (e.g., `SHOPIFY`). |

---

## Error Handling

All API errors throw a `TikTokAPIError` containing:

- **message**
- **code**
- **request_id**

Full error reference:  
https://partner.tiktokshop.com/docv2/page/add-external-order-references-202406#Error_Code
