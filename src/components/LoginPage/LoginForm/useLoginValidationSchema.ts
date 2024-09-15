import { useTranslations } from 'next-intl';
import * as yup from 'yup';

export const useLoginValidationSchema = () => {
  const t = useTranslations('LoginValidation');

  return yup.object().shape({
    email: yup
      .string()
      .required(t('email.required'))
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        t('email.pattern'),
      ),
    password: yup
      .string()
      .required(t('password.required'))
      .min(8, t('password.min')),
  });
};
