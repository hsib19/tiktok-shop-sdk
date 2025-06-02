import { locale } from "./ProductTypes";

export interface LineItemEligibility {
    request_type: 'REFUND' | 'RETURN' | string;
    order_line_items_ids: string[];
    eligible: boolean;
    ineligible_code?: number;
    ineligible_reason?: string;
}

export interface SKUEligibility {
    sku_id: string;
    line_item_eligibility: LineItemEligibility[];
}

export interface GetAftersaleEligibilityResponse {
    sku_eligibility: SKUEligibility[];
}

export type GetAftersaleEligibilityParams = {
    order_id:  string;
    query?: {
        initiate_aftersale_user: "SELLER" | "BUYER";
    }
}

export type GetRejectReasonQuery = {
    locale?: locale;
    return_or_cancel_id: string;
}

export type GetRejectReasonResponse = {
    reasons: {
        name?: string;
        text?: string
    }[];
}

interface Sku {
    sku_id: string;
    quantity: number;
}

export type ReturnRequestQuery = {
    idempotency_key?: string;
}

export type ReturnRequestInput = {
    order_id: string;
    skus?: Sku[];
    order_line_item_ids?: string[];
    return_reason: string;
    return_type: 'REFUND' | 'RETURN_AND_REFUND';
    refund_total?: string;
    currency?: string;
    shipment_type?: 'PLATFORM' | 'BUYER_ARRANGE';
    handover_method?: 'DROP_OFF' | 'PICKUP';
}

export type CreateReturnParams = {
    query: ReturnRequestQuery;
    body: ReturnRequestInput;
}

interface Sku {
    sku_id: string;
    quantity: number;
}

export interface CreateReturnResponse {
    order_id: string;
    skus: Sku[];
    order_line_item_ids: string[];
    return_reason: string;
    return_type: "REFUND" | "RETURN_AND_REFUND";
    refund_total: string;
    currency: string;
    shipment_type: "PLATFORM" | "BUYER_ARRANGE"; 
    handover_method: "DROP_OFF" | "PICKUP"; 
}

type ReturnStatus =
    | "RETURN_OR_REFUND_REQUEST_PENDING"
    | "RETURN_OR_REFUND_REQUEST_REJECT"
    | "AWAITING_BUYER_SHIP"
    | "BUYER_SHIPPED_ITEM"
    | "REJECT_RECEIVE_PACKAGE"
    | "RETURN_OR_REFUND_REQUEST_SUCCESS"
    | "RETURN_OR_REFUND_REQUEST_CANCEL"
    | "RETURN_OR_REFUND_REQUEST_COMPLETE"
    | "AWAITING_BUYER_RESPONSE";

type SellerProposedReturnType = 'PARTIAL_REFUND';

type ArbitrationStatus =
    | "IN_PROGRESS"
    | "SUPPORT_BUYER"
    | "SUPPORT_SELLER"
    | "CLOSED";

export type SearchReturnParams = {
    query: {
        sort_field?: 'create_time' | 'update_time';
        sort_order?: 'ASC' | 'DESC';
        page_size?: number;
        page_token?: string;
    },
    body: {
        return_ids?: string[];
        order_ids?: string[];
        buyer_user_ids?: string[];
        return_types?: ('REFUND' | 'RETURN_AND_REFUND' | 'REPLACEMENT')[];
        return_status?: ReturnStatus[];
        seller_proposed_return_type?: SellerProposedReturnType[];
        create_time_ge?: number;
        update_time_lt?: number;
        arbitration_status?: ArbitrationStatus[];
        update_time_ge?: number;
        locale?: locale;
        create_time_lt?: number;
    }
}

export interface SearchReturnResponse {
    return_orders?: ReturnOrder[];
    total_count?: number;
    next_page_token?: string;
}

export interface ReturnOrder {
    order_id?: string;
    return_id?: string;
    return_type?: string;
    return_status?: string;
    arbitration_status?: string;
    role?: string;
    return_reason?: string;
    return_reason_text?: string;
    shipment_type?: string;
    handover_method?: string;
    return_tracking_number?: string;
    return_provider_name?: string;
    return_provider_id?: string;
    pre_return_id?: string;
    next_return_id?: string;
    can_buyer_keep_item?: boolean;
    update_time?: number;
    seller_next_action_response?: SellerNextAction[];
    create_time?: number;
    return_line_items?: ReturnLineItem[];
    discount_amount?: DiscountAmount[];
    shipping_fee_amount?: ShippingFeeAmount[];
    refund_amount?: RefundAmount;
    return_shipping_document_type?: string;
    return_method?: string;
    is_combined_return?: string;
    combined_return_id?: string;
    seller_proposed_return_type?: string;
    partial_refund?: PartialRefund;
    buyer_rejected_partial_refund?: boolean;
    return_warehouse_address?: {
        full_address?: string;
    };
}

export interface SellerNextAction {
    action?: string;
    deadline?: number;
}

export interface ReturnLineItem {
    return_line_item_id?: string;
    order_line_item_id?: string;
    sku_id?: string;
    sku_name?: string;
    product_name?: string;
    seller_sku?: string;
    product_image?: {
        url?: string;
        width?: number;
        height?: number;
    };
    refund_amount?: RefundAmount;
}

export interface RefundAmount {
    currency?: string;
    refund_total?: string;
    refund_subtotal?: string;
    refund_shipping_fee?: string;
    refund_tax?: string;
    retail_delivery_fee?: string;
    buyer_service_fee?: string;
}

export interface DiscountAmount {
    currency?: string;
    product_seller_discount?: string;
    shipping_fee_platform_discount?: string;
    shipping_fee_seller_discount?: string;
    product_platform_discount?: string;
}

export interface ShippingFeeAmount {
    currency?: string;
    seller_paid_return_shipping_fee?: string;
    platform_paid_return_shipping_fee?: string;
    buyer_paid_return_shipping_fee?: string;
}

export interface PartialRefund {
    currency?: string;
    amount?: string;
}

export type GetReturnRecordParams = {
    return_id: string;
    query?:{
        locale: locale;
    }
}

export interface GetReturnRecordResponse {
    records?: ReturnRecord[];
}

export interface ReturnRecord {
    event?: string;
    role?: string;
    description?: string;
    reason_text?: string;
    note?: string;
    images?: ReturnImage[];
    videos?: ReturnVideo[];
    create_time?: number;
}

export interface ReturnImage {
    url?: string;
    width?: number;
    height?: number;
}

export interface ReturnVideo {
    url?: string;
    cover?: string;
    width?: number;
    height?: number;
    duration_millis?: number;
}

interface RejectImage {
    image_id: string;
    mime_type?: string;
    height?: number;
    width?: number;
}

export interface RejectReturnBody extends Record<string, unknown> {
    decision: "REJECT_REFUND" | "REJECT_RETURN" | "REJECT_RECEIVED_PACKAGE" | "REJECT_REPLACEMENT";
    reject_reason: string;
    comment?: string;
    images?: RejectImage[];
}

export type RejectReturnParams = {
    return_id: string;
    query: {
        idempotency_key: string;
    },
    body: RejectReturnBody
}

export type ApproveReturnParams = {
    return_id: string;
    query: {
        idempotency_key: string;
    },
    body: ApproveReturnBody
}

type ApproveReturnBody = {
    decision:
    | "APPROVE_REFUND"
    | "APPROVE_RETURN"
    | "APPROVE_RECEIVED_PACKAGE"
    | "APPROVE_REPLACEMENT"
    | "ISSUE_REPLACEMENT_REFUND"
    | "OFFER_PARTIAL_REFUND";
    buyer_keep_item?: boolean;
    partial_refund?: PartialRefund;
}
