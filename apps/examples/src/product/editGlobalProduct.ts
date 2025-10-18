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

        const response = await sdk.product.editGlobalProduct({
            global_product_id: "29384294",
            body: {
                title: "Men's Fashion Sports Low Cut Cotton Breathable Ankle Short Boat Invisible Socks",
                description: " ",
                category_id: "600001",
                brand_id: "7082427311584347905",
                main_images: [
                    {
                        uri: "tos-maliva-i-o3syd03w52-us/c668cdf70b7f483c94dbe"
                    }
                ],
                skus: [
                    {
                        id: "1782427311584347905",
                        global_quantity: 999,
                        seller_sku: "Color-Red-XM01",
                        price: {
                            amount: "1.32",
                            currency: "USD"
                        },
                        sales_attributes: [
                            {
                                id: "100089",
                                name: "Specification",
                                value_id: "1729592969712207000",
                                value_name: "XL",
                                sku_img: {
                                    uri: "tos-maliva-i-o3syd03w52-us/c668cdf70b7f483c94dbe"
                                }
                            }
                        ],
                        inventory: [
                            {
                                global_warehouse_id: "7068517275539719942",
                                quantity: 999
                            }
                        ],
                        identifier_code: {
                            code: "10000000000000",
                            type: "GTIN"
                        },
                        sku_unit_count: "1",
                        extra_identifier_codes: [
                            "12345678901234"
                        ],
                        external_global_sku_id: "1234567890",
                        sale_prices: [
                            {
                                region: "US",
                                amount: "100"
                            }
                        ]
                    }
                ],
                package_weight: {
                    value: "1.99",
                    unit: "KILOGRAM"
                },
                certifications: [
                    {
                        id: "7182427311584347905",
                        images: [
                            {
                                uri: "tos-maliva-i-o3syd03w52-us/c668cdf70b7f483c94dbe"
                            }
                        ],
                        files: [
                            {
                                id: "v09ea0g40000cj91373c77u3mid3g1s0",
                                name: "SNI.PDF",
                                format: "PDF"
                            }
                        ]
                    }
                ],
                package_dimensions: {
                    length: "10",
                    width: "10",
                    height: "10",
                    unit: "CENTIMETER"
                },
                product_attributes: [
                    {
                        id: "100392",
                        values: [
                            {
                                id: "1001533",
                                name: "Birthday"
                            }
                        ]
                    }
                ],
                size_chart: {
                    image: {
                        uri: "tos-maliva-i-o3syd03w52-us/c668cdf70b7f483c94dbe"
                    },
                    template: {
                        id: "7267563252536723205"
                    }
                },
                video: {
                    id: "v09e40f40000cfu0ovhc77ub7fl97k4w"
                },
                manufacturer: {
                    name: "Sample Manufacturer Name",
                    address: "123W 106th St, New York, NY, USA, 10025",
                    phone_number: "+1-2124108036",
                    email: "samplemanufacturer101@outlook.com"
                },
                manufacturer_ids: [
                    "67726293bf1eb1e92401a"
                ],
                responsible_person_ids: [
                    "67726293bf1eb1e92401a"
                ],
                category_version: "v1",
                external_global_product_id: "123456789"
            }
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

// npm exec tsx apps/examples/src/product/editGlobalProduct.ts
