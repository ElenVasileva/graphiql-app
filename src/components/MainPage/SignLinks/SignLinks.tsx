'use client';
import { RootState } from '@store/store';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import styles from './SignLinks.module.scss';

const SignLinks = () => {
  const userName = useSelector((state: RootState) => state.user.value);

  return (
    <>
      {!userName && (
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
