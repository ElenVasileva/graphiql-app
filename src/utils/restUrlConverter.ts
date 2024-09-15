import { HttpMethod } from '@/constants/methodTypes';
import { RestRequest } from '@/types/RestRequest';

const EMPTY_URL = 'empty';

const b64EncodeUnicode = (str: string | undefined) => {
  return str ? encodeURIComponent(btoa(str)) : '';
};

const b64DecodeUnicode = (str: string) => {
  return str ? atob(decodeURIComponent(str)) : '';
};

const record2QueryParams = (
  records: Record<string, string> | undefined,
): string => {
  const urlSearchParams = new URLSearchParams();
  for (const key in records) {
    urlSearchParams.append(key, records[key]);
  }

  return urlSearchParams.size ? '?' + urlSearchParams.toString() : '';
};

const includeVariablesInBody = (
  body: string | undefined,
  variables: Record<string, string> | undefined,
) => {
  if (!variables || !body) return body;
  for (const key in variables) {
    body = body.replaceAll(`"{{${key}}}"`, `"${variables[key]}"`);
  }
  return body;
};

const queryParams2Record = (queryParams: string): Record<string, string> => {
  const urlSearchParams = new URLSearchParams(queryParams);
  return Object.fromEntries(urlSearchParams.entries());
};

export const restRequest2Url = (request: RestRequest): string => {
  const { method, url, queryParams, body, headers, variables } = request;
  const bodyWithIncludedVariables = includeVariablesInBody(body, variables);
  const nonEmptyUrl = body && !url ? EMPTY_URL : url;
  const queryParamString = record2QueryParams(queryParams);
  const headersQueryParamsString = record2QueryParams(headers);

  return `/restful/${method}/${b64EncodeUnicode(nonEmptyUrl + queryParamString)}/${b64EncodeUnicode(bodyWithIncludedVariables)}${headersQueryParamsString}`;
};

export const url2RestRequest = (
  originUrl: string,
  extractQueryParams?: boolean,
): RestRequest => {
  const pathNames = originUrl.split('/');
  const method = (pathNames[2] as HttpMethod) || HttpMethod.get;
  const urlAndQueryParam = b64DecodeUnicode(pathNames[3] || '');
  const [url] = urlAndQueryParam.split('?');
  const possibleEmptyUrl = url.startsWith(EMPTY_URL)
    ? url.replace(EMPTY_URL, '')
    : url;
  const queryParams = queryParams2Record(urlAndQueryParam.split('?')[1] || '');

  const body = b64DecodeUnicode(pathNames[4]);
  if (extractQueryParams) {
    return { method, url: urlAndQueryParam, body };
  }

  return { method, url: possibleEmptyUrl, queryParams, body };
};

export const exportedForTesting = {
  includeVariablesInBody,
};
