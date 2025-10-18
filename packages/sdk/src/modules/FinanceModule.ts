import {
  GetPaymentsQuery,
  GetPaymentsResponse,
  GetStatementsQuery,
  GetStatementsResponse,
  GetTransactionsByOrderResponse,
  GetTransactionsByStatementsInput,
  GetWithdrawalsQuery,
  RequestFunction,
  TikTokAPIResponse,
} from '@types';

/**
 * FinanceModule provides access to TikTok Shop Partner Finance APIs.
 * Includes methods for fetching statements, payments, withdrawals, and transaction breakdowns.
 */
export class FinanceModule {
  /**
   * Creates an instance of FinanceModule with a pre-configured request handler.
   *
   * @param request - A function for making authenticated HTTP requests.
   */
  constructor(private request: RequestFunction) {}

  /**
   * Get settlement statements for the shop.
   *
   * TikTok API Reference: https://partner.tiktokshop.com/docv2/page/get-statements-202309
   *
   * @param params - Query parameters for filtering statements.
   * @returns A promise resolving to the list of financial statements.
   */
  getStatements(
    params: GetStatementsQuery,
  ): Promise<TikTokAPIResponse<GetStatementsResponse>> {
    return this.request({
      method: 'GET',
      path: `/finance/202309/statements`,
      query: params,
    });
  }

  /**
   * Get payment records made to the shop.
   *
   * TikTok API Reference: https://partner.tiktokshop.com/docv2/page/get-payments-202309
   *
   * @param params - Query parameters for filtering payments.
   * @returns A promise resolving to the list of payments.
   */
  getPayments(
    params: GetPaymentsQuery,
  ): Promise<TikTokAPIResponse<GetPaymentsResponse>> {
    return this.request({
      method: 'GET',
      path: `/finance/202309/payments`,
      query: params,
    });
  }

  /**
   * Get withdrawal records from the shop's balance.
   *
   * TikTok API Reference: https://partner.tiktokshop.com/docv2/page/get-withdrawals-202309
   *
   * @param params - Query parameters for filtering withdrawals.
   * @returns A promise resolving to the list of withdrawals.
   */
  getWithdrawals(
    params: GetWithdrawalsQuery,
  ): Promise<TikTokAPIResponse<GetPaymentsResponse>> {
    return this.request({
      method: 'GET',
      path: `/finance/202309/withdrawals`,
      query: params,
    });
  }

  /**
   * Get transaction breakdowns associated with a specific order ID.
   *
   * TikTok API Reference: https://partner.tiktokshop.com/docv2/page/get-transactions-by-order-202501
   *
   * @param order_id - The ID of the order.
   * @returns A promise resolving to the transaction breakdown details.
   */
  getTransactionsByOrder(
    order_id: string,
  ): Promise<TikTokAPIResponse<GetTransactionsByOrderResponse>> {
    return this.request({
      method: 'GET',
      path: `/finance/202501/orders/${order_id}/statement_transactions`,
    });
  }

  /**
   * Get transaction breakdowns associated with a specific settlement statement ID.
   *
   * TikTok API Reference: https://partner.tiktokshop.com/docv2/page/get-transactions-by-statement-202501
   *
   * @param params - Object containing `statement_id` and optional query parameters like page size or page token.
   * @returns A promise resolving to the list of transactions.
   */
  getTransactionsByStatement(
    params: GetTransactionsByStatementsInput,
  ): Promise<TikTokAPIResponse<GetTransactionsByOrderResponse>> {
    return this.request({
      method: 'GET',
      path: `/finance/202501/statements/${params.statement_id}/statement_transactions`,
      query: params.query,
    });
  }
}
