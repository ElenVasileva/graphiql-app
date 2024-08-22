import type { Metadata } from 'next';
import { Rubik, League_Gothic } from 'next/font/google';

import './globals.css';

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
  return (
    <html lang="en" className={`${rubik.variable} ${league_gothic.variable}`}>
      <body>{children}</body>
    </html>
  );
}
