import {
  ApproveCancellationParams,
  ApproveReturnParams,
  CalculateCancellationParams,
  CalculateCancellationResponse,
  CancelOrderBody,
  CancelOrderResponse,
  CreateReturnParams,
  CreateReturnResponse,
  GetAftersaleEligibilityParams,
  GetAftersaleEligibilityResponse,
  GetRejectReasonQuery,
  GetRejectReasonResponse,
  GetReturnRecordParams,
  GetReturnRecordResponse,
  RejectCancellationParams,
  RejectReturnParams,
  RequestFunction,
  SearchCancellationParams,
  SearchCancellationResponse,
  SearchReturnParams,
  SearchReturnResponse,
  TikTokAPIResponse,
} from '@types';

/**
 * ReturnRefundModule provides methods to interact with TikTok Shop Return & Refund API endpoints.
 *
 * These methods allow you to:
 * - Check aftersale eligibility for an order
 * - Get reject reasons for return requests
 * - Create a return request
 * - Search return/refund records
 * - Get return record details
 * - Reject a return request
 * - Approve a return or refund request
 *
 * Reference: https://partner.tiktokshop.com/docv2/page/650b2001bace3e02b76db38a
 */
export class ReturnRefundModule {
  // The request function is injected from the SDK and pre-configured with authentication and app credentials
  constructor(private request: RequestFunction) {}

  /**
   * Get aftersale eligibility information for a given order.
   *
   * GET /return_refund/202309/orders/{order_id}/aftersale_eligibility
   */
  getAftersaleEligibility(
    params: GetAftersaleEligibilityParams,
  ): Promise<TikTokAPIResponse<GetAftersaleEligibilityResponse>> {
    return this.request({
      method: 'GET',
      path: `/return_refund/202309/orders/${params.order_id}/aftersale_eligibility`,
      query: params.query,
    });
  }

  /**
   * Get reasons for rejecting a return request.
   *
   * GET /return_refund/202309/reject_reasons
   */
  getRejectReasons(
    query: GetRejectReasonQuery,
  ): Promise<TikTokAPIResponse<GetRejectReasonResponse>> {
    return this.request({
      method: 'GET',
      path: `/return_refund/202309/reject_reasons`,
      query: query,
    });
  }

  /**
   * Create a new return request.
   *
   * POST /return_refund/202309/returns
   */
  createReturn(
    params: CreateReturnParams,
  ): Promise<TikTokAPIResponse<CreateReturnResponse>> {
    return this.request({
      method: 'POST',
      path: `/return_refund/202309/returns`,
      query: params.query,
      body: params.body,
    });
  }

  /**
   * Search for return/refund requests.
   *
   * POST /return_refund/202309/returns/search
   */
  searchReturn(
    params: SearchReturnParams,
  ): Promise<TikTokAPIResponse<SearchReturnResponse>> {
    return this.request({
      method: 'POST',
      path: `/return_refund/202309/returns/search`,
      query: params.query,
      body: params.body,
    });
  }

  /**
   * Get the operation record history of a return/refund request.
   *
   * GET /return_refund/202309/returns/{return_id}/records
   */
  getReturnRecord(
    params: GetReturnRecordParams,
  ): Promise<TikTokAPIResponse<GetReturnRecordResponse>> {
    return this.request({
      method: 'GET',
      path: `/return_refund/202309/returns/${params.return_id}/records`,
      query: params.query,
    });
  }

  /**
   * Reject a return/refund request submitted by the buyer.
   *
   * POST /return_refund/202309/returns/{return_id}/reject
   */
  rejectReturn(params: RejectReturnParams): Promise<TikTokAPIResponse<object>> {
    return this.request({
      method: 'POST',
      path: `/return_refund/202309/returns/${params.return_id}/reject`,
      query: params.query,
      body: params.body,
    });
  }

  /**
   * Approve a return/refund request submitted by the buyer.
   *
   * POST /return_refund/202309/returns/{return_id}/approve
   *
   * Seller can choose to:
   * - Approve full return (`APPROVE_RETURN`)
   * - Approve refund without return (`APPROVE_REFUND`)
   * - Offer partial refund (`OFFER_PARTIAL_REFUND`)
   * - Approve replacement or received package, etc.
   *
   * Refer to the `decision` field for available options:
   * - APPROVE_REFUND
   * - APPROVE_RETURN
   * - APPROVE_RECEIVED_PACKAGE
   * - APPROVE_REPLACEMENT
   * - ISSUE_REPLACEMENT_REFUND
   * - OFFER_PARTIAL_REFUND
   *
   * Note:
   * - For return-and-refund requests (`return_type = RETURN_AND_REFUND`), use `APPROVE_RETURN`.
   * - For refund-only requests, use `APPROVE_REFUND`.
   * - For partial refund, provide `partial_refund.amount` and `currency`, and set `decision = OFFER_PARTIAL_REFUND`.
   * - Use `buyer_keep_item = true` if you wish to refund without requiring the buyer to return the item.
   *
   * Reference: https://partner.tiktokshop.com/docv2/page/650b2001bace3e02b76db38a
   */
  approveReturn(
    params: ApproveReturnParams,
  ): Promise<TikTokAPIResponse<object>> {
    return this.request({
      method: 'POST',
      path: `/return_refund/202309/returns/${params.return_id}/approve`,
      query: params.query,
      body: params.body,
    });
  }

  /**
   * Cancel an order by providing a cancellation reason and order_id.
   *
   * POST /return_refund/202309/cancellations
   *
   * This API is used by sellers to request cancellation before the order is shipped.
   * Cancellation may be rejected by the buyer depending on the status and reason.
   */
  cancelOrder(
    body: CancelOrderBody,
  ): Promise<TikTokAPIResponse<CancelOrderResponse>> {
    return this.request({
      method: 'POST',
      path: `/return_refund/202309/cancellations`,
      body: body,
    });
  }

  /**
   * Approve a buyer's cancellation request.
   *
   * POST /return_refund/202309/cancellations/{cancel_id}/approve
   *
   * This method is used by sellers to accept the buyer's request to cancel the order.
   */
  approveCancellation(
    params: ApproveCancellationParams,
  ): Promise<TikTokAPIResponse<object>> {
    return this.request({
      method: 'POST',
      path: `/return_refund/202309/cancellations/${params.cancel_id}/approve`,
      query: params.query,
    });
  }

  /**
   * Reject a buyer's cancellation request.
   *
   * POST /return_refund/202309/cancellations/{cancel_id}/reject
   *
   * Sellers can reject the cancellation request with a specific reason.
   */
  rejectCancellation(
    params: RejectCancellationParams,
  ): Promise<TikTokAPIResponse<object>> {
    return this.request({
      method: 'POST',
      path: `/return_refund/202309/cancellations/${params.cancel_id}/reject`,
      query: params.query,
      body: params.body,
    });
  }

  /**
   * Search cancellation requests made by buyers.
   *
   * POST /return_refund/202309/cancellations/search
   *
   * This method retrieves a list of cancellations based on filter criteria like time range, order ID, and status.
   */
  searchCancellation(
    params: SearchCancellationParams,
  ): Promise<TikTokAPIResponse<SearchCancellationResponse>> {
    return this.request({
      method: 'POST',
      path: `/return_refund/202309/cancellations/search`,
      query: params.query,
      body: params.body,
    });
  }

  /**
   * Calculate the refund amount for an order cancellation before submitting the request.
   *
   * POST /return_refund/202309/refunds/calculate
   *
   * Useful to preview how much will be refunded if the order is canceled.
   */
  calculateCancellation(
    body: CalculateCancellationParams,
  ): Promise<TikTokAPIResponse<CalculateCancellationResponse>> {
    return this.request({
      method: 'POST',
      path: `/return_refund/202309/refunds/calculate`,
      body: body,
    });
  }
}
