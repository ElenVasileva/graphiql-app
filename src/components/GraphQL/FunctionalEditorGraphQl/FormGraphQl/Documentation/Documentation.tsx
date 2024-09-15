'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

import SimpleInput from 'components/SimpleInput/SimpleInput';
import Textarea from 'components/Textarea/Textarea';

import prettyPrintJson from 'utils/prettyPrintJson';
import fetchSchemaGraphQL from 'services/fetchSchemaGraphQL';

interface IDocumentationProps {
  sdl: string;
  setFormSdl: (value: string | Record<string, string>) => void;
}

export default function Documentation(props: IDocumentationProps) {
  const { sdl, setFormSdl } = props;
  const t = useTranslations('Documentation');

  const [doc, setDoc] = useState<string | null>(null);
  const [error, setError] = useState<{
    statusCode: number | null;
    error: string | null;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      setError(null);
      setDoc(null);
      const { statusCode, data, error } = await fetchSchemaGraphQL(sdl);
      if (statusCode === 200 && data) {
        setDoc(prettyPrintJson(data));
      } else {
        setError({ error, statusCode });
      }
      setLoading(false);
    }
    fetchPosts();
  }, [sdl]);

  return (
    <>
      <SimpleInput
        name="sdl"
        label="SDL URL:"
        value={sdl}
        onBlur={setFormSdl}
      ></SimpleInput>
      <h3>{t('Documentation')}</h3>
      {loading && <div>Loading...</div>}
      {error && (
        <div>{`Error: ${error.statusCode ? error.statusCode : ''} ${error.error}`}</div>
      )}
      {doc && <Textarea value={doc} readOnly={true} />}
    </>
  );
}
