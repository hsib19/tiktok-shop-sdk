# Search Package

Search for packages created in TikTok Shop fulfillment, with optional filters such as time range and package status.

Official documentation:  
https://partner.tiktokshop.com/docv2/page/search-package-202309

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher**
- SDK Method: `fulfillment.searchPackage()`

---

## Query Parameters

| Parameter   | Type   | Description                                    |
| ----------- | ------ | ---------------------------------------------- |
| `page_size` | number | Number of records to return per page. Optional |

---

## Body Parameters (Optional)

| Parameter        | Type   | Description                                         |
| ---------------- | ------ | --------------------------------------------------- |
| `create_time_ge` | number | Filter: package created after this UNIX timestamp.  |
| `create_time_lt` | number | Filter: package created before this UNIX timestamp. |
| `update_time_ge` | number | Filter: package updated after this UNIX timestamp.  |
| `update_time_lt` | number | Filter: package updated before this UNIX timestamp. |
| `package_status` | string | Filter by package status (e.g., `PROCESSING`).      |

---

## Example Usage (TypeScript)

```ts
import { TikTokShopSDK, TikTokAPIError } from 'tiktok-shop-sdk';

const sdk = new TikTokShopSDK({
  appKey: process.env.TIKTOK_APP_KEY!,
  appSecret: process.env.TIKTOK_APP_SECRET!,
});

try {
  // Set Access Token & Shop Cipher
  sdk.setAccessToken(process.env.TIKTOK_APP_ACCESS_KEY!);
  sdk.setShopCipher(process.env.TIKTOK_SHOP_CIPHER!);

  const response = await sdk.fulfillment.searchPackage({
    query: {
      page_size: 10,
    },
    // body: {
    //   create_time_ge: 1623812664,
    //   create_time_lt: 1623812664,
    //   update_time_ge: 1623812664,
    //   update_time_lt: 1623812664,
    //   package_status: "PROCESSING"
    // }
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
    "packages": [
      {
        "package_id": "1234567890",
        "order_id": "580205195696245541",
        "status": "PROCESSING",
        "create_time": 1623812664,
        "update_time": 1623815664
      }
    ],
    "page_info": {
      "page_size": 10,
      "total": 1,
      "has_more": false
    }
  },
  "message": "Success",
  "request_id": "20240701143000010123456789ABCDEFA1"
}
```

---

## Response Descriptions

### Top-Level Fields

| Field        | Type   | Description                               |
| ------------ | ------ | ----------------------------------------- |
| `code`       | int    | API status code (0 = success).            |
| `message`    | string | Operation message or error description.   |
| `request_id` | string | Unique request identifier.                |
| `data`       | object | Contains the list of packages and paging. |

---

### `data.packages[]` Object

| Field         | Type   | Description                         |
| ------------- | ------ | ----------------------------------- |
| `package_id`  | string | The package ID.                     |
| `order_id`    | string | Related TikTok Shop order ID.       |
| `status`      | string | Current package status.             |
| `create_time` | number | UNIX timestamp of package creation. |
| `update_time` | number | UNIX timestamp of last update.      |

---

### `data.page_info` Object

| Field       | Type   | Description                            |
| ----------- | ------ | -------------------------------------- |
| `page_size` | number | Number of records returned.            |
| `total`     | number | Total packages matching the query.     |
| `has_more`  | bool   | Indicates if more pages are available. |

---

## Error Handling

All API errors will throw a `TikTokAPIError` containing:

- **message**
- **code**
- **request_id**

Full error reference:  
https://partner.tiktokshop.com/docv2/page/search-package-202309#Error_Code
