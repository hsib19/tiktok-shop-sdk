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

        const response = await sdk.promotion.updateActivity({
            activity_id: "7523240167205979921",
            title: "SpecialRamadhanPromo",
            activity_type: "FIXED_PRICE",
            product_level: "PRODUCT",
            duration_type: "INDEFINITE",
            begin_time: 1752166800, 
            end_time: Math.floor(new Date("2025-07-28T00:00:00+07:00").getTime() / 1000),
            participation_limit: [
                {
                    type: "BUYER_LIMIT_ONLY_ONE"
                }
            ],
            discount: {
                shipping_discount: {
                    threshold_type: "MINIMAL_ITEM_QUANTITY",
                    threshold_value: "2",
                    type: "DISCOUNT_SHIPPING_FEE",
                    value: "15000", 
                    shipping_method: "STANDARD_SHIPPING",
                    inventory_type: "SELF_FULFILLED",
                    area_scope: {
                        type: "WHOLE",
                        specific_areas: ["Jawa Tengah", "Bali"]
                    }
                },
                bmsm_discount: {
                    details: [
                        {
                            tier: 1,
                            threshold_type: "MINIMAL_ITEM_QUANTITY",
                            threshold_value: "3",
                            type: "PERCENTAGE_OFF",
                            value: "20"
                        }
                    ]
                }
            }
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

// npm exec tsx apps/examples/src/promotion/updateActivity.ts
