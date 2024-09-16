'use client';

import styles from './RestResponseLoader.module.scss';

const RestResponseLoader = () => {
  return (
    <div className={styles.restLoader}>
      <div className={styles.restLoader__statusAndSection}>
        <div className={styles.restLoader__status}></div>
      </div>
      <div className={styles.restLoader__textareaContainer}>
        <textarea readOnly />
      </div>
    </div>
  );
};

export default RestResponseLoader;
