'use client';

import { useEffect, useState } from 'react';
import styles from './RestResponseComponent.module.scss';
import { RestResponse } from 'types/RestResponse';
import { Button } from 'components/Button';

type Tabs = {
  Raw?: string;
  Pretty?: string;
};
type Tab = keyof Tabs;

const tryParseJson = (text: string | undefined): string | undefined => {
  try {
    if (text) {
      const numberOfSpaces = 4;
      return JSON.stringify(JSON.parse(text), undefined, numberOfSpaces);
    }
  } catch {
    return undefined;
  }
};

const RestResponseComponent = ({
  response,
}: {
  response: RestResponse | undefined;
}) => {
  const [tabs, setTabs] = useState<Tabs>({});
  const [selectedTab, setSelectedTab] = useState<Tab>('Raw');

  useEffect(() => {
    let newTabs = {
      Raw: response?.body,
    };
    const json = tryParseJson(response?.body);
    if (json) {
      newTabs = { ...newTabs, ...{ Pretty: json } };
    }
    setTabs(newTabs);
    setSelectedTab(json ? 'Pretty' : 'Raw');
  }, [response]);

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
                {Object.keys(tabs).length > 1 &&
                  Object.keys(tabs).map((tab) => (
                    <Button
                      key={tab}
                      className={tab == selectedTab ? styles.active : ''}
                      onClick={() => setSelectedTab(tab as Tab)}
                    >
                      {tab}
                    </Button>
                  ))}
              </div>
            )}
          </div>
          {!!response.body && (
            <div className={styles.response__textareaContainer}>
              <textarea readOnly value={tabs[selectedTab]} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RestResponseComponent;
