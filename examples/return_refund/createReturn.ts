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

        const returnParams = {
            order_id: "580195946180217637",
            skus: [
                {
                    sku_id: "1731560417292551321",
                    quantity: 1,
                },
            ],
            order_line_item_ids: [
                "580196086825061157",
            ],
            return_reason: "Damaged",
            return_type: "RETURN_AND_REFUND",
            refund_total: "190000",
            currency: "IDR",
            shipment_type: "PLATFORM",
            handover_method: "DROP_OFF",
        };

        const response = await sdk.return_refund.createReturn({
            body: returnParams
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

// npx tsx examples/return_refund/createReturn.ts
