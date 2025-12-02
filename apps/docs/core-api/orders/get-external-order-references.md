# Get External Order References

Retrieve external platform order references (e.g., Shopify order ID) that are linked to a TikTok Shop order.

Official documentation:  
https://partner.tiktokshop.com/docv2/page/get-external-order-references-202406

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher**
- SDK Method: `order.getExternalOrderReferences()`

---

## Path & Query Parameters

### Path Parameter

| Parameter  | Type   | Description                                 |
| ---------- | ------ | ------------------------------------------- |
| `order_id` | string | TikTok Shop order ID to query. **Required** |

### Query Parameters

| Parameter  | Type   | Description                                                     |
| ---------- | ------ | --------------------------------------------------------------- |
| `platform` | string | Filter by platform (e.g., `SHOPIFY`). Optional but recommended. |

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

  const response = await sdk.order.getExternalOrderReferences({
    order_id: '580194061699025701',
    query: {
      platform: 'SHOPIFY',
    },
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
    "external_order_references": [
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
| `data`       | object | Contains the linked external references.    |

---

### `data.external_order_references[]` Object

| Field               | Type   | Description                      |
| ------------------- | ------ | -------------------------------- |
| `order_id`          | string | TikTok Shop order ID.            |
| `external_order_id` | string | External platform order ID.      |
| `platform`          | string | Platform name (e.g., `SHOPIFY`). |

---

## Error Handling

All API errors throw a `TikTokAPIError` containing:

- **message**
- **code**
- **request_id**

Full error reference:  
https://partner.tiktokshop.com/docv2/page/get-external-order-references-202406#Error_Code
