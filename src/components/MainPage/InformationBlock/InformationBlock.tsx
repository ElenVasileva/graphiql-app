import styles from './InformationBlock.module.scss';

const InformationBlock = () => {
  return (
    <div className={styles.info}>
      <div className={styles.info__projectAndCourse}>
      <div className={styles.info__project}>
        <h3>REST and GraphQL client</h3>
      </div>
      <div className={styles.info__course}>
        <h3>RSS React Course</h3>
        </div>
        </div>
      <div className={styles.info__developers}>
        <h3>Developers</h3>
      </div>
    </div>
  );
};

export default InformationBlock;
