'use server';
import { HttpMethod } from 'constants/methodTypes';
import { RestRequest } from 'types/RestRequest';

import styles from './ResponseComponent.module.scss';
import { RestResponse } from 'types/RestResponse';

const callFetch = async (
  request: RestRequest,
): Promise<RestResponse> => {
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

function b64DecodeUnicode(str: string) {
  return atob(decodeURIComponent(str));
}

const ResponseComponent = async ({
  method,
  url,
  encodedBody,
}: {
  method: HttpMethod;
  url?: string;
  encodedBody?: string;
}) => {
  let response: RestResponse = {
    status: 0,
  };
  if (method && url) {
    response = await callFetch({
      method,
      url: b64DecodeUnicode(url),
      body: b64DecodeUnicode(encodedBody || ''),
    });
  }
  return (
    <div className={styles.response}>
      <textarea
        readOnly
        value={
          response && `Status: ${response.status}\n\n${response.body || ''}`
        }
      />
    </div>
  );
};

export default ResponseComponent;
