import KeyValueEditor from 'components/KeyValueEditor/KeyValueEditor';

import styles from './HeadersTable.module.scss';

interface IHeadersTableProps {
  headers: Record<string, string>;
  visibleSection: 'headers' | 'query' | 'variables' | undefined;
  handleChange: (values: Record<string, string>) => void;
}

export default function HeadersTable(props: IHeadersTableProps) {
  const { visibleSection, headers, handleChange } = props;

  if (visibleSection !== 'headers') return null;

  return (
    <div className={styles['headers-table']}>
      <KeyValueEditor defaultValues={headers} onChange={handleChange} />
    </div>
  );
}
