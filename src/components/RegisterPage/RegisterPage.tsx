import { FC } from 'react';
import styles from './RegisterPage.module.scss';
import { RegisterForm } from './RegisterForm';
import PageHeader from '@/components/PageHeader/PageHeader';

export const RegisterPage: FC = () => {
  return (
    <div className={styles.wrapper}>
      <PageHeader>Sign up</PageHeader>
      <RegisterForm />
    </div>
  );
};
