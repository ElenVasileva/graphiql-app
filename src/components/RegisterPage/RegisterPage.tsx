import { FC } from 'react';
import styles from './RegisterPage.module.scss';
import { RegisterForm } from './RegisterForm';
import { useTranslations } from 'next-intl';

export const RegisterPage: FC = () => {
  const t = useTranslations('RegisterPage');

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{t('Title')}</h1>

      <RegisterForm />
    </div>
  );
};
