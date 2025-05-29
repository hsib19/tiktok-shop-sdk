import { TikTokAPIResponse } from '@types';
import { generateSignature, handleResponse, TikTokAPIError } from '@utils';
import axios, { AxiosError } from 'axios';

interface RequestOptions {
    method: 'GET' | 'POST' | 'DELETE' | 'PUT';
    path: string;
    query?: Record<string, unknown>;
    body?: Record<string, unknown>;
    config: {
        appKey: string;
        appSecret: string;
        accessToken?: string;
        shopCipher?: string;
        baseURL: string;
    };
}

/**
 * Generic TikTok API request function
 * Handles query building, signature generation, headers, and HTTP request with error handling.
 */
export async function request<T>({ method, path, query = {}, body, config }: RequestOptions): Promise<TikTokAPIResponse<T>> {
    // Generate current UNIX timestamp in seconds (required for signing)
    const timestamp = Math.floor(Date.now() / 1000).toString();

    // Prepare query parameters with required TikTok fields
    const unsignedQuery: Record<string, unknown> = {
        ...query,
        app_key: config.appKey,
        timestamp,
    };

    // Inject shop_cipher only if available and needed
    if (config.shopCipher) {
        unsignedQuery.shop_cipher = config.shopCipher;
    }

    // Generate request signature (version v1 explicitly here)
    const sign = generateSignature({
        appSecret: config.appSecret,
        path,
        query: unsignedQuery,
        body,
        version: 'v1',
    });

    // Add the signature to query parameters
    const fullQuery = {
        ...unsignedQuery,
        sign,
    };

    // Build full request URL with encoded query parameters
    const url = new URL(path, config.baseURL);
    Object.entries(fullQuery).forEach(([key, val]) => {
        if (val !== undefined) url.searchParams.append(key, String(val));
    });

    // Prepare request headers
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    // Attach access token if available
    if (config.accessToken) {
        headers['x-tts-access-token'] = config.accessToken;
    }

    try {
        // Send HTTP request using Axios
        const response = await axios.request({
            url: url.toString(),
            method,
            headers,
            data: body,
        });

        // Process and return the data field of the response
        return handleResponse<T>(response.data);

    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Attempt to extract TikTok API error details from the response, if any
            const axiosError = error as AxiosError<{ code: number; message: string; request_id: string }>;
            if (axiosError.response?.data) {
                const data = axiosError.response.data;
                if (typeof data.code === 'number' && typeof data.message === 'string') {
                    // Throw a custom TikTokAPIError with detailed info
                    throw new TikTokAPIError(data.code, data.message, data.request_id || '');
                }
            }
            // Fallback: throw generic axios error with message
            throw new Error(`Axios error: ${error.message}`);
        }
        // Re-throw if the error is not an axios error
        throw error;
    }
}
