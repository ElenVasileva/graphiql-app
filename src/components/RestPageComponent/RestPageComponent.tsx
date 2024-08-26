'use client';
import { HttpMethod, httpMethodsList } from 'constants/methodTypes';
import { ChangeEvent, useState } from 'react';

import styles from './RestPageComponent.module.scss';
import { useRouter } from 'next/navigation';
import { RestResponse } from 'types/RestResponse';
import { RestRequest } from 'types/RestRequest';
import KeyValueEditor from 'components/KeyValueEditor/KeyValueEditor';

enum RequestSection {
  QueryParams = 'Query parameters',
  Headers = 'Headers',
  Body = 'Body',
  Variables = 'Variables',
}

const sectionList: RequestSection[] = [
  RequestSection.QueryParams,
  RequestSection.Headers,
  RequestSection.Body,
  RequestSection.Variables,
];

export default function RestPageComponent({
  params: { method },
}: {
  params: { method: HttpMethod };
}) {
  const [url, setUrl] = useState('');
  const [methodType, setMethodType] = useState<HttpMethod>(method);
  const [response, setResponse] = useState<RestResponse | undefined>(undefined);

  const [queryParams, setQueryParams] = useState<Record<string, string>>({});
  const [headers, setHeaders] = useState<Record<string, string>>({});
  const [body, setBody] = useState<string>('');
  const [variables, setVariables] = useState<Record<string, string>>({});

  const [section, setSection] = useState<RequestSection>(
    RequestSection.QueryParams,
  );

  const router = useRouter();

  const onMethodChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const methodType = e.target.value as HttpMethod;
    setMethodType(methodType);
    router.push(`/restful/${methodType}`.toLowerCase());
  };

  const onRootChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const onSectionClick = (sec: RequestSection) => {
    setSection(sec);
  };

  const onQueryParamsChanged = (queryParams: Record<string, string>) => {
    setVariables(queryParams);
  };

  const onHeadersChanged = (headers: Record<string, string>) => {
    setVariables(headers);
  };

  const onBodyChanged = (body: string) => {
    setBody(body);
  };

  const onVariablesChanged = (variables: Record<string, string>) => {
    setVariables(variables);
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
      <div className={styles.rest__sectionSelector}>
        {sectionList.map((sec) => (
          <div key={sec}>
            <button
              className={section === sec ? styles.active : ''}
              onClick={() => onSectionClick(sec)}
            >
              {sec.toString()}
            </button>
          </div>
        ))}
      </div>
      {section === RequestSection.QueryParams && (
        <KeyValueEditor
          defaultValues={queryParams}
          onChange={onQueryParamsChanged}
        />
      )}
      {section === RequestSection.Headers && (
        <KeyValueEditor defaultValues={headers} onChange={onHeadersChanged} />
      )}
      {section === RequestSection.Body && (
        <textarea
          value={body}
          onChange={(e) => onBodyChanged(e.target.value)}
        />
      )}
      {section === RequestSection.Variables && (
        <KeyValueEditor
          defaultValues={variables}
          onChange={onVariablesChanged}
        />
      )}

      <textarea
        readOnly
        value={
          response && `Status: ${response.status}\n\n${response.body || ''}`
        }
      />
    </div>
  );
}
