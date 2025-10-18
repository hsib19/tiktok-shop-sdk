import {
  CreateActivityBody,
  CreateActivityResponse,
  DeactivateActivityResponse,
  GetActivityResponse,
  GetCouponResponse,
  RemoveActivityProductInput,
  RemoveActivityProductResponse,
  RequestFunction,
  SearchActivityBody,
  SearchActivityResponse,
  SearchCouponBody,
  SearchCouponResponse,
  TikTokAPIResponse,
  UpdateActivityBody,
  UpdateActivityProductBody,
  UpdateActivityProductResponse,
  UpdateActivityResponse,
} from '@types';

/**
 * PromotionModule provides access to TikTok Shop Partner Promotion APIs.
 *
 * This module allows you to create promotional activities such as fixed price discounts,
 * percentage discounts, flash sales, shipping discounts, and buy-more-save-more offers.
 *
 * Official Documentation:
 * https://partner.tiktokshop.com/docv2/page/promotion-api-overview
 */
export class PromotionModule {
  constructor(private request: RequestFunction) {}

  /**
   * Create a new promotion activity.
   *
   * Supported promotion types include:
   * - FIXED_PRICE: Fixed price for products
   * - DIRECT_DISCOUNT: Percentage discount
   * - FLASHSALE: Flash sale event
   * - SHIPPING_DISCOUNT: Discount on shipping fees
   * - BUY_MORE_SAVE_MORE: Tiered discounts for bulk purchases
   *
   * Reference:
   * https://partner.tiktokshop.com/docv2/page/create-activity-202309
   */
  createActivity(
    params: CreateActivityBody,
  ): Promise<TikTokAPIResponse<CreateActivityResponse>> {
    return this.request({
      method: 'POST',
      path: `/promotion/202309/activities`,
      body: params,
    });
  }

  /**
   * Update an existing promotion activity.
   *
   * Reference:
   * https://partner.tiktokshop.com/docv2/page/update-activity-202309
   */
  updateActivity(
    params: UpdateActivityBody,
  ): Promise<TikTokAPIResponse<UpdateActivityResponse>> {
    return this.request({
      method: 'PUT',
      path: `/promotion/202309/activities/${params.activity_id}`,
      body: params,
    });
  }

  /**
   * Deactivate an existing promotion activity.
   *
   * Reference:
   * https://partner.tiktokshop.com/docv2/page/deactivate-activity-202309
   */
  deactivateActivity(
    activity_id: string,
  ): Promise<TikTokAPIResponse<DeactivateActivityResponse>> {
    return this.request({
      method: 'POST',
      path: `/promotion/202309/activities/${activity_id}/deactivate`,
    });
  }

  /**
   * Get a promotion activity by its ID.
   *
   * Reference:
   * https://partner.tiktokshop.com/docv2/page/get-activity-202309
   */
  getActivity(
    activity_id: string,
  ): Promise<TikTokAPIResponse<GetActivityResponse>> {
    return this.request({
      method: 'GET',
      path: `/promotion/202309/activities/${activity_id}`,
    });
  }

  /**
   * Search promotion activities using filters such as type, status, and time range.
   *
   * Reference:
   * https://partner.tiktokshop.com/docv2/page/search-activity-202309
   */
  searchActivity(
    body: SearchActivityBody,
  ): Promise<TikTokAPIResponse<SearchActivityResponse>> {
    return this.request({
      method: 'POST',
      path: `/promotion/202309/activities/search`,
      body,
    });
  }

  /**
   * Update products under a promotion activity.
   *
   * Reference:
   * https://partner.tiktokshop.com/docv2/page/update-activity-product-202309
   */
  updateActivityProduct(
    body: UpdateActivityProductBody,
  ): Promise<TikTokAPIResponse<UpdateActivityProductResponse>> {
    return this.request({
      method: 'PUT',
      path: `/promotion/202309/activities/${body.activity_id}/products`,
      body,
    });
  }

  /**
   * Remove products from a promotion activity.
   *
   * Reference:
   * https://partner.tiktokshop.com/docv2/page/remove-activity-product-202309
   */
  removeActivityProduct(
    params: RemoveActivityProductInput,
  ): Promise<TikTokAPIResponse<RemoveActivityProductResponse>> {
    return this.request({
      method: 'DELETE',
      path: `/promotion/202309/activities/${params.activity_id}/products`,
      body: params.body,
    });
  }

  /**
   * Retrieve a specific coupon by its ID.
   *
   * Reference:
   * https://partner.tiktokshop.com/docv2/page/get-coupon-202406
   */
  getCoupon(coupon_id: string): Promise<TikTokAPIResponse<GetCouponResponse>> {
    return this.request({
      method: 'GET',
      path: `/promotion/202406/coupons/${coupon_id}`,
    });
  }

  /**
   * Search coupons using filter options such as title, status, and time range.
   *
   * Reference:
   * https://partner.tiktokshop.com/docv2/page/search-coupon-202406
   */
  searchCoupon(
    body: SearchCouponBody,
  ): Promise<TikTokAPIResponse<SearchCouponResponse>> {
    return this.request({
      method: 'DELETE',
      path: `/promotion/202406/coupons/search`,
      body: body,
    });
  }
}
