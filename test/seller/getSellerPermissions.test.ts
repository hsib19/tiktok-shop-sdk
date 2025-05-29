import { TikTokShopSDK } from '../../src/sdk/index';
import { SellerPermissionsResponse, TikTokAPIResponse } from '../../src/types';

describe('Test Seller Shop', () => {

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

    it('should call getSellerPermissions from seller module', async () => {

        const mockResponse: TikTokAPIResponse<SellerPermissionsResponse> = {
            code: 0,
            data: {
                "permissions": [
                    "MANAGE_GLOBAL_PRODUCT"
                ]
            },
            message: "Success",
            request_id: "202203070749000101890810281E8C70B7"
        }

        jest.spyOn(sdk.seller, 'getSellerPermissions').mockResolvedValue(mockResponse);

        const response = await sdk.seller.getSellerPermissions();

        expect(sdk.seller.getSellerPermissions).toHaveBeenCalled();
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
        jest.spyOn(sdk.seller, 'getSellerPermissions').mockRejectedValue(mockErrorResponse);

        await expect(sdk.seller.getSellerPermissions()).rejects.toEqual(mockErrorResponse);

    });


});
