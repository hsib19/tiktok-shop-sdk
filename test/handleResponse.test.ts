import { handleResponse, TikTokAPIError } from '../src/utils/handleResponse';

describe('handleResponse', () => {
    it('should return response if code is 0', () => {
        const res = {
            code: 0,
            message: 'ok',
            request_id: '123',
            data: { foo: 'bar' },
        };
        const result = handleResponse(res);
        expect(result).toEqual(res);
    });

    it('should throw TikTokAPIError if code is not 0', () => {
        const res = {
            code: 10004,
            message: 'Invalid token',
            request_id: 'abc',
        };

        expect(() => handleResponse(res)).toThrowError(TikTokAPIError);
        try {
            handleResponse(res);
        } catch (err) {
            if (err instanceof TikTokAPIError) {
                expect(err.code).toBe(10004);
                expect(err.message).toBe('Invalid token');
                expect(err.request_id).toBe('abc');
            } else {
                throw err; // biar test gagal kalau ternyata bukan TikTokAPIError
            }
        }

    });
});
