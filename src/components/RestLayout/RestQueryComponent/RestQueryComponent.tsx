'use client';

import { httpMethodsList } from '@/constants/methodTypes';
import { useEffect, useState } from 'react';
import styles from './RestQueryComponent.module.scss';
import { usePathname, useRouter } from 'next/navigation';
import KeyValueEditor from '@/components/KeyValueEditor/KeyValueEditor';
import { Input } from '@/components/Input';
import { RestRequest } from '@/types/RestRequest';
import { restRequest2Url, url2RestRequest } from '@/utils/restUrlConverter';
import { Button } from '@/components/Button';

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
  }, [restRequest, router]);

  const onValueChange = (newValue: object) => {
    setRestRequest({ ...restRequest, ...newValue });
  };

  const onSectionClick = (sec: TabSection) => {
    setSection(sec);
  };

  return (
    <div className={styles.rest}>
      <div className={styles.rest__row}>
        <select
          className={styles.rest__method}
          onChange={(e) => onValueChange({ method: e.target.value })}
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
          onChange={(e) => onValueChange({ url: e.target.value })}
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
            onChange={(queryParams) => onValueChange({ queryParams })}
          />
        )}
        {section === TabSection.Headers && (
          <KeyValueEditor
            defaultValues={restRequest.headers}
            onChange={(headers) => onValueChange({ headers })}
          />
        )}
        {section === TabSection.Body && (
          <textarea
            value={restRequest.body}
            onChange={(e) => onValueChange({ body: e.target.value })}
          />
        )}
        {section === TabSection.Variables && (
          <KeyValueEditor
            defaultValues={restRequest.variables}
            onChange={(variables) => onValueChange({ variables })}
          />
        )}
      </div>
    </div>
  );
};

export default RestQueryComponent;
