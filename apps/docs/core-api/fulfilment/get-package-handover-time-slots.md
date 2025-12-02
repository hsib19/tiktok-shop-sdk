# Get Package Handover Time Slots

Retrieve available time slots for handing over a package to the logistics provider.

Official documentation:  
https://partner.tiktokshop.com/docv2/page/get-package-handover-time-slots-202309

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher**
- SDK Method: `fulfillment.getPackageHandoverTimeSlots()`

---

## Path Parameter

| Parameter    | Type   | Description                         |
| ------------ | ------ | ----------------------------------- |
| `package_id` | string | The ID of the package. **Required** |

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

  const response =
    await sdk.fulfillment.getPackageHandoverTimeSlots('5433567853345');

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
    "time_slots": [
      {
        "start_time": "2024-07-02T09:00:00Z",
        "end_time": "2024-07-02T11:00:00Z",
        "cutoff_time": "2024-07-01T23:59:00Z"
      }
    ]
  },
  "message": "Success",
  "request_id": "20240702143000010123456789ABCDEFFF"
}
```

---

## Response Descriptions

### Top-Level Fields

| Field        | Type   | Description                             |
| ------------ | ------ | --------------------------------------- |
| `code`       | int    | API status code (0 = success).          |
| `message`    | string | Operation message or error description. |
| `request_id` | string | Unique request identifier.              |
| `data`       | object | Contains the available time slots.      |

---

### `data.time_slots[]` Object

| Field         | Type   | Description                                  |
| ------------- | ------ | -------------------------------------------- |
| `start_time`  | string | Start of the available time slot (ISO 8601). |
| `end_time`    | string | End of the available time slot (ISO 8601).   |
| `cutoff_time` | string | Latest time to schedule the handover.        |

---

## Error Handling

All API errors will throw a `TikTokAPIError` containing:

- **message**
- **code**
- **request_id**

Full error reference:  
https://partner.tiktokshop.com/docv2/page/get-package-handover-time-slots-202309#Error_Code
