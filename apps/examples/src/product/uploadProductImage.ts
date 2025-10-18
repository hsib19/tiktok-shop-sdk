import 'dotenv/config';

import { TikTokShopSDK, TikTokAPIError } from 'tiktok-shop-sdk';

import path from 'path';
import fs from 'fs';

const sdk = new TikTokShopSDK({
    appKey: process.env.TIKTOK_APP_KEY!,
    appSecret: process.env.TIKTOK_APP_SECRET!,
});
export async function main() {

    try {

        // Set Access Token
        sdk.setAccessToken(process.env.TIKTOK_APP_ACCESS_KEY!);

        const filePath = path.join(process.cwd(), 'images/fnatic.png');
        const fileBuffer = fs.readFileSync(filePath);

        const response = await sdk.product.uploadProductImage({
            data: fileBuffer,
            use_case: "SIZE_CHART_IMAGE"
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

// npm exec tsx apps/examples/src/product/uploadProductImage.ts
