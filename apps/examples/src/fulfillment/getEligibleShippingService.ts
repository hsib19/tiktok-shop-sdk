import 'dotenv/config';

import { TikTokShopSDK, TikTokAPIError } from 'tiktok-shop-sdk';

const sdk = new TikTokShopSDK({
  appKey: process.env.TIKTOK_APP_KEY!,
  appSecret: process.env.TIKTOK_APP_SECRET!,
});
export async function main() {
  try {
    // Set Access Token
    sdk.setAccessToken(process.env.TIKTOK_APP_ACCESS_KEY!);
    sdk.setShopCipher(process.env.TIKTOK_SHOP_CIPHER!);

    const response = await sdk.fulfillment.getEligibleShippingService({
      order_id: '1162200639229365029',
      body: {
        order_line_item_ids: ['580205195696245541'],
        weight: {
          value: '0.4',
          unit: 'GRAM',
        },
        dimension: {
          length: '0.3',
          width: '0.2',
          height: 'CM',
          unit: 'INCH',
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
}

// npm exec tsx apps/examples/src/fulfillment/getEligibleShippingService.ts
