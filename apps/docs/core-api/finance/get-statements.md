# Get Statements

Retrieve financial statements for a TikTok Shop account.

Official documentation:  
https://partner.tiktokshop.com/docv2/page/get-statements-202309

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher**
- SDK Method: `finance.getStatements()`

---

## Parameters

| Parameter        | Type   | Description                              |
| ---------------- | ------ | ---------------------------------------- |
| `page_size`      | number | Number of items per page. **Required**   |
| `sort_field`     | string | Sorting field (e.g., `statement_time`).  |
| `timestamp`      | number | Unix timestamp for filtering.            |
| `sort_order`     | string | Sort direction (`ASC` or `DESC`).        |
| `payment_status` | string | Filter by payment status (e.g., `PAID`). |

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

  const response = await sdk.finance.getStatements({
    page_size: 20,
    sort_field: 'statement_time',
    timestamp: 1746114000,
    sort_order: 'ASC',
    payment_status: 'PAID',
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
    "statements": [
      {
        "statement_id": "123456789",
        "statement_time": 1746114000,
        "amount": "125.50",
        "currency": "USD",
        "payment_status": "PAID"
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

| Field        | Type   | Description                            |
| ------------ | ------ | -------------------------------------- |
| `code`       | int    | Status code of the operation (0 = OK). |
| `message`    | string | Message or error details.              |
| `request_id` | string | Unique request identifier.             |
| `data`       | object | Contains statements array.             |

---

### `data.statements[]` Object

| Field            | Type   | Description                    |
| ---------------- | ------ | ------------------------------ |
| `statement_id`   | string | Unique statement ID.           |
| `statement_time` | int    | Timestamp of the statement.    |
| `amount`         | string | Amount in the statement.       |
| `currency`       | string | Currency used.                 |
| `payment_status` | string | Payment status (e.g., `PAID`). |

---

## Error Handling

All API errors throw a `TikTokAPIError` containing:

- **message**
- **code**
- **request_id**

Full error reference:  
https://partner.tiktokshop.com/docv2/page/get-statements-202309#Error_Code
