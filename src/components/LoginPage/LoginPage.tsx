import { FC } from 'react';
import styles from './LoginPage.module.scss';
import { LoginForm } from './LoginForm';
import { useTranslations } from 'next-intl';

export const LoginPage: FC = () => {
  const t = useTranslations('LoginPage');

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{t('Title')}</h1>

      <LoginForm />
    </div>
  );
};
