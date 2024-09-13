import { useState } from 'react';

import ButtonWithIcon from 'components/ButtonWithIcon/ButtonWithIcon';
import pretty from 'assets/icons/pretty.svg';

import prettyPrintGraphQl from 'utils/prettyPrintGraphQl';

import styles from './QueryEditorGraphQl.module.scss';

type FormData = {
  endpoint: string;
  sdl: string;
  query: string;
  variables: Record<string, string>;
  headers: Record<string, string>;
};

interface IQueryEditorGraphQlProps {
  formData: FormData;
  setForm: (value: string | Record<string, string>) => void;
}

export default function QueryEditorGraphQl(props: IQueryEditorGraphQlProps) {
  const { formData, setForm } = props;

  const [text, setText] = useState(formData.query);
  const [error, setError] = useState<string | null>(null);

  async function formatText(str: string) {
    const formattedText = await prettyPrintGraphQl(str);
    setText(formattedText.str);
    setError(formattedText.error);
    setForm(formattedText.str);
  }
  return (
    <div className={styles['query-editor']}>
      <div className={styles['button-wrapper']}>
        <ButtonWithIcon
          icon={pretty}
          alt={'prettify'}
          onClick={() => formatText(text)}
        />
      </div>
      <textarea
        className={`${styles.textarea}`}
        onChange={(event) => setText(event.target.value)}
        onBlur={(event) => {
          formatText(event.target.value);
        }}
        value={text}
        rows={10}
      />
      {error && (
        <textarea
          className={`${styles.textarea} ${styles.error}`}
          rows={3}
          readOnly={true}
          value={error}
        />
      )}
    </div>
  );
}
