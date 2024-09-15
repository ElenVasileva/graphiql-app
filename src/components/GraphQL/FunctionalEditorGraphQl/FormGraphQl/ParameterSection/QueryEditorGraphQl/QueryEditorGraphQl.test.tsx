import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import QueryEditorGraphQl from './QueryEditorGraphQl';
import prettyPrintGraphQl from 'utils/prettyPrintGraphQl';

vi.mock('utils/prettyPrintGraphQl', () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe('QueryEditorGraphQl', () => {
  it('initializes with the correct text value', () => {
    const formData = {
      endpoint: '',
      sdl: '',
      query: 'initial query',
      variables: {},
      headers: {},
    };
    const setForm = vi.fn();

    render(<QueryEditorGraphQl formData={formData} setForm={setForm} />);

    expect(screen.getByRole('textbox', { name: '' })).toHaveValue(
      'initial query',
    );
  });

  it('formats text correctly on button click', async () => {
    const formData = {
      endpoint: '',
      sdl: '',
      query: 'query to format',
      variables: {},
      headers: {},
    };
    const setForm = vi.fn();
    const formattedText = { str: 'formatted query', error: null };

    vi.mocked(prettyPrintGraphQl).mockResolvedValue(formattedText);

    render(<QueryEditorGraphQl formData={formData} setForm={setForm} />);

    fireEvent.click(screen.getByAltText('prettify'));

    await waitFor(() => {
      expect(setForm).toHaveBeenCalledWith('formatted query');
      expect(screen.getByRole('textbox', { name: '' })).toHaveValue(
        'formatted query',
      );
    });
  });

  it('displays error in the error textarea when present', async () => {
    const formData = {
      endpoint: '',
      sdl: '',
      query: 'query with error',
      variables: {},
      headers: {},
    };
    const setForm = vi.fn();
    const errorText = 'Formatting error';
    const formattedText = { str: '', error: errorText };

    vi.mocked(prettyPrintGraphQl).mockResolvedValue(formattedText);

    const { container } = render(
      <QueryEditorGraphQl formData={formData} setForm={setForm} />,
    );

    fireEvent.blur(screen.getByRole('textbox', { name: '' }), {
      target: { value: 'query with error' },
    });

    await waitFor(() => {
      const errorTextarea = container.querySelector('textarea[readonly]');
      expect(errorTextarea).toHaveValue(errorText);
    });
  });

  it('updates text state on textarea change', () => {
    const formData = {
      endpoint: '',
      sdl: '',
      query: 'query',
      variables: {},
      headers: {},
    };
    const setForm = vi.fn();

    render(<QueryEditorGraphQl formData={formData} setForm={setForm} />);

    fireEvent.change(screen.getByRole('textbox', { name: '' }), {
      target: { value: 'new query' },
    });

    expect(screen.getByRole('textbox', { name: '' })).toHaveValue('new query');
  });
});
