'use client';
import { useAppSelector } from '@/store/hooks';
import PageHeader from 'components/PageHeader/PageHeader';
import { useTranslations } from 'next-intl';

const Greeting = () => {
  const t = useTranslations('Greeting');
  const userName = useAppSelector((state) => state.currentUser.value);

  return userName ? (
    <PageHeader>
      {t('WelcomeBack')}, {userName}!
    </PageHeader>
  ) : (
    <PageHeader>{t('Welcome')}</PageHeader>
  );
};

export default Greeting;
