# Get Transactions by Statement

Retrieve the list of financial transactions associated with a specific
**statement ID**.

Official documentation:\
https://partner.tiktokshop.com/docv2/page/get-transactions-by-statement-202309

---

## Requirements

- A valid **Access Token**
- SDK Method: `finance.getTransactionsByStatement()`

---

## Parameters

---

Name Type Required Description

---

`statement_id` string Yes Unique ID of the
statement.

`query.sort_field` string No Sorting field (e.g.,
`order_create_time`).

`query.sort_order` string No Sorting direction: `ASC`
or `DESC`.

`query.page_token` string No Token for pagination.

`query.page_size` number No Number of records to
retrieve per page.

---

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

  const response = await sdk.finance.getTransactionsByStatement({
    statement_id: 'sfsdfsdfsdgfsdg',
    query: {
      sort_field: 'order_create_time',
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
    "transactions": [
      {
        "transaction_id": "1234567890",
        "order_id": "987654321",
        "amount": 120000,
        "currency": "IDR",
        "type": "ORDER_PAYMENT",
        "create_time": 1687266376
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

`code` int Result status code (0 = success).
`message` string Status or error message.
`request_id` string Unique identifier for the request.
`data` object Contains transaction results.

---

### `data.transactions[]` Object

Field Type Description

---

`transaction_id` string Unique ID of the transaction.
`order_id` string The associated order ID.
`amount` number Transaction amount.
`currency` string Currency used.
`type` string Type of transaction.
`create_time` int Transaction creation timestamp.

---

## Error Handling

All API errors throw a `TikTokAPIError` with:

- **message**
- **code**
- **request_id**
