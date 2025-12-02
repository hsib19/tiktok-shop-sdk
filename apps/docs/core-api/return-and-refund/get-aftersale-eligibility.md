# Get Aftersale Eligibility

Check whether an order is eligible for aftersale (refund/return) operations.

Official documentation:  
https://partner.tiktokshop.com/docv2/page/get-aftersale-eligibility-202309

---

## Requirements

- A valid **Access Token**
- SDK Method: `return_refund.getAftersaleEligibility()`

---

## Parameters

### Query Parameters

| Field                           | Type   | Description                                       |
| ------------------------------- | ------ | ------------------------------------------------- |
| `order_id`                      | string | The ID of the order to check eligibility for.     |
| `query.initiate_aftersale_user` | string | Who initiates the aftersale: `SELLER` or `BUYER`. |

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

  const response = await sdk.return_refund.getAftersaleEligibility({
    order_id: '580196086824799013',
    query: {
      initiate_aftersale_user: 'SELLER',
    },
  });

  console.log(JSON.stringify(response));
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

---

## Response Example

```json
{
  "code": 0,
  "message": "success",
  "request_id": "202407011530000122334455",
  "data": {
    "eligible": true,
    "reason": "",
    "rules": [
      {
        "rule_code": "ALLOW_REFUND_ONLY",
        "description": "Buyer is eligible for refund-only request."
      }
    ]
  }
}
```

---

## Response Descriptions

### Top-Level Fields

| Field        | Type   | Description                         |
| ------------ | ------ | ----------------------------------- |
| `code`       | int    | Response status code (0 = success). |
| `message`    | string | Description of the request result.  |
| `request_id` | string | Unique ID for debugging/tracing.    |
| `data`       | object | Eligibility result object.          |

---

### `data` Object

| Field      | Type    | Description                                  |
| ---------- | ------- | -------------------------------------------- |
| `eligible` | boolean | Whether the order is eligible for aftersale. |
| `reason`   | string  | Reason for ineligibility (if any).           |
| `rules`    | array   | List of rules applied to eligibility.        |

### `data.rules[]` Objects

| Field         | Type   | Description                 |
| ------------- | ------ | --------------------------- |
| `rule_code`   | string | Internal rule identifier.   |
| `description` | string | Human-readable explanation. |

---

## Error Handling

All API errors throw a `TikTokAPIError` containing:

- `message`
- `code`
- `request_id`

Full error reference:  
https://partner.tiktokshop.com/docv2/page/get-aftersale-eligibility-202309#Error_Code
