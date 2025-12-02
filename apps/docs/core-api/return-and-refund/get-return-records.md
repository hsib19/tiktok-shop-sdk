# Get Return Records

Retrieve detailed return records for a specific return request in TikTok Shop.

Official documentation:  
https://partner.tiktokshop.com/docv2/page/get-return-records-202309

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher**
- SDK Method: `return_refund.getReturnRecord()`

---

## Parameters

### Query Parameters

This endpoint does **not** require query parameters.

---

### Body Parameters

| Field       | Type   | Description                         |
| ----------- | ------ | ----------------------------------- |
| `return_id` | string | The return request ID. **Required** |

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

  const response = await sdk.return_refund.getReturnRecord({
    return_id: '4035633471902223141',
  });

  console.log(JSON.stringify(response));
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
    "return_id": "4035633471902223141",
    "records": [
      {
        "status": "PENDING",
        "timestamp": 1691234567,
        "description": "Return request submitted by buyer"
      }
    ]
  },
  "message": "Success",
  "request_id": "202407041200112233445566AABBCC"
}
```

---

## Response Descriptions

### Top-Level Fields

| Field        | Type   | Description                     |
| ------------ | ------ | ------------------------------- |
| `code`       | int    | API status code (0 = success).  |
| `message`    | string | Operation message.              |
| `request_id` | string | Unique request identifier.      |
| `data`       | object | Contains return record details. |

---

### `data` Object

| Field       | Type     | Description                  |
| ----------- | -------- | ---------------------------- |
| `return_id` | string   | The return request ID.       |
| `records`   | object[] | List of record history logs. |

---

### `records[]` Object

| Field         | Type   | Description                            |
| ------------- | ------ | -------------------------------------- |
| `status`      | string | Status at the recorded step.           |
| `timestamp`   | int    | Record creation time (Unix timestamp). |
| `description` | string | Description of the event.              |

---

## Error Handling

All API errors will throw a `TikTokAPIError` containing:

- **message**
- **code**
- **request_id**

Full error reference:  
https://partner.tiktokshop.com/docv2/page/get-return-records-202309#Error_Code
