'use client';

import { Link } from '@/i18n/routing';
import styles from './SignLinks.module.scss';
import useUserSession from 'hooks/useUserSession';
import { useTranslations } from 'next-intl';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '@/constants/routes';

const SignLinks = ({ session }: { session: string | null }) => {
  const t = useTranslations('SignLinks');
  const userSessionId = useUserSession(session);

  return (
    <>
      {!userSessionId && (
        <div className={styles.links}>
          <Link href={LOGIN_ROUTE} className={styles.links__link}>
            {t('SignIn')}
          </Link>
          <Link href={REGISTRATION_ROUTE} className={styles.links__link}>
            {t('SignUp')}
          </Link>
        </div>
      )}
    </>
  );
};

export default SignLinks;
