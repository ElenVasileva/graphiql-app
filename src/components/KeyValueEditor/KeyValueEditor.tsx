import { useState } from 'react';
import styles from './KeyValueEditor.module.scss';

const KeyValueEditor = ({
  defaultValues,
  onChange,
}: {
  defaultValues: Record<string, string>;
  onChange: (values: Record<string, string>) => void;
}) => {
  let rows: JSX.Element[] = [];

  const [values, setValues] = useState<Record<string, string>>(defaultValues);

  const onKeyChange = (oldKey: string, newKey: string) => {
    const value = values[oldKey];
    const newValues = { ...values, ...{ [newKey]: value } };
    delete newValues[oldKey];
    setValues(newValues);
    onChange(values);
  };
  const onValueChange = (key: string, newValue: string) => {
    setValues({ ...values, ...{ [key]: newValue } });
    onChange(values);
  };

  for (const key in values) {
    rows.push(
      <div key={key} className={styles.keyValue__row}>
        <input
          type="text"
          className={styles.keyValue__row__key}
          defaultValue={key}
          onChange={(e) => {
            onKeyChange(key, e.target.value);
          }}
        />
        <input
          type="text"
          className={styles.keyValue__row__value}
          defaultValue={values[key]}
          onChange={(e) => {
            onValueChange(key, e.target.value);
          }}
        />
        <div>
          {key} {values[key]}
        </div>
      </div>,
    );
  }
  return (
    <div className={styles.keyValue}>
      <div className={styles.keyValue__row}>
        <div className={styles.keyValue__row__key}>Key</div>
        <div className={styles.keyValue__row__value}>Value</div>
      </div>
      {rows}
    </div>
  );
};

export default KeyValueEditor;
