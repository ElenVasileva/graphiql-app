import base64ToString from './base64ToString';

function convertQueryStringToObject(
  searchParams: URLSearchParams,
): Record<string, string> {
  return Array.from(new Set(searchParams.keys())).reduce(
    (accumulator, key) => ({
      ...accumulator,
      [key]: searchParams.get(key) ?? '',
    }),
    {},
  );
}

export default function parseUrl(
  url: string,
  searchParams: URLSearchParams,
): {
  type: string;
  endpoint: string;
  query: string;
  variables: Record<string, string>;
  headers: Record<string, string>;
} {
  const str = decodeURIComponent(url);
  const [, type, endpointBase64, bodyBase64] = str.split('/');

  if (!endpointBase64)
    return { type, endpoint: '', query: '', variables: {}, headers: {} };

  const endpoint = base64ToString(endpointBase64);
  const { query, variables } = JSON.parse(base64ToString(bodyBase64));
  const headers = convertQueryStringToObject(searchParams);

  return { type, endpoint, query, variables, headers };
}
