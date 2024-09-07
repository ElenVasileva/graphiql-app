import { HttpMethod } from 'constants/methodTypes';

interface RestRequest {
  method: HttpMethod;
  url: string;
  body?: string;
  queryParams?: Record<string, string>;
  headers?: Record<string, string>;
  variables?: Record<string, string>;
}
export type { RestRequest };
