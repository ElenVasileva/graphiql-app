import styles from './VariablesMessage.module.scss';

const VariablesMessage = () => {
  return (
    <div className={styles.message}>
      {' '}
      <div className={styles.message__text}>
        Wrap variables reference in double-quotes to access it from within a
        request body:
      </div>
      <code className={styles.message__code}>
        <span className={styles.message__grey}>{`{`}</span>{' '}
        <span className={styles.message__yellow}>{`"customer_id"`}</span>{' '}
        <span className={styles.message__blue}>:</span>{' '}
        <span className={styles.message__green}>{`"{{ cust_id }}"`}</span>{' '}
        <span className={styles.message__grey}>{`}`}</span>
      </code>
    </div>
  );
};

export default VariablesMessage;
