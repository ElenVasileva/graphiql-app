import { FC } from 'react';
import styles from './RegisterPage.module.scss';
import { RegisterForm } from './RegisterForm';
import PageHeader from '@/components/PageHeader/PageHeader';
import { useTranslations } from 'next-intl';

export const RegisterPage: FC = () => {
  const t = useTranslations('RegisterPage');

  return (
    <div className={styles.wrapper}>
      <PageHeader>{t('Title')}</PageHeader>
      <RegisterForm />
    </div>
  );
};
