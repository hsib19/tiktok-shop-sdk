import { ProductModule } from '../src/modules/ProductModule';
import { GetAttributesResponse, GetCategoriesQuery, GetCategoryAttributes, GetCategoryRulesQuery, GetCategoryRulesResponse, RecommendCategoryByProductParams, RecommendCategoryByProductResponse, TikTokAPIResponse } from '../src/types'

describe('ProductModule', () => {
    let mockRequest: jest.Mock;
    let productModule: ProductModule;

    beforeEach(() => {
        mockRequest = jest.fn();
        productModule = new ProductModule(mockRequest);
    });

    describe('getProductPrerequisites', () => {
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
    });

    describe('getCategories', () => {
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
        
    });
});
