import Header from './Header/Header';
import RestQueryComponent from './RestQueryComponent/RestQueryComponent';
import styles from './RestLayout.module.scss'

const RestLayout = () => {
  return (
    <div className={styles.restLayout}>
      <Header>REST client</Header>
      <RestQueryComponent />
    </div>
  );
};
export default RestLayout;
