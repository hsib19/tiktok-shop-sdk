# Search Returns

Search and filter return requests in TikTok Shop.

Official documentation:  
https://partner.tiktokshop.com/docv2/page/search-returns-202309

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher**
- SDK Method: `return_refund.searchReturn()`

---

## Parameters

### Query Parameters

| Field        | Type   | Description                     |
| ------------ | ------ | ------------------------------- |
| `page_size`  | number | Number of results per page.     |
| `page_token` | string | Token for pagination (optional) |

---

### Body Parameters

| Field          | Type     | Description                                       |
| -------------- | -------- | ------------------------------------------------- |
| `return_types` | string[] | Filter by return types (e.g., RETURN_AND_REFUND). |

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

  const response = await sdk.return_refund.searchReturn({
    query: {
      page_size: 10,
    },
    body: {
      return_types: ['RETURN_AND_REFUND'],
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
  "data": {
    "returns": [
      {
        "return_id": "4035633471902223141",
        "order_id": "580195946180217637",
        "status": "PENDING"
      }
    ],
    "page_token": "next-page-token"
  },
  "message": "Success",
  "request_id": "202407041023009988776655AABBCC"
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
| `data`       | object | Contains return records.       |

---

### `data` Object

| Field        | Type     | Description                          |
| ------------ | -------- | ------------------------------------ |
| `returns`    | object[] | List of return records.              |
| `page_token` | string   | Token for the next page (if exists). |

---

## Error Handling

All API errors will throw a `TikTokAPIError` containing:

- **message**
- **code**
- **request_id**

Full error reference:  
https://partner.tiktokshop.com/docv2/page/search-returns-202309#Error_Code
