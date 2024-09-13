'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import SimpleInput from 'components/SimpleInput/SimpleInput';
import NavigationRequest from 'components/NavigationRequest/NavigationRequest';
import QueryEditorGraphQl from './QueryEditorGraphQl/QueryEditorGraphQl';
import KeyValueEditor from 'components/KeyValueEditor/KeyValueEditor';
import Documentation from './Documentation/Documentation';

import generateUrlGraphQl from 'utils/generateUrlGraphQl';
import useUrl from 'hooks/useUrl';

import styles from './FormGraphQl.module.scss';

type Section = 'query' | 'headers' | 'variables' | undefined;

type FormData = {
  endpoint: string;
  sdl: string;
  query: string;
  variables: Record<string, string>;
  headers: Record<string, string>;
};

function initSdl(endpoint: string) {
  return `${endpoint ? `${endpoint}?sdl` : ''}`;
}

function initHeaders(headers: Record<string, string>) {
  return Object.keys(headers).length === 0
    ? { 'Content-Type': 'application/json' }
    : headers;
}

export default function FormGraphQl() {
  const router = useRouter();
  const { endpoint, query, variables, headers } = useUrl();
  const [formData, setFormData] = useState<FormData>({
    endpoint,
    sdl: initSdl(endpoint),
    query,
    variables,
    headers: initHeaders(headers),
  });
  const [visibleSection, setVisibleSection] = useState<Section>('query');
  const goPage = useCallback(
    function () {
      if (!formData.endpoint) {
        router.push(`/GRAPHQL/`);
        return;
      }
      const url = generateUrlGraphQl({
        endpoint: formData.endpoint,
        body: JSON.stringify({
          query: formData.query,
          variables: formData.variables,
        }),
        headers: formData.headers,
      });
      router.push(`/GRAPHQL/${url}`);
    },
    [formData, router],
  );
  useEffect(() => {
    goPage();
  }, [formData, router, goPage]);
  function setForm(name: string) {
    return (value: string | Record<string, string>) => {
      if (name === 'endpoint' && typeof value === 'string') {
        setFormData({ ...formData, [name]: value, 'sdl': `${value}?sdl` });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    };
  }
  function handlerClickNavigation(event: React.MouseEvent<HTMLButtonElement>) {
    if (
      event.target instanceof HTMLButtonElement &&
      (event.target.name === 'query' ||
        event.target.name === 'headers' ||
        event.target.name === 'variables')
    ) {
      setVisibleSection(event.target.name);
    }
  }
  return (
    <form className={styles.form} autoComplete="off">
      <div className={styles['wrapper-inputs']}>
        <SimpleInput
          name="endpoint"
          label="Endpoint URL:"
          value={formData.endpoint}
          onBlur={setForm('endpoint')}
        ></SimpleInput>
        <NavigationRequest
          visibleSection={visibleSection}
          onClick={handlerClickNavigation}
        />
        <div className={styles['param-section']}>
          {visibleSection === 'headers' && (
            <KeyValueEditor
              defaultValues={formData.headers}
              onChange={setForm('headers')}
            />
          )}
          {visibleSection === 'query' && (
            <QueryEditorGraphQl
              formData={formData}
              setForm={setForm('query')}
            />
          )}
          {visibleSection === 'variables' && (
            <KeyValueEditor
              defaultValues={formData.variables}
              onChange={setForm('variables')}
            />
          )}
        </div>
        <SimpleInput
          name="sdl"
          label="SDL URL:"
          value={formData.sdl}
          onBlur={setForm('sdl')}
        ></SimpleInput>
        <Documentation endpoint={formData.sdl} />
      </div>
    </form>
  );
}
