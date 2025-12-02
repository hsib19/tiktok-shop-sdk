# Search Combinable Packages

Retrieve a list of packages that can be combined into a bundle for fulfillment processing.

Official documentation:  
https://partner.tiktokshop.com/docv2/page/search-combinable-packages-202309

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher**
- SDK Method: `fulfillment.searchCombinablePackages()`

---

## Query Parameters

| Parameter    | Type   | Description                                     |
| ------------ | ------ | ----------------------------------------------- |
| `page_size`  | number | Number of items to return in one page. Optional |
| `page_token` | string | Token for next page of data. Optional           |

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

  const response = await sdk.fulfillment.searchCombinablePackages({
    page_size: 10,
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
  "message": "Success",
  "request_id": "20240701143000010123456789ABCDEFFF",
  "data": {
    "packages": [
      {
        "package_id": "PKG123456",
        "order_id": "1162200639229365029",
        "package_status": "READY_TO_COMBINE",
        "weight": {
          "value": "0.5",
          "unit": "KG"
        },
        "dimension": {
          "length": "20",
          "width": "10",
          "height": "5",
          "unit": "CM"
        }
      }
    ],
    "next_page_token": "abcdef123456"
  }
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
| `data`       | object | Contains the package search results.    |

---

### `data.packages[]` Object

| Field            | Type   | Description                    |
| ---------------- | ------ | ------------------------------ |
| `package_id`     | string | Unique package identifier.     |
| `order_id`       | string | The related order ID.          |
| `package_status` | string | Status of the package.         |
| `weight`         | object | Package weight information.    |
| `dimension`      | object | Package dimension information. |

---

### Error Handling

All API errors will throw a `TikTokAPIError` containing:

- **message**
- **code**
- **request_id**

Full error reference:  
https://partner.tiktokshop.com/docv2/page/search-combinable-packages-202309#Error_Code
