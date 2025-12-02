# Get Shop SKU Performance List

Retrieve SKU-level performance metrics for your TikTok Shop.

Official documentation:  
https://partner.tiktokshop.com/docv2/page/get-shop-sku-performance-list-202406

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher**
- SDK Method: `analytics.getShopSKUPerformanceList()`

---

## Parameters

| Parameter       | Type   | Description                                        |
| --------------- | ------ | -------------------------------------------------- |
| `start_date_ge` | string | Start date (inclusive), format: `YYYY-MM-DD`.      |
| `end_date_lt`   | string | End date (exclusive), format: `YYYY-MM-DD`.        |
| `currency`      | string | Currency code (optional).                          |
| `page_size`     | number | Number of items per page (max 100).                |
| `page_token`    | string | Token for pagination (optional).                   |
| `sort_field`    | string | Field to sort by, e.g., `gmv`.                     |
| `sort_order`    | string | Sorting direction: `ASC` or `DESC`.                |
| `product_id`    | string | Filter by product ID to get SKU-level performance. |

---

## Example Usage (TypeScript)

```ts
import { TikTokShopSDK, TikTokAPIError } from 'tiktok-shop-sdk';

const sdk = new TikTokShopSDK({
  appKey: process.env.TIKTOK_APP_KEY!,
  appSecret: process.env.TIKTOK_APP_SECRET!,
});

export async function main() {
  try {
    // Set Access Token
    sdk.setAccessToken(process.env.TIKTOK_APP_ACCESS_KEY!);
    sdk.setShopCipher(process.env.TIKTOK_SHOP_CIPHER!);

    const response = await sdk.analytics.getShopSKUPerformanceList({
      end_date_lt: '2024-09-08',
      start_date_ge: '2024-09-09',
      // currency: "",
      page_size: 20,
      // page_token: "",
      sort_field: 'gmv',
      sort_order: 'ASC',
      product_id: '2034792492342343',
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
}
```

---

## Response Example

```json
{
  "code": 0,
  "data": {
    "skus": [
      {
        "sku_id": "38294723904723",
        "product_id": "2034792492342343",
        "gmv": "2500000",
        "units_sold": 120,
        "currency": "IDR"
      }
    ],
    "next_page_token": "token12345"
  },
  "message": "Success",
  "request_id": "202407121500112233445566AABBCC"
}
```

---

## Response Descriptions

### Top-Level Fields

| Field        | Type   | Description                       |
| ------------ | ------ | --------------------------------- |
| `code`       | int    | API status code (0 = success).    |
| `message`    | string | API message or error description. |
| `request_id` | string | Unique request identifier.        |
| `data`       | object | Contains SKU performance details. |

---

## `data.skus[]` Object

| Field        | Type   | Description                      |
| ------------ | ------ | -------------------------------- |
| `sku_id`     | string | Unique SKU identifier.           |
| `product_id` | string | Associated product ID.           |
| `gmv`        | string | Gross merchandise value for SKU. |
| `units_sold` | number | Number of units sold.            |
| `currency`   | string | Currency used in metrics.        |

---

## Pagination

| Field             | Type   | Description                              |
| ----------------- | ------ | ---------------------------------------- |
| `next_page_token` | string | Token to fetch next page of SKU results. |

---

## Error Handling

All API errors will throw a `TikTokAPIError` containing:

- **message**
- **code**
- **request_id**

Full error reference:  
https://partner.tiktokshop.com/docv2/page/get-shop-sku-performance-list-202406#Error_Code
