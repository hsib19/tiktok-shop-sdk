# Get Order Split Attributes

Retrieve split attribute information for one or more TikTok Shop orders.  
This helps determine how an order is divided into packages for fulfillment.

Official documentation:  
https://partner.tiktokshop.com/docv2/page/get-order-split-attributes-202309

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher**
- SDK Method: `fulfillment.getOrderSplitAttributes()`

---

## Body Parameters

| Parameter   | Type     | Description                                                  |
| ----------- | -------- | ------------------------------------------------------------ |
| `order_ids` | string[] | List of order IDs to retrieve split attributes. **Required** |

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

  const response = await sdk.fulfillment.getOrderSplitAttributes({
    order_ids: ['580196086824799013'],
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
    "split_attributes": [
      {
        "order_id": "580196086824799013",
        "split_type": "MULTI_PACKAGE",
        "package_count": 2,
        "rules": [
          {
            "rule_type": "WEIGHT_LIMIT",
            "value": "3kg"
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

| Field        | Type   | Description                             |
| ------------ | ------ | --------------------------------------- |
| `code`       | int    | API status code (0 = success).          |
| `message`    | string | Operation message or error description. |
| `request_id` | string | Unique request identifier.              |
| `data`       | object | Contains split attribute results.       |

---

### `data.split_attributes[]` Object

| Field           | Type     | Description                                  |
| --------------- | -------- | -------------------------------------------- |
| `order_id`      | string   | The order ID.                                |
| `split_type`    | string   | Type of order split (e.g., `MULTI_PACKAGE`). |
| `package_count` | int      | Number of packages the order is split into.  |
| `rules`         | object[] | Rules used for determining split attributes. |

---

### `rules[]` Object

| Field       | Type   | Description                         |
| ----------- | ------ | ----------------------------------- |
| `rule_type` | string | Type of split rule.                 |
| `value`     | string | The value associated with the rule. |

---

## Error Handling

All API errors will throw a `TikTokAPIError` containing:

- **message**
- **code**
- **request_id**

Full error reference:  
https://partner.tiktokshop.com/docv2/page/get-order-split-attributes-202309#Error_Code
