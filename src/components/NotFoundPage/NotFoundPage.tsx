import { FC } from 'react';
import PageHeader from '@/components/PageHeader/PageHeader';
import { useTranslations } from 'next-intl';

export const NotFoundPage: FC = () => {
  const t = useTranslations('NotFoundPage');
  return <PageHeader>{t('Title')}</PageHeader>;
};
