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

        const response = await sdk.product.updateGlobalInventory({
            body: {
                global_skus: [
                    {
                        id: "1729592969712207013",
                        inventory: [
                            {
                                global_warehouse_id: "7068517275539719942",
                                quantity: 999
                            }
                        ]
                    }
                  ]
            },
            global_product_id: "203948204234"
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

// npm exec tsx apps/examples/src/product/updateGlobalInventory.ts
