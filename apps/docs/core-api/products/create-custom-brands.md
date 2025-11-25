# Create Custom Brands

Create custom brands for your own use across all markets.

- Authorization is **not required** when creating a brand.
- You can create the brand first and obtain brand authorization later through the **Qualification Center** in **TikTok Shop Seller Center**.

> **Note:**  
> You can create up to **50 brands per day**, with a total limit of **1,000 brands**.

## Requirements

- A valid seller **Access Token**
- Use `product.createCustomBrands()` from the SDK

**Official documentation:**  
[TikTok Shop – Get Attributes](https://partner.tiktokshop.com/docv2/page/create-custom-brands-202309)

## Body Properties

| Property | Type   | Required | Description                                                                                                                       |
| -------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| name     | string | Yes      | The brand name. <br>• Length: 2–30 characters <br>• No language restrictions, but avoid Chinese <br>• Will not be auto-translated |

## Usage Example

```ts
import { TikTokShopSDK, TikTokAPIError } from 'tiktok-shop-sdk';

const sdk = new TikTokShopSDK({
  appKey: process.env.TIKTOK_APP_KEY!,
  appSecret: process.env.TIKTOK_APP_SECRET!,
});
try {
  // Set Access Token
  sdk.setAccessToken(process.env.TIKTOK_APP_ACCESS_KEY!);

  const response = await sdk.product.createCustomBrands({
    name: 'New Brand 1',
  });
  console.log(response);
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

## Response Example

```json
{
  "code": 0,
  "data": {
    "id": "7082427311584347905"
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

## Field Descriptions

| Field      | Type   | Description                                                                |
| ---------- | ------ | -------------------------------------------------------------------------- |
| code       | int    | Status code indicating success or failure of the API response.             |
| message    | string | Message describing the result. Includes reasons for failure if applicable. |
| request_id | string | Unique identifier for tracking the request.                                |
| data       | object | Contains specific return information.                                      |
| └─ id      | string | Unique brand ID created in TikTok Shop.                                    |

## Error Handling

All API errors throw **TikTokAPIError**, which provides:

- **message**
- **code**
- **request_id**

Full reference:  
[TikTok Common Errors](https://partner.tiktokshop.com/docv2/page/get-attributes-202309#Error_Code)
