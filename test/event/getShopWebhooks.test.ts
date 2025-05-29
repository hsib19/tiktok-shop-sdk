import { TikTokShopSDK } from '../../src/sdk/index';
import { GetWebhooksResponse, TikTokAPIResponse } from '../../src/types';

    describe('Test Event Shop', () => {

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

        it('should call getShopWebhooks from event module', async() => {

            const mockResponse: TikTokAPIResponse<GetWebhooksResponse> = {
                code: 0,
                data: {
                    webhooks: [
                        {
                            event_type: "ORDER_STATUS_CHANGE",
                            address: "https://partner.tiktokshop.com",
                            create_time: 1635338186,
                            update_time: 1635338186
                        }
                    ],
                    total_count: 1
                },
                message: "Success",
                request_id: "202203070749000101890810281E8C70B7"
            }

            jest.spyOn(sdk.event, 'getShopWebhooks').mockResolvedValue(mockResponse);

            const response = await sdk.event.getShopWebhooks();

            expect(sdk.event.getShopWebhooks).toHaveBeenCalled();
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
            jest.spyOn(sdk.event, 'getShopWebhooks').mockRejectedValue(mockErrorResponse);

            await expect(sdk.event.getShopWebhooks()).rejects.toEqual(mockErrorResponse);

        });

        
    });
