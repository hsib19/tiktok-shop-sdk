import { FinanceModule } from '../FinanceModule';
import {
  GetStatementsQuery,
  GetPaymentsQuery,
  GetWithdrawalsQuery,
  GetTransactionsByStatementsInput,
} from '@types';

const mockRequest = jest.fn();

const financeModule = new FinanceModule(mockRequest);

describe('FinanceModule', () => {
  beforeEach(() => {
    mockRequest.mockReset();
  });

  it('should call getStatements with correct query', async () => {
    const params: GetStatementsQuery = {
      page_size: 20,
      sort_field: 'statement_time',
    };
    mockRequest.mockResolvedValue({ data: 'statements' });

    const res = await financeModule.getStatements(params);
    expect(mockRequest).toHaveBeenCalledWith({
      method: 'GET',
      path: `/finance/202309/statements`,
      query: params,
    });
    expect(res).toEqual({ data: 'statements' });
  });

  it('should call getPayments with correct query', async () => {
    const params: GetPaymentsQuery = {
      page_size: 10,
      sort_field: 'create_time',
    };
    mockRequest.mockResolvedValue({ data: 'payments' });

    const res = await financeModule.getPayments(params);
    expect(mockRequest).toHaveBeenCalledWith({
      method: 'GET',
      path: `/finance/202309/payments`,
      query: params,
    });
    expect(res).toEqual({ data: 'payments' });
  });

  it('should call getWithdrawals with correct query', async () => {
    const params: GetWithdrawalsQuery = {
      page_size: 5,
      types: ['SETTLE'],
    };
    mockRequest.mockResolvedValue({ data: 'withdrawals' });

    const res = await financeModule.getWithdrawals(params);
    expect(mockRequest).toHaveBeenCalledWith({
      method: 'GET',
      path: `/finance/202309/withdrawals`,
      query: params,
    });
    expect(res).toEqual({ data: 'withdrawals' });
  });

  it('should call getTransactionsByOrder with order_id', async () => {
    const order_id = 'order123';
    mockRequest.mockResolvedValue({ data: 'order_transactions' });

    const res = await financeModule.getTransactionsByOrder(order_id);
    expect(mockRequest).toHaveBeenCalledWith({
      method: 'GET',
      path: `/finance/202501/orders/${order_id}/statement_transactions`,
    });
    expect(res).toEqual({ data: 'order_transactions' });
  });

  it('should call getTransactionsByStatement with correct params', async () => {
    const params: GetTransactionsByStatementsInput = {
      statement_id: 'stmt001',
      query: {
        page_size: 25,
        sort_field: 'order_create_time',
      },
    };
    mockRequest.mockResolvedValue({ data: 'statement_transactions' });

    const res = await financeModule.getTransactionsByStatement(params);
    expect(mockRequest).toHaveBeenCalledWith({
      method: 'GET',
      path: `/finance/202501/statements/${params.statement_id}/statement_transactions`,
      query: params.query,
    });
    expect(res).toEqual({ data: 'statement_transactions' });
  });
});
