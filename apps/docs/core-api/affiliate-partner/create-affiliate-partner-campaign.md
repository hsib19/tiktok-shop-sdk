# Create Affiliate Partner Campaign

Create a new affiliate partner campaign using the **TikTok Shop SDK**.  
This API allows sellers to configure affiliate campaigns with commission rules, registration periods, and target sellers.

---

## Requirements

- A valid seller **Access Token**
- **Category Assets Cipher** (seller-authorized)
- Affiliate Partner permission enabled for the app
- SDK method: `affiliatePartner.createAffiliatePartnerCampaign()`

Official API reference:  
https://partner.tiktokshop.com/docv2/page/create-affiliate-partner-campaign-202405

---

## Usage Example

```ts
import { TikTokAPIError, TikTokShopSDK } from 'tiktok-shop-sdk';

const sdk = new TikTokShopSDK({
  appKey: process.env.TIKTOK_APP_KEY!,
  appSecret: process.env.TIKTOK_APP_SECRET!,
});

async function main() {
  try {
    sdk.setAccessToken(process.env.TIKTOK_APP_ACCESS_KEY!);
    sdk.setCategoryAssetsCipher(process.env.TIKTOK_SHOP_CIPHER!);

    const response = await sdk.affiliatePartner.createAffiliatePartnerCampaign({
      body: {
        name: 'my first campaign',
        description: 'campaign for test',
        campaign_start_time: 1712941200,
        campaign_end_time: 1715878799,
        registration_start_time: 1712941200,
        registration_end_time: 1713891599,
        commission_rate: 1000,
        contact_info: {
          whatsapp: '+14255550100',
          email: '123456@gmail.com',
          phone: '+14255550100',
          zalo: '+14255550100',
          viber: '+14255550100',
          line: '+14255550100',
        },
        target_shop_codes: ['THCBELNL4Y'],
        target_seller_types: ['CROSS_BORDER'],
      },
    });

    console.log('Campaign Created:', response.data);
  } catch (error) {
    if (error instanceof TikTokAPIError) {
      console.error('TikTok API Error:', error.message);
      console.error('Status Code:', error.code);
      console.error('Request ID:', error.request_id);
    } else {
      console.error('Unexpected Error:', error);
    }
  }
}

main();
```

---

## Response Example

```json
{
  "code": 0,
  "data": {
    "campaign_id": "7356411663443183367"
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

---

## Response Fields

- **campaign_id** — Unique identifier of the newly created campaign
- **code** — API status code (`0` means success)
- **message** — Result message
- **request_id** — Request identifier for debugging

---

## Error Codes

Below are common error codes returned by **Create Affiliate Partner Campaign** API  
(see official Error Code section in the reference documentation).

|  Code | Description                                 |
| ----: | ------------------------------------------- |
|     0 | Success                                     |
| 40001 | Invalid request parameters                  |
| 40002 | Missing required parameters                 |
| 40101 | Invalid or expired access token             |
| 40102 | Insufficient permission or scope            |
| 40301 | Seller not authorized for affiliate partner |
| 40302 | Category assets cipher invalid              |
| 40401 | Campaign not found                          |
| 42901 | Rate limit exceeded                         |
| 50001 | Internal server error                       |

> **Note**: Always log `request_id` when handling errors for faster troubleshooting with TikTok support.

---

## Error Handling Example

```ts
if (error instanceof TikTokAPIError) {
  console.error(error.code);
  console.error(error.message);
  console.error(error.request_id);
}
```

---

## Notes

- All timestamps use **Unix time (seconds)**
- `commission_rate` uses basis points (e.g. `1000 = 10%`)
- `Category Assets Cipher` must be set before calling this API
