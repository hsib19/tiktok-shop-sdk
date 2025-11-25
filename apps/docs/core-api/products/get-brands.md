# Get Attributes

Retrieve all available brands for your shop, including the built-in brands and any custom brands created using the Create Custom Brands API. Pass the returned brand ID when creating or editing a product to associate the brand with the product.

- To check if a brand is fully authorized for use in a specific product category, specify the **_category ID_**.
- To obtain the full list of brands that your shop can potentially use and their authorization status, omit the **_category ID_**. We recommend that you specify the brand name to narrow down the list of brands returned.

## Key concept

Whether you can select and display a brand depends on the brand's authorization status, the categories authorized for the brand, and whether the brand is classified as T1 (internationally renowned brands that require prior brand authorization).

### Brand selection rules

You can only select the following types of brands during product creation/editing:

- Authorized brands which contain the desired category (`authorized_status=AUTHORIZED` and `brand_status=AVAILABLE`)
- Unauthorized non-T1 brands (`authorized_status=UNAUTHORIZED` and `is_t1_brand=false`)

### Brand display rules

Brands will only appear on the product display page if:

- The brand is authorized (`authorized_status=AUTHORIZED`)
- The brand is available in the desired category (`brand_status=AVAILABLE`)

This means you need to obtain brand authorization for unauthorized non-T1 brands before they can be displayed. Obtain brand authorization or add categories to an authorized brand through **TikTok Shop Seller Center > Qualification Center > Brand qualification**.

### Tokopedia sellers

You can select and display any returned brand on Tokopedia regardless of these rules.

## Requirements

- A valid seller **Access Token**
- A valid **Shop Cipher** (encrypted shop identifier)
- Use `product.getBrands()` from the SDK

**Official documentation:**  
[TikTok Shop – Get Attributes](https://partner.tiktokshop.com/docv2/page/get-brands-202309)

## Query Params

| Parameter        | Type   | Description                                                                                                                                         |
| ---------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| category_id      | string | Specifies a category ID to show the availability of authorized brands in the category. Recommended for accurate brand filtering.                    |
| is_authorized    | bool   | Filters results by brand authorization status. <br>• `1`: Only authorized brands <br>• `0`: All brands                                              |
| brand_name       | string | Filters results to include brand names that begin with the specified value.                                                                         |
| page_size        | int    | Number of results per page. <br>• Required <br>• Valid range: 1–100                                                                                 |
| page_token       | string | Token for retrieving the next page of results. Use the `next_page_token` from a previous response. Not needed for the first page.                   |
| category_version | string | Specifies the category tree version for the given `category_id`. <br>• US: `v2` (7-level tree, required) <br>• Others: `v1` (3-level tree, default) |

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
  sdk.setShopCipher(process.env.TIKTOK_SHOP_CIPHER!);

  const response = await sdk.product.getBrands({
    page_size: 10,
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
    "brands": [
      {
        "id": "7082427311584347905",
        "name": "Teas",
        "authorized_status": "AUTHORIZED",
        "is_t1_brand": true,
        "brand_status": "AVAILABLE"
      }
    ],
    "total_count": 10000,
    "next_page_token": "b2Zmc2V0PTAK"
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

## Response Fields

| Field                | Type   | Description                                                                                                             |
| -------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------- |
| brands               | array  | List of brand objects that match the query conditions.                                                                  |
| └─ id                | string | The brand ID.                                                                                                           |
| └─ name              | string | The brand name.                                                                                                         |
| └─ authorized_status | string | Indicates if the seller has authorization to sell products under this brand. <br>Values: `AUTHORIZED`, `UNAUTHORIZED`   |
| └─ is_t1_brand       | bool   | Indicates if the brand is a T1 brand (internationally renowned). <br>Unauthorized T1 brands cannot be used in creation. |
| └─ brand_status      | string | Availability of the brand in the requested category. <br>Values: `AVAILABLE`, `UNAVAILABLE`                             |
| total_count          | int    | Total number of brands that match the query conditions.                                                                 |
| next_page_token      | string | Token for retrieving the next page of results. Use this in the `page_token` parameter of the next request.              |

## Error Handling

All API errors throw **TikTokAPIError**, which provides:

- **message**
- **code**
- **request_id**

Full reference:  
[TikTok Common Errors](https://partner.tiktokshop.com/docv2/page/get-attributes-202309#Error_Code)
