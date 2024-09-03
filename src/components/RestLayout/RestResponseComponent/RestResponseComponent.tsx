'use client';

import styles from './RestResponseComponent.module.scss';
import { RestResponse } from 'types/RestResponse';

const RestResponseComponent = ({
  response,
}: {
  response: RestResponse | undefined;
}) => {
  const numberOfSpaces = 4;
  const body =
    response && response.body
      ? JSON.stringify(JSON.parse(response.body), undefined, numberOfSpaces)
      : '';

  return (
    <div className={styles.response}>
      {!!response && (
        <>
          <div className={styles.response__status}>
            Status: {response.status}
          </div>
          <div>
            <textarea readOnly value={body} />
          </div>
        </>
      )}
    </div>
  );
};

export default RestResponseComponent;
