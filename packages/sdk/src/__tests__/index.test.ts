import { TikTokShopSDK, TikTokAPIError } from '../index';

describe('index.ts re-exports', () => {
    // Test to ensure that the TikTokShopSDK class is correctly re-exported.
    test('should re-export TikTokShopSDK class', () => {
        // Assert that TikTokShopSDK is of type 'function', indicating it's a class constructor in JavaScript.
        expect(typeof TikTokShopSDK).toBe('function');
        // Assert that the name of the re-exported class is 'TikTokShopSDK'.
        expect(TikTokShopSDK.name).toBe('TikTokShopSDK');

        // Optional: You could add further checks here if TikTokShopSDK has static methods
        // or if you want to ensure it can be instantiated (though this might require mocking dependencies).
    });

    // Test to ensure that the TikTokAPIError class is correctly re-exported.
    test('should re-export TikTokAPIError class', () => {
        // Assert that TikTokAPIError is of type 'function', indicating it's a class constructor.
        expect(typeof TikTokAPIError).toBe('function');
        // Assert that the name of the re-exported class is 'TikTokAPIError'.
        expect(TikTokAPIError.name).toBe('TikTokAPIError');

        // Optional: Attempt to instantiate the error and check its properties.
        // This is highly recommended for custom error classes to ensure they behave as expected.
        const error = new TikTokAPIError(400, 'Test error', '04375939543');
        // Assert that the instantiated object is an instance of the native Error class.
        expect(error).toBeInstanceOf(Error);
        // Assert that the instantiated object is an instance of the TikTokAPIError class itself.
        expect(error).toBeInstanceOf(TikTokAPIError);
        // Assert that the 'message' property of the error matches the expected value.
        expect(error.message).toBe('Test error');
        // Assert that the custom 'code' property of the error matches the expected value.
        expect(error.code).toBe(400);
        // Assuming 'request_id' is also a property you want to test, you could add:
        // expect(error.request_id).toBe('04375939543');
    });
});


