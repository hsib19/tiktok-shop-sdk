import { TikTokShopSDK } from '../../src/sdk/index';
import { CategoriesResponse, GetCategoriesQuery, TikTokAPIResponse } from '../../src/types';

describe('Test Categories', () => {

    const mockConfig = {
        appKey: 'test-key',
        appSecret: 'test-secret',
    };

    const sdk = new TikTokShopSDK(mockConfig);

    beforeAll(() => {
        // Set Access Token from environment variable
        sdk.setAccessToken(process.env.TIKTOK_APP_ACCESS_KEY!);
        // Set Cipher from environment variable
        sdk.setShopCipher(process.env.TIKTOK_SHOP_CIPHER!);
    });

    const queryParams: GetCategoriesQuery = {
        locale: 'id-ID',
        keyword: 'Kaos',
        category_version: 'v1',
        listing_platform: 'TIKTOK_SHOP'
    }

    it('should call getCategories from seller module', async () => {

        const mockResponse: TikTokAPIResponse<CategoriesResponse> = {
            code: 0,
            data: {
                "categories": [
                    {
                        "id": "600002",
                        "parent_id": "600001",
                        "local_name": "Home Supplies",
                        "is_leaf": false,
                        "permission_statuses": [
                            "INVITE_ONLY",
                            "NON_MAIN_CATEGORY"
                        ]
                    }
                ]
            },
            message: "Success",
            request_id: "202203070749000101890810281E8C70B7"
        }

        jest.spyOn(sdk.product, 'getCategories').mockResolvedValue(mockResponse);

        const response = await sdk.product.getCategories(queryParams);

        expect(sdk.product.getCategories).toHaveBeenCalled();
        expect(response).toEqual(mockResponse);
        expect(response.code).toBe(0);
        expect(response.message).toBe("Success");

    });

    // Failed Response

    beforeEach(() => {
        // Clear any previously set token
        sdk.setAccessToken('');
        sdk.setShopCipher('');
    });

    it('should return an error response when access token is invalid or not set', async () => {

        const mockErrorResponse = {
            code: 106011,
            message: 'Invalid shop_cipher',
            request_id: '20250528160034DF58C24FEA4CEC09122E'
        };

        // Mock the method to return a failed response
        jest.spyOn(sdk.product, 'getCategories').mockRejectedValue(mockErrorResponse);

        await expect(sdk.product.getCategories(queryParams)).rejects.toEqual(mockErrorResponse);

    });


});
