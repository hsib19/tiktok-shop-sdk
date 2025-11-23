import {
  CombinablePackageBody,
  CombinePackageResponse,
  CreateFirstMileBundleBody,
  CreateFirstMileBundleResponse,
  CreatePackageBody,
  CreatePackagesResponse,
  GetEligibleShippingServiceInput,
  GetEligibleShippingServiceResponse,
  GetOrderSplitAttributesQuery,
  GetOrderSplitAttributesResponse,
  GetPackageHandoverTimeSlotsResponse,
  RequestFunction,
  SearchCombinablePackagesQuery,
  SearchCombinablePackagesResponse,
  SearchPackageInput,
  SearchPackageResponse,
  SplitOrdersQuery,
  SplittableGroupsResponse,
  TikTokAPIResponse,
  UncombinePackagesBody,
  UncombinePackagesResponse,
} from "@types";

/**
 * FulfillmentModule provides access to TikTok Shop Partner Fulfillment APIs.
 * Reference: https://partner.tiktokshop.com/docv2/page/650b2044f1fd3102b93c9178
 */
export class FulfillmentModule {
  constructor(private request: RequestFunction) {}

  /**
   * Get whether an order can be split.
   *
   * Reference: https://partner.tiktokshop.com/docv2/page/get-order-split-attributes-202309
   */
  getOrderSplitAttributes(
    params: GetOrderSplitAttributesQuery,
  ): Promise<TikTokAPIResponse<GetOrderSplitAttributesResponse>> {
    return this.request({
      method: "GET",
      path: `/fulfillment/202309/orders/split_attributes`,
      query: params,
    });
  }

  /**
   * Split an order into multiple packages.
   *
   * Reference: https://partner.tiktokshop.com/docv2/page/split-orders-202309
   */
  splitOrders(
    params: SplitOrdersQuery,
  ): Promise<TikTokAPIResponse<SplittableGroupsResponse>> {
    return this.request({
      method: "POST",
      path: `/fulfillment/202309/orders/${params.order_id}/split`,
      body: params.body,
    });
  }

  /**
   * Query eligible shipping services for an order.
   *
   * Reference: https://partner.tiktokshop.com/docv2/page/get-eligible-shipping-service-202309
   */
  getEligibleShippingService(
    params: GetEligibleShippingServiceInput,
  ): Promise<TikTokAPIResponse<GetEligibleShippingServiceResponse>> {
    return this.request({
      method: "POST",
      path: `/fulfillment/202309/orders/${params.order_id}/shipping_services/query`,
      body: params.body,
    });
  }

  /**
   * Search for packages by query.
   *
   * Reference: https://partner.tiktokshop.com/docv2/page/search-package-202309
   */
  searchPackage(
    params: SearchPackageInput,
  ): Promise<TikTokAPIResponse<SearchPackageResponse>> {
    return this.request({
      method: "POST",
      path: `/fulfillment/202309/packages/search`,
      query: params.query,
      body: params.body,
    });
  }

  /**
   * Create a shipping package for an order.
   *
   * Reference: https://partner.tiktokshop.com/docv2/page/create-packages-202309
   */
  createPackage(
    params: CreatePackageBody,
  ): Promise<TikTokAPIResponse<CreatePackagesResponse>> {
    return this.request({
      method: "POST",
      path: `/fulfillment/202309/packages`,
      body: params,
    });
  }

  /**
   * Create a first mile bundle.
   *
   * Reference: https://partner.tiktokshop.com/docv2/page/create-first-mile-bundle-202407
   */
  createFirstMileBundle(
    params: CreateFirstMileBundleBody,
  ): Promise<TikTokAPIResponse<CreateFirstMileBundleResponse>> {
    return this.request({
      method: "POST",
      path: `/fulfillment/202407/bundles`,
      body: params,
    });
  }

  /**
   * Search for packages that can be combined.
   *
   * Reference: https://partner.tiktokshop.com/docv2/page/search-combinable-packages-202309
   */
  searchCombinablePackages(
    params: SearchCombinablePackagesQuery,
  ): Promise<TikTokAPIResponse<SearchCombinablePackagesResponse>> {
    return this.request({
      method: "GET",
      path: `/fulfillment/202309/combinable_packages/search`,
      query: params,
    });
  }

  /**
   * Combine multiple packages into one.
   *
   * Reference: https://partner.tiktokshop.com/docv2/page/combine-package-202309
   */
  combinablePackage(
    params: CombinablePackageBody,
  ): Promise<TikTokAPIResponse<CombinePackageResponse>> {
    return this.request({
      method: "POST",
      path: `/fulfillment/202309/packages/combine`,
      body: params,
    });
  }

  /**
   * Uncombine a previously combined package.
   *
   * Reference: https://partner.tiktokshop.com/docv2/page/uncombine-packages-202309
   */
  uncombinePackages(
    params: UncombinePackagesBody,
  ): Promise<TikTokAPIResponse<UncombinePackagesResponse>> {
    return this.request({
      method: "POST",
      path: `/fulfillment/202309/packages/${params.package_id}/uncombine`,
      body: params.body,
    });
  }

  /**
   * Get available handover time slots for a package.
   *
   * Reference: https://partner.tiktokshop.com/docv2/page/get-package-handover-time-slots-202309
   */
  getPackageHandoverTimeSlots(
    package_id: string,
  ): Promise<TikTokAPIResponse<GetPackageHandoverTimeSlotsResponse>> {
    return this.request({
      method: "GET",
      path: `/fulfillment/202309/packages/${package_id}/handover_time_slots`,
    });
  }
}
