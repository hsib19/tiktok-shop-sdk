# Get Transactions by Order

Retrieve all financial transactions associated with a specific TikTok Shop order.

Official documentation:  
https://partner.tiktokshop.com/docv2/page/get-transactions-by-order-202309

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher**
- SDK Method: `finance.getTransactionsByOrder(order_id)`

---

## Parameters

| Parameter  | Type   | Description                                         |
| ---------- | ------ | --------------------------------------------------- |
| `order_id` | string | The order ID to retrieve transactions. **Required** |

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

  const response =
    await sdk.finance.getTransactionsByOrder('580205195696114469');

  console.log(response);
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
    "transactions": [
      {
        "transaction_id": "998877665544",
        "order_id": "580205195696114469",
        "type": "SETTLE",
        "amount": "125000",
        "currency": "IDR",
        "timestamp": 1687266376,
        "description": "Settlement for order"
      }
    ]
  },
  "message": "Success",
  "request_id": "202407012030000112233445566AABB"
}
```

---

## Response Descriptions

### Top-Level Fields

| Field        | Type   | Description                        |
| ------------ | ------ | ---------------------------------- |
| `code`       | int    | Status code (0 = success).         |
| `message`    | string | Operation message or error reason. |
| `request_id` | string | Unique request identifier.         |
| `data`       | object | Contains the transaction results.  |

---

### `data.transactions[]` Object

| Field            | Type   | Description                           |
| ---------------- | ------ | ------------------------------------- |
| `transaction_id` | string | The unique transaction ID.            |
| `order_id`       | string | The associated order ID.              |
| `type`           | string | Type of transaction (e.g., `SETTLE`). |
| `amount`         | string | Transaction amount.                   |
| `currency`       | string | Currency code.                        |
| `timestamp`      | int    | Unix timestamp of the transaction.    |
| `description`    | string | Additional transaction details.       |

---

## Error Handling

All API errors throw a `TikTokAPIError` containing:

- **message**
- **code**
- **request_id**

Full error reference:  
https://partner.tiktokshop.com/docv2/page/get-transactions-by-order-202309#Error_Code
