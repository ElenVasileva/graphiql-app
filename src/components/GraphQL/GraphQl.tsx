'use client';

import { useState } from 'react';

import FunctionalEditor from './FunctionalEditorGraphQl/FunctionalEditor';
import ResponseSection from './ResponseSectionGraphQl/ResponseSection';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

import fetchGraphQL from 'services/fetchGraphQL';

import useUrl from 'hooks/useUrl';

import styles from './GraphQl.module.scss';
import { RestRequestToStore } from '@/types/RestRequestToStore';
import { addRequest } from '@store/features/requestListSlice';
import { useAppDispatch, useAppSelector } from '@store/hooks';

export default function GraphQl() {
  const { endpoint, query, variables, headers } = useUrl();

  const [response, setResponse] = useState<{
    statusCode: number | null;
    data: string | null;
    error: string | null;
  }>({ statusCode: null, data: null, error: null });

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.currentUser.value);

  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit() {
    setIsLoading(true);
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
    const response = await fetchGraphQL(endpoint, query, variables, headers);
    setResponse(response);
    setIsLoading(false);
  }

  return (
    <>
      <FunctionalEditor />
      <div className={styles['wrapper-button']}>
        <Button onClick={handleSubmit} disabled={!endpoint}>
          Send
        </Button>
        {isLoading && <Loader />}
      </div>
      <ResponseSection response={response} />
    </>
  );
}
