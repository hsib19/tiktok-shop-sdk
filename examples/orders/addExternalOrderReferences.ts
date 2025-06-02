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

        const body = {
            orders: [
                {
                    id: "576461413038785752",
                    external_order: {
                        id: "676461413038785752",
                        platform: "SHOPIFY",
                        line_items: [
                            {
                                id: "577086512123755123",
                                origin_id: "677086512123755123"
                            }
                        ]
                    }
                }
            ]
        };


        const response = await sdk.order.addExternalOrderReferences(body);

        console.log(response.data)

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

// npx tsx examples/orders/addExternalOrderReferences.ts
