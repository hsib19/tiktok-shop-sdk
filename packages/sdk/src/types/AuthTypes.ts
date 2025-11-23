export interface AccessTokenResponse {
  access_token?: string;
  refresh_token?: string;
  access_token_expire_in?: number;
  refresh_token_expire_in?: number;
  open_id?: string;
  seller_name?: string;
}

export interface GetAccessTokenParams {
  auth_code: string;
  grant_type: "authorized_code";
}

export interface RefreshAccessTokenParams {
  refresh_token: string;
  grant_type: "refresh_token";
}

export interface AuthRequestOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  query?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
}

export interface AuthErrorResponse {
  code?: number;
  message?: string;
  request_id?: string;
}

export type AuthResponse = AccessTokenResponse | AuthErrorResponse;
