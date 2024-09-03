'use client';

import { FC } from 'react';
import styles from './RegisterForm.module.scss';
import { useForm } from 'react-hook-form';
import { RegisterValidationSchema } from './RegisterValidationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from 'components/Input';
import { Button } from 'components/Button';
import Link from 'next/link';

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const RegisterForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>({
    resolver: yupResolver(RegisterValidationSchema),
  });
  const password = watch('password');

  const onSubmit = () => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
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
  );
};
