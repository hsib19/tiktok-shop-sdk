export interface GetOrderListResponse {
  next_page_token: string;
  total_count: number;
  orders: {
    id: string;
    buyer_message: string;
    cancellation_initiator: string;
    shipping_provider_id: string;
    create_time: number;
    shipping_provider: string;
    packages: {
      id: string;
    }[];
    payment: {
      currency: string;
      sub_total: string;
      shipping_fee: string;
      seller_discount: string;
      platform_discount: string;
      total_amount: string;
      original_total_product_price: string;
      original_shipping_fee: string;
      shipping_fee_seller_discount: string;
      shipping_fee_platform_discount: string;
      shipping_fee_cofunded_discount: string;
      tax: string;
      small_order_fee: string;
      shipping_fee_tax: string;
      product_tax: string;
      retail_delivery_fee: string;
      buyer_service_fee: string;
      handling_fee: string;
      shipping_insurance_fee: string;
      item_insurance_fee: string;
    };
    recipient_address: {
      full_address: string;
      phone_number: string;
      name: string;
      first_name: string;
      last_name: string;
      first_name_local_script: string;
      last_name_local_script: string;
      address_detail: string;
      address_line1: string;
      address_line2: string;
      address_line3: string;
      address_line4: string;
      district_info: {
        address_level_name: string;
        address_name: string;
        address_level: string;
      }[];
      delivery_preferences: {
        drop_off_location: string;
      };
      postal_code: string;
      region_code: string;
    };
    status: string;
    fulfillment_type: string;
    delivery_type: string;
    paid_time: number;
    rts_sla_time: number;
    tts_sla_time: number;
    cancel_reason: string;
    update_time: number;
    payment_method_name: string;
    rts_time: number;
    tracking_number: string;
    split_or_combine_tag: string;
    has_updated_recipient_address: boolean;
    cancel_order_sla_time: number;
    warehouse_id: string;
    request_cancel_time: number;
    shipping_type: string;
    user_id: string;
    seller_note: string;
    delivery_sla_time: number;
    is_cod: boolean;
    delivery_option_id: string;
    cancel_time: number;
    need_upload_invoice: string;
    delivery_option_name: string;
    cpf: string;
    line_items: {
      id: string;
      sku_id: string;
      combined_listing_skus: {
        sku_id: string;
        sku_count: number;
        product_id: string;
        seller_sku: string;
      }[];
      display_status: string;
      product_name: string;
      seller_sku: string;
      sku_image: string;
      sku_name: string;
      product_id: string;
      sale_price: string;
      platform_discount: string;
      seller_discount: string;
      sku_type: string;
      cancel_reason: string;
      original_price: string;
      rts_time: number;
      package_status: string;
      currency: string;
      shipping_provider_name: string;
      cancel_user: string;
      shipping_provider_id: string;
      is_gift: boolean;
      item_tax: {
        tax_type: string;
        tax_amount: string;
        tax_rate: string;
      }[];
      tracking_number: string;
      package_id: string;
      retail_delivery_fee: string;
      buyer_service_fee: string;
      small_order_fee: string;
      handling_duration_days: string;
      is_dangerous_good: boolean;
      needs_prescription: boolean;
    }[];
    buyer_email: string;
    delivery_due_time: number;
    is_sample_order: string;
    shipping_due_time: number;
    collection_due_time: number;
    delivery_option_required_delivery_time: number;
    is_on_hold_order: boolean;
    delivery_time: number;
    is_replacement_order: boolean;
    collection_time: number;
    replaced_order_id: string;
    is_buyer_request_cancel: boolean;
    pick_up_cut_off_time: number;
    fast_dispatch_sla_time: number;
    commerce_platform: string;
    order_type: string;
    release_date: number;
    handling_duration: {
      days: string;
      type: string;
    };
    auto_combine_group_id: string;
    cpf_name: string;
    is_exchange_order: boolean;
    exchange_source_order_id: string;
    consultation_id: string;
    fast_delivery_program: string;
  }[];
}

export interface GetOrderListBody extends Record<string, unknown> {
  order_status?:
    | "UNPAID"
    | "ON_HOLD"
    | "AWAITING_SHIPMENT"
    | "PARTIALLY_SHIPPING"
    | "AWAITING_COLLECTION"
    | "IN_TRANSIT"
    | "DELIVERED"
    | "COMPLETED"
    | "CANCELLED";
  create_time_ge?: number;
  create_time_lt?: number;
  update_time_ge?: number;
  update_time_lt?: string;
  shipping_type?: string | "TIKTOK" | "SELLER";
  buyer_user_id?: string;
  is_buyer_request_cancel?: boolean;
  warehouse_ids?: string[];
}

export type GetOrderListParams = {
  query: {
    page_size: number;
    sort_order?: string;
    page_token?: string;
    sort_field?: string;
  };
  body: GetOrderListBody;
};

export interface GetOrderDetailParams extends Record<string, unknown> {
  ids: string[];
}

export interface GetOrderDetailResponse {
  orders: Order[];
}

export interface Order {
  id: string;
  cancellation_initiator: string;
  shipping_provider: string;
  shipping_provider_id: string;
  user_id: string;
  status: string;
  rts_time: number;
  payment: Payment;
  recipient_address: RecipientAddress;
  buyer_message: string;
  create_time: number;
  tracking_number: string;
  cancel_reason: string;
  rts_sla_time: number;
  paid_time: number;
  fulfillment_type: string;
  seller_note: string;
  tts_sla_time: number;
  cancel_order_sla_time: number;
  update_time: number;
  packages: Package[];
  delivery_type: string;
  is_sample_order: boolean;
  warehouse_id: string;
  split_or_combine_tag: string;
  has_updated_recipient_address: boolean;
  cpf: string;
  delivery_option_id: string;
  delivery_sla_time: number;
  payment_method_name: string;
  shipping_due_time: number;
  line_items: LineItem[];
  shipping_type: string;
  buyer_email: string;
  delivery_time: number;
  need_upload_invoice: string;
  is_cod: boolean;
  request_cancel_time: number;
  delivery_option_required_delivery_time: number;
  delivery_option_name: string;
  is_buyer_request_cancel: boolean;
  delivery_due_time: number;
  collection_time: number;
  is_on_hold_order: boolean;
  cancel_time: number;
  is_replacement_order: boolean;
  replaced_order_id: string;
  collection_due_time: number;
  pick_up_cut_off_time: number;
  fast_dispatch_sla_time: number;
  commerce_platform: string;
  order_type: string;
  release_date: number;
  handling_duration: HandlingDuration;
  auto_combine_group_id: string;
  cpf_name: string;
  is_exchange_order: boolean;
  exchange_source_order_id: string;
  consultation_id: string;
  fast_delivery_program: string;
}

export interface Payment {
  currency: string;
  sub_total: string;
  shipping_fee: string;
  seller_discount: string;
  platform_discount: string;
  total_amount: string;
  original_total_product_price: string;
  original_shipping_fee: string;
  shipping_fee_seller_discount: string;
  shipping_fee_platform_discount: string;
  shipping_fee_cofunded_discount: string;
  tax: string;
  small_order_fee: string;
  shipping_fee_tax: string;
  product_tax: string;
  retail_delivery_fee: string;
  buyer_service_fee: string;
  handling_fee: string;
  shipping_insurance_fee: string;
  item_insurance_fee: string;
}

export interface RecipientAddress {
  full_address: string;
  phone_number: string;
  name: string;
  first_name: string;
  last_name: string;
  first_name_local_script: string;
  last_name_local_script: string;
  region_code: string;
  postal_code: string;
  address_line2: string;
  address_line3: string;
  address_line4: string;
  district_info: DistrictInfo[];
  delivery_preferences: DeliveryPreferences;
  address_detail: string;
  address_line1: string;
}

export interface DistrictInfo {
  address_level_name: string;
  address_name: string;
  address_level: string;
}

export interface DeliveryPreferences {
  drop_off_location: string;
}

export interface Package {
  id: string;
}

export interface LineItem {
  id: string;
  sku_id: string;
  combined_listing_skus: CombinedListingSku[];
  product_id: string;
  product_name: string;
  sku_name: string;
  sku_image: string;
  original_price: string;
  sale_price: string;
  platform_discount: string;
  display_status: string;
  cancel_user: string;
  sku_type: string;
  seller_sku: string;
  shipping_provider_id: string;
  seller_discount: string;
  currency: string;
  package_id: string;
  rts_time: number;
  item_tax: ItemTax[];
  package_status: string;
  shipping_provider_name: string;
  is_gift: boolean;
  cancel_reason: string;
  small_order_fee: string;
  retail_delivery_fee: string;
  tracking_number: string;
  buyer_service_fee: string;
  handling_duration_days: string;
  is_dangerous_good: boolean;
  needs_prescription: boolean;
}

export interface CombinedListingSku {
  sku_id: string;
  sku_count: number;
  product_id: string;
  seller_sku: string;
}

export interface ItemTax {
  tax_type: string;
  tax_amount: string;
  tax_rate: string;
}

export interface HandlingDuration {
  days: string;
  type: string;
}

export interface GetPriceDetailResponse {
  currency: string;
  total: string;
  payment: string;
  sku_list_price: string;
  sku_sale_price: string;
  subtotal: string;
  subtotal_deduction_seller: string;
  subtotal_deduction_platform: string;
  subtotal_tax_amount: string;
  voucher_deduction_platform: string;
  voucher_deduction_seller: string;
  shipping_list_price: string;
  shipping_sale_price: string;
  shipping_fee_deduction_seller: string;
  shipping_fee_deduction_platform: string;
  shipping_fee_deduction_platform_voucher: string;
  tax_amount: string;
  tax_rate: string;
  net_price_amount: string;
  cod_fee: string;
  cod_fee_net_amount: string;
  sku_gift_original_price: string;
  sku_gift_net_price: string;
  line_items: PriceDetailLineItem[];
}

export interface PriceDetailLineItem {
  id: string;
  currency: string;
  total: string;
  payment: string;
  sku_list_price: string;
  sku_sale_price: string;
  subtotal: string;
  subtotal_deduction_seller: string;
  subtotal_deduction_platform: string;
  subtotal_tax_amount: string;
  voucher_deduction_platform: string;
  voucher_deduction_seller: string;
  shipping_list_price: string;
  shipping_sale_price: string;
  shipping_fee_deduction_seller: string;
  shipping_fee_deduction_platform: string;
  shipping_fee_deduction_platform_voucher: string;
  tax_amount: string;
  tax_rate: string;
  net_price_amount: string;
  cod_fee: string;
  cod_fee_amount: string;
  sku_gift_original_price: string;
  sku_gift_net_price: string;
}

export interface GetPriceDetailParams extends Record<string, unknown> {
  order_id: string;
}

export interface AddExternalOrderReferencesBody
  extends Record<string, unknown> {
  orders: ExternalOrderReference[];
}

export interface ExternalOrderReference {
  id: string;
  external_order: ExternalOrder;
}

export interface ExternalOrder {
  id: string;
  platform: string;
  line_items: ExternalOrderLineItem[];
}

export interface ExternalOrderLineItem {
  id: string;
  origin_id: string;
}

export interface GetExternalOrderReferencesParams
  extends Record<string, unknown> {
  order_id: string;
  query: {
    platform: string;
  };
}

export interface GetExternalOrderReferencesResponse {
  external_orders: ExternalOrderReference[];
}

export type ExternalPlatform = "SHOPIFY" | "WOOCOMMERCE" | "MAGENTO" | "OTHERS";

export type SearchOrderByExternalOrderReferenceQuery = {
  platform: ExternalPlatform;
  external_order_id: string;
};

export interface SearchOrderByExternalOrderReferenceResponse {
  orders: ExternalOrderSearchResult[];
}

export interface ExternalOrderSearchResult {
  id: string;
  external_order: ExternalOrderReference;
}
