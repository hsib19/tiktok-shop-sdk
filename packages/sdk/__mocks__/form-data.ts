import { jest } from '@jest/globals';

class FormDataMock {
  append: jest.Mock = jest.fn();
  getHeaders: jest.Mock = jest.fn().mockReturnValue({
    'content-type': 'multipart/form-data; boundary=---mock-boundary',
  });
}

export default FormDataMock;
