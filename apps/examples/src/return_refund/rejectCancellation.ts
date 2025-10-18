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

        const response = await sdk.return_refund.rejectCancellation({
            cancel_id: "09830495345435",
            query: {
                idempotency_key: "03498530l94056"
            },
            body: {
                reject_reason: "seller_reject_apply_product_has_been_packed",
                comment: "I have packed the products before cancellation request",
                images: [
                    {
                        image_id: "tos-maliva-i-o3syd03w52-us/57a1c8908fe74572861ea5e50887d8d1",
                        mime_type: "image/png",
                        height: 200,
                        width: 200
                    }
                ]
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

// npm exec tsx apps/examples/src/return_refund/rejectCancellation.ts
