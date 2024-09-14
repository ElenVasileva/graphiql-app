import { describe, it, expect, vi } from 'vitest';
import fetchGraphQL from './fetchGraphQL';

describe('fetchGraphQL', () => {
  const mockEndpoint = 'https://example.com/graphql';
  const mockQuery = `
    query GetItems {
      items {
        id
        name
      }
    }
  `;
  const mockVariables = { someVariable: 'value' };
  const mockHeaders = { 'Content-Type': 'application/json' };

  it('should return data on successful fetch', async () => {
    const mockResponse = { data: { items: [{ id: 1, name: 'Item 1' }] } };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        text: () => Promise.resolve(JSON.stringify(mockResponse)),
      } as Response),
    );

    const result = await fetchGraphQL(
      mockEndpoint,
      mockQuery,
      mockVariables,
      mockHeaders,
    );
    expect(result.data).toEqual(JSON.stringify(mockResponse));
    expect(result.statusCode).toBe(200);
    expect(result.error).toBeNull();
  });

  it('should return error when endpoint is invalid', async () => {
    const result = await fetchGraphQL(
      '',
      mockQuery,
      mockVariables,
      mockHeaders,
    );

    expect(result.error).toBe('Invalid endpoint specified');
    expect(result.statusCode).toBeNull();
    expect(result.data).toBeNull();
  });

  it('should return error on failed fetch', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 400,
        text: () => Promise.resolve('Bad Request'),
      } as Response),
    );

    const result = await fetchGraphQL(
      mockEndpoint,
      mockQuery,
      mockVariables,
      mockHeaders,
    );

    expect(result.error).toBe('Bad Request');
    expect(result.statusCode).toBe(400);
    expect(result.data).toBeNull();
  });

  it('should return error when fetch throws an exception', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('Network Error')));

    const result = await fetchGraphQL(
      mockEndpoint,
      mockQuery,
      mockVariables,
      mockHeaders,
    );

    expect(result.error).toBe('Network Error');
    expect(result.statusCode).toBeNull();
    expect(result.data).toBeNull();
  });
});
