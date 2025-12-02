# Cancel Order

Cancel an order in TikTok Shop.

Official documentation:  
https://partner.tiktokshop.com/docv2/page/cancel-order-202309

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher**
- SDK Method: `return_refund.cancelOrder()`

---

## Parameters

### Path / Main Parameters

| Field      | Type   | Description                          |
| ---------- | ------ | ------------------------------------ |
| `order_id` | string | The order ID to cancel. **Required** |

---

### Query Parameters

_No query parameters for this endpoint._

---

### Body Parameters

| Field                 | Type     | Description                                            |
| --------------------- | -------- | ------------------------------------------------------ |
| `order_line_item_ids` | string[] | List of order line item IDs. **Required**              |
| `skus`                | array    | Optional SKU cancellation list (`sku_id`, `quantity`). |
| `cancel_reason`       | string   | Cancellation reason code. **Required**                 |

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

  const response = await sdk.return_refund.cancelOrder({
    order_id: '579489483240146725',
    order_line_item_ids: ['580196086825061157'],
    // skus: [
    //     {
    //         sku_id: "1731560413451420825",
    //         quantity: 1
    //     }
    // ],
    cancel_reason: 'ecom_order_to_ship_canceled_reason_change_payment_method',
  });

  console.log(JSON.stringify(response));
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
    "cancel_status": "CANCELED"
  },
  "message": "Success",
  "request_id": "202407031300998877665544332211"
}
```

---

## Response Descriptions

### Top-Level Fields

| Field        | Type   | Description                    |
| ------------ | ------ | ------------------------------ |
| `code`       | int    | API status code (0 = success). |
| `message`    | string | Operation message.             |
| `request_id` | string | Unique request identifier.     |
| `data`       | object | Contains cancellation result.  |

---

### `data` Object

| Field           | Type    | Description                     |
| --------------- | ------- | ------------------------------- |
| `success`       | boolean | Whether cancellation succeeded. |
| `cancel_status` | string  | Final cancellation status.      |

---

## Error Handling

All API errors will throw a `TikTokAPIError` containing:

- **message**
- **code**
- **request_id**

Full error reference:  
https://partner.tiktokshop.com/docv2/page/cancel-order-202309#Error_Code
