import 'dotenv/config';

import { TikTokShopSDK, TikTokAPIError } from 'tiktok-shop-sdk';

const sdk = new TikTokShopSDK({
    appKey: process.env.TIKTOK_APP_KEY!,
    appSecret: process.env.TIKTOK_APP_SECRET!,
});

async function main() {

    try {

        // Set Access Token
        sdk.setAccessToken(process.env.TIKTOK_APP_ACCESS_KEY!);
        sdk.setShopCipher(process.env.TIKTOK_SHOP_CIPHER!);

        const response = await sdk.finance.getPayments({
            // page_token: '',
            // create_time_ge: 1687266376,
            // create_time_lt: 1687266376,
            page_size: 20,
            sort_field: 'create_time',
            // sort_order: 'ASC',
        })

        console.log(response)

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

// npm exec tsx apps/examples/src/finances/getPayments.ts
