import { useEffect, useState } from 'react';
import styles from './SimpleInput.module.scss';

interface InputProps {
  label: string;
  value: string;
  name?: string;
  onBlur: (value: string) => void;
}

export default function SimpleInput(props: InputProps) {
  const { label, value, name, onBlur } = props;
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <input
        name={name}
        onBlur={() => onBlur(text)}
        onChange={(event) => {
          setText(event.target.value);
        }}
        value={text}
        className={styles.input}
      />
    </div>
  );
}
