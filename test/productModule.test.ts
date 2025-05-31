import { ProductModule } from '../src/modules/ProductModule';
import { ActivateProductInput, BrandCreateResponse, BrandFilterInput, BrandInput, CreateManufacturerInput, CreateManufacturerResponse, CreateResponsiblePersonInput, CreateResponsiblePersonResponse, DeactivateProductInput, DeleteProductInput, EditPartialManufacturerParam, EditResponsiblePersonInput, GetAttributesResponse, GetBrandsResponse, GetCategoriesQuery, GetCategoryAttributes, GetCategoryRulesQuery, GetCategoryRulesResponse, GetGlobalAttributeResponse, GetGlobalAttributesQuery, GetGlobalCategoriesQuery, GetGlobalCategoriesResponse, GetManufacturersResponse, GetProductParams, GetProductResponse, GetProductSEOWordsResponse, GetRecommendedProductTitleAndDescriptionQuery, GetRecommendedProductTitleAndDescriptionResponse, ProductDiagnosisResponse, RecommendCategoryByProductParams, RecommendCategoryByProductResponse, SearchManufacturerQuery, SearchProductInput, SearchProductsResponse, SearchResponsiblePersonsParam, SearchResponsiblePersonsResponse, SearchSizeChartResponse, SearchSizeChartsInput, TikTokAPIResponse } from '../src/types'

describe('ProductModule', () => {
    let mockRequest: jest.Mock;
    let productModule: ProductModule;

    beforeEach(() => {
        mockRequest = jest.fn();
        productModule = new ProductModule(mockRequest);
    });

    describe('Other Product Module', () => {
        it('should call request with correct GET path and return response', async () => {
            const mockResponse = { code: 0, data: { needsReturnWarehouse: true, needsBrandApproval: false }, message: 'success' };
            mockRequest.mockResolvedValue(mockResponse);

            const result = await productModule.getProductPrerequisites();

            expect(mockRequest).toHaveBeenCalledWith({
                method: 'GET',
                path: '/product/202309/prerequisites',
            });
            expect(result).toBe(mockResponse);
        });

        it('should call request with correct parameters in searchSizeCharts', async () => {

            const mockRes: TikTokAPIResponse<SearchSizeChartResponse> = {
                data: {
                    "size_chart": [
                        {
                            "template_id": "7362027385890244398",
                            "template_name": "size chart",
                            "images": [
                                {
                                    "uri": "tos-maliva-i-o3syd03w52-us/c668cdf70b7f483c94dbe",
                                    "url": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/6c8519a3663a4d728c4e3c131dc914b4~tplv-o3syd03w52-resize-jpeg:300:300.jpeg?from=522366036",
                                    "locale": "en-US"
                                }
                            ]
                        }
                    ],
                    "next_page_token": "b2Zmc2V0PTAK",
                    "total_count": 100
                },
                code: 0,
                message: 'success',
                request_id: "02480480234234"
            }

            const mockRequest = jest.fn().mockResolvedValue(mockRes);

            const product = new ProductModule(mockRequest);

            const paramInput: SearchSizeChartsInput = {
                body: {
                    keyword: "t-shirt",
                },
                query: {
                    page_size: 10
                }
            };

            const result = await product.searchSizeCharts(paramInput);

            expect(mockRequest).toHaveBeenCalledWith({
                method: 'POST',
                path: '/product/202407/sizecharts/search',
                query: paramInput.query,
                body: paramInput.body,
            });

            expect(result).toEqual(mockRes);
        });

    });

    describe('Testing Categries Product', () => {
        it('should call request with correct GET path and query params, then return response', async () => {
            const query: GetCategoriesQuery = {
                locale: 'id-ID',
                keyword: 'Kaos',
                category_version: 'v1',
                listing_platform: 'TIKTOK_SHOP'
            };
            const mockResponse = { code: 0, data: { categories: [{ id: 1001, name: 'Clothing' }] }, message: 'success' };
            mockRequest.mockResolvedValue(mockResponse);

            const result = await productModule.getCategories(query);

            expect(mockRequest).toHaveBeenCalledWith({
                method: 'GET',
                path: '/product/202309/categories',
                query,
            });
            expect(result).toBe(mockResponse);
        });

        it('should call request with correct parameters in recommendCategory', async () => {

            const mockRes: TikTokAPIResponse<RecommendCategoryByProductResponse> = {
                data: {
                    "leaf_category_id": "605254",
                    "categories": [
                        {
                            "id": "605254",
                            "name": "Teas",
                            "level": 1,
                            "is_leaf": true,
                            "permission_statuses": [
                                "INVITE_ONLY"
                            ]
                        }
                    ]
                },
                code: 0,
                message: 'success',
                request_id: "02480480234234"
            }

            const mockRequest = jest.fn().mockResolvedValue(mockRes);

            const product = new ProductModule(mockRequest);

            const input: RecommendCategoryByProductParams = {
                product_title: 'Kaos Anime Senku Dr. Stone Unisex Original Cotton Lengan Pendek',
            };

            const result = await product.recommendCategory(input);

            expect(mockRequest).toHaveBeenCalledWith({
                method: 'POST',
                path: '/product/202309/categories/recommend',
                body: input,
            });

            expect(result).toEqual(mockRes);
        });

        it('should call request with correct parameters in getCategoryRules', async () => {

            const mockRes: TikTokAPIResponse<GetCategoryRulesResponse> = {
                data: {
                    "allowed_special_product_types": ['PRE_ORDER'],
                    "cod": { "is_supported": true },
                    "epr": { "is_required": false },
                    "manufacturer": { "is_required": false },
                    "package_dimension": { "is_required": false },
                    "product_certifications": [],
                    "responsible_person": { "is_required": false },
                    "size_chart": { "is_required": true, "is_supported": true }
                },
                code: 0,
                message: 'Success',
                request_id: "202505300714081AB426BE9CD57B00477F"
            }

            const mockRequest = jest.fn().mockResolvedValue(mockRes);

            const product = new ProductModule(mockRequest);

            const input: GetCategoryRulesQuery = {
                category_id: "601226",
                query: {
                    category_version: "v1",
                    locale: "en-US"
                }
            };

            const result = await product.getCategoryRules(input);

            expect(mockRequest).toHaveBeenCalledWith({
                method: 'GET',
                path: `/product/202309/categories/${input.category_id}/rules`,
                query: input.query,
            });

            expect(result).toEqual(mockRes);
        });

        it('should call request with correct parameters in getAttributes', async () => {

            const mockRes: TikTokAPIResponse<GetAttributesResponse> = {
                data: {
                    "attributes": [
                        {
                            "id": "100392",
                            "name": "Occasion",
                            "type": "PRODUCT_PROPERTY",
                            "is_requried": false,
                            "values": [
                                {
                                    "id": "1001533",
                                    "name": "Birthday"
                                }
                            ],
                            "value_data_format": "POSITIVE_INT_OR_DECIMAL",
                            "is_customizable": true,
                            "requirement_conditions": [
                                {
                                    "condition_type": "VALUE_ID_MATCH",
                                    "attribute_id": "101610",
                                    "attribute_value_id": "1024358"
                                }
                            ],
                            "is_multiple_selection": true
                        }
                    ]
                },
                code: 0,
                message: 'Success',
                request_id: "202505300714081AB426BE9CD57B00477F"
            }

            const mockRequest = jest.fn().mockResolvedValue(mockRes);

            const product = new ProductModule(mockRequest);

            const input: GetCategoryAttributes = {
                category_id: "601226",
                query: {
                    category_version: "v1",
                    locale: "en-US"
                }
            };

            const result = await product.getAttributes(input);

            expect(mockRequest).toHaveBeenCalledWith({
                method: 'GET',
                path: `/product/202309/categories/${input.category_id}/attributes`,
                query: input.query,
            });

            expect(result).toEqual(mockRes);
        });

        it("Upgrade category using createCategoryUpgradeTask", async () => {
            const mockRes: TikTokAPIResponse<{}> = {
                data: {},
                code: 0,
                message: 'success',
                request_id: "02480480234234"
            }

            const mockRequest = jest.fn().mockResolvedValue(mockRes);

            const product = new ProductModule(mockRequest);

            const result = await product.createCategoryUpgradeTask();

            expect(mockRequest).toHaveBeenCalledWith({
                method: 'POST',
                path: `/product/202407/products/category_upgrade_task`,
            });

            expect(result).toEqual(mockRes);
        });

        it("get global category using getGlobalCategories", async () => {
            const mockRes: TikTokAPIResponse<GetGlobalCategoriesResponse> = {
                data: {
                    "categories": [
                        {
                            "id": "600001",
                            "parent_id": "0",
                            "local_name": "Home Supplies",
                            "is_leaf": false,
                            "permission_statuses": [
                                "AVAILABLE"
                            ]
                        }
                    ]
                },
                code: 0,
                message: 'success',
                request_id: "02480480234234"
            }

            const mockRequest = jest.fn().mockResolvedValue(mockRes);

            const product = new ProductModule(mockRequest);

            const query: GetGlobalCategoriesQuery = {
                keyword: "T-Shirt"
            }

            const result = await product.getGlobalCategories(query);

            expect(mockRequest).toHaveBeenCalledWith({
                method: 'GET',
                path: `/product/202309/global_categories`,
                query
            });

            expect(result).toEqual(mockRes);
        });

        it("get global category using getGlobalCategories", async () => {
            const mockRes: TikTokAPIResponse<GetGlobalAttributeResponse> = {
                data: {
                    attributes: []
                },
                code: 0,
                message: 'success',
                request_id: "02480480234234"
            }

            const mockRequest = jest.fn().mockResolvedValue(mockRes);

            const product = new ProductModule(mockRequest);

            const params: GetGlobalAttributesQuery = {
                category_id: "600001",
                query: {
                    locale: 'id-ID'
                }
            }

            const result = await product.getGlobalAttributes(params);

            expect(mockRequest).toHaveBeenCalledWith({
                method: 'GET',
                path: `/product/202309/categories/${params.category_id}/global_attributes`,
                query: params.query
            });

            expect(result).toEqual(mockRes);
        });

    });

    describe('Testing Manufactures', () => {
        it("should call request with correct param in createManufactures", async()  => {
            const mockRes: TikTokAPIResponse<CreateManufacturerResponse> = {
                data: { manufacturer_id: '' },
                code: 0,
                message: 'success',
                request_id: "02480480234234"
            }

            const mockRequest = jest.fn().mockResolvedValue(mockRes);

            const product = new ProductModule(mockRequest);

            const bodyParam: CreateManufacturerInput = {
                name: "John Doe",
                registered_trade_name: "TikTok Shop",
                email: "johndoe@email.com",
                phone_number: {
                    country_code: "+65",
                    local_number: "81234567"
                },
                address: "One Raffles Quay, 1 Raffles Quay, Singapore 048583",
                locale: "en-IE"
            }

            const result = await product.createManufacturer(bodyParam);

            expect(mockRequest).toHaveBeenCalledWith({
                method: 'POST',
                path: `/product/202409/compliance/manufacturers`,
                body: bodyParam
            });

            expect(result).toEqual(mockRes);
        });

        it("should call request with correct param in searchManufactures", async () => {
            const mockRes: TikTokAPIResponse<GetManufacturersResponse> = {
                data: { manufacturers: [], next_page_token: '', total_count: 0 },
                code: 0,
                message: 'success',
                request_id: "02480480234234"
            }

            const mockRequest = jest.fn().mockResolvedValue(mockRes);

            const product = new ProductModule(mockRequest);

            const params: SearchManufacturerQuery = {
                body: {
                    manufacturer_ids: ["66d3cbe4d9c8b09ddca932a7"],
                    keyword: "John"
                },
                query: {
                    page_size: 1
                }
            }

            const result = await product.searchManufacturer(params);

            expect(mockRequest).toHaveBeenCalledWith({
                method: 'POST',
                path: `/product/202501/compliance/manufacturers/search`,
                query: params.query,
                body: params.body,
            });

            expect(result).toEqual(mockRes);
        });

        it("edit responsible person using editPartialManufacturer", async () => {
            const mockRes: TikTokAPIResponse<{}> = {
                data: {},
                code: 0,
                message: 'success',
                request_id: "02480480234234"
            }

            const mockRequest = jest.fn().mockResolvedValue(mockRes);

            const product = new ProductModule(mockRequest);

            const paramInput: EditPartialManufacturerParam = {
                body: {
                    name: "John Doe Edit",
                    email: "john.doe@email.com",
                    phone_number: {
                        "country_code": "+353",
                        "local_number": "80915151"
                    },
                    registered_trade_name: "Tiktok Shop",
                    address: "63 Cardiff Ln, Grand Canal Dock, Dublin City, Dublin",
                    locale: "en-IE"
                },
                manufacturer_id: "304950349583045345"
            };

            const result = await product.editPartialManufacturer(paramInput);

            expect(mockRequest).toHaveBeenCalledWith({
                method: 'POST',
                path: `/product/202409/compliance/manufacturers/${paramInput.manufacturer_id}/partial_edit`,
                body: paramInput.body
            });

            expect(result).toEqual(mockRes);
        });

    });

    describe('Testing Brands', () => {
        it("should call request with correct parameters in createCustomBrands", async() => {

            const mockRes: TikTokAPIResponse<BrandCreateResponse> = {
                data: {
                    id: '7510161790286776065'
                },
                code: 0,
                message: 'Success',
                request_id: "202505300714081AB426BE9CD57B00477F"
            }

            const mockRequest = jest.fn().mockResolvedValue(mockRes);

            const product = new ProductModule(mockRequest);

            const input: BrandInput = {
                name: "Name Brand 2",
            };

            const result = await product.createCustomBrands(input);

            expect(mockRequest).toHaveBeenCalledWith({
                method: 'POST',
                path: `/product/202309/brands`,
                body: input,
            });

            expect(result).toEqual(mockRes);

        });


        it("should call request with correct parameters in getBrands", async () => {

            const mockRes: TikTokAPIResponse<GetBrandsResponse> = {
                data: {
                    "brands": [
                        {
                            "id": "7082427311584347905",
                            "name": "Teas",
                            "authorized_status": "AUTHORIZED",
                            "is_t1_brand": true,
                            "brand_status": "AVAILABLE"
                        }
                    ],
                    "total_count": 10000,
                    "next_page_token": "b2Zmc2V0PTAK"
                },
                code: 0,
                message: 'Success',
                request_id: "202505300714081AB426BE9CD57B00477F"
            }

            const mockRequest = jest.fn().mockResolvedValue(mockRes);

            const product = new ProductModule(mockRequest);

            const query: BrandFilterInput = {
                page_size: 1,
            };

            const result = await product.getBrands(query);

            expect(mockRequest).toHaveBeenCalledWith({
                method: 'GET',
                path: `/product/202309/brands`,
                query: query,
            });

            expect(result).toEqual(mockRes);

        });

    })


    describe("Testing Products", () => {
        it("Search products using searchProducts", async () => {
            const mockRes: TikTokAPIResponse<SearchProductsResponse> = {
                data: {
                    "total_count": 200,
                    "products": [
                        {
                            "id": "1729592969712207008",
                            "title": "Short Boat Invisible Socks",
                            "status": "ACTIVATE",
                            "skus": [
                                {
                                    "id": "1729592969712207012",
                                    "seller_sku": "Color-Red-XM01",
                                    "price": {
                                        "currency": "USD",
                                        "tax_exclusive_price": "111.01",
                                        "sale_price": "121.11"
                                    },
                                    "inventory": [
                                        {
                                            "warehouse_id": "7068517275539719942",
                                            "quantity": 999
                                        }
                                    ],
                                    "list_price": {
                                        "amount": "1",
                                        "currency": "USD"
                                    },
                                    "external_list_prices": [
                                        {
                                            "source": "SHOPIFY_COMPARE_AT_PRICE",
                                            "amount": "1",
                                            "currency": "USD"
                                        }
                                    ],
                                    "pre_sale": {
                                        "type": "PRE_ORDER",
                                        "fulfillment_type": {
                                            "handling_duration_days": 7,
                                            "release_date": 1619611761
                                        }
                                    }
                                }
                            ],
                            "sales_regions": [
                                "US"
                            ],
                            "create_time": 1234567890,
                            "update_time": 1234567800,
                            "product_sync_fail_reasons": [
                                "The required qualification is missed."
                            ],
                            "is_not_for_sale": true,
                            "recommended_categories": [
                                {
                                    "id": "853000",
                                    "local_name": "Botol & Stoples Penyimpanan"
                                }
                            ],
                            "listing_quality_tier": "POOR",
                            "integrated_platform_statuses": [
                                {
                                    "platform": "TOKOPEDIA",
                                    "status": "PLATFORM_DEACTIVATED"
                                }
                            ],
                            "audit": {
                                "status": "AUDITING",
                                "pre_approved_reasons": [
                                    "KYC_PENDING"
                                ]
                            },
                            "product_families": [
                                {
                                    "id": "1000592969712207000",
                                    "products": [
                                        {
                                            "id": "1729592969712207008"
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    "next_page_token": "b2Zmc2V0PTAK"
                },
                code: 0,
                message: 'success',
                request_id: "02480480234234"
            }

            const mockRequest = jest.fn().mockResolvedValue(mockRes);

            const product = new ProductModule(mockRequest);

            const paramInput: SearchProductInput = {
                body: {
                    status: 'ALL' 
                },
                query: {
                    page_size: 10
                }
            };

            const result = await product.searchProducts(paramInput);

            expect(mockRequest).toHaveBeenCalledWith({
                method: 'POST',
                path: '/product/202502/products/search',
                query: paramInput.query,
                body: paramInput.body,
            });

            expect(result).toEqual(mockRes);
        });

        it("Get product Detail using getProduct", async () => {
            const mockRes: TikTokAPIResponse<GetProductResponse> = {
                data: {
                    "id": "1729592969712207008",
                    "status": "SELLER_DEACTIVATED",
                    "title": "Short Boat Invisible Socks",
                    "category_chains": [
                        {
                            "id": "853000",
                            "parent_id": "851848",
                            "local_name": "Botol & Stoples Penyimpanan",
                            "is_leaf": true
                        }
                    ],
                    "brand": {
                        "id": "7082427311584347905",
                        "name": "brand xxx aaa"
                    },
                    "main_images": [
                        {
                            "height": 600,
                            "width": 600,
                            "thumb_urls": [
                                "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/6c8519a3663a4d728c4e3c131dc914b4~tplv-o3syd03w52-resize-jpeg:300:300.jpeg?from=522366036"
                            ],
                            "uri": "tos-maliva-i-o3syd03w52-us/6c8519a3663a4d728c4e3c131dc914b4",
                            "urls": [
                                "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/6c8519a3663a4d728c4e3c131dc914b4~tplv-o3syd03w52-resize-jpeg:300:300.jpeg?from=522366036"
                            ]
                        }
                    ],
                    "video": {
                        "id": "v09ea0g40000cj91373c77u3mid3g1s0",
                        "cover_url": "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/6c8519a3663a4d728c4e3c131dc914b4~tplv-o3syd03w52-resize-jpeg:300:300.jpeg?from=522366036",
                        "format": "MP4",
                        "url": "https://v16m-default.akamaized.net/bbae7099581b26cd340beaa7821b2d8c/64de6020/video/tos/alisg/tos-alisg-v-f466fc-sg/oMne9QuzIBN3fIDN7bFCCMbBKuGigg12ghDC8k/?a=0&ch=0&cr=0&dr=0&er=0&lr=default&cd=0%7C0%7C0%7C0&br=2212&bt=1106&cs=0&ds=3&ft=dl9~j-Inz7TKnfsfiyq8Z&mime_type=video_mp4&qs=13&rc=anR4Ojk6ZmYzbTMzODRmNEBpanR4Ojk6ZmYzbTMzODRmNEBsYWFwcjRva2NgLS1kLy1zYSNsYWFwcjRva2NgLS1kLy1zcw%3D%3D&l=202308171159498F7B108584E58B010932&btag=e00048000",
                        "width": 1280,
                        "height": 480,
                        "size": 1000
                    },
                    "description": "<p>Please compare above detailed size with your measurement before purchase.</p>\n<ul> \n  <li>M-Size</li>\n  <li>XL-Size</li>\n</ul> \n<img src=\"https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/181595ea7d26489284b5667488d708c1~tplv-o3syd03w52-origin-jpeg.jpeg?from=1432613627\" />\n",
                    "package_dimensions": {
                        "length": "10",
                        "width": "10",
                        "height": "10",
                        "unit": "CENTIMETER"
                    },
                    "package_weight": {
                        "value": "1.32",
                        "unit": "KILOGRAM"
                    },
                    "skus": [
                        {
                            "id": "10001",
                            "seller_sku": "sku name",
                            "price": {
                                "tax_exclusive_price": "110",
                                "sale_price": "117.5",
                                "currency": "USD",
                                "unit_price": "1"
                            },
                            "inventory": [
                                {
                                    "warehouse_id": "6966568648651605766",
                                    "quantity": 999
                                }
                            ],
                            "identifier_code": {
                                "code": "10000000000010",
                                "type": "GTIN"
                            },
                            "sales_attributes": [
                                {
                                    "id": "100000",
                                    "name": "Color",
                                    "value_id": "100000",
                                    "value_name": "Red",
                                    "sku_img": {
                                        "height": 100,
                                        "width": 100,
                                        "thumb_urls": [
                                            "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/6c8519a3663a4d728c4e3c131dc914b4~tplv-o3syd03w52-resize-jpeg:300:300.jpeg?from=522366036"
                                        ],
                                        "uri": "tos-maliva-i-o3syd03w52-us/6c8519a3663a4d728c4e3c131dc914b4",
                                        "urls": [
                                            "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/6c8519a3663a4d728c4e3c131dc914b4~tplv-o3syd03w52-resize-jpeg:300:300.jpeg?from=522366036"
                                        ]
                                    },
                                    "supplementary_sku_images": [
                                        {
                                            "uri": "tos-maliva-i-o3syd03w52-us/6c8519a3663a4d728c4e3c131dc914b4",
                                            "height": 100,
                                            "width": 100,
                                            "thumb_urls": [
                                                "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/6c8519a3663a4d728c4e3c131dc914b4~tplv-o3syd03w52-resize-jpeg:300:300.jpeg?from=522366036"
                                            ],
                                            "urls": [
                                                "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/6c8519a3663a4d728c4e3c131dc914b4~tplv-o3syd03w52-resize-jpeg:300:300.jpeg?from=522366036"
                                            ]
                                        }
                                    ]
                                }
                            ],
                            "external_sku_id": "1729592969712207234",
                            "combined_skus": [
                                {
                                    "product_id": "1729582718312380123",
                                    "sku_id": "1729582718312380123",
                                    "sku_count": 1
                                }
                            ],
                            "global_listing_policy": {
                                "price_sync": true,
                                "inventory_type": "SHARED",
                                "replicate_source": {
                                    "product_id": "1729592969712203232",
                                    "shop_id": "7295929697122032321",
                                    "sku_id": "1729592969712203232"
                                }
                            },
                            "sku_unit_count": "1.00",
                            "external_urls": [
                                "https://example.com/path1",
                                "https://example.com/path2"
                            ],
                            "extra_identifier_codes": [
                                "00012345678905",
                                "9780596520687"
                            ],
                            "pre_sale": {
                                "type": "PRE_ORDER",
                                "fulfillment_type": {
                                    "handling_duration_days": 3,
                                    "release_date": 1619611761
                                }
                            },
                            "list_price": {
                                "amount": "1",
                                "currency": "USD"
                            },
                            "external_list_prices": [
                                {
                                    "source": "SHOPIFY_COMPARE_AT_PRICE",
                                    "amount": "1",
                                    "currency": "USD"
                                }
                            ]
                        }
                    ],
                    "certifications": [
                        {
                            "id": "602362",
                            "title": "SNI Certificate",
                            "files": [
                                {
                                    "id": "v09ea0g40000cj91373c77u3mid3g1s0",
                                    "urls": [
                                        "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/6c8519a3663a4d728c4e3c131dc914b4~tplv-o3syd03w52-resize-jpeg:300:300.jpeg?from=522366036"
                                    ],
                                    "name": "CERT_X2.PDF",
                                    "format": "PDF"
                                }
                            ],
                            "images": [
                                {
                                    "height": 600,
                                    "width": 600,
                                    "thumb_urls": [
                                        "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/6c8519a3663a4d728c4e3c131dc914b4~tplv-o3syd03w52-resize-jpeg:300:300.jpeg?from=522366036"
                                    ],
                                    "uri": "tos-maliva-i-o3syd03w52-us/6c8519a3663a4d728c4e3c131dc914b4",
                                    "urls": [
                                        "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/6c8519a3663a4d728c4e3c131dc914b4~tplv-o3syd03w52-resize-jpeg:300:300.jpeg?from=522366036"
                                    ]
                                }
                            ],
                            "expiration_date": 1741235456
                        }
                    ],
                    "size_chart": {
                        "image": {
                            "height": 600,
                            "width": 600,
                            "thumb_urls": [
                                "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/6c8519a3663a4d728c4e3c131dc914b4~tplv-o3syd03w52-resize-jpeg:300:300.jpeg?from=522366036"
                            ],
                            "uri": "tos-maliva-i-o3syd03w52-us/6c8519a3663a4d728c4e3c131dc914b4",
                            "urls": [
                                "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/6c8519a3663a4d728c4e3c131dc914b4~tplv-o3syd03w52-resize-jpeg:300:300.jpeg?from=522366036"
                            ]
                        },
                        "template": {
                            "id": "7267563252536723205"
                        }
                    },
                    "is_cod_allowed": true,
                    "product_attributes": [
                        {
                            "id": "100392",
                            "name": "Occasion",
                            "values": [
                                {
                                    "id": "1001533",
                                    "name": "Birthday"
                                }
                            ]
                        }
                    ],
                    "audit_failed_reasons": [
                        {
                            "position": "product",
                            "reasons": [
                                "violate listing rules"
                            ],
                            "suggestions": [
                                "The product violates TikTok Shopping listing rules, please check and resubmit."
                            ],
                            "listing_platform": "TIKTOK_SHOP"
                        }
                    ],
                    "update_time": 1234567899,
                    "create_time": 1234567890,
                    "delivery_options": [
                        {
                            "id": "1729592969712203232",
                            "name": "\"\"",
                            "is_available": true
                        }
                    ],
                    "external_product_id": "172959296971220002",
                    "product_types": [
                        "COMBINED_PRODUCT"
                    ],
                    "is_not_for_sale": true,
                    "recommended_categories": [
                        {
                            "id": "850003",
                            "local_name": "\t\nBotol & Stoples Penyimpanan"
                        }
                    ],
                    "manufacturer_ids": [
                        "172959296971220002"
                    ],
                    "responsible_person_ids": [
                        "172959296971220003"
                    ],
                    "listing_quality_tier": "POOR",
                    "integrated_platform_statuses": [
                        {
                            "platform": "TOKOPEDIA",
                            "status": "PLATFORM_DEACTIVATED"
                        }
                    ],
                    "shipping_insurance_requirement": "OPTIONAL",
                    "minimum_order_quantity": 1,
                    "is_pre_owned": false,
                    "audit": {
                        "status": "AUDITING",
                        "pre_approved_reasons": [
                            "KYC_PENDING"
                        ]
                    },
                    "global_product_association": {
                        "global_product_id": "1729592969712207920",
                        "sku_mappings": [
                            {
                                "global_sku_id": "1729592969712207234",
                                "local_sku_id": "1729592969712207230",
                                "sales_attribute_mappings": [
                                    {
                                        "local_attribute_id": "100000",
                                        "global_attribute_id": "100000",
                                        "local_value_id": "1001064",
                                        "global_value_id": "1001064"
                                    }
                                ]
                            }
                        ]
                    },
                    "prescription_requirement": {
                        "needs_prescription": false
                    },
                    "product_families": [
                        {
                            "id": "1000592969712207000",
                            "products": [
                                {
                                    "id": "1729592969712207008"
                                }
                            ]
                        }
                    ]
                },
                code: 0,
                message: 'success',
                request_id: "02480480234234"
            }

            const mockRequest = jest.fn().mockResolvedValue(mockRes);

            const product = new ProductModule(mockRequest);

            const paramInput: GetProductParams = {
                product_id: "1731477962415703193",
                query: {
                   return_under_review_version: false
                }
            };

            const result = await product.getProduct(paramInput);

            expect(mockRequest).toHaveBeenCalledWith({
                method: 'GET',
                path: `/product/202309/products/${paramInput.product_id}`,
                query: paramInput.query,
            });

            expect(result).toEqual(mockRes);
        });

        it("Get product recomend title, desc using getRecommendedProductTitleAndDescription", async () => {
            const mockRes: TikTokAPIResponse<GetRecommendedProductTitleAndDescriptionResponse> = {
                data: {
                    "products": [
                        {
                            "id": "123456",
                            "suggestions": [
                                {
                                    "field": "TITLE",
                                    "items": [
                                        {
                                            "text": "this is a good title"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                code: 0,
                message: 'success',
                request_id: "02480480234234"
            }

            const mockRequest = jest.fn().mockResolvedValue(mockRes);

            const product = new ProductModule(mockRequest);

            const paramInput: GetRecommendedProductTitleAndDescriptionQuery = {
                product_ids: ['1731477962415703193', '240248209423']
            };

            const result = await product.getRecommendedProductTitleAndDescription(paramInput);

            expect(mockRequest).toHaveBeenCalledWith({
                method: 'GET',
                path: `/product/202405/products/suggestions`,
                query: paramInput,
            });

            expect(result).toEqual(mockRes);
        });

        it("Get product SEO word using getProductsSEOWords", async () => {
            const mockRes: TikTokAPIResponse<GetProductSEOWordsResponse> = {
                data: {
                    "products": [
                        {
                            "id": "12345",
                            "seo_words": [
                                {
                                    "text": "dress"
                                }
                            ]
                        }
                    ]
                },
                code: 0,
                message: 'success',
                request_id: "02480480234234"
            }

            const mockRequest = jest.fn().mockResolvedValue(mockRes);

            const product = new ProductModule(mockRequest);

            const paramInput: GetRecommendedProductTitleAndDescriptionQuery = {
                product_ids: ['1731477962415703193', '240248209423']
            };

            const result = await product.getProductsSEOWords(paramInput);

            expect(mockRequest).toHaveBeenCalledWith({
                method: 'GET',
                path: `/product/202405/products/seo_words`,
                query: paramInput,
            });

            expect(result).toEqual(mockRes);
        });

        it("Diagnose product using productInformationIssueDiagnosis", async () => {
            const mockRes: TikTokAPIResponse<ProductDiagnosisResponse> = {
                data: {
                    "products": [
                        {
                            "id": "123456",
                            "listing_quality": {
                                "current_tier": "POOR",
                                "remaining_recommendations": 3
                            },
                            "diagnoses": [
                                {
                                    "field": "TITLE",
                                    "diagnosis_results": [
                                        {
                                            "code": "TITLE_LESS_THAN_40_CHARACTERS",
                                            "how_to_solve": "Names must be at least 40 characters long and contain product-identifying information, such as \"hiking boots\" or \"lipstick\".",
                                            "quality_tier": "GOOD"
                                        }
                                    ],
                                    "suggestion": {
                                        "seo_words": [
                                            {
                                                "text": "dress"
                                            }
                                        ],
                                        "smart_texts": [
                                            {
                                                "text": "this is a good title"
                                            }
                                        ],
                                        "images": [
                                            {
                                                "height": 600,
                                                "width": 600,
                                                "uri": "tos-maliva-i-o3syd03w52-us/53b55d6e8cdf1f315affa7e70b45707d",
                                                "url": "https://p16-graph-va.ibyteimg.com/tos-maliva-i-1por3rr4fy-us/v2/53b55d6e8cdf1f315affa7e70b45707d~tplv-1por3rr4fy-image.webp",
                                                "optimized_uri": "tos-maliva-i-o3syd03w52-us/0266127022264e54ad2f639f5e0fb5e6",
                                                "optimized_url": "https://p16-graph-va.ibyteimg.com/tos-maliva-i-1por3rr4fy-us/v2/0266127022264e54ad2f639f5e0fb5e6~tplv-1por3rr4fy-image.webp"
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                },
                code: 0,
                message: 'success',
                request_id: "02480480234234"
            }

            const mockRequest = jest.fn().mockResolvedValue(mockRes);

            const product = new ProductModule(mockRequest);

            const paramInput: GetRecommendedProductTitleAndDescriptionQuery = {
                product_ids: ['1731477962415703193', '240248209423']
            };

            const result = await product.productInformationIssueDiagnosis(paramInput);

            expect(mockRequest).toHaveBeenCalledWith({
                method: 'GET',
                path: `/product/202405/products/diagnoses`,
                query: paramInput,
            });

            expect(result).toEqual(mockRes);
        });

        it("Deactivate product using deactivateProducts", async () => {
            const mockRes: TikTokAPIResponse<Object> = {
                data: {
                },
                code: 0,
                message: 'success',
                request_id: "02480480234234"
            }

            const mockRequest = jest.fn().mockResolvedValue(mockRes);

            const product = new ProductModule(mockRequest);

            const paramInput: DeactivateProductInput = {
                product_ids: ['1731477962415703193'],
                listing_platforms: ["TIKTOK_SHOP", "TOKOPEDIA"]
            };

            const result = await product.deactivateProducts(paramInput);

            expect(mockRequest).toHaveBeenCalledWith({
                method: 'POST',
                path: `/product/202309/products/deactivate`,
                body: paramInput,
            });

            expect(result).toEqual(mockRes);
        });

        it("Activate product using activateProducts", async () => {
            const mockRes: TikTokAPIResponse<Object> = {
                data: {
                },
                code: 0,
                message: 'success',
                request_id: "02480480234234"
            }

            const mockRequest = jest.fn().mockResolvedValue(mockRes);

            const product = new ProductModule(mockRequest);

            const paramInput: ActivateProductInput = {
                product_ids: ['1731477962415703193'],
                listing_platforms: ["TIKTOK_SHOP", "TOKOPEDIA"]
            };

            const result = await product.activateProducts(paramInput);

            expect(mockRequest).toHaveBeenCalledWith({
                method: 'POST',
                path: `/product/202309/products/activate`,
                body: paramInput,
            });

            expect(result).toEqual(mockRes);
        });

        it("Delete product using deleteProducts", async () => {
            const mockRes: TikTokAPIResponse<Object> = {
                data: {
                },
                code: 0,
                message: 'success',
                request_id: "02480480234234"
            }

            const mockRequest = jest.fn().mockResolvedValue(mockRes);

            const product = new ProductModule(mockRequest);

            const paramInput: DeleteProductInput = {
                product_ids: ['1731477962415703193']
            };

            const result = await product.deleteProducts(paramInput);

            expect(mockRequest).toHaveBeenCalledWith({
                method: 'DELETE',
                path: `/product/202309/products`,
                body: paramInput,
            });

            expect(result).toEqual(mockRes);
        });

    });

    describe('Testing responsible person', () => { 
        it("create responsible person using createResponsiblePerson", async () => {
            const mockRes: TikTokAPIResponse<CreateResponsiblePersonResponse> = {
                data:{
                    responsible_person_id: ''
                },
                code: 0,
                message: 'success',
                request_id: "02480480234234"
            }

            const mockRequest = jest.fn().mockResolvedValue(mockRes);

            const product = new ProductModule(mockRequest);

            const paramInput: CreateResponsiblePersonInput = {
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
            };

            const result = await product.createResponsiblePerson(paramInput);

            expect(mockRequest).toHaveBeenCalledWith({
                method: 'POST',
                path: `/product/202409/compliance/responsible_persons`,
                body: paramInput,
            });

            expect(result).toEqual(mockRes);
        });

        it("get responsible person using searchResponsiblePersons", async () => {
            const mockRes: TikTokAPIResponse<SearchResponsiblePersonsResponse> = {
                data: {
                    "responsible_persons": [
                        {
                            "id": "66d3cbe4d9c8b09ddca932a7",
                            "name": "John Doe",
                            "email": "john.doe@email.com",
                            "phone_number": {
                                "country_code": "+353",
                                "local_number": "80915151"
                            },
                            "address": {
                                "street_address_line1": "63 Cardiff Ln, Grand Canal Dock, Dublin City, Dublin",
                                "street_address_line2": "-",
                                "district": "-",
                                "city": "-",
                                "province": "-",
                                "postal_code": "D02 HD23",
                                "country": "Ireland"
                            }
                        }
                    ],
                    "total_count": 26,
                    "next_page_token": "66d3cbe3d9c8b09ddca932a1"
                },
                code: 0,
                message: 'success',
                request_id: "02480480234234"
            }

            const mockRequest = jest.fn().mockResolvedValue(mockRes);

            const product = new ProductModule(mockRequest);

            const paramInput: SearchResponsiblePersonsParam = {
                body: {
                    responsible_person_ids: ["66d3cbe4d9c8b09ddca932a7"],
                    keyword: "John"
                },
                query: {
                    page_size: 1
                }
            };

            const result = await product.searchResponsiblePersons(paramInput);

            expect(mockRequest).toHaveBeenCalledWith({
                method: 'POST',
                path: `/product/202409/compliance/responsible_persons/search`,
                body: paramInput.body,
                query: paramInput.query,
            });

            expect(result).toEqual(mockRes);
        });

        it("edit responsible person using editResponsiblePersons", async () => {
            const mockRes: TikTokAPIResponse<{}> = {
                data: {},
                code: 0,
                message: 'success',
                request_id: "02480480234234"
            }

            const mockRequest = jest.fn().mockResolvedValue(mockRes);

            const product = new ProductModule(mockRequest);

            const paramInput: EditResponsiblePersonInput = {
                body: {
                    name: "John Doe Edit",
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
                },
                responsible_person_id: "304950349583045345"
            };

            const result = await product.editResponsiblePersons(paramInput);

            expect(mockRequest).toHaveBeenCalledWith({
                method: 'POST',
                path: `/product/202409/compliance/responsible_persons/${paramInput.responsible_person_id}/partial_edit`,
                body: paramInput.body
            });

            expect(result).toEqual(mockRes);
        });

     })

});
