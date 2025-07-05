import FormData from 'form-data';
import { requestMultipart } from '@client';
import { generateSignature } from '@utils';

// Mock fetch
global.fetch = jest.fn();

jest.mock('@utils', () => ({
    generateSignature: jest.fn(),
}));

describe('requestMultipart', () => {
    const mockedFetch = fetch as jest.MockedFunction<typeof fetch>;
    const mockedGenerateSignature = generateSignature as jest.Mock;

    it('should send a multipart POST request with signed query and headers', async () => {
        const form = new FormData();
        form.append('image', Buffer.from('fake-image'), 'image.jpg');

        const mockConfig = {
            method: 'POST' as const,
            path: '/product/upload',
            query: { use_case: 'MAIN_IMAGE' },
            body: form,
            config: {
                appKey: 'test_app_key',
                appSecret: 'test_app_secret',
                accessToken: 'test_token',
                shopCipher: 'test_cipher',
                baseURL: 'https://example.com',
            },
        };

        mockedGenerateSignature.mockReturnValue('mocked-signature');

        mockedFetch.mockResolvedValue({
            ok: true,
            json: async () => ({
                code: 0,
                message: 'success',
                data: { uploaded: true },
            }),
        } as Response);

        const res = await requestMultipart(mockConfig);

        // Expect the signature function to be called with correct args
        expect(generateSignature).toHaveBeenCalledWith({
            appSecret: mockConfig.config.appSecret,
            path: mockConfig.path,
            query: expect.objectContaining({
                app_key: 'test_app_key',
                use_case: 'MAIN_IMAGE',
                shop_cipher: 'test_cipher',
                timestamp: expect.any(String),
            }),
            body: undefined,
            version: 'v1',
        });

        // Expect fetch to be called with the right URL and headers
        expect(fetch).toHaveBeenCalledWith(
            expect.stringContaining('/product/upload'),
            expect.objectContaining({
                method: 'POST',
                headers: expect.objectContaining({
                    ...form.getHeaders(),
                    'x-tts-access-token': 'test_token',
                }),
                body: form,
            })
        );

        expect(res).toEqual({
            code: 0,
            message: 'success',
            data: { uploaded: true },
        });
    });

    it('should use default query object when none is provided', async () => {
        const form = new FormData();
        form.append('image', Buffer.from('fake'), 'file.jpg');

        const config = {
            appKey: 'test_app_key',
            appSecret: 'test_app_secret',
            baseURL: 'https://example.com',
            accessToken: 'access_token',
            shopCipher: 'cipher',
        };

        const mockRes = {
            code: 0,
            message: 'ok',
            data: { uploaded: true },
        };

        (generateSignature as jest.Mock).mockReturnValue('signed');
        mockedFetch.mockResolvedValue({
            ok: true,
            json: async () => mockRes,
        } as Response);

        const res = await requestMultipart({
            method: 'POST',
            path: '/product/upload',
            body: form,
            config,
        });

        expect(generateSignature).toHaveBeenCalledWith(
            expect.objectContaining({
                query: expect.objectContaining({
                    app_key: 'test_app_key',
                    timestamp: expect.any(String),
                    shop_cipher: 'cipher',
                }),
            })
        );

        expect(res).toEqual(mockRes);
    });


});
