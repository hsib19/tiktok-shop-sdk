import {
  AuthorizedShopsResponse,
  CategoryAssetsResponse,
  RequestFunction,
  TikTokAPIResponse,
} from '@types';

/**
 * ShopModule handles requests related to authorization and shop-specific data,
 * such as retrieving the list of authorized shops and associated category assets.
 */
export class ShopModule {
  // Request function is injected from SDK and pre-configured with auth and app config
  constructor(private request: RequestFunction) {}

  /**
   * Retrieve a list of shops authorized for the current app and access token.
   * Requires a valid `x-tts-access-token` header to be set.
   *
   * @returns A promise resolving to a list of authorized shop details.
   */
  async getAuthorizedShops(): Promise<
    TikTokAPIResponse<AuthorizedShopsResponse>
  > {
    return this.request({
      method: 'GET',
      path: '/authorization/202309/shops',
    });
  }

  /**
   * Retrieve a list of available category assets for the authorized shops.
   * These assets are used to guide content or listing decisions within each shop.
   *
   * @returns A promise resolving to the category assets data.
   */
  async getCategoryAssets(): Promise<
    TikTokAPIResponse<CategoryAssetsResponse>
  > {
    return this.request({
      method: 'GET',
      path: '/authorization/202405/category_assets',
    });
  }
}
