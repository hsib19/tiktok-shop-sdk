import { LogisticModule } from '../src/modules/LogisticModule';
import {
    GetGlobalSellerWarehousesResponse,
    GetWarehousesDeliveryOptionsResponse,
    GetWarehousesResponse,
    TikTokAPIResponse,
} from '../src/types';

const mockRequest = jest.fn();

const logistic = new LogisticModule(mockRequest);

describe('LogisticModule', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call getWarehouseList with correct path and method', async () => {
        const mockResponse: TikTokAPIResponse<GetWarehousesResponse> = {
            code: 0,
            message: 'Success',
            data: { 
               warehouses: []
             },
            request_id: "8750495049504545"
        };

        mockRequest.mockResolvedValueOnce(mockResponse);

        const result = await logistic.getWarehouseList();

        expect(mockRequest).toHaveBeenCalledWith({
            method: 'GET',
            path: '/logistics/202309/warehouses',
        });
        expect(result).toEqual(mockResponse);
    });

    it('should call getGlobalSellerWarehouse with correct path and method', async () => {
        const mockResponse: TikTokAPIResponse<GetGlobalSellerWarehousesResponse> = {
            code: 0,
            message: 'Success',
            data: { global_warehouses: [] },
            request_id: "9874398693534"
        };

        mockRequest.mockResolvedValueOnce(mockResponse);

        const result = await logistic.getGlobalSellerWarehouse();

        expect(mockRequest).toHaveBeenCalledWith({
            method: 'GET',
            path: '/logistics/202309/global_warehouses',
        });
        expect(result).toEqual(mockResponse);
    });

    it('should call getWarehouseDeliveryOptions with correct path and method', async () => {
        const warehouseId = '123';
        const mockResponse: TikTokAPIResponse<GetWarehousesDeliveryOptionsResponse> = {
            code: 0,
            message: 'Success',
            data: { delivery_options: [] },
            request_id: "0397593475394"
        };

        mockRequest.mockResolvedValueOnce(mockResponse);

        const result = await logistic.getWarehouseDeliveryOptions(warehouseId);

        expect(mockRequest).toHaveBeenCalledWith({
            method: 'GET',
            path: `/logistics/202309/warehouses/${warehouseId}/delivery_options`,
        });
        expect(result).toEqual(mockResponse);
    });

    it('should call getShippingProviders with correct path and method', async () => {
        const deliveryOptionId = '456';
        const mockResponse: TikTokAPIResponse<GetWarehousesDeliveryOptionsResponse> = {
            code: 0,
            message: 'Success',
            data: { delivery_options: [] },
            request_id: "0294792847923"
        };

        mockRequest.mockResolvedValueOnce(mockResponse);

        const result = await logistic.getShippingProviders(deliveryOptionId);

        expect(mockRequest).toHaveBeenCalledWith({
            method: 'GET',
            path: `/logistics/202309/delivery_options/${deliveryOptionId}/shipping_providers`,
        });
        expect(result).toEqual(mockResponse);
    });
});
