'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import SimpleInput from 'components/SimpleInput/SimpleInput';
import { Button } from 'components/Button/Button';

import Documentation from './Documentation/Documentation';

import generateUrlGraphQl from 'utils/generateUrlGraphQl';
import useUrl from 'hooks/useUrl';

import styles from './FormGraphQl.module.scss';
import ParameterSection from './ParameterSection/ParameterSection';

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

interface IFormGraphQlProps {
  onSubmit: (
    endpoint: string,
    query: string,
    variables: Record<string, string>,
    headers: Record<string, string>,
  ) => void;
}

export default function FormGraphQl(props: IFormGraphQlProps) {
  const { onSubmit } = props;
  const router = useRouter();
  const { endpoint, query, variables, headers } = useUrl();
  const [formData, setFormData] = useState<FormData>({
    endpoint,
    sdl: initSdl(endpoint),
    query,
    variables,
    headers: initHeaders(headers),
  });

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

  return (
    <form className={styles.form} autoComplete="off">
      <div className={styles['wrapper-inputs']}>
        <div className={styles['wrapper-url']}>
          <SimpleInput
            name="endpoint"
            label="Endpoint URL:"
            value={formData.endpoint}
            onBlur={setForm('endpoint')}
          ></SimpleInput>
          <Button
            onClick={() => {
              onSubmit(
                formData.endpoint,
                formData.query,
                formData.variables,
                formData.headers,
              );
            }}
            type="button"
            className={styles['btn-send']}
          >
            Send
          </Button>
        </div>
        <ParameterSection formData={formData} setForm={setForm} />
        <Documentation sdl={formData.sdl} setFormSdl={setForm('sdl')} />
      </div>
    </form>
  );
}
