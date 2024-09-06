'use client';
import { RootState } from '@store/store';
import PageHeader from 'components/PageHeader/PageHeader';
import { useSelector } from 'react-redux';

const Greeting = () => {
  const userName = useSelector((state: RootState) => state.user.value);

  return (
    <>
      {!userName && <PageHeader>Welcome!</PageHeader>}
      {!!userName && <PageHeader>Welcome Back, {userName}!</PageHeader>}
    </>
  );
};

export default Greeting;
