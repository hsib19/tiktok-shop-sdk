# Get Warehouse Delivery Options

Retrieve available delivery options for a specific warehouse.

Official documentation:  
https://partner.tiktokshop.com/docv2/page/get-warehouse-delivery-options-202309

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher**
- SDK Method: `logistic.getWarehouseDeliveryOptions(warehouse_id)`

---

## Parameters

| Parameter      | Type   | Description                           |
| -------------- | ------ | ------------------------------------- |
| `warehouse_id` | string | The ID of the warehouse. **Required** |

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

  const response = await sdk.logistic.getWarehouseDeliveryOptions(
    '7505773560071456518',
  );

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
    "delivery_options": [
      {
        "delivery_option_id": "123456789",
        "delivery_option_name": "Standard Shipping",
        "carrier": "JNE",
        "estimated_delivery_time": "2-4 days"
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
| `data`       | object | Delivery option details.                    |

---

### `data.delivery_options[]` Object

| Field                     | Type   | Description                             |
| ------------------------- | ------ | --------------------------------------- |
| `delivery_option_id`      | string | Unique ID of the delivery option.       |
| `delivery_option_name`    | string | Name of the delivery option.            |
| `carrier`                 | string | Logistics provider name.                |
| `estimated_delivery_time` | string | Estimated delivery time for the option. |

---

## Error Handling

All API errors throw a `TikTokAPIError` containing:

- **message**
- **code**
- **request_id**

Full error reference:  
https://partner.tiktokshop.com/docv2/page/get-warehouse-delivery-options-202309#Error_Code
