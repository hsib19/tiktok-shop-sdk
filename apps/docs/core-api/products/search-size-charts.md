# Search Size Charts

Retrieve size charts that a seller has created.

## Requirements

- A valid seller **Access Token**
- Use `product.searchSizeCharts()` from the SDK

**Official documentation:**  
[TikTok Shop – Search Size Charts](https://partner.tiktokshop.com/docv2/page/search-size-charts-202407)

## Query Parameters

| Parameter  | Type     | Description                                                                                                                     |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| page_size  | int      | Number of results per page. <br>• Required <br>• Valid range: 1–100                                                             |
| page_token | string   | Token to retrieve the next page of results. Use `next_page_token` from the previous response.                                   |
| locales    | []string | BCP-47 locale codes for displaying size charts. <br>• Default: shop's locale <br>• Examples: `en-US`, `id-ID`, `fr-FR`, `zh-CN` |

---

## Body Parameters

| Property | Type     | Description                                                                                                           |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| ids      | []string | Filter size charts by template IDs. <br>• Max: 50 IDs                                                                 |
| keyword  | string   | Filter size charts by template name or keywords. <br>• If both `ids` and `keyword` are provided, `ids` takes priority |

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

  const response = await sdk.product.searchSizeCharts({
    body: {
      keyword: 't-shirt',
      ids: ['7362027385890244398'],
    },
    query: {
      page_size: 10,
    },
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
    "size_chart": [
      {
        "template_id": "7362027385890244398",
        "template_name": "size chart",
        "images": [
          {
            "uri": "tos-maliva-i-o3syd03w52-us/c668cdf70b7f483c94dbe",
            "url": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/6c8519a3663a4d728c4e3c131dc914b4~tplv-o3syd03w52-resize-jpeg:300:300.jpeg?from=522366036",
            "locale": "en-US"
          }
        ]
      }
    ],
    "next_page_token": "b2Zmc2V0PTAK",
    "total_count": 100
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

## Response Descriptions

### Top-Level Fields

| Field      | Type   | Description                                                                |
| ---------- | ------ | -------------------------------------------------------------------------- |
| code       | int    | Status code indicating success or failure of the API response.             |
| message    | string | Message describing the result. Includes reasons for failure if applicable. |
| request_id | string | Unique identifier for tracking the request.                                |
| data       | object | Contains specific return information.                                      |

---

### `data.size_chart` Array

| Field         | Type     | Description                                |
| ------------- | -------- | ------------------------------------------ |
| template_id   | string   | Unique ID of the size chart template.      |
| template_name | string   | Name of the size chart template.           |
| images        | []object | List of images included in the size chart. |

---

### `data.size_chart.images` Array

| Field  | Type   | Description                            |
| ------ | ------ | -------------------------------------- |
| uri    | string | Image identifier used in API requests. |
| url    | string | Direct URL to view the image.          |
| locale | string | Language of the size chart image.      |

---

### Pagination Metadata

| Field           | Type   | Description                                                                |
| --------------- | ------ | -------------------------------------------------------------------------- |
| next_page_token | string | Token to retrieve the next page of results. Use in `page_token` parameter. |
| total_count     | int    | Total number of size charts that match the query conditions.               |

## Error Handling

All API errors throw **TikTokAPIError**, which provides:

- **message**
- **code**
- **request_id**

Full reference:  
[TikTok Common Errors](https://partner.tiktokshop.com/docv2/page/search-size-charts-202407#Error_Code)
