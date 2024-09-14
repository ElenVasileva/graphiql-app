import { Suspense } from 'react';

import GraphQl from '@/components/GraphQL/GraphQl';

import styles from './layout.module.scss';

export default function Layout() {
  return (
    <div className={styles.client}>
      <h1 className={styles.h1}>GraphQL Client</h1>
      <div className={styles.content}>
        <Suspense>
          <GraphQl />
        </Suspense>
      </div>
    </div>
  );
}
