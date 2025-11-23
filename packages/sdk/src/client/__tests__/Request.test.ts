import { request } from "@client";
import { generateSignature, handleResponse, TikTokAPIError } from "@utils";
import { RequestOptions } from "@types";

// Mock fetch
global.fetch = jest.fn();

jest.mock("@utils", () => ({
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

const mockedFetch = fetch as jest.MockedFunction<typeof fetch>;
const mockedGenerateSignature = generateSignature as jest.Mock;
const mockedHandleResponse = handleResponse as jest.Mock;

describe("request", () => {
  const baseConfig = {
    appKey: "test-app-key",
    appSecret: "test-app-secret",
    baseURL: "https://api.tiktok.com",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should perform a successful request and return handled response", async () => {
    mockedGenerateSignature.mockReturnValue("signed-value");
    mockedHandleResponse.mockReturnValue({ success: true });

    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ foo: "bar" }),
    } as Response);

    const result = await request({
      method: "GET",
      path: "/test/path",
      query: { param1: "value1" },
      config: baseConfig,
    });

    expect(mockedGenerateSignature).toHaveBeenCalledWith(
      expect.objectContaining({
        appSecret: baseConfig.appSecret,
        path: "/test/path",
        query: expect.objectContaining({
          param1: "value1",
          app_key: baseConfig.appKey,
          timestamp: expect.any(String),
        }),
        version: "v1",
      }),
    );

    expect(mockedFetch).toHaveBeenCalledWith(
      expect.stringContaining("/test/path"),
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
        body: undefined,
      }),
    );

    expect(mockedHandleResponse).toHaveBeenCalledWith({ foo: "bar" });
    expect(result).toEqual({ success: true });
  });

  it("should include access token header if provided", async () => {
    mockedGenerateSignature.mockReturnValue("signed-value");
    mockedHandleResponse.mockReturnValue({});
    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => ({}),
    } as Response);

    await request({
      method: "POST",
      path: "/path",
      query: {},
      config: {
        ...baseConfig,
        accessToken: "my-access-token",
      },
      body: { some: "data" },
    });

    expect(mockedFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          "x-tts-access-token": "my-access-token",
        }),
      }),
    );
  });

  it("should throw TikTokAPIError on TikTok API error response", async () => {
    mockedFetch.mockResolvedValue({
      ok: false,
      status: 400,
      statusText: "Bad Request",
      json: async () => ({
        code: 123,
        message: "API error occurred",
        request_id: "req-789",
      }),
    } as Response);

    await expect(
      request({
        method: "GET",
        path: "/error",
        config: baseConfig,
      }),
    ).rejects.toMatchObject({
      code: 123,
      message: "API error occurred",
      requestId: "req-789",
    });
  });

  it("should throw generic error on network errors", async () => {
    const error = new TypeError("fetch failed");
    mockedFetch.mockRejectedValue(error);

    await expect(
      request({
        method: "GET",
        path: "/fail",
        config: baseConfig,
      }),
    ).rejects.toThrow("Network error: fetch failed");
  });

  it("should re-throw unknown errors", async () => {
    const error = new Error("Unknown error");
    mockedFetch.mockRejectedValue(error);

    await expect(
      request({
        method: "GET",
        path: "/fail",
        config: baseConfig,
      }),
    ).rejects.toThrow("Unknown error");
  });

  it("should throw generic HTTP error when response is not ok and no TikTok error format", async () => {
    mockedFetch.mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
      json: async () => ({ error: "Server error" }),
    } as Response);

    await expect(
      request({
        method: "GET",
        path: "/no-response",
        config: baseConfig,
      }),
    ).rejects.toThrow("HTTP error: 500 Internal Server Error");
  });

  it("should throw response parsing error when JSON is invalid", async () => {
    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => {
        throw new SyntaxError("Unexpected token");
      },
    } as unknown as Response);

    await expect(
      request({
        method: "GET",
        path: "/empty-data",
        config: baseConfig,
      }),
    ).rejects.toThrow("Response parsing error: Unexpected token");
  });

  it("should throw error for non-fetch errors", async () => {
    const error = new Error("Not a fetch error");
    mockedFetch.mockRejectedValue(error);

    await expect(
      request({
        method: "GET",
        path: "/not-fetch",
        config: baseConfig,
      }),
    ).rejects.toThrow("Not a fetch error");
  });

  it("should include shop_cipher in query if shopCipher is provided", async () => {
    mockedGenerateSignature.mockReturnValue("signed-value");
    mockedHandleResponse.mockReturnValue({ success: true });
    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => ({}),
    } as Response);

    await request({
      method: "GET",
      path: "/test",
      config: {
        ...baseConfig,
        shopCipher: "test-cipher",
      },
    });

    // Pastikan generateSignature dipanggil dengan query yang ada shop_cipher
    expect(mockedGenerateSignature).toHaveBeenCalledWith(
      expect.objectContaining({
        query: expect.objectContaining({
          shop_cipher: "test-cipher",
        }),
      }),
    );
  });

  it("should correctly append nested query parameters to URL", async () => {
    mockedGenerateSignature.mockReturnValue("signed-value");
    mockedHandleResponse.mockReturnValue({ success: true });
    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ foo: "bar" }),
    } as Response);

    const nestedQuery = {
      param1: "value1",
      query: {
        nested1: "nestedValue1",
        nested2: 123,
      },
    };

    await request({
      method: "GET",
      path: "/test/nested-query",
      query: nestedQuery,
      config: baseConfig,
    });

    // Ambil URL yang dipakai fetch
    const calledUrl = mockedFetch.mock.calls[0][0] as string;

    expect(calledUrl).toContain("param1=value1");
    expect(calledUrl).toContain("nested1=nestedValue1");
    expect(calledUrl).toContain("nested2=123");
  });

  it("should correctly append nested body object parameters to URL", async () => {
    mockedGenerateSignature.mockReturnValue("signed-value");
    mockedHandleResponse.mockReturnValue({ success: true });
    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);

    const nestedBody = {
      query: {
        responsible_person_ids: ["nestedValue1", "nestedvalue2"],
      },
    };

    await request({
      method: "GET",
      path: "/test/nested-query",
      query: nestedBody,
      config: baseConfig,
    });

    // Ambil URL yang dipakai fetch
    const calledUrl = mockedFetch.mock.calls[0][0] as string;
    const urlReplace = calledUrl?.replace("%2C", ",");

    expect(calledUrl).toContain(
      "responsible_person_ids=nestedValue1%2Cnestedvalue2",
    );
    expect(urlReplace).toContain(
      "responsible_person_ids=nestedValue1,nestedvalue2",
    );
  });

  it("should join array query param values with commas in URL", async () => {
    // Arrange
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: "ok" }),
    } as Response);

    const options: RequestOptions = {
      method: "GET",
      path: "/api/test",
      query: {
        product_ids: ["1", "2", "3"],
      },
      config: {
        appKey: "appkey123",
        appSecret: "secret123",
        baseURL: "https://example.com",
      },
    };

    await request(options);

    expect(mockedFetch).toHaveBeenCalledTimes(1);

    const calledUrl = mockedFetch.mock.calls[0][0] as string;

    expect(calledUrl).toContain("product_ids=1%2C2%2C3");
  });

  it("should skip query params with undefined values when building URL", async () => {
    // Mock fetch to resolve with dummy data
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: "ok" }),
    } as Response);

    const options: RequestOptions = {
      method: "GET",
      path: "/api/test",
      query: {
        foo: "bar", // valid query param, should be included
        skipMe: undefined, // undefined query param, should be skipped,
        boolean1: true,
        numberval: 123,
      },
      config: {
        appKey: "appkey123",
        appSecret: "secret123",
        baseURL: "https://example.com",
      },
    };

    // Execute the request function
    await request(options);

    // Get the URL passed to fetch
    const calledUrl = mockedFetch.mock.calls[0][0] as string;

    // Expect the URL to contain the valid query param 'foo=bar'
    expect(calledUrl).toContain("foo=bar&boolean1=true&numberval=123");

    // Expect the URL NOT to contain the undefined param 'skipMe'
    expect(calledUrl).not.toContain("skipMe=");
  });

  it("should skip nested query parameters with undefined values", async () => {
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: "ok" }),
    } as Response);

    const options: RequestOptions = {
      method: "GET",
      path: "/api/test",
      query: {
        query: {
          // nested query object
          validKey: "value", // should be included
          skipKey: undefined, // should be skipped
          boolean1: true,
          numberval: 123,
        },
      },
      config: {
        appKey: "appkey123",
        appSecret: "secret123",
        baseURL: "https://example.com",
      },
    };

    await request(options);

    const calledUrl = mockedFetch.mock.calls[0][0] as string;

    // The URL should contain 'validKey=value' from the nested query object
    expect(calledUrl).toContain("validKey=value&boolean1=true&numberval=123");

    // The URL should NOT contain 'skipKey' because its value is undefined
    expect(calledUrl).not.toContain("skipKey=");
  });

  it("sets requestId to empty string if not provided", async () => {
    mockedFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      statusText: "Unauthorized",
      json: async () => ({
        code: 401,
        message: "Unauthorized",
        // optionally request_id omitted
      }),
    } as Response);

    const options: RequestOptions = {
      method: "GET",
      path: "/api/private",
      query: {},
      config: {
        appKey: "testkey",
        appSecret: "testsecret",
        baseURL: "https://api.tiktok.com",
      },
    };

    await expect(request(options)).rejects.toThrow(TikTokAPIError);
    await request(options).catch((err) => {
      expect(err).toBeInstanceOf(TikTokAPIError);
      expect(err.message).toBe("Unauthorized");
      expect(err.code).toBe(401);
      expect(err.requestId).toBe("");
    });
  });
});
