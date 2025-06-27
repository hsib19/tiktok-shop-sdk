// sdk.test.ts
import { TikTokShopSDK } from '../TikTokShopSDK';
import { request, requestMultipart } from '@client';
import { GetGlobalCategoriesQuery, GetProductParams, TikTokAPIResponse, UploadImageParams } from '@types';

jest.mock('@client', () => ({
    request: jest.fn(),
    requestMultipart: jest.fn(),
}));

const mockedRequest = request as jest.MockedFunction<typeof request>;
const mockedMultipart = requestMultipart as jest.MockedFunction<typeof requestMultipart>;

describe('TikTokShopSDK', () => {
    const baseConfig = { appKey: 'key', appSecret: 'secret' };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('sets accessToken and shopCipher correctly', () => {
        const sdk = new TikTokShopSDK(baseConfig);
        sdk.setAccessToken('token123');
        sdk.setShopCipher('cipherABC');

        expect(sdk['accessToken']).toBe('token123');
        expect(sdk['shopCipher']).toBe('cipherABC');
    });

    it('calls request with accessToken in config', async () => {
        const sdk = new TikTokShopSDK(baseConfig);
        sdk.setAccessToken('token123');

        const query: GetGlobalCategoriesQuery = {
            keyword: 'shirt',
            category_version: 'v1',
        };

        mockedRequest.mockResolvedValue({ code: 0, message: 'success', request_id: '1', data: [] });
        await sdk.product.getGlobalCategories(query);

        expect(mockedRequest).toHaveBeenCalledWith(
            expect.objectContaining({
                method: 'GET',
                path: '/product/202309/global_categories',
                query,
                config: expect.objectContaining({
                    appKey: 'key',
                    appSecret: 'secret',
                    accessToken: 'token123',
                }),
            })
        );
    });

    it('calls request with both accessToken and shopCipher in config', async () => {
        const sdk = new TikTokShopSDK(baseConfig);
        sdk.setAccessToken('token123');
        sdk.setShopCipher('cipherABC');

        const params: GetProductParams = {
            product_id: '12345',
            query: { return_under_review_version: true },
        };

        mockedRequest.mockResolvedValue({ code: 0, message: 'success', request_id: '2', data: {} });
        await sdk.product.getProduct(params);

        expect(mockedRequest).toHaveBeenCalledWith(
            expect.objectContaining({
                path: expect.stringContaining('12345'),
                config: expect.objectContaining({
                    accessToken: 'token123',
                    shopCipher: 'cipherABC',
                }),
            })
        );
    });

    it('calls request without accessToken/shopCipher when not set', async () => {
        const sdk = new TikTokShopSDK(baseConfig);

        const query: GetGlobalCategoriesQuery = {
            keyword: 't-shirt',
            category_version: 'v1',
        };

        mockedRequest.mockResolvedValue({ code: 0, message: 'success', request_id: '3', data: [] });
        await sdk.product.getGlobalCategories(query);

        expect(mockedRequest).toHaveBeenCalledWith(
            expect.objectContaining({
                config: expect.not.objectContaining({
                    accessToken: expect.anything(),
                    shopCipher: expect.anything(),
                }),
            })
        );
    });

    it('uses DEFAULT_BASE_URL if baseURL not provided', async () => {
        const sdk = new TikTokShopSDK(baseConfig);
        sdk.setAccessToken('token123');

        const query: GetGlobalCategoriesQuery = {
            keyword: 'shoes',
            category_version: 'v1',
        };

        mockedRequest.mockResolvedValue({ code: 0, message: 'ok', request_id: '4', data: [] });
        await sdk.product.getGlobalCategories(query);

        expect(mockedRequest).toHaveBeenCalledWith(
            expect.objectContaining({
                config: expect.objectContaining({
                    baseURL: expect.any(String), // Optional: match with your DEFAULT_BASE_URL if needed
                }),
            })
        );
    });

    it('calls requestMultipart with accessToken and shopCipher', async () => {
        const sdk = new TikTokShopSDK(baseConfig);
        sdk.setAccessToken('token123');
        sdk.setShopCipher('cipherXYZ');

        mockedMultipart.mockResolvedValue({ code: 0, message: 'ok', request_id: '5', data: {} });

        await sdk.product.uploadProductImage({
            data: Buffer.from('fake'),
            use_case: "MAIN_IMAGE"
        } as UploadImageParams);

        expect(mockedMultipart).toHaveBeenCalledWith(
            expect.objectContaining({
                config: expect.objectContaining({
                    accessToken: 'token123',
                    shopCipher: 'cipherXYZ',
                }),
            })
        );
    });

    it('should call request with merged config including accessToken and baseURL', async () => {
        const mockRequest = request as jest.MockedFunction<typeof request>;

        const sdk = new TikTokShopSDK({
            appKey: 'key',
            appSecret: 'secret',
        });

        sdk.setAccessToken('my-access-token');

        const response: TikTokAPIResponse<object> = {
            code: 0,
            message: 'success',
            data: {  },
            request_id: "2309480234234"
        }

        mockRequest.mockResolvedValue(response);

        const result = await sdk.shop.getAuthorizedShops();

        expect(mockRequest).toHaveBeenCalledWith(
            expect.objectContaining({
                config: expect.objectContaining({
                    appKey: 'key',
                    appSecret: 'secret',
                    baseURL: "https://open-api.tiktokglobalshop.com",
                    accessToken: 'my-access-token',
                }),
            }),
        );

        expect(result).toEqual(response);
    });

});
