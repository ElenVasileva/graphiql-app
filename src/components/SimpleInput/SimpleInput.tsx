import { useState } from 'react';
import styles from './SimpleInput.module.scss';

interface InputProps {
  label: string;
  value: string;
  name: string;
  onBlur: (name: string, value: string) => void;
}

export default function SimpleInput(props: InputProps) {
  const { label, value, name, onBlur } = props;
  const [text, setText] = useState(props.value);
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <input
        name={name}
        onBlur={() => onBlur(name, text)}
        onChange={(event) => {
          setText(event.target.value);
        }}
        value={text}
        className={styles.input}
      />
    </div>
  );
}
