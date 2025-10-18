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

    const response = await sdk.fulfillment.createPackage({
      order_id: '1162200639229365029',
      order_line_item_ids: ['580205195696245541'],
      dimension: {
        length: '1.2',
        width: '0.2',
        height: '0.03',
        unit: 'CM',
      },
      shipping_service_id: '6617675021119438849',
      weight: {
        value: '1.2',
        unit: 'GRAM',
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

// npm exec tsx apps/examples/src/fulfillment/createPackage.ts
