export type GetStatementsQuery = {
  statement_time_ge?: number;
  statement_time_lt?: number;
  payment_status?: string;
  page_size?: number;
  timestamp?: number;
  page_token?: string;
  sort_field: string;
  sort_order?: "ASC" | "DESC";
};

export type GetStatementsResponse = {
  next_page_token?: string;
  statements?: {
    id?: string;
    statement_time?: number;
    settlement_amount?: string;
    currency?: string;
    revenue_amount?: string;
    fee_amount?: string;
    adjustment_amount?: string;
    payment_status?: string;
    payment_id?: string;
    net_sales_amount?: string;
    shipping_cost_amount?: string;
  }[];
};

export type GetPaymentsQuery = {
  create_time_lt?: number;
  create_time_ge?: number;
  page_size?: number;
  timestamp?: number;
  page_token?: string;
  sort_field: string;
  sort_order?: "ASC" | "DESC";
};

export type GetPaymentsResponse = {
  next_page_token?: string;
  payments?: {
    create_time?: number;
    id?: string;
    status?: string;
    amount?: {
      value?: string;
      currency?: string;
    };
    settlement_amount?: {
      value?: string;
      currency?: string;
    };
    reserve_amount?: {
      value?: string;
      currency?: string;
    };
    payment_amount_before_exchange?: {
      value?: string;
      currency?: string;
    };
    exchange_rate?: string;
    paid_time?: number;
    bank_account?: string;
  }[];
};

export type WithdrawalType = "WITHDRAW" | "SETTLE" | "TRANSFER" | "REVERSE";

export type WithdrawalStatus = "PROCESSING" | "SUCCESS" | "FAILED";

export type GetWithdrawalsQuery = {
  create_time_lt?: number;
  create_time_ge?: number;
  page_size?: number;
  timestamp?: number;
  page_token?: string;
  types: WithdrawalType[];
};

export type GetWithdrawalsResponse = {
  next_page_token?: string;
  total_count?: number;
  withdrawals?: {
    id?: string;
    type?: WithdrawalType;
    amount?: string;
    currency?: string;
    status?: WithdrawalStatus;
    create_time?: number;
  }[];
};

export type GetTransactionsByOrderResponse = {
  order_id?: string;
  order_create_time?: number;
  currency?: string;
  revenue_amount?: string;
  fee_and_tax_amount?: string;
  shipping_cost_amount?: string;
  settlement_amount?: string;
  total_count?: number;
  sku_transactions?:
    | {
        sku_id?: string;
        sku_name?: string;
        statement_id?: string;
        product_name?: string;
        quantity?: string;
        settlement_amount?: string;
        revenue_amount?: string;
        revenue_breakdown?: {
          subtotal_before_discount_amount?: string;
          seller_discount_amount?: string;
          refund_subtotal_before_discount_amount?: string;
          seller_discount_refund_amount?: string;
          cod_service_fee_amount?: string;
          refund_cod_service_fee_amount?: string;
        };
        shipping_cost_amount?: string;
        shipping_cost_breakdown?: {
          actual_shipping_fee_amount?: string;
          shipping_fee_discount_amount?: string;
          customer_paid_shipping_fee_amount?: string;
          return_shipping_fee_amount?: string;
          replacement_shipping_fee_amount?: string;
          exchange_shipping_fee_amount?: string;
          signature_confirmation_fee_amount?: string;
          shipping_insurance_fee_amount?: string;
          fbt_fulfillment_fee_reimbursement_amount?: string;
          return_shipping_label_fee_amount?: string;
          supplementary_component?: {
            fbt_fulfillment_fee_reimbursement_amount?: string;
            platform_shipping_fee_discount_amount?: string;
            promo_shipping_incentive_amount?: string;
            shipping_fee_subsidy_amount?: string;
            seller_shipping_fee_discount_amount?: string;
            fbt_shipping_cost_amount?: string;
            customer_shipping_fee_offset_amount?: string;
            fbm_shipping_cost_amount?: string;
            fbt_fulfillment_fee_amount?: string;
          };
        };
        fee_tax_amount?: string;
        fee_tax_breakdown?: {
          fee?: {
            platform_commission_amount?: string;
            referral_fee_amount?: string;
            refund_administration_fee_amount?: string;
            transaction_fee_amount?: string;
            credit_card_handling_fee_amount?: string;
            affiliate_commission_amount?: string;
            affiliate_commission_amount_before_pit?: string;
            affiliate_partner_commission_amount?: string;
            affiliate_ads_commission_amount?: string;
            sfp_service_fee_amount?: string;
            live_specials_fee_amount?: string;
            bonus_cashback_service_fee_amount?: string;
            mall_service_fee_amount?: string;
            voucher_xtra_service_fee_amount?: string;
            flash_sales_service_fee_amount?: string;
            cofunded_promotion_service_fee_amount?: string;
            pre_order_service_fee_amount?: string;
            tsp_commission_amount?: string;
            dt_handling_fee_amount?: string;
            epr_pob_service_fee_amount?: string;
            fee_per_item_sold_amount?: string;
            seller_paylater_handling_fee_amount?: string;
            cofunded_creator_bonus_amount?: string;
            dynamic_commission_amount?: string;
            external_affiliate_marketing_fee_amount?: string;
          };
          tax?: {
            vat_amount?: string;
            import_vat_amount?: string;
            customs_duty_amount?: string;
            customs_clearance_amount?: string;
            sst_amount?: string;
            gst_amount?: string;
            iva_amount?: string;
            isr_amount?: string;
            anti_dumping_duty_amount?: string;
            local_vat_amount?: string;
            pit_amount?: string;
          };
        };
      }[]
    | [];
};

export type GetTransactionsByStatementsInput = {
  statement_id: string;
  query: GetTransactionsByStatementsQuery;
};

type GetTransactionsByStatementsQuery = {
  page_size?: number;
  timestamp?: number;
  page_token?: string;
  sort_field: string;
  sort_order?: "ASC" | "DESC";
};

export type GetTransactionsByStatementResponse = {
  next_page_token?: string;
  id?: string;
  create_time?: number;
  status?: string;
  currency?: string;
  payable_amount?: string;
  total_reserve_amount?: string;
  total_settlement_amount?: string;
  total_settlement_breakdown?: {
    total_revenue_amount?: string;
    total_shipping_cost_amount?: string;
    total_fee_tax_amount?: string;
    total_adjustment_amount?: string;
  };
  total_count?: number;
  transactions?: {
    id?: string;
    type?: string;
    order_id?: string;
    order_create_time?: number;
    adjustment_id?: string;
    adjustment_order_id?: string;
    adjustment_amount?: string;
    settlement_amount?: string;
    revenue_amount?: string;
    revenue_breakdown?: {
      subtotal_before_discount_amount?: string;
      refund_subtotal_before_discount_amount?: string;
      seller_discount_amount?: string;
      seller_discount_refund_amount?: string;
      cod_service_fee_amount?: string;
      refund_cod_service_fee_amount?: string;
    };
    shipping_cost_amount?: string;
    shipping_cost_breakdown?: {
      actual_shipping_fee_amount?: string;
      shipping_fee_discount_amount?: string;
      customer_paid_shipping_fee_amount?: string;
      return_shipping_fee_amount?: string;
      replacement_shipping_fee_amount?: string;
      exchange_shipping_fee_amount?: string;
      signature_confirmation_fee_amount?: string;
      shipping_insurance_fee_amount?: string;
      fbt_fulfillment_fee_reimbursement_amount?: string;
      return_shipping_label_fee_amount?: string;
      supplementary_component?: {
        platform_shipping_fee_discount_amount?: string;
        promo_shipping_incentive_amount?: string;
        shipping_fee_subsidy_amount?: string;
        seller_shipping_fee_discount_amount?: string;
        customer_shipping_fee_offset_amount?: string;
        fbm_shipping_cost_amount?: string;
        fbt_shipping_cost_amount?: string;
        fbt_fulfillment_fee_amount?: string;
        fbt_fulfillment_fee_reimbursement_amount?: string;
      };
    };
    fee_tax_amount?: string;
    fee_tax_breakdown?: {
      fee?: {
        platform_commission_amount?: string;
        referral_fee_amount?: string;
        refund_administration_fee_amount?: string;
        transaction_fee_amount?: string;
        credit_card_handling_fee_amount?: string;
        affiliate_commission_amount?: string;
        affiliate_commission_amount_before_pit?: string;
        affiliate_partner_commission_amount?: string;
        affiliate_ads_commission_amount?: string;
        sfp_service_fee_amount?: string;
        live_specials_fee_amount?: string;
        bonus_cashback_service_fee_amount?: string;
        mall_service_fee_amount?: string;
        voucher_xtra_service_fee_amount?: string;
        flash_sales_service_fee_amount?: string;
        cofunded_promotion_service_fee_amount?: string;
        pre_order_service_fee_amount?: string;
        tsp_commission_amount?: string;
        dt_handling_fee_amount?: string;
        epr_pob_service_fee_amount?: string;
        seller_paylater_handling_fee_amount?: string;
        fee_per_item_sold_amount?: string;
        cofunded_creator_bonus_amount?: string;
        dynamic_commission_amount?: string;
        external_affiliate_marketing_fee_amount?: string;
      };
      tax?: {
        vat_amount?: string;
        import_vat_amount?: string;
        customs_duty_amount?: string;
        customs_clearance_amount?: string;
        sst_amount?: string;
        gst_amount?: string;
        iva_amount?: string;
        isr_amount?: string;
        anti_dumping_duty_amount?: string;
        local_vat_amount?: string;
        pit_amount?: string;
      };
    };
    supplementary_component?: {
      customer_payment_amount?: string;
      customer_refund_amount?: string;
      platform_discount_amount?: string;
      platform_discount_refund_amount?: string;
      seller_cofunded_discount_amount?: string;
      seller_cofunded_discount_refund_amount?: string;
      platform_cofunded_discount_amount?: string;
      platform_cofunded_discount_refund_amount?: string;
      retail_delivery_fee_amount?: string;
      retail_delivery_fee_payment_amount?: string;
      retail_delivery_fee_refund_amount?: string;
      sales_tax_amount?: string;
      sales_tax_payment_amount?: string;
      sales_tax_refund_amount?: string;
    };
    reserve_id?: string;
    reserve_amount?: string;
    associated_order_id?: string;
    reserve_status?: string;
    estimated_release_time?: string;
  }[];
};
