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

    const response = await sdk.return_refund.calculateCancellation({
      order_id: '576469648086175911',
      request_type: 'REFUND',
      shipment_type: 'PLATFORM',
      handover_method: 'DROP_OFF',
      reason_name: 'ecom_order_delivered_refund_reason_missing_product_seller',
      order_line_item_ids: ['576469648086306986'],
      skus: [
        {
          sku_id: '1729386416015578024',
          quantity: 1,
        },
      ],
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
}

// npm exec tsx apps/examples/src/return_refund/calculateCancellation.ts
