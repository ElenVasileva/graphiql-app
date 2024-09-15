import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResponseSection from './ResponseSection';

vi.mock('utils/prettyPrintJson', () => ({
  __esModule: true,
  default: (str: string | null) => JSON.stringify(str, null, 4),
}));
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('ResponseSection', () => {
  it('renders data correctly', () => {
    const props = {
      response: {
        statusCode: 200,
        data: 'data',
        error: null,
      },
    };
    render(<ResponseSection {...props} />);
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;

    expect(textarea.value).toBe('statusCode: 200 \n"data"');
  });

  it('renders error correctly', () => {
    const props = {
      response: {
        statusCode: 500,
        data: null,
        error: 'error',
      },
    };
    render(<ResponseSection {...props} />);
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;

    expect(textarea.value).toBe(`statusCode: 500 \n"error"`);
  });

  it('renders empty string when no data or error is provided', () => {
    const props = {
      response: {
        statusCode: null,
        data: null,
        error: null,
      },
    };
    render(<ResponseSection {...props} />);
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;

    expect(textarea.value).toBe('');
  });
});
