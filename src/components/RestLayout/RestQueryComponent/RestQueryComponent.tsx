'use client';

import { httpMethodsList } from '@/constants/methodTypes';
import { useEffect, useState } from 'react';
import styles from './RestQueryComponent.module.scss';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/Input';
import { RestRequest } from '@/types/RestRequest';
import { restRequest2Url, url2RestRequest } from '@/utils/restUrlConverter';
import { Button } from '@/components/Button';
import { usePathname, useRouter } from '@/i18n/routing';

import React from 'react';
import RestTabComponent from '@/components/RestLayout/RestQueryComponent/RestTabComponent/RestTabComponent';

const RestQueryComponent = ({ onSubmit }: { onSubmit: () => void }) => {
  const path = usePathname();
  const requestFromUrl = url2RestRequest(path);

  requestFromUrl.headers = Object.fromEntries(useSearchParams().entries());

  const [restRequest, setRestRequest] = useState<RestRequest>(requestFromUrl);

  const router = useRouter();
  useEffect(() => {
    router.push(restRequest2Url(restRequest));
  }, [restRequest, router]);

  const onValueChange = (newValue: object) => {
    setRestRequest({ ...restRequest, ...newValue });
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
      <RestTabComponent
        queryParams={restRequest.queryParams}
        headers={restRequest.headers}
        body={restRequest.body || ''}
        variables={restRequest.variables}
        onChange={onValueChange}
      />
    </div>
  );
};

export default RestQueryComponent;
