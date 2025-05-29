import { TikTokShopSDK } from '../../src/sdk/index';
import { DeleteShopWebhookBody } from '../../src/types';

    describe('Test Delete Event Shop', () => {

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

        const dataDelete: DeleteShopWebhookBody = {
            event_type:'INVOICE_STATUS_CHANGE'
        }

        it('should call deleteShopWebhook from event module', async() => {

            const mockResponse = {
                code: 0,
                data: {},
                message: 'Success',
                request_id: '20250528161318A2238C2CF82E3A08C562'
            }

            jest.spyOn(sdk.event, 'deleteShopWebhook').mockResolvedValue(mockResponse);

            const response = await sdk.event.deleteShopWebhook(dataDelete);

            expect(sdk.event.deleteShopWebhook).toHaveBeenCalled();
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
            jest.spyOn(sdk.event, 'deleteShopWebhook').mockRejectedValue(mockErrorResponse);

            await expect(sdk.event.deleteShopWebhook(dataDelete)).rejects.toEqual(mockErrorResponse);

        });

        
    });
