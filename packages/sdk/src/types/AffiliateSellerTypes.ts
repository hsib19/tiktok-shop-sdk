export type CreateConversationwithCreatorBody = {
  creator_id: string;
  only_need_conversation_id?: boolean;
};

export type CreateConversationwithCreatorResponse = {
  conversation_id?: string;
  is_new?: string;
  username?: string;
  avatar?: string;
  unread_count?: string;
  creator_im_id?: string;
};

export type CreateTargetCollaborationBody = {
  name: string;
  message: string;
  end_time: string;
  products: {
    id: string;
    target_commission_rate: number;
  }[];
  creator_user_ids: string[];
  seller_contact_info: {
    email: string;
  };
  free_sample_rule: {
    has_free_sample: boolean;
    is_sample_approval_exempt: boolean;
  };
};

export type CreateTargetCollaborationResponse = {
  target_collaboration: {
    id: string;
  };
  target_collaboration_conflicts: {
    creator_user_id: string;
    product_id: string;
  }[];
};

export type EditOpenCollaborationSettingsBody = {
  auto_add_product?: {
    enable: boolean;
    commission_rate: number;
  };
};

export type EditOpenCollaborationSettingsResponse = object;

export type RemoveCreatorFromOpenCollaborationParams = {
  open_collaboration_id: string;
  body: RemoveCreatorFromOpenCollaborationBody;
};

type RemoveCreatorFromOpenCollaborationBody = {
  creator_user_id: string;
  product_id: string;
};

export type RemoveCreatorFromOpenCollaborationResponse = object;

export type GenerateAffiliateProductPromotionLinkParams = {
  product_id: string;
  // body: RemoveCreatorFromOpenCollaborationBody
};

// type GenerateAffiliateProductPromotionLinkBody = {
//     creator_user_id: string;
//     product_id: string;
// }

export type GenerateAffiliateProductPromotionLinkResponse = {
  product_promotion_link?: string;
};

export type SellerSearchAffiliateOpenCollaborationProductParams = {
  query: SellerSearchAffiliateOpenCollaborationProductQuery;
  body?: SellerSearchAffiliateOpenCollaborationProductBody;
};

type SellerSearchAffiliateOpenCollaborationProductQuery = {
  sort_order?: "ASC" | "DESC";
  sort_field?:
    | "commission_rate"
    | "product_sales_price"
    | "commission"
    | "units_sold";
  page_token?: string;
  page_size: number;
};

type SellerSearchAffiliateOpenCollaborationProductBody = {
  title_keywords: string[];
  sales_price_range: {
    amount_ge: string;
    amount_lt: string;
  };
  category: {
    id: string;
  };
  commission_rate_range: {
    rate_ge: number;
    rate_lt: number;
  };
};

export type SellerSearchAffiliateOpenCollaborationProductResponse = {
  products?: {
    shop?: {
      name?: string;
    };
    id?: string;
    has_inventory?: boolean;
    units_sold?: number;
    title?: string;
    sale_region?: string;
    main_image_url?: string;
    detail_link?: string;
    original_price?: {
      currency?: string;
      minimum_amount?: string;
      maximum_amount?: string;
    };
    category_chains?: {
      id?: string;
      local_name?: string;
      is_leaf?: boolean;
      parent_id?: string;
    }[];
    commission?: {
      rate?: number;
      currency?: string;
      amount?: string;
    };
    sales_price?: {
      currency?: string;
      minimum_amount?: string;
      maximum_amount?: string;
    };
  }[];
  next_page_token?: string;
  total_count?: number;
};

export type SearchSellerAffiliateOrdersParams = {
  query: SearchSellerAffiliateOrdersQuery;
  body?: SearchSellerAffiliateOrdersBody;
};

type SearchSellerAffiliateOrdersQuery = {
  page_token?: string;
  page_size: number;
};

type SearchSellerAffiliateOrdersBody = {
  create_time_lt: number;
  create_time_ge: number;
  program_id: string;
};

export type SearchSellerAffiliateOrdersResponse = {
  orders?: {
    id?: string;
    delivery_time?: number;
    create_time?: number;
    status?: string;
    skus?: {
      open_collaboration_id?: string;
      target_collaboration_id?: string;
      campaign_id?: string;
      creator_username?: string;
      price?: {
        amount?: string;
        currency?: string;
      };
      quantity?: number;
      content_type?: string;
      content_id?: string;
      product_id?: string;
      commission_rate?: string;
      shop_ads_commission_rate?: string;
      estimated_commission_base?: {
        amount?: string;
        currency?: string;
      };
      estimated_paid_shop_ads_commission?: {
        amount?: string;
        currency?: string;
      };
      estimated_paid_commission?: {
        amount?: string;
        currency?: string;
      };
      actual_commission_base?: {
        amount?: string;
        currency?: string;
      };
      actual_paid_commission?: {
        amount?: string;
        currency?: string;
      };
      actual_paid_shop_ads_commission?: {
        amount?: string;
        currency?: string;
      };
      refunded_quantity?: number;
      returned_quantity?: number;
      estimated_cofunded_creator_bonus_amount?: {
        amount?: string;
        currency?: string;
      };
      actual_cofunded_creator_bonus_amount?: {
        amount?: string;
        currency?: string;
      };
    }[];
  }[];
  next_page_token?: string;
  total_count?: number;
};

export type SellerSearchSampleApplicationsFulfillmentsParams = {
  application_id: string;
  body?: SellerSearchSampleApplicationsFulfillmentsBody;
};

type SellerSearchSampleApplicationsFulfillmentsBody = {
  content_format?: "LIVE" | "VIDEO";
};

export type SellerSearchSampleApplicationsFulfillmentsResponse = {
  fulfillments?: {
    product?: {
      id?: string;
      main_image_url?: string;
    };
    content?: {
      id?: string;
      format?: string;
      url?: string;
      view_count?: number;
      like_count?: number;
      comment_count?: number;
      paid_order_count?: number;
      page_link?: string;
      description?: string;
      create_time?: number;
      live_end_time?: number;
    };
  }[];
};

export type SellerReviewSampleApplicationsParams = {
  application_id: string;
  body?: SellerReviewSampleApplicationsBody;
};

type SellerReviewSampleApplicationsBody = {
  review_result: "APPROVE" | "REJECT";
  reject_reason?: "NOT_MATCH" | "OFFLINE" | "OUT_OF_STOCK" | "OTHER";
};

export type SellerReviewSampleApplicationsResponse = object;

export type GetOpenCollaborationSampleRulesQuery = {
  product_ids: string[];
};
export type GetOpenCollaborationSampleRulesResponse = {
  sample_rules?: {
    product_id?: string;
    sample_quota?: number;
    is_sample_time_unlimited?: boolean;
    status?: string;
    available_quantity?: number;
    start_time?: number;
    end_time?: number;
    thresholds?: {
      minimum_follower_count?: number;
      minimum_gmv?: number;
      avg_ec_video_views?: number;
      category_ids?: string[];
      predicted_fulfillment_rank?: string;
    };
  }[];
};

export type SellerSearchSampleApplicationsParams = {
  query: SellerSearchSampleApplicationsQuery;
  body: SellerSearchSampleApplicationsBody;
};

type SellerSearchSampleApplicationsQuery = {
  page_token?: string;
  page_size?: string;
};

export type SampleApplicationStatus =
  | "PENDING"
  | "AWAITING_SHIPMENT"
  | "SHIPPED"
  | "CONTENT_PENDING"
  | "REJECT_CANCELLED"
  | "OVERDUE_CANCELLED"
  | "UNFULFILL_CANCELLED"
  | "DEL_OPEN_COLLAB"
  | "SELLER_NOT_SHIP_CANCELLED"
  | "WITHDRAW_CANCELLED"
  | "UNFULFILLABLE_CANCELLED"
  | "OPS_CANCELLED"
  | "OPS_FAILED"
  | "OPS_COMPLETED"
  | "COMPLETED";

type SellerSearchSampleApplicationsBody = {
  product_id?: string;
  title?: string;
  creator_user_id?: string;
  username?: string;
  target_collabration_id?: string;
  order_id?: string;
  status?: SampleApplicationStatus;
};

export type SellerSearchSampleApplicationsResponse = {
  next_page_token?: string;
  total_count?: number;
  sample_applications?: SampleApplicationItem[];
};

export type SampleApplicationItem = {
  id?: string;
  commission_rate?: string;
  status?: string;
  order_id?: string;
  available_quantity?: number;
  approve_expiration_time?: number;
  shipment_expiration_time?: number;
  tracking_number?: string;
  fulfillment_status?: string;
  is_approvable?: boolean;
  disapprovable_reasons?: string[];
  partner_name?: string;
  creator?: SampleApplicationCreator;
  product?: SampleApplicationProduct;
};

export type SampleApplicationCreator = {
  user_id?: string;
  username?: string;
  nickname?: string;
  follower_count?: number;
  avatar_url?: string;
  gmv?: {
    amount?: string;
    currency?: string;
  };
  content_count?: number;
  fulfillment_percentage?: string;
  ec_video_view?: number;
};

export type SampleApplicationProduct = {
  id?: string;
  title?: string;
  sku_id?: string;
  sku_image_url?: string;
  sku_name?: string;
};

export type EditOpenCollaborationSampleRuleBody = {
  product_id: string;
  sample_rule?: SampleRule;
};

export type SampleRule = {
  sample_quota?: number;
  is_sample_time_unlimited?: boolean;
  start_time?: number;
  end_time?: number;
  thresholds?: SampleThresholds;
  activate_status: "ACTIVATE" | "DEACTIVATE";
};

export type SampleThresholds = {
  minimum_follower_count?: number;
  minimum_gmv?: number;
  avg_ec_video_views?: number;
  category_ids?: string[];
  predicted_fulfillment_rank?: "LOW" | "MEDIUM" | "HIGH" | "ALL";
};

export type EditOpenCollaborationSampleRuleResponse = object;

export type SearchTargetCollaborationsParams = {
  query: SearchTargetCollaborationsQuery;
  body: SearchTargetCollaborationsBody;
};

type SearchTargetCollaborationsBody = {
  creator_accept_status?: string;
  free_sample_setting?: string;
  search_param?: {
    keyword_type: string;
    keyword: string;
  };
  creator_user_id?: string;
  collaboration_status: string;
};
type SearchTargetCollaborationsQuery = {
  page_size?: string;
  page_token?: string;
};

export type SearchTargetCollaborationsResponse = {
  total_count?: number;
  next_page_token?: string;
  target_collaborations?: {
    id?: string;
    name?: string;
    message?: string;
    start_time?: number;
    end_time?: number;
    update_time?: number;
    creator_inivited_count?: number;
    showcase_creator_count?: number;
    content_creator_count?: number;
    product_count?: number;
    free_sample_rule?: {
      has_free_sample?: boolean;
      is_sample_approval_exempt?: boolean;
    };
    type?: string;
  }[];
};

export type UpdateTargetCollaborationParams = {
  target_collaboration_id: string;
  body: UpdateTargetCollaborationBody;
};

type UpdateTargetCollaborationBody = {
  name: string;
  end_time: string;
  products: {
    id: string;
    commission_rate: number;
  }[];
  creator_user_ids: string[];
  seller_contact_info: {
    email: string;
  };
  free_sample_rule: {
    has_free_sample: boolean;
    is_sample_approval_exempt: boolean;
  };
};

export type UpdateTargetCollaborationResponse = {
  target_collaboration_conflicts?: {
    creator_user_id?: string;
    product_id?: string;
  }[];
  update_failed?: {
    remove_creator_ids?: string[];
    remove_product_ids?: string[];
    add_creator_ids?: string[];
    add_products?: {
      id?: string;
      commission_rate?: number;
    };
    change_commissions?: {
      product_id?: string;
      commission_rate?: number;
    };
    end_time?: number;
    seller_contact_info?: {
      email?: string;
    };
    name?: string;
  };
};

export type GetOpenCollaborationSettingsResponse = {
  open_collaboration_settings?: {
    auto_add_product?: {
      enable?: boolean;
      commission_rate?: number;
    };
  };
};

export type RemoveOpenCollaborationResponse = {
  terminated_effective_time?: number;
};

export type QueryTargetCollaborationDetailResponse = {
  target_collaboration?: {
    id?: string;
    name?: string;
    message?: string;
    seller_contact_info?: {
      email?: string;
    };
    start_time?: number;
    end_time?: number;
    update_time?: number;
    creator_invited_count?: number;
    showcase_creator_count?: number;
    content_creator_count?: number;
    product_count?: number;
    free_sample_rule?: {
      has_free_sample?: boolean;
      is_sample_approval_exempt?: boolean;
    };
    products?: {
      id?: string;
      main_image_url?: string;
      title?: string;
      original_price?: {
        currency?: string;
        minimum_amount?: string;
        maximum_amount?: string;
      };
      commission?: {
        rate?: number;
        effective_time?: string;
        currency?: string;
        minimum_amount?: string;
        maximum_amount?: string;
      };
      status?: string;
      commission_effective_status?: string;
      collaboration_status?: string;
    }[];
    creators?: {
      username?: string;
      nickname?: string;
      avatar?: {
        url?: string;
      };
      selection_region?: string;
      showcase_product_count?: number;
      content_product_count?: number;
      collaboration_status?: string;
      product_effective_status?: string;
    }[];
    type?: string;
  };
};

export type QueryTargetCollaborationDetailResponse222 = {
  next_page_token?: string;
  total_count?: number;
  creator_content_details?: {
    creator_profile?: {
      username?: string;
      nickname?: string;
      follower_count?: number;
      avatar?: {
        url?: string;
      };
    };
    video_count?: number;
    live_count?: number;
    promotion_status?: string;
    promotion_end_time?: number;
  }[];
  product?: {
    id?: string;
    image_url?: string;
  };
};

export type GetOpenCollaborationCreatorContentDetailQuery = {
  page_token?: string;
  page_size: number;
  product_id: string;
};

export type GetOpenCollaborationCreatorContentDetailResponse = {
  next_page_token?: string;
  total_count?: number;
  creator_content_details?: {
    creator_profile?: {
      username?: string;
      nickname?: string;
      follower_count?: number;
      avatar?: {
        url?: string;
      };
    };
    video_count?: number;
    live_count?: number;
    promotion_status?: string;
    promotion_end_time?: number;
  }[];
  product?: {
    id?: string;
    image_url?: string;
  };
};

export type SearchOpenCollaborationParams = {
  query: SearchOpenCollaborationQuery;
  body?: SearchOpenCollaborationBody;
};

type SearchOpenCollaborationQuery = {
  page_size: number;
  page_token?: string;
  sort_order?: "ASC" | "DESC";
  sort_field?: string | "product_original_price";
};

type SearchOpenCollaborationBody = {
  keyword_type?: string | "PRODUCT_ID" | "PRODUCT_NAME";
  keyword?: string;
  top_level_category_id?: string;
};

export type SearchOpenCollaborationResponse = {
  next_page_token?: string;
  total_count?: number;
  open_collaborations?: {
    id?: string;
    status?: string;
    current_commission?: {
      rate?: number;
      start_time?: number;
      end_time?: number;
    };
    showcase_creator_count?: number;
    content_creator_count?: number;
    product?: {
      id?: string;
      title?: string;
      main_image_url?: string;
      status?: string;
      inventory?: number;
      original_price?: {
        currency?: string;
        minimum_amount?: string;
        maximum_amount?: string;
      };
    };
  }[];
};

export type CreateOpenCollaborationBody = {
  product_id: string;
  commission_rate: number;
};

export type CreateOpenCollaborationResponse = {
  open_collaboration?: {
    id?: string;
    product_id?: string;
    effective_time?: number;
  };
};

export type GetMessageInTheConversationParams = {
  conversation_id: string;
  query: GetMessageInTheConversationQuery;
};

export type GetMessageInTheConversationQuery = {
  page_size: number;
  page_token?: string;
};

export type GetMessageInTheConversationResponse = {
  has_more?: boolean;
  next_page_token?: string;
  messages?: {
    conversation_index?: string;
    message_body?: {
      id?: string;
      conversation_id?: string;
      type?: string;
      content?: string;
      create_time?: number;
      sender_id?: string;
    };
  }[];
};

export type GetConversationListParams = {
  query: GetConversationListQuery;
  body: GetConversationListBody;
};

type GetConversationListQuery = {
  page_size: number;
  page_token?: string;
  only_need_conversation_id?: boolean;
  conversation_status?: string | "ALL" | "UNREAD";
};

export type GetConversationListBody = {
  only_need_conversation_id?: boolean;
};

export type GetConversationListResponse = {
  has_more?: boolean;
  next_page_token?: string;
  conversations?: {
    id?: string;
    unread_count?: number;
    username?: string;
    avatar?: string;
    creator_im_id?: string;
  }[];
};

export type SendImMessageBody = {
  only_need_conversation_id?: boolean;
};

export type SendImMessageParams = {
  conversation_id: string;
  body: SendImMessageBody;
};

export type SendImMessageResponse = {
  msg_type:
    | string
    | "TEXT"
    | "PRODUCT_CARD"
    | "TARGET_COLLABORATION_CARD"
    | "FREE_SAMPLE_CARD";
  content: string;
};

export type CreateConversationWithCreatorBody = {
  creator_id: string;
  only_need_conversation_id?: boolean;
};

export type CreateConversationWithCreatorResponse = {
  conversation_id?: string;
  is_new?: boolean;
  username?: string;
  avatar?: string;
  unread_count?: number;
  creator_im_id?: string;
};

export type MarkConversationReadBody = {
  conversation_ids: string[];
};

export type MarkConversationReadResponse = {
  failed_conversation_ids?: string[];
};

export type MessageType = "TEXT" | "IMAGE" | "VIDEO" | "CARD";

export type GetLatestUnreadMessagesResponse = {
  conversation_id: string;
  content: string;
  type: MessageType;
  sender_id: string;
  unread_message_count: number;
};

export type SellerSearchCreatorOnMarketplaceParams = {
  query: SellerSearchCreatorOnMarketplaceQuery;
  body: SellerSearchCreatorOnMarketplaceBody;
};

type SellerSearchCreatorOnMarketplaceQuery = {
  page_size: number;
  page_token?: string;
};

export type SellerSearchCreatorOnMarketplaceBody = {
  search_key: string;
  keyword: string;
  follower_demographics: {
    age_ranges: string[];
    count_range: {
      count_ge: number;
      count_le: number;
    };
    gender_distribution: {
      gender: "MALE" | "FEMALE" | "OTHER";
      percentage_ge: number;
    };
  };
  gmv_ranges: string[];
  units_sold_ranges: string[];
};

export type SellerSearchCreatorOnMarketplaceResponse = {
  next_page_token?: string;
  search_key?: string;
  creators?: {
    username?: string;
    nickname?: string;
    avatar?: {
      url?: string;
    };
    selection_region?: string;
    category_ids?: string[];
    avg_ec_live_uv?: number;
    avg_ec_video_view_count?: number;
    follower_count?: number;
    gmv?: {
      currency?: string;
      amount?: string;
    };
    live_gmv?: {
      currency?: string;
      amount?: string;
    };
    video_gmv?: {
      currency?: string;
      amount?: string;
    };
    gmv_range?: {
      currency?: string;
      minimum_amount?: string;
      maximum_amount?: string;
      formatted_range?: string;
    };
    units_sold_range?: {
      minimum_amount?: number;
      maximum_amount?: number;
      formatted_range?: string;
    };
    top_follower_demographics?: {
      age_ranges?: string[];
      major_gender?: {
        gender?: "MALE" | "FEMALE" | "OTHER";
        percentage?: number;
      };
    };
  }[];
};

export type GetMarketplaceCreatorPerformanceResponse = {
  creator?: {
    username?: string;
    nickname?: string;
    avatar?: {
      url?: string;
    };
    selection_region?: string;
    bio_description?: string;
    follower_count?: number;
    profile_tt_uri?: string;
    category_ids?: string[];
    top_collaborated_brand_ids?: string[];
    brand_collaboration_count?: number;
    units_sold?: number;
    units_sold_range?: {
      minimum_amount?: number;
      maximum_amount?: number;
      formatted_range?: string;
    };
    gmv?: {
      currency?: string;
      amount?: string;
    };
    video_gmv?: {
      currency?: string;
      amount?: string;
    };
    live_gmv?: {
      currency?: string;
      amount?: string;
    };
    gmv_range?: {
      currency?: string;
      minimum_amount?: string;
      maximum_amount?: string;
      formatted_range?: string;
    };
    ec_live_engagement_rate?: string;
    category_gmv_distribution?: {
      category_id?: string;
      value?: string;
    }[];
    content_gmv_distribution?: {
      content_type?: string;
      value?: string;
    }[];
    product_original_price_range?: {
      currency?: string;
      minimum_amount?: string;
      maximum_amount?: string;
    };
    gpm?: {
      currency?: string;
      amount?: string;
    };
    live_gpm?: {
      currency?: string;
      amount?: string;
    };
    video_gpm?: {
      currency?: string;
      amount?: string;
    };
    gpm_range?: {
      currency?: string;
      minimum_amount?: string;
      maximum_amount?: string;
      formatted_range?: string;
    };
    video_gpm_range?: {
      currency?: string;
      minimum_amount?: string;
      maximum_amount?: string;
      formatted_range?: string;
    };
    live_gpm_range?: {
      currency?: string;
      minimum_amount?: string;
      maximum_amount?: string;
      formatted_range?: string;
    };
    promoted_product_num?: number;
    ec_live_count?: number;
    ec_video_count?: number;
    avg_ec_video_play_count?: number;
    avg_commission_rate?: number;
    avg_commission_rate_range?: {
      minimum_amount?: number;
      maximum_amount?: number;
    };
    avg_gmv_per_buyer?: {
      currency?: string;
      amount?: string;
    };
    avg_gmv_per_buyer_range?: {
      currency?: string;
      minimum_amount?: string;
      maximum_amount?: string;
      formatted_range?: string;
    };
    avg_ec_live_view_count?: number;
    avg_ec_live_like_count?: number;
    avg_ec_live_comment_count?: number;
    avg_ec_live_share_count?: number;
    avg_ec_video_like_count?: number;
    avg_ec_video_comment_count?: number;
    avg_ec_video_share_count?: number;
  };
};
