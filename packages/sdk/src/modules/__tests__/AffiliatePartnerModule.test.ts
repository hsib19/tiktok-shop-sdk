import { AffiliatePartnerModule } from '@modules/AffiliatePartnerModule';
import {
  CreateAffiliatePartnerCampaignBody,
  CreateAffiliatePartnerCampaignResponse,
  RequestFunction,
  TikTokAPIResponse,
} from '@types';

describe('AffiliatePartnerModule', () => {
  let module: AffiliatePartnerModule;
  let requestMock: jest.MockedFunction<RequestFunction>;

  beforeEach(() => {
    requestMock = jest.fn();
    module = new AffiliatePartnerModule(requestMock);
  });

  it('should call request with correct POST payload when creating affiliate partner campaign', async () => {
    const body: CreateAffiliatePartnerCampaignBody = {
      name: 'my first campaign',
      description: 'campaign for test',
      campaign_start_time: 1712941200,
      campaign_end_time: 1715878799,
      registration_start_time: 1712941200,
      registration_end_time: 1713891599,
      commission_rate: 1000,
      contact_info: {
        whatsapp: '+14255550100',
        email: '123456@gmail.com',
        phone: '+14255550100',
        zalo: '+14255550100',
        viber: '+14255550100',
        line: '+14255550100',
      },
      target_shop_codes: ['THCBELNL4Y'],
      target_seller_types: ['CROSS_BORDER'],
    };

    const mockResponse: TikTokAPIResponse<CreateAffiliatePartnerCampaignResponse> =
      {
        code: 0,
        message: 'success',
        data: {
          campaign_id: '123456',
        },
        request_id: '493459345454',
      };

    requestMock.mockResolvedValue(mockResponse);

    const result = await module.createAffiliatePartnerCampaign(body);

    expect(requestMock).toHaveBeenCalledTimes(1);
    expect(requestMock).toHaveBeenCalledWith({
      method: 'POST',
      path: '/affiliate_partner/202405/campaigns',
      body,
    });

    expect(result).toEqual(mockResponse);
  });
});
