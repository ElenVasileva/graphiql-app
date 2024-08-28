'use server';
import { callFetch } from 'app/api/route';
import { HttpMethod } from 'constants/methodTypes';
import { RestRequest } from 'types/RestRequest';

import styles from './ResponseComponent.module.scss';
import { RestResponse } from 'types/RestResponse';

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
