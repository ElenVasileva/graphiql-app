import { FC } from 'react';
import styles from './LoginPage.module.scss';
import { LoginForm } from './LoginForm';

export const LoginPage: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Sign in</h1>

      <LoginForm />
    </div>
  );
};
