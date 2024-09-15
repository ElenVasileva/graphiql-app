'use client';

import PageHeader from '@/components/PageHeader/PageHeader';
import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <div className={styles.wrapper}>
          <PageHeader>404 Page not found...</PageHeader>
          <a href="/" className={styles.link}>
            Return to main page
          </a>
        </div>
      </body>
    </html>
  );
}
