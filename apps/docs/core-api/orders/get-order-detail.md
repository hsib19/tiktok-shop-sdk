# Get Order Detail

Retrieve detailed information for one or more TikTok Shop orders using their order IDs.

Official documentation:  
https://partner.tiktokshop.com/docv2/page/get-order-detail-202309

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher**
- SDK Method: `order.getOrderDetail()`

---

## Body Parameters

| Parameter | Type     | Description                                   |
| --------- | -------- | --------------------------------------------- |
| `ids`     | string[] | A list of TikTok Shop order IDs. **Required** |

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

  const response = await sdk.order.getOrderDetail({
    ids: ['580194061699025701'],
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
        "order_status": "COMPLETED",
        "buyer": {
          "buyer_id": "1234567890",
          "buyer_nickname": "JohnDoe"
        },
        "line_items": [
          {
            "product_id": "1234567890123",
            "sku_id": "9876543210987",
            "quantity": 1,
            "price": "10.50"
          }
        ]
      }
    ]
  },
  "message": "Success",
  "request_id": "20240701143000010123456789ABCDEFFF"
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
| `data`       | object | Contains the order details.                 |

---

### `data.orders[]` Object

| Field          | Type     | Description                  |
| -------------- | -------- | ---------------------------- |
| `order_id`     | string   | TikTok Shop order ID.        |
| `order_status` | string   | Current status of the order. |
| `buyer`        | object   | Buyer details.               |
| `line_items`   | object[] | Items included in the order. |

---

### `buyer` Object

| Field            | Type   | Description              |
| ---------------- | ------ | ------------------------ |
| `buyer_id`       | string | Unique buyer identifier. |
| `buyer_nickname` | string | Buyer's display name.    |

---

### `line_items[]` Object

| Field        | Type   | Description                |
| ------------ | ------ | -------------------------- |
| `product_id` | string | Product ID.                |
| `sku_id`     | string | SKU ID.                    |
| `quantity`   | int    | Number of items purchased. |
| `price`      | string | Price per item.            |

---

## Error Handling

All API errors throw a `TikTokAPIError` containing:

- **message**
- **code**
- **request_id**

Full error reference:  
https://partner.tiktokshop.com/docv2/page/get-order-detail-202309#Error_Code
