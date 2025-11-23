import FormData from "form-data";

export interface RequestParams {
  method: "GET" | "POST" | "DELETE" | "PUT";
  path: string;
  query?: Record<string, unknown>;
  body?: Record<string, unknown>;
}

export interface MultipartRequestParams {
  method: "POST";
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

export interface RequestOptions {
  method: "GET" | "POST" | "DELETE" | "PUT";
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

export type RequestFunction = <T>(
  params: RequestParams,
) => Promise<TikTokAPIResponse<T>>;
export type MultipartRequestFunction = <T>(
  params: MultipartRequestParams,
) => Promise<TikTokAPIResponse<T>>;
