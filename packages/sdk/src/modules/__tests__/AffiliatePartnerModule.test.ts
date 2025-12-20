import { AffiliatePartnerModule } from '@modules/AffiliatePartnerModule';
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

  it('should call request with correct POST payload when editing affiliate partner campaign', async () => {
    const campaignId = '7373988288167036678';

    const body: EditAffiliatePartnerCampaignBody = {
      name: 'test campaign',
      description: 'campaign for api test.',
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

    const mockResponse: TikTokAPIResponse<EditAffiliatePartnerCampaignResponse> =
      {
        code: 0,
        message: 'success',
        data: {
          campaign_id: campaignId,
        },
        request_id: '8749334953849534',
      };

    requestMock.mockResolvedValue(mockResponse);

    const result = await module.editAffiliatePartnerCampaign(campaignId, body);

    expect(requestMock).toHaveBeenCalledTimes(1);
    expect(requestMock).toHaveBeenCalledWith({
      method: 'POST',
      path: `/affiliate_partner/202405/campaigns/${campaignId}/partial_edit`,
      body,
    });

    expect(result).toEqual(mockResponse);
  });

  it('should call request with correct POST payload when publishing affiliate partner campaign', async () => {
    const campaignId = '7373988288167036678';

    const body = {};

    const mockResponse: TikTokAPIResponse<{}> = {
      code: 0,
      message: 'success',
      data: {},
      request_id: '23897492334',
    };

    requestMock.mockResolvedValue(mockResponse);

    const result = await module.publishAffiliatePartnerCampaign(
      campaignId,
      body,
    );

    expect(requestMock).toHaveBeenCalledTimes(1);
    expect(requestMock).toHaveBeenCalledWith({
      method: 'POST',
      path: `/affiliate_partner/202405/campaigns/${campaignId}/publish`,
      body,
    });

    expect(result).toEqual(mockResponse);
  });

  it('should call request with correct POST payload when reviewing affiliate partner campaign product', async () => {
    const pathParams = {
      campaign_id: '7373988288167036678',
      product_id: '1729384729384',
    };

    const body: ReviewAffiliatePartnerCampaignProductBody = {
      review_result: 'REJECT',
      reject_reasons: ['COMMISSION_TOO_LOW'],
    };

    const mockResponse: TikTokAPIResponse<{}> = {
      code: 0,
      message: 'success',
      data: {},
      request_id: '0239840923423',
    };

    requestMock.mockResolvedValue(mockResponse);

    const result = await module.reviewAffiliatePartnerCampaign(
      pathParams,
      body,
    );

    expect(requestMock).toHaveBeenCalledTimes(1);
    expect(requestMock).toHaveBeenCalledWith({
      method: 'POST',
      path: `/affiliate_partner/202405/campaigns/${pathParams.campaign_id}/products/${pathParams.product_id}/review`,
      body,
    });

    expect(result).toEqual(mockResponse);
  });

  it('should call request with correct POST payload when generating affiliate partner campaign product link', async () => {
    const pathParams = {
      campaign_id: '7373988288167036678',
      product_id: '1729384729384',
    };

    const body: GenerateAffiliatePartnerCampaignProductLinkBody = {
      creator_commission_rate: 10,
    };

    const mockResponse: TikTokAPIResponse<GenerateAffiliatePartnerCampaignProductLinkResponse> =
      {
        code: 0,
        message: 'success',
        data: {
          product_promotion_link: 'https://vt.tiktok.com/xxxxx',
        },
        request_id: '834935934545',
      };

    requestMock.mockResolvedValue(mockResponse);

    const result = await module.generateAffiliatePartnerCampaignProductLink(
      pathParams,
      body,
    );

    expect(requestMock).toHaveBeenCalledTimes(1);
    expect(requestMock).toHaveBeenCalledWith({
      method: 'POST',
      path: `/affiliate_partner/202405/campaigns/${pathParams.campaign_id}/products/${pathParams.product_id}/promotion_link/generate`,
      body,
    });

    expect(result).toEqual(mockResponse);
  });

  it('should call request with correct GET payload when fetching affiliate partner campaign detail', async () => {
    const campaignId = '7373988288167036678';

    const mockResponse: TikTokAPIResponse<AffiliatePartnerCampaignDetailResponse> =
      {
        code: 0,
        message: 'success',
        data: {
          campaign_id: campaignId,
          name: 'test campaign',
          status: 'PUBLISHED',
          commission_rate: 1000,
        } as AffiliatePartnerCampaignDetailResponse,
        request_id: '32098423434',
      };

    requestMock.mockResolvedValue(mockResponse);

    const result = await module.getAffiliatePartnerCampaignDetail(campaignId);

    expect(requestMock).toHaveBeenCalledTimes(1);
    expect(requestMock).toHaveBeenCalledWith({
      method: 'GET',
      path: `/affiliate_partner/202405/campaigns/${campaignId}`,
    });

    expect(result).toEqual(mockResponse);
  });

  it('should call request with correct GET payload when fetching affiliate partner campaign list', async () => {
    const query: GetAffiliatePartnerCampaignListQuery = {
      page_size: 10,
      page_token: 'next-token',
      status: 'ONGOING',
    };

    const mockResponse: TikTokAPIResponse<GetAffiliatePartnerCampaignListResponse> =
      {
        code: 0,
        message: 'success',
        data: {
          campaigns: [
            {
              id: '1',
              name: 'Campaign A',
              status: 'ONGOING',
              registration_start_time: 1712941200,
              registration_end_time: 1713891599,
              campaign_start_time: 1712941200,
              campaign_end_time: 1715878799,
            },
            {
              id: '2',
              name: 'Campaign B',
              status: 'READY',
              registration_start_time: 1712000000,
              registration_end_time: 1712500000,
              campaign_start_time: 1712600000,
              campaign_end_time: 1715000000,
            },
          ],
          next_page_token: 'next-page-token',
          total_count: 2,
        },
        request_id: '0928042034234',
      };

    requestMock.mockResolvedValue(mockResponse);

    const result = await module.getAffiliatePartnerCampaignList(query);

    expect(requestMock).toHaveBeenCalledTimes(1);
    expect(requestMock).toHaveBeenCalledWith({
      method: 'GET',
      path: `/affiliate_partner/202405/campaigns`,
      query,
    });

    expect(result).toEqual(mockResponse);
  });

  it('should call request with correct GET payload when fetching affiliate partner campaign product list', async () => {
    const pathParams = {
      campaign_id: '7373988288167036678',
    };

    const query: GetAffiliatePartnerCampaignProductListQuery = {
      page_size: 20,
      page_token: 'next-token',
      review_status: 'APPROVED',
    };

    const mockResponse: TikTokAPIResponse<GetAffiliatePartnerCampaignProductListResponse> =
      {
        code: 0,
        message: 'success',
        data: {
          products: [
            {
              id: '1729442777527587334',
              review_status: 'PENDING',
              name: 'test case number 4 test case number 4',
              main_image_url:
                'https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/fa0387fa5a204dcfa44d5be75877a163~tplv-o3syd03w52-origin-webp.webp?from=3478900499',
              lowest_price: {
                currency: 'USD',
                amount: '1.1',
              },
              highest_price: {
                currency: 'USD',
                amount: '12.21',
              },
              inventory: 89,
              shop_name: 'my_shop',
              total_commission_rate: 6600,
              creator_commission_rate: 1000,
              partner_commission_rate: 5600,
              open_collaboration_commission_rate: 1000,
              is_available: true,
              product_sales: 10,
              category: {
                id: '12222',
                name: 'COMPUTER',
              },
              sample_quota: 12,
              sku_information_list: [
                {
                  sku_name: 'factory product',
                  sku_id: '1729666531097281876',
                  inventory: {
                    available_quantity: '80',
                  },
                  base_price: {
                    region_code: 'MY',
                    currency: 'MYR',
                    list_price: '162.34',
                    sale_price: '162.34',
                    localized_dutiable_price: '141.58',
                  },
                  region_prices: [
                    {
                      region_code: 'MY',
                      currency: 'MYR',
                      list_price: '162.34',
                      sale_price: '162.34',
                      localized_dutiable_price: '141.58',
                    },
                  ],
                  properties: [
                    {
                      name: 'Spesifikasi',
                      value_name: 'lalai',
                    },
                  ],
                },
              ],
              product_description:
                '<p>This is an example product description.</p>',
            },
          ],
          next_page_token: 'absdfV231as2V0PTAK',
          total_count: 1570,
        },
        request_id: '209374029342342',
      };

    requestMock.mockResolvedValue(mockResponse);

    const result = await module.getAffiliatePartnerCampaignProductList(
      pathParams,
      query,
    );

    expect(requestMock).toHaveBeenCalledTimes(1);
    expect(requestMock).toHaveBeenCalledWith({
      method: 'GET',
      path: `/affiliate_partner/202405/campaigns/${pathParams.campaign_id}/products`,
      query,
    });

    expect(result).toEqual(mockResponse);
  });

  it('should call request with correct POST payload when searching TAP affiliate orders', async () => {
    // ✅ Arrange
    const query = {
      page_size: 20,
      page_token: 'page-token-123',
    };

    const body: SearchTapAffiliateOrdersBody = {
      campaign_id: '20398402342',
      create_time_ge: 23984792348234,
      create_time_lt: 34676343465455,
    };

    const mockResponse: TikTokAPIResponse<SearchTapAffiliateOrdersResponse> = {
      code: 0,
      message: 'Success',
      data: {
        orders: [
          {
            id: '576962796354307765',
            create_time: 1685548800,
            delivery_time: 1685548800,
            status: 'COMPLETED',
            skus: {
              id: '1729793769377925388',
              campaign_id: '7324371012170024705',
              creator_username: 'liuyi_id_creator1jigo',
              product_name: 'Black Hoodie',
              product_id: '1729435310697057093',
              price: {
                amount: '99',
                currency: 'USD',
              },
              quantity: 1,
              content_type: 'VIDEO',
              content_id: '7494337156519332665',
              creator_commission_rate: 3000,
              tap_commission_rate: 4000,
              estimated_commission_base: {
                amount: '99',
                currency: 'USD',
              },
              estimated_creator_commission: {
                amount: '100',
                currency: 'USD',
              },
              estimated_tap_commission: {
                amount: '500',
                currency: 'USD',
              },
              actual_commission_base: {
                amount: '200',
                currency: 'USD',
              },
              actual_creator_commission: {
                amount: '100',
                currency: 'USD',
              },
              actual_tap_commission: {
                amount: '99',
                currency: 'USD',
              },
              refunded_quantity: 1,
              returned_quantity: 1,
              partner_commission_reward_rate: 1000,
              estimated_partner_commission_reward_fee: {
                amount: '90',
                currency: 'USD',
              },
              actual_partner_commission_reward_fee: {
                amount: '200',
                currency: 'USD',
              },
              creator_commission_reward_rate: 2000,
              estimated_creator_commission_reward_fee: {
                amount: '300',
                currency: 'USD',
              },
              actual_creator_commission_reward_fee: {
                amount: '100',
                currency: 'USD',
              },
            },
          },
        ],
        next_page_token:
          '6AsPQsUMvH3RkchNUPPh22NROHkE0D8pmq/N5M1kHYcZmtRyv9aVrNv65W7Q6tFA+7D1ud64MPNz5OaT',
        total_count: 100,
      },
      request_id: '98237492384324',
    };

    requestMock.mockResolvedValue(mockResponse);

    const result = await module.searchTapAffiliateOrders(query, body);

    expect(requestMock).toHaveBeenCalledTimes(1);
    expect(requestMock).toHaveBeenCalledWith({
      method: 'POST',
      path: `/affiliate_partner/202411/orders/search`,
      query,
      body,
    });

    expect(result).toEqual(mockResponse);
  });

  it('should call request with correct GET payload when fetching creator fulfillment status list', async () => {
    const pathParams = {
      campaign_id: '1234567890',
    };

    const query: GetAffiliateCampaignCreatorFulfillmentStatusList = {
      page_size: 10,
      page_token: 'b2Zmc2V0PTAK',
    };

    const mockResponse: TikTokAPIResponse<GetAffiliateCampaignCreatorFulfillmentStatusListResponse> =
      {
        code: 0,
        message: 'success',
        data: {
          total_count: 10,
          campaign_product_statistics: [
            {
              data_update_time: '1736204400000',
              creator_sales_num: 1,
              collaborated_creators_num: 0,
              promoted_creator_num: 0,
              sample_requested_creator_num: 0,
              campaign_product_detail: {
                product_id: '12344',
                product_status: 'PRODUCT_UNSPECIFIED',
                product_name:
                  'summer underwear soft dress summer underwear-001',
                product_stock_count: '100',
                total_commission_percent: '6000',
                creator_commission_percent: '1000',
                partner_commission_percent: '5000',
                plan_commission_percent: '1400',
                product_price: {
                  min_price: '1.00',
                  max_price: '3.00',
                  currency: 'USD',
                },
                product_thumbnail: {
                  uri: 'tos-useast5-i-omjb5zjo8w-tx/178e97ee3b254f9ab237ea7516828266',
                  url_list: [
                    'https://p19-oec-ttp.tiktokcdn-us.com/tos-useast5-i-omjb5zjo8w-tx/178e97ee3b254f9ab237ea7516828266~tplv-omjb5zjo8w-resize-jpeg:300:300.jpeg?from=520841845',
                    'https://p16-oec-ttp.tiktokcdn-us.com/tos-useast5-i-omjb5zjo8w-tx/178e97ee3b254f9ab237ea7516828266~tplv-omjb5zjo8w-resize-jpeg:300:300.jpeg?from=520841845',
                  ],
                },
                indicator_data: {
                  paid_order_num: '3',
                  actual_order_num: '0',
                  estimated_amount: '0',
                  actual_amount: '0',
                  estimated_partner_commission: '0',
                  actual_partner_commission: '0',
                  creator_sales_num: '0',
                  collaborated_creators_num: '0',
                  promoted_creator_num: '0',
                  sample_requested_creator_num: '0',
                },
              },
            },
          ],
          next_page_token: '0',
        },
        request_id: '2094203423434',
      };

    requestMock.mockResolvedValue(mockResponse);

    const result =
      await module.getAffiliateCampaignCreatorFulfillmentStatusList(
        pathParams,
        query,
      );

    expect(requestMock).toHaveBeenCalledTimes(1);
    expect(requestMock).toHaveBeenCalledWith({
      method: 'GET',
      path: `/affiliate_partner/202501/campaigns/${pathParams.campaign_id}/products/performance`,
      query,
    });

    // body harus tidak ada
    expect(requestMock.mock.calls[0][0]).not.toHaveProperty('body');

    expect(result).toEqual(mockResponse);
  });

  it('should work without query params', async () => {
    const mockResponse: TikTokAPIResponse<GetAffiliateCampaignCreatorFulfillmentStatusListResponse> =
      {
        code: 0,
        message: 'success',
        data: {
          total_count: 10,
          campaign_product_statistics: [
            {
              data_update_time: '1736204400000',
              creator_sales_num: 1,
              collaborated_creators_num: 0,
              promoted_creator_num: 0,
              sample_requested_creator_num: 0,
              campaign_product_detail: {
                product_id: '12344',
                product_status: 'PRODUCT_UNSPECIFIED',
                product_name:
                  'summer underwear soft dress summer underwear-001',
                product_stock_count: '100',
                total_commission_percent: '6000',
                creator_commission_percent: '1000',
                partner_commission_percent: '5000',
                plan_commission_percent: '1400',
                product_price: {
                  min_price: '1.00',
                  max_price: '3.00',
                  currency: 'USD',
                },
                product_thumbnail: {
                  uri: 'tos-useast5-i-omjb5zjo8w-tx/178e97ee3b254f9ab237ea7516828266',
                  url_list: [
                    'https://p19-oec-ttp.tiktokcdn-us.com/tos-useast5-i-omjb5zjo8w-tx/178e97ee3b254f9ab237ea7516828266~tplv-omjb5zjo8w-resize-jpeg:300:300.jpeg?from=520841845',
                    'https://p16-oec-ttp.tiktokcdn-us.com/tos-useast5-i-omjb5zjo8w-tx/178e97ee3b254f9ab237ea7516828266~tplv-omjb5zjo8w-resize-jpeg:300:300.jpeg?from=520841845',
                  ],
                },
                indicator_data: {
                  paid_order_num: '3',
                  actual_order_num: '0',
                  estimated_amount: '0',
                  actual_amount: '0',
                  estimated_partner_commission: '0',
                  actual_partner_commission: '0',
                  creator_sales_num: '0',
                  collaborated_creators_num: '0',
                  promoted_creator_num: '0',
                  sample_requested_creator_num: '0',
                },
              },
            },
          ],
          next_page_token: '0',
        },
        request_id: '2094203423434',
      };

    requestMock.mockResolvedValue(mockResponse);

    const result =
      await module.getAffiliateCampaignCreatorFulfillmentStatusList({
        campaign_id: '123',
      });

    expect(requestMock).toHaveBeenCalledWith({
      method: 'GET',
      path: `/affiliate_partner/202501/campaigns/123/products/performance`,
      query: undefined,
    });

    expect(result).toEqual(mockResponse);
  });

  it('should call request with correct POST payload when searching CAP affiliate orders', async () => {
    const query = {
      page_size: 20,
      page_token:
        '6AsPQsUMvH3RkchNUPPh22NROHkE0D8pmq/N5M1kHYcZmtRyv9aVrNv65W7Q6tFA+7D1ud64MPNz5OaT',
    };

    const body: SearchCAPAffiliateOrdersBody = {
      order_id: '576962796354307765',
      order_status: 1,
      product_id: '1729435310697057093',
      create_time_ge: 1623812664,
      create_time_lt: 1623812664,
    };

    const mockResponse: TikTokAPIResponse<SearchCAPAffiliateOrdersResponse> = {
      code: 0,
      message: 'Success',
      data: {
        orders: [
          {
            id: '576962796354307765',
            tags: 'test-01',
            create_time: 1685548800,
            delivery_time: 1685548800,
            status: 'COMPLETED',
            skus: {
              id: '1729478689395213981',
              open_collaboration_id: '7324371012170024705',
              target_collaboration_id: '7324371012170024705',
              creator_username: 'liuyi_id_creator1jigo',
              product_name: 'Black Hoodie',
              product_id: '1729435310697057093',
              price: {
                amount: '99',
                currency: 'USD',
              },
              quantity: 1,
              shop_name: 'xuyann aaaaa',
              content_type: 'VIDEO',
              content_id: '7494337156519332665\n',
              attribution_type: 'Direct',
              commission_tier_setting: '3.0 OR 5.0',
              commission_model: 'Tiered commission',
              commission_rate: '3.0',
              commission_bonus_rate: '3.0',
              shop_ads_commission_rate: '5.0',
              estimated_commission_base: {
                amount: '99',
                currency: 'USD',
              },
              estimated_commission: {
                amount: '99',
                currency: 'USD',
              },
              estimated_bonus_commission: {
                amount: '100',
                currency: 'USD',
              },
              estimated_shop_ads_commission: {
                amount: '100',
                currency: 'USD',
              },
              actual_commission_base: {
                amount: '100',
                currency: 'USD',
              },
              actual_commission: {
                amount: '100',
                currency: 'USD',
              },
              actual_bonus_commission: {
                amount: '100',
                currency: 'USD',
              },
              actual_shop_ads_commission: {
                amount: '100',
                currency: 'USD',
              },
              agency_commission: {
                amount: '100',
                currency: 'USD',
              },
              agency_bonus_commission: {
                amount: '99',
                currency: 'USD',
              },
              agency_shop_ads_commission: {
                amount: '99',
                currency: 'USD',
              },
              total_agency_commission: {
                amount: '99',
                currency: 'USD',
              },
              agency_commission_rate: '10.0',
              iva: '10.0',
              isr: '10.0',
              returned_quantity: 1,
              refunded_quantity: 1,
            },
          },
        ],
        next_page_token:
          '6AsPQsUMvH3RkchNUPPh22NROHkE0D8pmq/N5M1kHYcZmtRyv9aVrNv65W7Q6tFA+7D1ud64MPNz5OaT',
        total_count: 100,
      },
      request_id: '2309840234234',
    };

    requestMock.mockResolvedValue(mockResponse);

    const result = await module.searchCAPAffiliateOrders(query, body);

    expect(requestMock).toHaveBeenCalledTimes(1);
    expect(requestMock).toHaveBeenCalledWith({
      method: 'POST',
      path: `/affiliate_partner/202504/cap_order/search`,
      query,
      body,
    });

    expect(result).toEqual(mockResponse);
  });

  it('should call request with correct POST payload when generating multiple affiliate campaign product links', async () => {
    // ✅ Arrange
    const pathParams = {
      campaign_id: '7362840009596339923',
    };

    const body: PartnerGenerateMultiAffiliateCampaignProductLinkBody = {
      product_ids: ['7362840009596340000', '7362840009596340000'],
    };

    const mockResponse: TikTokAPIResponse<PartnerGenerateMultiAffiliateCampaignProductLinkResponse> =
      {
        code: 0,
        message: 'Success',
        data: {
          product_promotion_links: [
            {
              product_id: '7362840009596339971',
              link: 'https://affiliate.tiktok.com/api/v1/share/AIxvOHlaJoKO',
            },
          ],
          failed_product_ids: ['7362840009596340000'],
        },
        request_id: '9048203942034',
      };

    requestMock.mockResolvedValue(mockResponse);

    const result =
      await module.partnerGenerateMultiAffiliateCampaignProductLink(
        pathParams,
        body,
      );

    expect(requestMock).toHaveBeenCalledTimes(1);
    expect(requestMock).toHaveBeenCalledWith({
      method: 'POST',
      path: `/affiliate_partner/202505/campaigns/${pathParams.campaign_id}/products/promotion_links/generate_batch`,
      body,
    });

    expect(requestMock.mock.calls[0][0]).not.toHaveProperty('query');

    expect(result).toEqual(mockResponse);
  });

  const pathParams = {
    campaign_id: '1234567890',
    product_id: '1729435310697057093',
  };

  const query: GetAffiliateCampaignCreatorFulfillmentStatusInfoQuery = {
    page_size: 10,
    page_token: 'b2Zmc2V0PTAK',
  };

  const mockResponse: TikTokAPIResponse<GetAffiliateCampaignCreatorFulfillmentStatusInfoResponse> =
    {
      code: 0,
      message: 'success',
      data: {
        total_creator_count: 1,
        promotion_creators: [
          {
            paid_amount: {
              currency: 'USD',
              amount: '3.00',
            },
            room_count: 1,
            video_count: 1,
            free_sample_status: 'AWAITING_COLLECTION',
            commission: '100',
            effective_end_time: '1731020040687',
            effective_start_time: '1731019880391',
            creator: {
              nick_name: 'Test_Creator_E',
              avatar_url:
                'https://p19-sign.tiktokcdn-us.com/tos-useast5-avt-0068-tx/c614d3b6ba4d93b31fbda5add0802dd7~c5_1080x1080.webp?lk3s=a5d48078\\u0026nonce=6796\\u0026refresh_token=634d776ec39c2291053675f60c576515\\u0026x-expires=1736478000\\u0026x-signature=0G6NmM8H8nDRYYVN7e8QazDMRb0%3D\\u0026shp=a5d48078\\u0026shcp=9f007bb8',
              follower_num: 19,
              user_name: 'us_lxq6213',
              creator_open_id:
                'uACafQAAAABmUU2qon4R0vUYvUVS3QC6CICP2m5A2-wd77j8R9G0yg',
            },
            affiliate_product_id: '123456789',
          },
        ],
        next_page_token: 'tk811a4455s2',
      },
      request_id: '0-482-04234234',
    };

  it('should call request with correct GET payload when fetching creator fulfillment status info', async () => {
    requestMock.mockResolvedValue(mockResponse);

    const result =
      await module.getAffiliateCampaignCreatorFulfillmentStatusInfo(
        pathParams,
        query,
      );

    expect(requestMock).toHaveBeenCalledTimes(1);
    expect(requestMock).toHaveBeenCalledWith({
      method: 'GET',
      path: `/affiliate_partner/202508/campaigns/${pathParams.campaign_id}/products/${pathParams.product_id}/performance`,
      query,
    });

    expect(requestMock.mock.calls[0][0]).not.toHaveProperty('body');

    expect(result).toEqual(mockResponse);
  });

  it('should work without query params', async () => {
    requestMock.mockResolvedValue(mockResponse);

    const result =
      await module.getAffiliateCampaignCreatorFulfillmentStatusInfo({
        campaign_id: 'c1',
        product_id: 'p1',
      });

    expect(requestMock).toHaveBeenCalledWith({
      method: 'GET',
      path: `/affiliate_partner/202508/campaigns/c1/products/p1/performance`,
      query: undefined,
    });

    expect(result).toEqual(mockResponse);
  });

  it('should call request with correct GET payload when fetching creator product content statistics', async () => {
    const pathParams = {
      campaign_id: '123',
      product_id: '123',
      creator_temp_id: 'uACafQAAAABmUU2qon4R0vUYvUVS3QC6CICP2m5A2-wd77j8R9G0yg',
    };

    const query: GetAffiliateCampaignCreatorProductContentStatisticsQuery = {
      affiliate_product_id: '2480234234',
      content_type: '1',
    };

    const mockResponse: TikTokAPIResponse<GetAffiliateCampaignCreatorProductContentStatisticsResponse> =
      {
        code: 0,
        message: 'success',
        data: {
          creator_content_statistics: [
            {
              content_type: 'VIDEO',
              cover_img_url:
                'https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/fa0387fa5a204dcfa44d5be75877a163~tplv-o3syd03w52-origin-webp.webp?from=3478900499',
              source_url:
                'https://www.tiktok.com/@cbseveningnews/video/7458098283332767006?q=Victor%20Shaw%20Dies%20In%20Fire%20Rescue%20Attempt&t=1736545359958',
              view_count: '1',
              like_count: '1',
              comment_num: '0',
              paid_order_num: '0',
              paid_amount: '0',
              linked_tiktok_video: 'http://xxx.tiktok.com/xxxx',
              published_date: '2024-11-13',
              content_end_date: '2024-11-13',
            },
          ],
        },
        request_id: '04982304234234',
      };

    requestMock.mockResolvedValue(mockResponse);

    const result =
      await module.getAffiliateCampaignCreatorProductContentStatistics(
        pathParams,
        query,
      );

    expect(requestMock).toHaveBeenCalledTimes(1);
    expect(requestMock).toHaveBeenCalledWith({
      method: 'GET',
      path: `/affiliate_partner/202508/campaigns/${pathParams.campaign_id}/products/${pathParams.product_id}/creator/${pathParams.creator_temp_id}/content/statistics`,
      query,
    });

    expect(requestMock.mock.calls[0][0]).not.toHaveProperty('body');

    expect(result).toEqual(mockResponse);
  });

  it('should work without query params', async () => {
    const mockResponse: TikTokAPIResponse<GetAffiliateCampaignCreatorProductContentStatisticsResponse> =
      {
        code: 0,
        message: 'success',
        data: {
          creator_content_statistics: [
            {
              content_type: 'VIDEO',
              cover_img_url:
                'https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/fa0387fa5a204dcfa44d5be75877a163~tplv-o3syd03w52-origin-webp.webp?from=3478900499',
              source_url:
                'https://www.tiktok.com/@cbseveningnews/video/7458098283332767006?q=Victor%20Shaw%20Dies%20In%20Fire%20Rescue%20Attempt&t=1736545359958',
              view_count: '1',
              like_count: '1',
              comment_num: '0',
              paid_order_num: '0',
              paid_amount: '0',
              linked_tiktok_video: 'http://xxx.tiktok.com/xxxx',
              published_date: '2024-11-13',
              content_end_date: '2024-11-13',
            },
          ],
        },
        request_id: '04982304234234',
      };

    requestMock.mockResolvedValue(mockResponse);

    const result =
      await module.getAffiliateCampaignCreatorProductContentStatistics({
        campaign_id: 'c1',
        product_id: 'p1',
        creator_temp_id: 'creator1',
      });

    expect(requestMock).toHaveBeenCalledWith({
      method: 'GET',
      path: `/affiliate_partner/202508/campaigns/c1/products/p1/creator/creator1/content/statistics`,
      query: undefined,
    });

    expect(result).toEqual(mockResponse);
  });

  it('should call request with correct GET payload for sample status', async () => {
    const pathParams = {
      campaign_id: '123',
      product_id: '456',
      creator_temp_id: 'uACafQAAAABmUU2qon4R0vUYvUVS3QC6CICP2m5A2-wd77j8R9G0yg',
    };

    const mockResponse: TikTokAPIResponse<GetAffiliateCampaignCreatorProductSampleStatusResponse> =
      {
        code: 0,
        message: 'success',
        data: {
          sample_status: {
            shipping_provider_name: 'USPS',
            delivery_option: 'PREMIUM_SHIPPING',
            estimated_earliest_delivery_date: '1712941200',
            estimated_latest_delivery_date: '1712941200',
            quantity: 1,
            tracking_results: [
              {
                tracking_event_update_date: '1712941200',
                tracking_event_description: 'THE_PACKAGE_HAS_BEEN_DELIVERED',
                tracking_event_description_extended: 'delivering',
              },
            ],
          },
        },
        request_id: '230498204234',
      };

    requestMock.mockResolvedValue(mockResponse);

    const result =
      await module.getAffiliateCampaignCreatorProductSampleStatus(pathParams);

    expect(requestMock).toHaveBeenCalledTimes(1);
    expect(requestMock).toHaveBeenCalledWith({
      method: 'GET',
      path: `/affiliate_partner/202508/campaigns/${pathParams.campaign_id}/products/${pathParams.product_id}/creator/${pathParams.creator_temp_id}/content/statistics/sample/status`,
    });

    const requestArgs = requestMock.mock.calls[0][0];
    expect(requestArgs).not.toHaveProperty('query');
    expect(requestArgs).not.toHaveProperty('body');

    expect(result).toEqual(mockResponse);
  });
});
