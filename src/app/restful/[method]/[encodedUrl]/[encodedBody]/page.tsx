import ResponseComponent from 'components/ResponseComponent/ResponseComponent';
import { HttpMethod } from 'constants/methodTypes';

export default function Page({
  params: { method, encodedUrl, encodedBody },
}: {
  params: { method: string; encodedUrl: string; encodedBody: string };
}) {
  const httpMethod = (method as HttpMethod) || HttpMethod.get;
  return (
    <>
      <ResponseComponent
        method={httpMethod}
        url={encodedUrl}
        encodedBody={encodedBody}
      />
    </>
  );
}
