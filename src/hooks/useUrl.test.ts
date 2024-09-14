import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, test, expect, beforeEach } from 'vitest';

import { renderHook } from '@testing-library/react';
import {
  usePathname,
  useSearchParams,
  ReadonlyURLSearchParams,
} from 'next/navigation';
import useUrl from 'hooks/useUrl';
import parseUrl from 'utils/parseUrl';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
}));

vi.mock('utils/parseUrl', () => ({
  default: vi.fn(),
}));

describe('useUrl hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('initializes parameters correctly on the first render', () => {
    const mockPathname = '/some-path';
    const mockSearchParams = {
      get: (key: string) => (key === 'query' ? 'someQuery' : null),
      toString: () => 'query=someQuery',
    } as unknown as ReadonlyURLSearchParams;
    const mockParsedUrl = {
      type: 'GET',
      endpoint: 'some-endpoint',
      query: 'someQuery',
      variables: {},
      headers: {},
    };

    vi.mocked(usePathname).mockReturnValue(mockPathname);
    vi.mocked(useSearchParams).mockReturnValue(mockSearchParams);
    vi.mocked(parseUrl).mockReturnValue(mockParsedUrl);

    const { result } = renderHook(() => useUrl());

    expect(parseUrl).toHaveBeenCalledWith(mockPathname, mockSearchParams);
    expect(result.current).toEqual(mockParsedUrl);
  });

  test('updates parameters when pathname or searchParams change', () => {
    const initialPathname = '/initial-path';
    const initialSearchParams = {
      get: (key: string) => (key === 'query' ? 'initialQuery' : null),
      toString: () => 'query=initialQuery',
    } as unknown as ReadonlyURLSearchParams;
    const updatedPathname = '/updated-path';
    const updatedSearchParams = {
      get: (key: string) => (key === 'query' ? 'updatedQuery' : null),
      toString: () => 'query=updatedQuery',
    } as unknown as ReadonlyURLSearchParams;
    const initialParsedUrl = {
      type: 'GET',
      endpoint: 'initial-endpoint',
      query: 'initialQuery',
      variables: {},
      headers: {},
    };
    const updatedParsedUrl = {
      type: 'GET',
      endpoint: 'updated-endpoint',
      query: 'updatedQuery',
      variables: {},
      headers: {},
    };

    vi.mocked(usePathname).mockReturnValue(initialPathname);
    vi.mocked(useSearchParams).mockReturnValue(initialSearchParams);
    vi.mocked(parseUrl).mockReturnValue(initialParsedUrl);

    const { result, rerender } = renderHook(() => useUrl());

    expect(result.current).toEqual(initialParsedUrl);

    vi.mocked(usePathname).mockReturnValue(updatedPathname);
    vi.mocked(useSearchParams).mockReturnValue(updatedSearchParams);
    vi.mocked(parseUrl).mockReturnValue(updatedParsedUrl);

    rerender();

    expect(parseUrl).toHaveBeenCalledWith(updatedPathname, updatedSearchParams);
    expect(result.current).toEqual(updatedParsedUrl);
  });
});
