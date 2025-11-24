export type GetOrderSplitAttributesQuery = {
  order_ids: string[];
};

export type GetOrderSplitAttributesResponse = {
  split_attributes: {
    order_id: string;
    can_split: boolean;
    reason: string;
    must_split: boolean;
    must_split_reasons: {
      type: string;
      category_id: string;
      max_count: string;
    }[];
  }[];
};

type SplittableGroups = {
  id: string;
  order_line_item_ids: string[];
};

export type SplitOrdersQuery = {
  order_id: string;
  body: {
    splittable_groups: SplittableGroups[];
  };
};

export type SplittableGroupsResponse = {
  packages?: SplittableGroups[];
};

export type GetEligibleShippingServiceBody = {
  order_line_item_ids: string[];
  weight?: {
    value: string;
    unit: string;
  };
  dimension?: {
    length: string;
    width: string;
    height: string;
    unit: string;
  };
};

export type GetEligibleShippingServiceInput = {
  order_id: string;
  body: GetEligibleShippingServiceBody;
};

export type GetEligibleShippingServiceResponse = {
  order_id: string;
  order_line_id: string[];
  weight: {
    value: string;
    unit: 'GRAM' | 'POUND';
  };
  shipping_services: {
    id: string;
    name: string;
    price: string;
    currency: string;
    earliest_delivery_days: number;
    latest_delivery_days: number;
    is_default: boolean;
    shipping_provider_name: string;
    shipping_provider_id: string;
  }[];
  dimension: {
    length: string;
    width: string;
    height: string;
    unit: 'INCH' | 'CM' | 'MM';
  };
};

type SearchPackageQuery = {
  page_size: number;
  sort_field?: 'create_time' | 'update_time' | 'order_pay_time';
  sort_order?: 'ASC' | 'DESC';
  page_token?: string;
};

type SearchPackageBody = {
  create_time_ge?: number;
  create_time_lt?: number;
  update_time_ge?: number;
  update_time_lt?: number;
  package_status?: 'PROCESSING' | 'FULFILLING' | 'COMPLETED' | 'CANCELLED';
};

export type SearchPackageInput = {
  query: SearchPackageQuery;
  body?: SearchPackageBody;
};

export type SearchPackageResponse = {
  next_page_token?: string;
  total_count?: number;
  packages?: {
    id?: string;
    orders?: {
      id?: string;
      skus?: {
        id?: string;
        name?: string;
        image_url?: string;
        quantity?: number;
      }[];
    }[];
    create_time?: number;
    update_time?: number;
    status?: string;
    tracking_number?: string;
    shipping_provider_name?: string;
    shipping_provider_id?: string;
    order_line_item_ids?: string[];
  }[];
};

export type CreatePackageBody = {
  order_id: string;
  order_line_item_ids?: string[];
  weight?: {
    value: string;
    unit: 'GRAM' | 'POUND';
  };
  shipping_service_id?: string;
  dimension?: {
    length: string;
    width: string;
    height: string;
    unit: 'CM' | 'INCH';
  };
};

export type CreatePackagesResponse = {
  order_id: string;
  order_line_item_ids: string[];
  dimension: {
    length: string;
    width: string;
    height: string;
    unit: string;
  };
  shipping_service_info: {
    id: string;
    name: string;
    price: string;
    currency: string;
    earliest_delivery_days: number;
    latest_delivery_days: number;
    shipping_provider_id: string;
    shipping_provider_name: string;
  };
  package_id: string;
  weight: {
    value: string;
    unit: string;
  };
  create_time: number;
};

export type CreateFirstMileBundleBody = {
  order_ids: string[];
  handover_method: 'PICKUP' | 'DROP_OFF';
  shipping_provider_id?: string;
  tracking_number?: string;
  phone_tail_number?: string;
};

export type CreateFirstMileBundleResponse = {
  first_mile_bundle_id?: string;
  url?: string;
  errors?: {
    code?: number;
    message?: string;
    detail?: {
      order_id?: string;
    };
  }[];
};

export type SearchCombinablePackagesQuery = {
  page_size: number;
  page_token?: string;
};

export type SearchCombinablePackagesResponse = {
  combinable_packages?: Array<{
    id?: string;
    order_ids?: string[];
  }>;
  next_page_token?: string;
  total_count?: number;
};

export type CombinablePackageBody = {
  combinable_packages: {
    id: string;
    order_ids: string[];
  }[];
};

export type CombinePackageResponse = {
  packages?: Array<{
    id?: string;
    order_ids?: string[];
  }>;
  errors?: Array<{
    code?: number;
    message?: string;
    detail?: {
      package_id?: string;
    };
  }>;
};

export type UncombinePackagesBody = {
  package_id: string;
  body: {
    order_ids: string[];
  };
};

export type UncombinePackagesResponse = {
  packages?: Array<{
    id?: string;
    order_ids?: string[];
  }>;
};

export type GetPackageHandoverTimeSlotsResponse = {
  can_pickup?: boolean;
  can_drop_off?: boolean;
  can_van_collection?: boolean;
  drop_off_point_url?: string;
  pickup_slots?: Array<{
    start_time?: number;
    end_time?: number;
    avaliable?: boolean;
  }>;
};
