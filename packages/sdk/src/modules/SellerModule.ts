import {
  SellerShopsResponse,
  SellerPermissionsResponse,
  RequestFunction,
  TikTokAPIResponse,
} from '@types';

/**
 * SellerModule handles requests related to seller authorization and shop-specific metadata,
 * such as retrieving the list of authorized shops and their available category permissions.
 *
 * Reference: https://partner.tiktokshop.com/docv2/page/650b1f2ff1fd3102b93c6d3d
 */
export class SellerModule {
  // The request function is injected from the SDK.
  // It is pre-configured with necessary authentication and app credentials.
  constructor(private request: RequestFunction) {}

  /**
   * Fetches a list of shops that are currently authorized for the application.
   * This endpoint requires a valid `x-tts-access-token` header, which must be included automatically by the SDK.
   *
   * API Endpoint: GET /seller/202309/shops
   *
   * @returns A Promise that resolves to TikTokAPIResponse containing SellerShopsResponse data,
   * including shop IDs, names, regions, and more.
   */
  async getActiveShops(): Promise<TikTokAPIResponse<SellerShopsResponse>> {
    return this.request({
      method: 'GET',
      path: '/seller/202309/shops',
    });
  }

  /**
   * Retrieves the permission assets for each shop, which detail what categories and features
   * the seller is allowed to access or use within the TikTok Shop ecosystem.
   *
   * API Endpoint: GET /seller/202309/permissions
   *
   * This data can be used to validate whether a seller can publish products in a specific category,
   * or whether certain features are unlocked for a given shop.
   *
   * @returns A Promise that resolves to TikTokAPIResponse containing SellerPermissionsResponse data.
   */
  async getSellerPermissions(): Promise<
    TikTokAPIResponse<SellerPermissionsResponse>
  > {
    return this.request({
      method: 'GET',
      path: '/seller/202309/permissions',
    });
  }
}
