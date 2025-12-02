# Get Order List

Retrieve a list of orders from TikTok Shop based on filters such as status, time range, page size, and more.

Official documentation:  
https://partner.tiktokshop.com/docv2/page/get-order-list-202309

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher**
- SDK Method: `order.getOrderList()`

---

## Query Parameters

| Parameter   | Type | Description                          |
| ----------- | ---- | ------------------------------------ |
| `page_size` | int  | Number of orders to return per page. |

---

## Body Parameters

| Parameter      | Type   | Description                                               |
| -------------- | ------ | --------------------------------------------------------- |
| `order_status` | string | Filter orders by status (e.g., `COMPLETED`). **Optional** |

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

  const response = await sdk.order.getOrderList({
    query: {
      page_size: 10,
    },
    body: {
      order_status: 'COMPLETED',
    },
  });

  console.log(response.data?.orders[0].line_items);
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
  "message": "Success",
  "data": {
    "orders": [
      {
        "order_id": "1234567890123456789",
        "order_status": "COMPLETED",
        "line_items": [
          {
            "product_id": "9876543210987654321",
            "sku_id": "9876543210123",
            "quantity": 1
          }
        ]
      }
    ]
  },
  "request_id": "20240301094500123456789ABCDE"
}
```

---

## Response Descriptions

### Top-Level Fields

| Field        | Type   | Description                                 |
| ------------ | ------ | ------------------------------------------- |
| `code`       | int    | Status code of the operation (0 = success). |
| `message`    | string | Operation result message.                   |
| `request_id` | string | Unique ID used for debugging or tracking.   |
| `data`       | object | Contains the list of returned orders.       |

---

### `data` Object

| Field    | Type  | Description                 |
| -------- | ----- | --------------------------- |
| `orders` | array | Array of order information. |

---

### `orders[]` Object

| Field          | Type   | Description                            |
| -------------- | ------ | -------------------------------------- |
| `order_id`     | string | Unique order identifier.               |
| `order_status` | string | Status of the order (e.g., COMPLETED). |
| `line_items`   | array  | List of product items in the order.    |

---

## Error Handling

All API errors throw `TikTokAPIError`, containing:

- **message**
- **code**
- **request_id**

Full error reference:  
https://partner.tiktokshop.com/docv2/page/get-order-list-202309#Error_Code
