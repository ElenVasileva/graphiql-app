'use client';
import PageHeader from '@/components/PageHeader/PageHeader';
import styles from './HistoryPage.module.scss';
import HistoryContent from '@/components/HistoryPage/HistoryContent/HistoryContent';

const HistoryPage = () => {
  return (
    <div className={styles.history}>
      <PageHeader>History</PageHeader>
      <HistoryContent />
    </div>
  );
};
export default HistoryPage;
