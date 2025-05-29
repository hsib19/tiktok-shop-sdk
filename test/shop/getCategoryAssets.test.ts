import { TikTokShopSDK } from '../../src/sdk/index';
import { CategoryAssetsResponse, TikTokAPIResponse } from '../../src/types';

describe('TikTokShopSDK', () => {

    const mockConfig = {
        appKey: 'test-key',
        appSecret: 'test-secret',
    };

    const sdk = new TikTokShopSDK(mockConfig);

    beforeAll(() => {
        // Set Access Token from environment variable
        sdk.setAccessToken(process.env.TIKTOK_APP_ACCESS_KEY!);
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should call resMock from auth module', async () => {

        // Mock response result from getCategoryAssets
        const mockShopsResponse: TikTokAPIResponse<CategoryAssetsResponse> = {
            code: 0,
            data: {
                "category_assets": [
                    {
                        cipher: "TTP_XF90igAAAABh0sddwer0qsWgt233vOiG",
                        target_market: "US",
                        category: {
                            id: 3,
                            name: "Customer Support"
                        }
                    }
                ]
            },
            message: "Success",
            request_id: "202203070749000101890810281E8C70B7"
        };

        // Mock method getCategoryAssets mock
        jest.spyOn(sdk.shop, 'getCategoryAssets').mockResolvedValue(mockShopsResponse);

        const response = await sdk.shop.getCategoryAssets();

        expect(sdk.shop.getCategoryAssets).toHaveBeenCalled();
        expect(response).toEqual(mockShopsResponse);
        expect(response.code).toBe(0);
        expect(response.message).toBe("Success");

    });


    // Failed Response

    beforeEach(() => {
        // Clear any previously set token
        sdk.setAccessToken('');
    });

    it('should return an error response when access token is invalid or not set', async () => {
        const mockErrorResponse = {
            code: 105001,
            message: 'access token is invalid; detail:your user type can not access this interface',
            request_id: '20250528152911EA429A54F1F95707BE7E',
        };

        // Mock the method to return a failed response
        jest.spyOn(sdk.shop, 'getCategoryAssets').mockRejectedValue(mockErrorResponse);

        await expect(sdk.shop.getCategoryAssets()).rejects.toEqual(mockErrorResponse);

    });

});
