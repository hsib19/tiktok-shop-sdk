# Edit Affiliate Partner Campaign

Edit an existing affiliate partner campaign using the **TikTok Shop SDK**.  
This API allows sellers to update campaign details such as name, commission rate, active period, and target sellers.

---

## Requirements

- A valid seller **Access Token**
- **Category Assets Cipher** (seller-authorized)
- Affiliate Partner permission enabled for the app
- SDK method: `affiliatePartner.editAffiliatePartnerCampaign()`

Official API reference:  
https://partner.tiktokshop.com/docv2/page/edit-affiliate-partner-campaign-202405

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
    // Set Access Token
    sdk.setAccessToken(process.env.TIKTOK_APP_ACCESS_KEY!);

    // Set Category Assets Cipher
    sdk.setCategoryAssetsCipher(process.env.TIKTOK_SHOP_CIPHER!);

    const response = await sdk.affiliatePartner.editAffiliatePartnerCampaign({
      path: {
        campaign_id: '3487503534545454',
      },
      body: {
        name: 'my first campaign',
        description: 'campaign for test',

        // Campaign active period (Unix timestamp, seconds)
        campaign_start_time: 1712941200,
        campaign_end_time: 1715878799,

        // Registration period
        registration_start_time: 1712941200,
        registration_end_time: 1713891599,

        // Commission rate (1000 = 10%)
        commission_rate: 1000,

        // Contact information
        contact_info: {
          whatsapp: '+14255550100',
          email: '123456@gmail.com',
          phone: '+14255550100',
          zalo: '+14255550100',
          viber: '+14255550100',
          line: '+14255550100',
        },

        // Target configuration
        target_shop_codes: ['THCBELNL4Y'],
        target_seller_types: ['CROSS_BORDER'],
      },
    });

    console.log('Campaign Updated:', response);
  } catch (error) {
    if (error instanceof TikTokAPIError) {
      console.error('TikTok API Error:', error.message);
      console.error('Status Code:', error.code);
      console.error('Request ID:', error.request_id);
    } else {
      console.error('Unexpected error:', error);
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
  "data": {},
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

---

## Response Fields

- **code** — API status code (`0` means success)
- **data** — Empty object when update succeeds
- **message** — Result message
- **request_id** — Unique request identifier for debugging

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

- All timestamps must use **Unix time (seconds)**
- Only editable fields should be included in the request body
- `commission_rate` uses basis points (e.g. `1000 = 10%`)
- `Category Assets Cipher` must be set before calling this API
