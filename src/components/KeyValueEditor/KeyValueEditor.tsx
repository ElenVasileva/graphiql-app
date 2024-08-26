import { useState } from 'react';
import Image from 'next/image';
import styles from './KeyValueEditor.module.scss';
import trash from '../../assets/icons/trash.svg';

interface KeyValueEditable {
  id: number;
  key: string;
  value: string;
}

const addEmptyToTheEnd = (valuesArray: KeyValueEditable[], id?: number) => {
  if (
    valuesArray[valuesArray.length - 1].key ||
    valuesArray[valuesArray.length - 1].value
  ) {
    valuesArray.push({
      id: id || Math.max(...valuesArray.map((v) => v.id)) + 1,
      key: '',
      value: '',
    });
  }
};

const record2Array = (values: Record<string, string>): KeyValueEditable[] => {
  const valuesArray: KeyValueEditable[] = [];
  let id = 0;
  for (const key in values) {
    valuesArray.push({ id, key: key, value: values[key] });
    id++;
  }
  addEmptyToTheEnd(valuesArray);
  return valuesArray;
};

const array2Record = (array: KeyValueEditable[]): Record<string, string> => {
  let record: Record<string, string> = {};
  array.forEach((pair: KeyValueEditable) => {
    if (pair.key) record[pair.key] = pair.value;
  });
  return record;
};

const KeyValueEditor = ({
  defaultValues,
  onChange,
}: {
  defaultValues: Record<string, string>;
  onChange: (values: Record<string, string>) => void;
}) => {
  const [values, setValues] = useState<KeyValueEditable[]>(
    record2Array(defaultValues),
  );

  const onKeyChange = (id: number, newKey: string) => {
    const newValues = [...values];
    const index = newValues.findIndex((p) => p.id === id);
    newValues[index].key = newKey;
    addEmptyToTheEnd(newValues);
    setValues(newValues);
    onChange(array2Record(values));
  };

  const onValueChange = (id: number, newValue: string) => {
    const newValues = [...values];
    const index = newValues.findIndex((p) => p.id === id);
    newValues[index].value = newValue;
    addEmptyToTheEnd(newValues);
    setValues(newValues);
    onChange(array2Record(values));
  };

  const onDeleteClick = (id: number) => {
    const newValues = [...values];
    const index = newValues.findIndex((p) => p.id === id);
    newValues.splice(index, 1);
    setValues(newValues);
    onChange(array2Record(values));
  };

  const rows = values.map((pair) => (
    <div key={pair.id} className={styles.keyValue__row}>
      <div className={styles.keyValue__row__key}>
        <input
          type="text"
          placeholder="Key"
          defaultValue={pair.key}
          onChange={(e) => {
            onKeyChange(pair.id, e.target.value);
          }}
        />
      </div>
      <div className={styles.keyValue__row__value}>
        <input
          type="text"
          placeholder="Value"
          defaultValue={pair.value}
          onChange={(e) => {
            onValueChange(pair.id, e.target.value);
          }}
        />
      </div>
      <div className={styles.keyValue__row__trash}>
        <button onClick={() => onDeleteClick(pair.id)}>
          <Image width="16" src={trash} alt="Delete" />
        </button>
      </div>
    </div>
  ));
  return (
    <div className={styles.keyValue}>
      <div className={styles.keyValue__row}>
        <div className={styles.keyValue__row__key}>
          <input value="Key" readOnly />
        </div>
        <div className={styles.keyValue__row__value}>
          <input value="Value" readOnly />
        </div>
        <div className={styles.keyValue__row__trash}></div>
      </div>
      {rows}
    </div>
  );
};

export default KeyValueEditor;
