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
        sdk.setShopCipher(process.env.TIKTOK_SHOP_CIPHER!);

        const response = await sdk.return_refund.getAftersaleEligibility({
            order_id: "580196086824799013",
            query: {
                initiate_aftersale_user: "SELLER"
            }
        });

        console.log(JSON.stringify(response))

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

// npx tsx examples/return_refund/getAftersaleEligibility.ts
