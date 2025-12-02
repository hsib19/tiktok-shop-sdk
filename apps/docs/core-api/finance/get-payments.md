# Get Payments

Retrieve payment records for your TikTok Shop account.

Official documentation:  
https://partner.tiktokshop.com/docv2/page/get-payments-202309

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher**
- SDK Method: `finance.getPayments()`

---

## Parameters

| Parameter        | Type   | Description                                   |
| ---------------- | ------ | --------------------------------------------- |
| `page_token`     | string | Token for next page of results (optional).    |
| `page_size`      | number | Number of records per page (max 100).         |
| `create_time_ge` | number | Filter: creation time ≥ timestamp (optional). |
| `create_time_lt` | number | Filter: creation time < timestamp (optional). |
| `sort_field`     | string | Field to sort by, e.g., `create_time`.        |
| `sort_order`     | string | Sort direction: `ASC` or `DESC` (optional).   |

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

  const response = await sdk.finance.getPayments({
    // page_token: '',
    // create_time_ge: 1687266376,
    // create_time_lt: 1687266376,
    page_size: 20,
    sort_field: 'create_time',
    // sort_order: 'ASC',
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
    "payments": [
      {
        "payment_id": "1234567890",
        "amount": "150.75",
        "currency": "USD",
        "create_time": 1722304893,
        "status": "PAID"
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

| Field        | Type   | Description                             |
| ------------ | ------ | --------------------------------------- |
| `code`       | int    | API status code (0 = success).          |
| `message`    | string | Operation message or error description. |
| `request_id` | string | Unique request ID for debugging.        |
| `data`       | object | Contains payment records.               |

---

### `data.payments[]` Object

| Field         | Type   | Description                         |
| ------------- | ------ | ----------------------------------- |
| `payment_id`  | string | Unique payment identifier.          |
| `amount`      | string | Payment amount.                     |
| `currency`    | string | Currency code.                      |
| `create_time` | number | Timestamp when payment was created. |
| `status`      | string | Payment status, e.g., `PAID`.       |

---

### Pagination

| Field             | Type   | Description                      |
| ----------------- | ------ | -------------------------------- |
| `next_page_token` | string | Token used to request next page. |

---

## Error Handling

All API errors will throw a `TikTokAPIError` including:

- **message**
- **code**
- **request_id**

Full error reference:  
https://partner.tiktokshop.com/docv2/page/get-payments-202309#Error_Code
