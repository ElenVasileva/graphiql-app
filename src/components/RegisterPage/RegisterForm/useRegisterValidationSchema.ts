import { useTranslations } from 'next-intl';
import * as yup from 'yup';

export const useRegisterValidationSchema = () => {
  const t = useTranslations('RegisterValidation');

  return yup.object().shape({
    name: yup
      .string()
      .required(t('name.required'))
      .matches(/^[A-Z]/, t('name.pattern')),
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
      .matches(/^[^а-яА-ЯЁё]*$/, {
        message: t('password.cyrillic'),
      })
      .min(8, t('password.min'))
      .matches(/(?=.*\d)/, t('password.number'))
      .matches(/(?=.*[a-z])/, t('password.lowercase'))
      .matches(/(?=.*[A-Z])/, t('password.uppercase'))
      .matches(/(?=.*\W)/, t('password.special')),
    confirmPassword: yup
      .string()
      .required(t('confirmPassword.required'))
      .oneOf([yup.ref('password')], t('confirmPassword.match')),
  });
};
