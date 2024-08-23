import FunctionalEditor from 'components/FunctionalEditorGraphQl/FunctionalEditor';
import styles from './layout.module.scss';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1 className={styles.h1}>GraphiQL Client</h1>
      <div className={styles.content}>
        <FunctionalEditor />
        {children}
      </div>
    </>
  );
}
