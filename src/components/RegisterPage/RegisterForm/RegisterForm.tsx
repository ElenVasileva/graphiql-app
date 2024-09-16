'use client';

import { FC } from 'react';
import styles from './RegisterForm.module.scss';
import { useForm } from 'react-hook-form';
import { useRegisterValidationSchema } from './useRegisterValidationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from 'components/Input';
import { Button } from 'components/Button';
import { createSession, registerWithEmailAndPassword } from 'services/firebase';
import { Link } from '@/i18n/routing';
import { LOGIN_ROUTE } from '@/constants/routes';
import { useTranslations } from 'next-intl';

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const RegisterForm: FC = () => {
  const t = useTranslations('RegisterForm');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>({
    resolver: yupResolver(useRegisterValidationSchema()),
  });
  const password = watch('password');

  const onSubmit = async (data: Inputs) => {
    const userUid = await registerWithEmailAndPassword(
      data.name,
      data.email,
      data.password,
    );

    if (userUid) {
      return createSession(userUid);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
      <Input
        name="name"
        register={register}
        error={errors.name}
        type="text"
        label={t('Name')}
        autoComplete="off"
      />

      <Input
        name="email"
        register={register}
        error={errors.email}
        type="email"
        label={t('Email')}
        autoComplete="off"
      />

      <Input
        name="password"
        register={register}
        error={errors.password}
        type="password"
        label={t('Password')}
        password={password}
      />

      <Input
        name="confirmPassword"
        register={register}
        error={errors.confirmPassword}
        type="password"
        label={t('ConfirmPassword')}
      />

      <Button
        type="submit"
        text={t('Submit')}
        disabled={Object.keys(errors).length > 0}
        className={styles.submitButton}
      />

      <Link href={LOGIN_ROUTE} className={styles.link}>
        {t('SignIn')}
      </Link>
    </form>
  );
};
