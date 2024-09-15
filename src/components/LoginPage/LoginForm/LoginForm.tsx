'use client';

import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { FC } from 'react';
import styles from './LoginForm.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createSession, logInWithEmailAndPassword } from 'services/firebase';
import { Link } from '@/i18n/routing';
import { REGISTRATION_ROUTE } from '@/constants/routes';
import { useTranslations } from 'next-intl';
import { useLoginValidationSchema } from './useLoginValidationSchema';

type Inputs = {
  email: string;
  password: string;
};

export const LoginForm: FC = () => {
  const t = useTranslations('LoginForm');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(useLoginValidationSchema()),
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
        label={t('Email')}
        autoComplete="off"
      />

      <Input
        name="password"
        type="password"
        register={register}
        error={errors.password}
        label={t('Password')}
      />

      <Button
        type="submit"
        text={t('Submit')}
        disabled={Object.keys(errors).length > 0}
        className={styles.submitButton}
      />

      <Link href={REGISTRATION_ROUTE} className={styles.link}>
        {t('SignUp')}
      </Link>
    </form>
  );
};
