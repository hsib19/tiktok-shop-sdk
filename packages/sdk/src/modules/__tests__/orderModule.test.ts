import { OrderModule } from '../OrderModule'; 
import type {
    RequestFunction,
    GetOrderListParams,
    GetOrderDetailParams,
    GetPriceDetailParams,
    AddExternalOrderReferencesBody,
    GetExternalOrderReferencesParams,
    SearchOrderByExternalOrderReferenceQuery,
    TikTokAPIResponse,
    GetOrderListResponse,
    GetOrderDetailResponse,
    GetPriceDetailResponse,
    GetExternalOrderReferencesResponse,
    SearchOrderByExternalOrderReferenceResponse,
} from '@types';

describe('OrderModule', () => {
    let mockRequest: jest.MockedFunction<RequestFunction>;
    let orderModule: OrderModule;

    beforeEach(() => {
        mockRequest = jest.fn();
        orderModule = new OrderModule(mockRequest);
    });

    test('getOrderList calls request with correct params', async () => {
        const params: GetOrderListParams = {
            query: { page_size: 10 },
            body: { order_status: 'UNPAID' },
        };
        const mockResponse: TikTokAPIResponse<GetOrderListResponse> = { 
            code: 0,
            request_id: "24820423434",
            message: "Success",
            data: { orders: [], total_count: 0, next_page_token: '' }
         };
        mockRequest.mockResolvedValueOnce(mockResponse);

        const result = await orderModule.getOrderList(params);

        expect(mockRequest).toHaveBeenCalledWith({
            method: 'POST',
            path: '/order/202309/orders/search',
            query: params.query,
            body: params.body,
        });
        expect(result).toBe(mockResponse);
    });

    test('getOrderDetail calls request with correct params', async () => {
        const params: GetOrderDetailParams = { ids: ['order1', 'order2'] };
        const mockResponse: TikTokAPIResponse<GetOrderDetailResponse> = {
            code: 0,
            request_id: "24820423434",
            message: "Success", data: { orders: [] } };
        mockRequest.mockResolvedValueOnce(mockResponse);

        const result = await orderModule.getOrderDetail(params);

        expect(mockRequest).toHaveBeenCalledWith({
            method: 'GET',
            path: '/order/202309/orders',
            query: params,
        });
        expect(result).toBe(mockResponse);
    });

    test('getPriceDetail calls request with correct params', async () => {
        const params: GetPriceDetailParams = { order_id: 'order123' };
        const mockResponse: TikTokAPIResponse<GetPriceDetailResponse> = {
            code: 0,
            request_id: "24820423434",
            message: "Success", data: {
                "currency": "USD",
                "total": "122.00",
                "payment": "101.00",
                "sku_list_price": "97.00",
                "sku_sale_price": "96.00",
                "subtotal": "98.00",
                "subtotal_deduction_seller": "0.50",
                "subtotal_deduction_platform": "0.50",
                "subtotal_tax_amount": "2.00",
                "voucher_deduction_platform": "1010000",
                "voucher_deduction_seller": "1020000",
                "shipping_list_price": "25.00",
                "shipping_sale_price": "3.00",
                "shipping_fee_deduction_seller": "10.00",
                "shipping_fee_deduction_platform": "12.00",
                "shipping_fee_deduction_platform_voucher": "1010000",
                "tax_amount": "2.00",
                "tax_rate": "0.021",
                "net_price_amount": "97.00",
                "cod_fee": "0.00",
                "cod_fee_net_amount": "0.00",
                "sku_gift_original_price": "2.00",
                "sku_gift_net_price": "2.02",
                "line_items": [
                    {
                        "id": "576461413032342720",
                        "currency": "USD",
                        "total": "122.00",
                        "payment": "101.00",
                        "sku_list_price": "97.00",
                        "sku_sale_price": "96.00",
                        "subtotal": "98.00",
                        "subtotal_deduction_seller": "0.50",
                        "subtotal_deduction_platform": "0.50",
                        "subtotal_tax_amount": "2.00",
                        "voucher_deduction_platform": "1010000",
                        "voucher_deduction_seller": "1020000",
                        "shipping_list_price": "25.00",
                        "shipping_sale_price": "3.00",
                        "shipping_fee_deduction_seller": "10.00",
                        "shipping_fee_deduction_platform": "12.00",
                        "shipping_fee_deduction_platform_voucher": "1010000",
                        "tax_amount": "2.00",
                        "tax_rate": "0.021",
                        "net_price_amount": "97.00",
                        "cod_fee": "0.00",
                        "cod_fee_amount": "0.00",
                        "sku_gift_original_price": "2.00",
                        "sku_gift_net_price": "2.02"
                    }
                ]
            } };
        mockRequest.mockResolvedValueOnce(mockResponse);

        const result = await orderModule.getPriceDetail(params);

        expect(mockRequest).toHaveBeenCalledWith({
            method: 'GET',
            path: `/order/202407/orders/${params.order_id}/price_detail`,
        });
        expect(result).toBe(mockResponse);
    });

    test('addExternalOrderReferences calls request with correct params', async () => {
        const body: AddExternalOrderReferencesBody = { orders: [] };
        const mockResponse: TikTokAPIResponse<object> = {
            code: 0,
            request_id: "24820423434",
            message: "Success", data: {} };
        mockRequest.mockResolvedValueOnce(mockResponse);

        const result = await orderModule.addExternalOrderReferences(body);

        expect(mockRequest).toHaveBeenCalledWith({
            method: 'POST',
            path: '/order/202406/orders/external_orders',
            body,
        });
        expect(result).toBe(mockResponse);
    });

    test('getExternalOrderReferences calls request with correct params', async () => {
        const params: GetExternalOrderReferencesParams = {
            order_id: 'order123',
            query: { platform: 'SHOPIFY' },
        };
        const mockResponse: TikTokAPIResponse<GetExternalOrderReferencesResponse> = {
            code: 0,
            request_id: "24820423434",
            message: "Success", data: { external_orders: [] } };
        mockRequest.mockResolvedValueOnce(mockResponse);

        const result = await orderModule.getExternalOrderReferences(params);

        expect(mockRequest).toHaveBeenCalledWith({
            method: 'GET',
            path: `/order/202406/orders/${params.order_id}/external_orders`,
            query: params.query,
        });
        expect(result).toBe(mockResponse);
    });

    test('searchOrderByExternalOrderReference calls request with correct params', async () => {
        const query: SearchOrderByExternalOrderReferenceQuery = {
            platform: 'SHOPIFY',
            external_order_id: 'ext123',
        };
        const mockResponse: TikTokAPIResponse<SearchOrderByExternalOrderReferenceResponse> = {
            code: 0,
            request_id: "24820423434",
            message: "Success", data: { orders: [] } };
        mockRequest.mockResolvedValueOnce(mockResponse);

        const result = await orderModule.searchOrderByExternalOrderReference(query);

        expect(mockRequest).toHaveBeenCalledWith({
            method: 'POST',
            path: '/order/202406/orders/external_order_search',
            query,
        });
        expect(result).toBe(mockResponse);
    });
});
