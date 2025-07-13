import { AnalyticsModule } from '../AnalyticsModule';
import {
    GetShopPerformanceQuery,
    GetShopPerformanceResponse,
    GetShopProductPerformanceListQuery,
    GetShopProductPerformanceListResponse,
    GetShopProductPerformanceParams,
    GetShopProductPerformanceResponse,
    GetShopSKUPerformanceListQuery,
    GetShopSKUPerformanceListResponse,
    GetShopSKUPerformanceParams,
    GetShopSKUPerformanceParamsResponse,
    GetShopVideoPerformanceDetailsParams,
    GetShopVideoPerformanceDetailsResponse,
    GetShopVideoPerformanceListQuery,
    GetShopVideoPerformanceListResponse,
    GetShopVideoPerformanceOverviewQuery,
    GetShopVideoPerformanceOverviewResponse,
    GetShopVideoProductPerformanceListParams,
    GetShopVideoProductPerformanceListResponse,
    TikTokAPIResponse,
} from '@types';

const mockRequest = jest.fn();

const analytics = new AnalyticsModule(mockRequest);

describe('AnalyticsModule', () => {
    beforeEach(() => {
        mockRequest.mockReset();
    });

    it('calls getShopPerformance with correct path and query', async () => {
        const query: GetShopPerformanceQuery = {
            start_date_ge: '2024-07-01',
            end_date_lt: '2024-07-10',
        };

        const expectedResponse: TikTokAPIResponse<GetShopPerformanceResponse> = {
            code: 0,
            message: "Success",
            request_id: "0398503459345",
            data: {},
        };

        mockRequest.mockResolvedValueOnce(expectedResponse);

        const result = await analytics.getShopPerformance(query);
        expect(mockRequest).toHaveBeenCalledWith({
            method: 'GET',
            path: '/analytics/202405/shop/performance',
            query,
        });
        expect(result).toEqual(expectedResponse);
    });

    it('calls getShopProductPerformance', async () => {
        const params: GetShopProductPerformanceParams = {
            product_id: '123',
            query: {
                start_date_ge: '2024-07-01',
                end_date_lt: '2024-07-10',
            },
        };

        const expectedResponse: TikTokAPIResponse<GetShopProductPerformanceResponse> = {
            code: 0,
            message: "Success",
            request_id: "0398503459345",
            data: {},
        };

        mockRequest.mockResolvedValueOnce(expectedResponse);

        const result = await analytics.getShopProductPerformance(params);
        expect(mockRequest).toHaveBeenCalledWith({
            method: 'GET',
            path: '/analytics/202405/shop_products/123/performance',
            query: params.query,
        });
        expect(result).toEqual(expectedResponse);
    });

    it('calls getShopProductPerformanceList', async () => {
        const query: GetShopProductPerformanceListQuery = {
            start_date_ge: '2024-07-01',
            end_date_lt: '2024-07-10',
        };

        const expectedResponse: TikTokAPIResponse<GetShopProductPerformanceListResponse> = {
            code: 0,
            message: "Success",
            request_id: "0398503459345",
            data: {},
        };

        mockRequest.mockResolvedValueOnce(expectedResponse);

        const result = await analytics.getShopProductPerformanceList(query);
        expect(mockRequest).toHaveBeenCalledWith({
            method: 'GET',
            path: '/analytics/202405/shop_products/performance',
            query,
        });
        expect(result).toEqual(expectedResponse);
    });

    it('calls getShopSKUPerformance', async () => {
        const params: GetShopSKUPerformanceParams = {
            sku_id: 'sku-1',
            query: {
                start_date_ge: '2024-07-01',
                end_date_lt: '2024-07-10',
            },
        };

        const expectedResponse: TikTokAPIResponse<GetShopSKUPerformanceParamsResponse> = {
            code: 0,
            message: "Success",
            request_id: "0398503459345",
            data: {},
        };

        mockRequest.mockResolvedValueOnce(expectedResponse);

        const result = await analytics.getShopSKUPerformance(params);
        expect(mockRequest).toHaveBeenCalledWith({
            method: 'GET',
            path: '/analytics/202406/shop_skus/sku-1/performance',
            query: params.query,
        });
        expect(result).toEqual(expectedResponse);
    });

    it('calls getShopSKUPerformanceList', async () => {
        const query: GetShopSKUPerformanceListQuery = {
            start_date_ge: '2024-07-01',
            end_date_lt: '2024-07-10',
        };

        const expectedResponse: TikTokAPIResponse<GetShopSKUPerformanceListResponse> = {
            code: 0,
            message: "Success",
            request_id: "0398503459345",
            data: {},
        };

        mockRequest.mockResolvedValueOnce(expectedResponse);

        const result = await analytics.getShopSKUPerformanceList(query);
        expect(mockRequest).toHaveBeenCalledWith({
            method: 'GET',
            path: '/analytics/202406/shop_skus/performance',
            query,
        });
        expect(result).toEqual(expectedResponse);
    });

    it('calls getShopVideoPerformanceList', async () => {
        const query: GetShopVideoPerformanceListQuery = {
            start_date_ge: '2024-07-01',
            end_date_lt: '2024-07-10',
        };

        const expectedResponse: TikTokAPIResponse<GetShopVideoPerformanceListResponse> = {
             code: 0,
            message: "Success",
            request_id: "0398503459345",
            data: {},
        };

        mockRequest.mockResolvedValueOnce(expectedResponse);

        const result = await analytics.getShopVideoPerformanceList(query);
        expect(mockRequest).toHaveBeenCalledWith({
            method: 'GET',
            path: '/analytics/202409/shop_videos/performance',
            query,
        });
        expect(result).toEqual(expectedResponse);
    });

    it('calls getShopVideoPerformanceOverview', async () => {
        const query: GetShopVideoPerformanceOverviewQuery = {
            start_date_ge: '2024-07-01',
            end_date_lt: '2024-07-10',
        };

        const expectedResponse: TikTokAPIResponse<GetShopVideoPerformanceOverviewResponse> = {
             code: 0,
            message: "Success",
            request_id: "0398503459345",
            data: {},
        };

        mockRequest.mockResolvedValueOnce(expectedResponse);

        const result = await analytics.getShopVideoPerformanceOverview(query);
        expect(mockRequest).toHaveBeenCalledWith({
            method: 'GET',
            path: '/analytics/202409/shop_videos/overview_performance',
            query,
        });
        expect(result).toEqual(expectedResponse);
    });

    it('calls getShopVideoPerformanceDetails', async () => {
        const params: GetShopVideoPerformanceDetailsParams = {
            video_id: 'vid-001',
            query: {
                start_date_ge: '2024-07-01',
                end_date_lt: '2024-07-10',
            },
        };

        const expectedResponse: TikTokAPIResponse<GetShopVideoPerformanceDetailsResponse> = {
             code: 0,
            message: "Success",
            request_id: "0398503459345",
            data: {},
        };

        mockRequest.mockResolvedValueOnce(expectedResponse);

        const result = await analytics.getShopVideoPerformanceDetails(params);
        expect(mockRequest).toHaveBeenCalledWith({
            method: 'GET',
            path: '/analytics/202409/shop_videos/vid-001/performance',
            query: params.query,
        });
        expect(result).toEqual(expectedResponse);
    });

    it('calls getShopVideoProductPerformanceList', async () => {
        const params: GetShopVideoProductPerformanceListParams = {
            video_id: 'vid-002',
            query: {
                start_date_ge: '2024-07-01',
                end_date_lt: '2024-07-10',
            },
        };

        const expectedResponse: TikTokAPIResponse<GetShopVideoProductPerformanceListResponse> = {
             code: 0,
            message: "Success",
            request_id: "0398503459345",
            data: {},
        };

        mockRequest.mockResolvedValueOnce(expectedResponse);

        const result = await analytics.getShopVideoProductPerformanceList(params);
        expect(mockRequest).toHaveBeenCalledWith({
            method: 'GET',
            path: '/analytics/202409/shop_videos/vid-002/products/performance',
            query: params.query,
        });
        expect(result).toEqual(expectedResponse);
    });
    });
