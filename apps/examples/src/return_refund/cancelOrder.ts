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

        const response = await sdk.return_refund.cancelOrder({
            order_id: "579489483240146725",
            order_line_item_ids: ["580196086825061157"],
            // skus: [
            //     {
            //         sku_id: "1731560413451420825",
            //         quantity: 1
            //     }
            // ],
            cancel_reason: "ecom_order_to_ship_canceled_reason_change_payment_method"
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

// npm exec tsx apps/examples/src/return_refund/cancelOrder.ts
