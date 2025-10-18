import {
  CreateConversationWithCreatorBody,
  CreateConversationwithCreatorBody,
  CreateConversationWithCreatorResponse,
  CreateConversationwithCreatorResponse,
  CreateOpenCollaborationBody,
  CreateOpenCollaborationResponse,
  CreateTargetCollaborationBody,
  CreateTargetCollaborationResponse,
  EditOpenCollaborationSampleRuleBody,
  EditOpenCollaborationSampleRuleResponse,
  EditOpenCollaborationSettingsBody,
  EditOpenCollaborationSettingsResponse,
  GenerateAffiliateProductPromotionLinkResponse,
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
  RequestFunction,
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
} from '@types';

/**
 * AffiliateSellerModule provides methods to interact with TikTok Shop Affiliate Seller APIs.
 *
 * Currently, it supports initiating direct conversations with creators (affiliates)
 * to build collaborations via affiliate marketing.
 *
 * All endpoints require a valid access token (`x-tts-access-token` header).
 */
export class AffiliateSellerModule {
  /**
   * Initializes the module with a pre-configured request function.
   *
   * @param request The injected request function from the SDK.
   */
  constructor(private request: RequestFunction) {}

  /**
   * Initiate a direct conversation with a creator.
   *
   * This API allows sellers to send a message and start a chat with a creator
   * to initiate affiliate cooperation. The message content must be provided in the request.
   *
   * @returns A promise resolving to the result of the conversation initiation.
   * Endpoint: `POST /affiliate_seller/202412/conversations`
   */
  async createConversationwithCreator(
    body: CreateConversationwithCreatorBody,
  ): Promise<TikTokAPIResponse<CreateConversationwithCreatorResponse>> {
    return this.request({
      method: 'POST',
      path: '/affiliate_seller/202412/conversations',
      body,
    });
  }

  /**
   * Create a target collaboration with creators.
   *
   * Sellers initiate targeted affiliate partnerships by specifying goals and collaboration terms in the request body.
   *
   * @returns A promise resolving to the created collaboration result.
   * Endpoint: `POST /affiliate_seller/202405/target_collaborations`
   */
  async createTargetCollaboration(
    body: CreateTargetCollaborationBody,
  ): Promise<TikTokAPIResponse<CreateTargetCollaborationResponse>> {
    return this.request({
      method: 'POST',
      path: '/affiliate_seller/202405/target_collaborations',
      body,
    });
  }

  /**
   * Edit open collaboration settings.
   *
   * Sellers update configuration options like eligibility rules, application limits, or pricing visibility.
   *
   * @returns A promise resolving to the updated settings.
   * Endpoint: `POST /affiliate_seller/202405/open_collaboration_settings`
   */
  async editOpenCollaborationSettings(
    body: EditOpenCollaborationSettingsBody,
  ): Promise<TikTokAPIResponse<EditOpenCollaborationSettingsResponse>> {
    return this.request({
      method: 'POST',
      path: '/affiliate_seller/202405/open_collaboration_settings',
      body,
    });
  }

  /**
   * Remove a creator from an open collaboration.
   *
   * Excludes a selected creator from a collaboration, using the open_collaboration_id and request payload.
   *
   * @returns A promise indicating removal status.
   * Endpoint: `POST /affiliate_seller/202405/open_collaborations/{open_collaboration_id}/remove_creator`
   */
  async removeCreatorFromOpenCollaboration(
    params: RemoveCreatorFromOpenCollaborationParams,
  ): Promise<TikTokAPIResponse<RemoveCreatorFromOpenCollaborationResponse>> {
    return this.request({
      method: 'POST',
      path: `/affiliate_seller/202405/open_collaborations/${params.open_collaboration_id}/remove_creator`,
      body: params.body,
    });
  }

  /**
   * Generate a promotion link for a product.
   *
   * Sellers generate an affiliate link to promote a product through creators.
   *
   * @returns A promise resolving to the promotion link.
   * Endpoint: `POST /affiliate_seller/202405/products/{product_id}/promotion_link/generate`
   */
  async generateAffiliateProductPromotionLink(
    product_id: string,
  ): Promise<TikTokAPIResponse<GenerateAffiliateProductPromotionLinkResponse>> {
    return this.request({
      method: 'POST',
      path: `/affiliate_seller/202405/products/${product_id}/promotion_link/generate`,
    });
  }

  /**
   * Search products open for affiliate collaboration.
   *
   * Enables product discovery based on filters provided via query and body.
   *
   * @returns A promise with search results.
   * Endpoint: `POST /affiliate_seller/202405/open_collaborations/products/search`
   */
  async sellerSearchAffiliateOpenCollaborationProduct(
    params: SellerSearchAffiliateOpenCollaborationProductParams,
  ): Promise<
    TikTokAPIResponse<SellerSearchAffiliateOpenCollaborationProductResponse>
  > {
    return this.request({
      method: 'POST',
      path: `/affiliate_seller/202405/open_collaborations/products/search`,
      query: params.query,
      body: params.body,
    });
  }

  /**
   * Search affiliate orders placed through seller collaborations.
   *
   * Retrieves orders made via affiliate campaigns using filter criteria such as status, time range, or product identifiers.
   *
   * @returns A promise resolving to the search result of affiliate orders.
   * Endpoint: `POST /affiliate_seller/202410/orders/search`
   */
  async searchSellerAffiliateOrders(
    params: SearchSellerAffiliateOrdersParams,
  ): Promise<TikTokAPIResponse<SearchSellerAffiliateOrdersResponse>> {
    return this.request({
      method: 'POST',
      path: `/affiliate_seller/202410/orders/search`,
      query: params.query,
      body: params.body,
    });
  }

  /**
   * Search fulfillments of sample applications.
   *
   * Allows sellers to fetch the fulfillment status of a submitted sample application using its application ID.
   *
   * @returns A promise resolving to fulfillment details.
   * Endpoint: `POST /affiliate_seller/202409/sample_applications/{application_id}/fulfillments/search`
   */
  async sellerSearchSampleApplicationsFulfillments(
    params: SellerSearchSampleApplicationsFulfillmentsParams,
  ): Promise<
    TikTokAPIResponse<SellerSearchSampleApplicationsFulfillmentsResponse>
  > {
    return this.request({
      method: 'POST',
      path: `/affiliate_seller/202409/sample_applications/${params.application_id}/fulfillments/search`,
      body: params.body,
    });
  }

  /**
   * Review a sample application submitted by a creator.
   *
   * Enables sellers to approve or reject a sample application, including optional feedback message.
   *
   * @returns A promise resolving to the review result.
   * Endpoint: `POST /affiliate_seller/202409/sample_applications/{application_id}/review`
   */
  async sellerReviewSampleApplications(
    params: SellerReviewSampleApplicationsParams,
  ): Promise<TikTokAPIResponse<SellerReviewSampleApplicationsResponse>> {
    return this.request({
      method: 'POST',
      path: `/affiliate_seller/202409/sample_applications/${params.application_id}/review`,
      body: params.body,
    });
  }

  /**
   * Get current sample rules for open collaborations.
   *
   * Retrieves defined sample offer requirements for creators in open collaborations.
   *
   * @returns A promise resolving to the sample rules.
   * Endpoint: `GET /affiliate_seller/202410/open_collaborations/sample_rules`
   */
  async getOpenCollaborationSampleRules(
    query: GetOpenCollaborationSampleRulesQuery,
  ): Promise<TikTokAPIResponse<GetOpenCollaborationSampleRulesResponse>> {
    return this.request({
      method: 'GET',
      path: `/affiliate_seller/202410/open_collaborations/sample_rules`,
      query: query,
    });
  }

  /**
   * Search submitted sample applications.
   *
   * Enables sellers to find sample applications using filtering criteria via query and body payload.
   *
   * @returns A promise resolving to the list of sample applications.
   * Endpoint: `POST /affiliate_seller/202409/sample_applications/search`
   */
  async sellerSearchSampleApplications(
    params: SellerSearchSampleApplicationsParams,
  ): Promise<TikTokAPIResponse<SellerSearchSampleApplicationsResponse>> {
    return this.request({
      method: 'POST',
      path: `/affiliate_seller/202409/sample_applications/search`,
      query: params.query,
      body: params.body,
    });
  }

  /**
   * Edit sample rules for open collaborations.
   *
   * Sellers modify eligibility requirements, sample limits, or content expectations via this API.
   *
   * @returns A promise resolving to the updated rule configuration.
   * Endpoint: `POST /affiliate_seller/202410/open_collaborations/sample_rules`
   */
  async editOpenCollaborationSampleRule(
    body: EditOpenCollaborationSampleRuleBody,
  ): Promise<TikTokAPIResponse<EditOpenCollaborationSampleRuleResponse>> {
    return this.request({
      method: 'POST',
      path: `/affiliate_seller/202410/open_collaborations/sample_rules`,
      body: body,
    });
  }

  /**
   * Remove a target collaboration.
   *
   * Deletes an existing target collaboration specified by its ID.
   *
   * @returns A promise confirming the removal.
   * Endpoint: `DELETE /affiliate_seller/202409/target_collaborations/{target_collaboration_id}`
   */
  async removeTargetCollaboration(
    target_collaboration_id: string,
  ): Promise<TikTokAPIResponse<object>> {
    return this.request({
      method: 'DELETE',
      path: `/affiliate_seller/202409/target_collaborations/${target_collaboration_id}`,
    });
  }

  /**
   * Search target collaborations.
   *
   * Filters and retrieves target collaborations based on the provided criteria in query and body.
   *
   * @returns A promise resolving to the list of target collaborations.
   * Endpoint: `POST /affiliate_seller/202409/target_collaborations/search`
   */
  async searchTargetCollaborations(
    params: SearchTargetCollaborationsParams,
  ): Promise<TikTokAPIResponse<SearchTargetCollaborationsResponse>> {
    return this.request({
      method: 'POST',
      path: `/affiliate_seller/202409/target_collaborations/search`,
      body: params.body,
      query: params.query,
    });
  }

  /**
   * Update a target collaboration.
   *
   * Modifies attributes of an existing target collaboration identified by its ID.
   *
   * @returns A promise resolving to the updated collaboration details.
   * Endpoint: `PUT /affiliate_seller/202409/target_collaborations/{target_collaboration_id}`
   */
  async updateTargetCollaboration(
    params: UpdateTargetCollaborationParams,
  ): Promise<TikTokAPIResponse<UpdateTargetCollaborationResponse>> {
    return this.request({
      method: 'PUT',
      path: `/affiliate_seller/202409/target_collaborations/${params.target_collaboration_id}`,
      body: params.body,
    });
  }

  /**
   * Get open collaboration settings.
   *
   * Retrieves current configuration settings for open collaborations.
   *
   * @returns A promise resolving to the settings data.
   * Endpoint: `GET /affiliate_seller/202409/open_collaboration_settings`
   */
  async getOpenCollaborationSettings(): Promise<
    TikTokAPIResponse<GetOpenCollaborationSettingsResponse>
  > {
    return this.request({
      method: 'GET',
      path: `/affiliate_seller/202409/open_collaboration_settings`,
    });
  }

  /**
   * Remove a product from open collaboration.
   *
   * Deletes a product listing from open collaboration offerings using the product ID.
   *
   * @returns A promise confirming removal success.
   * Endpoint: `DELETE /affiliate_seller/202409/open_collaborations/products/{product_id}`
   */
  async removeOpenCollaboration(
    product_id: string,
  ): Promise<TikTokAPIResponse<RemoveOpenCollaborationResponse>> {
    return this.request({
      method: 'DELETE',
      path: `/affiliate_seller/202409/open_collaborations/products/${product_id}`,
    });
  }

  /**
   * Get details of a target collaboration.
   *
   * Fetches complete information about a target collaboration using its unique ID.
   *
   * @returns A promise resolving to the target collaboration details.
   * Endpoint: `GET /affiliate_seller/202412/target_collaborations/{target_collaboration_id}`
   */
  async queryTargetCollaborationDetail(
    target_collaboration_id: string,
  ): Promise<TikTokAPIResponse<QueryTargetCollaborationDetailResponse>> {
    return this.request({
      method: 'GET',
      path: `/affiliate_seller/202412/target_collaborations/${target_collaboration_id}`,
    });
  }

  /**
   * Get creator content detail in open collaborations.
   *
   * Retrieves submitted content by creators involved in active open collaboration campaigns.
   *
   * @returns A promise resolving to the creator content details.
   * Endpoint: `GET /affiliate_seller/202412/open_collaborations/creator_content_details`
   */
  async getOpenCollaborationCreatorContentDetail(
    query: GetOpenCollaborationCreatorContentDetailQuery,
  ): Promise<
    TikTokAPIResponse<GetOpenCollaborationCreatorContentDetailResponse>
  > {
    return this.request({
      method: 'GET',
      path: `/affiliate_seller/202412/open_collaborations/creator_content_details`,
      query,
    });
  }

  /**
   * Search open collaborations.
   *
   * Allows sellers to browse open collaboration campaigns using filtering options via body and query.
   *
   * @returns A promise resolving to the list of open collaborations.
   * Endpoint: `POST /affiliate_seller/202412/open_collaborations/search`
   */
  async searchOpenCollaboration(
    params: SearchOpenCollaborationParams,
  ): Promise<TikTokAPIResponse<SearchOpenCollaborationResponse>> {
    return this.request({
      method: 'POST',
      path: `/affiliate_seller/202412/open_collaborations/search`,
      body: params.body,
      query: params.query,
    });
  }

  /**
   * Create an open collaboration campaign.
   *
   * Sellers launch a public collaboration invitation for creators by defining campaign details in the request body.
   *
   * @returns A promise resolving to the newly created collaboration.
   * Endpoint: `POST /affiliate_seller/202412/open_collaborations`
   */
  async createOpenCollaboration(
    body: CreateOpenCollaborationBody,
  ): Promise<TikTokAPIResponse<CreateOpenCollaborationResponse>> {
    return this.request({
      method: 'POST',
      path: `/affiliate_seller/202412/open_collaborations`,
      body: body,
    });
  }

  /**
   * Get messages within a conversation.
   *
   * Retrieves message history from a conversation between seller and creator based on conversation ID.
   *
   * @returns A promise resolving to the conversation messages.
   * Endpoint: `GET /affiliate_seller/202412/conversation/{conversation_id}/messages`
   */
  async getMessageInTheConversation(
    params: GetMessageInTheConversationParams,
  ): Promise<TikTokAPIResponse<GetMessageInTheConversationResponse>> {
    return this.request({
      method: 'GET',
      path: `/affiliate_seller/202412/conversation/${params.conversation_id}/messages`,
      query: params.query,
    });
  }

  /**
   * Get list of active conversations.
   *
   * Provides a paginated list of seller-creator conversations with optional filters via query and body.
   *
   * @returns A promise resolving to the list of conversations.
   * Endpoint: `GET /affiliate_seller/202412/conversations`
   */
  async getConversationList(
    params: GetConversationListParams,
  ): Promise<TikTokAPIResponse<GetConversationListResponse>> {
    return this.request({
      method: 'GET',
      path: `/affiliate_seller/202412/conversations`,
      query: params.query,
      body: params.body,
    });
  }

  /**
   * Send a message in a conversation thread.
   *
   * Allows sellers to send a new message to a creator within an existing conversation.
   *
   * @returns A promise resolving to the sent message confirmation.
   * Endpoint: `POST /affiliate_seller/202412/conversations/{conversation_id}/messages`
   */
  async sendImMessage(
    params: SendImMessageParams,
  ): Promise<TikTokAPIResponse<SendImMessageResponse>> {
    return this.request({
      method: 'POST',
      path: `/affiliate_seller/202412/conversations/${params.conversation_id}/messages`,
      body: params.body,
    });
  }

  /**
   * Start a direct conversation with a creator.
   *
   * Initiates a new messaging thread with a creator to discuss affiliate collaboration opportunities.
   *
   * @returns A promise resolving to the newly created conversation.
   * Endpoint: `POST /affiliate_seller/202412/conversations`
   */
  async createConversationWithCreator(
    body: CreateConversationWithCreatorBody,
  ): Promise<TikTokAPIResponse<CreateConversationWithCreatorResponse>> {
    return this.request({
      method: 'POST',
      path: `/affiliate_seller/202412/conversations`,
      body: body,
    });
  }

  /**
   * Mark messages as read in a conversation.
   *
   * Updates the message status in a specific conversation so that unread messages are acknowledged.
   *
   * @returns A promise confirming the read status update.
   * Endpoint: `POST /affiliate_seller/202412/conversatons/read`
   */
  async markConversationRead(
    body: MarkConversationReadBody,
  ): Promise<TikTokAPIResponse<MarkConversationReadResponse>> {
    return this.request({
      method: 'POST',
      path: `/affiliate_seller/202412/conversatons/read`,
      body: body,
    });
  }

  /**
   * Get the latest unread messages across all conversations.
   *
   * Returns the most recent unread messages received by the seller from various creators.
   *
   * @returns A promise resolving to a list of unread messages.
   * Endpoint: `GET /affiliate_seller/202412/conversations/messages/list/newest`
   */
  async getLatestUnreadMessages(): Promise<
    TikTokAPIResponse<GetLatestUnreadMessagesResponse>
  > {
    return this.request({
      method: 'GET',
      path: `/affiliate_seller/202412/conversations/messages/list/newest`,
    });
  }

  /**
   * Search for creators on the affiliate marketplace.
   *
   * Filters and retrieves creator profiles based on search parameters including demographics, performance, and niches.
   *
   * @returns A promise resolving to the list of matching creators.
   * Endpoint: `POST /affiliate_seller/202412/conversations/messages/list/newest`
   */
  async sellerSearchCreatorOnMarketplace(
    params: SellerSearchCreatorOnMarketplaceParams,
  ): Promise<TikTokAPIResponse<SellerSearchCreatorOnMarketplaceResponse>> {
    return this.request({
      method: 'POST',
      path: `/affiliate_seller/202412/conversations/messages/list/newest`,
      query: params.query,
      body: params.body,
    });
  }

  /**
   * Get performance data of a marketplace creator.
   *
   * Retrieves creator metrics such as conversion rates, engagement, and sales to evaluate potential collaboration.
   *
   * @returns A promise resolving to the creator's performance report.
   * Endpoint: `GET /affiliate_seller/202505/marketplace_creators/{creator_user_id}`
   */
  async getMarketplaceCreatorPerformance(
    creator_user_id: string,
  ): Promise<TikTokAPIResponse<GetMarketplaceCreatorPerformanceResponse>> {
    return this.request({
      method: 'GET',
      path: `/affiliate_seller/202505/marketplace_creators/${creator_user_id}`,
    });
  }
}
