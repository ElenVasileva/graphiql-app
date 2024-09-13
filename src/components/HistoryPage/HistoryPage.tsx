'use client';
import PageHeader from '@/components/PageHeader/PageHeader';
import styles from './HistoryPage.module.scss';
import RestHistory from '@/components/HistoryPage/RestHistory/RestHistory';
import GraphqlHistory from '@/components/HistoryPage/GraphqlHistory/GraphqlHistory';

const HistoryPage = () => {
  return (
    <div className={styles.history}>
      <PageHeader>History</PageHeader>
      <div className={styles.history__content}>
        <div className={styles.history__item}>
          <RestHistory />
        </div>
        <div className={styles.history__item}>
          <GraphqlHistory />
        </div>
      </div>
    </div>
  );
};
export default HistoryPage;
