import { HttpMethod } from 'constants/methodTypes';
import { RestRequest } from 'types/RestRequest';
import { RestResponse } from 'types/RestResponse';

const callFetch = async (request: RestRequest): Promise<RestResponse> => {
  const url = request.url;
  const init: RequestInit = {
    method: request.method,
    headers: request.headers,
  };
  const methods = [HttpMethod.post, HttpMethod.put, HttpMethod.patch];
  if (methods.includes(request.method)) {
    init.body = request.body;
  }
  const response = await fetch(url, init);
  if (response.status === 200) {
    const json = await response.json();
    return { status: 200, body: JSON.stringify(json) };
  } else return { status: response.status };
};

export async function POST(req: Request) {
  const request = await req.json();
  const response = await callFetch(request);
  return Response.json(response);
}
