import {
    GetGlobalSellerWarehousesResponse,
    GetWarehousesDeliveryOptionsResponse,
    GetWarehousesResponse,
    RequestFunction,
    TikTokAPIResponse,
} from "@types";

/**
 * LogisticModule provides methods to interact with TikTok Shop Logistics API endpoints.
 * 
 * These methods allow you to:
 * - Retrieve a list of warehouses associated with the current seller or shop
 * - Fetch global seller warehouses (for cross-border sellers)
 * - Get available delivery options for a specific warehouse
 * - Retrieve available shipping providers for a given delivery option
 * 
 * Reference: https://partner.tiktokshop.com/docv2/page/650b1e47defece02be7e755e
 */
export class LogisticModule {

    // The request function is injected from the SDK and pre-configured with authentication and app credentials
    constructor(private request: RequestFunction) { }

    /**
     * Get a list of warehouses bound to the current shop.
     * 
     * GET /logistics/202309/warehouses
     */
    getWarehouseList(): Promise<TikTokAPIResponse<GetWarehousesResponse>> {
        return this.request({
            method: 'GET',
            path: '/logistics/202309/warehouses',
        });
    }

    /**
     * Get global seller warehouses, typically used for cross-border sellers.
     * 
     * GET /logistics/202309/global_warehouses
     */
    getGlobalSellerWarehouse(): Promise<TikTokAPIResponse<GetGlobalSellerWarehousesResponse>> {
        return this.request({
            method: 'GET',
            path: '/logistics/202309/global_warehouses',
        });
    }

    /**
     * Get delivery options available for the specified warehouse.
     * 
     * GET /logistics/202309/warehouses/{warehouse_id}/delivery_options
     * 
     * @param warehouse_id - The ID of the warehouse
     */
    getWarehouseDeliveryOptions(warehouse_id: string): Promise<TikTokAPIResponse<GetWarehousesDeliveryOptionsResponse>> {
        return this.request({
            method: 'GET',
            path: `/logistics/202309/warehouses/${warehouse_id}/delivery_options`,
        });
    }

    /**
     * Get available shipping providers for the specified delivery option.
     * 
     * GET /logistics/202309/delivery_options/{delivery_option_id}/shipping_providers
     * 
     * @param delivery_option_id - The ID of the delivery option
     */
    getShippingProviders(delivery_option_id: string): Promise<TikTokAPIResponse<GetWarehousesDeliveryOptionsResponse>> {
        return this.request({
            method: 'GET',
            path: `/logistics/202309/delivery_options/${delivery_option_id}/shipping_providers`,
        });
    }
}
