import type { Metadata } from 'next';
import localFont from 'next/font/local';

import './globals.css';
import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from 'constants/sessionCookie';
import { Header } from 'components/Header';
import StoreProvider from 'app/storeProvider';
import { Footer } from 'components/Footer';

const myFont = localFont({
  src: [
    {
      path: '../assets/fonts/Rubik-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Rubik-Bold.woff',
      weight: '700',
      style: 'bold',
    },
  ],
});

export const metadata: Metadata = {
  title: '',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = cookies().get(SESSION_COOKIE_NAME)?.value || null;

  return (
    <html lang="en" className={myFont.className}>
      <body>
        <StoreProvider>
          <Header session={session} />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
