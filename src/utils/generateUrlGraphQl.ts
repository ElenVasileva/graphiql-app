import bytesToBase64 from './stringToBase64';

interface IGenerateUrlGraphQlParams {
  endpoint: string;
  body: string;
  headers: { [key: string]: string };
}

export default function generateUrlGraphQl(params: IGenerateUrlGraphQlParams) {
  const { endpoint, body, headers } = params;

  if (!endpoint) {
    return '';
  }

  const endpointStr = encodeURIComponent(bytesToBase64(endpoint));
  const bodyStr = encodeURIComponent(bytesToBase64(body));
  let headersStr = '';
  for (const key in params.headers) {
    headersStr += `${encodeURIComponent(key)}=${encodeURIComponent(headers[key])}&`;
  }

  if (headersStr) {
    return `/${endpointStr}/${bodyStr}/?${headersStr.slice(0, -1)}`;
  }
  return `/${endpointStr}/${bodyStr}`;
}
