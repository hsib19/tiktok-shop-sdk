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

    const response = await sdk.return_refund.createReturn({
      body: {
        order_id: '580195946180217637',
        skus: [
          {
            sku_id: '1731560417292551321',
            quantity: 1,
          },
        ],
        order_line_item_ids: ['580196086825061157'],
        return_reason: 'Damaged',
        return_type: 'RETURN_AND_REFUND',
        refund_total: '190000',
        currency: 'IDR',
        shipment_type: 'PLATFORM',
        handover_method: 'DROP_OFF',
      },
      query: {
        idempotency_key: 'ihdkgjfg876435',
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

// npm exec tsx apps/examples/src/return_refund/createReturn.ts
