import { expect, it, vi } from 'vitest';
import { POST } from './route';

const goodResult = {
  status: 200,
  json: () => {
    return {
      'name': 'Luke Skywalker',
      'height': '172',
      'mass': '77',
    };
  },
};

const badResult = {
  status: 500,
};

it('Router', async () => {
  global.fetch = vi.fn().mockResolvedValueOnce(goodResult);

  const badRequest: Request = new Request('http://test.com', {
    method: 'post',
    body: JSON.stringify({
      body: '',
      method: 'post',
      url: 'https://swapi.dev/api/people/1',
    }),
  });
  const response = await POST(badRequest);
  expect(response.status).toBe(200);
});

it('Router', async () => {
  global.fetch = vi.fn().mockResolvedValueOnce(badResult);

  const request: Request = new Request('http://test.com', {
    method: 'post',
    body: JSON.stringify({
      method: 'get',
      url: 'https://swapi.dev/api/people/1',
    }),
  });
  const response = await POST(request);
  expect(response.status).toBe(200);
});
