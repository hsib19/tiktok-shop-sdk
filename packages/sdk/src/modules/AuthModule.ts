import { authRequest } from '@client';
import {
  GetAccessTokenParams,
  AccessTokenResponse,
  RefreshAccessTokenParams,
  TikTokAPIResponse,
} from '@types';
import { SDKConfig } from '@sdk';

/**
 * AuthModule handles authentication-related requests for the TikTok Shop API.
 * This includes getting and refreshing access tokens.
 */
export class AuthModule {
  constructor(private config: SDKConfig) {}

  /**
   * Exchange an authorization code for an access token.
   * This method should be used after the user authorizes your app and you receive a code.
   *
   * @param params - Includes `auth_code` and optional `grant_type`
   * @returns Promise resolving to an AccessTokenResponse object
   */
  async getAccessToken(
    params: GetAccessTokenParams,
  ): Promise<TikTokAPIResponse<AccessTokenResponse>> {
    return authRequest({
      method: 'GET',
      path: '/api/v2/token/get',
      query: {
        app_key: this.config.appKey,
        app_secret: this.config.appSecret,
        grant_type: 'authorized_code',
        auth_code: params.auth_code,
      },
    });
  }

  /**
   * Refresh an existing access token using a refresh token.
   * This is useful when the original access token has expired.
   *
   * @param params - Includes `refresh_token` and `grant_type`
   * @returns Promise resolving to an AccessTokenResponse object
   */
  async refreshAccessToken(
    params: RefreshAccessTokenParams,
  ): Promise<TikTokAPIResponse<AccessTokenResponse>> {
    return authRequest({
      method: 'GET',
      path: '/api/v2/token/refresh',
      query: {
        app_key: this.config.appKey,
        app_secret: this.config.appSecret,
        grant_type: 'refresh_token',
        refresh_token: params.refresh_token,
      },
    });
  }
}
