import { handleResponse } from '@utils';
import { AuthRequestOptions, TikTokAPIResponse } from '@types';

const AUTH_BASE_URL = 'https://auth.tiktok-shops.com';

export async function authRequest<T>({ method, path, query, body }: AuthRequestOptions): Promise<TikTokAPIResponse<T>> {
    const url = new URL(path, AUTH_BASE_URL);

    if (query) {
        Object.entries(query).forEach(([key, val]) => {
            if (val !== undefined) url.searchParams.append(key, String(val));
        });
    }

    const headers = {
        'Content-Type': 'application/json',
    };

    const response = await fetch(url.toString(), {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();
    return handleResponse<T>(data);
}
