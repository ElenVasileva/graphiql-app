import { describe, expect, it, vi } from 'vitest';
import {
  exportedForTesting,
  restRequest2Url,
  url2RestRequest,
} from '@/utils/restUrlConverter';

const { includeVariablesInBody } = exportedForTesting;

describe('RestUrlConverter', () => {
  it('RestUrlConverter parses and creates paths correctly', async () => {
    const urls = [
      '/restful/get',
      '/restful/post',
      '/restful/put',
      '/restful/delete',
      '/restful/patch',

      '/restful/get/aHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS8x',
      '/restful/post/aHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS8x',

      '/restful/get/aHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS8xP3BhZ2U9Mg%3D%3D',

      '/restful/post/ZW1wdHk%3D/ew0KICAgICJxdWVyeSI6ICJxdWVyeSB7Y291bnRyeShjb2RlOiBcIlVTXCIpe25hbWV9fSIsDQogICAgInZhcmlhYmxlcyI6IHt9DQp9',
      '/restful/post/aHR0cHM6Ly9jb3VudHJpZXMudHJldm9yYmxhZGVzLmNvbS8%3D/ew0KICAgICJxdWVyeSI6ICJxdWVyeSB7Y291bnRyeShjb2RlOiBcIlVTXCIpe25hbWV9fSIsDQogICAgInZhcmlhYmxlcyI6IHt9DQp9',
    ];

    urls.forEach((url) => {
      const request = url2RestRequest(url);
      const newUrl = restRequest2Url(request).replace(/\/+$/, ''); // NOTE: removing trailing '/'
      expect(newUrl).toEqual(url);
    });

    const emptyRequest = url2RestRequest('restful');
    const urlForEmptyRequest = restRequest2Url(emptyRequest).replace(
      /\/+$/,
      '',
    );
    expect(urlForEmptyRequest).toEqual('/restful/get');
  });

  it('variables replace in body correctly', () => {
    const cases = [
      {
        body: `some text with page="{{page}}" and search="{{search}}"`,
        variables: { page: '12', search: 'ar', test: 'test' },
        result: `some text with page="12" and search="ar"`,
      },
      {
        body: `some text with page="{{page}}" and search="{{search}}" and one more page="{{page}}"`,
        variables: { page: '12', search: 'ar', test: 'test' },
        result: `some text with page="12" and search="ar" and one more page="12"`,
      },
      {
        body: ``,
        variables: { page: '12', search: 'ar', test: 'test' },
        result: ``,
      },
      {
        body: `"{{page}}""{{page}}""{{page}}""{{search}}""{{search}}"`,
        variables: { page: '12', search: 'ar', test: 'test' },
        result: `"12""12""12""ar""ar"`,
      },
      {
        body: undefined,
        variables: { page: '12', search: 'ar', test: 'test' },
        result: undefined,
      },
      {
        body: `"{{page}}""{{page}}""{{page}}""{{search}}""{{search}}"`,
        variables: undefined,
        result: `"{{page}}""{{page}}""{{page}}""{{search}}""{{search}}"`,
      },
    ];
    cases.forEach((caseItem) => {
      const result = includeVariablesInBody(caseItem.body, caseItem.variables);
      expect(result).toEqual(caseItem.result);
    });
  });
});
