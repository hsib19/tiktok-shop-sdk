# Combine Package

Merge multiple TikTok Shop packages into a single package for
streamlined fulfillment.

Official documentation:\
https://partner.tiktokshop.com/docv2/page/combine-package-202309

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher**
- SDK Method: `fulfillment.combinePackage()` (Note: some SDKs may name
  it `combinablePackage`)

---

## Body Parameters

---

Parameter Type Description

---

`combinable_packages` object\[\] List of package groups to be combined.
**Required**

---

---

### `combinable_packages[]` Object

---

Field Type Description

---

`id` string The package ID.

`order_ids` string\[\] Order IDs associated with the package.

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
  // Set Access Token & Shop Cipher
  sdk.setAccessToken(process.env.TIKTOK_APP_ACCESS_KEY!);
  sdk.setShopCipher(process.env.TIKTOK_SHOP_CIPHER!);

  const response = await sdk.fulfillment.combinablePackage({
    combinable_packages: [
      {
        id: '1162200639229365029',
        order_ids: ['580205195696114469', '580195946180217637'],
      },
    ],
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
    "combined_package_id": "123456789012345678"
  }
}
```

---

## Response Descriptions

### Top-Level Fields

Field Type Description

---

`code` int API status code (0 = success).
`message` string Operation message or error description.
`request_id` string Unique request identifier.
`data` object Contains details of the combined package.

---

### `data` Object

---

Field Type Description

---

`combined_package_id` string ID of the newly created combined package.

---

---

## Error Handling

All API errors will throw a `TikTokAPIError` containing:

- **message**
- **code**
- **request_id**

Full error reference:\
https://partner.tiktokshop.com/docv2/page/combine-package-202309#Error_Code
