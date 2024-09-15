'use client';
import { useAppSelector } from '@/store/hooks';
import PageHeader from 'components/PageHeader/PageHeader';

const Greeting = () => {
  const userName = useAppSelector((state) => state.currentUser.value);

  return userName ? (
    <PageHeader>Welcome Back, {userName}!</PageHeader>
  ) : (
    <PageHeader>Welcome!</PageHeader>
  );
};

export default Greeting;
