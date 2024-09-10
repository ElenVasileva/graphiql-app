import { useState } from 'react';

import Textarea from 'components/Textarea/Textarea';
import ButtonWithIcon from 'components/ButtonWithIcon/ButtonWithIcon';
import play from 'assets/icons/pretty.svg';

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

  async function handlerBlur(str: string) {
    const formattedText = await prettyPrintGraphQl(str);
    setText(formattedText);
    setForm(formattedText);
  }

  return (
    <div className={styles['query-editor']}>
      <div className={styles['button-wrapper']}>
        <ButtonWithIcon icon={play} onClick={() => handlerBlur(text)} />
      </div>
      <Textarea handlerBlur={handlerBlur} value={text} />
    </div>
  );
}
