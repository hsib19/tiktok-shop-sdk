import { TikTokShopSDK } from '../../src/sdk/index';
import { CheckListingPrerequisitesResponse, TikTokAPIResponse } from '../../src/types';

describe('Test Products', () => {

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

    it('should call getProductPrerequisites from seller module', async () => {

        const mockResponse: TikTokAPIResponse<CheckListingPrerequisitesResponse> = {
            code: 0,
            data: {
                "shop": {
                    "status": "{\"id\":\"shop_status\",\"name\":\"shop_status\",\"check_result\":{\"is_failed\":false}}",
                    "tax_info": "{\"id\":\"tax_info\",\"name\":\"tax_info\",\"check_result\":{\"is_failed\":true,\"fail_reasons\":[\"This seller is not able to create or edit product. Check if the seller has a valid tax number.\"]}}",
                    "gne": {
                        "product_quantity_limit": "{\"id\":\"product_quantity_limit\",\"name\":\"product_quantity_limit\",\"check_result\":{\"is_failed\":false}}",
                        "epr": "{\"id\":\"epr\",\"name\":\"epr\",\"check_result\":{\"is_failed\":false}}"
                    },
                    "logistics": {
                        "pickup_warehouse": "{\"id\":\"delivery_warehouse\",\"name\":\"delivery_warehouse\",\"check_result\":{\"is_failed\":false}}",
                        "return_warehouse": "{\"id\":\"return_warehouse\",\"name\":\"return_warehouse\",\"check_result\":{\"is_failed\":true,\"fail_reasons\":[\"Couldn't publish this product as you haven't set the return warehouse for your shop. Add the return warehouse information on TikTok Shop Seller Center first and try again.\"]}}",
                        "shipping_template": "{\"id\":\"shipping_template\",\"name\":\"shipping_template\",\"check_result\":{\"is_failed\":false}}",
                        "delivery_option": "{\"id\":\"logistics_service\",\"name\":\"logistics_service\",\"check_result\":{\"is_failed\":true,\"fail_reasons\":[\"Cannot add products because the warehouse didn't set logistics service. You can check in the shipping option page\"]}}"
                    },
                    "contact_info": "{\"id\":\"contact_info\",\"name\":\"contact_info\",\"check_result\":{\"is_failed\":false}}",
                    "bank_account": "{\"id\":\"bank_account\",\"name\":\"bank_account\",\"check_result\":{\"is_failed\":false}}"
                }
            },
            message: "Success",
            request_id: "202203070749000101890810281E8C70B7"
        }

        jest.spyOn(sdk.product, 'getProductPrerequisites').mockResolvedValue(mockResponse);

        const response = await sdk.product.getProductPrerequisites();

        expect(sdk.product.getProductPrerequisites).toHaveBeenCalled();
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
        jest.spyOn(sdk.product, 'getProductPrerequisites').mockRejectedValue(mockErrorResponse);

        await expect(sdk.product.getProductPrerequisites()).rejects.toEqual(mockErrorResponse);

    });


});
