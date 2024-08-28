import { FC } from 'react';
import styles from './RegisterPage.module.scss';
import { RegisterForm } from './RegisterForm';

export const RegisterPage: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Sign up</h1>

      <RegisterForm />
    </div>
  );
};
