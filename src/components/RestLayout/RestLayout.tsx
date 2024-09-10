'use client';
import RestQueryComponent from './RestQueryComponent/RestQueryComponent';
import styles from './RestLayout.module.scss';
import PageHeader from '@/components/PageHeader/PageHeader';
import RestResponseComponent from './RestResponseComponent/RestResponseComponent';
import { useSearchParams, usePathname } from 'next/navigation';
import { useState } from 'react';
import { RestResponse } from 'types/RestResponse';
import { url2RestRequest } from '@/utils/restUrlConverter';

const RestLayout = () => {
  const path = usePathname();
  const headers = Object.fromEntries(useSearchParams().entries());
  const [response, setResponse] = useState<RestResponse | undefined>(undefined);

  const onSubmit = async () => {
    const requestFromUrl = url2RestRequest(path, true);
    requestFromUrl.headers = headers;

    const rawResponse = await fetch(`/api`, {
      method: 'POST',
      body: JSON.stringify(requestFromUrl),
    });
    const json = (await rawResponse.json()) as RestResponse;
    setResponse(json);
  };
  return (
    <div className={styles.restLayout}>
      <PageHeader>REST client</PageHeader>
      <div className={styles.restLayout__container}>
        <div className={styles.restLayout__item}>
          <RestQueryComponent onSubmit={onSubmit} />
        </div>
        <div className={styles.restLayout__item}>
          <RestResponseComponent response={response} />
        </div>
      </div>
    </div>
  );
};

export default RestLayout;
