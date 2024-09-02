'use client';

import Textarea from 'components/Textarea/Textarea';

import styles from './ResponseSection.module.scss';

interface IResponseSectionProps {
  response: {
    statusCode: number | null;
    data: string | null;
    error: string | null;
  };
}

export default function ResponseSection(props: IResponseSectionProps) {
  const { response } = props;
  const { data, error } = response;
  const str = data || error || '';

  return (
    <div className={styles['response-section']}>
      <h2 className={styles.h2}>Response</h2>
      <Textarea value={str} readOnly={true} />
    </div>
  );
}
