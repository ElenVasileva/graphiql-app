import { Suspense } from 'react';

import { useTranslations } from 'next-intl';

import GraphQl from 'components/GraphQL/GraphQl';

import styles from './layout.module.scss';

export default function Layout() {
  const t = useTranslations('LayoutGRAPHQL');

  return (
    <div className={styles.client}>
      <h1 className={styles.h1}>{t('GraphQL Client')}</h1>
      <div className={styles.content}>
        <Suspense>
          <GraphQl />
        </Suspense>
      </div>
    </div>
  );
}
