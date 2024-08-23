import { useState } from 'react';

import Textarea from 'components/Textarea/Textarea';
import ButtonWithIcon from 'components/ButtonWithIcon/ButtonWithIcon';
import play from 'assets/icons/pretty.svg';

import styles from './QueryEditor.module.scss';

interface IQueryEditorProps {
  textQuery: string;
  readOnly?: boolean;
  format: (str: string) => string;
  saveQueryToState: (str: string) => void;
}

export default function QueryEditor(props: IQueryEditorProps) {
  const { format, textQuery, readOnly, saveQueryToState } = props;

  const [text, setText] = useState(textQuery);

  function handlerBlur(str: string) {
    const formattedText = format(str);
    setText(formattedText);
    saveQueryToState(formattedText);
  }

  return (
    <div className={styles['query-editor']}>
      {!readOnly && (
        <div className={styles['button-wrapper']}>
          <ButtonWithIcon icon={play} onClick={() => handlerBlur(text)} />
        </div>
      )}
      <Textarea handlerBlur={handlerBlur} value={text} readOnly={readOnly} />
    </div>
  );
}
