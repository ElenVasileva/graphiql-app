/* eslint-disable max-lines-per-function*/

'use client';

import { HttpMethod, httpMethodsList } from 'constants/methodTypes';
import { ChangeEvent, useState } from 'react';

import styles from './RestQueryComponent.module.scss';
import { usePathname, useRouter } from 'next/navigation';
import KeyValueEditor from 'components/KeyValueEditor/KeyValueEditor';
import { Input } from 'components/Input';
import { Button } from 'components/Button';

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

const b64EncodeUnicode = (str: string) => {
  return encodeURIComponent(btoa(str));
};

const b64DecodeUnicode = (str: string) => {
  return atob(decodeURIComponent(str));
};

const getRequestDataFromUrl = (originUrl: string) => {
  const pathNames = originUrl.split('/');
  const method = (pathNames[2] as HttpMethod) || HttpMethod.get;
  const urlAndQueryParam = b64DecodeUnicode(pathNames[3] || '');
  const [url] = urlAndQueryParam.split('?');

  const urlSearchParams = new URLSearchParams(
    urlAndQueryParam.split('?')[1] || '',
  );
  const queryParams = Object.fromEntries(urlSearchParams.entries());

  const body = b64DecodeUnicode(pathNames[4] || '');

  return { method, url, queryParams, body };
};

const RestQueryComponent = () => {
  const pathName = usePathname();
  const requestData = getRequestDataFromUrl(pathName);

  const [url, setUrl] = useState(requestData.url);
  const [methodType, setMethodType] = useState<HttpMethod>(requestData.method);
  const [queryParams, setQueryParams] = useState<Record<string, string>>(
    requestData.queryParams,
  );

  const [headers, setHeaders] = useState<Record<string, string>>({});
  const [body, setBody] = useState<string>(requestData.body);
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [section, setSection] = useState<RequestSection>(
    RequestSection.QueryParams,
  );

  const router = useRouter();

  const onMethodChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const methodType = e.target.value as HttpMethod;
    setMethodType(methodType);
  };

  const onUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const onSectionClick = (sec: RequestSection) => {
    setSection(sec);
  };

  const onQueryParamsChanged = (queryParams: Record<string, string>) => {
    setQueryParams(queryParams);
  };

  const onHeadersChanged = (headers: Record<string, string>) => {
    setHeaders(headers);
  };

  const onBodyChanged = (body: string) => {
    setBody(body);
  };

  const onVariablesChanged = (variables: Record<string, string>) => {
    setVariables(variables);
  };

  const onSubmit = () => {
    const urlSearchParams = new URLSearchParams();
    for (const key in queryParams) {
      urlSearchParams.append(key, queryParams[key]);
    }

    const queryParamString = urlSearchParams
      ? '?' + urlSearchParams.toString()
      : '';
    router.push(
      `/restful/${methodType}/${b64EncodeUnicode(url + queryParamString)}/${b64EncodeUnicode(body)}`,
    );
  };

  return (
    <div className={styles.rest}>
      <div className={styles.rest__row}>
        <select
          className={styles.rest__method}
          onChange={onMethodChange}
          defaultValue={methodType}
        >
          {httpMethodsList.map((method) => (
            <option value={method} key={method}>
              {method.toUpperCase()}
            </option>
          ))}
        </select>
        <Input
          type="text"
          className={styles.rest__url}
          name="requestUrl"
          defaultValue={url}
          onChange={onUrlChange}
          placeholder="Enter URL or paste the text"
        />
        <Button onClick={onSubmit} disabled={!url}>
          Send
        </Button>
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
      <div className={styles.rest__tabContainer}>
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
      </div>
    </div>
  );
};

export default RestQueryComponent;
