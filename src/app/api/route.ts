import { HttpMethod } from 'constants/methodTypes';
import { RestRequest } from 'types/RestRequest';
import { RestResponse } from 'types/RestResponse';

const callFetch = async (request: RestRequest): Promise<RestResponse> => {
  return new Promise((resolve) => {
    const { url, method, headers } = request;
    const init: RequestInit = { method, headers };
    const methods = [HttpMethod.post, HttpMethod.put, HttpMethod.patch];
    if (methods.includes(request.method)) {
      init.body = request.body;
    }
    fetch(url, init)
      .then(async (response) => {
        if (response.status === 200) {
          const json = await response.json();
          const restResponse: RestResponse = {
            status: 200,
            body: JSON.stringify(json),
          };
          resolve(restResponse);
        } else {
          resolve({ status: response.status });
        }
      })
      .catch(() => {
        resolve({ status: 500 });
      });
  });
};

export async function POST(req: Request) {
  const request = await req.json();
  const response = await callFetch(request);
  return Response.json(response);
}
