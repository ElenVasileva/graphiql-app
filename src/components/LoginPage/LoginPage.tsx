'use client';

import { FC } from 'react';
import styles from './LoginPage.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';
import { Button } from 'components/Button';
import { Input } from 'components/Input';

type Inputs = {
  email: string;
  password: string;
};

const ValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Email is not valid',
    ),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
});

export const LoginPage: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(ValidationSchema),
  });

  const onSubmit = (data: Inputs) => {};

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Sign in</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
        noValidate
      >
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
    </div>
  );
};
