# Create Packages

Create a package for a TikTok Shop order, including weight, dimensions,
and shipping service.

Official documentation:\
https://partner.tiktokshop.com/docv2/page/create-packages-202309

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher**
- SDK Method: `fulfillment.createPackage()`

---

## Body Parameters

---

Parameter Type Description

---

`order_id` string The order ID to create a package for.
**Required**

`order_line_item_ids` string\[\] Line item IDs included in the package.
**Required**

`dimension` object The package's dimensions. **Required**

`shipping_service_id` string ID of the shipping service used.
**Required**

`weight` object The package weight. **Required**

---

---

### Dimension Object

Field Type Description

---

`length` string Length of the package.
`width` string Width of the package.
`height` string Height of the package.
`unit` string Unit of measurement.

---

### Weight Object

Field Type Description

---

`value` string Weight value.
`unit` string Weight unit.

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

  const response = await sdk.fulfillment.createPackage({
    order_id: '1162200639229365029',
    order_line_item_ids: ['580205195696245541'],
    dimension: {
      length: '1.2',
      width: '0.2',
      height: '0.03',
      unit: 'CM',
    },
    shipping_service_id: '6617675021119438849',
    weight: {
      value: '1.2',
      unit: 'GRAM',
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
    "package_id": "PKG1234567890",
    "order_id": "1162200639229365029",
    "status": "CREATED"
  },
  "message": "Success",
  "request_id": "20240701143000010123456789ABCDEFFF"
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
`data` object Contains package creation info.

---

### `data` Object Fields

Field Type Description

---

`package_id` string The newly created package ID.
`order_id` string The associated order ID.
`status` string Package creation status.

---

## Error Handling

All API errors will throw a `TikTokAPIError` containing:

- **message**
- **code**
- **request_id**

Full error reference:\
https://partner.tiktokshop.com/docv2/page/create-packages-202309#Error_Code
