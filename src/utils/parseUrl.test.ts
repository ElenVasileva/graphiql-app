import { vi, describe, it, expect } from 'vitest';
import base64ToString from './base64ToString';
import parseUrl from './parseUrl';

describe('parseUrl', () => {
  it('should correctly parse URL and searchParams', () => {
    const url =
      '/GRAPHQL/dGVzdC1lbmRwb2ludA%3D%3D/eyJxdWVyeSI6ImFsbCIsInZhcmlhYmxlcyI6eyJ2YXJpYWJsZSI6InZhcmlhYmxlMSJ9fQ%3D%3D';
    const searchParams = new URLSearchParams({
      header1: 'value1',
      header2: 'value2',
    });

    const expected = {
      type: 'GRAPHQL',
      endpoint: 'test-endpoint',
      query: 'all',
      variables: { variable: 'variable1' },
      headers: {
        header1: 'value1',
        header2: 'value2',
      },
    };

    const result = parseUrl(url, searchParams);

    expect(result).toEqual(expected);
  });

  it('should return default values when endpointBase64 is missing', () => {
    const url = '/GRAPHQL//';
    const searchParams = new URLSearchParams();

    const expected = {
      type: 'GRAPHQL',
      endpoint: '',
      query: '',
      variables: {},
      headers: {},
    };

    const result = parseUrl(url, searchParams);

    expect(result).toEqual(expected);
  });
});
