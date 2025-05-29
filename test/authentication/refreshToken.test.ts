import { TikTokShopSDK } from '../../src/sdk/index';
import { RefreshAccessTokenParams } from '../../src/types/AuthTypes';

// Mock AuthModule
const refreshAccessToken = jest.fn();

jest.mock('../../src/modules/AuthModule', () => {
    return {
        AuthModule: jest.fn().mockImplementation(() => ({
            refreshAccessToken: refreshAccessToken,
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

    const configParams: RefreshAccessTokenParams = { grant_type: 'refresh_token', refresh_token: 'ROW_G32r9gAAAADeYieYgIEIxbMwqWFEbeGLktuZN1krtb...' }

    it('should call refreshAccessToken from auth module', async () => {

        const sdk = new TikTokShopSDK(mockConfig);

        const responseMock = { code: 0, data: { access_token: "ROW_G8276384534" }, message: "success" }

        refreshAccessToken.mockResolvedValue(responseMock);

        // Call getAccessToken via the auth module in the SDK
        const response = await sdk.auth.refreshAccessToken(configParams);

        expect(refreshAccessToken).toHaveBeenCalledWith(configParams);
        expect(response).toEqual(responseMock);
        expect(response.code).toBe(0);
        expect(response.message).toBe("success");
    });

    it('should return error response when refresh_token is invalid', async () => {

        const errorResponse = {
            code: 36004005,
            message: 'can not find related auth record',
            request_id: '2025052814014663D18AFB80F67B03C26E'
        };

        // Mock getAccessToken to resolve with error response (not reject)
        refreshAccessToken.mockResolvedValue(errorResponse);

        const sdk = new TikTokShopSDK(mockConfig);

        const response = await sdk.auth.refreshAccessToken(configParams);

        expect(refreshAccessToken).toHaveBeenCalledWith(configParams);
        expect(response).toEqual(errorResponse);
        expect(response.code).toBe(36004005);
        expect(response.message).toBe('can not find related auth record');
    });


});
