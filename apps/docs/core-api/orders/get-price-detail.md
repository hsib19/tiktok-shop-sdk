# Get Price Detail

Retrieve detailed pricing information for a specific TikTok Shop order.  
This includes item prices, discounts, shipping fees, taxes, and final payable amounts.

Official documentation:  
https://partner.tiktokshop.com/docv2/page/get-price-detail-202407

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher**
- SDK Method: `order.getPriceDetail()`

---

## Body Parameter

| Parameter  | Type   | Description                              |
| ---------- | ------ | ---------------------------------------- |
| `order_id` | string | The unique ID of the order. **Required** |

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

  const response = await sdk.order.getPriceDetail({
    order_id: '580194061699025701',
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
    "order_id": "580194061699025701",
    "currency": "USD",
    "subtotal": "15.00",
    "shipping_fee": "3.00",
    "tax": "1.20",
    "discount": "2.00",
    "total_amount": "17.20"
  },
  "message": "Success",
  "request_id": "202406261512000101890810281ABCD123"
}
```

---

## Response Descriptions

### Top-Level Fields

| Field        | Type   | Description                                 |
| ------------ | ------ | ------------------------------------------- |
| `code`       | int    | Status code of the operation (0 = success). |
| `message`    | string | Result message or failure reason.           |
| `request_id` | string | Unique request identifier.                  |
| `data`       | object | The price details for the order.            |

---

### `data` Object

| Field          | Type   | Description                                 |
| -------------- | ------ | ------------------------------------------- |
| `order_id`     | string | The ID of the order.                        |
| `currency`     | string | Currency type (e.g., USD).                  |
| `subtotal`     | string | Total item price before discounts.          |
| `shipping_fee` | string | Shipping cost.                              |
| `tax`          | string | Tax amount applied to the order.            |
| `discount`     | string | Total discount applied.                     |
| `total_amount` | string | Final payable amount after all adjustments. |

---

## Error Handling

All API errors throw a `TikTokAPIError` that includes:

- **message**
- **code**
- **request_id**

Full error reference:  
https://partner.tiktokshop.com/docv2/page/get-price-detail-202407#Error_Code
