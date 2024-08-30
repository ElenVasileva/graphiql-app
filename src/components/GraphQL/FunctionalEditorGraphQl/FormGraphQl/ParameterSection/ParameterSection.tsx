import { useState } from 'react';

import NavigationRequest from 'components/NavigationRequest/NavigationRequest';
import QueryEditorGraphQl from './QueryEditorGraphQl/QueryEditorGraphQl';
import KeyValueEditor from 'components/KeyValueEditor/KeyValueEditor';

import styles from './ParameterSection.module.scss';

type Section = 'query' | 'headers' | 'variables' | undefined;

type FormData = {
  endpoint: string;
  sdl: string;
  query: string;
  variables: Record<string, string>;
  headers: Record<string, string>;
};

interface IParameterSectionProps {
  formData: FormData;
  setForm: (name: string) => (value: string | Record<string, string>) => void;
}

export default function ParameterSection(props: IParameterSectionProps) {
  const { formData, setForm } = props;

  const [visibleSection, setVisibleSection] = useState<Section>('query');

  function handlerClickNavigation(event: React.MouseEvent<HTMLButtonElement>) {
    if (
      event.target instanceof HTMLButtonElement &&
      (event.target.name === 'query' ||
        event.target.name === 'headers' ||
        event.target.name === 'variables')
    ) {
      setVisibleSection(event.target.name);
    }
  }

  return (
    <>
      <NavigationRequest
        visibleSection={visibleSection}
        onClick={handlerClickNavigation}
      />
      <div className={styles['param-section']} data-testid="parameter-section">
        {visibleSection === 'headers' && (
          <KeyValueEditor
            defaultValues={formData.headers}
            onChange={setForm('headers')}
          />
        )}
        {visibleSection === 'query' && (
          <QueryEditorGraphQl formData={formData} setForm={setForm('query')} />
        )}
        {visibleSection === 'variables' && (
          <KeyValueEditor
            defaultValues={formData.variables}
            onChange={setForm('variables')}
          />
        )}
      </div>
    </>
  );
}
