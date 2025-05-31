import 'dotenv/config';

import { TikTokShopSDK } from '../../src/sdk/TikTokShopSDK';
import { TikTokAPIError } from '../../src/utils';
import { CreateProductInput } from '../../src/types';

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
            description: "T-Shirt Fnatic Original Limited Edition Red Orange",
            category_id: "601226",
            title: "T-Shirt Fnatic Original Limited Edition Red Orange",
            package_weight: {
                value: "0.5",
                unit: "KILOGRAM",
            },
            main_images: [
                {
                    uri: "tos-maliva-i-o3syd03w52-us/4e48873aebfd4be88a8d2db7b2372b05",
                },
            ],
            skus: [
                {
                    sales_attributes: [],
                    inventory: [
                        {
                            warehouse_id: "7505773560071456518",
                            quantity: 100
                        },
                    ],
                    seller_sku: "FNC-02874823",
                    price: {
                        amount: "190000",
                        currency: "IDR",
                    },
                    combined_skus: [],
                    external_urls: [],
                    extra_identifier_codes: [],
                    external_list_prices: [],
                },
            ],
            size_chart: {
                image: {
                    uri: "tos-maliva-i-o3syd03w52-us/b73320c9778b4aeb85dda50aeba1f9e6",
                },
            },
        };

        const response = await sdk.product.createProduct(body);
        
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

// npx tsx examples/product/createProduct.ts
