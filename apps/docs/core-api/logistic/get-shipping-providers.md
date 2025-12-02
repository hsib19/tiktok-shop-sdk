# Get Shipping Providers

Retrieve the list of shipping providers available for a specific warehouse in TikTok Shop.

Official documentation:  
https://partner.tiktokshop.com/docv2/page/get-shipping-providers-202309

---

## Requirements

- A valid **Access Token**
- A valid **Shop Cipher**
- SDK Method: `logistic.getShippingProviders(warehouse_id)`

---

## Parameters

| Parameter      | Type   | Description                           |
| -------------- | ------ | ------------------------------------- |
| `warehouse_id` | string | The ID of the warehouse. **Required** |

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

  const response = await sdk.logistic.getShippingProviders(
    '6956553057215710977',
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
    "providers": [
      {
        "provider_id": "EXPRESS_123",
        "provider_name": "FastExpress",
        "service_types": ["STANDARD", "ECONOMY"]
      }
    ]
  },
  "message": "Success",
  "request_id": "20240701143000010123456789ABCDEF01"
}
```

---

## Response Descriptions

### Top-Level Fields

| Field        | Type   | Description                                 |
| ------------ | ------ | ------------------------------------------- |
| `code`       | int    | Status code of the operation (0 = success). |
| `message`    | string | Operation message or failure reason.        |
| `request_id` | string | Unique request identifier.                  |
| `data`       | object | Contains list of shipping providers.        |

---

### `data.providers[]` Object

| Field           | Type     | Description                            |
| --------------- | -------- | -------------------------------------- |
| `provider_id`   | string   | Unique ID of the shipping provider.    |
| `provider_name` | string   | Display name of the shipping provider. |
| `service_types` | string[] | Supported delivery service types.      |

---

## Error Handling

All API errors throw a `TikTokAPIError` containing:

- **message**
- **code**
- **request_id**

Full error reference:  
https://partner.tiktokshop.com/docv2/page/get-shipping-providers-202309#Error_Code
