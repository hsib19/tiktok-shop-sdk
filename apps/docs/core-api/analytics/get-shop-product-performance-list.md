# Get Shop Product Performance List

Retrieve product-level performance analytics for your TikTok Shop.

Official documentation:  
https://partner.tiktokshop.com/docv2/page/get-shop-product-performance-list-202405

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher**
- SDK Method: `analytics.getShopProductPerformanceList()`

---

## Parameters

| Parameter       | Type   | Description                                            |
| --------------- | ------ | ------------------------------------------------------ |
| `start_date_ge` | string | Start date (inclusive), format: `YYYY-MM-DD`.          |
| `end_date_lt`   | string | End date (exclusive), format: `YYYY-MM-DD`.            |
| `currency`      | string | Currency code (optional).                              |
| `page_size`     | number | Number of items per page (max 200).                    |
| `page_token`    | string | Pagination token for next page (optional).             |
| `sort_field`    | string | Sorting field, e.g., `gmv`, `orders`, `product_views`. |
| `sort_order`    | string | Sort direction: `ASC` or `DESC`.                       |

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

  const response = await sdk.analytics.getShopProductPerformanceList({
    end_date_lt: '2024-09-08',
    start_date_ge: '2024-09-09',
    // currency: "",
    page_size: 20,
    // page_token: "",
    sort_field: 'gmv',
    sort_order: 'ASC',
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
    "products": [
      {
        "product_id": "1234567890",
        "product_name": "Sample Product",
        "gmv": "1500.75",
        "orders": 120,
        "product_views": 5000,
        "conversion_rate": 0.024
      }
    ],
    "next_page_token": "abcdef123456"
  },
  "message": "Success",
  "request_id": "202407021200000122334455AAFFEE"
}
```

---

## Response Descriptions

### Top-Level Fields

| Field        | Type   | Description                           |
| ------------ | ------ | ------------------------------------- |
| `code`       | int    | API status code (0 = success).        |
| `message`    | string | Operation message or error details.   |
| `request_id` | string | Unique request ID for debugging.      |
| `data`       | object | Contains product performance metrics. |

---

### `data.products[]` Object

| Field             | Type   | Description                              |
| ----------------- | ------ | ---------------------------------------- |
| `product_id`      | string | Unique product identifier.               |
| `product_name`    | string | Name of the product.                     |
| `gmv`             | string | Gross merchandise value for the product. |
| `orders`          | number | Number of orders placed.                 |
| `product_views`   | number | Number of product page views.            |
| `conversion_rate` | number | Conversion percentage for this product.  |

---

### Pagination

| Field             | Type   | Description                          |
| ----------------- | ------ | ------------------------------------ |
| `next_page_token` | string | Token used to request the next page. |

---

## Error Handling

All API errors will throw a `TikTokAPIError` which includes:

- **message**
- **code**
- **request_id**

Official error reference:  
https://partner.tiktokshop.com/docv2/page/get-shop-product-performance-list-202405#Error_Code
