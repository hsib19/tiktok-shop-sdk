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
        sdk.setShopCipher(process.env.TIKTOK_SHOP_CIPHER!)

        const response = await sdk.product.checkProductListing(
            {
                description: "<p>Please compare above detailed size with your measurement before purchase.</p><ul>   <li>M-Size</li>  <li>XL-Size</li></ul> <img src=\"https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/181595ea7d26489284b5667488d708c1~tplv-o3syd03w52-origin-jpeg.jpeg?from=1432613627\" />",
                category_id: "600001",
                brand_id: "7082427311584347905",
                main_images: [
                    {
                        uri: "tos-maliva-i-o3syd03w52-us/c668cdf70b7f483c94dbe"
                    }
                ],
                skus: [
                    {
                        sales_attributes: [
                            {
                                id: "100089",
                                name: "Specification",
                                value_id: "1729592969712207000",
                                value_name: "XL",
                                sku_img: {
                                    uri: "tos-maliva-i-o3syd03w52-us/c668cdf70b7f483c94dbe"
                                },
                                supplementary_sku_images: [
                                    {
                                        uri: "tos-maliva-i-o3syd03w52-us/c668cdf70b7f483c94dbe"
                                    }
                                ]
                            }
                        ],
                        seller_sku: "Color-Red-XM01",
                        price: {
                            amount: "1.23",
                            currency: "USD"
                        },
                        external_sku_id: "1729592969712207012",
                        identifier_code: {
                            code: "10000000000000",
                            type: "GTIN"
                        },
                        inventory: [
                            {
                                warehouse_id: "7068517275539719942",
                                quantity: 999
                            }
                        ],
                        combined_skus: [
                            {
                                product_id: "1729582718312380123",
                                sku_id: "1729582718312380123",
                                sku_count: 11
                            }
                        ],
                        sku_unit_count: "100.00",
                        external_urls: [
                            "https://example.com/path1",
                            "https://example.com/path2"
                        ],
                        extra_identifier_codes: [
                            "00012345678905",
                            "9780596520687"
                        ],
                        pre_sale: {
                            type: "PRE_ORDER",
                            fulfillment_type: {
                                handling_duration_days: 24,
                                release_date: 1619611761
                            }
                        },
                        list_price: {
                            amount: "1",
                            currency: "USD"
                        },
                        external_list_prices: [
                            {
                                source: "SHOPIFY_COMPARE_AT_PRICE",
                                amount: "1",
                                currency: "USD"
                            }
                        ]
                    }
                ],
                title: "Men's Fashion Sports Low Cut Cotton Breathable Ankle Short Boat Invisible Socks",
                is_cod_allowed: false,
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
                        ],
                        expiration_date: 1741234626
                    }
                ],
                package_weight: {
                    value: "1.32",
                    unit: "KILOGRAM"
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
                package_dimensions: {
                    length: "10",
                    width: "10",
                    height: "10",
                    unit: "CENTIMETER"
                },
                external_product_id: "172959296971220002",
                delivery_option_ids: [
                    "1729592969712203232"
                ],
                video: {
                    id: "v09e40f40000cfu0ovhc77ub7fl97k4w"
                },
                primary_combined_product_id: "1729582718312380123",
                manufacturer_ids: [
                    "172959296971220002"
                ],
                responsible_person_ids: [
                    "172959296971220003"
                ],
                listing_platforms: [
                    "TIKTOK_SHOP"
                ],
                shipping_insurance_requirement: "NOT_SUPPORTED",
                is_pre_owned: false,
                minimum_order_quantity: 4
            }
        );

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

// npm exec tsx apps/examples/src/product/checkProductListing.ts
