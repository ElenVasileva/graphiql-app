'use client';
import { HttpMethod, httpMethodsList } from 'constants/methodTypes';
import { ChangeEvent, useEffect, useState } from 'react';
import styles from './RestQueryComponent.module.scss';
import { usePathname, useRouter } from 'next/navigation';
import KeyValueEditor from 'components/KeyValueEditor/KeyValueEditor';
import { Input } from 'components/Input';
import { RestRequest } from 'types/RestRequest';
import { restRequest2Url, url2RestRequest } from 'utils/restUrlConverter';
import { Button } from 'components/Button';

enum TabSection {
  QueryParams = 'Query parameters',
  Headers = 'Headers',
  Body = 'Body',
  Variables = 'Variables',
}

const sectionList: TabSection[] = [
  TabSection.QueryParams,
  TabSection.Headers,
  TabSection.Body,
  TabSection.Variables,
];

const RestQueryComponent = ({ onSubmit }: { onSubmit: () => void }) => {
  const path = usePathname();
  const requestFromUrl = url2RestRequest(path);

  const [restRequest, setRestRequest] = useState<RestRequest>(requestFromUrl);

  const [section, setSection] = useState<TabSection>(TabSection.QueryParams);

  const router = useRouter();
  useEffect(() => {
    router.push(restRequest2Url(restRequest));
  }, [restRequest]);

  const onMethodChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRestRequest({ ...restRequest, method: e.target.value as HttpMethod });
  };

  const onUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRestRequest({ ...restRequest, url: e.target.value });
  };

  const onSectionClick = (sec: TabSection) => {
    setSection(sec);
  };

  const onQueryParamsChanged = (queryParams: Record<string, string>) => {
    setRestRequest({ ...restRequest, queryParams });
  };

  const onHeadersChanged = (headers: Record<string, string>) => {
    setRestRequest({ ...restRequest, headers });
  };

  const onBodyChanged = (body: string) => {
    setRestRequest({ ...restRequest, body });
  };

  const onVariablesChanged = (variables: Record<string, string>) => {
    setRestRequest({ ...restRequest, variables });
  };

  return (
    <div className={styles.rest}>
      <div className={styles.rest__row}>
        <select
          className={styles.rest__method}
          onChange={onMethodChange}
          defaultValue={restRequest.method}
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
          defaultValue={restRequest.url}
          onChange={onUrlChange}
          placeholder="Enter URL or paste the text"
        />
        <Button onClick={onSubmit}>Send</Button>
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
        {section === TabSection.QueryParams && (
          <KeyValueEditor
            defaultValues={restRequest.queryParams}
            onChange={onQueryParamsChanged}
          />
        )}
        {section === TabSection.Headers && (
          <KeyValueEditor
            defaultValues={restRequest.headers}
            onChange={onHeadersChanged}
          />
        )}
        {section === TabSection.Body && (
          <textarea
            value={restRequest.body}
            onChange={(e) => onBodyChanged(e.target.value)}
          />
        )}
        {section === TabSection.Variables && (
          <KeyValueEditor
            defaultValues={restRequest.variables}
            onChange={onVariablesChanged}
          />
        )}
      </div>
    </div>
  );
};

export default RestQueryComponent;
