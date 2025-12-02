# Update Activity

Change the title and the beginning and end time of the existing product discount or flash sale promotion activity.

## Requirements

- A valid seller **Access Token**
- A valid **Shop Cipher** (encrypted shop identifier)
- Use `event.updateActivity()` from the SDK

Official documentation: [TikTok Shop – Update Activity](https://partner.tiktokshop.com/docv2/page/create-activity-202309)

## Path Parameter

| Parameter   | Type   | Description                                                           |
| ----------- | ------ | --------------------------------------------------------------------- |
| activity_id | string | Unique ID of the promotion activity to be updated. <br>• **Required** |

## Body Parameters

### Basic Configuration

| Parameter     | Type   | Description                           |
| ------------- | ------ | ------------------------------------- |
| title         | string | Name of the discount event.           |
| duration_type | string | Duration type. Example: `INDEFINITE`  |
| begin_time    | int    | Start time (Unix timestamp).          |
| end_time      | int    | End time (Unix timestamp).            |
| product_level | string | Scope of discount. Example: `PRODUCT` |

---

### Participation Limit

| Parameter           | Type     | Description                    |
| ------------------- | -------- | ------------------------------ |
| participation_limit | []object | Rules for buyer participation. |
| └─ type             | string   | Example: `BUYER_NO_LIMIT`      |

---

### Discount Configuration

#### Shipping Discount

| Parameter       | Type   | Description                                      |
| --------------- | ------ | ------------------------------------------------ |
| threshold_type  | string | Condition type. Example: `MINIMAL_ITEM_QUANTITY` |
| threshold_value | string | Minimum quantity to qualify. Example: `"3"`      |
| type            | string | Discount type. Example: `DISCOUNT_SHIPPING_FEE`  |
| value           | string | Discount value. Example: `"10.5"`                |
| shipping_method | string | Shipping method. Example: `STANDARD_SHIPPING`    |
| inventory_type  | string | Inventory type. Example: `SELF_FULFILLED`        |

##### Area Scope

| Parameter      | Type   | Description                                       |
| -------------- | ------ | ------------------------------------------------- |
| type           | string | Scope type. Example: `WHOLE`                      |
| specific_areas | string | Target areas. Example: `"[Washington, New York]"` |

---

#### BMSM Discount (Buy More Save More)

| Parameter       | Type   | Description                                      |
| --------------- | ------ | ------------------------------------------------ |
| tier            | int    | Tier level. Example: `1`                         |
| threshold_type  | string | Condition type. Example: `MINIMAL_ITEM_QUANTITY` |
| threshold_value | string | Minimum quantity. Example: `"5"`                 |
| type            | string | Discount type. Example: `PERCENTAGE_OFF`         |
| value           | string | Discount percentage. Example: `"10"`             |

---

#### Gift Discount

| Parameter           | Type   | Description                                    |
| ------------------- | ------ | ---------------------------------------------- |
| gift_receiving_type | string | Gift distribution rule. Example: `ALL_RECEIVE` |

##### Gift Infos

| Parameter       | Type   | Description                                      |
| --------------- | ------ | ------------------------------------------------ |
| tier            | int    | Tier level. Example: `1`                         |
| threshold_type  | string | Condition type. Example: `MINIMAL_ITEM_QUANTITY` |
| threshold_value | string | Minimum quantity. Example: `"3"`                 |

###### Gift Details

| Parameter         | Type   | Description                            |
| ----------------- | ------ | -------------------------------------- |
| product_id        | string | ID of the gift product.                |
| sku_id            | string | SKU ID of the gift product.            |
| total_claim_limit | string | Max number of claims. Example: `"100"` |

## Usage Example

This example shows how to retrieve all webhook subscriptions for a shop.

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

  const response = await sdk.promotion.createActivity({
    title: 'DiscountEvent07041',
    activity_type: 'FIXED_PRICE',
    product_level: 'PRODUCT',
    duration_type: 'INDEFINITE',
    begin_time: Math.floor(
      new Date('2025-07-04T00:00:00+07:00').getTime() / 1000,
    ),
    end_time: Math.floor(
      new Date('2025-07-05T00:00:00+07:00').getTime() / 1000,
    ),
    participation_limit: [
      {
        type: 'BUYER_NO_LIMIT',
      },
    ],
    discount: {
      shipping_discount: {
        threshold_type: 'MINIMAL_ITEM_QUANTITY',
        threshold_value: '3',
        type: 'DISCOUNT_SHIPPING_FEE',
        value: '10500',
        shipping_method: 'STANDARD_SHIPPING',
        inventory_type: 'SELF_FULFILLED',
        area_scope: {
          type: 'WHOLE',
          specific_areas: ['DKI Jakarta', 'Jawa Barat'],
        },
      },
      bmsm_discount: {
        details: [
          {
            tier: 1,
            threshold_type: 'MINIMAL_ITEM_QUANTITY',
            threshold_value: '5',
            type: 'PERCENTAGE_OFF',
            value: '10',
          },
        ],
      },
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

This is a real example returned by TikTok Shop:

```json
{
  "code": 0,
  "data": {
    "activity_id": "7136104329798256386",
    "title": "BlackFridayDiscount",
    "update_time": 1661756811
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

### `data` Object

| Field       | Type   | Description                                                 |
| ----------- | ------ | ----------------------------------------------------------- |
| activity_id | string | Unique ID identifying the promotion activity.               |
| create_time | int    | Unix timestamp of when the activity was created.            |
| update_time | int    | Unix timestamp of the last update to the activity.          |
| status      | string | Current status of the promotion activity. Possible values:  |
|             |        | • `DRAFT`: Not available to TikTok users                    |
|             |        | • `NOT_START`: Not available until the scheduled start time |
|             |        | • `ONGOING`: Available to TikTok users                      |
|             |        | • `EXPIRED`: No longer available due to expiration          |
|             |        | • `DEACTIVATED`: Manually deactivated by the seller         |
|             |        | • `NOT_EFFECTIVE`: Terminated by the platform               |

## Error Handling

All API errors throw `TikTokAPIError`, which contains:

- **message**
- **code**
- **request_id**

Full error reference: [TikTok Common Errors](https://partner.tiktokshop.com/docv2/page/create-activity-202309#Error_Code)
