'use client';

import prettyPrintJson from 'utils/prettyPrintJson';

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
  const { data, statusCode, error } = response;
  let str = '';

  if (data) {
    str = `data statusCode: ${statusCode} \n${prettyPrintJson(data)}`;
  }

  if (error) {
    str = `statusCode: ${statusCode} \n${prettyPrintJson(error)}`;
  }

  return (
    <div className={styles['response-section']}>
      <div className={styles['wrapper-inputs']}>
        <h2 className={styles.h2}>Response</h2>
        <Textarea value={str} readOnly={true} />
      </div>
    </div>
  );
}
