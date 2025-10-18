export type GetShopPerformanceQuery = {
  start_date_ge: string;
  end_date_lt: string;
  with_comparison?: boolean;
  granularity?: string | 'ALL' | '1D';
  currency?: string | 'USD' | 'LOCAL';
};

export type GetShopPerformanceResponse = {
  performance?: {
    intervals?: {
      start_date?: string;
      end_date?: string;
      gmv?: {
        amount?: string;
        currency?: string;
      };
      gmv_breakdowns?: {
        amount?: string;
        currency?: string;
        type?: string;
      }[];
      sku_orders?: number;
      orders?: number;
      avg_order_value?: {
        amount?: string;
        currency?: string;
      };
      units_sold?: number;
      buyers?: number;
      buyer_breakdowns?: {
        amount?: number;
        type?: string;
      }[];
      product_impressions?: number;
      product_impression_breakdowns?: {
        amount?: number;
        type?: string;
      }[];
      product_page_views?: number;
      product_page_view_breakdowns?: {
        amount?: number;
        type?: string;
      }[];
      avg_product_page_visitors?: number;
      avg_product_page_visitor_breakdowns?: {
        amount?: number;
        type?: string;
      }[];
      refunds?: {
        amount?: string;
        currency?: string;
      };
      cancellations_and_returns?: number;
    }[];
    comparison_intervals?: {
      start_date?: string;
      end_date?: string;
      gmv?: {
        amount?: string;
        currency?: string;
      };
      gmv_breakdowns?: {
        amount?: string;
        currency?: string;
        type?: string;
      }[];
      sku_orders?: number;
      orders?: number;
      avg_order_value?: {
        amount?: string;
        currency?: string;
      };
      units_sold?: number;
      buyers?: number;
      buyer_breakdowns?: {
        amount?: number;
        type?: string;
      }[];
      product_impressions?: number;
      product_impression_breakdowns?: {
        amount?: number;
        type?: string;
      }[];
      product_page_views?: number;
      product_page_view_breakdowns?: {
        amount?: number;
        type?: string;
      }[];
      avg_product_page_visitors?: number;
      avg_product_page_visitor_breakdowns?: {
        amount?: number;
        type?: string;
      }[];
      refunds?: {
        amount?: string;
        currency?: string;
      };
      cancellations_and_returns?: number;
    }[];
  };
  latest_available_date?: string;
};

export type GetShopProductPerformanceParams = {
  product_id: string;
  query: GetShopPerformanceQuery;
};

export type GetShopProductPerformanceResponse = {
  performance?: {
    intervals?: {
      start_date?: string;
      end_date?: string;
      gmv?: {
        amount?: string;
        currency?: string;
      };
      gmv_breakdowns?: {
        amount?: string;
        currency?: string;
        type?: string;
      }[];
      orders?: number;
      units_sold?: number;
      unit_sold_breakdowns?: {
        amount?: number;
        type?: string;
      }[];
      impressions?: number;
      impression_breakdowns?: {
        amount?: number;
        type?: string;
      }[];
      page_views?: number;
      page_view_breakdowns?: {
        amount?: number;
        type?: string;
      }[];
      avg_page_visitors?: number;
      avg_page_visitor_breakdowns?: {
        amount?: number;
        type?: string;
      }[];
      click_through_rate?: string;
      click_through_rate_breakdowns?: {
        amount?: string;
        type?: string;
      }[];
    }[];
    comparison_intervals?: {
      start_date?: string;
      end_date?: string;
      gmv?: {
        amount?: string;
        currency?: string;
      };
      gmv_breakdowns?: {
        amount?: string;
        currency?: string;
        type?: string;
      }[];
      orders?: number;
      units_sold?: number;
      unit_sold_breakdowns?: {
        amount?: number;
        type?: string;
      }[];
      impressions?: number;
      impression_breakdowns?: {
        amount?: number;
        type?: string;
      }[];
      page_views?: number;
      page_view_breakdowns?: {
        amount?: number;
        type?: string;
      }[];
      avg_page_visitors?: number;
      avg_page_visitor_breakdowns?: {
        amount?: number;
        type?: string;
      }[];
      click_through_rate?: string;
      click_through_rate_breakdowns?: {
        amount?: string;
        type?: string;
      }[];
    }[];
  };
  latest_available_date?: string;
};

export type GetShopProductPerformanceListQuery = {
  start_date_ge: string;
  end_date_lt: string;
  page_size?: number;
  sort_field?: 'gmv' | 'order_count' | 'unit_sold_count' | 'click_through_rate';
  sort_order?: 'ASC' | 'DESC';
  currency?: 'USD' | 'LOCAL';
  page_token?: string;
};

export type GetShopProductPerformanceListResponse = {
  products?: {
    id?: string;
    gmv?: {
      amount?: string;
      currency?: string;
    };
    orders?: number;
    units_sold?: number;
    click_through_rate?: string;
  }[];
  next_page_token?: string;
  total_count?: number;
  latest_available_date?: string;
};

export type GetShopSKUPerformanceParams = {
  sku_id: string;
  query: GetShopPerformanceQuery;
};

export type GetShopSKUPerformanceParamsResponse = {
  latest_available_date?: string;
  performance?: {
    product_id?: number;
    intervals?: {
      start_date?: string;
      end_date?: string;
      gmv?: {
        amount?: string;
        currency?: string;
      };
      gmv_breakdown?: {
        amount?: string;
        currency?: string;
        type?: string;
      }[];
      units_sold?: number;
      units_sold_breakdown?: {
        amount?: number;
        type?: string;
      }[];
      sku_orders?: number;
    }[];
    comparison_intervals?: {
      start_date?: string;
      end_date?: string;
      gmv?: {
        amount?: string;
        currency?: string;
      };
      gmv_breakdown?: {
        amount?: string;
        currency?: string;
        type?: string;
      }[];
      units_sold?: number;
      units_sold_breakdown?: {
        amount?: number;
        type?: string;
      }[];
      sku_orders?: number;
    }[];
  };
};

export type GetShopSKUPerformanceListQuery = {
  start_date_ge: string;
  end_date_lt: string;
  page_size?: number;
  sort_field?: 'gmv' | 'sku_orders' | 'units_sold';
  sort_order?: 'DESC' | 'ASC';
  page_token?: string;
  product_id?: string;
  currency?: 'USD' | 'LOCAL';
};

export type GetShopSKUPerformanceListResponse = {
  skus?: {
    id?: number;
    product_id?: number;
    gmv?: {
      amount?: string;
      currency?: string;
    };
    sku_orders?: number;
    units_sold?: number;
  }[];
  next_page_token?: string;
  total_count?: number;
  latest_available_date?: string;
};

export type GetShopVideoPerformanceListQuery = {
  start_date_ge: string;
  end_date_lt: string;
  page_size?: number;
  sort_field?:
    | 'gmv'
    | 'sku_orders'
    | 'units_sold'
    | 'views'
    | 'click_through_rate';
  sort_order?: 'ASC' | 'DESC';
  currency?: 'USD' | 'LOCAL';
  page_token?: string;
  account_type?: 'ALL' | 'LINKED_ACCOUNTS' | 'AFFILIATES';
};

export type GetShopVideoPerformanceListResponse = {
  videos?: {
    id?: string;
    title?: string;
    username?: string;
    gmv?: {
      amount?: string;
      currency?: string;
    };
    sku_orders?: number;
    units_sold?: number;
    views?: number;
    click_through_rate?: string;
    products?: {
      id?: string;
      name?: string;
    }[];
    video_post_time?: string;
  }[];
  latest_available_date?: string;
  next_page_token?: string;
  total_count?: number;
};

export type GetShopVideoPerformanceOverviewQuery = {
  start_date_ge: string;
  end_date_lt: string;
  with_comparison?: boolean;
  granularity?: 'ALL' | '1D';
  currency?: 'USD' | 'LOCAL';
  account_type?: 'ALL' | 'LINKED_ACCOUNTS' | 'AFFILIATES';
};

export type GetShopVideoPerformanceOverviewResponse = {
  performance?: {
    intervals?: {
      start_date?: string;
      end_date?: string;
      gmv?: {
        amount?: string;
        currency?: string;
      };
      click_through_rate?: string;
      sku_orders?: number;
      units_sold?: number;
    }[];
    comparison_intervals?: {
      start_date?: string;
      end_date?: string;
      gmv?: {
        amount?: string;
        currency?: string;
      };
      click_through_rate?: string;
      sku_orders?: number;
      units_sold?: number;
    }[];
  };
  latest_available_date?: string;
};

export type GetShopVideoPerformanceDetailsParams = {
  video_id: string;
  query: GetShopVideoPerformanceDetailsQuery;
};

type GetShopVideoPerformanceDetailsQuery = {
  start_date_ge: string;
  end_date_lt: string;
  with_comparison?: boolean;
  granularity?: 'ALL' | '1D';
  currency?: 'USD' | 'LOCAL';
};

export type GetShopVideoPerformanceDetailsResponse = {
  performance?: {
    intervals?: {
      start_date?: string;
      end_date?: string;
      gmv?: {
        amount?: string;
        currency?: string;
      };
      click_through_rate?: string;
      daily_avg_buyers?: string;
      views?: number;
    }[];
    comparison_intervals?: {
      start_date?: string;
      end_date?: string;
      gmv?: {
        amount?: string;
        currency?: string;
      };
      click_through_rate?: string;
      daily_avg_buyers?: string;
      views?: number;
    }[];
    video_post_time?: string;
  };
  engagement_data?: {
    total_likes?: number;
    total_shares?: number;
    total_comments?: number;
    total_views?: number;
  };
  latest_available_date?: string;
};

export type GetShopVideoProductPerformanceListParams = {
  video_id: string;
  query: GetShopVideoProductPerformanceListQuery;
};

export type GetShopVideoProductPerformanceListQuery = {
  start_date_ge: string;
  end_date_lt: string;
  page_size?: number;
  sort_field?: 'gmv' | 'units_sold' | 'daily_avg_buyers';
  sort_order?: 'ASC' | 'DESC';
  currency?: 'USD' | 'LOCAL';
  page_token?: string;
};

export type GetShopVideoProductPerformanceListResponse = {
  products?: {
    id?: string;
    name?: string;
    gmv?: {
      amount?: string;
      currency?: string;
    };
    units_sold?: number;
    daily_avg_buyers?: string;
  }[];
  latest_available_date?: string;
  next_page_token?: string;
  total_count?: number;
};
