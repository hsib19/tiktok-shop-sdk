# Get Withdrawals

Retrieve withdrawal and settlement records for a TikTok Shop seller account.

Official documentation:  
https://partner.tiktokshop.com/docv2/page/get-withdrawals-202309

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher**
- SDK Method: `finance.getWithdrawals()`

---

## Parameters

| Parameter        | Type     | Description                                                  |
| ---------------- | -------- | ------------------------------------------------------------ |
| `timestamp`      | number   | Unix timestamp used as reference for filtering. **Required** |
| `types`          | string[] | Types of records: `WITHDRAW`, `SETTLE`. **Required**         |
| `page_size`      | number   | Number of records per page (max 100).                        |
| `create_time_ge` | number   | (Optional) Start time filter (Unix timestamp).               |
| `create_time_lt` | number   | (Optional) End time filter (Unix timestamp).                 |

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

  const response = await sdk.finance.getWithdrawals({
    timestamp: 1623812664,
    types: ['WITHDRAW', 'SETTLE'],
    page_size: 20,
    // create_time_lt: 1623812664,
    // create_time_ge: 1623812664,
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
    "withdrawals": [
      {
        "withdrawal_id": "1234567890",
        "amount": "150.00",
        "currency": "USD",
        "type": "WITHDRAW",
        "status": "COMPLETED",
        "create_time": 1623812664
      }
    ]
  },
  "message": "Success",
  "request_id": "20240701154000012233445566AABBCC"
}
```

---

## Response Descriptions

### Top-Level Fields

| Field        | Type   | Description                             |
| ------------ | ------ | --------------------------------------- |
| `code`       | int    | API status code (0 = success).          |
| `message`    | string | Operation message or error reason.      |
| `request_id` | string | Unique request identifier.              |
| `data`       | object | Contains withdrawal/settlement records. |

---

### `data.withdrawals[]` Object

| Field           | Type   | Description                        |
| --------------- | ------ | ---------------------------------- |
| `withdrawal_id` | string | Unique withdrawal record ID.       |
| `amount`        | string | Amount withdrawn or settled.       |
| `currency`      | string | Currency code (e.g., USD).         |
| `type`          | string | `WITHDRAW` or `SETTLE`.            |
| `status`        | string | Status of the record.              |
| `create_time`   | number | Unix timestamp of record creation. |

---

## Error Handling

All API errors will throw a `TikTokAPIError` containing:

- **message**
- **code**
- **request_id**

Full error reference:  
https://partner.tiktokshop.com/docv2/page/get-withdrawals-202309#Error_Code
