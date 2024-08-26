'use client';

import { FC } from 'react';
import styles from './RegisterPage.module.scss';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { Button } from 'components/Button';
import { Input } from 'components/Input';

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const ValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z]/, 'First letter must be uppercase'),
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
    .min(8, 'Password must be at least 8 characters long')
    .matches(/(?=.*\d)/, 'Password must contain at least one digit')
    .matches(
      /(?=.*[a-z])/,
      'Password must contain at least one lowercase letter',
    )
    .matches(
      /(?=.*[A-Z])/,
      'Password must contain at least one uppercase letter',
    )
    .matches(/(?=.*\W)/, 'Password must contain at least one special character')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
});

export const RegisterPage: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>({
    resolver: yupResolver(ValidationSchema),
  });
  const password = watch('password');

  const onSubmit = (data: Inputs) => {};

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Sign up</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
        noValidate
      >
        <Input
          name="name"
          register={register}
          error={errors.name}
          type="text"
          label="Name:"
          autoComplete="off"
        />

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
          register={register}
          error={errors.password}
          type="password"
          label="Password:"
          password={password}
        />

        <Input
          name="confirmPassword"
          register={register}
          error={errors.confirmPassword}
          type="password"
          label="Confirm password:"
        />

        <Button
          type="submit"
          text="Submit"
          disabled={Object.keys(errors).length > 0}
          className={styles.submitButton}
        />

        <Link href="/auth" className={styles.link}>
          Already have an account?
        </Link>
      </form>
    </div>
  );
};
