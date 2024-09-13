import { describe, expect, it, vi } from 'vitest';
import { restRequest2Url, url2RestRequest } from '@/utils/restUrlConverter';

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
});
