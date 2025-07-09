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

        const response = await sdk.product.publishGlobalProduct({
            global_product_id: "0927402934234",
            body: {
                publish_target: [{
                    region: "MY",
                    responsible_person_ids: [
                        "67726293bf1eb1e92401a"
                    ],
                    manufacturer_ids: [
                        "67726293bf1eb1e92401a"
                    ],
                    skus: [
                        {
                            related_global_sku_id: "1729592969712207400",
                            price: {
                                amount: "10.01",
                                currency: "MYR",
                                sale_price: "100.00"
                            },
                            inventory: {
                                warehouse_id: "7068517275539719942",
                                quantity: 999
                            }
                        }
                    ]
                  }]
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

// npm exec tsx apps/examples/src/product/publishGlobalProduct.ts
