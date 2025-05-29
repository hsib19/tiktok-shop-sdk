import { ProductModule } from '../src/modules/ProductModule';
import { GetCategoriesQuery } from '../src/types/ProductTypes'

describe('ProductModule', () => {
    let mockRequest: jest.Mock;
    let productModule: ProductModule;

    beforeEach(() => {
        mockRequest = jest.fn();
        productModule = new ProductModule(mockRequest);
    });

    describe('getProductPrerequisites', () => {
        it('should call request with correct GET path and return response', async () => {
            const mockResponse = { code: 0, data: { needsReturnWarehouse: true, needsBrandApproval: false }, message: 'success' };
            mockRequest.mockResolvedValue(mockResponse);

            const result = await productModule.getProductPrerequisites();

            expect(mockRequest).toHaveBeenCalledWith({
                method: 'GET',
                path: '/product/202309/prerequisites',
            });
            expect(result).toBe(mockResponse);
        });
    });

    describe('getCategories', () => {
        it('should call request with correct GET path and query params, then return response', async () => {
            const query: GetCategoriesQuery = {
                locale: 'id-ID',
                keyword: 'Kaos',
                category_version: 'v1',
                listing_platform: 'TIKTOK_SHOP'
            };
            const mockResponse = { code: 0, data: { categories: [{ id: 1001, name: 'Clothing' }] }, message: 'success' };
            mockRequest.mockResolvedValue(mockResponse);

            const result = await productModule.getCategories(query);

            expect(mockRequest).toHaveBeenCalledWith({
                method: 'GET',
                path: '/product/202309/categories',
                query,
            });
            expect(result).toBe(mockResponse);
        });
    });
});
