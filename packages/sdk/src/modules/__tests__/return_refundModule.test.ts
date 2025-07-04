import { ReturnRefundModule } from '../ReturnRefundModule';
import {
    ApproveReturnParams,
    CalculateCancellationParams,
    CancelOrderBody,
    CreateReturnParams,
    GetAftersaleEligibilityParams,
    GetRejectReasonQuery,
    GetReturnRecordParams,
    RejectCancellationParams,
    RejectReturnParams,
    SearchCancellationParams,
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

    it('should call cancelOrder', async () => {
        const body: CancelOrderBody = {
            order_id: "579489483240146725",
            order_line_item_ids: ["580196086825061157"],
            cancel_reason: "ecom_order_to_ship_canceled_reason_change_payment_method"
        };
        mockRequest.mockResolvedValue({ data: 'cancelled' });

        const res = await returnModule.cancelOrder(body);
        expect(mockRequest).toHaveBeenCalledWith({
            method: 'POST',
            path: `/return_refund/202309/cancellations`,
            body
        });
        expect(res).toEqual({ data: 'cancelled' });
    });

    it('should call approveCancellation', async () => {
        const params = {
            cancel_id: 'cancel123',
            query: {
                idempotency_key: 'idem-key-123'
            }
        };
        mockRequest.mockResolvedValue({ data: 'approved' });

        const res = await returnModule.approveCancellation(params);
        expect(mockRequest).toHaveBeenCalledWith({
            method: 'POST',
            path: `/return_refund/202309/cancellations/cancel123/approve`,
            query: params.query
        });
        expect(res).toEqual({ data: 'approved' });
    });

    it('should call rejectCancellation', async () => {
        const params: RejectCancellationParams = {
            cancel_id: "09830495345435",
            query: {
                idempotency_key: "03498530l94056"
            },
            body: {
                reject_reason: "seller_reject_apply_product_has_been_packed",
                comment: "I have packed the products before cancellation request",
                images: [
                    {
                        image_id: "tos-maliva-i-o3syd03w52-us/57a1c8908fe74572861ea5e50887d8d1",
                        mime_type: "image/png",
                        height: 200,
                        width: 200
                    }
                ]
            }
        };
        mockRequest.mockResolvedValue({ data: 'rejected' });

        const res = await returnModule.rejectCancellation(params);
        expect(mockRequest).toHaveBeenCalledWith({
            method: 'POST',
            path: `/return_refund/202309/cancellations/09830495345435/reject`,
            query: params.query,
            body: params.body
        });
        expect(res).toEqual({ data: 'rejected' });
    });

    it('should call searchCancellation', async () => {
        const params: SearchCancellationParams = {
            query: {
                page_size: "20",
            },
            cancel_id: "9083405345",
            body: {
                cancel_ids: [
                    "577087614418520388"
                ],
                order_ids: [
                    "577087614418520388"
                ],
                buyer_user_ids: [
                    "7494845267308415300"
                ],
                cancel_types: [
                    "CANCEL"
                ],
                cancel_status: [
                    "CANCELLATION_REQUEST_PENDING"
                ],
                create_time_ge: 1690340825,
                create_time_lt: 1690340825,
                update_time_ge: 1690340825,
                update_time_lt: 1690340825,
                locale: "en-US"
            }
        };
        mockRequest.mockResolvedValue({ data: 'search-results' });

        const res = await returnModule.searchCancellation(params);
        expect(mockRequest).toHaveBeenCalledWith({
            method: 'POST',
            path: `/return_refund/202309/cancellations/search`,
            query: params.query,
            body: params.body
        });
        expect(res).toEqual({ data: 'search-results' });
    });

    it('should call calculateCancellation', async () => {
        const body: CalculateCancellationParams = {
            "order_id": "576469648086175911",
            "request_type": "REFUND",
            "shipment_type": "PLATFORM",
            "handover_method": "DROP_OFF",
            "reason_name": "ecom_order_delivered_refund_reason_missing_product_seller",
            "order_line_item_ids": [
                "576469648086306986"
            ],
            "skus": [
                {
                    "sku_id": "1729386416015578024",
                    "quantity": 1
                }
            ]
        };
        mockRequest.mockResolvedValue({ data: 'calculated' });

        const res = await returnModule.calculateCancellation(body);
        expect(mockRequest).toHaveBeenCalledWith({
            method: 'POST',
            path: `/return_refund/202309/refunds/calculate`,
            body
        });
        expect(res).toEqual({ data: 'calculated' });
    });

});
