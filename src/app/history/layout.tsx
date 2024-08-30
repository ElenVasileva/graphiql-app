import styles from './layout.module.scss';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.history}>
      <h1 className={styles.h1}>History</h1>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
