'use client';

import { useState, useEffect } from 'react';

import Textarea from 'components/Textarea/Textarea';

import prettyPrintJson from 'utils/prettyPrintJson';
import fetchSchemaGraphQL from 'services/fetchSchemaGraphQL';

interface IDocumentationProps {
  endpoint: string;
}

export default function Documentation(props: IDocumentationProps) {
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
      const { statusCode, data, error } = await fetchSchemaGraphQL(
        props.endpoint,
      );
      if (statusCode === 200 && data) {
        setDoc(prettyPrintJson(data));
      } else {
        setError({ error, statusCode });
      }
      setLoading(false);
    }
    fetchPosts();
  }, [props.endpoint]);

  return (
    <>
      <h3>Documentation</h3>
      {loading && <div>Loading...</div>}
      {error && (
        <div>{`Error: ${error.statusCode ? error.statusCode : ''} ${error.error}`}</div>
      )}
      {doc && <Textarea value={doc} readOnly={true} />}
    </>
  );
}
