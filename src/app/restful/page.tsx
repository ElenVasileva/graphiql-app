import RestPageComponent from 'components/RestPageComponent/RestPageComponent';
import { HttpMethod } from 'constants/methodTypes';

export default function Page() {
  return (
    <RestPageComponent
      params={{
        method: HttpMethod.GET,
      }}
    />
  );
}
