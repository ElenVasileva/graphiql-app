'use client';

import { useTranslations } from 'next-intl';

import Textarea from 'components/Textarea/Textarea';

import prettyPrintJson from 'utils/prettyPrintJson';

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
  const t = useTranslations('ResponseSection');

  const { data, statusCode, error } = response;

  let str = '';

  if (data) {
    str = `statusCode: ${statusCode} \n${prettyPrintJson(data)}`;
  }

  if (error) {
    str = `statusCode: ${statusCode} \n${prettyPrintJson(error)}`;
  }

  return (
    <div className={styles['response-section']}>
      <h2 className={styles.h2}>{t('Response')}</h2>
      <Textarea value={str} readOnly={true} />
    </div>
  );
}
