import {
    RequestFunction,
    GetOrderListResponse,
    GetOrderDetailParams,
    GetPriceDetailResponse,
    GetPriceDetailParams,
    AddExternalOrderReferencesBody,
    GetExternalOrderReferencesParams,
    GetExternalOrderReferencesResponse,
    SearchOrderByExternalOrderReferenceQuery,
    SearchOrderByExternalOrderReferenceResponse,
    TikTokAPIResponse,
    GetOrderListParams,
    GetOrderDetailResponse
} from "@types";

/**
 * OrderModule handles requests related to order management
 * based on the API list from the documentation image.
 */
export class OrderModule {
    constructor(private request: RequestFunction) { }

    /**
     * Retrieves the list of orders. (POST /order/list)
     *
     * @param params Parameters for filtering and pagination.
     * @returns Promise resolving to the order list.
     */
    async getOrderList(params: GetOrderListParams): Promise<TikTokAPIResponse<GetOrderListResponse>> {
        return this.request({
            method: 'POST',
            path: '/order/202309/orders/search',
            query: params.query,
            body: params.body,
        });
    }

    /**
     * Retrieves order details by ID. (GET /order/detail)
     *
     * @param params Parameters containing the order_id.
     * @returns Promise resolving to the order details.
     */
    async getOrderDetail(params: GetOrderDetailParams): Promise<TikTokAPIResponse<GetOrderDetailResponse>> {
        return this.request({
            method: 'GET',
            path: `/order/202309/orders`, // Example path, might be `/order/v1/detail?order_id=${params.order_id}`
            query: params, // Parameters will be added as query string
        });
    }

    /**
     * Retrieves the price details of an order. (GET /order/price_detail)
     *
     * @param params Parameters containing the order_id.
     * @returns Promise resolving to the price details.
     */
    async getPriceDetail(params: GetPriceDetailParams): Promise<TikTokAPIResponse<GetPriceDetailResponse>> {
        return this.request({
            method: 'GET',
            path: `/order/202407/orders/${params.order_id}/price_detail`, // Example path, might be `/order/v1/price_detail?order_id=${params.order_id}`
        });
    }

    /**
     * Adds external order references. (POST /order/add_external_references)
     *
     * @param body Data to add external order references.
     * @returns Promise resolving to a generic API response.
     */
    async addExternalOrderReferences(body: AddExternalOrderReferencesBody): Promise<TikTokAPIResponse<object>> {
        return this.request({
            method: 'POST',
            path: '/order/202406/orders/external_orders', // Example path
            body: body,
        });
    }

    /**
     * Retrieves external order references. (GET /order/get_external_references)
     *
     * @param params Search parameters for external references.
     * @returns Promise resolving to a list of external references.
     */
    async getExternalOrderReferences(params: GetExternalOrderReferencesParams): Promise<TikTokAPIResponse<GetExternalOrderReferencesResponse>> {
        return this.request({
            method: 'GET',
            path: `/order/202406/orders/${params.order_id}/external_orders`, // Example path
            query: params.query,
        });
    }

    /**
     * Searches for an order by external order reference. (POST /order/search_by_external_reference)
     *
     * @param query Data used to search for an order using an external reference.
     * @returns Promise resolving to the found order details.
     */
    async searchOrderByExternalOrderReference(query: SearchOrderByExternalOrderReferenceQuery): Promise<TikTokAPIResponse<SearchOrderByExternalOrderReferenceResponse>> {
        return this.request({
            method: 'POST',
            path: '/order/202406/orders/external_order_search',
            query: query,
        });
    }
}
