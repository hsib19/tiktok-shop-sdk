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
  constructor(private request: RequestFunction) {}

  /**
   * Create a new affiliate partner campaign.
   */
  async createAffiliatePartnerCampaign(params: {
    body: CreateAffiliatePartnerCampaignBody;
  }): Promise<TikTokAPIResponse<CreateAffiliatePartnerCampaignResponse>> {
    return this.request({
      method: 'POST',
      path: '/affiliate_partner/202405/campaigns',
      body: params.body,
    });
  }

  /**
   * Partially update an existing affiliate partner campaign.
   */
  async editAffiliatePartnerCampaign(params: {
    path: { campaign_id: string };
    body: EditAffiliatePartnerCampaignBody;
  }): Promise<TikTokAPIResponse<EditAffiliatePartnerCampaignResponse>> {
    return this.request({
      method: 'POST',
      path: `/affiliate_partner/202405/campaigns/${params.path.campaign_id}/partial_edit`,
      body: params.body,
    });
  }

  /**
   * Publish an affiliate partner campaign.
   */
  async publishAffiliatePartnerCampaign(params: {
    path: { campaign_id: string };
  }): Promise<TikTokAPIResponse<Record<string, never>>> {
    return this.request({
      method: 'POST',
      path: `/affiliate_partner/202405/campaigns/${params.path.campaign_id}/publish`,
    });
  }

  /**
   * Review a product under a specific affiliate partner campaign.
   */
  async reviewAffiliatePartnerCampaign(params: {
    path: {
      campaign_id: string;
      product_id: string;
    };
    body: ReviewAffiliatePartnerCampaignProductBody;
  }): Promise<TikTokAPIResponse<unknown>> {
    return this.request({
      method: 'POST',
      path: `/affiliate_partner/202405/campaigns/${params.path.campaign_id}/products/${params.path.product_id}/review`,
      body: params.body,
    });
  }

  /**
   * Generate a promotion link for a campaign product.
   */
  async generateAffiliatePartnerCampaignProductLink(params: {
    path: {
      campaign_id: string;
      product_id: string;
    };
    body: GenerateAffiliatePartnerCampaignProductLinkBody;
  }): Promise<
    TikTokAPIResponse<GenerateAffiliatePartnerCampaignProductLinkResponse>
  > {
    return this.request({
      method: 'POST',
      path: `/affiliate_partner/202405/campaigns/${params.path.campaign_id}/products/${params.path.product_id}/promotion_link/generate`,
      body: params.body,
    });
  }

  /**
   * Retrieve detailed information for a specific campaign.
   */
  async getAffiliatePartnerCampaignDetail(params: {
    path: { campaign_id: string };
  }): Promise<TikTokAPIResponse<AffiliatePartnerCampaignDetailResponse>> {
    return this.request({
      method: 'GET',
      path: `/affiliate_partner/202405/campaigns/${params.path.campaign_id}`,
    });
  }

  /**
   * Retrieve a paginated list of affiliate partner campaigns.
   */
  async getAffiliatePartnerCampaignList(params: {
    query: GetAffiliatePartnerCampaignListQuery;
  }): Promise<TikTokAPIResponse<GetAffiliatePartnerCampaignListResponse>> {
    return this.request({
      method: 'GET',
      path: `/affiliate_partner/202405/campaigns`,
      query: params.query,
    });
  }

  /**
   * Retrieve the product list of a specific campaign.
   */
  async getAffiliatePartnerCampaignProductList(params: {
    path: { campaign_id: string };
    query: GetAffiliatePartnerCampaignProductListQuery;
  }): Promise<
    TikTokAPIResponse<GetAffiliatePartnerCampaignProductListResponse>
  > {
    return this.request({
      method: 'GET',
      path: `/affiliate_partner/202405/campaigns/${params.path.campaign_id}/products`,
      query: params.query,
    });
  }

  /**
   * Search TAP affiliate orders.
   */
  async searchTapAffiliateOrders(params: {
    query: {
      page_size: number;
      page_token: string;
    };
    body: SearchTapAffiliateOrdersBody;
  }): Promise<TikTokAPIResponse<SearchTapAffiliateOrdersResponse>> {
    return this.request({
      method: 'POST',
      path: `/affiliate_partner/202411/orders/search`,
      query: params.query,
      body: params.body,
    });
  }

  /**
   * Retrieve fulfillment and performance status for all products
   * under a specific campaign.
   */
  async getAffiliateCampaignCreatorFulfillmentStatusList(params: {
    path: { campaign_id: string };
    query?: GetAffiliateCampaignCreatorFulfillmentStatusList;
  }): Promise<
    TikTokAPIResponse<GetAffiliateCampaignCreatorFulfillmentStatusListResponse>
  > {
    return this.request({
      method: 'GET',
      path: `/affiliate_partner/202501/campaigns/${params.path.campaign_id}/products/performance`,
      query: params.query,
    });
  }

  /**
   * Search CAP affiliate orders.
   */
  async searchCAPAffiliateOrders(params: {
    query: {
      page_size: number;
      page_token: string;
    };
    body: SearchCAPAffiliateOrdersBody;
  }): Promise<TikTokAPIResponse<SearchCAPAffiliateOrdersResponse>> {
    return this.request({
      method: 'POST',
      path: `/affiliate_partner/202504/cap_order/search`,
      query: params.query,
      body: params.body,
    });
  }

  /**
   * Generate promotion links for multiple products in a campaign (batch).
   */
  async partnerGenerateMultiAffiliateCampaignProductLink(params: {
    path: { campaign_id: string };
    body: PartnerGenerateMultiAffiliateCampaignProductLinkBody;
  }): Promise<
    TikTokAPIResponse<PartnerGenerateMultiAffiliateCampaignProductLinkResponse>
  > {
    return this.request({
      method: 'POST',
      path: `/affiliate_partner/202505/campaigns/${params.path.campaign_id}/products/promotion_links/generate_batch`,
      body: params.body,
    });
  }

  /**
   * Retrieve fulfillment and performance details for a specific product
   * under a campaign.
   */
  async getAffiliateCampaignCreatorFulfillmentStatusInfo(params: {
    path: {
      campaign_id: string;
      product_id: string;
    };
    query?: GetAffiliateCampaignCreatorFulfillmentStatusInfoQuery;
  }): Promise<
    TikTokAPIResponse<GetAffiliateCampaignCreatorFulfillmentStatusInfoResponse>
  > {
    return this.request({
      method: 'GET',
      path: `/affiliate_partner/202508/campaigns/${params.path.campaign_id}/products/${params.path.product_id}/performance`,
      query: params.query,
    });
  }

  /**
   * Retrieve content performance statistics for a creator
   * on a specific campaign product.
   */
  async getAffiliateCampaignCreatorProductContentStatistics(params: {
    path: {
      campaign_id: string;
      product_id: string;
      creator_temp_id: string;
    };
    query?: GetAffiliateCampaignCreatorProductContentStatisticsQuery;
  }): Promise<
    TikTokAPIResponse<GetAffiliateCampaignCreatorProductContentStatisticsResponse>
  > {
    return this.request({
      method: 'GET',
      path: `/affiliate_partner/202508/campaigns/${params.path.campaign_id}/products/${params.path.product_id}/creator/${params.path.creator_temp_id}/content/statistics`,
      query: params.query,
    });
  }

  /**
   * Retrieve sample request status for a creator
   * on a specific campaign product.
   */
  async getAffiliateCampaignCreatorProductSampleStatus(params: {
    path: {
      campaign_id: string;
      product_id: string;
      creator_temp_id: string;
    };
  }): Promise<
    TikTokAPIResponse<GetAffiliateCampaignCreatorProductSampleStatusResponse>
  > {
    return this.request({
      method: 'GET',
      path: `/affiliate_partner/202508/campaigns/${params.path.campaign_id}/products/${params.path.product_id}/creator/${params.path.creator_temp_id}/content/statistics/sample/status`,
    });
  }
}
