import styles from './PageHeader.module.scss';

const PageHeader = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.header}>{children}</div>;
};
export default PageHeader;
