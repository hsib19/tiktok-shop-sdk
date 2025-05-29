import { SellerModule } from '../src/modules/SellerModule';

describe('SellerModule', () => {
    let mockRequest: jest.Mock;
    let sellerModule: SellerModule;

    beforeEach(() => {
        mockRequest = jest.fn();
        sellerModule = new SellerModule(mockRequest);
    });

    describe('getActiveShops', () => {
        it('should call request with correct params and return response', async () => {
            const mockResponse = { code: 0, data: { shops: [{ id: 'shop1', name: 'Shop One' }] }, message: 'success' };
            mockRequest.mockResolvedValue(mockResponse);

            const result = await sellerModule.getActiveShops();

            expect(mockRequest).toHaveBeenCalledWith({
                method: 'GET',
                path: '/seller/202309/shops',
            });
            expect(result).toBe(mockResponse);
        });
    });

    describe('getSellerPermissions', () => {
        it('should call request with correct params and return response', async () => {
            const mockResponse = { code: 0, data: { permissions: ['perm1', 'perm2'] }, message: 'success' };
            mockRequest.mockResolvedValue(mockResponse);

            const result = await sellerModule.getSellerPermissions();

            expect(mockRequest).toHaveBeenCalledWith({
                method: 'GET',
                path: '/seller/202309/permissions',
            });
            expect(result).toBe(mockResponse);
        });
    });
});
