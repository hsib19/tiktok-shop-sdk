import { AffiliateSellerModule } from "../AffiliateSellerModule";
import {
  CreateConversationWithCreatorBody,
  CreateConversationwithCreatorBody,
  CreateConversationWithCreatorResponse,
  CreateOpenCollaborationBody,
  CreateOpenCollaborationResponse,
  CreateTargetCollaborationBody,
  CreateTargetCollaborationResponse,
  EditOpenCollaborationSampleRuleBody,
  EditOpenCollaborationSampleRuleResponse,
  EditOpenCollaborationSettingsBody,
  EditOpenCollaborationSettingsResponse,
  GetConversationListParams,
  GetConversationListResponse,
  GetLatestUnreadMessagesResponse,
  GetMarketplaceCreatorPerformanceResponse,
  GetMessageInTheConversationParams,
  GetMessageInTheConversationResponse,
  GetOpenCollaborationCreatorContentDetailQuery,
  GetOpenCollaborationCreatorContentDetailResponse,
  GetOpenCollaborationSampleRulesQuery,
  GetOpenCollaborationSampleRulesResponse,
  GetOpenCollaborationSettingsResponse,
  MarkConversationReadBody,
  MarkConversationReadResponse,
  QueryTargetCollaborationDetailResponse,
  RemoveCreatorFromOpenCollaborationParams,
  RemoveCreatorFromOpenCollaborationResponse,
  RemoveOpenCollaborationResponse,
  SearchOpenCollaborationParams,
  SearchOpenCollaborationResponse,
  SearchSellerAffiliateOrdersParams,
  SearchSellerAffiliateOrdersResponse,
  SearchTargetCollaborationsParams,
  SearchTargetCollaborationsResponse,
  SellerReviewSampleApplicationsParams,
  SellerReviewSampleApplicationsResponse,
  SellerSearchAffiliateOpenCollaborationProductParams,
  SellerSearchAffiliateOpenCollaborationProductResponse,
  SellerSearchCreatorOnMarketplaceParams,
  SellerSearchCreatorOnMarketplaceResponse,
  SellerSearchSampleApplicationsFulfillmentsParams,
  SellerSearchSampleApplicationsFulfillmentsResponse,
  SellerSearchSampleApplicationsParams,
  SellerSearchSampleApplicationsResponse,
  SendImMessageParams,
  SendImMessageResponse,
  TikTokAPIResponse,
  UpdateTargetCollaborationParams,
  UpdateTargetCollaborationResponse,
} from "@types";

const mockRequest = jest.fn();
const affiliateModule = new AffiliateSellerModule(mockRequest);

describe("AffiliateSellerModule", () => {
  beforeEach(() => {
    mockRequest.mockReset();
  });

  it("calls createConversationwithCreator with correct path and body", async () => {
    const body: CreateConversationwithCreatorBody = {
      creator_id: "123",
      only_need_conversation_id: true,
    };

    const expectedResponse: TikTokAPIResponse<any> = {
      code: 0,
      message: "Success",
      request_id: "req_123",
      data: { conversation_id: "conv_456" },
    };

    mockRequest.mockResolvedValueOnce(expectedResponse);

    const result = await affiliateModule.createConversationwithCreator(body);

    expect(mockRequest).toHaveBeenCalledWith({
      method: "POST",
      path: "/affiliate_seller/202412/conversations",
      body,
    });

    expect(result).toEqual(expectedResponse);
  });

  it("calls generateAffiliateProductPromotionLink with correct path", async () => {
    const product_id = "product_123";
    const expectedResponse: TikTokAPIResponse<any> = {
      code: 0,
      message: "Success",
      request_id: "req_456",
      data: { link: "https://tiktok.com/promo" },
    };

    mockRequest.mockResolvedValueOnce(expectedResponse);

    const result =
      await affiliateModule.generateAffiliateProductPromotionLink(product_id);

    expect(mockRequest).toHaveBeenCalledWith({
      method: "POST",
      path: `/affiliate_seller/202405/products/${product_id}/promotion_link/generate`,
    });

    expect(result).toEqual(expectedResponse);
  });

  it("calls getConversationList with correct query and body", async () => {
    const params: GetConversationListParams = {
      query: { page_size: 10 },
      body: {
        only_need_conversation_id: true,
      },
    };
    const expectedResponse: TikTokAPIResponse<any> = {
      code: 0,
      message: "Success",
      request_id: "req_789",
      data: { conversations: [] },
    };

    mockRequest.mockResolvedValueOnce(expectedResponse);

    const result = await affiliateModule.getConversationList(params);

    expect(mockRequest).toHaveBeenCalledWith({
      method: "GET",
      path: "/affiliate_seller/202412/conversations",
      query: params.query,
      body: params.body,
    });

    expect(result).toEqual(expectedResponse);
  });

  it("calls createTargetCollaboration with correct path and body", async () => {
    const body: CreateTargetCollaborationBody = {
      name: "openapi_test",
      message: "this is a message",
      end_time: "1715654330",
      products: [
        {
          id: "789078671231312312",
          target_commission_rate: 1000,
        },
      ],
      creator_user_ids: ["123123213213"],
      seller_contact_info: {
        email: "test@tiktokshop.com",
      },
      free_sample_rule: {
        has_free_sample: true,
        is_sample_approval_exempt: true,
      },
    };

    const expectedResponse: TikTokAPIResponse<CreateTargetCollaborationResponse> =
      {
        code: 0,
        message: "Success",
        request_id: "req_001",
        data: {
          target_collaboration: {
            id: "7365861555575916210",
          },
          target_collaboration_conflicts: [
            {
              creator_user_id: "7495383576027499210",
              product_id: "789078671231",
            },
          ],
        },
      };

    mockRequest.mockResolvedValueOnce(expectedResponse);

    const result = await affiliateModule.createTargetCollaboration(body);

    expect(mockRequest).toHaveBeenCalledWith({
      method: "POST",
      path: "/affiliate_seller/202405/target_collaborations",
      body,
    });

    expect(result).toEqual(expectedResponse);
  });

  it("calls editOpenCollaborationSettings with correct path and body", async () => {
    const body: EditOpenCollaborationSettingsBody = {
      auto_add_product: {
        enable: true,
        commission_rate: 1000,
      },
    };

    const expectedResponse: TikTokAPIResponse<EditOpenCollaborationSettingsResponse> =
      {
        code: 0,
        message: "Success",
        request_id: "req_002",
        data: {},
      };

    mockRequest.mockResolvedValueOnce(expectedResponse);

    const result = await affiliateModule.editOpenCollaborationSettings(body);

    expect(mockRequest).toHaveBeenCalledWith({
      method: "POST",
      path: "/affiliate_seller/202405/open_collaboration_settings",
      body,
    });

    expect(result).toEqual(expectedResponse);
  });

  it("calls removeCreatorFromOpenCollaboration with correct path and body", async () => {
    const params: RemoveCreatorFromOpenCollaborationParams = {
      open_collaboration_id: "oc_123",
      body: {
        creator_user_id: "7495383576027499210",
        product_id: "789078671231",
      },
    };

    const expectedResponse: TikTokAPIResponse<RemoveCreatorFromOpenCollaborationResponse> =
      {
        code: 0,
        message: "Success",
        request_id: "req_003",
        data: {},
      };

    mockRequest.mockResolvedValueOnce(expectedResponse);

    const result =
      await affiliateModule.removeCreatorFromOpenCollaboration(params);

    expect(mockRequest).toHaveBeenCalledWith({
      method: "POST",
      path: `/affiliate_seller/202405/open_collaborations/${params.open_collaboration_id}/remove_creator`,
      body: params.body,
    });

    expect(result).toEqual(expectedResponse);
  });

  it("calls sellerSearchAffiliateOpenCollaborationProduct with correct path, query, and body", async () => {
    const params: SellerSearchAffiliateOpenCollaborationProductParams = {
      query: { page_size: 20 },
      body: {
        title_keywords: ["Men", "Fashion", " Sports Short"],
        sales_price_range: {
          amount_ge: "12.44",
          amount_lt: "100",
        },
        category: {
          id: "3412342",
        },
        commission_rate_range: {
          rate_ge: 100,
          rate_lt: 8000,
        },
      },
    };

    const expectedResponse: TikTokAPIResponse<SellerSearchAffiliateOpenCollaborationProductResponse> =
      {
        code: 0,
        message: "Success",
        request_id: "req_001",
        data: {
          products: [
            {
              shop: {
                name: "Test shop",
              },
              id: "1729432087292775344",
              has_inventory: false,
              units_sold: 12123,
              title: "Blue t-shirt",
              sale_region: "ID",
              main_image_url:
                "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/fa0387fa5a204dcfa44d5be75877a163~tplv-o3syd03w52-origin-webp.webp?from=3478900499",
              detail_link:
                "https://shop.tiktok.com/view/product/1729624807198591373?region=ID&local=en",
              original_price: {
                currency: "USD",
                minimum_amount: "12.21",
                maximum_amount: "100.00",
              },
              category_chains: [
                {
                  id: "343554",
                  local_name: "COMPUTER",
                  is_leaf: false,
                  parent_id: "342948",
                },
              ],
              commission: {
                rate: 3000,
                currency: "USD",
                amount: "121.32",
              },
              sales_price: {
                currency: "USD",
                minimum_amount: "34.3",
                maximum_amount: "55.7",
              },
            },
          ],
          next_page_token: "b2Zmc2V0PTEw",
          total_count: 10000,
        },
      };

    mockRequest.mockResolvedValueOnce(expectedResponse);

    const result =
      await affiliateModule.sellerSearchAffiliateOpenCollaborationProduct(
        params,
      );

    expect(mockRequest).toHaveBeenCalledWith({
      method: "POST",
      path: "/affiliate_seller/202405/open_collaborations/products/search",
      query: params.query,
      body: params.body,
    });

    expect(result).toEqual(expectedResponse);
  });

  it("calls searchSellerAffiliateOrders with correct path, query, and body", async () => {
    const params: SearchSellerAffiliateOrdersParams = {
      query: { page_size: 20 },
      body: {
        create_time_lt: 1722485856,
        create_time_ge: 1719807456,
        program_id: "73661290629",
      },
    };

    const expectedResponse: TikTokAPIResponse<SearchSellerAffiliateOrdersResponse> =
      {
        code: 0,
        message: "Success",
        request_id: "req_002",
        data: {
          orders: [
            {
              id: "579125529499110202",
              delivery_time: 1723748656,
              create_time: 1722420186,
              status: "COMPLETED",
              skus: [
                {
                  open_collaboration_id: "73661290629",
                  target_collaboration_id: "73661290629",
                  campaign_id: "73661290629",
                  creator_username: "exampleTikTokCreatorUsername",
                  price: {
                    amount: "1000",
                    currency: "VND",
                  },
                  quantity: 1,
                  content_type: "LIVE",
                  content_id: "7493990579714164574",
                  product_id: "1729503179457070324",
                  commission_rate: "1000",
                  shop_ads_commission_rate: "5000",
                  estimated_commission_base: {
                    amount: "1000",
                    currency: "VND",
                  },
                  estimated_paid_shop_ads_commission: {
                    amount: "1000",
                    currency: "VND",
                  },
                  estimated_paid_commission: {
                    amount: "20000",
                    currency: "VND",
                  },
                  actual_commission_base: {
                    amount: "50000",
                    currency: "VND",
                  },
                  actual_paid_commission: {
                    amount: "10000",
                    currency: "VND",
                  },
                  actual_paid_shop_ads_commission: {
                    amount: "20000",
                    currency: "VND",
                  },
                  refunded_quantity: 1,
                  returned_quantity: 1,
                  estimated_cofunded_creator_bonus_amount: {
                    amount: "100",
                    currency: "USD",
                  },
                  actual_cofunded_creator_bonus_amount: {
                    amount: "100",
                    currency: "USD",
                  },
                },
              ],
            },
          ],
          next_page_token: "WzE2OTUxMTY2NTQ2OTMsNTc2NDczNDg5ODYxNDEyMDI1XQ==",
          total_count: 10000,
        },
      };

    mockRequest.mockResolvedValueOnce(expectedResponse);

    const result = await affiliateModule.searchSellerAffiliateOrders(params);

    expect(mockRequest).toHaveBeenCalledWith({
      method: "POST",
      path: "/affiliate_seller/202410/orders/search",
      query: params.query,
      body: params.body,
    });

    expect(result).toEqual(expectedResponse);
  });

  it("calls sellerSearchSampleApplicationsFulfillments with correct path and body", async () => {
    const params: SellerSearchSampleApplicationsFulfillmentsParams = {
      application_id: "app_123",
      body: {
        content_format: "LIVE",
      },
    };

    const expectedResponse: TikTokAPIResponse<SellerSearchSampleApplicationsFulfillmentsResponse> =
      {
        code: 0,
        message: "Success",
        request_id: "req_003",
        data: {
          fulfillments: [
            {
              product: {
                id: "123456",
                main_image_url: "https://www.example.com",
              },
              content: {
                id: "123456",
                format: "LIVE",
                url: "https://www.example.com",
                view_count: 100,
                like_count: 123,
                comment_count: 10,
                paid_order_count: 1,
                page_link: "https://www.example.com",
                description: "abc def gh",
                create_time: 1723529426,
                live_end_time: 1723529426,
              },
            },
          ],
        },
      };

    mockRequest.mockResolvedValueOnce(expectedResponse);

    const result =
      await affiliateModule.sellerSearchSampleApplicationsFulfillments(params);

    expect(mockRequest).toHaveBeenCalledWith({
      method: "POST",
      path: `/affiliate_seller/202409/sample_applications/${params.application_id}/fulfillments/search`,
      body: params.body,
    });

    expect(result).toEqual(expectedResponse);
  });

  it("calls sellerReviewSampleApplications with correct path and body", async () => {
    const params: SellerReviewSampleApplicationsParams = {
      application_id: "app_456",
      body: {
        review_result: "APPROVE",
        reject_reason: "NOT_MATCH",
      },
    };

    const expectedResponse: TikTokAPIResponse<SellerReviewSampleApplicationsResponse> =
      {
        code: 0,
        message: "Success",
        request_id: "req_004",
        data: {},
      };

    mockRequest.mockResolvedValueOnce(expectedResponse);

    const result = await affiliateModule.sellerReviewSampleApplications(params);

    expect(mockRequest).toHaveBeenCalledWith({
      method: "POST",
      path: `/affiliate_seller/202409/sample_applications/${params.application_id}/review`,
      body: params.body,
    });

    expect(result).toEqual(expectedResponse);
  });

  it("calls getOpenCollaborationSampleRules with correct path and query", async () => {
    const query: GetOpenCollaborationSampleRulesQuery = {
      product_ids: ["product_1"],
    };
    const expectedResponse: TikTokAPIResponse<GetOpenCollaborationSampleRulesResponse> =
      {
        code: 0,
        message: "Success",
        request_id: "req_001",
        data: {
          sample_rules: [
            {
              product_id: "123456",
              sample_quota: 100,
              is_sample_time_unlimited: true,
              status: "ONGOING",
              available_quantity: 50,
              start_time: 1728546888,
              end_time: 1728546888,
              thresholds: {
                minimum_follower_count: 200,
                minimum_gmv: 1000,
                avg_ec_video_views: 5,
                category_ids: ["601152"],
                predicted_fulfillment_rank: "ALL",
              },
            },
          ],
        },
      };

    mockRequest.mockResolvedValueOnce(expectedResponse);

    const result = await affiliateModule.getOpenCollaborationSampleRules(query);

    expect(mockRequest).toHaveBeenCalledWith({
      method: "GET",
      path: "/affiliate_seller/202410/open_collaborations/sample_rules",
      query,
    });

    expect(result).toEqual(expectedResponse);
  });

  it("calls sellerSearchSampleApplications with correct path, query, and body", async () => {
    const params: SellerSearchSampleApplicationsParams = {
      query: { page_size: "10", page_token: "dgfh398304545" },
      body: {
        product_id: "123456",
        title: "product name",
        creator_user_id: "123456",
        username: "test_tt_name",
        target_collabration_id: "123456",
        order_id: "123456",
        status: "PENDING",
      },
    };
    const expectedResponse: TikTokAPIResponse<SellerSearchSampleApplicationsResponse> =
      {
        code: 0,
        message: "Success",
        request_id: "req_002",
        data: {
          next_page_token:
            "aDU2dHIzMlFhME5CUzJKUDhDdVJhTDM1WmJkeFVTVW9LTkRaSnNaZCtuWjJXVU5CSDhlaA==",
          total_count: 100,
          sample_applications: [
            {
              id: "123456",
              commission_rate: "0.1",
              status: "PENDING",
              order_id: "123456",
              available_quantity: 50,
              approve_expiration_time: 1728674995,
              shipment_expiration_time: 1728674995,
              tracking_number: "123456",
              fulfillment_status: "ONGOING",
              is_approvable: true,
              disapprovable_reasons: ["Product out of stock"],
              partner_name: "ABC",
              creator: {
                user_id: "123456",
                username: "test.name",
                nickname: "Test Name",
                follower_count: 200,
                avatar_url:
                  "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068xxxxx",
                gmv: {
                  amount: "500",
                  currency: "USD",
                },
                content_count: 4,
                fulfillment_percentage: "60.50",
                ec_video_view: 1200,
              },
              product: {
                id: "123456",
                title: "A women dress",
                sku_id: "123456",
                sku_image_url:
                  "https://p16-oec-va.ibyteimg.com/tos-malivaxxxxx",
                sku_name: "Soft Cover",
              },
            },
          ],
        },
      };

    mockRequest.mockResolvedValueOnce(expectedResponse);

    const result = await affiliateModule.sellerSearchSampleApplications(params);

    expect(mockRequest).toHaveBeenCalledWith({
      method: "POST",
      path: "/affiliate_seller/202409/sample_applications/search",
      query: params.query,
      body: params.body,
    });

    expect(result).toEqual(expectedResponse);
  });

  it("calls editOpenCollaborationSampleRule with correct path and body", async () => {
    const body: EditOpenCollaborationSampleRuleBody = {
      product_id: "123456",
      sample_rule: {
        sample_quota: 100,
        is_sample_time_unlimited: true,
        start_time: 1728552553,
        end_time: 1728552553,
        thresholds: {
          minimum_follower_count: 2000,
          minimum_gmv: 1000,
          avg_ec_video_views: 5,
          category_ids: ["601152"],
          predicted_fulfillment_rank: "LOW",
        },
        activate_status: "ACTIVATE",
      },
    };
    const expectedResponse: TikTokAPIResponse<EditOpenCollaborationSampleRuleResponse> =
      {
        code: 0,
        message: "Success",
        request_id: "req_003",
        data: {},
      };

    mockRequest.mockResolvedValueOnce(expectedResponse);

    const result = await affiliateModule.editOpenCollaborationSampleRule(body);

    expect(mockRequest).toHaveBeenCalledWith({
      method: "POST",
      path: "/affiliate_seller/202410/open_collaborations/sample_rules",
      body,
    });

    expect(result).toEqual(expectedResponse);
  });

  it("calls removeTargetCollaboration with correct path", async () => {
    const target_collaboration_id = "tc_123";
    const expectedResponse: TikTokAPIResponse<object> = {
      code: 0,
      message: "Success",
      request_id: "req_004",
      data: {},
    };

    mockRequest.mockResolvedValueOnce(expectedResponse);

    const result = await affiliateModule.removeTargetCollaboration(
      target_collaboration_id,
    );

    expect(mockRequest).toHaveBeenCalledWith({
      method: "DELETE",
      path: `/affiliate_seller/202409/target_collaborations/${target_collaboration_id}`,
    });

    expect(result).toEqual(expectedResponse);
  });

  it("calls searchTargetCollaborations with correct path, query, and body", async () => {
    const params: SearchTargetCollaborationsParams = {
      query: {
        page_size: "20",
      },
      body: {
        creator_accept_status: "ACCEPT",
        free_sample_setting: "WITH_FREE_SAMPLE",
        search_param: {
          keyword_type: "TARGET_COLLABORATION_NAME",
          keyword: "test",
        },
        creator_user_id: "123456",
        collaboration_status: "ONGOING",
      },
    };
    const expectedResponse: TikTokAPIResponse<SearchTargetCollaborationsResponse> =
      {
        code: 0,
        message: "Success",
        request_id: "req_005",
        data: {},
      };

    mockRequest.mockResolvedValueOnce(expectedResponse);

    const result = await affiliateModule.searchTargetCollaborations(params);

    expect(mockRequest).toHaveBeenCalledWith({
      method: "POST",
      path: "/affiliate_seller/202409/target_collaborations/search",
      query: params.query,
      body: params.body,
    });

    expect(result).toEqual(expectedResponse);
  });

  it("calls updateTargetCollaboration with correct path and body", async () => {
    const params: UpdateTargetCollaborationParams = {
      target_collaboration_id: "tc_123",
      body: {
        name: "openapi_test",
        end_time: "1715654330",
        products: [
          {
            id: "789078671231312312",
            commission_rate: 1000,
          },
        ],
        creator_user_ids: ["123123213213"],
        seller_contact_info: {
          email: "test@bytedance.com",
        },
        free_sample_rule: {
          has_free_sample: true,
          is_sample_approval_exempt: true,
        },
      },
    };
    const expectedResponse: TikTokAPIResponse<UpdateTargetCollaborationResponse> =
      {
        code: 0,
        message: "Success",
        request_id: "req_001",
        data: {
          target_collaboration_conflicts: [
            {
              creator_user_id: "7494656937121841111",
              product_id: "789078671231",
            },
          ],
          update_failed: {
            remove_creator_ids: ["12345"],
            remove_product_ids: ["12345"],
            add_creator_ids: ["12345"],
            add_products: {
              id: "789078671231312312",
              commission_rate: 1000,
            },
            change_commissions: {
              product_id: "789078671231312312",
              commission_rate: 1000,
            },
            end_time: 1715654330,
            seller_contact_info: {
              email: "test@bytedance.com",
            },
            name: "openapi_test",
          },
        },
      };

    mockRequest.mockResolvedValueOnce(expectedResponse);

    const result = await affiliateModule.updateTargetCollaboration(params);

    expect(mockRequest).toHaveBeenCalledWith({
      method: "PUT",
      path: `/affiliate_seller/202409/target_collaborations/${params.target_collaboration_id}`,
      body: params.body,
    });

    expect(result).toEqual(expectedResponse);
  });

  it("calls getOpenCollaborationSettings with correct path", async () => {
    const expectedResponse: TikTokAPIResponse<GetOpenCollaborationSettingsResponse> =
      {
        code: 0,
        message: "Success",
        request_id: "req_002",
        data: {
          open_collaboration_settings: {
            auto_add_product: {
              enable: true,
              commission_rate: 1000,
            },
          },
        },
      };

    mockRequest.mockResolvedValueOnce(expectedResponse);

    const result = await affiliateModule.getOpenCollaborationSettings();

    expect(mockRequest).toHaveBeenCalledWith({
      method: "GET",
      path: "/affiliate_seller/202409/open_collaboration_settings",
    });

    expect(result).toEqual(expectedResponse);
  });

  it("calls removeOpenCollaboration with correct path", async () => {
    const product_id = "prod_123";
    const expectedResponse: TikTokAPIResponse<RemoveOpenCollaborationResponse> =
      {
        code: 0,
        message: "Success",
        request_id: "req_003",
        data: {},
      };

    mockRequest.mockResolvedValueOnce(expectedResponse);

    const result = await affiliateModule.removeOpenCollaboration(product_id);

    expect(mockRequest).toHaveBeenCalledWith({
      method: "DELETE",
      path: `/affiliate_seller/202409/open_collaborations/products/${product_id}`,
    });

    expect(result).toEqual(expectedResponse);
  });

  it("calls queryTargetCollaborationDetail with correct path", async () => {
    const target_collaboration_id = "tc_456";
    const expectedResponse: TikTokAPIResponse<QueryTargetCollaborationDetailResponse> =
      {
        code: 0,
        message: "Success",
        request_id: "req_004",
        data: {},
      };

    mockRequest.mockResolvedValueOnce(expectedResponse);

    const result = await affiliateModule.queryTargetCollaborationDetail(
      target_collaboration_id,
    );

    expect(mockRequest).toHaveBeenCalledWith({
      method: "GET",
      path: `/affiliate_seller/202412/target_collaborations/${target_collaboration_id}`,
    });

    expect(result).toEqual(expectedResponse);
  });

  it("calls getOpenCollaborationCreatorContentDetail with correct path and query", async () => {
    const query: GetOpenCollaborationCreatorContentDetailQuery = {
      page_size: 1,
      product_id: "094203490234",
    };
    const expectedResponse: TikTokAPIResponse<GetOpenCollaborationCreatorContentDetailResponse> =
      {
        code: 0,
        message: "Success",
        request_id: "req_005",
        data: {},
      };

    mockRequest.mockResolvedValueOnce(expectedResponse);

    const result =
      await affiliateModule.getOpenCollaborationCreatorContentDetail(query);

    expect(mockRequest).toHaveBeenCalledWith({
      method: "GET",
      path: "/affiliate_seller/202412/open_collaborations/creator_content_details",
      query,
    });

    expect(result).toEqual(expectedResponse);
  });

  it("calls searchOpenCollaboration with correct path, query, and body", async () => {
    const params: SearchOpenCollaborationParams = {
      query: { page_size: 20 },
      body: {
        keyword_type: "PRODUCT_ID",
        keyword: "7625459350921",
        top_level_category_id: "60001",
      },
    };
    const expectedResponse: TikTokAPIResponse<SearchOpenCollaborationResponse> =
      {
        code: 0,
        message: "Success",
        request_id: "req_006",
        data: {
          next_page_token: "b2Zmc2V0PTEw",
          total_count: 10000,
          open_collaborations: [
            {
              id: "94297006405",
              status: "NORMAL",
              current_commission: {
                rate: 3000,
                start_time: 1725334422,
                end_time: 1727625600,
              },
              showcase_creator_count: 15,
              content_creator_count: 10,
              product: {
                id: "1729432087292775344",
                title: "Blue t-shirt",
                main_image_url:
                  "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/fa0387fa5a204dcfa44d5be75877a163~tplv-o3syd03w52-origin-webp.webp?from=3478900499",
                status: "LIVE",
                inventory: 1274,
                original_price: {
                  currency: "USD",
                  minimum_amount: "12.21",
                  maximum_amount: "100.00",
                },
              },
            },
          ],
        },
      };

    mockRequest.mockResolvedValueOnce(expectedResponse);

    const result = await affiliateModule.searchOpenCollaboration(params);

    expect(mockRequest).toHaveBeenCalledWith({
      method: "POST",
      path: "/affiliate_seller/202412/open_collaborations/search",
      query: params.query,
      body: params.body,
    });

    expect(result).toEqual(expectedResponse);
  });

  it("calls createOpenCollaboration with correct path and body", async () => {
    const body: CreateOpenCollaborationBody = {
      product_id: "789078671231",
      commission_rate: 1000,
    };
    const expectedResponse: TikTokAPIResponse<CreateOpenCollaborationResponse> =
      {
        code: 0,
        message: "Success",
        request_id: "req_007",
        data: {
          open_collaboration: {
            id: "7365861555575916210",
            product_id: "789078671231",
            effective_time: 1715654330,
          },
        },
      };

    mockRequest.mockResolvedValueOnce(expectedResponse);

    const result = await affiliateModule.createOpenCollaboration(body);

    expect(mockRequest).toHaveBeenCalledWith({
      method: "POST",
      path: "/affiliate_seller/202412/open_collaborations",
      body,
    });

    expect(result).toEqual(expectedResponse);
  });

  it("calls getMessageInTheConversation with correct path and query", async () => {
    const params: GetMessageInTheConversationParams = {
      conversation_id: "conv_123",
      query: { page_size: 20 },
    };
    const expectedResponse: TikTokAPIResponse<GetMessageInTheConversationResponse> =
      {
        code: 0,
        message: "Success",
        request_id: "req_001",
        data: { messages: [] },
      };

    mockRequest.mockResolvedValueOnce(expectedResponse);
    const result = await affiliateModule.getMessageInTheConversation(params);

    expect(mockRequest).toHaveBeenCalledWith({
      method: "GET",
      path: `/affiliate_seller/202412/conversation/${params.conversation_id}/messages`,
      query: params.query,
    });
    expect(result).toEqual(expectedResponse);
  });

  it("calls getConversationList with correct path, query, and body", async () => {
    const params: GetConversationListParams = {
      query: { page_size: 1 },
      body: {
        only_need_conversation_id: true,
      },
    };
    const expectedResponse: TikTokAPIResponse<GetConversationListResponse> = {
      code: 0,
      message: "Success",
      request_id: "req_002",
      data: {
        has_more: true,
        next_page_token: "b2Zmc2V0PTAK",
        conversations: [
          {
            id: "12345678",
            unread_count: 2,
            username: "test_creator_name",
            avatar:
              "https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/2bf6a2485ec8bf93483e4a6ed907e6fd~c5_720x720.webp",
            creator_im_id: "12345678",
          },
        ],
      },
    };

    mockRequest.mockResolvedValueOnce(expectedResponse);
    const result = await affiliateModule.getConversationList(params);

    expect(mockRequest).toHaveBeenCalledWith({
      method: "GET",
      path: `/affiliate_seller/202412/conversations`,
      query: params.query,
      body: params.body,
    });
    expect(result).toEqual(expectedResponse);
  });

  it("calls sendImMessage with correct path and body", async () => {
    const params: SendImMessageParams = {
      conversation_id: "conv_123",
      body: {},
    };
    const expectedResponse: TikTokAPIResponse<SendImMessageResponse> = {
      code: 0,
      message: "Success",
      request_id: "req_003",
      data: { content: "this is message", msg_type: "xxxx" },
    };

    mockRequest.mockResolvedValueOnce(expectedResponse);
    const result = await affiliateModule.sendImMessage(params);

    expect(mockRequest).toHaveBeenCalledWith({
      method: "POST",
      path: `/affiliate_seller/202412/conversations/${params.conversation_id}/messages`,
      body: params.body,
    });
    expect(result).toEqual(expectedResponse);
  });

  it("calls createConversationWithCreator with correct path and body", async () => {
    const body: CreateConversationWithCreatorBody = {
      creator_id: "user_123",
      only_need_conversation_id: true,
    };
    const expectedResponse: TikTokAPIResponse<CreateConversationWithCreatorResponse> =
      {
        code: 0,
        message: "Success",
        request_id: "req_004",
        data: { conversation_id: "conv_123" },
      };

    mockRequest.mockResolvedValueOnce(expectedResponse);
    const result = await affiliateModule.createConversationWithCreator(body);

    expect(mockRequest).toHaveBeenCalledWith({
      method: "POST",
      path: `/affiliate_seller/202412/conversations`,
      body,
    });
    expect(result).toEqual(expectedResponse);
  });

  it("calls markConversationRead with correct path and body", async () => {
    const body: MarkConversationReadBody = {
      conversation_ids: ["576486316948490000"],
    };
    const expectedResponse: TikTokAPIResponse<MarkConversationReadResponse> = {
      code: 0,
      message: "Success",
      request_id: "req_005",
      data: {
        failed_conversation_ids: ["123"],
      },
    };

    mockRequest.mockResolvedValueOnce(expectedResponse);
    const result = await affiliateModule.markConversationRead(body);

    expect(mockRequest).toHaveBeenCalledWith({
      method: "POST",
      path: `/affiliate_seller/202412/conversatons/read`,
      body,
    });
    expect(result).toEqual(expectedResponse);
  });

  it("calls getLatestUnreadMessages with correct path", async () => {
    const expectedResponse: TikTokAPIResponse<GetLatestUnreadMessagesResponse> =
      {
        code: 0,
        message: "Success",
        request_id: "req_006",
        data: {
          conversation_id: "12345",
          content: '{"content": "simple text message"}',
          type: "TEXT",
          sender_id: "12345678",
          unread_message_count: 1,
        },
      };

    mockRequest.mockResolvedValueOnce(expectedResponse);
    const result = await affiliateModule.getLatestUnreadMessages();

    expect(mockRequest).toHaveBeenCalledWith({
      method: "GET",
      path: `/affiliate_seller/202412/conversations/messages/list/newest`,
    });
    expect(result).toEqual(expectedResponse);
  });

  it("calls sellerSearchCreatorOnMarketplace with correct path, query, and body", async () => {
    const params: SellerSearchCreatorOnMarketplaceParams = {
      query: { page_size: 10 },
      body: {
        search_key: "2E+0EcXoSk2HWdEWh2nITfkBRMbwuug0mt9s3fWgV0k=",
        keyword: "JefreeStar",
        follower_demographics: {
          age_ranges: ["AGE_RANGE_18_24", "AGE_RANGE_35_44"],
          count_range: {
            count_ge: 1000,
            count_le: 10000,
          },
          gender_distribution: {
            gender: "MALE",
            percentage_ge: 6000,
          },
        },
        gmv_ranges: ["GMV_RANGE_0_100", "GMV_RANGE_100_1000"],
        units_sold_ranges: [
          "UNITS_SOLD_RANGE_0_10",
          "UNITS_SOLD_RANGE_100_1000",
          "UNITS_SOLD_RANGE_OVER_1000",
        ],
      },
    };
    const expectedResponse: TikTokAPIResponse<SellerSearchCreatorOnMarketplaceResponse> =
      {
        code: 0,
        message: "Success",
        request_id: "req_007",
        data: { creators: [] },
      };

    mockRequest.mockResolvedValueOnce(expectedResponse);
    const result =
      await affiliateModule.sellerSearchCreatorOnMarketplace(params);

    expect(mockRequest).toHaveBeenCalledWith({
      method: "POST",
      path: `/affiliate_seller/202412/conversations/messages/list/newest`,
      query: params.query,
      body: params.body,
    });
    expect(result).toEqual(expectedResponse);
  });

  it("calls getMarketplaceCreatorPerformance with correct path", async () => {
    const creator_user_id = "creator_123";
    const expectedResponse: TikTokAPIResponse<GetMarketplaceCreatorPerformanceResponse> =
      {
        code: 0,
        message: "Success",
        request_id: "req_008",
        data: {
          creator: {
            username: "dioab",
            nickname: "Dion",
            avatar: {
              url: "https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/2bf6a2485ec8bf93483e4a6ed907e6fd~c5_720x720.webp?lk3s=a5d48078\\u0026x-expires=1712988000\\u0026x-signature=E8US22KfUCwKz0R%2FMFF6%2FMOmogs%3D",
            },
            selection_region: "US",
            bio_description: "This is my personal introduction",
            follower_count: 2323,
            profile_tt_uri:
              "aweme://user/profile/7200669046446064666?sec_uid=MS4wLjABAAAAvkrSOIMxn2YpXW5qBFVHIbfQ11u2L1hamtgg3mbk5GRPpl1TrnKo5zzQe5T77YLw&from_scene=8&enter_from=scan",
            category_ids: ["60001"],
            top_collaborated_brand_ids: ["8363021"],
            brand_collaboration_count: 76,
            units_sold: 234,
            units_sold_range: {
              minimum_amount: 100,
              maximum_amount: 1000,
            },
            gmv: {
              currency: "USD",
              amount: "3434.23",
            },
            video_gmv: {
              currency: "USD",
              amount: "39232.34",
            },
            live_gmv: {
              currency: "USD",
              amount: "3432.34",
            },
            gmv_range: {
              currency: "USD",
              minimum_amount: "1000.00",
              maximum_amount: "10000.00",
            },
            ec_live_engagement_rate: "6000",
            category_gmv_distribution: [
              {
                category_id: "66666",
                value: "0.3035",
              },
            ],
            content_gmv_distribution: [
              {
                content_type: "VIDEO",
                value: "0.3035",
              },
            ],
            product_original_price_range: {
              currency: "USD",
              minimum_amount: "2.59",
              maximum_amount: "343.23",
            },
            gpm: {
              currency: "USD",
              amount: "10.23",
            },
            live_gpm: {
              currency: "USD",
              amount: "44.96",
            },
            video_gpm: {
              currency: "USD",
              amount: "28.89",
            },
            gpm_range: {
              currency: "USD",
              minimum_amount: "100.00",
              maximum_amount: "1000.00",
            },
            video_gpm_range: {
              currency: "USD",
              minimum_amount: "100.00",
              maximum_amount: "1000.00",
            },
            live_gpm_range: {
              currency: "USD",
              minimum_amount: "100.00",
              maximum_amount: "1000.00",
            },
            promoted_product_num: 311,
            ec_live_count: 12,
            ec_video_count: 34,
            avg_ec_video_play_count: 1234,
            avg_commission_rate: 6000,
            avg_commission_rate_range: {
              minimum_amount: 6000,
              maximum_amount: 7000,
            },
            avg_gmv_per_buyer: {
              currency: "USD",
              amount: "45.68",
            },
            avg_gmv_per_buyer_range: {
              currency: "USD",
              minimum_amount: "100.00",
              maximum_amount: "1000.00",
            },
            avg_ec_live_view_count: 4355,
            avg_ec_live_like_count: 344,
            avg_ec_live_comment_count: 23,
            avg_ec_live_share_count: 3434,
            avg_ec_video_like_count: 324,
            avg_ec_video_comment_count: 343,
            avg_ec_video_share_count: 22,
          },
        },
      };

    mockRequest.mockResolvedValueOnce(expectedResponse);
    const result =
      await affiliateModule.getMarketplaceCreatorPerformance(creator_user_id);

    expect(mockRequest).toHaveBeenCalledWith({
      method: "GET",
      path: `/affiliate_seller/202505/marketplace_creators/${creator_user_id}`,
    });
    expect(result).toEqual(expectedResponse);
  });
});
