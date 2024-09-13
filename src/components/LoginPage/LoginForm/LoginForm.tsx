'use client';

import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { FC } from 'react';
import styles from './LoginForm.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginValidationSchema } from './LoginValidationSchema';
import { createSession, logInWithEmailAndPassword } from 'services/firebase';
import { Link } from '@/i18n/routing';
import { REGISTRATION_ROUTE } from '@/constants/routes';

type Inputs = {
  email: string;
  password: string;
};

export const LoginForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(LoginValidationSchema),
  });

  const onSubmit = async (data: Inputs) => {
    const userUid = await logInWithEmailAndPassword(data.email, data.password);

    if (userUid) {
      return createSession(userUid);
    }
  };

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

      <Link href={REGISTRATION_ROUTE} className={styles.link}>
        Don&apos;t have an account?
      </Link>
    </form>
  );
};
