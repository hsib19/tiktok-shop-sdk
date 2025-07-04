import { PromotionModule } from '../PromotionModule';
import { CreateActivityBody, CreateActivityResponse, DeactivateActivityResponse, GetActivityResponse, GetCouponResponse, RemoveActivityProductBody, RemoveActivityProductInput, RemoveActivityProductResponse, RequestFunction, SearchActivityBody, SearchActivityResponse, SearchCouponBody, SearchCouponResponse, TikTokAPIResponse, UpdateActivityBody, UpdateActivityProductBody, UpdateActivityProductResponse } from '@types';

describe('PromotionModule', () => {
    let requestMock: jest.MockedFunction<RequestFunction> = jest.fn();
    let promotion: PromotionModule;

    beforeEach(() => {
        requestMock = jest.fn();
        promotion = new PromotionModule(requestMock);
    });

    it('should call createActivity with correct params', async () => {
        const params: CreateActivityBody = { 
            title: "DiscountEvent07041",
            activity_type: "FIXED_PRICE",
            product_level: "PRODUCT",
            duration_type: "INDEFINITE",
            begin_time: Math.floor(new Date("2025-07-04T00:00:00+07:00").getTime() / 1000),
            end_time: Math.floor(new Date("2025-07-05T00:00:00+07:00").getTime() / 1000),
            participation_limit: [
                {
                    type: "BUYER_NO_LIMIT"
                }
            ],
            discount: {
                shipping_discount: {
                    threshold_type: "MINIMAL_ITEM_QUANTITY",
                    threshold_value: "3",
                    type: "DISCOUNT_SHIPPING_FEE",
                    value: "10500",
                    shipping_method: "STANDARD_SHIPPING",
                    inventory_type: "SELF_FULFILLED",
                    area_scope: {
                        type: "WHOLE",
                        specific_areas: ["DKI Jakarta", "Jawa Barat"]
                    }
                },
                bmsm_discount: {
                    details: [
                        {
                            tier: 1,
                            threshold_type: "MINIMAL_ITEM_QUANTITY",
                            threshold_value: "5",
                            type: "PERCENTAGE_OFF",
                            value: "10"
                        }
                    ]
                }
            }
         };
        const mockResponse: TikTokAPIResponse<CreateActivityResponse> = { 
            code: 0,
            message: "Success",
            request_id: "2398290482034234",
            data: {
                activity_id: "09538947539459345",
            }
         };
        requestMock.mockResolvedValueOnce(mockResponse);

        const result = await promotion.createActivity(params);

        expect(requestMock).toHaveBeenCalledWith({
            method: 'POST',
            path: '/promotion/202309/activities',
            body: params,
        });
        expect(result).toBe(mockResponse);
    });

    it('should call updateActivity with correct params', async () => {
        const params: UpdateActivityBody = { 
            activity_id: "7523240167205979921",
            title: "SpecialRamadhanPromo",
            activity_type: "FIXED_PRICE",
            product_level: "PRODUCT",
            duration_type: "INDEFINITE",
            begin_time: 1752166800,
            end_time: Math.floor(new Date("2025-07-28T00:00:00+07:00").getTime() / 1000),
            participation_limit: [
                {
                    type: "BUYER_LIMIT_ONLY_ONE"
                }
            ],
            discount: {
                shipping_discount: {
                    threshold_type: "MINIMAL_ITEM_QUANTITY",
                    threshold_value: "2",
                    type: "DISCOUNT_SHIPPING_FEE",
                    value: "15000",
                    shipping_method: "STANDARD_SHIPPING",
                    inventory_type: "SELF_FULFILLED",
                    area_scope: {
                        type: "WHOLE",
                        specific_areas: ["Jawa Tengah", "Bali"]
                    }
                },
                bmsm_discount: {
                    details: [
                        {
                            tier: 1,
                            threshold_type: "MINIMAL_ITEM_QUANTITY",
                            threshold_value: "3",
                            type: "PERCENTAGE_OFF",
                            value: "20"
                        }
                    ]
                }
            }
         };
        const mockResponse: TikTokAPIResponse<UpdateActivityProductResponse> = { 
            code: 0,
            message: "Success",
            request_id: "2398290482034234",
            data: {
                activity_id: "093485390450345"
            }
         };
        requestMock.mockResolvedValueOnce(mockResponse);

        const result = await promotion.updateActivity(params);

        expect(requestMock).toHaveBeenCalledWith({
            method: 'PUT',
            path: '/promotion/202309/activities/7523240167205979921',
            body: params,
        });
        expect(result).toBe(mockResponse);
    });

    it('should call deactivateActivity with correct activity_id', async () => {
        const mockResponse: TikTokAPIResponse<DeactivateActivityResponse> = { 
            code: 0,
            message: "Success",
            request_id: "2398290482034234",
            data: {
                activity_id: "093485390450345"
            }
         };
        requestMock.mockResolvedValueOnce(mockResponse);

        const result = await promotion.deactivateActivity('7136104288010372865');

        expect(requestMock).toHaveBeenCalledWith({
            method: 'POST',
            path: '/promotion/202309/activities/7136104288010372865/deactivate',
        });
        expect(result).toBe(mockResponse);
    });

    it('should call getActivity with correct activity_id', async () => {
        const mockResponse: TikTokAPIResponse<GetActivityResponse> = { 
            code: 0,
            message: "Success",
            request_id: "2398290482034234",
            data: {
                activity_id: "093485390450345"
            }
         };
        requestMock.mockResolvedValueOnce(mockResponse);

        const result = await promotion.getActivity('7136104288010372865');

        expect(requestMock).toHaveBeenCalledWith({
            method: 'GET',
            path: '/promotion/202309/activities/7136104288010372865',
        });
        expect(result).toBe(mockResponse);
    });

    it('should call searchActivity with correct body', async () => {
        const body: SearchActivityBody = { 
            status: 'DEACTIVATED'
        };
        const mockResponse: TikTokAPIResponse<SearchActivityResponse> = { 
            code: 0,
            message: "Success",
            request_id: "2398290482034234",
            data: {
                activities: [{
                    activity_type: 'DEACTIVATED'
                }]
            }
         };
        requestMock.mockResolvedValueOnce(mockResponse);

        const result = await promotion.searchActivity(body);

        expect(requestMock).toHaveBeenCalledWith({
            method: 'POST',
            path: '/promotion/202309/activities/search',
            body,
        });
        expect(result).toBe(mockResponse);
    });

    it('should call updateActivityProduct with correct body', async () => {
        const body: UpdateActivityProductBody = { 
            products: [
                {
                    id: "7135427619356477189",
                    activity_price_amount: "4.5",
                    discount: "10",
                    quantity_limit: -1,
                    quantity_per_user: -1,
                    skus: [
                        {
                            id: "7125688837187176194",
                            activity_price_amount: "6.5",
                            discount: "10",
                            quantity_limit: -1,
                            quantity_per_user: 10
                        }
                    ]
                }
            ],
            activity_id: "7136104288010372865"
         };
        const mockResponse: TikTokAPIResponse<UpdateActivityProductResponse> = { 
            code: 0,
            message: "Success",
            request_id: "2398290482034234",
            data: {
                activity_id: "093485390450345"
            }
         };
        requestMock.mockResolvedValueOnce(mockResponse);

        const result = await promotion.updateActivityProduct(body);

        expect(requestMock).toHaveBeenCalledWith({
            method: 'PUT',
            path: '/promotion/202309/activities/7136104288010372865/products',
            body,
        });
        expect(result).toBe(mockResponse);
    });

    it('should call removeActivityProduct with correct params', async () => {
        const params: RemoveActivityProductInput = { 
            body: {
                product_ids: [
                    "7493989962827597361"
                ],
                sku_ids: [
                    "7135657830438176513"
                ]
            },
            activity_id: "7136104288010372865"
         };
        const mockResponse: TikTokAPIResponse<RemoveActivityProductResponse> = { 
            code: 0,
            message: "Success",
            request_id: "2398290482034234",
            data: {
                activity_id: "093485390450345"
            }
         };
        requestMock.mockResolvedValueOnce(mockResponse);

        const result = await promotion.removeActivityProduct(params);

        expect(requestMock).toHaveBeenCalledWith({
            method: 'DELETE',
            path: '/promotion/202309/activities/7136104288010372865/products',
            body: params.body,
        });
        expect(result).toBe(mockResponse);
    });

    it('should call getCoupon with correct coupon_id', async () => {
        const mockResponse: TikTokAPIResponse<GetCouponResponse> = { 
            code: 0,
            message: "Success",
            request_id: "2398290482034234",
            data: {
                coupon: {
                    id: "0349750345903"
                }
            }
         };
        requestMock.mockResolvedValueOnce(mockResponse);

        const result = await promotion.getCoupon('coupon123');

        expect(requestMock).toHaveBeenCalledWith({
            method: 'GET',
            path: '/promotion/202406/coupons/coupon123',
        });
        expect(result).toBe(mockResponse);
    });

    it('should call searchCoupon with correct body', async () => {
        const body: SearchCouponBody = { 
            status: [
                "ONGOING"
            ],
            title_keyword: "Coupon123",
            display_type: [
                "CHAT"
            ]
         };
        const mockResponse: TikTokAPIResponse<SearchCouponResponse> = { 
            code: 0,
            message: "Success",
            request_id: "2398290482034234",
            data: {
                total_count: 20,
                next_page_token: '',
                coupons: [{
                    id: "045893045345345"
                }]
            }
         };
        requestMock.mockResolvedValueOnce(mockResponse);

        const result = await promotion.searchCoupon(body);

        expect(requestMock).toHaveBeenCalledWith({
            method: 'DELETE',
            path: '/promotion/202406/coupons/search',
            body,
        });
        expect(result).toBe(mockResponse);
    });
});
