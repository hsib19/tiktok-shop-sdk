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

        const response = await sdk.product.recommendGlobalCategory({
            product_title: "Men'\''s Fashion Sports Low Cut Cotton Breathable Ankle Short",
            // description: "\u003cp\u003ePlease check the measurements before purchase.\u003c/p\u003e\u003cul\u003e  \u003cli\u003eM-Size\u003c/li\u003e  \u003cli\u003eXL-Size\u003c/li\u003e\u003c/ul\u003e \u003cimg src=\"https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/181595ea7d26489284b5667488d708c1~tplv-o3syd03w52-origin-jpeg.jpeg?from=1432613627\" width='100' height='100' /\u003e  ",
            // images: [
            //     {
            //         uri: "tos-maliva-i-o3syd03w52-us/c668cdf70b7f483c94dbe"
            //     }
            // ],
            // category_version: "v1"   
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

// npm exec tsx apps/examples/src/product/recommendGlobalCategory.ts
