import type { Metadata } from 'next';
import { Rubik, League_Gothic } from 'next/font/google';

import './globals.css';
import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from 'constants/sessionCookie';
import { Header } from 'components/Header';
import StoreProvider from 'app/storeProvider';
import { Footer } from 'components/Footer';

const rubik = Rubik({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-rubik',
  display: 'swap',
});

const league_gothic = League_Gothic({
  subsets: ['latin'],
  variable: '--font-league-gothic',
  display: 'swap',
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
    <html lang="en" className={`${rubik.variable} ${league_gothic.variable}`}>
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
