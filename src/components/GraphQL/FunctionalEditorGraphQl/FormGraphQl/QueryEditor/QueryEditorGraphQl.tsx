import QueryEditor from 'components/QueryEditor/QueryEditor';

import prettyPrintGraphQl from 'utils/prettyPrintGraphQl';

type FormData = {
  endpoint: string;
  sdl: string;
  query: string;
  variables: Record<string, string>;
  headers: Record<string, string>;
};

interface IQueryEditorGraphQlProps {
  visibleSection: 'headers' | 'query' | 'variables' | undefined;
  formData: FormData;
  setForm: (value: string | Record<string, string>) => void;
}

export default function QueryEditorGraphQl(props: IQueryEditorGraphQlProps) {
  const { formData, setForm, visibleSection } = props;

  if (visibleSection !== 'query') return null;

  function saveQueryToState(text: string) {
    setForm(prettyPrintGraphQl(text));
  }

  return (
    <QueryEditor
      textQuery={formData.query}
      format={prettyPrintGraphQl}
      saveQueryToState={saveQueryToState}
    />
  );
}
