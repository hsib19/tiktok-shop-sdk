# Create Return

Create a return request for an order in TikTok Shop.

Official documentation:  
https://partner.tiktokshop.com/docv2/page/create-return-202309

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher**
- SDK Method: `return_refund.createReturn()`

---

## Parameters

### Query Parameters

| Field             | Type   | Description                               |
| ----------------- | ------ | ----------------------------------------- |
| `idempotency_key` | string | Unique key to prevent duplicate requests. |

---

### Body Parameters

| Field                 | Type     | Description                                  |
| --------------------- | -------- | -------------------------------------------- |
| `order_id`            | string   | The order ID. **Required**                   |
| `skus`                | object[] | List of SKU items to return. **Required**    |
| `order_line_item_ids` | string[] | Associated order line item IDs. **Required** |
| `return_reason`       | string   | Reason for return. **Required**              |
| `return_type`         | string   | Type of return, e.g., `RETURN_AND_REFUND`.   |
| `refund_total`        | string   | Refund amount.                               |
| `currency`            | string   | Currency code (e.g., IDR, USD).              |
| `shipment_type`       | string   | Shipment type for the return.                |
| `handover_method`     | string   | Handover method, e.g., `DROP_OFF`.           |

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

  const response = await sdk.return_refund.createReturn({
    body: {
      order_id: '580195946180217637',
      skus: [
        {
          sku_id: '1731560417292551321',
          quantity: 1,
        },
      ],
      order_line_item_ids: ['580196086825061157'],
      return_reason: 'Damaged',
      return_type: 'RETURN_AND_REFUND',
      refund_total: '190000',
      currency: 'IDR',
      shipment_type: 'PLATFORM',
      handover_method: 'DROP_OFF',
    },
    query: {
      idempotency_key: 'ihdkgjfg876435',
    },
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
    "return_id": "1234567890123456789",
    "status": "PENDING"
  },
  "message": "Success",
  "request_id": "202407031245009988776655AABBCC"
}
```

---

## Response Descriptions

### Top-Level Fields

| Field        | Type   | Description                       |
| ------------ | ------ | --------------------------------- |
| `code`       | int    | API status code (0 = success).    |
| `message`    | string | Operation message.                |
| `request_id` | string | Unique request identifier.        |
| `data`       | object | Contains return creation details. |

---

### `data` Object

| Field       | Type   | Description                      |
| ----------- | ------ | -------------------------------- |
| `return_id` | string | The generated return request ID. |
| `status`    | string | Initial status of the request.   |

---

## Error Handling

All API errors will throw a `TikTokAPIError` containing:

- **message**
- **code**
- **request_id**

Full error reference:  
https://partner.tiktokshop.com/docv2/page/create-return-202309#Error_Code
