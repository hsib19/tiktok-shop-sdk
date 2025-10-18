import { authRequest } from '../AuthRequest'; // Adjust path if different
import { handleResponse } from '@utils/handleResponse'; // Adjust path if different
import { AccessTokenResponse, AuthRequestOptions } from '@types';

// Mock fetch
global.fetch = jest.fn();
const mockedFetch = fetch as jest.MockedFunction<typeof fetch>;

// Mock the handleResponse utility function to control its behavior and track calls.
jest.mock('@utils/handleResponse'); // Adjust path if different
// Cast handleResponse to a MockedFunction to access Jest's mock methods.
const mockedHandleResponse = handleResponse as jest.MockedFunction<
  typeof handleResponse
>;

describe('authRequest', () => {
  // Define the base URL used in the authRequest function.
  const AUTH_BASE_URL = 'https://auth.tiktok-shops.com';

  // Before each test, clear all mock calls and reset their implementations.
  // This ensures tests are isolated and don't affect each other.
  beforeEach(() => {
    mockedFetch.mockClear();
    mockedHandleResponse.mockClear();
  });

  // Test case: Verify that a GET request with query parameters is correctly made
  // and the response is processed by handleResponse.
  test('should make a GET request with query parameters and return handled response', async () => {
    // Define the mock API response data that axios will return.
    const mockApiResponseData = {
      code: 0,
      message: 'Success',
      data: { access_token: 'value' },
    };
    // Define the mock data that handleResponse is expected to return after processing.
    const mockHandledResponse = {
      code: 403545,
      message: 'auth_code not found',
      request_id: '02740234923942',
    };

    // Configure the mocked fetch to resolve successfully with the mock API data.
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponseData,
    } as Response);
    // Configure the mocked handleResponse to return the predefined handled response data.
    mockedHandleResponse.mockReturnValueOnce(mockHandledResponse);

    // Define the options for the authRequest function.
    const options: AuthRequestOptions = {
      method: 'GET',
      path: '/api/v2/token/get',
      query: {
        app_key: 'app-key',
        app_secret: 'app-secret',
        grant_type: 'authorized_code',
        auth_code: 'ROW_893jhkdfgd...',
      },
    };

    // Call the authRequest function with the defined options.
    const result = await authRequest<AccessTokenResponse>(options);

    // --- Assertions ---

    // Verify that fetch was called exactly once.
    expect(mockedFetch).toHaveBeenCalledTimes(1);
    // Verify that fetch was called with the correct parameters,
    // including the constructed URL with all query parameters.
    expect(mockedFetch).toHaveBeenCalledWith(
      `${AUTH_BASE_URL}/api/v2/token/get?app_key=app-key&app_secret=app-secret&grant_type=authorized_code&auth_code=ROW_893jhkdfgd...`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: undefined, // For GET requests, the 'body' field should be undefined.
      },
    );

    // Verify that handleResponse was called exactly once.
    expect(mockedHandleResponse).toHaveBeenCalledTimes(1);
    // Verify that handleResponse was called with the raw API response data from fetch.
    expect(mockedHandleResponse).toHaveBeenCalledWith(mockApiResponseData);

    // Verify that the final result of authRequest matches the data returned by the mocked handleResponse.
    expect(result).toEqual(mockHandledResponse);
  });

  test('should make a GET request without body and return handled response', async () => {
    // Define the mock API response data that fetch will return.
    const mockApiResponseData = { code: 0, message: 'Success' };
    // Define the mock data that handleResponse is expected to return after processing.
    const mockHandledResponse = {
      code: 0,
      message: 'Success',
      request_id: '123',
    };

    // Configure the mocked fetch to resolve successfully with the mock API data.
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponseData,
    } as Response);
    // Configure the mocked handleResponse to return the predefined handled response data.
    mockedHandleResponse.mockReturnValueOnce(mockHandledResponse);

    // Define the options for the authRequest function without body.
    const options: AuthRequestOptions = {
      method: 'GET',
      path: '/api/v2/token/refresh',
      query: {
        app_key: 'app-key',
        refresh_token: 'refresh-token',
      },
      // No body provided
    };

    // Call the authRequest function with the defined options.
    const result = await authRequest<AccessTokenResponse>(options);

    // --- Assertions ---

    // Verify that fetch was called exactly once.
    expect(mockedFetch).toHaveBeenCalledTimes(1);
    // Verify that fetch was called with the correct parameters,
    // including undefined body for GET requests without data.
    expect(mockedFetch).toHaveBeenCalledWith(
      `${AUTH_BASE_URL}/api/v2/token/refresh?app_key=app-key&refresh_token=refresh-token`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: undefined, // Should be undefined when no body is provided.
      },
    );

    // Verify that handleResponse was called exactly once.
    expect(mockedHandleResponse).toHaveBeenCalledTimes(1);
    // Verify that handleResponse was called with the raw API response data from fetch.
    expect(mockedHandleResponse).toHaveBeenCalledWith(mockApiResponseData);

    // Verify that the final result of authRequest matches the data returned by the mocked handleResponse.
    expect(result).toEqual(mockHandledResponse);
  });

  test('should make a POST request with body and return handled response', async () => {
    // Define the mock API response data that fetch will return.
    const mockApiResponseData = {
      code: 0,
      message: 'Success',
      data: { access_token: 'new-token' },
    };
    // Define the mock data that handleResponse is expected to return after processing.
    const mockHandledResponse = {
      code: 0,
      message: 'Success',
      request_id: '456',
    };

    // Configure the mocked fetch to resolve successfully with the mock API data.
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponseData,
    } as Response);
    // Configure the mocked handleResponse to return the predefined handled response data.
    mockedHandleResponse.mockReturnValueOnce(mockHandledResponse);

    // Define the options for the authRequest function with body.
    const options: AuthRequestOptions = {
      method: 'POST',
      path: '/api/v2/token/get',
      body: {
        app_key: 'app-key',
        app_secret: 'app-secret',
        grant_type: 'authorized_code',
        auth_code: 'ROW_893jhkdfgd...',
      },
    };

    // Call the authRequest function with the defined options.
    const result = await authRequest<AccessTokenResponse>(options);

    // --- Assertions ---

    // Verify that fetch was called exactly once.
    expect(mockedFetch).toHaveBeenCalledTimes(1);
    // Verify that fetch was called with the correct parameters,
    // including body with JSON.stringify for POST requests.
    expect(mockedFetch).toHaveBeenCalledWith(
      `${AUTH_BASE_URL}/api/v2/token/get`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          app_key: 'app-key',
          app_secret: 'app-secret',
          grant_type: 'authorized_code',
          auth_code: 'ROW_893jhkdfgd...',
        }), // Should be JSON.stringify when body is provided.
      },
    );

    // Verify that handleResponse was called exactly once.
    expect(mockedHandleResponse).toHaveBeenCalledTimes(1);
    // Verify that handleResponse was called with the raw API response data from fetch.
    expect(mockedHandleResponse).toHaveBeenCalledWith(mockApiResponseData);

    // Verify that the final result of authRequest matches the data returned by the mocked handleResponse.
    expect(result).toEqual(mockHandledResponse);
  });
});
