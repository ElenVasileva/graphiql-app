import ResponseComponent from 'components/ResponseComponent/ResponseComponent';
import { HttpMethod } from 'constants/methodTypes';

export default function Page() {
  return (
    <>
      <ResponseComponent method={HttpMethod.get} />
    </>
  );
}
