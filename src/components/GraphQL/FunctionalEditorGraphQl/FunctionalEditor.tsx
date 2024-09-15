import styles from './FunctionalEditor.module.scss';
import FormGraphQl from './FormGraphQl/FormGraphQl';
import { useTranslations } from 'next-intl';

interface IFunctionalEditorProps {
  onSubmit: (
    endpoint: string,
    query: string,
    variables: Record<string, string>,
    headers: Record<string, string>,
  ) => void;
}

export default function FunctionalEditor(props: IFunctionalEditorProps) {
  const { onSubmit } = props;

  const t = useTranslations('FunctionalEditor');

  return (
    <div className={styles['functional-editor']}>
      <h2 className={styles.h2}>{t('Editor')}</h2>
      <FormGraphQl onSubmit={onSubmit} />
    </div>
  );
}
