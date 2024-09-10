'use client';

import { useState } from 'react';

import FunctionalEditor from 'components/GraphQL/FunctionalEditorGraphQl/FunctionalEditor';
import ResponseSection from 'components/GraphQL/ResponseSectionGraphQl/ResponseSection';
import ButtonWithIcon from 'components/ButtonWithIcon/ButtonWithIcon';
import { Loader } from 'components/Loader/Loader';

import fetchGraphQL from 'services/fetchGraphQL';
import useUrl from 'hooks/useUrl';

import play from 'assets/icons/play.svg';

import styles from './GraphQl.module.scss';

export default function GraphQl() {
  const { endpoint, query, variables, headers } = useUrl();

  const [response, setResponse] = useState<{
    statusCode: number | null;
    data: string | null;
    error: string | null;
  }>({ statusCode: null, data: null, error: null });

  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit() {
    setIsLoading(true);
    const response = await fetchGraphQL(endpoint, query, variables, headers);
    setResponse(response);
    setIsLoading(false);
  }

  return (
    <>
      <FunctionalEditor />
      <div className={styles['wrapper-button']}>
        <ButtonWithIcon
          icon={play}
          onClick={handleSubmit}
          disabled={!endpoint}
        />
        {isLoading && <Loader />}
      </div>
      <ResponseSection response={response} />
    </>
  );
}
