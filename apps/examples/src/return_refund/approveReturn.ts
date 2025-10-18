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

    const response = await sdk.return_refund.approveReturn({
      return_id: '4035633475056536357',
      query: {
        idempotency_key: '40b456b1-78e7-412d-9fe6-82181496e1bd',
      },
      body: {
        decision: 'APPROVE_RETURN',
        buyer_keep_item: true,
        // partial_refund: {
        //     currency: "IDR",
        //     amount: "100000"
        // }
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
}

// npm exec tsx apps/examples/src/return_refund/approveReturn.ts
