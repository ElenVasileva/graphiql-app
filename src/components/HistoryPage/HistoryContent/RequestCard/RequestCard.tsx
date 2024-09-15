'use client';

import moment from 'moment';
import styles from './RequestCard.module.scss';
import { useRouter } from 'next/navigation';
import { restRequest2Url } from '@/utils/restUrlConverter';
import { HttpMethod } from '@/constants/methodTypes';
import { RestRequestToStore } from '@/types/RestRequestToStore';
import { useAppDispatch } from '@/store/hooks';
import { setRequest } from '@/store/features/clickedRestSlice';
import generateUrlGraphQl from '@/utils/generateUrlGraphQl';

const RequestCard = ({ request }: { request: RestRequestToStore }) => {
  const { push } = useRouter();
  const dispatch = useAppDispatch();

  const onClick = () => {
    if (request.body || request.headers) {
      dispatch(setRequest(request.date)); // NOTE: to restore body with variables if present
    }

    if (request.method === 'GRAPHQL') {
      push(
        'GRAPHQL/' +
          generateUrlGraphQl({
            endpoint: request.url,
            body: JSON.stringify({
              query: request.body,
              variables: request.variables,
            }),
            headers: request.headers || {},
          }),
      );
    } else {
      push(
        restRequest2Url({
          method: request.method as HttpMethod,
          url: request.url,
          body: request.body,
          headers: request.headers,
          variables: request.variables,
          queryParams: request.queryParams,
        }).substring(1),
      );
    }
  };

  return (
    <div className={styles.restCard} onClick={onClick}>
      <div className={styles.restCard__row}>
        <div className={styles.restCard__method}>
          {request.method.toUpperCase()}
        </div>
        <div className={styles.restCard__url}>{request.url}</div>
        <div className={styles.restCard__date}>
          {moment(request.date).format('DD-MM-yy HH:mm')}
        </div>
      </div>
      {request.body && (
        <div className={styles.restCard__body}>
          <div className={styles.restCard__rowHeader}>
            {request.method === 'GRAPHQL' ? `Query` : `Body`}:&nbsp;
          </div>
          <div className={styles.restCard__rowContent}>{request.body}</div>
        </div>
      )}
      {!!(request.variables && Object.keys(request.variables).length) && (
        <div className={styles.restCard__variables}>
          <div className={styles.restCard__rowHeader}>Variables:&nbsp;</div>
          <div className={styles.restCard__rowContent}>
            {JSON.stringify(request.variables)}
          </div>
        </div>
      )}
      {!!(request.headers && Object.keys(request.headers).length) && (
        <div className={styles.restCard__headers}>
          <div className={styles.restCard__rowHeader}>Headers:&nbsp;</div>
          <div className={styles.restCard__rowContent}>
            {JSON.stringify(request.headers)}
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestCard;
