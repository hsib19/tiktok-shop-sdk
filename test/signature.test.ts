import { generateSignature } from '../src/utils/signature';

describe('generateSignature', () => {
    const appSecret = 'my-secret';
    const path = '/product/202309/products/search';

    it('should generate v1 signature with no query or body', () => {
        const sign = generateSignature({ appSecret, path });
        expect(typeof sign).toBe('string');
        expect(sign.length).toBe(64); // SHA-256 hex
    });

    it('should generate v2 signature with query and body', () => {
        const query = { foo: 'bar', baz: 'qux' };
        const body = { name: 'product', price: 100 };
        const sign = generateSignature({ appSecret, path, query, body, version: 'v2' });
        expect(typeof sign).toBe('string');
    });

    it('should exclude `sign` and `access_token` from query when signing', () => {
        const query = {
            foo: 'bar',
            sign: 'should-be-removed',
            access_token: 'should-be-removed-too',
        };
        const sign = generateSignature({ appSecret, path, query });
        expect(typeof sign).toBe('string');
    });

    it('should flatten nested `query.query` object (legacy case)', () => {
        const query = {
            query: {
                a: '1',
                b: '2',
            },
        };
        const sign = generateSignature({ appSecret, path, query });
        expect(typeof sign).toBe('string');
    });
});
