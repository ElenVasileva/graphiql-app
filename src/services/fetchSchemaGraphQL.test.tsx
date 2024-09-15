import { describe, it, expect, vi } from 'vitest';
import fetchSchemaGraphQL from 'services/fetchSchemaGraphQL';
import { getIntrospectionQuery } from 'graphql';

describe('fetchGraphQL', () => {
  const endpoint = 'https://example.com/graphql';

  it('should return data and status code when response is successful', async () => {
    const mockResponse = {
      status: 200,
      ok: true,
      text: async () => '{"data":"mockData"}',
    };

    global.fetch = vi.fn().mockResolvedValueOnce(mockResponse);

    const result = await fetchSchemaGraphQL(endpoint);

    expect(fetch).toHaveBeenCalledWith(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: getIntrospectionQuery() }),
    });
    expect(result).toEqual({
      data: '{"data":"mockData"}',
      statusCode: 200,
      error: null,
    });
  });

  it('should return an error and status code when response is unsuccessful', async () => {
    const mockErrorResponse = {
      status: 400,
      ok: false,
      text: async () => '{"errors":[{"message":"Bad Request"}]}',
    };

    global.fetch = vi.fn().mockResolvedValueOnce(mockErrorResponse);

    const result = await fetchSchemaGraphQL(endpoint);

    expect(fetch).toHaveBeenCalledWith(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: getIntrospectionQuery() }),
    });
    expect(result).toEqual({
      data: null,
      statusCode: 400,
      error: '{"errors":[{"message":"Bad Request"}]}',
    });
  });

  it('should return a default error message for non-Error objects', async () => {
    global.fetch = vi.fn().mockRejectedValueOnce('Unknown error');

    const result = await fetchSchemaGraphQL(endpoint);

    expect(result).toEqual({
      data: null,
      statusCode: null,
      error: '{"errors":[{"message":"Something went wrong."}]}',
    });
  });

  it('should handle HTML response by returning an empty error message', async () => {
    const mockHtmlErrorResponse = {
      status: 500,
      ok: false,
      text: async () => '<!DOCTYPE html><html>Error Page</html>',
    };
    global.fetch = vi.fn().mockResolvedValueOnce(mockHtmlErrorResponse);

    const result = await fetchSchemaGraphQL(endpoint);

    expect(result).toEqual({
      data: null,
      statusCode: 500,
      error: '',
    });
  });
});
