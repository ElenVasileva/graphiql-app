import { HttpMethod } from 'constants/methodTypes';

interface RestRequest {
  method: HttpMethod;
  url: string;
  body?: string;
  parameters?: Record<string, string>;
  headers?: Record<string, string>;
}
export type { RestRequest };
