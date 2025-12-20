export type CreateAffiliatePartnerCampaignBody = {
  name: string;
  description: string;
  campaign_start_time: number;
  campaign_end_time: number;
  registration_start_time: number;
  registration_end_time: number;
  commission_rate: number;
  contact_info: ContactInfo;
  target_shop_codes?: string[];
  target_seller_types?: ('LOCAL' | 'CROSS_BORDER')[];
};

type ContactInfo = {
  whatsapp?: string;
  email: string;
  phone?: string;
  zalo?: string;
  viber?: string;
  line?: string;
};

export type CreateAffiliatePartnerCampaignResponse = {
  campaign_id: string;
};

export type EditAffiliatePartnerCampaignBody = {
  name?: string;
  description?: string;
  campaign_start_time?: number;
  campaign_end_time?: number;
  registration_start_time?: number;
  registration_end_time?: number;
  commission_rate?: number;
  contact_info?: ContactInfo;
  target_shop_codes?: string[];
  target_seller_types?: ('LOCAL' | 'CROSS_BORDER')[];
};

export type EditAffiliatePartnerCampaignResponse = object;

export type ReviewAffiliatePartnerCampaignProductBody = {
  review_result: 'APPROVE' | 'REJECT' | 'REJECT_FOREVER';
  reject_reasons?: (
    | 'COMMISSION_TOO_LOW'
    | 'PRODUCT_HARD_TO_PROMOTE'
    | 'PRODUCT_TOO_EXPENSIVE'
    | 'NO_SUITABLE_CREATOR'
  )[];
};

export type GenerateAffiliatePartnerCampaignProductLinkBody = {
  creator_commission_rate: number;
};

export type GenerateAffiliatePartnerCampaignProductLinkResponse = {
  product_promotion_link: string;
};

export type AffiliatePartnerCampaignDetailResponse = {
  campaign_id: string;
  name: string;
  description: string;
  campaign_start_time: number;
  campaign_end_time: number;
  registration_start_time: number;
  registration_end_time: number;
  commission_rate: number;
  contact_info: ContactInfo;
  target_shop_codes: string[];
  target_seller_types: ('LOCAL' | 'CROSS_BORDER')[];
  status: 'READY' | 'UPCOMING' | 'CLOSED' | string;
};

export type GetAffiliatePartnerCampaignListQuery = {
  page_size: number;
  page_token?: string;
  status?: 'READY' | 'UPCOMING' | 'ONGOING' | 'CLOSED' | 'UNSPECIFIED';
  type?:
    | 'MY_CAMPAIGNS'
    | 'GS_SELLING_CAMPAIGNS'
    | 'SELLER_CAMPAIGNS'
    | 'EXCLUSIVE_TIKTOK_SHOP';
  query_type_filter?: 'MARKETPLACE' | 'JOINED' | 'AVAILABLE' | 'Default';
};

export type GetAffiliatePartnerCampaignListResponse = {
  campaigns: AffiliatePartnerCampaignSummary[];
  next_page_token?: string;
  total_count: number;
};

type AffiliatePartnerCampaignSummary = {
  id: string;
  name: string;
  status: 'READY' | 'UPCOMING' | 'ONGOING' | 'CLOSED';
  registration_start_time: number;
  registration_end_time: number;
  campaign_start_time: number;
  campaign_end_time: number;
};

export type GetAffiliatePartnerCampaignProductListQuery = {
  page_size: number;
  page_token?: string;
  review_status?:
    | 'PENDING'
    | 'APPROVED'
    | 'REJECTED'
    | 'PENDING_CLOSED'
    | 'CLOSED';
  product_name?: string;
  product_id?: string;
  shop_name?: string;
  category_id?: string;
};

export type GetAffiliatePartnerCampaignProductListResponse = {
  products: AffiliatePartnerCampaignProduct[];
  next_page_token?: string;
  total_count: number;
};

type AffiliatePartnerCampaignProduct = {
  id: string;
  review_status:
    | 'PENDING'
    | 'APPROVED'
    | 'REJECTED'
    | 'PENDING_CLOSED'
    | 'CLOSED';
  name: string;
  main_image_url: string;
  lowest_price: Price;
  highest_price: Price;
  inventory: number;
  shop_name: string;
  total_commission_rate: number;
  creator_commission_rate: number;
  partner_commission_rate: number;
  open_collaboration_commission_rate: number;
  is_available: boolean;
  product_sales: number;
  category: {
    id: string;
    name: string;
  };
  sample_quota: number;
  sku_information_list: SKUInformation[];
  product_description: string;
};

type Price = {
  currency: string;
  amount: string;
};

type SKUInformation = {
  sku_name: string;
  sku_id: string;
  inventory: {
    available_quantity: string;
  };
  base_price: RegionPrice;
  region_prices: RegionPrice[];
  properties: SKUProperty[];
};

type RegionPrice = {
  region_code: string;
  currency: string;
  list_price: string;
  sale_price: string;
  localized_dutiable_price: string;
};

type SKUProperty = {
  name: string;
  value_name: string;
};

export type SearchTapAffiliateOrdersBody = {
  create_time_ge?: number;
  create_time_lt?: number;
  campaign_id?: string;
};

export type TapAffiliateOrder = {
  id: string;
  create_time: number;
  delivery_time: number;
  status: 'COMPLETED' | string;
  skus: TapAffiliateOrderSKU;
};

type TapAffiliateOrderSKU = {
  id: string;
  campaign_id: string;
  creator_username: string;
  product_name: string;
  product_id: string;
  price: CurrencyAmount;
  quantity: number;
  content_type: 'VIDEO' | string;
  content_id: string;
  creator_commission_rate: number;
  tap_commission_rate: number;
  estimated_commission_base: CurrencyAmount;
  estimated_creator_commission: CurrencyAmount;
  estimated_tap_commission: CurrencyAmount;
  actual_commission_base: CurrencyAmount;
  actual_creator_commission: CurrencyAmount;
  actual_tap_commission: CurrencyAmount;
  refunded_quantity: number;
  returned_quantity: number;
  partner_commission_reward_rate: number;
  estimated_partner_commission_reward_fee: CurrencyAmount;
  actual_partner_commission_reward_fee: CurrencyAmount;
  creator_commission_reward_rate: number;
  estimated_creator_commission_reward_fee: CurrencyAmount;
  actual_creator_commission_reward_fee: CurrencyAmount;
};

type CurrencyAmount = {
  amount: string;
  currency: string;
};

export type SearchTapAffiliateOrdersResponse = {
  orders: TapAffiliateOrder[];
  next_page_token?: string;
  total_count: number;
};

export type GetAffiliateCampaignCreatorFulfillmentStatusList = {
  page_size?: number;
  page_token?: string;
};

export type GetAffiliateCampaignCreatorFulfillmentStatusListResponse = {
  total_count: number;
  campaign_product_statistics: CampaignProductStatistic[];
  next_page_token?: string;
};

type CampaignProductStatistic = {
  data_update_time: string;
  creator_sales_num: number;
  collaborated_creators_num: number;
  promoted_creator_num: number;
  sample_requested_creator_num: number;
  campaign_product_detail: CampaignProductDetail;
};

type CampaignProductDetail = {
  product_id: string;
  product_status: 'PRODUCT_UNSPECIFIED' | string;
  product_name: string;
  product_stock_count: string;
  total_commission_percent: string;
  creator_commission_percent: string;
  partner_commission_percent: string;
  plan_commission_percent: string;
  product_price: ProductPrice;
  product_thumbnail: ProductThumbnail;
  indicator_data: IndicatorData;
};

type ProductPrice = {
  min_price: string;
  max_price: string;
  currency: string;
};

type ProductThumbnail = {
  uri: string;
  url_list: string[];
};

type IndicatorData = {
  paid_order_num: string;
  actual_order_num: string;
  estimated_amount: string;
  actual_amount: string;
  estimated_partner_commission: string;
  actual_partner_commission: string;
  creator_sales_num: string;
  collaborated_creators_num: string;
  promoted_creator_num: string;
  sample_requested_creator_num: string;
};

export type SearchCAPAffiliateOrdersBody = {
  order_id?: string;
  order_status?: number;
  product_id?: string;
  create_time_ge?: number;
  create_time_lt?: number;
};

export type SearchCAPAffiliateOrdersResponse = {
  orders: CAPAffiliateOrder[];
  next_page_token?: string;
  total_count: number;
};

type CAPAffiliateOrder = {
  id: string;
  tags: string;
  create_time: number;
  delivery_time: number;
  status: 'COMPLETED' | string;
  skus: CAPAffiliateOrderSKU;
};

type CAPAffiliateOrderSKU = {
  id: string;
  open_collaboration_id: string;
  target_collaboration_id: string;
  creator_username: string;
  product_name: string;
  product_id: string;
  price: CurrencyAmount;
  quantity: number;
  shop_name: string;
  content_type: 'VIDEO' | string;
  content_id: string;
  attribution_type: string;
  commission_tier_setting: string;
  commission_model: string;
  commission_rate: string;
  commission_bonus_rate: string;
  shop_ads_commission_rate: string;
  estimated_commission_base: CurrencyAmount;
  estimated_commission: CurrencyAmount;
  estimated_bonus_commission: CurrencyAmount;
  estimated_shop_ads_commission: CurrencyAmount;
  actual_commission_base: CurrencyAmount;
  actual_commission: CurrencyAmount;
  actual_bonus_commission: CurrencyAmount;
  actual_shop_ads_commission: CurrencyAmount;
  agency_commission: CurrencyAmount;
  agency_bonus_commission: CurrencyAmount;
  agency_shop_ads_commission: CurrencyAmount;
  total_agency_commission: CurrencyAmount;
  agency_commission_rate: string;
  iva: string;
  isr: string;
  returned_quantity: number;
  refunded_quantity: number;
};

export type PartnerGenerateMultiAffiliateCampaignProductLinkBody = {
  product_ids: string[];
};

export type PartnerGenerateMultiAffiliateCampaignProductLinkResponse = {
  product_promotion_links: ProductPromotionLink[];
  failed_product_ids: string[];
};

type ProductPromotionLink = {
  product_id: string;
  link: string;
};

export type GetAffiliateCampaignCreatorFulfillmentStatusInfoQuery = {
  page_size?: number;
  page_token?: string;
};

export type GetAffiliateCampaignCreatorFulfillmentStatusInfoResponse = {
  total_creator_count?: number;
  promotion_creators?: PromotionCreator[];
  paid_amount?: CurrencyAmount;
  room_count?: number;
  video_count?: number;
  free_sample_status?: FreeSampleStatus;
  commission?: string;
  effective_start_time?: string;
  effective_end_time?: string;
  next_page_token?: string;
};

type PromotionCreator = {
  paid_amount?: {
    currency: string;
    amount: string;
  };
  room_count?: number;
  video_count?: number;
  free_sample_status?: FreeSampleStatus | string;
  commission?: string;
  effective_end_time?: string;
  effective_start_time?: string;
  creator?: {
    nick_name?: string;
    avatar_url?: string;
    follower_num?: number;
    user_name?: string;
    creator_open_id?: string;
  };
  affiliate_product_id?: string;
};

type FreeSampleStatus =
  | 'NOT_REQUESTED'
  | 'PENDING'
  | 'AWAITING_SHIPMENT'
  | 'AWAITING_COLLECTION'
  | 'SHIPPED'
  | 'CONTENT_PENDING'
  | 'REJECT_CANCELLED'
  | 'OVERDUE_CANCELLED'
  | 'UNFULFIL_CANCELLED'
  | 'DEL_PLAN_CANCELLED'
  | 'SELLER_NOT_SHIP_CANCELLED'
  | 'WITHDRAW_CANCELLED'
  | 'UNFULFILLABLE_CANCELLED'
  | 'OPERATOR_MANUAL_CANCELLED'
  | 'OPERATOR_MANUAL_FAILED'
  | 'OPERATOR_MANUAL_COMPLETED'
  | 'COMPLETED';

export type GetAffiliateCampaignCreatorProductContentStatisticsQuery = {
  affiliate_product_id: string;
  content_type?: '1' | '2'; // 1 = VIDEO, 2 = LIVE_ROOM
};

export type GetAffiliateCampaignCreatorProductContentStatisticsResponse = {
  creator_content_statistics?: CreatorContentStatistic[];
};

type CreatorContentStatistic = {
  content_type?: 'VIDEO' | 'LIVE_ROOM';
  cover_img_url?: string;
  source_url?: string;
  view_count?: string;
  like_count?: string;
  comment_num?: string;
  paid_order_num?: string;
  paid_amount?: string;
  linked_tiktok_video?: string;
  published_date?: string; // format: YYYY_MM_DD
  content_end_date?: string; // format: YYYY_MM_DD or undefined for VIDEO
};

export type GetAffiliateCampaignCreatorProductSampleStatusResponse = {
  sample_status?: SampleStatus;
};

type SampleStatus = {
  shipping_provider_name?: string;
  delivery_option?: 'ECONOMY_SHIPPING' | 'PREMIUM_SHIPPING' | string;
  estimated_earliest_delivery_date?: string; // Unix epoch format
  estimated_latest_delivery_date?: string; // Unix epoch format
  quantity?: number;
  tracking_results?: TrackingEvent[];
};

type TrackingEvent = {
  tracking_event_update_date?: string; // Unix epoch format
  tracking_event_description?: TrackingEventDescription | string;
  tracking_event_description_extended?: string;
};

type TrackingEventDescription =
  | 'THE_PACKAGE_HAS_BEEN_DELIVERED'
  | 'OUT_FOR_DELIVERY'
  | 'ORDER_PACKED_AND_READY_FOR_DROP_OFF_AT_CARRIERS_FACILITY'
  | 'ORDER_PLACED';
