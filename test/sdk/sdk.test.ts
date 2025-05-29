import { TikTokShopSDK } from '../../src/sdk/index';

jest.mock('../../src/modules/AuthModule', () => ({
    AuthModule: jest.fn().mockImplementation(() => ({})),
}));

jest.mock('../../src/modules/ShopModule', () => ({
    ShopModule: jest.fn().mockImplementation(() => ({})),
}));

jest.mock('../../src/modules/EventModule', () => ({
    EventModule: jest.fn().mockImplementation(() => ({})),
}));

jest.mock('../../src/modules/SellerModule', () => ({
    SellerModule: jest.fn().mockImplementation(() => ({})),
}));

jest.mock('../../src/modules/ProductModule', () => ({
    ProductModule: jest.fn().mockImplementation(() => ({})),
}));

describe('TikTokShopSDK', () => {
    const mockConfig = {
        appKey: 'test-key',
        appSecret: 'test-secret',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize AuthModule', () => {
        const sdk = new TikTokShopSDK(mockConfig);
        expect(sdk.auth).toBeDefined();
    });

    it('should initialize ShopModule', () => {
        const sdk = new TikTokShopSDK(mockConfig);
        expect(sdk.shop).toBeDefined();
    });
    
});
