import RestPageComponent from 'components/RestPageComponent/RestPageComponent';
import { HttpMethod } from 'constants/methodTypes';

export default function Page({
  params: { method },
}: {
  params: { method: string };
}) {
  const httpMethod = (method.toUpperCase() as HttpMethod) || HttpMethod.GET;
  return (
    <RestPageComponent
      params={{
        method: httpMethod,
      }}
    />
  );
}
