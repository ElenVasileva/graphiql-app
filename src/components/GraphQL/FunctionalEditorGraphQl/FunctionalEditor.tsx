import styles from './FunctionalEditor.module.scss';
import FormGraphQl from './FormGraphQl/FormGraphQl';

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

  return (
    <div className={styles['functional-editor']}>
      <h2 className={styles.h2}>Editor</h2>
      <FormGraphQl onSubmit={onSubmit} />
    </div>
  );
}
