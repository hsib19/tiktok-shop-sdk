import {
  AffiliatePartnerCampaignDetailResponse,
  CreateAffiliatePartnerCampaignBody,
  CreateAffiliatePartnerCampaignResponse,
  EditAffiliatePartnerCampaignBody,
  EditAffiliatePartnerCampaignResponse,
  GenerateAffiliatePartnerCampaignProductLinkBody,
  GenerateAffiliatePartnerCampaignProductLinkResponse,
  GetAffiliateCampaignCreatorFulfillmentStatusInfoQuery,
  GetAffiliateCampaignCreatorFulfillmentStatusInfoResponse,
  GetAffiliateCampaignCreatorFulfillmentStatusList,
  GetAffiliateCampaignCreatorFulfillmentStatusListResponse,
  GetAffiliateCampaignCreatorProductContentStatisticsQuery,
  GetAffiliateCampaignCreatorProductContentStatisticsResponse,
  GetAffiliateCampaignCreatorProductSampleStatusResponse,
  GetAffiliatePartnerCampaignListQuery,
  GetAffiliatePartnerCampaignListResponse,
  GetAffiliatePartnerCampaignProductListQuery,
  GetAffiliatePartnerCampaignProductListResponse,
  PartnerGenerateMultiAffiliateCampaignProductLinkBody,
  PartnerGenerateMultiAffiliateCampaignProductLinkResponse,
  RequestFunction,
  ReviewAffiliatePartnerCampaignProductBody,
  SearchCAPAffiliateOrdersBody,
  SearchCAPAffiliateOrdersResponse,
  SearchTapAffiliateOrdersBody,
  SearchTapAffiliateOrdersResponse,
  TikTokAPIResponse,
} from '@types';

/**
 * AffiliatePartnerModule
 *
 * Provides a wrapper for TikTok Affiliate Partner APIs, including:
 * - Campaign management
 * - Campaign products
 * - Promotion links
 * - Orders
 * - Creator performance & fulfillment data
 *
 * All methods delegate HTTP calls to the injected request function.
 */
export class AffiliatePartnerModule {
  /**
   * Create a new AffiliatePartnerModule instance.
   *
   * @param request Pre-configured HTTP request function from the SDK
   */
  constructor(private request: RequestFunction) {}

  /**
   * Create a new affiliate partner campaign.
   */
  async createAffiliatePartnerCampaign(
    body: CreateAffiliatePartnerCampaignBody,
  ): Promise<TikTokAPIResponse<CreateAffiliatePartnerCampaignResponse>> {
    return this.request({
      method: 'POST',
      path: '/affiliate_partner/202405/campaigns',
      body,
    });
  }

  /**
   * Partially update an existing affiliate partner campaign.
   */
  async editAffiliatePartnerCampaign(
    campaign_id: string,
    body: EditAffiliatePartnerCampaignBody,
  ): Promise<TikTokAPIResponse<EditAffiliatePartnerCampaignResponse>> {
    return this.request({
      method: 'POST',
      path: `/affiliate_partner/202405/campaigns/${campaign_id}/partial_edit`,
      body,
    });
  }

  /**
   * Publish an affiliate partner campaign.
   */
  async publishAffiliatePartnerCampaign(
    campaign_id: string,
    body: {},
  ): Promise<TikTokAPIResponse<{}>> {
    return this.request({
      method: 'POST',
      path: `/affiliate_partner/202405/campaigns/${campaign_id}/publish`,
      body,
    });
  }

  /**
   * Review a product under a specific affiliate partner campaign.
   */
  async reviewAffiliatePartnerCampaign(
    path: {
      campaign_id: string;
      product_id: string;
    },
    body: ReviewAffiliatePartnerCampaignProductBody,
  ): Promise<TikTokAPIResponse<{}>> {
    return this.request({
      method: 'POST',
      path: `/affiliate_partner/202405/campaigns/${path.campaign_id}/products/${path.product_id}/review`,
      body,
    });
  }

  /**
   * Generate a promotion link for a campaign product.
   */
  async generateAffiliatePartnerCampaignProductLink(
    path: {
      campaign_id: string;
      product_id: string;
    },
    body: GenerateAffiliatePartnerCampaignProductLinkBody,
  ): Promise<
    TikTokAPIResponse<GenerateAffiliatePartnerCampaignProductLinkResponse>
  > {
    return this.request({
      method: 'POST',
      path: `/affiliate_partner/202405/campaigns/${path.campaign_id}/products/${path.product_id}/promotion_link/generate`,
      body,
    });
  }

  /**
   * Retrieve detailed information for a specific campaign.
   */
  async getAffiliatePartnerCampaignDetail(
    campaign_id: string,
  ): Promise<TikTokAPIResponse<AffiliatePartnerCampaignDetailResponse>> {
    return this.request({
      method: 'GET',
      path: `/affiliate_partner/202405/campaigns/${campaign_id}`,
    });
  }

  /**
   * Retrieve a paginated list of affiliate partner campaigns.
   */
  async getAffiliatePartnerCampaignList(
    query: GetAffiliatePartnerCampaignListQuery,
  ): Promise<TikTokAPIResponse<GetAffiliatePartnerCampaignListResponse>> {
    return this.request({
      method: 'GET',
      path: `/affiliate_partner/202405/campaigns`,
      query,
    });
  }

  /**
   * Retrieve the product list of a specific campaign.
   */
  async getAffiliatePartnerCampaignProductList(
    path: {
      campaign_id: string;
    },
    query: GetAffiliatePartnerCampaignProductListQuery,
  ): Promise<
    TikTokAPIResponse<GetAffiliatePartnerCampaignProductListResponse>
  > {
    return this.request({
      method: 'GET',
      path: `/affiliate_partner/202405/campaigns/${path.campaign_id}/products`,
      query,
    });
  }

  /**
   * Search TAP affiliate orders.
   */
  async searchTapAffiliateOrders(
    query: {
      page_size: number;
      page_token: string;
    },
    body: SearchTapAffiliateOrdersBody,
  ): Promise<TikTokAPIResponse<SearchTapAffiliateOrdersResponse>> {
    return this.request({
      method: 'POST',
      path: `/affiliate_partner/202411/orders/search`,
      query,
      body,
    });
  }

  /**
   * Retrieve fulfillment and performance status for all products
   * under a specific campaign.
   */
  async getAffiliateCampaignCreatorFulfillmentStatusList(
    path: {
      campaign_id: string;
    },
    query?: GetAffiliateCampaignCreatorFulfillmentStatusList,
  ): Promise<
    TikTokAPIResponse<GetAffiliateCampaignCreatorFulfillmentStatusListResponse>
  > {
    return this.request({
      method: 'GET',
      path: `/affiliate_partner/202501/campaigns/${path.campaign_id}/products/performance`,
      query,
    });
  }

  /**
   * Search CAP (Creator Affiliate Program) affiliate orders.
   */
  async searchCAPAffiliateOrders(
    query: {
      page_size: number;
      page_token: string;
    },
    body: SearchCAPAffiliateOrdersBody,
  ): Promise<TikTokAPIResponse<SearchCAPAffiliateOrdersResponse>> {
    return this.request({
      method: 'POST',
      path: `/affiliate_partner/202504/cap_order/search`,
      query,
      body,
    });
  }

  /**
   * Generate promotion links for multiple products in a campaign (batch).
   */
  async partnerGenerateMultiAffiliateCampaignProductLink(
    path: {
      campaign_id: string;
    },
    body: PartnerGenerateMultiAffiliateCampaignProductLinkBody,
  ): Promise<
    TikTokAPIResponse<PartnerGenerateMultiAffiliateCampaignProductLinkResponse>
  > {
    return this.request({
      method: 'POST',
      path: `/affiliate_partner/202505/campaigns/${path.campaign_id}/products/promotion_links/generate_batch`,
      body,
    });
  }

  /**
   * Retrieve fulfillment and performance details for a specific product
   * under a campaign.
   */
  async getAffiliateCampaignCreatorFulfillmentStatusInfo(
    path: {
      campaign_id: string;
      product_id: string;
    },
    query?: GetAffiliateCampaignCreatorFulfillmentStatusInfoQuery,
  ): Promise<
    TikTokAPIResponse<GetAffiliateCampaignCreatorFulfillmentStatusInfoResponse>
  > {
    return this.request({
      method: 'GET',
      path: `/affiliate_partner/202508/campaigns/${path.campaign_id}/products/${path.product_id}/performance`,
      query,
    });
  }

  /**
   * Retrieve content performance statistics for a creator
   * on a specific campaign product.
   */
  async getAffiliateCampaignCreatorProductContentStatistics(
    path: {
      campaign_id: string;
      product_id: string;
      creator_temp_id: string;
    },
    query?: GetAffiliateCampaignCreatorProductContentStatisticsQuery,
  ): Promise<
    TikTokAPIResponse<GetAffiliateCampaignCreatorProductContentStatisticsResponse>
  > {
    return this.request({
      method: 'GET',
      path: `/affiliate_partner/202508/campaigns/${path.campaign_id}/products/${path.product_id}/creator/${path.creator_temp_id}/content/statistics`,
      query,
    });
  }

  /**
   * Retrieve sample request status for a creator
   * on a specific campaign product.
   */
  async getAffiliateCampaignCreatorProductSampleStatus(path: {
    campaign_id: string;
    product_id: string;
    creator_temp_id: string;
  }): Promise<
    TikTokAPIResponse<GetAffiliateCampaignCreatorProductSampleStatusResponse>
  > {
    return this.request({
      method: 'GET',
      path: `/affiliate_partner/202508/campaigns/${path.campaign_id}/products/${path.product_id}/creator/${path.creator_temp_id}/content/statistics/sample/status`,
    });
  }
}
