'use client';

import { FC, useState } from 'react';
import styles from './RegisterPage.module.scss';
import Image from 'next/image';
import * as yup from 'yup';
import eye from '../../assets/icons/eye.svg';
import eyeOff from '../../assets/icons/eye-off.svg';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PasswordStrength } from 'components/PasswordStrength';
import classNames from 'classnames';

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
    .required('Confirm password is required')
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
  const [showPassword, setShowPassword] = useState(false);
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
        <div className={styles.control}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            {...register('name')}
            id="name"
            autoComplete="off"
            className={classNames({
              [styles.errorInput]: errors.name,
            })}
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>

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

          {password && <PasswordStrength password={password} />}
        </div>

        <div className={styles.control}>
          <label htmlFor="confirmPassword">Confirm password:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            {...register('confirmPassword')}
            id="confirmPassword"
            className={classNames({
              [styles.errorInput]: errors.confirmPassword,
            })}
          />
          {errors.confirmPassword && (
            <p className={styles.error}>{errors.confirmPassword.message}</p>
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
