import KeyValueEditor from 'components/KeyValueEditor/KeyValueEditor';

import styles from './VariablesEditor.module.scss';

interface IVariableEditorProps {
  visibleSection: 'headers' | 'query' | 'variables' | undefined;
  variables: Record<string, string>;
  handleChange: (values: Record<string, string>) => void;
}

export default function VariablesEditor(props: IVariableEditorProps) {
  const { visibleSection, variables, handleChange } = props;

  if (visibleSection !== 'variables') return null;

  return (
    <div className={styles['variables-editor']}>
      <KeyValueEditor defaultValues={variables} onChange={handleChange} />
    </div>
  );
}
