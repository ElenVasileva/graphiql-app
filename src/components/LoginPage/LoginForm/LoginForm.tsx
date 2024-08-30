'use client';

import { Button } from 'components/Button';
import { Input } from 'components/Input';
import Link from 'next/link';
import { FC, useEffect } from 'react';
import styles from './LoginForm.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginValidationSchema } from './LoginValidationSchema';
import { auth, logInWithEmailAndPassword } from 'services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { redirect } from 'next/navigation';
import { Loader } from 'components/Loader';

type Inputs = {
  email: string;
  password: string;
};

export const LoginForm: FC = () => {
  const [user, loading, error] = useAuthState(auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(LoginValidationSchema),
  });

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      redirect('/');
    }
  }, [user, loading]);

  const onSubmit = (data: Inputs) => {
    logInWithEmailAndPassword(data.email, data.password);
  };

  if (loading) return <Loader />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
      <Input
        name="email"
        register={register}
        error={errors.email}
        type="email"
        label="Email:"
        autoComplete="off"
      />

      <Input
        name="password"
        type="password"
        register={register}
        error={errors.password}
        label="Password:"
      />

      <Button
        type="submit"
        text="Submit"
        disabled={Object.keys(errors).length > 0}
        className={styles.submitButton}
      />

      <Link href="/auth/sign-up" className={styles.link}>
        Don&apos;t have an account?
      </Link>
    </form>
  );
};
