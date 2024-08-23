'use client';

import { use, useEffect, useState } from 'react';

import styles from './Textarea.module.scss';

interface ITextareaProps {
  value: string;
  readOnly?: boolean;
  rows?: number;
  className?: string;
  handlerBlur: (str: string) => void;
}

export default function Textarea(props: ITextareaProps) {
  const { value, className, readOnly, rows, handlerBlur } = props;

  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  return (
    <textarea
      className={`${styles.textarea} ${className}`}
      onChange={(event) => setText(event.target.value)}
      onBlur={(event) => {
        handlerBlur(event.target.value);
      }}
      value={text}
      readOnly={readOnly || false}
      rows={rows || 10}
    />
  );
}
