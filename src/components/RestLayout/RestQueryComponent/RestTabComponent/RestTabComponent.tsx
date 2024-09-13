'use client';

import KeyValueEditor from '@/components/KeyValueEditor/KeyValueEditor';
import { useState } from 'react';
import styles from './RestTabComponent.module.scss';
import RestEditor from '@/components/RestLayout/RestQueryComponent/RestEditor/RestEditor';
import TabButtons from '@/components/RestLayout/TabButtons/TabButtons';
import VariablesMessage from '@/components/RestLayout/RestQueryComponent/RestTabComponent/VariablesMessage/VariablesMessage';

enum TabSection {
  QueryParams = 'Query parameters',
  Headers = 'Headers',
  Body = 'Body',
  Variables = 'Variables',
}

enum TextMode {
  Text = 'text',
  Json = 'json',
}

const sectionList: TabSection[] = [
  TabSection.QueryParams,
  TabSection.Headers,
  TabSection.Body,
  TabSection.Variables,
];

const RestTabComponent = ({
  queryParams,
  headers,
  body,
  variables,
  onChange,
}: {
  queryParams: Record<string, string> | undefined;
  headers: Record<string, string> | undefined;
  body: string;
  variables: Record<string, string> | undefined;
  onChange: (newValue: object) => void;
}) => {
  const [section, setSection] = useState<TabSection>(TabSection.QueryParams);
  const [languageMode, setLanguageMode] = useState<TextMode>(TextMode.Json);

  return (
    <>
      <div className={styles.tab__header}>
        <div className={styles.tab__sectionSelector}>
          {sectionList.map((sec) => (
            <button
              className={section === sec ? styles.active : ''}
              onClick={() => setSection(sec)}
              key={sec}
            >
              {sec.toString()}
            </button>
          ))}
        </div>

        {section === TabSection.Body && (
          <TabButtons
            nameList={[TextMode.Text, TextMode.Json]}
            defaultName={languageMode}
            onChange={(mode) => setLanguageMode(mode as TextMode)}
          />
        )}
      </div>
      <div className={styles.tab__tabContainer}>
        {section === TabSection.QueryParams && (
          <KeyValueEditor
            defaultValues={queryParams}
            onChange={(queryParams) => onChange({ queryParams })}
          />
        )}
        {section === TabSection.Headers && (
          <KeyValueEditor
            defaultValues={headers}
            onChange={(headers) => onChange({ headers })}
          />
        )}
        {section === TabSection.Body && (
          <RestEditor
            text={body}
            language={languageMode}
            onChange={(body) => {
              onChange({ body });
            }}
          />
        )}
        {section === TabSection.Variables && (
          <div className={styles.tab__variablesTabContainer}>
            <div className={styles.tab__variablesContainer}>
              <KeyValueEditor
                defaultValues={variables}
                onChange={(variables) => onChange({ variables })}
              />
            </div>
            <VariablesMessage />
          </div>
        )}
      </div>
    </>
  );
};

export default RestTabComponent;
