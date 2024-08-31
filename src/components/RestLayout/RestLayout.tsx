import RestQueryComponent from './RestQueryComponent/RestQueryComponent';
import styles from './RestLayout.module.scss'
import PageHeader from 'components/PageHeader/PageHeader';

const RestLayout = () => {
  return (
    <div className={styles.restLayout}>
      <PageHeader>REST client</PageHeader>
      <RestQueryComponent />
    </div>
  );
};

export default RestLayout;
