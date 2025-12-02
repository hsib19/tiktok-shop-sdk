# Deactivate Activity

Deactivate an existing promotion or discount activity in TikTok Shop.  
Once deactivated, the activity will no longer be valid for buyers.

Official documentation:  
https://partner.tiktokshop.com/docv2/page/deactivate-activity-202309

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher** (encrypted shop identifier)
- SDK Method: `promotion.deactivateActivity()`

---

## Path Parameter

| Parameter     | Type   | Description                                                     |
| ------------- | ------ | --------------------------------------------------------------- |
| `activity_id` | string | Unique ID of the promotion activity to deactivate. **Required** |

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

  const response = await sdk.promotion.deactivateActivity(
    '7523240167205979921', // Activity ID
  );

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
    "activity_id": "7523240167205979921",
    "update_time": 1709270400
  },
  "message": "Success",
  "request_id": "202402291200000101890810281AEC88FF"
}
```

---

## Response Descriptions

### Top-Level Fields

| Field        | Type   | Description                                          |
| ------------ | ------ | ---------------------------------------------------- |
| `code`       | int    | Status code of the operation (0 = success).          |
| `message`    | string | Operation result message or failure reason.          |
| `request_id` | string | Unique ID used for debugging or tracking.            |
| `data`       | object | Detailed information about the deactivated activity. |

---

### `data` Object

| Field         | Type   | Description                                  |
| ------------- | ------ | -------------------------------------------- |
| `activity_id` | string | The ID of the activity that was deactivated. |
| `update_time` | int    | Unix timestamp of the latest update.         |

---

## Error Handling

All API errors throw a `TikTokAPIError` containing:

- **message**
- **code**
- **request_id**

Full error reference:  
https://partner.tiktokshop.com/docv2/page/deactivate-activity-202309#Error_Code
