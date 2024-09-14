import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import Documentation from './Documentation';
import fetchSchemaGraphQL from 'services/fetchSchemaGraphQL';
import prettyPrintJson from 'utils/prettyPrintJson';

vi.mock('services/fetchSchemaGraphQL');

describe('Documentation component', () => {
  const mockSetFormSdl = vi.fn();

  it('should display loading message initially', () => {
    vi.mocked(fetchSchemaGraphQL).mockResolvedValue({
      statusCode: null,
      data: null,
      error: null,
    });

    render(<Documentation sdl="test-endpoint" setFormSdl={mockSetFormSdl} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should display error message when there is an error', async () => {
    vi.mocked(fetchSchemaGraphQL).mockResolvedValue({
      statusCode: 500,
      data: null,
      error: 'Error message',
    });

    render(<Documentation sdl="test-endpoint" setFormSdl={mockSetFormSdl} />);

    await waitFor(() => {
      expect(screen.getByText('Error: 500 Error message')).toBeInTheDocument();
    });
  });

  it('should display the documentation data when fetch is successful', async () => {
    const mockData = JSON.stringify({ key: 'value' });
    const prettyPrintedData = prettyPrintJson(mockData);

    vi.mocked(fetchSchemaGraphQL).mockResolvedValue({
      statusCode: 200,
      data: mockData,
      error: null,
    });

    render(<Documentation sdl="test-endpoint" setFormSdl={mockSetFormSdl} />);

    await waitFor(() => {
      const textarea = screen.getByTestId('documentation-textarea');
      expect(textarea).toBeInTheDocument();
      expect(textarea).toHaveValue(prettyPrintedData);
    });
  });
});
