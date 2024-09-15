'use client';

import { useState } from 'react';

import FunctionalEditor from './FunctionalEditorGraphQl/FunctionalEditor';
import ResponseSection from './ResponseSectionGraphQl/ResponseSection';

import fetchGraphQL from 'services/fetchGraphQL';

import styles from './GraphQl.module.scss';
import { RestRequestToStore } from '@/types/RestRequestToStore';
import { addRequest } from '@store/features/requestListSlice';
import { useAppDispatch, useAppSelector } from '@store/hooks';

export default function GraphQl() {
  const [response, setResponse] = useState<{
    statusCode: number | null;
    data: string | null;
    error: string | null;
  }>({ statusCode: null, data: null, error: null });

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.currentUser.value);
      
  async function handleSubmit(
    endpoint: string,
    query: string,
    variables: Record<string, string>,
    headers: Record<string, string>,
  ) {
    const newRequest: RestRequestToStore = {
      date: Date.now(),
      user: user || 'noname',
      method: 'GRAPHQL',
      url: endpoint,
      body: query,
      headers,
      variables,
    };
    dispatch(addRequest(newRequest));
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
