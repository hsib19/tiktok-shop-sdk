import 'dotenv/config';

import { TikTokShopSDK } from '../../src/sdk/TikTokShopSDK';
import { TikTokAPIError } from '../../src/utils';

const sdk = new TikTokShopSDK({
    appKey: process.env.TIKTOK_APP_KEY!,
    appSecret: process.env.TIKTOK_APP_SECRET!,
});

async function main() {

    try {

        // Set Access Token
        sdk.setAccessToken(process.env.TIKTOK_APP_ACCESS_KEY!);
        sdk.setShopCipher(process.env.TIKTOK_SHOP_CIPHER!)

        const response = await sdk.order.getOrderList({
            query: {
                page_size: 10
            }
        });

        console.log(response.data.orders)

    } catch (error) {
        if (error instanceof TikTokAPIError) {
            console.error("TikTok API Error:", error.message);
            console.error("Status Code:", error.code);
            console.log("Request Id: ", error.request_id)
        } else {
            console.error("Unexpected error:", error);
        }
    }
}

main();

// npx tsx examples/orders/getOrderList.ts
