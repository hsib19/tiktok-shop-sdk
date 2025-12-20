# Publish Affiliate Partner Campaign

Publish an existing affiliate partner campaign using the **TikTok Shop SDK**.  
This API is used to make a drafted affiliate campaign live and available for affiliates to join.

---

## Requirements

- A valid seller **Access Token**
- **Category Assets Cipher** (seller-authorized)
- Affiliate Partner permission enabled for the app
- SDK method: `affiliatePartner.publishAffiliatePartnerCampaign()`

Official API reference:  
https://partner.tiktokshop.com/docv2/page/publish-affiliate-partner-campaign-202405

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

    const response = await sdk.affiliatePartner.publishAffiliatePartnerCampaign(
      {
        path: {
          campaign_id: '10934583045',
        },
      },
    );

    console.log('Campaign Published:', response);
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
- **data** — Empty object when publish succeeds
- **message** — Result message
- **request_id** — Unique request identifier for debugging

---

## Error Codes

This API uses standard TikTok Shop error codes.

Full list of error codes:  
https://partner.tiktokshop.com/docv2/page/common-errors

Error code reference for this endpoint:  
https://partner.tiktokshop.com/docv2/page/publish-affiliate-partner-campaign-202405#Error_Code

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

- Campaign must be in **draft** or **editable** status before publishing
- `campaign_id` is required in the request path
- `Category Assets Cipher` must be set before calling this API
