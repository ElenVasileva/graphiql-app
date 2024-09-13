'use client';

import moment from 'moment';
import styles from './RestCard.module.scss';
import { useRouter } from 'next/navigation';
import { restRequest2Url } from '@/utils/restUrlConverter';
import { HttpMethod } from '@/constants/methodTypes';
import { RestRequestToStore } from '@/types/RestRequestToStore';

const RestCard = ({ request }: { request: RestRequestToStore }) => {
  const { push } = useRouter();

  const onClick = () => {
    push(
      restRequest2Url({
        method: request.method as HttpMethod,
        url: request.url,
        body: request.body,
        headers: request.headers,
        variables: request.variables,
        queryParams: request.queryParams,
      }),
    );
  };

  return (
    <div className={styles.restCard} onClick={onClick}>
      <div className={styles.restCard__row}>
        <div className={styles.restCard__method}>{request.method}</div>
        <div className={styles.restCard__date}>
          {moment(request.date).format('DD-MM-yy HH:mm')}
        </div>
      </div>
      <div className={styles.restCard__url}>{request.url}</div>
    </div>
  );
};

export default RestCard;
