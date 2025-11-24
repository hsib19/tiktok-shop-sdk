import { TikTokAPIResponse } from '@types';

export class TikTokAPIError extends Error {
  code: number;
  request_id: string;

  constructor(code: number, message: string, request_id: string) {
    super(message);
    this.code = code;
    this.request_id = request_id;
    this.name = 'TikTokAPIError';
  }
}

// Mengembalikan objek response lengkap (bukan cuma data)
export function handleResponse<T>(
  response: TikTokAPIResponse<T>,
): TikTokAPIResponse<T> {
  if (response.code !== 0) {
    throw new TikTokAPIError(
      response.code,
      response.message,
      response.request_id,
    );
  }
  return response;
}
