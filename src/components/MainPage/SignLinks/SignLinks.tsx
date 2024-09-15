'use client';

import Link from 'next/link';
import styles from './SignLinks.module.scss';
import useUserSession from '@/hooks/useUserSession';

const SignLinks = ({ session }: { session: string | null }) => {
  const userSessionId = useUserSession(session);

  return (
    <>
      {!userSessionId && (
        <div className={styles.links}>
          <Link href="/auth/" className={styles.links__link}>
            Sign In
          </Link>
          <Link href="/auth/sign-up" className={styles.links__link}>
            Sign Up
          </Link>
        </div>
      )}
    </>
  );
};

export default SignLinks;
