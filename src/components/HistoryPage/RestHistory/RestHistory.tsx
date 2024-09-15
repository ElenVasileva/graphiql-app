'use client';
import { RootState } from '@/store/store';
import styles from './RestHistory.module.scss';
import { useAppSelector } from '@/store/hooks';
import RestCard from '@/components/HistoryPage/RestHistory/RestCard/RestCard';
import { RestRequestToStore } from '@/types/RestRequestToStore';

const RestHistory = () => {
  const user = useAppSelector((state: RootState) => state.currentUser.value);

  const allRequests: RestRequestToStore[] = useAppSelector(
    (state: RootState) => state.restRequests.value,
  );

  const userRequests = allRequests.filter((r) => {
    return r.user === user;
  });

  return (
    <div className={styles.restHistory}>
      <h3>REST</h3>
      <div className={styles.restHistory__content}>
        {!!(userRequests && userRequests.length) &&
          userRequests.map((request) => (
            <RestCard request={request} key={request.date} />
          ))}
        {!userRequests.length && (
          <>
            <div>There are no REST requests in the local storage</div>
            <a href="/restful">Create the first one</a>
          </>
        )}
      </div>
    </div>
  );
};
export default RestHistory;
