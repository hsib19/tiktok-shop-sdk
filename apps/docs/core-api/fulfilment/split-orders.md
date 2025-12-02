# Split Orders

Split an existing TikTok Shop order into multiple sub‑orders based on splittable line item groups.

Official documentation:  
https://partner.tiktokshop.com/docv2/page/split-orders-202309

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher**
- SDK Method: `fulfillment.splitOrders()`

---

## Path Parameter

| Parameter  | Type   | Description                                        |
| ---------- | ------ | -------------------------------------------------- |
| `order_id` | string | The TikTok Shop order ID to be split. **Required** |

---

## Body Parameters

| Parameter           | Type  | Description                                                                      |
| ------------------- | ----- | -------------------------------------------------------------------------------- |
| `splittable_groups` | array | List of groups specifying which line items should form a sub‑order. **Required** |

### `splittable_groups[]` Object

| Field                 | Type   | Description                                        |
| --------------------- | ------ | -------------------------------------------------- |
| `id`                  | string | Unique identifier for the split group.             |
| `order_line_item_ids` | array  | List of line item IDs included in the split group. |

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

  const response = await sdk.fulfillment.splitOrders({
    order_id: '580196086824799013',
    body: {
      splittable_groups: [
        {
          id: '123',
          order_line_item_ids: ['580196086825061157'],
        },
      ],
    },
  });

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
    "new_order_ids": ["580196086824799014", "580196086824799015"],
    "original_order_id": "580196086824799013"
  },
  "message": "Success",
  "request_id": "20240701143000010123456789ABCDE001"
}
```

---

## Response Descriptions

### Top-Level Fields

| Field        | Type   | Description                              |
| ------------ | ------ | ---------------------------------------- |
| `code`       | int    | Status code (0 = success).               |
| `message`    | string | Result message.                          |
| `request_id` | string | Request identifier for debugging.        |
| `data`       | object | Contains details of the split operation. |

---

### `data` Object

| Field               | Type   | Description                            |
| ------------------- | ------ | -------------------------------------- |
| `new_order_ids`     | array  | IDs of the newly created split orders. |
| `original_order_id` | string | The original order that was split.     |

---

## Error Handling

All API errors throw a `TikTokAPIError` containing:

- **message**
- **code**
- **request_id**

Full error reference:  
https://partner.tiktokshop.com/docv2/page/split-orders-202309#Error_Code
