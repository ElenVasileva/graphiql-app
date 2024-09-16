import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import fetchGraphQL from 'services/fetchGraphQL';

interface IFunctionalEditorProps {
  onSubmit: (
    endpoint: string,
    query: string,
    variables: Record<string, string>,
    headers: Record<string, string>,
  ) => void;
}

vi.mock('./FunctionalEditorGraphQl/FunctionalEditor', () => ({
  default: ({ onSubmit }: IFunctionalEditorProps) => (
    <div>
      <div data-testid="functional-editor">
        FunctionalEditor
        <button
          role="button"
          onClick={() => onSubmit('endpoint', 'query', {}, {})}
        >
          Submit
        </button>{' '}
      </div>
    </div>
  ),
}));
vi.mock('./ResponseSectionGraphQl/ResponseSection', () => ({
  default: () => <div data-testid="response-section">ResponseSection</div>,
}));

vi.mock('services/fetchGraphQL', () => ({
  __esModule: true,
  default: vi.fn(),
}));

const store = makeStore();
const persistor = persistStore(store);

import GraphQl from './GraphQl';
import { persistStore } from 'redux-persist';
import { makeStore } from '@/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

describe('GraphQl Component', () => {
  it('should render FunctionalEditor and ResponseSection components', () => {
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GraphQl />
        </PersistGate>
      </Provider>,
    );
    expect(screen.getByTestId('functional-editor')).toBeInTheDocument();
    expect(screen.getByTestId('response-section')).toBeInTheDocument();
  });

  it('should call handleSubmit on button click', () => {
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GraphQl />
        </PersistGate>
      </Provider>,
    );

    const submitButton = screen.getByRole('button');
    fireEvent.click(submitButton);

    expect(fetchGraphQL).toHaveBeenCalled();
  });
});
