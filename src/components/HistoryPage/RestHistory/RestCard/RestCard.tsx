'use client';

import moment from 'moment';
import styles from './RestCard.module.scss';
import { useRouter } from 'next/navigation';
import { restRequest2Url } from '@/utils/restUrlConverter';
import { HttpMethod } from '@/constants/methodTypes';
import { RestRequestToStore } from '@/types/RestRequestToStore';
import { useAppDispatch } from '@/store/hooks';
import { setRequest } from '@/store/features/clickedRestSlice';

const RestCard = ({ request }: { request: RestRequestToStore }) => {
  const { push } = useRouter();
  const dispatch = useAppDispatch();

  const onClick = () => {
    if (request.body || request.headers) {
      dispatch(setRequest(request.date)); // NOTE: to restore body with variables if present
    }
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
        <div className={styles.restCard__method}>
          {request.method.toUpperCase()}
        </div>
        <div className={styles.restCard__date}>
          {moment(request.date).format('DD-MM-yy HH:mm')}
        </div>
      </div>
      <div className={styles.restCard__url}>{request.url}</div>
      {request.body && (
        <div className={styles.restCard__body}>
          <span className={styles.restCard__bold}>Body:&nbsp;</span>
          {request.body}
        </div>
      )}
      {request.variables && (
        <div className={styles.restCard__variables}>
          <span className={styles.restCard__bold}>Variables:&nbsp;</span>
          {JSON.stringify(request.variables)}
        </div>
      )}
    </div>
  );
};

export default RestCard;
