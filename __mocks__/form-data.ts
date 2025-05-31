import { jest } from '@jest/globals';

class FormDataMock {
    append = jest.fn();
    getHeaders = jest.fn().mockReturnValue({ 'content-type': 'multipart/form-data; boundary=---mock-boundary' });
}

export default FormDataMock;
