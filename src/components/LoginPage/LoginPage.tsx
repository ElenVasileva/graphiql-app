import { FC } from 'react';
import styles from './LoginPage.module.scss';
import { LoginForm } from './LoginForm';
import PageHeader from '@/components/PageHeader/PageHeader';

export const LoginPage: FC = () => {
  return (
    <div className={styles.wrapper}>
      <PageHeader>Sign in</PageHeader>
      <LoginForm />
    </div>
  );
};
