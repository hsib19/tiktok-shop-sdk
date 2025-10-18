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

        const response = await sdk.promotion.updateActivityProduct({
            products: [
                {
                    id: "7135427619356477189",
                    activity_price_amount: "4.5",
                    discount: "10",
                    quantity_limit: -1,
                    quantity_per_user: -1,
                    skus: [
                        {
                            id: "7125688837187176194",
                            activity_price_amount: "6.5",
                            discount: "10",
                            quantity_limit: -1,
                            quantity_per_user: 10
                        }
                    ]
                }
            ],
            activity_id: "7136104288010372865"
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

// npm exec tsx apps/examples/src/promotion/updateActivityProduct.ts
