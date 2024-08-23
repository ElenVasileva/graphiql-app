import styles from './FunctionalEditor.module.scss';
import FormGraphQl from './FormGraphQl/FormGraphQl';

export default function FunctionalEditor() {
  return (
    <div className={styles['functional-editor']}>
      <h2 className={styles.h2}>Editor</h2>
      <FormGraphQl />
    </div>
  );
}
