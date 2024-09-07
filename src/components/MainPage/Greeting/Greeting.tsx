'use client';
import PageHeader from 'components/PageHeader/PageHeader';

const Greeting = ({ session }: { session: string | null }) => {
  return (
    <>
      {!session && <PageHeader>Welcome!</PageHeader>}
      {!!session && <PageHeader>Welcome Back, userName!</PageHeader>}
    </>
  );
};

export default Greeting;
