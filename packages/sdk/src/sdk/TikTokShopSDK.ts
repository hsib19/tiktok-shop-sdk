import { request, requestMultipart } from '@client';
import {
  AffiliatePartnerModule,
  AffiliateSellerModule,
  AnalyticsModule,
  AuthModule,
  EventModule,
  FinanceModule,
  FulfillmentModule,
  LogisticModule,
  OrderModule,
  ProductModule,
  PromotionModule,
  ReturnRefundModule,
  SellerModule,
  ShopModule,
} from '@modules';
import { DEFAULT_BASE_URL, SDKConfig } from '@sdk';
import { MultipartRequestFunction, RequestFunction } from '@types';

/**
 * TikTokShopSDK is the main entry point to interact with TikTok Shop API.
 * It groups together different modules such as auth, product, authorization, etc.
 */
export class TikTokShopSDK {
  // Public API modules
  public auth: AuthModule;
  public shop: ShopModule;
  public event: EventModule;
  public seller: SellerModule;
  public product: ProductModule;
  public order: OrderModule;
  public logistic: LogisticModule;
  public return_refund: ReturnRefundModule;
  public finance: FinanceModule;
  public fulfillment: FulfillmentModule;
  public promotion: PromotionModule;
  public analytics: AnalyticsModule;
  public affiliateSeller: AffiliateSellerModule;
  public affiliatePartner: AffiliatePartnerModule;

  // Internally stored access token (used in headers)
  private accessToken?: string;
  private shopCipher?: string;
  private categoryAssetsCipher?: string;

  request: RequestFunction;
  requestCipher: RequestFunction;
  requestMultipart: MultipartRequestFunction;

  constructor(private config: SDKConfig) {
    /**
     * Wrapper function for all requests.
     * Injects baseURL, app credentials, and accessToken into each request call.
     */

    const requestWithConfig: RequestFunction = (params) =>
      request({
        ...params,
        config: {
          ...this.config,
          baseURL: DEFAULT_BASE_URL,
          accessToken: this.accessToken,
        },
      });

    const requestWithConfigCipher: RequestFunction = (params) =>
      request({
        ...params,
        config: {
          ...this.config,
          baseURL: DEFAULT_BASE_URL,
          accessToken: this.accessToken,
          shopCipher: this.shopCipher,
          categoryAssetsCipher: this.categoryAssetsCipher,
        },
      });

    const requestMultipartWithConfigCipher: MultipartRequestFunction = (
      params,
    ) =>
      requestMultipart({
        ...params,
        config: {
          ...this.config,
          baseURL: DEFAULT_BASE_URL,
          accessToken: this.accessToken,
          shopCipher: this.shopCipher,
          categoryAssetsCipher: this.categoryAssetsCipher,
        },
      });

    this.request = requestWithConfig;
    this.requestCipher = requestWithConfigCipher;
    this.requestMultipart = requestMultipartWithConfigCipher;

    // Initialize each module with necessary configuration or request wrapper
    this.auth = new AuthModule(this.config); // Auth doesn't use access token
    this.shop = new ShopModule(requestWithConfig);
    this.event = new EventModule(requestWithConfigCipher);
    this.seller = new SellerModule(requestWithConfig);
    this.product = new ProductModule(
      requestWithConfigCipher,
      requestMultipartWithConfigCipher,
    );
    this.order = new OrderModule(requestWithConfigCipher);
    this.logistic = new LogisticModule(requestWithConfigCipher);
    this.return_refund = new ReturnRefundModule(requestWithConfigCipher);
    this.finance = new FinanceModule(requestWithConfigCipher);
    this.fulfillment = new FulfillmentModule(requestWithConfigCipher);
    this.promotion = new PromotionModule(requestWithConfigCipher);
    this.analytics = new AnalyticsModule(requestWithConfigCipher);
    this.affiliateSeller = new AffiliateSellerModule(requestWithConfigCipher);
    this.affiliatePartner = new AffiliatePartnerModule(requestWithConfigCipher);
  }

  /**
   * Set the access token used for authenticated API calls.
   * This token will be passed in every request header as `x-tts-access-token`.
   */

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  setShopCipher(cipher: string) {
    this.shopCipher = cipher;
  }

  setCategoryAssetsCipher(cipher: string) {
    this.categoryAssetsCipher = cipher;
  }
}
