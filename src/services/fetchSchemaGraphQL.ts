'use server';

import { getIntrospectionQuery } from 'graphql';

export default async function fetchGraphQL(endpoint: string): Promise<{
  statusCode: number | null;
  data: string | null;
  error: string | null;
}> {
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: getIntrospectionQuery(),
    }),
  };

  let statusCode = null;
  try {
    const response = await fetch(endpoint, requestOptions);

    statusCode = response.status;
    if (!response.ok) {
      throw new Error(await response.text());
    }

    const data = await response.text();
    return { data, statusCode, error: null };
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message.includes('<!DOCTYPE html>') ? '' : error.message,
        statusCode: statusCode,
        data: null,
      };
    }
    return {
      error: `{"errors":[{"message":"Something went wrong."}]}`,
      statusCode,
      data: null,
    };
  }
}
