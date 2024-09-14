import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ParameterSection from './ParameterSection';

vi.mock('./QueryEditorGraphQl/QueryEditorGraphQl', () => ({
  __esModule: true,
  default: () => (
    <div data-testid="query-editor-mock">QueryEditorGraphQl Mock</div>
  ),
}));

vi.mock('components/KeyValueEditor/KeyValueEditor', () => ({
  __esModule: true,
  default: () => (
    <div data-testid="key-value-editor-mock">KeyValueEditor Mock</div>
  ),
}));

describe('ParameterSection', () => {
  const mockSetForm = vi.fn().mockImplementation(() => {});

  beforeEach(() => {
    mockSetForm.mockClear();
  });

  it('renders the query editor by default', () => {
    render(
      <ParameterSection
        formData={{
          endpoint: '',
          sdl: '',
          query: '',
          variables: {},
          headers: {},
        }}
        setForm={mockSetForm}
      />,
    );

    expect(screen.getByTestId('query-editor-mock')).toBeInTheDocument();
  });

  it('shows KeyValueEditor when "headers" section is clicked', () => {
    render(
      <ParameterSection
        formData={{
          endpoint: '',
          sdl: '',
          query: '',
          variables: {},
          headers: {},
        }}
        setForm={mockSetForm}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Headers' }));

    expect(screen.getByTestId('key-value-editor-mock')).toBeInTheDocument();
  });

  it('shows KeyValueEditor when "variables" section is clicked', () => {
    render(
      <ParameterSection
        formData={{
          endpoint: '',
          sdl: '',
          query: '',
          variables: {},
          headers: {},
        }}
        setForm={mockSetForm}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Variables' }));

    expect(screen.getByTestId('key-value-editor-mock')).toBeInTheDocument();
  });

  it('calls setForm with correct arguments on section change', () => {
    render(
      <ParameterSection
        formData={{
          endpoint: '',
          sdl: '',
          query: '',
          variables: {},
          headers: {},
        }}
        setForm={mockSetForm}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Headers' }));
    expect(mockSetForm).toHaveBeenCalledWith('headers');

    fireEvent.click(screen.getByRole('button', { name: 'Variables' }));
    expect(mockSetForm).toHaveBeenCalledWith('variables');
  });

  it('renders QueryEditorGraphQl when "query" section is active', () => {
    render(
      <ParameterSection
        formData={{
          endpoint: '',
          sdl: '',
          query: '',
          variables: {},
          headers: {},
        }}
        setForm={mockSetForm}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Query' }));

    expect(screen.getByTestId('query-editor-mock')).toBeInTheDocument();
  });
});
