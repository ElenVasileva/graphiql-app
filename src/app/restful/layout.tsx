'use client';
import RestQueryComponent from 'components/RestQueryComponent/RestQueryComponent';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>REST client</div>
      <RestQueryComponent />
      {children}
    </>
  );
}
