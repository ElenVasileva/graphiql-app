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

import RestTabComponent from '@/components/RestLayout/RestQueryComponent/RestTabComponent/RestTabComponent';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RestRequestToStore } from '@/types/RestRequestToStore';
import { addRequest } from '@/store/features/requestListSlice';
import { setRequest } from '@/store/features/clickedRestSlice';

const RestQueryComponent = ({ onSubmit }: { onSubmit: () => void }) => {
  const path = usePathname();
  const requestFromUrl = url2RestRequest(path);
  requestFromUrl.headers = Object.fromEntries(useSearchParams().entries());

  const dispatch = useAppDispatch();

  const restRequestId = useAppSelector((state) => state.clickedRestId.value);
  const user = useAppSelector((state) => state.currentUser.value);
  const restRequests = useAppSelector((state) => state.restRequests.value);
  if (restRequestId && user && restRequests) {
    const requestInfo = restRequests.find(
      (r) => r.user == user && r.date === restRequestId,
    );
    requestFromUrl.body = requestInfo?.body;
    requestFromUrl.variables = requestInfo?.variables;
    dispatch(setRequest(undefined));
  }

  const [restRequest, setRestRequest] = useState<RestRequest>(requestFromUrl);

  const router = useRouter();
  useEffect(() => {
    router.push(restRequest2Url(restRequest));
  }, [restRequest, router]);

  const onValueChange = (newValue: object) => {
    setRestRequest({ ...restRequest, ...newValue });
  };

  const onSubmitClick = () => {
    const newRequest: RestRequestToStore = {
      ...restRequest,
      date: Date.now(),
      user: user || 'noname',
    };
    dispatch(addRequest(newRequest));
    onSubmit();
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
        <Button onClick={onSubmitClick}>Send</Button>
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
