import { TikTokShopSDK } from '../../src/sdk/index';
import { AuthorizedShopsResponse, TikTokAPIResponse } from '../../src/types';

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

    it('should call getAuthorizedShops from auth module', async () => {

        // Mock response result from getAuthorizedShops
        const mockShopsResponse: TikTokAPIResponse<AuthorizedShopsResponse> = {
            code: 0,
                data: {
                shops: [
                    {
                        id: "7000714532876273420",
                        name: "Maomao beauty shop",
                        region: "GB",
                        seller_type: "CROSS_BORDER",
                        cipher: "GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3",
                        code: "CNGBCBA4LLU8"
                    }
                ]
            },
            message: "Success",
            request_id: "202203070749000101890810281E8C70B7"
        };

        // Mock method getAuthorizedShops mock
        jest.spyOn(sdk.shop, 'getAuthorizedShops').mockResolvedValue(mockShopsResponse);

        const response = await sdk.shop.getAuthorizedShops();

        expect(sdk.shop.getAuthorizedShops).toHaveBeenCalled();
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
            message: 'access token is invalid',
            request_id: '20250528152410D2C69F6C6156A3078BFF',
        };

        // Mock the method to return a failed response
        jest.spyOn(sdk.shop, 'getAuthorizedShops').mockRejectedValue(mockErrorResponse);

        await expect(sdk.shop.getAuthorizedShops()).rejects.toEqual(mockErrorResponse);
        
    });

});
