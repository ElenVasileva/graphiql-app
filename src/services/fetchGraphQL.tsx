export default async function fetchGraphQL(
  endpoint: string,
  body: string,
  headers: { [key: string]: string },
) {
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: new Headers(headers),
    body: JSON.stringify({
      query:
        '{\r\n  allFilms {\r\n    films {\r\n      title\r\n    }\r\n  }\r\n}',
      variables: {},
    }),
    redirect: 'follow',
  };

  try {
    const response = await fetch(endpoint, requestOptions);
    const result = await response.text();
    return result;
  } catch (error) {
    // console.error('Error', error);
  }
}
