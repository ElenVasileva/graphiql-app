'use client';
import RestQueryComponent from 'components/RestQueryComponent/RestQueryComponent';
import { HttpMethod } from 'constants/methodTypes';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>REST client</div>
      <RestQueryComponent />
      {children}
    </>
  );
}
