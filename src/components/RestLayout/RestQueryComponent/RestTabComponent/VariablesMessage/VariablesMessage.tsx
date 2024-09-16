import { useTranslations } from 'next-intl';
import styles from './VariablesMessage.module.scss';

const VariablesMessage = () => {
  const t = useTranslations('Rest');

  return (
    <div className={styles.message}>
      {' '}
      <div className={styles.message__text}>{t('WrapVariablesMessage')}</div>
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
