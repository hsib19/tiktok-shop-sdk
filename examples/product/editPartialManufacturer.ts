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

        const response = await sdk.product.editPartialManufacturer({
            responsible_person_id: "0924720209348023",
            body: {
                name: "John Doe",
                registered_trade_name: "TikTok Shop",
                email: "johndoe@email.com",
                phone_number: {
                    country_code: "+65",
                    local_number: "81234567"
                },
                address: "One Raffles Quay, 1 Raffles Quay, Singapore 048583",
                locale: "en-IE"
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

// npx tsx examples/product/editPartialManufacturer.ts
