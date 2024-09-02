'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import SimpleInput from 'components/SimpleInput/SimpleInput';
import QueryEditorGraphQl from './QueryEditor/QueryEditorGraphQl';
import NavigationRequest from 'components/NavigationRequest/NavigationRequest';
import KeyValueEditor from 'components/KeyValueEditor/KeyValueEditor';

import generateUrlGraphQl from 'utils/generateUrlGraphQl';
import useUrl from 'hooks/useUrl';

import styles from './FormGraphQl.module.scss';

type FormData = {
  endpoint: string;
  sdl: string;
  query: string;
  variables: Record<string, string>;
  headers: Record<string, string>;
};

export default function FormGraphQl() {
  const router = useRouter();
  const { endpoint, query, variables, headers } = useUrl();

  const [formData, setFormData] = useState<FormData>({
    endpoint,
    sdl: `${endpoint}?sdl`,
    query,
    variables,
    headers:
      Object.keys(headers).length === 0
        ? { 'Content-Type': 'application/json' }
        : headers,
  });

  const [visibleSection, setVisibleSection] = useState<
    'query' | 'headers' | 'variables' | undefined
  >(undefined);

  const goPage = useCallback(
    function () {
      if (!formData.endpoint) {
        router.push(`/GRAPHQL/`);
        return;
      }
      const body = JSON.stringify({
        query: formData.query,
        variables: formData.variables,
      });
      const url = generateUrlGraphQl({
        endpoint: formData.endpoint,
        body,
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
        <SimpleInput
          name="sdl"
          label="SDL URL:"
          value={formData.sdl}
          onBlur={setForm('sdl')}
        ></SimpleInput>
        <NavigationRequest
          visibleSection={visibleSection}
          onClick={handlerClickNavigation}
        />
        {visibleSection === 'headers' && (
          <KeyValueEditor
            defaultValues={formData.headers}
            onChange={setForm('headers')}
          />
        )}
        <QueryEditorGraphQl
          visibleSection={visibleSection}
          formData={formData}
          setForm={setForm('query')}
        ></QueryEditorGraphQl>
        {visibleSection === 'variables' && (
          <KeyValueEditor
            defaultValues={formData.variables}
            onChange={setForm('variables')}
          />
        )}
      </div>
    </form>
  );
}
