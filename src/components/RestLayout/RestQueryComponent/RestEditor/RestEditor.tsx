import Image from 'next/image';
import { Editor } from '@monaco-editor/react';

import pretty from '@/assets/icons/pretty.svg';
import { Button } from '@/components/Button';
import styles from './RestEditor.module.scss';
import { useState } from 'react';
import prettyPrintJson from '@/utils/prettyPrintJson';

const RestEditor = ({
  text,
  language,
  onChange,
}: {
  text: string;
  language: string;
  onChange: (value: string) => void;
}) => {
  const [currentText, setCurrentText] = useState<string>(text);

  const formatText = () => {
    const newText = prettyPrintJson(currentText);
    if (newText && newText !== currentText) {
      setCurrentText(newText);
      onChange(newText);
    }
  };

  const onUserChangeText = (text: string) => {
    setCurrentText(text);
    onChange(text);
  };

  return (
    <div className={styles.restEditor}>
      {language !== 'text' && (
        <div className={styles.restEditor__pretty}>
          <Button onClick={formatText}>
            <Image
              width="18"
              height="18"
              src={pretty}
              alt="Prettify"
              title="Prettify"
            />
          </Button>
        </div>
      )}
      <Editor
        value={currentText}
        height="100%"
        theme="vs-light"
        options={{
          contextmenu: false,
          smoothScrolling: true,
          wordBasedSuggestions: 'off',
          minimap: { enabled: false },
          tabSize: 4,
          lineNumbersMinChars: 2,
        }}
        language={language}
        onChange={(value) => onUserChangeText(value || '')}
        className={styles.restEditor__editor}
      />
    </div>
  );
};

export default RestEditor;
