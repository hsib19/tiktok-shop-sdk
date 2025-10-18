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
        sdk.setShopCipher(process.env.TIKTOK_SHOP_CIPHER!)

        const body = {
            product_id: "1731560416953664665",
            body: {
                description:
                    '<p>Please compare above detailed size with your measurement before purchase.</p><ul>   <li>M-Size</li>  <li>XL-Size</li></ul> <img src="https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/181595ea7d26489284b5667488d708c1~tplv-o3syd03w52-origin-jpeg.jpeg?from=1432613627" width=\'100\' height=\'100\' />',
                category_id: '601226',
                brand_id: '7082427311584347905',
                main_images: [
                    {
                        uri: 'tos-maliva-i-o3syd03w52-us/b73320c9778b4aeb85dda50aeba1f9e6',
                    },
                ],
                skus: [
                    {
                        id: '1731560420062823577',
                        sales_attributes: [
                            {
                                id: '100089',
                                name: 'Specification',
                                value_id: '1729592969712401100',
                                value_name: 'XL',
                                sku_img: {
                                    uri: 'tos-maliva-i-o3syd03w52-us/b73320c9778b4aeb85dda50aeba1f9e6',
                                },
                                supplementary_sku_images: [
                                    {
                                        uri: 'tos-maliva-i-o3syd03w52-us/b73320c9778b4aeb85dda50aeba1f9e6',
                                    },
                                ],
                            },
                        ],
                        seller_sku: 'Color-Red-XM001',
                        price: {
                            amount: '180000000',
                            currency: 'IDR',
                            sale_price: '180000000',
                        },
                        external_sku_id: '1729592969712207012',
                        identifier_code: {
                            code: '12345678901234',
                            type: 'GTIN',
                        },
                        inventory: [
                            {
                                warehouse_id: '7505773560071456518',
                                quantity: 999,
                            },
                        ],
                    },
                ],
                title:
                    "Men's Fashion Sports Low Cut Cotton Breathable Ankle Short Boat Invisible Socks",
                is_cod_allowed: false,
                package_weight: {
                    value: '1.32',
                    unit: 'KILOGRAM',
                },
                product_attributes: [
                    {
                        id: '100392',
                        values: [
                            {
                                id: '1001533',
                                name: 'Birthday',
                            },
                        ],
                    },
                ],
                size_chart: {
                    image: {
                        uri: 'tos-maliva-i-o3syd03w52-us/b73320c9778b4aeb85dda50aeba1f9e6',
                    },
                    template: {
                        id: '7267563252536723205',
                    },
                },
                package_dimensions: {
                    length: '10',
                    width: '10',
                    height: '10',
                    unit: 'CENTIMETER',
                },
                external_product_id: '172959296971220002',
                delivery_option_ids: ['6956553057215710977'],
                category_version: 'v1',
                manufacturer_ids: ['172959296971220002'],
                responsible_person_ids: ['172959296971220003'],
                listing_platforms: ['TIKTOK_SHOP'],
                shipping_insurance_requirement: 'REQUIRED',
                is_pre_owned: false,
                minimum_order_quantity: 1,
            }
        };


        const response = await sdk.product.editProduct(body);
        
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

// npm exec tsx apps/examples/src/product/editProduct.ts
