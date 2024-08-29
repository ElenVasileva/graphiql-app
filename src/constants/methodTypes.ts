export enum HttpMethod {
  get = 'get',
  post = 'post',
  put = 'put',
  delete = 'delete',
  patch = 'patch',
  head = 'head',
  options = 'options',
}

export const httpMethodsList: HttpMethod[] = [
  HttpMethod.get,
  HttpMethod.post,
  HttpMethod.put,
  HttpMethod.delete,
  HttpMethod.patch,
  HttpMethod.options,
  HttpMethod.head,
];
