import bytesToBase64 from './stringToBase64';

interface IGenerateUrlGraphQlParams {
  endpoint: string;
  body: string;
  headers: { [key: string]: string };
}

export default function generateUrlGraphQl(params: IGenerateUrlGraphQlParams) {
  let headers = '';
  for (const key in params.headers) {
    headers += `${encodeURIComponent(key)}=${encodeURIComponent(params.headers[key])}&`;
  }
  return `/${encodeURIComponent(bytesToBase64(params.endpoint))}/${encodeURIComponent(bytesToBase64(params.body))}/?${headers.slice(0, -1)}`;
}
