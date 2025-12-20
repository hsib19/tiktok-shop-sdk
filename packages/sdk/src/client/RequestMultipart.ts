import { generateSignature } from '@utils';
import FormData from 'form-data';

interface MultipartRequestOptions {
  method: 'POST';
  path: string;
  query?: Record<string, unknown>;
  body: InstanceType<typeof FormData>;
  config: {
    appKey: string;
    appSecret: string;
    accessToken?: string;
    shopCipher?: string;
    categoryAssetsCipher?: string;
    baseURL: string;
  };
}

export async function requestMultipart({
  method,
  path,
  query = {},
  body,
  config,
}: MultipartRequestOptions) {
  const timestamp = Math.floor(Date.now() / 1000).toString();

  const unsignedQuery: Record<string, unknown> = {
    ...query,
    app_key: config.appKey,
    timestamp,
  };

  if (config.shopCipher) {
    unsignedQuery.shop_cipher = config.shopCipher;
  }

  if (config.categoryAssetsCipher) {
    unsignedQuery.category_asset_cipher = config.categoryAssetsCipher;
  }

  const sign = generateSignature({
    appSecret: config.appSecret,
    path,
    query: unsignedQuery,
    body: undefined,
    version: 'v1',
  });

  const fullQuery = {
    ...unsignedQuery,
    sign,
  };

  const url = new URL(path, config.baseURL);
  Object.entries(fullQuery).forEach(([key, val]) => {
    if (val !== undefined) url.searchParams.append(key, String(val));
  });

  const formHeaders = body.getHeaders();

  const headers = {
    ...formHeaders,
  };

  if (config.accessToken) {
    headers['x-tts-access-token'] = config.accessToken;
  }

  const response = await fetch(url.toString(), {
    method,
    headers,
    body: body as unknown as BodyInit,
  });

  const data = await response.json();
  return data;
}
