# Get Warehouse List

Retrieve the list of warehouses associated with a TikTok Shop account.

Official documentation:  
https://partner.tiktokshop.com/docv2/page/get-warehouse-list-202309

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher**
- SDK Method: `logistic.getWarehouseList()`

---

## Parameters

This endpoint does **not** require query or body parameters.

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

  const response = await sdk.logistic.getWarehouseList();

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
    "warehouses": [
      {
        "warehouse_id": "1234567890",
        "warehouse_name": "Main Warehouse",
        "region": "ID-JK",
        "address": "Jakarta, Indonesia"
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
| `data`       | object | Data containing warehouse information.      |

---

### `data.warehouses[]` Object

| Field            | Type   | Description                                 |
| ---------------- | ------ | ------------------------------------------- |
| `warehouse_id`   | string | The ID of the warehouse.                    |
| `warehouse_name` | string | The display name of the warehouse.          |
| `region`         | string | Region code where the warehouse is located. |
| `address`        | string | Full address of the warehouse.              |

---

## Error Handling

All API errors throw a `TikTokAPIError` containing:

- **message**
- **code**
- **request_id**

Full error reference:  
https://partner.tiktokshop.com/docv2/page/get-warehouse-list-202309#Error_Code
