import axios from 'axios';
import { authRequest } from '../AuthRequest'; // Adjust path if different
import { handleResponse } from '@utils/handleResponse'; // Adjust path if different
import { AccessTokenResponse, AuthRequestOptions } from '@types'

// Mock the entire axios module to prevent actual HTTP requests during tests.
jest.mock('axios');
// Cast axios to a Mocked object to access Jest's mock methods.
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock the handleResponse utility function to control its behavior and track calls.
jest.mock('@utils/handleResponse'); // Adjust path if different
// Cast handleResponse to a MockedFunction to access Jest's mock methods.
const mockedHandleResponse = handleResponse as jest.MockedFunction<typeof handleResponse>;

describe('authRequest', () => {
    // Define the base URL used in the authRequest function.
    const AUTH_BASE_URL = 'https://auth.tiktok-shops.com';

    // Before each test, clear all mock calls and reset their implementations.
    // This ensures tests are isolated and don't affect each other.
    beforeEach(() => {
        mockedAxios.request.mockClear();
        mockedHandleResponse.mockClear();
    });

    // Test case: Verify that a GET request with query parameters is correctly made
    // and the response is processed by handleResponse.
    test('should make a GET request with query parameters and return handled response', async () => {
        // Define the mock API response data that axios will return.
        const mockApiResponseData = { code: 0, message: 'Success', data: { access_token: 'value' } };
        // Define the mock data that handleResponse is expected to return after processing.
        const mockHandledResponse = { code: 403545, message: "auth_code not found", request_id: "02740234923942" };

        // Configure the mocked axios.request to resolve successfully with the mock API data.
        mockedAxios.request.mockResolvedValueOnce({ data: mockApiResponseData });
        // Configure the mocked handleResponse to return the predefined handled response data.
        mockedHandleResponse.mockReturnValueOnce(mockHandledResponse);

        // Define the options for the authRequest function.
        const options: AuthRequestOptions = {
            method: 'GET',
            path: '/api/v2/token/get',
            query: {
                app_key: "app-key",
                app_secret: "app-secret",
                grant_type: 'authorized_code',
                auth_code: "ROW_893jhkdfgd...",
            },
        };

        // Call the authRequest function with the defined options.
        const result = await authRequest<AccessTokenResponse>(options);

        // --- Assertions ---

        // Verify that axios.request was called exactly once.
        expect(mockedAxios.request).toHaveBeenCalledTimes(1);
        // Verify that axios.request was called with the correct parameters,
        // including the constructed URL with all query parameters.
        expect(mockedAxios.request).toHaveBeenCalledWith({
            url: `${AUTH_BASE_URL}/api/v2/token/get?app_key=app-key&app_secret=app-secret&grant_type=authorized_code&auth_code=ROW_893jhkdfgd...`,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            data: undefined, // For GET requests, the 'data' field should be undefined.
        });

        // Verify that handleResponse was called exactly once.
        expect(mockedHandleResponse).toHaveBeenCalledTimes(1);
        // Verify that handleResponse was called with the raw API response data from axios.
        expect(mockedHandleResponse).toHaveBeenCalledWith(mockApiResponseData);

        // Verify that the final result of authRequest matches the data returned by the mocked handleResponse.
        expect(result).toEqual(mockHandledResponse);
    });

});
