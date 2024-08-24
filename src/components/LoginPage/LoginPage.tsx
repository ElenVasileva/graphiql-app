'use client';

import { FC, useState } from 'react';
import styles from './LoginPage.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import eye from '../../assets/icons/eye.svg';
import eyeOff from '../../assets/icons/eye-off.svg';
import Image from 'next/image';
import classNames from 'classnames';

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
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: Inputs) => {};

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Sign in</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
        noValidate
      >
        <div className={styles.control}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            {...register('email')}
            id="email"
            className={classNames({
              [styles.errorInput]: errors.email,
            })}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>

        <div className={styles.control}>
          <label htmlFor="password">Password:</label>
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              id="password"
              className={classNames({
                [styles.errorInput]: errors.password,
              })}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={styles.showPassword}
            >
              <Image
                src={showPassword ? eyeOff : eye}
                alt={showPassword ? 'Hide password' : 'Show password'}
              />
            </button>
          </div>
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>

        <button
          className={styles.submit}
          type="submit"
          disabled={Object.keys(errors).length > 0}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
