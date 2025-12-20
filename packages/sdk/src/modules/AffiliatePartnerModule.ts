import {
  CreateAffiliatePartnerCampaignBody,
  CreateAffiliatePartnerCampaignResponse,
  RequestFunction,
  TikTokAPIResponse,
} from '@types';

export class AffiliatePartnerModule {
  /**
   * Initializes the module with a pre-configured request function.
   *
   * @param request The injected request function from the SDK.
   */
  constructor(private request: RequestFunction) {}

  async createAffiliatePartnerCampaign(
    body: CreateAffiliatePartnerCampaignBody,
  ): Promise<TikTokAPIResponse<CreateAffiliatePartnerCampaignResponse>> {
    return this.request({
      method: 'POST',
      path: '/affiliate_partner/202405/campaigns',
      body,
    });
  }
}
