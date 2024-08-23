'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import SimpleInput from 'components/SimpleInput/SimpleInput';
import ButtonWithIcon from 'components/ButtonWithIcon/ButtonWithIcon';
import QueryEditorGraphQl from './QueryEditor/QueryEditorGraphQl';
import NavigationRequest from 'components/NavigationRequest/NavigationRequest';
import HeadersTable from './HeadersTable/HeadersTable';
import VariablesEditor from './VariablesEditor/VariablesEditor';

import stringToBase64 from 'utils/stringToBase64';
import generateUrlGraphQl from 'utils/generateUrlGraphQl';

import play from 'assets/icons/play.svg';

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

  const [formData, setFormData] = useState<FormData>({
    endpoint: '',
    sdl: '',
    query: '',
    variables: {},
    headers: { 'Accept': 'application/json' },
  });

  const [visibleSection, setVisibleSection] = useState<
    'query' | 'headers' | 'variables' | undefined
  >(undefined);

  function setForm(name: string, value: string) {
    setFormData({ ...formData, [name]: value });

    if (name === 'endpoint') {
      const endpointBase64 = stringToBase64(value);
      router.push(`/GRAPHQL/${endpointBase64}`);
    }

    if (name === 'query') {
      const endpointBase64 = stringToBase64(formData.endpoint);
      const body = JSON.stringify({
        query: value,
        variables: formData.variables,
      });
      const bodyBase64 = stringToBase64(body);
      router.push(`/GRAPHQL/${endpointBase64}/${bodyBase64}`);
    }
  }

  function handleChangeHeaders(values: Record<string, string>) {
    setFormData({
      ...formData,
      headers: values,
    });
  }

  function handleChangeVariables(values: Record<string, string>) {
    setFormData({
      ...formData,
      variables: values,
    });
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const url = generateUrlGraphQl({
      endpoint: formData.endpoint,
      body: JSON.stringify({
        query: formData.query,
        variables: formData.variables,
      }),
      headers: formData.headers,
    });

    router.push(`/GRAPHQL/${url}`);
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
    <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
      <div className={styles['wrapper-inputs']}>
        <SimpleInput
          name="endpoint"
          label="Endpoint URL:"
          value={formData.endpoint}
          onBlur={setForm}
        ></SimpleInput>
        <SimpleInput
          name="sdl"
          label="SDL URL:"
          value={formData.sdl}
          onBlur={setForm}
        ></SimpleInput>
        <NavigationRequest
          visibleSection={visibleSection}
          onClick={handlerClickNavigation}
        />
        <HeadersTable
          headers={formData.headers}
          visibleSection={visibleSection}
          handleChange={handleChangeHeaders}
        />
        <QueryEditorGraphQl
          visibleSection={visibleSection}
          formData={formData}
          setForm={setForm}
        ></QueryEditorGraphQl>

        <VariablesEditor
          variables={formData.variables}
          visibleSection={visibleSection}
          handleChange={handleChangeVariables}
        />
      </div>
      <ButtonWithIcon icon={play} />
    </form>
  );
}
