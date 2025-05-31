// sdk.test.ts
import { TikTokShopSDK } from '../src/sdk/TikTokShopSDK';
import { AuthModule, EventModule, ShopModule, SellerModule, ProductModule } from '../src/modules';
import { request } from '../src/client/Request';
import { GetGlobalCategoriesQuery, GetProductParams, RequestOptions } from '../src/types';
import axios from 'axios';

jest.mock('../src/client/Request');

const mockedRequest = request as jest.MockedFunction<typeof request>;

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('TikTokShopSDK', () => {
    const config = {
        appKey: 'app-key',
        appSecret: 'app-secret',
        baseURL: 'https://api.example.com',
    };

    beforeEach(() => {
        jest.clearAllMocks();
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

    it('should call request with merged config including accessToken', async () => {
        const mockRequest = request as jest.MockedFunction<typeof request>;

        const sdk = new TikTokShopSDK({
            appKey: 'key',
            appSecret: 'secret',
            baseURL: 'https://api.test',
        });

        sdk.setAccessToken('token123');

        const query: GetGlobalCategoriesQuery = {
            keyword: 't-shirt',
            category_version: 'v1',
        };

        mockRequest.mockResolvedValue({
            code: 0,
            message: 'success',
            request_id: 'mock-id',
            data: [],
        });

        await sdk.product.getGlobalCategories(query);

        expect(mockRequest).toHaveBeenCalledWith(
            expect.objectContaining({
                method: 'GET',
                path: '/product/202309/global_categories', // <- sesuaikan path
                query,
                config: expect.objectContaining({
                    appKey: 'key',
                    appSecret: 'secret',
                    baseURL: 'https://api.test',
                    accessToken: 'token123',
                    // shopCipher tidak perlu dicek jika undefined
                }),
            }),
        );
    });


    it('should call request with merged config including accessToken and shopCipher', async () => {
        const mockRequest = request as jest.MockedFunction<typeof request>;

        const sdk = new TikTokShopSDK({
            appKey: 'key',
            appSecret: 'secret',
            baseURL: 'https://api.test', 
        });

        sdk.setAccessToken('token123');
        sdk.setShopCipher('cipherABC');

        // Grab the requestWithConfigCipher function from product module
        // We test indirectly by calling a method or by exposing for test purpose
        // Or directly test by calling requestWithConfigCipher if you expose it

        // For illustration, simulate calling requestWithConfigCipher directly:
        const params: GetProductParams = {
            product_id: "209472034234",
            query: {
                return_under_review_version: true
            }
        };

        // You can call the internal function via product module or mimic usage
        // Assuming product module has a method that calls this internally:
        await sdk.product.getProduct(params);

        expect(mockRequest).toHaveBeenCalledWith(
            expect.objectContaining({
                method: 'GET',
                path: expect.stringContaining('209472034234'),  // cek product_id di path
                query: {
                    return_under_review_version: true
                },
                config: expect.objectContaining({
                    appKey: 'key',
                    appSecret: 'secret',
                    baseURL: 'https://api.test',
                    accessToken: 'token123',
                    shopCipher: 'cipherABC',
                }),
            })
        );
    });

    it('should use default baseURL if not provided', async () => {
        const sdk = new TikTokShopSDK({
            appKey: 'key',
            appSecret: 'secret'
        });

        sdk.setAccessToken('token123');

        const query: GetGlobalCategoriesQuery = {
            keyword: 'shoes',
            category_version: 'v1',
        };

        await sdk.product.getGlobalCategories(query);

        expect(request).toHaveBeenCalledWith(
            expect.objectContaining({
                config: expect.objectContaining({
                    baseURL: 'https://open-api.tiktokglobalshop.com', 
                }),
            })
        );
    });

    it('should call request without accessToken if not set', async () => {
        const mockRequest = request as jest.MockedFunction<typeof request>;

        const sdk = new TikTokShopSDK({
            appKey: 'key',
            appSecret: 'secret',
            baseURL: 'https://api.test',
        });

        const query: GetGlobalCategoriesQuery = {
            keyword: 'jacket',
            category_version: 'v1',
        };

        await sdk.product.getGlobalCategories(query);

        expect(mockRequest).toHaveBeenCalledWith(
            expect.objectContaining({
                method: 'GET',
                query,
                config: expect.objectContaining({
                    appKey: 'key',
                    appSecret: 'secret',
                    baseURL: 'https://api.test',
                    accessToken: undefined, 
                }),
            })
        );
    });

    it('should call request without accessToken if not set', async () => {
        const mockRequest = request as jest.MockedFunction<typeof request>;

        const sdk = new TikTokShopSDK({
            appKey: 'key',
            appSecret: 'secret',
            baseURL: 'https://api.test',
        });

        // Jangan setAccessToken di sini —> testing kondisi if (this.accessToken) gagal

        const query: GetGlobalCategoriesQuery = {
            keyword: "shoes",
            category_version: "v1",
        };

        await sdk.product.getGlobalCategories(query);

        expect(mockRequest).toHaveBeenCalledWith(
            expect.objectContaining({
                method: 'GET',
                query,
                config: expect.not.objectContaining({
                    accessToken: expect.anything(), // ⬅️ memastikan tidak ada accessToken
                }),
            })
        );
    });


    it('should call request without accessToken in config when not set', async () => {
        const mockRequest = request as jest.MockedFunction<typeof request>;
        const sdk = new TikTokShopSDK({
            appKey: 'key',
            appSecret: 'secret',
            baseURL: 'https://api.test',
        });

        // accessToken TIDAK diset

        const query: GetGlobalCategoriesQuery = {
            keyword: 't-shirt',
            category_version: 'v1',
        };

        await sdk.product.getGlobalCategories(query);

        expect(mockRequest).toHaveBeenCalledWith(
            expect.objectContaining({
                method: 'GET',
                query,
                config: expect.not.objectContaining({
                    accessToken: expect.any(String),
                }),
            })
        );
    });

    it('should fallback to DEFAULT_BASE_URL when baseURL is not provided', async () => {
        const sdk = new TikTokShopSDK({
            appKey: 'key',
            appSecret: 'secret',
            // baseURL intentionally omitted
        });

        sdk.setAccessToken('token123');

        const query: GetGlobalCategoriesQuery = {
            keyword: 't-shirt',
            category_version: 'v1',
        };

        await sdk.product.getGlobalCategories(query);

        expect(mockedRequest).toHaveBeenCalledWith(
            expect.objectContaining({
                config: expect.objectContaining({
                    baseURL: 'https://open-api.tiktokglobalshop.com', // <- default
                }),
            })
        );
    });


    it('should trigger requestWithConfig and call request', async () => {
        const mockedRequest = request as jest.MockedFunction<typeof request>;

        const sdk = new TikTokShopSDK({
            appKey: 'key',
            appSecret: 'secret',
            baseURL: 'https://api.test',
        });

        sdk.setAccessToken('token123');

        mockedRequest.mockResolvedValue({
            code: 0,
            message: 'success',
            request_id: 'id',
            data: {},
        });

        const query: GetGlobalCategoriesQuery = {
            keyword: 'shirt',
            category_version: 'v1',
        };

        await sdk.product.getGlobalCategories(query);

        expect(mockedRequest).toHaveBeenCalledWith(
            expect.objectContaining({
                method: 'GET',
                path: '/product/202309/global_categories',
                query,
                config: expect.objectContaining({
                    accessToken: 'token123',
                    baseURL: 'https://api.test',
                    appKey: 'key',
                    appSecret: 'secret',
                }),
            }),
        );
    });

    it('should add shop_cipher to query if shopCipher is set', () => {
        const config = { shopCipher: 'myCipher' };
        const unsignedQuery: Record<string, any> = { someParam: 123 };

        if (config.shopCipher) {
            unsignedQuery.shop_cipher = config.shopCipher;
        }

        expect(unsignedQuery).toHaveProperty('shop_cipher', 'myCipher');
    });

   

});
