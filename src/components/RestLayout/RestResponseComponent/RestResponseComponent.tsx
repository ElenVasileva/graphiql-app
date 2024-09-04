'use client';

import { useState } from 'react';
import styles from './RestResponseComponent.module.scss';
import { RestResponse } from 'types/RestResponse';
import { Button } from 'components/Button';

enum TabSection {
  Pretty = 'Pretty',
  Raw = 'Raw',
}

const sectionList: TabSection[] = [TabSection.Pretty, TabSection.Raw];

const RestResponseComponent = ({
  response,
}: {
  response: RestResponse | undefined;
}) => {
  const [section, setSection] = useState<TabSection>(TabSection.Pretty);

  const numberOfSpaces = 4;
  const prettyBody =
    response && response.body
      ? JSON.stringify(JSON.parse(response.body), undefined, numberOfSpaces)
      : '';

  return (
    <div className={styles.response}>
      {!!response && (
        <>
          <div className={styles.response__statusAndSection}>
            <div className={styles.response__status}>
              Status: {response.status}
            </div>
            {!!response.body && (
              <div className={styles.response__sectionSelector}>
                {sectionList.map((sec) => (
                  <Button
                    key={sec}
                    className={section === sec ? styles.active : ''}
                    onClick={() => setSection(sec)}
                  >
                    {sec.toString()}
                  </Button>
                ))}
              </div>
            )}
          </div>
          {!!response.body && (
            <div className={styles.response__textareaContainer}>
              <textarea
                readOnly
                value={
                  section === TabSection.Pretty ? prettyBody : response.body
                }
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RestResponseComponent;
