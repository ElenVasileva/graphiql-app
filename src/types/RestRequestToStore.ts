export interface RestRequestToStore {
  user: string;
  date: number;
  method: string;
  url: string;
  body?: string;
  queryParams?: Record<string, string>;
  headers?: Record<string, string>;
  variables?: Record<string, string>;
}
