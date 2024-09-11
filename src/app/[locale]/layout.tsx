import type { Metadata } from 'next';
import { Rubik, League_Gothic } from 'next/font/google';

import './globals.css';
import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from 'constants/sessionCookie';
import { Header } from 'components/Header';
import StoreProvider from 'app/storeProvider';
import { Footer } from 'components/Footer';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

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

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const session = cookies().get(SESSION_COOKIE_NAME)?.value || null;
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${rubik.variable} ${league_gothic.variable}`}
    >
      <body>
        <StoreProvider>
          <NextIntlClientProvider messages={messages}>
            <Header session={session} />
            {children}
            <Footer />
          </NextIntlClientProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
