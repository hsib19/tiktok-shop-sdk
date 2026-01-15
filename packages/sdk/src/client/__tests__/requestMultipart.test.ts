import { requestMultipart } from '@client';
import { generateSignature } from '@utils';
import FormData from 'form-data';

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
        categoryAssetsCipher: 'test_cipher',
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

    const calledUrl = mockedFetch.mock.calls[0][0] as string;

    expect(calledUrl).toContain('app_key=test_app_key');
    expect(calledUrl).toContain('use_case=MAIN_IMAGE');
    expect(calledUrl).toContain('shop_cipher=test_cipher');
    expect(calledUrl).toContain('category_asset_cipher=test_cipher');
    expect(calledUrl).toContain('sign=mocked-signature');
    expect(calledUrl).toContain('timestamp=');

    // Expect the signature function to be called with correct args
    expect(generateSignature).toHaveBeenCalledWith({
      appSecret: mockConfig.config.appSecret,
      path: mockConfig.path,
      query: expect.objectContaining({
        app_key: 'test_app_key',
        use_case: 'MAIN_IMAGE',
        shop_cipher: 'test_cipher',
        category_asset_cipher: 'test_cipher',
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
      }),
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
      categoryAssetsCipher: 'test_cipher',
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

    const calledUrl = mockedFetch.mock.calls[0][0] as string;

    expect(calledUrl).toContain('app_key=test_app_key');
    expect(calledUrl).toContain('use_case=MAIN_IMAGE');
    expect(calledUrl).toContain('shop_cipher=test_cipher');
    expect(calledUrl).toContain('category_asset_cipher=test_cipher');
    expect(calledUrl).toContain('sign=mocked-signature');
    expect(calledUrl).toContain('timestamp=');

    expect(generateSignature).toHaveBeenCalledWith(
      expect.objectContaining({
        query: expect.objectContaining({
          app_key: 'test_app_key',
          timestamp: expect.any(String),
          shop_cipher: 'cipher',
          category_asset_cipher: 'test_cipher',
        }),
      }),
    );

    expect(res).toEqual(mockRes);
  });

  it('should include shop_cipher when provided', async () => {
    const form = new FormData();

    mockedGenerateSignature.mockReturnValue('sign');
    mockedFetch.mockResolvedValue({
      json: async () => ({}),
    } as Response);

    await requestMultipart({
      method: 'POST',
      path: '/test',
      body: form,
      config: {
        appKey: 'key',
        appSecret: 'secret',
        baseURL: 'https://example.com',
        shopCipher: 'shop123',
      },
    });

    const calledUrl = mockedFetch.mock.calls[0][0] as string;
    expect(calledUrl).toContain('shop_cipher=test_cipher');
  });

  it('should skip undefined query values', async () => {
    const form = new FormData();

    mockedGenerateSignature.mockReturnValue('sign');
    mockedFetch.mockResolvedValue({
      json: async () => ({}),
    } as Response);

    await requestMultipart({
      method: 'POST',
      path: '/test',
      query: {
        foo: undefined,
      },
      body: form,
      config: {
        appKey: 'key',
        appSecret: 'secret',
        baseURL: 'https://example.com',
      },
    });

    const calledUrl = mockedFetch.mock.calls[0][0] as string;
    expect(calledUrl).not.toContain('foo=');
  });
});
