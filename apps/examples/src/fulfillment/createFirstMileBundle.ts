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

        const response = await sdk.fulfillment.createFirstMileBundle({
            order_ids: [
                "1162200639229365029"
            ],
            handover_method: "PICKUP",
            shipping_provider_id: "6617675021119438849",
            tracking_number: "173988244330623",
            phone_tail_number: "1234"
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

// npm exec tsx apps/examples/src/fulfillment/createFirstMileBundle.ts
