'use client';

import { Link } from '@/i18n/routing';
import RequestCard from '@/components/HistoryPage/HistoryContent/RequestCard/RequestCard';
import styles from './HistoryContent.module.scss';
import { useAppSelector } from '@/store/hooks';
import { RestRequestToStore } from '@/types/RestRequestToStore';
import { RESTFUL_ROUTE, GRAPHIQL_ROUTE } from '@/constants/routes';

const HistoryContent = () => {
  const user = useAppSelector((state) => state.currentUser.value);

  const allRequests: RestRequestToStore[] = useAppSelector(
    (state) => state.restRequests.value,
  );

  const userRequests = allRequests.filter((r) => {
    return r.user === user;
  });

  return (
    <div className={styles.historyContent}>
      {!!(userRequests && userRequests.length) &&
        userRequests.map((request) => (
          <RequestCard request={request} key={request.date} />
        ))}
      {!userRequests.length && (
        <>
          <div className={styles.historyContent__message}>
            There are no requests in the local storage
          </div>
          <Link href={RESTFUL_ROUTE}>Create the first REST one</Link>
          <Link href={GRAPHIQL_ROUTE}>Create the first GRAPHQL one</Link>
        </>
      )}
    </div>
  );
};
export default HistoryContent;
