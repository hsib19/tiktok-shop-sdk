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

        const response = await sdk.product.createResponsiblePerson({
            name: "John Doe",
            email: "john.doe@email.com",
            phone_number: {
                "country_code": "+353",
                "local_number": "80915151"
            },
            address: {
                street_address_line1: "63 Cardiff Ln, Grand Canal Dock, Dublin City, Dublin",
                street_address_line2: "-",
                district: "-",
                city: "-",
                postal_code: "D02 HD23",
                province: "-",
                country: "IE"
            },
            locale: "en-IE"
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

// npm exec tsx apps/examples/src/product/createResponsiblePerson.ts
