# Get Attributes

Retrieve the standard built-in product and sales attributes for listing a product in a particular category based on your shop's location.
Products on TikTok Shop are grouped into categories predefined by TikTok Shop, and each category is associated with a standard set of product attributes and sales attributes.

- **_Sales attributes_** (e.g. size, color, length) define product variants and are optional if your product is straightforward and has no variants.
- **_Product attributes_** (e.g. manufacturer, country of origin, materials used) describe the product as a whole, regardless of variant. Some product attributes are mandatory based on listing policies.

Use this API to determine the mandatory and optional attributes before listing a product.

**_Note_**: It must be a [leaf category]("https://partner.tiktokshop.com/docv2/page/6509c89d0fcef602bf1acd9b") that corresponds to the category tree type specified in the `category_version` property.

## Requirements

- A valid seller **Access Token**
- A valid **Shop Cipher** (encrypted shop identifier)
- Use `product.getAttributes()` from the SDK

**Official documentation:**  
[TikTok Shop – Get Attributes](https://partner.tiktokshop.com/docv2/page/get-attributes-202309)

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

  const response = await sdk.product.getAttributes({
    category_id: '601226',
    query: {
      category_version: 'v1',
      locale: 'en-US',
    },
  });
  console.log(response.data?.attributes[0]);
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
    "attributes": [
      {
        "id": "100392",
        "name": "Occasion",
        "type": "PRODUCT_PROPERTY",
        "is_requried": false,
        "values": [
          {
            "id": "1001533",
            "name": "Birthday",
            "icon_url": "https://p16-oec-sg.ibyteimg.com/tos-alisg-i-aphluv4xwc-sg/37a9d5d39c27480d9870f73a2ad7cc95~tplv-aphluv4xwc-origin-jpeg.jpeg?dr=11254&from=3455097676&height=956&idc=no1a&ps=933b5bde&shcp=9b759fb9&shp=cdf09b4c&t=555f072d&width=1000"
          }
        ],
        "value_data_format": "POSITIVE_INT_OR_DECIMAL",
        "is_customizable": true,
        "requirement_conditions": [
          {
            "condition_type": "VALUE_ID_MATCH",
            "attribute_id": "101610",
            "attribute_value_id": "1024358"
          }
        ],
        "is_multiple_selection": true
      }
    ]
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

## Response Fields

### Attributes

| Field                    | Type    | Description                               |
| ------------------------ | ------- | ----------------------------------------- |
| `id`                     | string  | Attribute ID                              |
| `name`                   | string  | Attribute name                            |
| `type`                   | string  | Attribute type (e.g., `PRODUCT_PROPERTY`) |
| `is_requried`            | boolean | Whether the attribute is mandatory        |
| `values`                 | array   | List of selectable values                 |
| `value_data_format`      | string  | Expected data format for the value        |
| `is_customizable`        | boolean | Whether seller can input custom value     |
| `requirement_conditions` | array   | Attribute conditions that must be met     |
| `is_multiple_selection`  | boolean | Whether multiple selections are allowed   |

### values[]

| Field      | Type   | Description                                   |
| ---------- | ------ | --------------------------------------------- |
| `id`       | string | Value ID                                      |
| `name`     | string | Value name                                    |
| `icon_url` | string | Icon or image representing the value (if any) |

### requirement_conditions[]

| Field                | Type   | Description                                      |
| -------------------- | ------ | ------------------------------------------------ |
| `condition_type`     | string | Rule type for condition (e.g., `VALUE_ID_MATCH`) |
| `attribute_id`       | string | Related attribute ID                             |
| `attribute_value_id` | string | Related attribute value ID                       |

## Error Handling

All API errors throw **TikTokAPIError**, which provides:

- **message**
- **code**
- **request_id**

Full reference:  
[TikTok Common Errors](https://partner.tiktokshop.com/docv2/page/get-attributes-202309#Error_Code)
