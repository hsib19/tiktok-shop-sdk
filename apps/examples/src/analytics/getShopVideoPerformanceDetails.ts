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

        const response = await sdk.analytics.getShopVideoPerformanceDetails({
           video_id: "03948503945304",
           query: {
               end_date_lt: "2024-09-08",
               start_date_ge: "2024-09-09",
               // currency: "",
               // granularity: "",
               // with_comparison: true
           }
        });

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

// npm exec tsx apps/examples/src/analytics/getShopVideoPerformanceDetails.ts
