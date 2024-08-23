import Textarea from 'components/Textarea/Textarea';

import fetchGraphQL from 'services/fetchGraphQL';
import base64ToBytes from 'utils/base64ToString';
import prettyPrintJson from 'utils/prettyPrintJson';

import styles from './ResponseSection.module.scss';

interface ResponseSectionProps {
  endpoint: string;
  body: string;
  searchParams: { [key: string]: string };
}

export default async function ResponseSection(props: ResponseSectionProps) {
  const endpoint = base64ToBytes(decodeURIComponent(props.endpoint));
  const body = base64ToBytes(decodeURIComponent(props.body));

  const data = await fetchGraphQL(endpoint, body, props.searchParams);

  return (
    <div className={styles['response-section']}>
      <h2 className={styles.h2}>Response</h2>
    </div>
  );
}
