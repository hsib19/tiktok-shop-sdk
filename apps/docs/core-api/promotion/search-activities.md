# Search Activities

Search for promotion or discount activities created in TikTok Shop.  
This API allows you to filter activities by status, type, and other criteria.

Official Documentation:  
https://partner.tiktokshop.com/docv2/page/search-activities-202309

---

## Requirements

- **Valid Access Token**
- **Shop Cipher** (encrypted shop identifier)
- SDK Method: `promotion.searchActivity()`

---

## Query Parameters

| Parameter   | Type   | Description                                                          |
| ----------- | ------ | -------------------------------------------------------------------- |
| `status`    | string | Filter by activity status (e.g., `ACTIVE`, `DEACTIVATED`). Optional. |
| `type`      | string | Filter by activity type. Optional.                                   |
| `page_no`   | number | Page number for pagination. Optional.                                |
| `page_size` | number | Number of items per page. Optional.                                  |

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

  const response = await sdk.promotion.searchActivity({
    status: 'DEACTIVATED',
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
    "activities": [
      {
        "activity_id": "7523240167205979921",
        "status": "DEACTIVATED",
        "update_time": 1709270400
      }
    ],
    "page_no": 1,
    "page_size": 20,
    "total": 1
  },
  "message": "Success",
  "request_id": "202402291200000101890810281AEC88FF"
}
```

---

## Response Descriptions

| Field        | Type   | Description                                      |
| ------------ | ------ | ------------------------------------------------ |
| `code`       | int    | Execution status code (0 = success).             |
| `message`    | string | Execution message or error reason.               |
| `request_id` | string | Unique request ID for debugging.                 |
| `data`       | object | Contains list of activities and pagination info. |

### `data` Object

| Field        | Type   | Description                       |
| ------------ | ------ | --------------------------------- |
| `activities` | array  | List of activity objects.         |
| `page_no`    | number | Current page number.              |
| `page_size`  | number | Items per page.                   |
| `total`      | number | Total number of matching records. |

### `activity` Object

| Field         | Type   | Description                    |
| ------------- | ------ | ------------------------------ |
| `activity_id` | string | Activity ID.                   |
| `status`      | string | Current activity status.       |
| `update_time` | int    | Unix timestamp of last update. |

---

## Error Handling

All API errors throw `TikTokAPIError`, which includes:

- **message**
- **code**
- **request_id**

Full error reference:  
https://partner.tiktokshop.com/docv2/page/search-activities-202309#Error_Code
