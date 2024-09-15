import { describe, it, expect, vi } from 'vitest';
import generateUrlGraphQl from './generateUrlGraphQl';

vi.mock('./stringToBase64', () => ({
  __esModule: true,
  default: (input: string) => `base64-${input}`,
}));

describe('generateUrlGraphQl', () => {
  it('should generate the correct URL', () => {
    const params = {
      endpoint: 'some/endpoint',
      body: 'request/body',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token',
      },
    };
    const result = generateUrlGraphQl(params);
    expect(result).toBe(
      '/base64-some%2Fendpoint/base64-request%2Fbody/?Content-Type=application%2Fjson&Authorization=Bearer%20token',
    );
  });

  it('should handle special characters in headers', () => {
    const params = {
      endpoint: 'special/char',
      body: 'value/with?special&chars',
      headers: {
        'X-Custom-Header': 'value/with?chars',
      },
    };
    const result = generateUrlGraphQl(params);
    expect(result).toBe(
      '/base64-special%2Fchar/base64-value%2Fwith%3Fspecial%26chars/?X-Custom-Header=value%2Fwith%3Fchars',
    );
  });

  it('should handle empty headers', () => {
    const params = {
      endpoint: 'empty/endpoint',
      body: 'empty/body',
      headers: {},
    };
    const result = generateUrlGraphQl(params);
    expect(result).toBe('/base64-empty%2Fendpoint/base64-empty%2Fbody');
  });

  it('should handle empty body', () => {
    const params = {
      endpoint: 'some/endpoint',
      body: '',
      headers: {
        'Accept': 'application/json',
      },
    };
    const result = generateUrlGraphQl(params);
    expect(result).toBe(
      '/base64-some%2Fendpoint/base64-/?Accept=application%2Fjson',
    );
  });

  it('should handle empty endpoint', () => {
    const params = {
      endpoint: '',
      body: 'some/body',
      headers: {
        'Authorization': 'Bearer token',
      },
    };
    const result = generateUrlGraphQl(params);
    expect(result).toBe('');
  });
});
