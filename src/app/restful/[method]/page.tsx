import ResponseComponent from 'components/ResponseComponent/ResponseComponent';
import { HttpMethod } from 'constants/methodTypes';

export default function Page({
  params: { method },
}: {
  params: { method: string };
}) {
  const httpMethod = (method as HttpMethod) || HttpMethod.get;
  return (
    <>
      <ResponseComponent method={httpMethod} />
    </>
  );
}
