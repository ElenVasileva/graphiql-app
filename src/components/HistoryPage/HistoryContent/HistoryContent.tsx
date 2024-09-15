'use client';

import RequestCard from '@/components/HistoryPage/HistoryContent/RequestCard/RequestCard';
import styles from './HistoryContent.module.scss';
import { useAppSelector } from '@/store/hooks';
import { RestRequestToStore } from '@/types/RestRequestToStore';

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
          <a href="/restful">Create the first REST one</a>
          <a href="/GRAPHQL">Create the first GRAPHQL one</a>
        </>
      )}
    </div>
  );
};
export default HistoryContent;
