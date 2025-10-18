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
  RequestFunction,
  TikTokAPIResponse,
} from '@types';

/**
 * AnalyticsModule provides methods to access shop-related analytics data,
 * including performance metrics for shops, products, SKUs, and shop videos.
 * All endpoints require a valid access token (`x-tts-access-token` header).
 */
export class AnalyticsModule {
  /**
   * Initializes the module with a pre-configured request function.
   * @param request The injected request function from the SDK.
   */
  constructor(private request: RequestFunction) {}

  /**
   * Retrieve overall performance metrics for the authorized shops.
   *
   * @returns A promise resolving to performance data of the shops.
   * Endpoint: `GET /analytics/202405/shop/performance`
   */
  async getShopPerformance(
    query: GetShopPerformanceQuery,
  ): Promise<TikTokAPIResponse<GetShopPerformanceResponse>> {
    return this.request({
      method: 'GET',
      path: '/analytics/202405/shop/performance',
      query,
    });
  }

  /**
   * Retrieve performance metrics of a specific product within the authorized shop.
   * Requires replacing `{product_id}` in the path with a valid product ID.
   *
   * @returns A promise resolving to product performance data.
   * Endpoint: `GET /analytics/202405/shop_products/{product_id}/performance`
   */
  async getShopProductPerformance(
    params: GetShopProductPerformanceParams,
  ): Promise<TikTokAPIResponse<GetShopProductPerformanceResponse>> {
    return this.request({
      method: 'GET',
      path: `/analytics/202405/shop_products/${params.product_id}/performance`,
      query: params.query,
    });
  }

  /**
   * Retrieve a list of performance metrics for all products in the authorized shop.
   *
   * @returns A promise resolving to performance data of multiple products.
   * Endpoint: `GET /analytics/202405/shop_products/performance`
   */
  async getShopProductPerformanceList(
    query: GetShopProductPerformanceListQuery,
  ): Promise<TikTokAPIResponse<GetShopProductPerformanceListResponse>> {
    return this.request({
      method: 'GET',
      path: '/analytics/202405/shop_products/performance',
      query,
    });
  }

  /**
   * Retrieve performance data of a specific SKU.
   * Requires replacing `{sku_id}` in the path with a valid SKU ID.
   *
   * @returns A promise resolving to SKU performance data.
   * Endpoint: `GET /analytics/202406/shop_skus/{sku_id}/performance`
   */
  async getShopSKUPerformance(
    params: GetShopSKUPerformanceParams,
  ): Promise<TikTokAPIResponse<GetShopSKUPerformanceParamsResponse>> {
    return this.request({
      method: 'GET',
      path: `/analytics/202406/shop_skus/${params.sku_id}/performance`,
      query: params.query,
    });
  }

  /**
   * Retrieve performance metrics for all SKUs in the authorized shop.
   *
   * @returns A promise resolving to performance data of multiple SKUs.
   * Endpoint: `GET /analytics/202406/shop_skus/performance`
   */
  async getShopSKUPerformanceList(
    query: GetShopSKUPerformanceListQuery,
  ): Promise<TikTokAPIResponse<GetShopSKUPerformanceListResponse>> {
    return this.request({
      method: 'GET',
      path: '/analytics/202406/shop_skus/performance',
      query,
    });
  }

  /**
   * Retrieve performance data for all shop videos.
   *
   * @returns A promise resolving to performance metrics for shop videos.
   * Endpoint: `GET /analytics/202409/shop_videos/performance`
   */
  async getShopVideoPerformanceList(
    query: GetShopVideoPerformanceListQuery,
  ): Promise<TikTokAPIResponse<GetShopVideoPerformanceListResponse>> {
    return this.request({
      method: 'GET',
      path: '/analytics/202409/shop_videos/performance',
      query,
    });
  }

  /**
   * Retrieve overview performance metrics across all shop videos.
   *
   * @returns A promise resolving to summarized video performance data.
   * Endpoint: `GET /analytics/202409/shop_videos/overview_performance`
   */
  async getShopVideoPerformanceOverview(
    query: GetShopVideoPerformanceOverviewQuery,
  ): Promise<TikTokAPIResponse<GetShopVideoPerformanceOverviewResponse>> {
    return this.request({
      method: 'GET',
      path: '/analytics/202409/shop_videos/overview_performance',
      query,
    });
  }

  /**
   * Retrieve performance metrics for a specific video.
   * Requires replacing `{video_id}` in the path with a valid video ID.
   *
   * @returns A promise resolving to detailed video performance data.
   * Endpoint: `GET /analytics/202409/shop_videos/{video_id}/performance`
   */
  async getShopVideoPerformanceDetails(
    params: GetShopVideoPerformanceDetailsParams,
  ): Promise<TikTokAPIResponse<GetShopVideoPerformanceDetailsResponse>> {
    return this.request({
      method: 'GET',
      path: `/analytics/202409/shop_videos/${params.video_id}/performance`,
      query: params.query,
    });
  }

  /**
   * Retrieve performance data of products featured in a specific video.
   * Requires replacing `{video_id}` in the path with a valid video ID.
   *
   * @returns A promise resolving to performance metrics of products shown in the video.
   * Endpoint: `GET /analytics/202409/shop_videos/{video_id}/products/performance`
   */
  async getShopVideoProductPerformanceList(
    params: GetShopVideoProductPerformanceListParams,
  ): Promise<TikTokAPIResponse<GetShopVideoProductPerformanceListResponse>> {
    return this.request({
      method: 'GET',
      path: `/analytics/202409/shop_videos/${params.video_id}/products/performance`,
      query: params.query,
    });
  }
}
