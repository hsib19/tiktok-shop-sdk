# Search Cancellations

Search cancellation records in TikTok Shop.

Official documentation:  
https://partner.tiktokshop.com/docv2/page/search-cancellations-202309

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher**
- SDK Method: `return_refund.searchCancellation()`

---

## Parameters

### Main Parameters

| Field       | Type   | Description                                    |
| ----------- | ------ | ---------------------------------------------- |
| `cancel_id` | string | Specific cancellation ID to search (optional). |

---

### Query Parameters

| Field       | Type   | Description                 |
| ----------- | ------ | --------------------------- |
| `page_size` | string | Number of records per page. |

---

### Body Parameters

| Field            | Type     | Description                                        |
| ---------------- | -------- | -------------------------------------------------- |
| `cancel_ids`     | string[] | List of cancellation IDs to filter.                |
| `order_ids`      | string[] | List of order IDs.                                 |
| `buyer_user_ids` | string[] | Filter by buyer user IDs.                          |
| `cancel_types`   | string[] | Types of cancellation, e.g., `CANCEL`.             |
| `cancel_status`  | string[] | Status list, e.g., `CANCELLATION_REQUEST_PENDING`. |
| `create_time_ge` | number   | Filter: creation time >= value.                    |
| `create_time_lt` | number   | Filter: creation time < value.                     |
| `update_time_ge` | number   | Filter: update time >= value.                      |
| `update_time_lt` | number   | Filter: update time < value.                       |
| `locale`         | string   | Response language, e.g., `en-US`.                  |

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

  const response = await sdk.return_refund.searchCancellation({
    query: {
      page_size: '20',
    },
    cancel_id: '9083405345',
    body: {
      cancel_ids: ['577087614418520388'],
      order_ids: ['577087614418520388'],
      buyer_user_ids: ['7494845267308415300'],
      cancel_types: ['CANCEL'],
      cancel_status: ['CANCELLATION_REQUEST_PENDING'],
      create_time_ge: 1690340825,
      create_time_lt: 1690340825,
      update_time_ge: 1690340825,
      update_time_lt: 1690340825,
      locale: 'en-US',
    },
  });

  console.log(JSON.stringify(response));
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
  "message": "Success",
  "request_id": "202407031322001122334455",
  "data": {
    "cancellations": [
      {
        "cancel_id": "577087614418520388",
        "order_id": "577087614418520388",
        "status": "CANCELLATION_REQUEST_PENDING",
        "buyer_user_id": "7494845267308415300"
      }
    ]
  }
}
```

---

## Response Descriptions

### Top-Level Fields

| Field        | Type   | Description                    |
| ------------ | ------ | ------------------------------ |
| `code`       | int    | API status code (0 = success). |
| `message`    | string | Operation message.             |
| `request_id` | string | Unique request identifier.     |
| `data`       | object | Cancellation search result.    |

---

### `data.cancellations[]` Object

| Field           | Type   | Description                  |
| --------------- | ------ | ---------------------------- |
| `cancel_id`     | string | Cancellation request ID.     |
| `order_id`      | string | Associated order ID.         |
| `status`        | string | Current cancellation status. |
| `buyer_user_id` | string | Buyer’s unique user ID.      |

---

## Error Handling

All API errors will throw a `TikTokAPIError` containing:

- **message**
- **code**
- **request_id**

Full error reference:  
https://partner.tiktokshop.com/docv2/page/search-cancellations-202309#Error_Code
