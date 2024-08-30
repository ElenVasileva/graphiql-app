'use client';

import { useState } from 'react';

import FunctionalEditor from './FunctionalEditorGraphQl/FunctionalEditor';
import ResponseSection from './ResponseSectionGraphQl/ResponseSection';

import LSName from 'constants/LSName';

import fetchGraphQL from 'services/fetchGraphQL';
import useLocalStorage from 'hooks/useLocalStorage';

import generateUrlGraphQl from 'utils/generateUrlGraphQl';

export default function GraphQl() {
  const [response, setResponse] = useState<{
    statusCode: number | null;
    data: string | null;
    error: string | null;
  }>({ statusCode: null, data: null, error: null });

  const [, setItems] = useLocalStorage<{
    time: number;
    url: string;
    type: string;
  }>(LSName);

  function saveToLS(
    endpoint: string,
    query: string,
    variables: Record<string, string>,
    headers: Record<string, string>,
  ) {
    const time = new Date().getTime();
    const body = JSON.stringify({
      query,
      variables,
    });
    setItems({
      type: 'GRAPHQL',
      url: generateUrlGraphQl({ endpoint, body, headers }),
      time,
    });
  }

  async function handleSubmit(
    endpoint: string,
    query: string,
    variables: Record<string, string>,
    headers: Record<string, string>,
  ) {
    const response = await fetchGraphQL(endpoint, query, variables, headers);
    setResponse(response);
    if (!response.error && response.data) {
      saveToLS(endpoint, query, variables, headers);
    }
  }

  return (
    <>
      <FunctionalEditor onSubmit={handleSubmit} />
      <ResponseSection response={response} />
    </>
  );
}
