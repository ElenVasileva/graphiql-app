'use client';

import Link from 'next/link';
import styles from './ContentLinks.module.scss';
import useUserSession from 'hooks/useUserSession';

const ContentLinks = ({ session }: { session: string | null }) => {
  const userSessionId = useUserSession(session);

  return (
    <>
      {!!userSessionId && (
        <div className={styles.links}>
          <Link href="/restful/" className={styles.links__link}>
            REST Client
          </Link>
          <Link href="/GRAPHQL" className={styles.links__link}>
            GraphiQL Client
          </Link>
          <Link href="/history" className={styles.links__link}>
            History
          </Link>
        </div>
      )}
    </>
  );
};

export default ContentLinks;
