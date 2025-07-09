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
        sdk.setShopCipher(process.env.TIKTOK_SHOP_CIPHER!)

        const response = await sdk.product.updateProductInventory(
        {
            product_id: "1009238424",
            body: {
                skus: [
                    {
                        id: "1729592969712207013",
                        inventory: [
                            {
                                warehouse_id: "7068517275539719942",
                                quantity: 999
                            }
                        ]
                    }
                ]
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

// npm exec tsx apps/examples/src/product/updateProductInventory.ts
