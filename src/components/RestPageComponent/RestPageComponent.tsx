'use client';
import { HttpMethod, httpMethodsList } from 'constants/methodTypes';
import { ChangeEvent, useState } from 'react';

import styles from './RestPageComponent.module.scss';
import { useRouter } from 'next/navigation';
import { RestResponse } from 'types/RestResponse';
import { RestRequest } from 'types/RestRequest';
  params: { method: HttpMethod };
}) {
  const [url, setUrl] = useState('');
  const [methodType, setMethodType] = useState<HttpMethod>(method);
  const [response, setResponse] = useState<RestResponse | undefined>(undefined);

  const router = useRouter();

  const onMethodChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const methodType = e.target.value as HttpMethod;
    setMethodType(methodType);
    router.push(`/restful/${methodType}`.toLowerCase());
  };

  const onRootChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const onSubmit = async () => {
    const requestData: RestRequest = {
      method: methodType,
      url,
    };
    const rawResponse = await fetch('/api', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
    const response = (await rawResponse.json()) as RestResponse;
    setResponse(response);
  };

  return (
    <div className={styles.rest}>
      <div className={styles.rest__row}>
        <select
          className={styles.rest__method}
          onChange={onMethodChange}
          defaultValue={method}
        >
          {httpMethodsList.map((method) => (
            <option value={method} key={method}>
              {method}
            </option>
          ))}
        </select>
        <input
          type="text"
          className={styles.rest__url}
          name="requestUrl"
          value={url}
          onChange={onRootChange}
          placeholder="Enter URL or paste the text"
        />
        <button onClick={onSubmit} disabled={!url}>
          Send
        </button>
      </div>

      <textarea
        readOnly
        value={
          response && `Status: ${response.status}\n\n${response.body || ''}`
        }
      />
    </div>
  );
}
