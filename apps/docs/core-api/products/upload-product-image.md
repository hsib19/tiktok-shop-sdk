# Upload Product Image

Upload local images to TikTok Shop for use as:

- Product images
- Variant images
- Size charts
- Certification images
- And other product-related visuals

> **Note:**
>
> - All images must be uploaded through this API. External image URLs are **not supported**.
> - You must **store the response body** to retrieve the image ID or URL, which is required when associating the image with a product during creation or editing.

## Requirements

- A valid seller **Access Token**
- Use `product.createCustomBrands()` from the SDK

**Official documentation:**  
[TikTok Shop – Upload Product Image](https://partner.tiktokshop.com/docv2/page/upload-product-image-202309)

## Body Parameters

| Property | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| data     | file   | The local image file to be uploaded. <br>**Required** <br><br>**Notes:** <br>• Formats: JPG, JPEG, PNG, WEBP, HEIC, BMP <br>• Max size: 10MB <br>• Dimensions: 100×100 px to 20000×20000 px <br>• For `MAIN_IMAGE`: 300×300 px to 4000×4000 px <br>• For `SIZE_CHART_IMAGE`: minimum 1024 px on the shorter side                                                                                                                                                   |
| use_case | string | The usage scenario of the image. <br><br>**Possible values:** <br>• `MAIN_IMAGE` – product gallery image <br>• `ATTRIBUTE_IMAGE` – variant image <br>• `DESCRIPTION_IMAGE` – used in product description <br>• `CERTIFICATION_IMAGE` – for restricted product documentation <br>• `SIZE_CHART_IMAGE` – displays product measurements <br><br>**Note:** Images for `MAIN_IMAGE` and `ATTRIBUTE_IMAGE` outside 3:4 to 4:3 aspect ratio will be auto-converted to 1:1 |

## Usage Example

```ts
import { TikTokShopSDK, TikTokAPIError } from 'tiktok-shop-sdk';

import path from 'path';
import fs from 'fs';

const sdk = new TikTokShopSDK({
  appKey: process.env.TIKTOK_APP_KEY!,
  appSecret: process.env.TIKTOK_APP_SECRET!,
});
try {
  // Set Access Token
  sdk.setAccessToken(process.env.TIKTOK_APP_ACCESS_KEY!);

  const filePath = path.join(process.cwd(), 'images/fnatic.png');
  const fileBuffer = fs.readFileSync(filePath);

  const response = await sdk.product.uploadProductImage({
    data: fileBuffer,
    use_case: 'SIZE_CHART_IMAGE',
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
    "uri": "tos-maliva-i-o3syd03w52-us/c668cdf70b7f483c94dbe",
    "url": "https://p-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/c668cdf70b7f483c94dbe\n",
    "height": 720,
    "width": 720,
    "use_case": "MAIN_IMAGE"
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

## Response Descriptions

| Field       | Type   | Description                                                                                                                                                  |
| ----------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| code        | int    | Status code indicating success or failure of the API response.                                                                                               |
| message     | string | Message describing the result. Includes reasons for failure if applicable.                                                                                   |
| request_id  | string | Unique identifier for tracking the request.                                                                                                                  |
| data        | object | Contains specific return information.                                                                                                                        |
| └─ uri      | string | Unique image identifier used in API requests. Required when linking image to a product.                                                                      |
| └─ url      | string | Direct URL to view the image. Can be embedded in product descriptions using `<img>` tag.                                                                     |
| └─ height   | int    | Height of the image after aspect ratio adjustment.                                                                                                           |
| └─ width    | int    | Width of the image after aspect ratio adjustment.                                                                                                            |
| └─ use_case | string | Usage scenario specified during upload. <br>Possible values: `MAIN_IMAGE`, `ATTRIBUTE_IMAGE`, `DESCRIPTION_IMAGE`, `CERTIFICATION_IMAGE`, `SIZE_CHART_IMAGE` |

## Error Handling

All API errors throw **TikTokAPIError**, which provides:

- **message**
- **code**
- **request_id**

Full reference:  
[TikTok Common Errors](https://partner.tiktokshop.com/docv2/page/upload-product-image-202309#Error_Code)
