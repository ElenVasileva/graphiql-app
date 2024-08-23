import RestPageComponent from 'components/RestPageComponent/RestPageComponent';
import { HttpMethod } from 'constants/methodTypes';

export default function Page({
  params: { method },
}: {
  params: { method: HttpMethod };
}) {
  return (
    <RestPageComponent
      params={{
        method: method,
      }}
    />
  );
}
