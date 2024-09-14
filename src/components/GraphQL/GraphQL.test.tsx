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

import GraphQl from './GraphQl';

describe('GraphQl Component', () => {
  it('should render FunctionalEditor and ResponseSection components', () => {
    render(<GraphQl />);
    expect(screen.getByTestId('functional-editor')).toBeInTheDocument();
    expect(screen.getByTestId('response-section')).toBeInTheDocument();
  });

  it('should call handleSubmit on button click', () => {
    render(<GraphQl />);

    const submitButton = screen.getByRole('button');
    fireEvent.click(submitButton);

    expect(fetchGraphQL).toHaveBeenCalled();
  });
});
