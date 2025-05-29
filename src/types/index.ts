import FormData from 'form-data';

export * from './AuthTypes';
export * from './ShopTypes';
export * from './EventTypes';
export * from './SellerTypes';
export * from './ProductTypes';

export interface RequestParams {
    method: 'GET' | 'POST' | 'DELETE' | 'PUT';
    path: string;
    query?: Record<string, unknown>;
    body?: Record<string, unknown>;
}

export interface MultipartRequestParams {
    method: 'POST';
    path: string;
    query?: Record<string, unknown>;
    body: FormData; 
}

export type TikTokAPIResponse<T> = {
    code: number;
    message: string;
    data?: T;
    request_id: string;
};

export type RequestFunction = <T>(params: RequestParams) => Promise<TikTokAPIResponse<T>>;
export type MultipartRequestFunction = <T>(params: MultipartRequestParams) => Promise<TikTokAPIResponse<T>>;
