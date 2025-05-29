// sdk.test.ts
import { TikTokShopSDK } from '../src/sdk/TikTokShopSDK';
import { AuthModule, EventModule, ShopModule, SellerModule, ProductModule } from '../src/modules';
import { request } from '../src/client/Request';

jest.mock('../src/client/Request');
jest.mock('../src/modules', () => ({
    AuthModule: jest.fn().mockImplementation(() => ({})),
    ShopModule: jest.fn().mockImplementation(() => ({})),
    EventModule: jest.fn().mockImplementation(() => ({})),
    SellerModule: jest.fn().mockImplementation(() => ({})),
    ProductModule: jest.fn().mockImplementation(() => ({})),
}));

const mockedRequest = request as jest.MockedFunction<typeof request>;

describe('TikTokShopSDK', () => {
    const config = {
        appKey: 'app-key',
        appSecret: 'app-secret',
        baseURL: 'https://api.example.com',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize all modules correctly with request wrappers', async () => {
        const sdk = new TikTokShopSDK(config);

        expect(AuthModule).toHaveBeenCalledWith(config);
        expect(ShopModule).toHaveBeenCalledWith(expect.any(Function));
        expect(EventModule).toHaveBeenCalledWith(expect.any(Function));
        expect(SellerModule).toHaveBeenCalledWith(expect.any(Function));
        expect(ProductModule).toHaveBeenCalledWith(expect.any(Function));

        // Mock response harus sesuai tipe TikTokAPIResponse
        mockedRequest.mockResolvedValue({
            code: 0,
            message: 'success',
            request_id: 'test-request-id',
            data: { foo: 'bar' },
        });

        // Ambil request function dari module ShopModule
        const shopModuleRequestFn = (ShopModule as jest.Mock).mock.calls[0][0];

        // Panggil fungsi request dengan sample params
        const result = await shopModuleRequestFn({
            method: 'GET',
            path: '/test',
            query: {},
            config,
        });

        // Pastikan request dipanggil dengan parameter yang benar
        expect(mockedRequest).toHaveBeenCalledWith(expect.objectContaining({
            method: 'GET',
            path: '/test',
            config: expect.objectContaining({
                appKey: config.appKey,
                baseURL: config.baseURL,
                accessToken: undefined, // awalnya undefined
            }),
        }));

        // Pastikan hasil response sesuai mock
        expect(result).toEqual({
            code: 0,
            message: 'success',
            request_id: 'test-request-id',
            data: { foo: 'bar' },
        });
    });

    it('should update accessToken via setAccessToken', () => {
        const sdk = new TikTokShopSDK(config);
        expect(sdk['accessToken']).toBeUndefined();

        sdk.setAccessToken('my-token');
        expect(sdk['accessToken']).toBe('my-token');
    });

    it('should update shopCipher via setShopCipher', () => {
        const sdk = new TikTokShopSDK(config);
        expect(sdk['shopCipher']).toBeUndefined();

        sdk.setShopCipher('my-cipher');
        expect(sdk['shopCipher']).toBe('my-cipher');
    });
});
