import { ReturnRefundModule } from '../ReturnRefundModule';
import {
    ApproveReturnParams,
    CreateReturnParams,
    GetAftersaleEligibilityParams,
    GetRejectReasonQuery,
    GetReturnRecordParams,
    RejectReturnParams,
    SearchReturnParams
} from '@types'; 

const mockRequest = jest.fn();

const returnModule = new ReturnRefundModule(mockRequest);

describe('ReturnRefundModule', () => {
    beforeEach(() => {
        mockRequest.mockReset();
    });

    it('should call getAftersaleEligibility with correct params', async () => {
        const params: GetAftersaleEligibilityParams = {
            order_id: '1234567890',
            query: { 
                initiate_aftersale_user: "BUYER"
             }
        };
        mockRequest.mockResolvedValue({ data: 'ok' });

        const res = await returnModule.getAftersaleEligibility(params);
        expect(mockRequest).toHaveBeenCalledWith({
            method: 'GET',
            path: `/return_refund/202309/orders/1234567890/aftersale_eligibility`,
            query: { initiate_aftersale_user: 'BUYER' }
        });
        expect(res).toEqual({ data: 'ok' });
    });

    it('should call getRejectReasons with correct query', async () => {
        const query: GetRejectReasonQuery = { 
            return_or_cancel_id: '2342423423434',
            locale: 'en-US'
        };
        mockRequest.mockResolvedValue({ data: 'reasons' });

        const res = await returnModule.getRejectReasons(query);
        expect(mockRequest).toHaveBeenCalledWith({
            method: 'GET',
            path: `/return_refund/202309/reject_reasons`,
            query
        });
        expect(res).toEqual({ data: 'reasons' });
    });

    it('should call createReturn', async () => {
        const params: CreateReturnParams = {
            query: { 
                idempotency_key: "8357345-34759345345"
             },
            body: {
                order_id: '242423424262323',
                return_reason: "DAMAGED",
                return_type: 'REFUND'
            }
        };
        mockRequest.mockResolvedValue({ data: 'created' });

        const res = await returnModule.createReturn(params);
        expect(mockRequest).toHaveBeenCalledWith({
            method: 'POST',
            path: `/return_refund/202309/returns`,
            query: params.query,
            body: params.body
        });
        expect(res).toEqual({ data: 'created' });
    });

    it('should call searchReturn', async () => {
        const params: SearchReturnParams = {
            query: { 
                page_size: 10,
                sort_order: 'DESC',
                sort_field: 'create_time',
                page_token: '30495803495345'
             },
            body: { 
                return_ids: ['9580359345345345']
             }
        };
        mockRequest.mockResolvedValue({ data: 'results' });

        const res = await returnModule.searchReturn(params);
        expect(mockRequest).toHaveBeenCalledWith({
            method: 'POST',
            path: `/return_refund/202309/returns/search`,
            query: params.query,
            body: params.body
        });
        expect(res).toEqual({ data: 'results' });
    });

    it('should call getReturnRecord', async () => {
        const params: GetReturnRecordParams = {
            return_id: 'return123',
            query: { 
                locale: 'en-Us'
             }
        };
        mockRequest.mockResolvedValue({ data: 'record' });

        const res = await returnModule.getReturnRecord(params);
        expect(mockRequest).toHaveBeenCalledWith({
            method: 'GET',
            path: `/return_refund/202309/returns/return123/records`,
            query: params.query
        });
        expect(res).toEqual({ data: 'record' });
    });

    it('should call rejectReturn', async () => {
        const params: RejectReturnParams = {
            return_id: 'ret123',
            query: { 
                idempotency_key: "394850345-3498593454"
             },
            body: { 
                decision: 'REJECT_REFUND',
                reject_reason: 'Damaged'
            }
        };
        mockRequest.mockResolvedValue({ data: 'rejected' });

        const res = await returnModule.rejectReturn(params);
        expect(mockRequest).toHaveBeenCalledWith({
            method: 'POST',
            path: `/return_refund/202309/returns/ret123/reject`,
            query: params.query,
            body: params.body
        });
        expect(res).toEqual({ data: 'rejected' });
    });

    it('should call approveReturn', async () => {
        const params: ApproveReturnParams = {
            return_id: 'ret123',
            query: { 
                idempotency_key: "098450345-4353945345"
             },
            body: { decision: 'APPROVE_RETURN' }
        };
        mockRequest.mockResolvedValue({ data: 'approved' });

        const res = await returnModule.approveReturn(params);
        expect(mockRequest).toHaveBeenCalledWith({
            method: 'POST',
            path: `/return_refund/202309/returns/ret123/approve`,
            query: params.query,
            body: params.body
        });
        expect(res).toEqual({ data: 'approved' });
    });
});
