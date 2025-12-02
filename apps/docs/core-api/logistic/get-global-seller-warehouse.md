# Get Global Seller Warehouse

Retrieve the list of global seller warehouses associated with a TikTok
Shop account.

Official documentation:\
https://partner.tiktokshop.com/docv2/page/get-global-seller-warehouse-202309

---

## Requirements

- A valid **Access Token**
- SDK Method: `logistic.getGlobalSellerWarehouse()`

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
  // Set Access Token
  sdk.setAccessToken(process.env.TIKTOK_APP_ACCESS_KEY!);

  const response = await sdk.logistic.getGlobalSellerWarehouse();

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
        "warehouse_id": "99887766",
        "warehouse_name": "Global Seller Warehouse",
        "country": "CN",
        "address": "Guangdong, China"
      }
    ]
  },
  "message": "Success",
  "request_id": "20240701153000012233445566AABBCC"
}
```

---

## Response Descriptions

### Top-Level Fields

Field Type Description

---

`code` int Status code of the operation (0 = success).
`message` string Operation message or failure reason.
`request_id` string Unique request identifier.
`data` object Contains warehouse information.

---

### `data.warehouses[]` Object

Field Type Description

---

`warehouse_id` string The ID of the warehouse.
`warehouse_name` string Display name of the warehouse.
`country` string Country where the warehouse is located.
`address` string Full address of the warehouse.

---

## Error Handling

All API errors throw a `TikTokAPIError` containing:

- **message**
- **code**
- **request_id**

Full error reference:\
https://partner.tiktokshop.com/docv2/page/get-global-seller-warehouse-202309#Error_Code
