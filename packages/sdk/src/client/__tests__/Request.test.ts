import axios, { AxiosError } from 'axios';
import { request } from '@client';
import { generateSignature, handleResponse, TikTokAPIError } from '@utils';
import { RequestOptions } from '@types';

jest.mock('axios');
jest.mock('@utils', () => ({
    generateSignature: jest.fn(),
    handleResponse: jest.fn(),
    TikTokAPIError: class extends Error {
        code: number;
        requestId: string;
        constructor(code: number, message: string, requestId: string) {
            super(message);
            this.code = code;
            this.requestId = requestId;
        }
    },
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedGenerateSignature = generateSignature as jest.Mock;
const mockedHandleResponse = handleResponse as jest.Mock;

describe('request', () => {
    const baseConfig = {
        appKey: 'test-app-key',
        appSecret: 'test-app-secret',
        baseURL: 'https://api.tiktok.com',
    };

    beforeEach(() => {
        jest.clearAllMocks();

        // ✅ Gunakan spyOn agar isAxiosError tetap valid sebagai type predicate
        jest.spyOn(axios, 'isAxiosError').mockImplementation((err): err is AxiosError => {
            return !!err?.isAxiosError;
        });
    });

    it('should perform a successful request and return handled response', async () => {
        mockedGenerateSignature.mockReturnValue('signed-value');
        mockedHandleResponse.mockReturnValue({ success: true });

        mockedAxios.request.mockResolvedValue({
            data: { foo: 'bar' },
        });

        const result = await request({
            method: 'GET',
            path: '/test/path',
            query: { param1: 'value1' },
            config: baseConfig,
        });

        expect(mockedGenerateSignature).toHaveBeenCalledWith(expect.objectContaining({
            appSecret: baseConfig.appSecret,
            path: '/test/path',
            query: expect.objectContaining({
                param1: 'value1',
                app_key: baseConfig.appKey,
                timestamp: expect.any(String),
            }),
            version: 'v1',
        }));

        expect(mockedAxios.request).toHaveBeenCalledWith(expect.objectContaining({
            method: 'GET',
            url: expect.stringContaining('/test/path'),
            headers: expect.objectContaining({
                'Content-Type': 'application/json',
            }),
            data: undefined,
        }));

        expect(mockedHandleResponse).toHaveBeenCalledWith({ foo: 'bar' });
        expect(result).toEqual({ success: true });
    });

    it('should include access token header if provided', async () => {
        mockedGenerateSignature.mockReturnValue('signed-value');
        mockedHandleResponse.mockReturnValue({});
        mockedAxios.request.mockResolvedValue({ data: {} });

        await request({
            method: 'POST',
            path: '/path',
            query: {},
            config: {
                ...baseConfig,
                accessToken: 'my-access-token',
            },
            body: { some: 'data' },
        });

        expect(mockedAxios.request).toHaveBeenCalledWith(expect.objectContaining({
            headers: expect.objectContaining({
                'x-tts-access-token': 'my-access-token',
            }),
        }));
    });

    it('should throw TikTokAPIError on TikTok API error response', async () => {
        const errorResponse = {
            isAxiosError: true,
            response: {
                data: {
                    code: 123,
                    message: 'API error occurred',
                    request_id: 'req-789',
                },
            },
            message: 'Error message',
        };

        mockedAxios.request.mockRejectedValue(errorResponse);

        await expect(request({
            method: 'GET',
            path: '/error',
            config: baseConfig,
        })).rejects.toMatchObject({
            code: 123,
            message: 'API error occurred',
            requestId: 'req-789',
        });
    });

    it('should throw generic error on other axios errors', async () => {
        const error = {
            isAxiosError: true,
            message: 'Network error',
        };

        mockedAxios.request.mockRejectedValue(error);

        await expect(request({
            method: 'GET',
            path: '/fail',
            config: baseConfig,
        })).rejects.toThrow('Axios error: Network error');
    });

    it('should re-throw unknown errors', async () => {
        const error = new Error('Unknown error');
        mockedAxios.request.mockRejectedValue(error);

        await expect(request({
            method: 'GET',
            path: '/fail',
            config: baseConfig,
        })).rejects.toThrow('Unknown error');
    });

    it('should throw generic axios error when response is undefined', async () => {
        const error = {
            isAxiosError: true,
            response: undefined,
            message: 'No response received',
        };

        mockedAxios.request.mockRejectedValue(error);

        await expect(request({
            method: 'GET',
            path: '/no-response',
            config: baseConfig,
        })).rejects.toThrow('Axios error: No response received');
    });

    it('should throw generic axios error when response.data is undefined', async () => {
        const error = {
            isAxiosError: true,
            response: {
                data: undefined,
            },
            message: 'Empty response data',
        };

        mockedAxios.request.mockRejectedValue(error);

        await expect(request({
            method: 'GET',
            path: '/empty-data',
            config: baseConfig,
        })).rejects.toThrow('Axios error: Empty response data');
    });

    it('should throw error if error is not axios error', async () => {
        const error = new Error('Not an axios error');

        // simulate non-axios error by making isAxiosError false
        (error as any).isAxiosError = false;

        mockedAxios.request.mockRejectedValue(error);

        await expect(request({
            method: 'GET',
            path: '/not-axios',
            config: baseConfig,
        })).rejects.toThrow('Not an axios error');
    });

    it('should include shop_cipher in query if shopCipher is provided', async () => {
        mockedGenerateSignature.mockReturnValue('signed-value');
        mockedHandleResponse.mockReturnValue({ success: true });
        mockedAxios.request.mockResolvedValue({ data: {} });

        await request({
            method: 'GET',
            path: '/test',
            config: {
                ...baseConfig,
                shopCipher: 'test-cipher',
            },
        });

        // Pastikan generateSignature dipanggil dengan query yang ada shop_cipher
        expect(mockedGenerateSignature).toHaveBeenCalledWith(expect.objectContaining({
            query: expect.objectContaining({
                shop_cipher: 'test-cipher',
            }),
        }));
    });

    it('should correctly append nested query parameters to URL', async () => {
        mockedGenerateSignature.mockReturnValue('signed-value');
        mockedHandleResponse.mockReturnValue({ success: true });
        mockedAxios.request.mockResolvedValue({ data: { foo: 'bar' } });

        const nestedQuery = {
            param1: 'value1',
            query: {
                nested1: 'nestedValue1',
                nested2: 123,
            },
        };

        await request({
            method: 'GET',
            path: '/test/nested-query',
            query: nestedQuery,
            config: baseConfig,
        });

        // Ambil URL yang dipakai axios.request
        const calledUrl = mockedAxios.request.mock.calls[0][0].url;

        expect(calledUrl).toContain('param1=value1');
        expect(calledUrl).toContain('nested1=nestedValue1');
        expect(calledUrl).toContain('nested2=123');
    });


    it('should correctly append nested body object parameters to URL', async () => {
        mockedGenerateSignature.mockReturnValue('signed-value');
        mockedHandleResponse.mockReturnValue({ success: true });

        const nestedBody = {
            query: {
                responsible_person_ids: ['nestedValue1', 'nestedvalue2'],
            }
        };

        await request({
            method: 'GET',
            path: '/test/nested-query',
            query: nestedBody,
            config: baseConfig,
        });

        // Ambil URL yang dipakai axios.request
        const calledUrl = mockedAxios.request.mock.calls[0][0].url;
        const urlReplace = calledUrl?.replace("%2C", ",");

        expect(calledUrl).toContain('responsible_person_ids=nestedValue1%2Cnestedvalue2');
        expect(urlReplace).toContain('responsible_person_ids=nestedValue1,nestedvalue2');
    });

    it('should join array query param values with commas in URL', async () => {
        // Arrange
        mockedAxios.request.mockResolvedValueOnce({
            data: { data: 'ok' },
        });

        const options: RequestOptions = {
            method: 'GET',
            path: '/api/test',
            query: {
                product_ids: ['1', '2', '3'],
            },
            config: {
                appKey: 'appkey123',
                appSecret: 'secret123',
                baseURL: 'https://example.com',
            },
        };

        await request(options);

        expect(mockedAxios.request).toHaveBeenCalledTimes(1);

        const calledUrl = mockedAxios.request.mock.calls[0][0].url;

        expect(calledUrl).toContain('product_ids=1%2C2%2C3');
    });

    it('should skip query params with undefined values when building URL', async () => {
        // Mock axios to resolve with dummy data
        mockedAxios.request.mockResolvedValueOnce({
            data: { data: 'ok' },
        });

        const options: RequestOptions = {
            method: 'GET',
            path: '/api/test',
            query: {
                foo: 'bar',        // valid query param, should be included
                skipMe: undefined, // undefined query param, should be skipped,
                boolean1: true,
                numberval: 123
            },
            config: {
                appKey: 'appkey123',
                appSecret: 'secret123',
                baseURL: 'https://example.com',
            },
        };

        // Execute the request function
        await request(options);

        // Get the URL passed to axios.request
        const calledUrl = mockedAxios.request.mock.calls[0][0].url;

        // Expect the URL to contain the valid query param 'foo=bar'
        expect(calledUrl).toContain('foo=bar&boolean1=true&numberval=123');

        // Expect the URL NOT to contain the undefined param 'skipMe'
        expect(calledUrl).not.toContain('skipMe=');
    });

    it('should skip nested query parameters with undefined values', async () => {
        mockedAxios.request.mockResolvedValueOnce({
            data: { data: 'ok' },
        });

        const options: RequestOptions = {
            method: 'GET',
            path: '/api/test',
            query: {
                query: {               // nested query object
                    validKey: 'value',   // should be included
                    skipKey: undefined,  // should be skipped
                    boolean1: true,
                    numberval: 123
                },
            },
            config: {
                appKey: 'appkey123',
                appSecret: 'secret123',
                baseURL: 'https://example.com',
            },
        };

        await request(options);

        const calledUrl = mockedAxios.request.mock.calls[0][0].url;

        // The URL should contain 'validKey=value' from the nested query object
        expect(calledUrl).toContain('validKey=value&boolean1=true&numberval=123');

        // The URL should NOT contain 'skipKey' because its value is undefined
        expect(calledUrl).not.toContain('skipKey=');
    });


    it('sets requestId to empty string if not provided', async () => {
        mockedAxios.request.mockRejectedValueOnce({
            isAxiosError: true,
            response: {
                data: {
                    code: 401,
                    message: 'Unauthorized',
                    // optionally request_id omitted
                },
            },
            message: 'Unauthorized',
        });

        const options: RequestOptions = {
            method: 'GET',
            path: '/api/private',
            query: {},
            config: {
                appKey: 'testkey',
                appSecret: 'testsecret',
                baseURL: 'https://api.tiktok.com',
            },
        };

        await expect(request(options)).rejects.toThrow(TikTokAPIError);
        await request(options).catch((err) => {
            expect(err).toBeInstanceOf(TikTokAPIError);
            expect(err.message).toBe('Unauthorized');
            expect(err.code).toBe(401);
            expect(err.requestId).toBe('');
        });
    });

});
