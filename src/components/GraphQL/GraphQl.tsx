'use client';

import { useState } from 'react';

import FunctionalEditor from './FunctionalEditorGraphQl/FunctionalEditor';
import ResponseSection from './ResponseSectionGraphQl/ResponseSection';

import fetchGraphQL from 'services/fetchGraphQL';

export default function GraphQl() {
  const [response, setResponse] = useState<{
    statusCode: number | null;
    data: string | null;
    error: string | null;
  }>({ statusCode: null, data: null, error: null });

  async function handleSubmit(
    endpoint: string,
    query: string,
    variables: Record<string, string>,
    headers: Record<string, string>,
  ) {
    try {
      const response = await fetchGraphQL(endpoint, query, variables, headers);
      setResponse(response);
    } catch (error) {
      setResponse({
        statusCode: 500,
        data: null,
        error: 'Internal server error',
      });
    }
  }

  return (
    <>
      <FunctionalEditor onSubmit={handleSubmit} />
      <ResponseSection response={response} />
    </>
  );
}
