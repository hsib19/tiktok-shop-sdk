type ActivityType =
  | "FIXED_PRICE"
  | "DIRECT_DISCOUNT"
  | "FLASHSALE"
  | "SHIPPING_DISCOUNT"
  | "BUY_MORE_SAVE_MORE";

type ProductLevel = "PRODUCT" | "VARIATION" | "SHOP";

type DurationType = "NORMAL" | "INDEFINITE";

type ParticipationLimitType = "BUYER_NO_LIMIT" | "BUYER_LIMIT_ONLY_ONE";

export type CreateActivityBody = {
  title: string;
  activity_type: ActivityType;
  product_level: ProductLevel;
  begin_time: number;
  end_time: number;
  participation_limit: {
    type: ParticipationLimitType;
  }[];
  duration_type?: DurationType;
  discount?: {
    shipping_discount?: {
      threshold_type?: string;
      threshold_value?: string;
      type?: string;
      value?: string;
      shipping_method?: string;
      inventory_type?: string;
      area_scope?: {
        type?: string;
        specific_areas?: string[];
      };
    };
    bmsm_discount?: {
      details?: {
        tier?: number;
        threshold_type?: string;
        threshold_value?: string;
        type?: string;
        value?: string;
      }[];
    };
  };
};

export type CreateActivityResponse = {
  activity_id?: string;
  create_time?: string;
  update_time?: string;
  status?: string;
};

export type UpdateActivityBody = CreateActivityBody & { activity_id: string };

export interface UpdateActivityResponse {
  activity_id: string;
  title: string;
  update_time: number;
}

export type DeactivateActivityResponse = {
  activity_id?: string;
  title?: string;
  status?: string;
  update_time?: number;
};

export type GetActivityResponse = {
  activity_id?: string;
  title?: string;
  activity_type?: string;
  duration_type?: string;
  begin_time?: number;
  end_time?: number;
  participation_limit?: {
    type?: string;
  }[];
  products?: {
    id?: string;
    activity_price?: {
      amount?: string;
      currency?: string;
    };
    quantity_limit?: number;
    quantity_per_user?: number;
    discount?: string;
    skus?: {
      id?: string;
      discount?: string;
      quantity_limit?: number;
      quantity_per_user?: number;
      activity_price?: {
        amount?: string;
        currency?: string;
      };
    }[];
  }[];
  status?: string;
  create_time?: number;
  update_time?: number;
  product_level?: string;
  activity_commands?: string;
  discount?: {
    shipping_discount?: {
      threshold_type?: string;
      threshold_value?: string;
      type?: string;
      value?: string;
      shipping_method?: string;
      inventory_type?: string;
      area_scope?: {
        type?: string;
        specific_areas?: string;
      };
    };
    bmsm_discount?: {
      details?: {
        tier?: number;
        threshold_type?: string;
        threshold_value?: string;
        type?: string;
        value?: string;
      }[];
    };
  };
};

export type SearchActivityBody = {
  status?:
    | "DRAFT"
    | "NOT_START"
    | "ONGOING"
    | "EXPIRED"
    | "DEACTIVATED"
    | "NOT_EFFECTIVE";
  activity_title?: string;
  page_size?: number;
  page_token?: string;
  activity_type?: ActivityType;
};

export type Activity = {
  id?: string;
  title?: string;
  activity_type?: string;
  duration_type?: string;
  begin_time?: number;
  end_time?: number;
  status?: string;
  create_time?: number;
  update_time?: number;
  product_level?: string;
  activity_commands?: string;
  participation_limit?: {
    type?: string;
  }[];
  discount?: {
    shipping_discount?: {
      threshold_type?: string;
      threshold_value?: string;
      type?: string;
      value?: string;
      shipping_method?: string;
      inventory_type?: string;
      area_scope?: {
        type?: string;
        specific_areas?: string;
      };
    };
    bmsm_discount?: {
      details?: {
        tier?: number;
        threshold_type?: string;
        threshold_value?: string;
        type?: string;
        value?: string;
      }[];
    };
  };
};

export type SearchActivityResponse = {
  total_count?: number;
  next_page_token?: string;
  activities?: Activity[];
};

export type UpdateActivityProductBody = {
  activity_id: string;
  products: {
    id: string;
    quantity_per_user: number;
    quantity_limit: number;
    activity_price_amount?: string;
    discount?: string;
    skus?: {
      id: string;
      quantity_per_user: number;
      quantity_limit: number;
      activity_price_amount?: string;
      discount?: string;
    }[];
  }[];
};

export type UpdateActivityProductResponse = {
  activity_id?: string;
  title?: string;
  update_time?: number;
  status?: string;
  total_count?: number;
};

export type RemoveActivityProductInput = {
  activity_id: string;
  body: RemoveActivityProductBody;
};

export type RemoveActivityProductBody = {
  product_ids: string[];
  sku_ids: string[];
};
export type RemoveActivityProductResponse = {
  activity_id?: string;
  status?: string;
  update_time?: number;
};

export type GetCouponResponse = {
  coupon?: {
    id?: string;
    title?: string;
    display_type?: string;
    status?: string;
    create_time?: number;
    update_time?: number;
    claim_duration?: {
      start_time?: number;
      end_time?: number;
    };
    redemption_duration?: {
      type?: string;
      start_time?: number;
      end_time?: number;
      relative_time?: number;
    };
    display_channels?: string[];
    promo_code?: string;
    target_buyer_segment?: string;
    usage_limits?: {
      single_buyer_claim_limit?: number;
      total_claim_limit?: number;
      redemption_limit?: number;
    };
    usage_stats?: {
      claimed_count?: number;
      redeemed_count?: number;
    };
    discount?: {
      type?: string;
      reduction_amount?: {
        amount?: string;
        currency?: string;
      };
      percentage?: string;
      max_discount?: {
        amount?: string;
        currency?: string;
      };
    };
    threshold?: {
      type?: string;
      min_spend?: {
        amount?: string;
        currency?: string;
      };
    };
    product_scope?: string;
    product_ids?: string[];
    seller_tnc?: string;
    creation_source?: string;
    live_tasks?: {
      type?: string;
      min_watch_time?: string;
    }[];
  };
};

export type SearchCouponBody = {
  status: ("NOT_START" | "ONGOING" | "EXPIRED" | "DEACTIVATED")[];
  title_keyword: string;
  display_type: (
    | "REGULAR"
    | "LIVE"
    | "CREATOR_EXCLUSIVE"
    | "CHAT"
    | "PROMO_CODE"
  )[];
};

export type SearchCouponResponse = {
  total_count?: number;
  next_page_token?: string;
  coupons?: {
    id?: string;
    title?: string;
    display_type?: string;
    status?: string;
    create_time?: number;
    update_time?: number;
    claim_duration?: {
      start_time?: number;
      end_time?: number;
    };
    redemption_duration?: {
      type?: string;
      start_time?: number;
      end_time?: number;
      relative_time?: number;
    };
    promo_code?: string;
    target_buyer_segment?: string;
    usage_limits?: {
      single_buyer_claim_limit?: number;
      total_claim_limit?: number;
      redemption_limit?: number;
    };
    discount?: {
      type?: string;
      reduction_amount?: {
        amount?: string;
        currency?: string;
      };
      percentage?: string;
      max_discount?: {
        amount?: string;
        currency?: string;
      };
    };
    threshold?: {
      type?: string;
      min_spend?: {
        amount?: string;
        currency?: string;
      };
    };
    product_scope?: string;
    creation_source?: string;
  }[];
};
