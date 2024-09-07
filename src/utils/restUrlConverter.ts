import { HttpMethod } from '@/constants/methodTypes';
import { RestRequest } from '@/types/RestRequest';

const b64EncodeUnicode = (str: string | undefined) => {
  if (str) {
    return encodeURIComponent(btoa(str));
  }
  return '';
};

const b64DecodeUnicode = (str: string) => {
  if (str) {
    return atob(decodeURIComponent(str));
  }
  return '';
};

export const restRequest2Url = (request: RestRequest): string => {
  const { method, url, queryParams, body } = request;

  const urlSearchParams = new URLSearchParams();
  for (const key in queryParams) {
    urlSearchParams.append(key, queryParams[key]);
  }

  const queryParamString = urlSearchParams.size
    ? '?' + urlSearchParams.toString()
    : '';

  return `/restful/${method}/${b64EncodeUnicode(url + queryParamString)}/${b64EncodeUnicode(body)}`;
};

export const url2RestRequest = (
  originUrl: string,
  extractQueryParams?: boolean,
): RestRequest => {
  const pathNames = originUrl.split('/');
  const method = (pathNames[2] as HttpMethod) || HttpMethod.get;
  const urlAndQueryParam = b64DecodeUnicode(pathNames[3] || '');
  const [url] = urlAndQueryParam.split('?');

  const urlSearchParams = new URLSearchParams(
    urlAndQueryParam.split('?')[1] || '',
  );
  const queryParams = Object.fromEntries(urlSearchParams.entries());

  const body = b64DecodeUnicode(pathNames[4]);
  if (extractQueryParams) {
    return { method, url: urlAndQueryParam, body };
  }

  return { method, url, queryParams, body };
};
