import { FC } from 'react';
import styles from './LoginPage.module.scss';
import { LoginForm } from './LoginForm';
import PageHeader from '@/components/PageHeader/PageHeader';
import { useTranslations } from 'next-intl';

export const LoginPage: FC = () => {
  const t = useTranslations('LoginPage');

  return (
    <div className={styles.wrapper}>
      <PageHeader>{t('Title')}</PageHeader>
      <LoginForm />
    </div>
  );
};
