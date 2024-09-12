'use client';

import { Link } from '@/i18n/routing';
import styles from './ContentLinks.module.scss';
import useUserSession from 'hooks/useUserSession';
import { useTranslations } from 'next-intl';

const ContentLinks = ({ session }: { session: string | null }) => {
  const t = useTranslations('ContentLinks');
  const userSessionId = useUserSession(session);

  return (
    <>
      {!!userSessionId && (
        <div className={styles.links}>
          <Link href="/restful/" className={styles.links__link}>
            {t('Restful')}
          </Link>
          <Link href="/GRAPHQL" className={styles.links__link}>
            {t('GraphiQL')}
          </Link>
          <Link href="/history" className={styles.links__link}>
            {t('History')}
          </Link>
        </div>
      )}
    </>
  );
};

export default ContentLinks;
