import { FC } from 'react';
import styles from './Loader.module.scss';

export const Loader: FC = () => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.loader} data-testid="loader"></span>
    </div>
  );
};
