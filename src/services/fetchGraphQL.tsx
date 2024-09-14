'use server';

export default async function fetchGraphQL(
  endpoint: string,
  query: string,
  variables: { [key: string]: string },
  headers: { [key: string]: string },
): Promise<{
  statusCode: number | null;
  data: string | null;
  error: string | null;
}> {
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: new Headers(headers),
    body: JSON.stringify({
      query,
      variables,
    }),
    redirect: 'follow',
  };

  let statusCode = null;
  try {
    if (!endpoint) {
      throw new Error('Invalid endpoint specified');
    }
    const response = await fetch(endpoint, requestOptions);

    statusCode = response.status;
    if (!response.ok) {
      let message = await response.text();
      if (!message || message.includes('<!DOCTYPE html>')) {
        message = response.statusText;
      }
      throw new Error(message);
    }

    const data = await response.text();
    return { data, statusCode, error: null };
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message,
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
