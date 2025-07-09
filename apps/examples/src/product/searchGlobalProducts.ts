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

        const response = await sdk.product.searchGlobalProducts({
            body: {
                status: "PUBLISHED",
                seller_skus: [
                    "Color-Red-001"
                ],
                create_time_ge: 1694576429,
                create_time_le: 1694576429,
                update_time_ge: 1694576429,
                update_time_le: 1694576429
            },
            query: {
                page_size:  20
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

// npm exec tsx apps/examples/src/product/searchGlobalProducts.ts
