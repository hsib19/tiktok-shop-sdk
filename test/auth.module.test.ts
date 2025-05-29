import { AuthModule } from '../src/modules/AuthModule';
import { authRequest } from '../src/client';
import { GetAccessTokenParams, RefreshAccessTokenParams } from '../src/types/AuthTypes';

jest.mock('@client', () => ({
    authRequest: jest.fn(),
}));

describe('AuthModule', () => {
    const mockConfig = {
        appKey: 'test-key',
        appSecret: 'test-secret',
    };

    let authModule: AuthModule;

    beforeEach(() => {
        authModule = new AuthModule(mockConfig);
        (authRequest as jest.Mock).mockClear();
    });

    it('should call authRequest with correct params in getAccessToken', async () => {
        (authRequest as jest.Mock).mockResolvedValue({
            code: 0,
            message: 'success',
            data: { access_token: 'token123' },
            request_id: 'req1',
        });

        const params: GetAccessTokenParams = { auth_code: 'code123', grant_type: 'authorized_code' };
        const response = await authModule.getAccessToken(params);

        expect(authRequest).toHaveBeenCalledWith({
            method: 'GET',
            path: '/api/v2/token/get',
            query: {
                app_key: mockConfig.appKey,
                app_secret: mockConfig.appSecret,
                grant_type: 'authorized_code',
                auth_code: 'code123',
            },
        });

        expect(response.code).toBe(0);
        expect(response.data?.access_token).toBe('token123');
    });

    it('should call authRequest with correct params in refreshAccessToken', async () => {
        (authRequest as jest.Mock).mockResolvedValue({
            code: 0,
            message: 'success',
            data: { access_token: 'token456' },
            request_id: 'req2',
        });

        const params: RefreshAccessTokenParams = { refresh_token: 'refresh123', grant_type: 'refresh_token' };
        const response = await authModule.refreshAccessToken(params);

        expect(authRequest).toHaveBeenCalledWith({
            method: 'GET',
            path: '/api/v2/token/refresh',
            query: {
                app_key: mockConfig.appKey,
                app_secret: mockConfig.appSecret,
                grant_type: 'refresh_token',
                refresh_token: 'refresh123',
            },
        });

        expect(response.code).toBe(0);
        expect(response.data?.access_token).toBe('token456');
    });
});
