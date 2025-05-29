import { TikTokShopSDK } from '../../src/sdk/index';
import { GetAccessTokenParams } from '../../src/types/AuthTypes'

// Mock AuthModule
const mockGetAccessToken = jest.fn();

jest.mock('../../src/modules/AuthModule', () => {
    return {
        AuthModule: jest.fn().mockImplementation(() => ({
            getAccessToken: mockGetAccessToken,
        })),
    };
});

describe('TikTokShopSDK', () => {
    const mockConfig = {
        appKey: 'test-key',
        appSecret: 'test-secret',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should call getAccessToken from auth module', async () => {

        const sdk = new TikTokShopSDK(mockConfig);

        const configParams: GetAccessTokenParams = { grant_type: 'authorized_code', auth_code: 'ROW_G32r9gAAAADeYieYgIEIxbMwqWFEbeGLktuZN1krtb...' }
        const responseMock = { code: 0, data: { access_token: "ROW_G8276384534" }, message: "success" }

        mockGetAccessToken.mockResolvedValue(responseMock);

        // Call getAccessToken via the auth module in the SDK
        const response = await sdk.auth.getAccessToken(configParams);

        expect(mockGetAccessToken).toHaveBeenCalledWith(configParams);
        expect(response).toEqual(responseMock);
        expect(response.code).toBe(0);
        // expect(response.data.access_token).toMatch("ROW_");
        expect(response.message).toBe("success");
    });

    it('should return error response when auth_code is invalid', async () => {

        const errorResponse = {
            code: 36004004,
            message: 'invalid auth code',
            request_id: '2025052814014663D18AFB80F67B03C26E'
        };

        // Mock getAccessToken to resolve with error response (not reject)
        mockGetAccessToken.mockResolvedValue(errorResponse);

        const sdk = new TikTokShopSDK(mockConfig);

        const response = await sdk.auth.getAccessToken({ grant_type: 'authorized_code', auth_code: 'wrong-code' });

        expect(mockGetAccessToken).toHaveBeenCalledWith({ grant_type: 'authorized_code', auth_code: 'wrong-code' });
        expect(response).toEqual(errorResponse);
        expect(response.code).toBe(36004004);
        expect(response.message).toBe('invalid auth code');
    });


});
