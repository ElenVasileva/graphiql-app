'use client';

import { Link } from '@/i18n/routing';
import styles from './SignLinks.module.scss';
import useUserSession from 'hooks/useUserSession';
import { useTranslations } from 'next-intl';

const SignLinks = ({ session }: { session: string | null }) => {
  const t = useTranslations('SignLinks');
  const userSessionId = useUserSession(session);

  return (
    <>
      {!userSessionId && (
        <div className={styles.links}>
          <Link href="/auth/" className={styles.links__link}>
            {t('SignIn')}
          </Link>
          <Link href="/auth/sign-up" className={styles.links__link}>
            {t('SignUp')}
          </Link>
        </div>
      )}
    </>
  );
};

export default SignLinks;
