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

        const response = await sdk.return_refund.searchCancellation({
            query: {
                page_size: "20",
            },
            cancel_id: "9083405345",
            body: {
                cancel_ids: [
                    "577087614418520388"
                ],
                order_ids: [
                    "577087614418520388"
                ],
                buyer_user_ids: [
                    "7494845267308415300"
                ],
                cancel_types: [
                    "CANCEL"
                ],
                cancel_status: [
                    "CANCELLATION_REQUEST_PENDING"
                ],
                create_time_ge: 1690340825,
                create_time_lt: 1690340825,
                update_time_ge: 1690340825,
                update_time_lt: 1690340825,
                locale: "en-US"
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

// npm exec tsx apps/examples/src/return_refund/searchCancellation.ts
