'use client';
import RestLayout from 'components/RestLayout/RestLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RestLayout />
      {children}
    </>
  );
}
